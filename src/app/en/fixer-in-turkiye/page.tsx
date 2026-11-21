import type { Metadata } from 'next'
import { FixerPage } from '@/components/pages/ServicePages'
import { fixer as c } from '@/content/en/pages'
import { pageMeta } from '@/i18n/config'

export const revalidate = 60
export const metadata: Metadata = pageMeta('fixer', 'en', c.meta.title, c.meta.description, 'Fixer in Türkiye — Local Producer & Fixing Services | ELIS360 NEWS')

export default function Page() {
  return <FixerPage locale="en" />
}
