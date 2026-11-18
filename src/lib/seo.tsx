import { services } from '@/content/home'
import { PLACEHOLDER_HREF, site } from '@/content/site'

/**
 * Sitenin kanonik adresi. Vercel'de NEXT_PUBLIC_SITE_URL ile ayarlayın.
 * Varsayılan, kurumsal e-posta alan adından türetildi — TODO-CONTENT.md'de doğrulanacak.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://elis360news.com').replace(/\/$/, '')
export const ORG_ID = `${SITE_URL}/#organization`

/** Open Graph varsayılanları. Sayfa düzeyindeki `openGraph` layout'takini sığ birleştirir — yani ezer;
 *  sayfalar bunu yayarak (`...ogDefaults`) kullanmalı. */
export const ogDefaults = {
  type: 'website' as const,
  siteName: 'ELIS360 NEWS',
  locale: 'tr_TR',
  images: [{ url: '/hero-bg.jpg', width: 1376, height: 768, alt: 'ELIS360 NEWS haber stüdyosu' }],
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
    email: site.email,
    description: 'Türkiye’de çalışan uluslararası medya ekipleri için fikserlik ve prodüksiyon hizmetleri.',
    slogan: 'Real stories, a brighter tomorrow',
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

/** Hizmetler — ana sayfa. Metinler hizmet kapsamı bölümüyle aynı kaynaktan. */
export function servicesLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': services.items.map((s) => ({
      '@type': 'Service',
      '@id': `${SITE_URL}/#hizmet-${s.num}`,
      name: s.title,
      serviceType: s.code,
      description: s.text,
      provider: { '@id': ORG_ID },
      areaServed: { '@type': 'Country', name: 'Türkiye' },
      availableLanguage: ['tr', 'en'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: s.title,
        itemListElement: s.points.map((p) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: p } })),
      },
      ...('link' in s && s.link ? { url: `${SITE_URL}${s.link.href}` } : {}),
    })),
  }
}
