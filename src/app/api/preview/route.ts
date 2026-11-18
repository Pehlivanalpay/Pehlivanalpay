import { timingSafeEqual } from 'node:crypto'
import { draftMode } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

/** WordPress önizleme bağlantısı: ?secret=…&id=123 → taslak modu → /haber/onizleme/123 */
export async function GET(req: NextRequest) {
  const secret = process.env.WP_PREVIEW_SECRET
  const given = req.nextUrl.searchParams.get('secret') ?? ''
  const id = Number(req.nextUrl.searchParams.get('id'))
  if (!secret || !safeEqual(given, secret) || !Number.isInteger(id) || id <= 0) {
    return new NextResponse('Geçersiz önizleme bağlantısı', { status: 401 })
  }
  ;(await draftMode()).enable()
  return NextResponse.redirect(new URL(`/haber/onizleme/${id}`, req.url), 307)
}

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a)
  const y = Buffer.from(b)
  return x.length === y.length && timingSafeEqual(x, y)
}
