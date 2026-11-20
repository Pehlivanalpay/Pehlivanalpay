import type { Metadata } from 'next'
import { ContactSection } from '@/components/contact/ContactSection'
import { contact } from '@/content/home'
import { JsonLd, ogDefaults, ORG_ID, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'İletişim',
  description: contact.text,
  alternates: { canonical: '/iletisim' },
  openGraph: { ...ogDefaults, title: 'İletişim – ELIS360 NEWS', description: contact.text, url: '/iletisim' },
}

/** JS kapalı form gönderiminden sonra /api/contact buraya ?durum=ok|hata ile döner. */
export default async function ContactPage({ searchParams }: { searchParams: Promise<{ durum?: string }> }) {
  const { durum } = await searchParams
  const status = durum === 'ok' || durum === 'hata' ? durum : undefined
  return (
    <main>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          url: `${SITE_URL}/iletisim`,
          name: 'İletişim',
          about: { '@id': ORG_ID },
        }}
      />
      <ContactSection content={contact} headingLevel={1} status={status} showIndex={false} />
    </main>
  )
}
