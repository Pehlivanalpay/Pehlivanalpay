import type { Metadata } from 'next'
import { CtaBand } from '@/components/fikserlik/CtaBand'
import { ListSection } from '@/components/fikserlik/ListSection'
import { PageHeader } from '@/components/fikserlik/PageHeader'
import { fikserlik } from '@/content/fikserlik'
import { services } from '@/content/home'
import { JsonLd, ogDefaults, ORG_ID, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Fikserlik',
  description: fikserlik.meta.description,
  alternates: { canonical: '/fikserlik' },
  openGraph: { ...ogDefaults, title: `${fikserlik.meta.title} – ELIS360 NEWS`, description: fikserlik.meta.description, url: '/fikserlik' },
}

export default function FikserlikPage() {
  const url = `${SITE_URL}/fikserlik`
  return (
    <main>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Service',
              '@id': `${SITE_URL}/#hizmet-${services.items[0].num}`,
              url,
              name: fikserlik.meta.title,
              serviceType: 'Fixing',
              description: fikserlik.meta.description,
              provider: { '@id': ORG_ID },
              areaServed: { '@type': 'Country', name: 'Türkiye' },
              availableLanguage: ['tr', 'en'],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Fikserlik hizmetlerimiz',
                itemListElement: fikserlik.sections.flatMap((s) =>
                  s.items.map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
                ),
              },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Ana sayfa', item: `${SITE_URL}/` },
                { '@type': 'ListItem', position: 2, name: 'Fikserlik', item: url },
              ],
            },
          ],
        }}
      />
      <PageHeader content={fikserlik.header} />
      {fikserlik.sections.map((s) => (
        <ListSection key={s.id} content={s} />
      ))}
      <CtaBand content={fikserlik.cta} />
    </main>
  )
}
