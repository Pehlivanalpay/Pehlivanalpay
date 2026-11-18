import Link from 'next/link'
import { buttonClass } from '@/components/ui/Button'
import { CategoryTag } from '@/components/ui/CategoryTag'
import { DesktopBackdrop } from '@/components/ui/DesktopBackdrop'
import type { fikserlik } from '@/content/fikserlik'

type Header = (typeof fikserlik)['header']

/**
 * Hizmet sayfası başlığı. Hero'nun sade kardeşi: aynı fotoğraf zemini (yalnızca masaüstü),
 * daha koyu perde, nişangâh ve panel yok. Konum (breadcrumb) navigasyonu var.
 */
export function PageHeader({ content: c }: { content: Header }) {
  return (
    <section className="relative overflow-hidden border-b border-rule">
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <DesktopBackdrop
          src="/hero-bg.jpg"
          width={1376}
          height={768}
          priority
          className="object-cover object-[center_42%] opacity-[0.62] mix-blend-multiply contrast-[1.22] grayscale"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-[rgba(242,243,245,.94)] lg:bg-transparent lg:bg-[linear-gradient(100deg,rgba(242,243,245,.95)_0%,rgba(242,243,245,.88)_45%,rgba(242,243,245,.62)_100%)]"
      />
      <div aria-hidden="true" className="absolute inset-0 z-[1] bg-scan" />
      <div aria-hidden="true" className="absolute inset-0 z-[1] bg-blueprint" />

      <div className="shell relative z-[2] pb-[clamp(76px,7.5vw,108px)] pt-[clamp(56px,6vw,88px)]">
        <nav aria-label="Konum" className="mb-[34px] font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
          <ol className="flex flex-wrap items-center">
            {c.breadcrumb.map((b, i) => {
              const last = i === c.breadcrumb.length - 1
              return (
                <li key={b.label} className="flex items-center">
                  {i > 0 && (
                    <span aria-hidden="true" className="px-[0.6em]">
                      /
                    </span>
                  )}
                  {'href' in b && b.href ? (
                    <Link href={b.href} className="border-b border-ink/30">
                      {b.label}
                    </Link>
                  ) : (
                    <span className={last ? 'text-ink' : undefined} aria-current={last ? 'page' : undefined}>
                      {b.label}
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>
        <div className="grid grid-cols-1 items-end gap-y-10 lg:min-h-[280px] lg:grid-cols-12 lg:gap-x-6 lg:gap-y-9">
          <div className="min-w-0 lg:col-span-7">
            <p className="mb-6">
              <CategoryTag num={c.tag.num} size="svc">
                {c.tag.code}
              </CategoryTag>
            </p>
            <h1 className="font-display text-h1 font-bold">{c.title}</h1>
          </div>
          <div className="min-w-0 lg:col-span-5">
            <p className="mb-7 text-lead font-light text-[#232A33]">{c.lead}</p>
            <Link href={c.cta.href} className={buttonClass('primary', 'lg')}>
              {c.cta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
