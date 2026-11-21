import type { Metadata } from 'next'
import { ContactPage } from '@/components/pages/OtherPages'
import { contact } from '@/content/en/home'
import { pageMeta } from '@/i18n/config'

export const metadata: Metadata = pageMeta('contact', 'en', 'Contact', contact.text)

/** JS kapalı form gönderiminden sonra /api/contact buraya ?status=ok|error ile döner. */
export default async function Page({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status: s } = await searchParams
  const status = s === 'ok' ? 'ok' : s === 'error' ? 'hata' : undefined
  return <ContactPage locale="en" status={status} />
}
