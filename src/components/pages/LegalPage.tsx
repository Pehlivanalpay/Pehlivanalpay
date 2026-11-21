import { SectionLabel } from '@/components/ui/SectionLabel'
import { kvkk, privacy } from '@/content/legal'
import type { Locale } from '@/i18n/config'

/** KVKK aydınlatma metni / Privacy notice — okunabilir tek sütun (en çok ~72 karakter). */
export function LegalPage({ locale }: { locale: Locale }) {
  const d = locale === 'en' ? privacy : kvkk
  const date = new Date(`${d.updated}T12:00:00Z`).toLocaleDateString(locale === 'en' ? 'en-GB' : 'tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <main>
      <article aria-labelledby="yasal-baslik" className="shell py-section-sm">
        <div className="max-w-[760px]">
          <SectionLabel>{d.label}</SectionLabel>
          <h1 id="yasal-baslik" className="mb-4 font-display text-h1 font-bold">
            {d.title}
          </h1>
          <p className="mb-10 font-mono text-[12px] uppercase tracking-[0.18em] text-ink-muted">
            {locale === 'en' ? 'Last updated' : 'Son güncelleme'}: <time dateTime={d.updated}>{date}</time>
          </p>
          <p className="mb-12 text-[18px] leading-[1.7] text-ink-body">{d.intro}</p>
          {d.sections.map((s) => (
            <section key={s.title} className="mb-10 border-t border-rule pt-8">
              <h2 className="mb-4 font-display text-[24px] font-bold leading-tight">{s.title}</h2>
              {s.paragraphs?.map((p) => (
                <p key={p} className="mb-4 text-body leading-[1.75] text-ink-body">
                  {p}
                </p>
              ))}
              {s.items && (
                <ul className="list-disc space-y-2.5 pl-5 text-body leading-[1.7] text-ink-body marker:text-accent">
                  {s.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>
    </main>
  )
}
