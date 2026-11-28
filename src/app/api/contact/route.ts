import { type NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { HONEYPOT, MIN_FILL_MS, normalize, TIMESTAMP, validate, type ContactInput } from '@/lib/contact'
import { site } from '@/content/site'
import { clientIp, createRateLimit, foreignOrigin } from '@/lib/ratelimit'

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

const MAX_BODY_BYTES = 20_000
const rateLimited = createRateLimit({ windowMs: 10 * 60 * 1000, max: 5 })

type Result = { ok: true } | { ok: false; error: string; fields?: Record<string, string> }

const MSG = {
  tr: {
    foreign: 'Geçersiz istek.', tooLong: 'Mesaj çok uzun.', unreadable: 'Form okunamadı.',
    tooFast: 'Form çok hızlı gönderildi. Birkaç saniye sonra tekrar deneyin.', rate: 'Çok fazla deneme. Birkaç dakika sonra tekrar deneyin.',
    fix: 'Lütfen işaretli alanları düzeltin.', links: 'Mesaj çok fazla bağlantı içeriyor.',
    failed: (email: string) => `Mesaj şu an gönderilemedi. Lütfen doğrudan ${email} adresine yazın.`,
  },
  en: {
    foreign: 'Invalid request.', tooLong: 'Message is too long.', unreadable: 'The form could not be read.',
    tooFast: 'The form was sent too quickly. Please try again in a few seconds.', rate: 'Too many attempts. Please try again in a few minutes.',
    fix: 'Please correct the highlighted fields.', links: 'The message contains too many links.',
    failed: (email: string) => `We couldn’t send your message right now. Please email us directly at ${email}.`,
  },
}

export async function POST(req: NextRequest) {
  const isForm = !(req.headers.get('content-type') ?? '').includes('application/json')
  // Dil: form ve fetch ?lang=en ile gönderir (İngilizce sayfalar).
  const locale = req.nextUrl.searchParams.get('lang') === 'en' ? 'en' : 'tr'
  const m = MSG[locale]
  const reply = (r: Result, status: number) =>
    isForm
      ? NextResponse.redirect(
          new URL(locale === 'en' ? `/en/contact?status=${r.ok ? 'ok' : 'error'}#iletisim` : `/iletisim?durum=${r.ok ? 'ok' : 'hata'}#iletisim`, req.url),
          303,
        )
      : NextResponse.json(r, { status })

  // 1. Köken
  if (foreignOrigin(req.headers, req.nextUrl.host)) return reply({ ok: false, error: m.foreign }, 403)

  // Gövde
  if (Number(req.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) {
    return reply({ ok: false, error: m.tooLong }, 413)
  }
  let raw: Record<string, unknown>
  try {
    raw = isForm ? Object.fromEntries(await req.formData()) : await req.json()
  } catch {
    return reply({ ok: false, error: m.unreadable }, 400)
  }
  if (!raw || typeof raw !== 'object') return reply({ ok: false, error: m.unreadable }, 400)

  // 2. Bal küpü — bota başarı gibi görünsün ki yeniden denemesin
  if (typeof raw[HONEYPOT] === 'string' && raw[HONEYPOT]) return reply({ ok: true }, 200)

  // 3. Zaman tuzağı (JS kapalıysa ts boş gelir; o durumda diğer katmanlar geçerli)
  if (raw[TIMESTAMP]) {
    const ts = Number(raw[TIMESTAMP])
    if (!Number.isFinite(ts) || Date.now() - ts < MIN_FILL_MS) {
      return reply({ ok: false, error: m.tooFast }, 400)
    }
  }

  // 4. Hız sınırı
  if (rateLimited(clientIp(req.headers))) {
    return reply({ ok: false, error: m.rate }, 429)
  }

  // Doğrulama
  const input = normalize(raw)
  const errors = validate(input, locale)
  if (Object.keys(errors).length) {
    return reply({ ok: false, error: m.fix, fields: errors }, 422)
  }

  // 5. İçerik sezgisi
  if ((input.message.match(/https?:\/\//gi) ?? []).length > 3) {
    return reply({ ok: false, error: m.links }, 422)
  }

  try {
    await sendMail(input)
  } catch (err) {
    console.error('[contact] e-posta gönderilemedi', err)
    return reply({ ok: false, error: m.failed(site.email) }, 502)
  }
  return reply({ ok: true }, 200)
}

async function sendMail(input: ContactInput) {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env
  const text = [
    `Konu: ${input.need || '—'}`,
    `Ad soyad: ${input.name}`,
    `E-posta: ${input.email}`,
    `Kurum: ${input.org || '—'}`,
    `Olayın yeri: ${input.city || '—'}`,
    `Ne zaman: ${input.dates || '—'}`,
    // Eski formdan gelebilecek alanlar (boşsa yazılmaz)
    ...(input.country ? [`Ülke: ${input.country}`] : []),
    ...(input.team ? [`Ekip: ${input.team}`] : []),
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
    subject: `[ELIS360 NEWS] ${input.need || 'İletişim'}: ${input.name}${input.org ? ` (${input.org})` : ''}`,
    text, // yalnızca düz metin — kullanıcı girdisi HTML olarak yorumlanmaz
  })
}
