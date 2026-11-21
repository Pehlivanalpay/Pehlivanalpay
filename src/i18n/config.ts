/**
 * Dil yapılandırması. Türkçe kök adreste (/), İngilizce /en altında.
 * Her sayfa çiftinin iki dildeki adresi burada — hreflang, dil anahtarı ve site haritası bunu kullanır.
 */
export type Locale = 'tr' | 'en'

/**
 * İngilizce yayın anahtarı (derleme anında okunur — GitHub › Settings › Variables › NEXT_PUBLIC_EN_LIVE).
 * Kapalıyken (varsayılan) /en sayfaları açılır ama YAYINDA SAYILMAZ: arama motorlarına kapalı (noindex),
 * dil anahtarında, footer'da, hreflang'de ve site haritasında yer almaz. Müşteri çevirileri
 * www.elis360news.com/en adresinde gözden geçirir; onaydan sonra değişken 1 yapılıp yeniden derlenir.
 */
export const EN_LIVE = process.env.NEXT_PUBLIC_EN_LIVE === '1'
export const LOCALES: Locale[] = EN_LIVE ? ['tr', 'en'] : ['tr']

export const ROUTES = {
  home: { tr: '/', en: '/en' },
  fixer: { tr: '/fixer-in-turkiye', en: '/en/fixer-in-turkiye' },
  production: { tr: '/produksiyon', en: '/en/production' },
  brand: { tr: '/marka-pr', en: '/en/brand-pr' },
  documentary: { tr: '/belgesel', en: '/en/documentary' },
  projects: { tr: '/haberler', en: '/en/projects' },
  contact: { tr: '/iletisim', en: '/en/contact' },
  search: { tr: '/ara', en: '/en/search' },
  privacy: { tr: '/kvkk', en: '/en/privacy' },
} as const satisfies Record<string, Record<Locale, string>>

export type RouteKey = keyof typeof ROUTES

export const route = (key: RouteKey, locale: Locale) => ROUTES[key][locale]

/** Bir sayfanın canonical + hreflang bağları (metadata.alternates). x-default → Türkçe. */
export function alternates(key: RouteKey, locale: Locale) {
  return {
    canonical: ROUTES[key][locale],
    languages: EN_LIVE ? { tr: ROUTES[key].tr, en: ROUTES[key].en, 'x-default': ROUTES[key].tr } : undefined,
  }
}

/** Dil anahtarı: bulunduğun sayfanın diğer dildeki karşılığı; karşılığı yoksa o dilin ana sayfası. */
export function switchPath(pathname: string, to: Locale): string {
  const clean = pathname.replace(/\/$/, '') || '/'
  for (const r of Object.values(ROUTES)) {
    if (r.tr === clean || r.en === clean) return r[to]
  }
  return ROUTES.home[to]
}

export const localeOf = (pathname: string): Locale => (pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'tr')

/** Sayfa metadata'sı: başlık, açıklama, hreflang ve dile göre Open Graph. */
export function pageMeta(key: RouteKey, locale: Locale, title: string, description: string, absoluteTitle?: string) {
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: alternates(key, locale),
    openGraph: {
      type: 'website' as const,
      siteName: 'ELIS360 NEWS',
      locale: locale === 'en' ? 'en_GB' : 'tr_TR',
      alternateLocale: [locale === 'en' ? 'tr_TR' : 'en_GB'],
      images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'ELIS360 NEWS — Media • Fixer • Production' }],
      title: `${absoluteTitle ?? title} – ELIS360 NEWS`.replace(/ \| ELIS360 NEWS – ELIS360 NEWS$/, ' – ELIS360 NEWS'),
      description,
      url: ROUTES[key][locale],
    },
  }
}
