import type { Metadata } from 'next'
import { LegalPage } from '@/components/pages/LegalPage'
import { privacy as d } from '@/content/legal'
import { pageMeta } from '@/i18n/config'

export const metadata: Metadata = pageMeta('privacy', 'en', d.title, d.intro)

export default function Page() {
  return <LegalPage locale="en" />
}
