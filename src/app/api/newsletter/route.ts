import { type NextRequest, NextResponse } from 'next/server'
import { clientIp, createRateLimit, foreignOrigin } from '@/lib/ratelimit'

/**
 * Bülten aboneliği. Harici servis yok: adres WordPress'te "Bülten aboneleri" listesine kaydedilir
 * (elis360-headless eklentisi, /wp-json/elis360/v1/subscribe — sunucudan sunucuya, gizli anahtarla).
 * Açık rıza (KVKK) onay kutusu zorunlu; rıza zamanı WordPress'te saklanır.
 *
 * Ortam: WP_URL, WP_WEBHOOK_SECRET (WordPress'teki ELIS360_WEBHOOK_SECRET ile aynı).
 */
const limited = createRateLimit({ windowMs: 10 * 60 * 1000, max: 5 })
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function POST(req: NextRequest) {
  if (foreignOrigin(req.headers, req.nextUrl.host)) return NextResponse.json({ ok: false, error: 'Geçersiz istek.' }, { status: 403 })
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'İstek okunamadı.' }, { status: 400 })
  }
  if (typeof body.website === 'string' && body.website) return NextResponse.json({ ok: true }) // bal küpü
  if (limited(clientIp(req.headers))) return NextResponse.json({ ok: false, error: 'Çok fazla deneme. Birkaç dakika sonra tekrar deneyin.' }, { status: 429 })

  const email = typeof body.email === 'string' ? body.email.trim().slice(0, 254) : ''
  if (!EMAIL_RE.test(email)) return NextResponse.json({ ok: false, error: 'Geçerli bir e-posta adresi yazın.' }, { status: 422 })
  if (body.consent !== true) return NextResponse.json({ ok: false, error: 'Devam etmek için onay kutusunu işaretleyin.' }, { status: 422 })

  const wp = process.env.WP_URL?.replace(/\/$/, '')
  const secret = process.env.WP_WEBHOOK_SECRET
  if (!wp || !secret) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[newsletter] WP_URL / WP_WEBHOOK_SECRET tanımlı değil')
      return NextResponse.json({ ok: false, error: 'Abonelik şu an alınamıyor.' }, { status: 503 })
    }
    console.info('[newsletter] WordPress bağlı değil — geliştirme modunda kaydedilmedi:', email)
    return NextResponse.json({ ok: true })
  }

  try {
    const res = await fetch(`${wp}/wp-json/elis360/v1/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Elis360-Secret': secret },
      body: JSON.stringify({ email, consent: true }),
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) throw new Error(`WordPress ${res.status}`)
  } catch (err) {
    console.error('[newsletter] kayıt başarısız', err)
    return NextResponse.json({ ok: false, error: 'Abonelik şu an alınamıyor. Lütfen daha sonra tekrar deneyin.' }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
