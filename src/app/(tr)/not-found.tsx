import { HomeButton, StatusPage } from '@/components/StatusPage'
import { ui } from '@/i18n/ui'

export default function NotFound() {
  const t = ui('tr').notFound
  return <StatusPage code="404" title={t.title} text={t.text} action={<HomeButton href="/" label={t.back} />} />
}
