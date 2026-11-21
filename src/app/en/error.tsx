'use client'

import { StatusPage } from '@/components/StatusPage'
import { buttonClass } from '@/components/ui/Button'
import { ui } from '@/i18n/ui'

/** Beklenmeyen hata — sayfa çökse de site iskeleti (header, footer) yerinde kalır. */
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = ui('en').error
  return (
    <StatusPage
      code="500"
      title={t.title}
      text={t.text}
      action={
        <button type="button" onClick={() => reset()} className={buttonClass('primary', 'lg', 'cursor-pointer border-0')}>
          {t.retry}
        </button>
      }
    />
  )
}
