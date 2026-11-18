import { SITE_URL } from '@/lib/seo'
import { getAllSlugs } from '@/lib/wp/client'

export const revalidate = 300

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * Google News site haritası — yalnızca son 48 saatte yayımlanan yazılar (Google kuralı), en çok 1000.
 * https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap
 */
export async function GET() {
  const cutoff = Date.now() - 48 * 3600 * 1000
  const posts = (await getAllSlugs()).filter((p) => new Date(p.date).getTime() >= cutoff).slice(0, 1000)
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${posts
  .map(
    (p) => `  <url>
    <loc>${esc(`${SITE_URL}/haber/${p.slug}`)}</loc>
    <news:news>
      <news:publication><news:name>ELIS360 NEWS</news:name><news:language>tr</news:language></news:publication>
      <news:publication_date>${esc(p.date)}</news:publication_date>
      <news:title>${esc(p.title)}</news:title>
    </news:news>
  </url>`,
  )
  .join('\n')}
</urlset>
`
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
