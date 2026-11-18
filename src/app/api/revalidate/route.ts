import { timingSafeEqual } from 'node:crypto'
import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { POSTS_TAG } from '@/lib/wp/client'

/**
 * WordPress yayın bildirimi (elis360-headless eklentisi): yazı yayımlandı / güncellendi /
 * yayından kaldırıldı. Başlık: X-Elis360-Secret = WP_WEBHOOK_SECRET.
 *
 * `{ expire: 0 }`: eski içerik bir kez bile sunulmaz. Haber sitesinde yayından kaldırılan bir
 * yazının (ör. düzeltme / geri çekme) hemen kaybolması hızdan önemlidir.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.WP_WEBHOOK_SECRET
  const given = req.headers.get('x-elis360-secret') ?? ''
  if (!secret || !safeEqual(given, secret)) return NextResponse.json({ ok: false }, { status: 401 })

  let slug: string | undefined
  try {
    const body = (await req.json()) as { slug?: unknown }
    if (typeof body.slug === 'string' && /^[\p{L}\p{N}%_-]{1,200}$/u.test(body.slug)) slug = body.slug
  } catch {}

  revalidateTag(POSTS_TAG, { expire: 0 })
  if (slug) revalidateTag(`post:${slug}`, { expire: 0 })
  return NextResponse.json({ ok: true, revalidated: [POSTS_TAG, ...(slug ? [`post:${slug}`] : [])] })
}

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a)
  const y = Buffer.from(b)
  return x.length === y.length && timingSafeEqual(x, y)
}
