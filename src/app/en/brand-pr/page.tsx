import type { Metadata } from 'next'
import { BrandPage } from '@/components/pages/ServicePages'
import { brand as c } from '@/content/en/pages'
import { pageMeta } from '@/i18n/config'

export const revalidate = 60
export const metadata: Metadata = pageMeta('brand', 'en', c.meta.title, c.meta.description)

export default function Page() {
  return <BrandPage locale="en" />
}
