/**
 * Dil ve rota yapılandırması. Haber sitesi yalnızca Türkçe (2026-11-28).
 * İngilizce kurumsal sayfalar www.elis360medya.com/en altında; eski /en adresleri oraya 308 ile yönlenir
 * (next.config.ts). `Locale` türü ve ui.ts'teki İngilizce sözlük, ileride İngilizce haber bölümü
 * açılırsa diye korunuyor.
 */
export type Locale = 'tr' | 'en'

/** İngilizce sürüm yayında değil: dil anahtarı, hreflang ve site haritasında İngilizce yok. */
export const EN_LIVE = false as boolean
export const LOCALES: Locale[] = ['tr']

export const ROUTES = {
  home: { tr: '/', en: '/' },
  contact: { tr: '/iletisim', en: '/iletisim' },
  search: { tr: '/ara', en: '/ara' },
  privacy: { tr: '/kvkk', en: '/kvkk' },
} as const satisfies Record<string, Record<Locale, string>>

export type RouteKey = keyof typeof ROUTES

export const route = (key: RouteKey, locale: Locale) => ROUTES[key][locale]

/** Bir sayfanın canonical + hreflang bağları (metadata.alternates). x-default → Türkçe. */
export function alternates(key: RouteKey, locale: Locale) {
  return {
    canonical: ROUTES[key][locale],
    languages: EN_LIVE ? { tr: ROUTES[key].tr, en: ROUTES[key].en, 'x-default': ROUTES[key].tr } : undefined,
    // Sayfa düzeyindeki alternates layout'takini ezer; RSS bağlantısı burada da verilir
    types: { 'application/rss+xml': [{ url: '/rss.xml', title: 'ELIS360 NEWS' }] },
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
      images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'ELIS360 NEWS — Haber • Gündem • Dosya • Video' }],
      title: `${absoluteTitle ?? title} – ELIS360 NEWS`.replace(/ \| ELIS360 NEWS – ELIS360 NEWS$/, ' – ELIS360 NEWS'),
      description,
      url: ROUTES[key][locale],
    },
  }
}
