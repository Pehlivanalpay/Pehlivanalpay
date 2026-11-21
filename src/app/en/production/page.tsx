import type { Metadata } from 'next'
import { ProductionPage } from '@/components/pages/ServicePages'
import { production as c } from '@/content/en/pages'
import { pageMeta } from '@/i18n/config'

export const revalidate = 60
export const metadata: Metadata = pageMeta('production', 'en', c.meta.title, c.meta.description)

export default function Page() {
  return <ProductionPage locale="en" />
}
