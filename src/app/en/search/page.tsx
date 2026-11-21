import type { Metadata } from 'next'
import { SearchPage } from '@/components/pages/SearchPage'
import { alternates } from '@/i18n/config'
import { ui } from '@/i18n/ui'

export const metadata: Metadata = {
  title: ui('en').searchPage.title,
  alternates: alternates('search', 'en'),
  robots: { index: false, follow: true },
}

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const { q } = await searchParams
  return <SearchPage locale="en" q={Array.isArray(q) ? q[0] : q} />
}
