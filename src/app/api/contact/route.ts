import { type NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { HONEYPOT, MIN_FILL_MS, normalize, TIMESTAMP, validate, type ContactInput } from '@/lib/contact'
import { site } from '@/content/site'

/**
 * İletişim formu gönderimi.
 *
 * İki istemci türü:
 *  - JS açık: fetch + JSON → JSON yanıt
 *  - JS kapalı: klasik form POST (urlencoded) → 303 ile /iletisim?durum=… sayfasına
 *
 * Spam koruması (katmanlı, kullanıcıya görünmez):
 *  1. Köken denetimi — Origin başka siteyse reddet
 *  2. Bal küpü alanı — doluysa sessizce "başarılı" de, gönderme
 *  3. Zaman tuzağı — form 3 sn'den kısa sürede doldurulduysa reddet
 *  4. IP başına hız sınırı — 10 dakikada 5 gönderim
 *  5. İçerik sezgisi — 3'ten fazla bağlantı içeren mesajı reddet
 *  Gerekirse sonraki adım: Cloudflare Turnstile (anahtar gerektirir).
 *
 * E-posta: kurumun kendi posta sunucusu üzerinden SMTP (nodemailer). Ortam değişkenleri:
 *  SMTP_HOST, SMTP_USER, SMTP_PASS — zorunlu (yayında)
 *  SMTP_PORT       — 465 (SSL, varsayılan) veya 587 (STARTTLS)
 *  CONTACT_TO      — alıcı, varsayılan site.email
 *  CONTACT_FROM    — gönderen, varsayılan SMTP_USER (çoğu sunucu başka adresten göndermeye izin vermez)
 */

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const MAX_BODY_BYTES = 20_000
// Not: sunucusuz ortamda her örneğin kendi belleği vardır; bu sınır en iyi çabadır.
// Kalıcı sınır için Upstash Redis / Vercel KV'ye taşınabilir.
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) for (const [k, v] of hits) if (now - v[v.length - 1] > WINDOW_MS) hits.delete(k)
  return recent.length > MAX_PER_WINDOW
}

type Result = { ok: true } | { ok: false; error: string; fields?: Record<string, string> }

export async function POST(req: NextRequest) {
  const isForm = !(req.headers.get('content-type') ?? '').includes('application/json')
  const reply = (r: Result, status: number) =>
    isForm
      ? NextResponse.redirect(new URL(`/iletisim?durum=${r.ok ? 'ok' : 'hata'}#iletisim`, req.url), 303)
      : NextResponse.json(r, { status })

  // 1. Köken
  const origin = req.headers.get('origin')
  if (origin && origin !== 'null') {
    let host = ''
    try {
      host = new URL(origin).host
    } catch {}
    if (host !== req.nextUrl.host) return reply({ ok: false, error: 'Geçersiz istek.' }, 403)
  }

  // Gövde
  if (Number(req.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) {
    return reply({ ok: false, error: 'Mesaj çok uzun.' }, 413)
  }
  let raw: Record<string, unknown>
  try {
    raw = isForm ? Object.fromEntries(await req.formData()) : await req.json()
  } catch {
    return reply({ ok: false, error: 'Form okunamadı.' }, 400)
  }
  if (!raw || typeof raw !== 'object') return reply({ ok: false, error: 'Form okunamadı.' }, 400)

  // 2. Bal küpü — bota başarı gibi görünsün ki yeniden denemesin
  if (typeof raw[HONEYPOT] === 'string' && raw[HONEYPOT]) return reply({ ok: true }, 200)

  // 3. Zaman tuzağı (JS kapalıysa ts boş gelir; o durumda diğer katmanlar geçerli)
  if (raw[TIMESTAMP]) {
    const ts = Number(raw[TIMESTAMP])
    if (!Number.isFinite(ts) || Date.now() - ts < MIN_FILL_MS) {
      return reply({ ok: false, error: 'Form çok hızlı gönderildi. Birkaç saniye sonra tekrar deneyin.' }, 400)
    }
  }

  // 4. Hız sınırı
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'yerel'
  if (rateLimited(ip)) {
    return reply({ ok: false, error: 'Çok fazla deneme. Birkaç dakika sonra tekrar deneyin.' }, 429)
  }

  // Doğrulama
  const input = normalize(raw)
  const errors = validate(input)
  if (Object.keys(errors).length) {
    return reply({ ok: false, error: 'Lütfen işaretli alanları düzeltin.', fields: errors }, 422)
  }

  // 5. İçerik sezgisi
  if ((input.message.match(/https?:\/\//gi) ?? []).length > 3) {
    return reply({ ok: false, error: 'Mesaj çok fazla bağlantı içeriyor.' }, 422)
  }

  try {
    await sendMail(input)
  } catch (err) {
    console.error('[contact] e-posta gönderilemedi', err)
    return reply({ ok: false, error: `Mesaj şu an gönderilemedi. Lütfen doğrudan ${site.email} adresine yazın.` }, 502)
  }
  return reply({ ok: true }, 200)
}

async function sendMail(input: ContactInput) {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env
  const text = [
    `Ad soyad: ${input.name}`,
    `Kurum: ${input.org || '—'}`,
    `E-posta: ${input.email}`,
    `Çekim tarihleri: ${input.dates || '—'}`,
    '',
    input.message,
  ].join('\n')

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    if (process.env.NODE_ENV === 'production') throw new Error('SMTP_HOST / SMTP_USER / SMTP_PASS tanımlı değil')
    console.info('[contact] SMTP ayarı yok — geliştirme modunda e-posta yerine günlüğe yazıldı:\n' + text)
    return
  }

  const port = Number(process.env.SMTP_PORT ?? 465)
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // 587'de STARTTLS ile şifrelenir
    requireTLS: port !== 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
  })

  await transport.sendMail({
    from: { name: 'ELIS360 NEWS Web', address: process.env.CONTACT_FROM ?? SMTP_USER },
    to: process.env.CONTACT_TO ?? site.email,
    // Yanıtla → doğrudan formu dolduran kişiye. Adres doğrulamadan geçti (validate).
    replyTo: { name: input.name, address: input.email },
    subject: `Proje talebi: ${input.name}${input.org ? ` (${input.org})` : ''}`,
    text, // yalnızca düz metin — kullanıcı girdisi HTML olarak yorumlanmaz
  })
}
