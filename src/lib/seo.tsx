import { serviceAreas } from '@/content/home'
import { PLACEHOLDER_HREF, site } from '@/content/site'

/**
 * Sitenin kanonik adresi. Vercel'de NEXT_PUBLIC_SITE_URL ile ayarlayın.
 * Varsayılan, kurumsal e-posta alan adından türetildi — TODO-CONTENT.md'de doğrulanacak.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.elis360medya.com').replace(/\/$/, '')
export const ORG_ID = `${SITE_URL}/#organization`

/** Open Graph varsayılanları. Sayfa düzeyindeki `openGraph` layout'takini sığ birleştirir — yani ezer;
 *  sayfalar bunu yayarak (`...ogDefaults`) kullanmalı. */
export const ogDefaults = {
  type: 'website' as const,
  siteName: 'ELIS360 NEWS',
  locale: 'tr_TR',
  alternateLocale: ['en_GB'],
  images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'ELIS360 NEWS — Media • Fixer • Production' }],
}

/**
 * JSON-LD betiği. Next belgelerinin önerdiği gibi `<` kaçırılır (XSS'e karşı).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
  )
}

/** Kurum — her sayfada (layout). Yer tutucu sosyal adresler sameAs'e girmez. */
export function organizationLd() {
  const sameAs = site.social.map((s) => s.href).filter((h) => h !== PLACEHOLDER_HREF)
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png`, width: 512, height: 512 },
    email: site.email,
    description: 'Uluslararası medya ekipleri ve markalar için Türkiye’de fikserlik, prodüksiyon, belgesel, marka ve PR hizmetleri.',
    slogan: 'Media • Fixing • Production • Brand & PR',
    areaServed: { '@type': 'Country', name: 'Türkiye' },
    knowsLanguage: ['tr', 'en'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: site.email,
      availableLanguage: ['Turkish', 'English'],
      url: `${SITE_URL}/iletisim`,
    },
    ...(sameAs.length ? { sameAs } : {}),
  }
}

/** Ana sayfa: beş hizmet alanı, her biri kendi sayfasına bağlı. */
export function servicesLd(items: readonly { title: string; text: string; href: string }[] = serviceAreas.items, lang: 'tr' | 'en' = 'tr') {
  return {
    '@context': 'https://schema.org',
    '@graph': items.map((s) => ({
      '@type': 'Service',
      '@id': `${SITE_URL}${s.href}#hizmet`,
      name: s.title,
      description: s.text,
      url: `${SITE_URL}${s.href}`,
      provider: { '@id': ORG_ID },
      areaServed: { '@type': 'Country', name: 'Türkiye' },
      availableLanguage: ['tr', 'en'],
      inLanguage: lang,
    })),
  }
}

/** Hizmet sayfası: tek Service + kapsamındaki işler (OfferCatalog). */
export function serviceLd({ path, name, serviceType, description, items, lang = 'tr' }: { path: string; name: string; serviceType: string; description: string; items: readonly string[]; lang?: 'tr' | 'en' }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${path}#hizmet`,
    url: `${SITE_URL}${path}`,
    name,
    serviceType,
    description,
    inLanguage: lang,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'Türkiye' },
    availableLanguage: ['tr', 'en'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name,
      itemListElement: [...new Set(items)].map((n) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: n } })),
    },
  }
}

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: `${SITE_URL}${t.path}` })),
  }
}
