import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

/** Faz 1 sayfaları. /haber Faz 2 (Google News sitemap ayrı). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/fikserlik`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/iletisim`, changeFrequency: 'yearly', priority: 0.6 },
  ]
}
