import { type NextRequest, NextResponse } from 'next/server'

/**
 * Kanonik adres: https://www.elis360news.com
 * Çıplak alan adı (elis360news.com) → www, kalıcı (308: yöntem ve gövde korunur).
 *
 * cPanel/Passenger arkasında request.url iç adresi gösterebilir; asıl alan adı Host /
 * X-Forwarded-Host başlığındadır. HTTP → HTTPS yönlendirmesini cPanel yapar
 * (Domains → "Force HTTPS Redirect").
 */
const APEX = 'elis360news.com'
const CANONICAL = 'www.elis360news.com'

export function proxy(req: NextRequest) {
  const host = (req.headers.get('x-forwarded-host') ?? req.headers.get('host') ?? '').split(':')[0].toLowerCase()
  if (host === APEX) {
    return NextResponse.redirect(`https://${CANONICAL}${req.nextUrl.pathname}${req.nextUrl.search}`, 308)
  }
  return NextResponse.next()
}
