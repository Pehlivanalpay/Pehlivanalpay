import type { Metadata } from 'next'
import { DocumentaryPage } from '@/components/pages/ServicePages'
import { documentary as c } from '@/content/en/pages'
import { pageMeta } from '@/i18n/config'

export const revalidate = 60
export const metadata: Metadata = pageMeta('documentary', 'en', c.meta.title, c.meta.description)

export default function Page() {
  return <DocumentaryPage locale="en" />
}
