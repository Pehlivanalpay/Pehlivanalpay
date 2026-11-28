import { type NextRequest, NextResponse } from 'next/server'

/**
 * Kanonik adres NEXT_PUBLIC_SITE_URL'den gelir (ör. https://www.elis360medya.com).
 * Çıplak alan adı → www, kalıcı (308: yöntem ve gövde korunur).
 *
 * cPanel/Passenger arkasında request.url iç adresi gösterebilir; asıl alan adı Host /
 * X-Forwarded-Host başlığındadır. HTTP → HTTPS yönlendirmesini cPanel yapar
 * (Domains → "Force HTTPS Redirect").
 */
const CANONICAL = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.elis360medya.com').host
const APEX = CANONICAL.replace(/^www\./, '')

export function proxy(req: NextRequest) {
  const host = (req.headers.get('x-forwarded-host') ?? req.headers.get('host') ?? '').split(':')[0].toLowerCase()
  if (host === APEX && APEX !== CANONICAL) {
    return NextResponse.redirect(`https://${CANONICAL}${req.nextUrl.pathname}${req.nextUrl.search}`, 308)
  }
  return NextResponse.next()
}
