import Link from 'next/link'
import { buttonClass } from '@/components/ui/Button'

/** 404 / hata sayfalarının ortak gövdesi — gece laciverti, büyük mono kod, tek eylem. */
export function StatusPage({ code, title, text, action }: { code: string; title: string; text: string; action: React.ReactNode }) {
  return (
    <main className="surface-dark relative overflow-hidden bg-ink text-onDark">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[length:80px_80px]"
      />
      <div className="shell relative flex min-h-[60vh] flex-col justify-center py-section">
        <p className="mb-6 font-mono text-label font-semibold uppercase text-accent-light">{code}</p>
        <h1 className="mb-5 max-w-[760px] font-display text-h1 font-bold text-white">{title}</h1>
        <p className="mb-10 max-w-lead text-lead font-light text-onDark-muted">{text}</p>
        <div className="flex flex-wrap gap-3.5">{action}</div>
      </div>
    </main>
  )
}

export function HomeButton({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className={buttonClass('primary', 'lg')}>
      {label}
    </Link>
  )
}
