import { PLACEHOLDER_HREF, site } from '@/content/site'

/** Sitenin kanonik adresi (derleme anında NEXT_PUBLIC_SITE_URL). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.elis360news.com').replace(/\/$/, '')
export const ORG_ID = `${SITE_URL}/#organization`

/** Open Graph varsayılanları. Sayfa düzeyindeki `openGraph` layout'takini sığ birleştirir — yani ezer;
 *  sayfalar bunu yayarak (`...ogDefaults`) kullanmalı. */
export const ogDefaults = {
  type: 'website' as const,
  siteName: 'ELIS360 NEWS',
  locale: 'tr_TR',
  images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'ELIS360 NEWS — Haber • Gündem • Dosya • Video' }],
}

/**
 * JSON-LD betiği. Next belgelerinin önerdiği gibi `<` kaçırılır (XSS'e karşı).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
  )
}

/** Yayın kuruluşu — her sayfada (layout). Yer tutucu sosyal adresler sameAs'e girmez. */
export function organizationLd() {
  const sameAs = [...site.social.map((s) => s.href).filter((h) => h !== PLACEHOLDER_HREF), site.corporateUrl]
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    '@id': ORG_ID,
    name: site.name,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png`, width: 512, height: 512 },
    email: site.email,
    description: 'Türkiye’den ve dünyadan sahadan, doğrulanmış haberler: gündem, Türkiye, İzmir ve Ege, dünya, video ve özel dosyalar.',
    slogan: site.tagline,
    areaServed: { '@type': 'Country', name: 'Türkiye' },
    knowsLanguage: ['tr'],
    publishingPrinciples: `${SITE_URL}/kunye#yayin-ilkeleri`,
    correctionsPolicy: `${SITE_URL}/kunye#duzeltme`,
    ethicsPolicy: `${SITE_URL}/kunye#yayin-ilkeleri`,
    masthead: `${SITE_URL}/kunye`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'newsroom',
      email: site.email,
      availableLanguage: ['Turkish'],
      url: `${SITE_URL}/iletisim`,
    },
    sameAs,
  }
}

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: `${SITE_URL}${t.path}` })),
  }
}
