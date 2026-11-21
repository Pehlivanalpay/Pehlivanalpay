import type { MetadataRoute } from 'next'
import { EN_LIVE, LOCALES, ROUTES, type RouteKey } from '@/i18n/config'
import { SITE_URL } from '@/lib/seo'
import { getAllSlugs } from '@/lib/wp/client'
import { NEWS_CATEGORIES } from '@/lib/wp/types'

export const revalidate = 3600

type Freq = MetadataRoute.Sitemap[number]['changeFrequency']

/** Her iki dil, hreflang karşılıklarıyla (Google: her URL kendi + karşı dil sürümünü listeler). */
const PAGES: [RouteKey, Freq, number][] = [
  ['home', 'daily', 1],
  ['fixer', 'monthly', 0.9],
  ['production', 'monthly', 0.8],
  ['brand', 'monthly', 0.8],
  ['documentary', 'monthly', 0.8],
  ['projects', 'weekly', 0.8],
  ['contact', 'yearly', 0.6],
  ['privacy', 'yearly', 0.2],
]

/** Kurumsal sayfalar (TR + EN) + haber kategorileri + yayındaki yazılar. Google News haritası: /news-sitemap.xml */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllSlugs()
  const abs = (p: string) => `${SITE_URL}${p === '/' ? '/' : p}`
  return [
    ...PAGES.flatMap(([key, changeFrequency, priority]) =>
      LOCALES.map((l) => ({
        url: abs(ROUTES[key][l]),
        changeFrequency,
        priority: l === 'en' ? Math.round(priority * 9) / 10 : priority,
        alternates: EN_LIVE ? { languages: { tr: abs(ROUTES[key].tr), en: abs(ROUTES[key].en), 'x-default': abs(ROUTES[key].tr) } } : undefined,
      })),
    ),
    { url: `${SITE_URL}/haber`, changeFrequency: 'hourly', priority: 0.9 },
    ...NEWS_CATEGORIES.map((c) => ({ url: `${SITE_URL}/haber/kategori/${c.slug}`, changeFrequency: 'hourly' as const, priority: 0.6 })),
    ...posts.map((p) => ({ url: `${SITE_URL}/haber/${p.slug}`, lastModified: p.modified, changeFrequency: 'weekly' as const, priority: 0.7 })),
  ]
}
