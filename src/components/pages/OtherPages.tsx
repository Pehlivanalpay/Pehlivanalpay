import { ContactSection } from '@/components/contact/ContactSection'
import { contact } from '@/content/home'
import { ROUTES } from '@/i18n/config'
import { JsonLd, ORG_ID, SITE_URL } from '@/lib/seo'

/** İletişim / haber ihbarı — JS kapalı gönderimden sonra /api/contact buraya ?durum= ile döner. */
export function ContactPage({ status }: { status?: 'ok' | 'hata' }) {
  return (
    <main>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          url: `${SITE_URL}${ROUTES.contact.tr}`,
          name: contact.title,
          inLanguage: 'tr',
          about: { '@id': ORG_ID },
        }}
      />
      <ContactSection content={contact} headingLevel={1} status={status} showIndex={false} />
    </main>
  )
}
