import type { Metadata } from 'next'
import { ContactPage } from '@/components/pages/OtherPages'
import { contact } from '@/content/home'
import { pageMeta } from '@/i18n/config'

export const metadata: Metadata = pageMeta('contact', 'tr', contact.title, contact.text)

/** JS kapalı form gönderiminden sonra /api/contact buraya ?durum=ok|hata ile döner. */
export default async function Page({ searchParams }: { searchParams: Promise<{ durum?: string }> }) {
  const { durum: s } = await searchParams
  const status = s === 'ok' ? 'ok' : s === 'hata' ? 'hata' : undefined
  return <ContactPage status={status} />
}
