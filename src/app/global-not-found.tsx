import type { Metadata } from 'next'
import Link from 'next/link'
import { LogoMark } from '@/components/ui/LogoMark'
import { buttonClass } from '@/components/ui/Button'
import { fontVars } from './fonts'
import './globals.css'

/**
 * Hiçbir rotaya uymayan adresler için iki dilli 404 (iki ayrı kök layout olduğu için gerekli —
 * next.config experimental.globalNotFound). Layout'u atlar; iskeleti burada sade biçimde kurar.
 */
export const metadata: Metadata = { title: '404 – ELIS360 NEWS', robots: { index: false } }

export default function GlobalNotFound() {
  return (
    <html lang="tr" className={fontVars}>
      <body className="surface-dark min-h-screen bg-ink text-onDark">
        <main className="shell flex min-h-screen flex-col justify-center py-section">
          <Link href="/" className="mb-14 inline-flex items-center gap-3 self-start">
            <LogoMark size={40} />
            <span className="font-display text-[26px] font-bold tracking-[0.11em] text-white">
              ELIS<span className="text-accent-light">360</span>
            </span>
            <span className="font-mono text-[13px] tracking-[0.32em] text-onDark-glass">NEWS</span>
          </Link>
          <p className="mb-6 font-mono text-label font-semibold uppercase text-accent-light">404</p>
          <h1 className="mb-3 font-display text-h1 font-bold text-white">Sayfa bulunamadı</h1>
          <p lang="en" className="mb-10 font-display text-h2-block font-bold text-onDark-muted">
            Page not found
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Link href="/" className={buttonClass('primary', 'lg')}>
              Ana sayfa
            </Link>
            <Link href="/en" lang="en" className={buttonClass('secondary-dark', 'lg')}>
              English home
            </Link>
          </div>
        </main>
      </body>
    </html>
  )
}
