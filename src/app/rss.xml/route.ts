import { site } from '@/content/site'
import { SITE_URL } from '@/lib/seo'
import { getPosts } from '@/lib/wp/client'

export const revalidate = 300

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** RSS 2.0 — son 30 haber (sponsorlu içerik hariç). Haber toplayıcılar ve okuyucular için. */
export async function GET() {
  const posts = await getPosts({ first: 30 }).catch(() => [])
  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/haber/${p.slug}`
      return `  <item>
    <title>${esc(p.title)}</title>
    <link>${esc(url)}</link>
    <guid isPermaLink="true">${esc(url)}</guid>
    <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    ${p.category ? `<category>${esc(p.category.name)}</category>` : ''}
    ${p.excerpt ? `<description>${esc(p.excerpt)}</description>` : ''}
    ${p.image ? `<enclosure url="${esc(p.image.src)}" type="image/jpeg" length="0"/>` : ''}
  </item>`
    })
    .join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${esc(site.name)}</title>
  <link>${SITE_URL}/</link>
  <description>Türkiye’den ve dünyadan sahadan, doğrulanmış haberler.</description>
  <language>tr</language>
  <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>
`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=300' } })
}
