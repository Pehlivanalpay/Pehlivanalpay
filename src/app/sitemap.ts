import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'
import { getAllSlugs } from '@/lib/wp/client'
import { NEWS_CATEGORIES } from '@/lib/wp/types'

export const revalidate = 3600

/** Ana sayfa, kategoriler, sabit sayfalar ve yayındaki yazılar. Son 48 saat için Google News haritası: /news-sitemap.xml */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllSlugs().catch(() => [])
  return [
    { url: `${SITE_URL}/`, changeFrequency: 'hourly', priority: 1 },
    { url: `${SITE_URL}/son-dakika`, changeFrequency: 'hourly', priority: 0.9 },
    ...NEWS_CATEGORIES.map((c) => ({ url: `${SITE_URL}/${c.slug}`, changeFrequency: 'hourly' as const, priority: 0.8 })),
    { url: `${SITE_URL}/kunye`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/iletisim`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/kvkk`, changeFrequency: 'yearly', priority: 0.1 },
    ...posts.map((p) => ({ url: `${SITE_URL}/haber/${p.slug}`, lastModified: p.modified, changeFrequency: 'weekly' as const, priority: 0.7 })),
  ]
}
