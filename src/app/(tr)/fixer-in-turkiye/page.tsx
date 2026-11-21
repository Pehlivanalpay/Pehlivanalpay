import type { Metadata } from 'next'
import { FixerPage } from '@/components/pages/ServicePages'
import { fikserlik as c } from '@/content/pages'
import { pageMeta } from '@/i18n/config'

export const revalidate = 60
export const metadata: Metadata = pageMeta('fixer', 'tr', c.meta.title, c.meta.description, 'Fixer in Türkiye — Fikserlik | ELIS360 NEWS')

export default function Page() {
  return <FixerPage locale="tr" />
}
