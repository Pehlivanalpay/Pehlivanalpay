import type { Metadata } from 'next'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { kunye, principles } from '@/content/kunye'
import { ogDefaults } from '@/lib/seo'

const description = 'ELIS360 NEWS künyesi: yayın sahibi, sorumlu müdür, iletişim bilgileri, yayın ilkeleri ve düzeltme politikası.'

export const metadata: Metadata = {
  title: 'Künye ve yayın ilkeleri',
  description,
  alternates: { canonical: '/kunye' },
  openGraph: { ...ogDefaults, title: 'Künye ve yayın ilkeleri – ELIS360 NEWS', description, url: '/kunye' },
}

/** Künye (Basın Kanunu) + yayın ilkeleri + düzeltme politikası. Boş künye alanları gösterilmez. */
export default function KunyePage() {
  const rows = kunye.rows.filter((r) => r.value)
  return (
    <main>
      <article aria-labelledby="kunye-baslik" className="shell py-section-sm">
        <div className="max-w-[760px]">
          <SectionLabel>Kurumsal</SectionLabel>
          <h1 id="kunye-baslik" className="mb-10 font-display text-h1 font-bold">
            Künye
          </h1>
          <dl className="mb-16 border-t-2 border-ink">
            {rows.map((r) => (
              <div key={r.label} className="grid grid-cols-1 gap-1 border-b border-rule py-4 sm:grid-cols-[minmax(0,240px)_1fr] sm:gap-6">
                <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-muted">{r.label}</dt>
                <dd className="min-w-0 text-[16px] text-ink">
                  {r.href ? (
                    <a href={r.href} className="break-words border-b border-accent">
                      {r.value}
                    </a>
                  ) : (
                    r.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <section id="yayin-ilkeleri" aria-labelledby="ilkeler-baslik" className="mb-14 scroll-mt-24">
            <h2 id="ilkeler-baslik" className="mb-5 font-display text-h2-block font-bold">
              Yayın ilkelerimiz
            </h2>
            <p className="mb-8 text-body leading-[1.75] text-ink-body">{principles.intro}</p>
            <ol className="border-t border-rule">
              {principles.items.map((p, i) => (
                <li key={p.title} className="grid grid-cols-[auto_1fr] gap-x-5 border-b border-rule py-6">
                  <span className="font-mono text-[12px] font-semibold tracking-[0.2em] text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="mb-2 font-display text-[20px] font-bold leading-tight">{p.title}</h3>
                    <p className="text-body leading-[1.7] text-ink-body">{p.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="duzeltme" aria-labelledby="duzeltme-baslik" className="scroll-mt-24">
            <h2 id="duzeltme-baslik" className="mb-5 font-display text-h2-block font-bold">
              Düzeltme politikası
            </h2>
            <p className="text-body leading-[1.75] text-ink-body">{principles.corrections}</p>
          </section>
        </div>
      </article>
    </main>
  )
}
