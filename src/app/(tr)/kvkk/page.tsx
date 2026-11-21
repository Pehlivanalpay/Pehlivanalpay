import type { Metadata } from 'next'
import { LegalPage } from '@/components/pages/LegalPage'
import { kvkk as d } from '@/content/legal'
import { pageMeta } from '@/i18n/config'

export const metadata: Metadata = pageMeta('privacy', 'tr', d.title, d.intro)

export default function Page() {
  return <LegalPage locale="tr" />
}
