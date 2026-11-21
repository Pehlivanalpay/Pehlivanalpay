/** İki sütunlu madde listesi (PDF Fikserlik: "Fixing & local support" / "Production services"). */
import type { Locale } from '@/i18n/config'
import { ui } from '@/i18n/ui'

export function BulletColumns({ columns, locale = 'tr' }: { columns: readonly { label: string; items: readonly string[] }[]; locale?: Locale }) {
  return (
    <section aria-label={ui(locale).scope}>
      <div className="shell py-[clamp(64px,6.5vw,104px)]">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-12">
          {columns.map((col) => (
            <div key={col.label} className="min-w-0">
              <h2 lang="en" className="mb-2 font-mono text-label font-semibold uppercase text-accent">
                {col.label}
              </h2>
              <ul>
                {col.items.map((it) => (
                  <li key={it} className="flex items-baseline gap-4 border-b border-rule py-[18px] font-display text-h3-list font-semibold">
                    <span aria-hidden="true" className="h-2 w-2 flex-none translate-y-[-2px] rounded-full bg-accent" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
