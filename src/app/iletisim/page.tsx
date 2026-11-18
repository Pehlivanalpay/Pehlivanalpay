import type { Metadata } from 'next'
import { ContactSection } from '@/components/contact/ContactSection'
import { contact } from '@/content/home'

export const metadata: Metadata = {
  title: 'İletişim',
  description: contact.text,
}

/** JS kapalı form gönderiminden sonra /api/contact buraya ?durum=ok|hata ile döner. */
export default async function ContactPage({ searchParams }: { searchParams: Promise<{ durum?: string }> }) {
  const { durum } = await searchParams
  const status = durum === 'ok' || durum === 'hata' ? durum : undefined
  return (
    <main>
      <ContactSection content={contact} headingLevel={1} status={status} />
    </main>
  )
}
