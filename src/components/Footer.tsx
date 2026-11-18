import Link from 'next/link'
import { footer, site } from '@/content/site'

const colTitle = 'mb-[18px] font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-onDark-glass'

export function Footer() {
  return (
    <footer className="surface-dark bg-ink text-onDark">
      <div className="shell pt-14">
        <div className="grid grid-cols-1 gap-y-10 pb-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="min-w-0 lg:col-span-5">
            <p className="mb-3.5 flex items-baseline gap-[9px]">
              <span className="font-display text-[21px] font-bold tracking-[0.14em] text-white">
                ELIS<span className="text-accent-light">360</span>
              </span>
              <span className="font-mono text-[12px] font-medium tracking-[0.3em] text-onDark-muted">NEWS</span>
            </p>
            <p className="max-w-[340px] text-[15px] font-light leading-[1.7] text-onDark-muted">{footer.tagline}</p>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.label} className={`min-w-0 ${col.span}`}>
              <p className={colTitle}>{col.title}</p>
              <ul className="flex flex-col gap-[3px] text-[15px] font-light">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="inline-block py-1">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="min-w-0 lg:col-span-2">
            <p className={colTitle}>İletişim</p>
            <a
              href={`mailto:${site.email}`}
              className="break-all border-b border-accent-light pb-0.5 font-mono text-[13px] leading-[1.6] text-white"
            >
              {site.email}
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2.5 border-t border-rule-dark py-5 font-mono text-[11px] uppercase tracking-[0.16em] text-onDark-glass">
          <span>{footer.bottom.copyright}</span>
          <span className="flex flex-wrap gap-x-[26px] gap-y-2">
            {footer.bottom.lines.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </span>
          <span className="tracking-[0.08em]">
            <span className="text-onDark">{footer.bottom.motto[0]}</span> {footer.bottom.motto[1]}
          </span>
        </div>
      </div>
    </footer>
  )
}
