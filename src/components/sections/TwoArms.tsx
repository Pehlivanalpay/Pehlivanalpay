import Link from 'next/link'
import { CategoryTag } from '@/components/ui/CategoryTag'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { twoArms as Content } from '@/content/home'
import type { Locale } from '@/i18n/config'
import { ui } from '@/i18n/ui'


/** 01 — İki uzmanlık, tek merkez: Medya & Saha (açık) / Marka & İletişim (koyu) + değerler. */
export function TwoArms({ content: c, locale = 'tr' }: { content: typeof Content; locale?: Locale }) {
  return (
    <section aria-labelledby="iki-kol-baslik">
      <div className="shell py-section">
        <SectionLabel index={c.index}>{c.label}</SectionLabel>
        <h2 id="iki-kol-baslik" className="mb-12 max-w-[760px] font-display text-h2 font-bold">
          {c.title}
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {c.arms.map((a) => {
            const dark = a.tone === 'dark'
            return (
              <article
                key={a.letter}
                className={`flex min-w-0 flex-col justify-between gap-10 border p-[clamp(24px,3vw,40px)] ${
                  dark ? 'surface-dark border-ink bg-ink text-onDark' : 'border-rule bg-white'
                }`}
              >
                <div>
                  <p className={`mb-5 font-mono text-[13px] font-semibold tracking-[0.2em] ${dark ? 'text-accent-light' : 'text-accent'}`}>{a.letter}</p>
                  <h3 className={`mb-4 font-display text-h3-svc font-bold ${dark ? 'text-white' : ''}`}>{a.title}</h3>
                  <p className={`max-w-[480px] text-body leading-[1.7] ${dark ? 'text-onDark-muted' : 'text-ink-body'}`}>{a.text}</p>
                </div>
                <Link
                  href={a.href}
                  className={`self-start border-b-2 pb-[3px] font-mono text-[12px] font-semibold uppercase tracking-[0.16em] ${
                    dark ? 'border-accent-light text-white' : 'border-accent'
                  }`}
                >
                  {a.cta}
                </Link>
              </article>
            )
          })}
        </div>
        <ul aria-label={ui(locale).principles} className="mt-8 flex flex-wrap gap-2.5">
          {c.values.map((v) => (
            <li key={v}>
              <CategoryTag size="sm">{v}</CategoryTag>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
