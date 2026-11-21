import type { Metadata } from 'next'
import { ProjectsPage } from '@/components/pages/OtherPages'
import { projects as c } from '@/content/en/pages'
import { pageMeta } from '@/i18n/config'

export const revalidate = 60
export const metadata: Metadata = pageMeta('projects', 'en', c.meta.title, c.meta.description)

export default function Page() {
  return <ProjectsPage locale="en" />
}
