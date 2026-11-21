import type { Metadata } from 'next'
import { BrandPage } from '@/components/pages/ServicePages'
import { markaPr as c } from '@/content/pages'
import { pageMeta } from '@/i18n/config'

export const revalidate = 60
export const metadata: Metadata = pageMeta('brand', 'tr', c.meta.title, c.meta.description)

export default function Page() {
  return <BrandPage locale="tr" />
}
