import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'
import { getAllSlugs } from '@/lib/wp/client'
import { NEWS_CATEGORIES } from '@/lib/wp/types'

export const revalidate = 3600

/** Kurumsal sayfalar + haber kategorileri + yayındaki yazılar. Google News haritası: /news-sitemap.xml */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllSlugs()
  return [
    { url: `${SITE_URL}/`, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/fikserlik`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/iletisim`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${SITE_URL}/haber`, changeFrequency: 'hourly', priority: 0.9 },
    ...NEWS_CATEGORIES.map((c) => ({ url: `${SITE_URL}/haber/kategori/${c.slug}`, changeFrequency: 'hourly' as const, priority: 0.6 })),
    ...posts.map((p) => ({ url: `${SITE_URL}/haber/${p.slug}`, lastModified: p.modified, changeFrequency: 'weekly' as const, priority: 0.7 })),
  ]
}
