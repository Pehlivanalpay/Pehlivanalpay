import type { MetadataRoute } from 'next'
import { EN_LIVE, LOCALES, ROUTES, type RouteKey } from '@/i18n/config'
import { SITE_URL } from '@/lib/seo'

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

/** Kurumsal sayfalar (TR + EN). Haberler kendi sitesinde: www.elis360news.com */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
  ]
}
