import type { Metadata } from 'next'
import { HomePage } from '@/components/pages/HomePage'
import { alternates } from '@/i18n/config'

export const metadata: Metadata = { alternates: alternates('home', 'en') }
export const revalidate = 60

export default function Page() {
  return <HomePage locale="en" />
}
