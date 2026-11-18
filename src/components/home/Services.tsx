import Link from 'next/link'
import { CategoryTag } from '@/components/ui/CategoryTag'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionMotif } from '@/components/ui/SectionMotif'
import type { services as Content } from '@/content/home'

/** 03 — Hizmet kapsamı. Sağda fotoğraf motifi; dört hizmet satırı (46px dikey). */
export function Services({ content: c }: { content: typeof Content }) {
  return (
    <section id="hizmetler" aria-labelledby="hizmetler-baslik" className="relative overflow-hidden border-t border-rule">
      <SectionMotif side="right" />
      <div className="shell relative z-[1] py-section">
        <div className="mb-16 grid grid-cols-1 items-end gap-y-6 lg:grid-cols-12 lg:gap-x-6">
          <div className="min-w-0 lg:col-span-7">
            <SectionLabel index={c.index}>{c.label}</SectionLabel>
            <h2 id="hizmetler-baslik" className="font-display text-h2 font-bold">
              {c.title}
            </h2>
          </div>
          <p className="min-w-0 text-small font-light leading-[1.7] text-ink-muted lg:col-span-5">{c.intro}</p>
        </div>

        {c.items.map((s, i) => (
          <article
            key={s.code}
            id={s.id}
            aria-labelledby={`hizmet-${s.num}`}
            className={`grid grid-cols-1 gap-6 py-[46px] lg:grid-cols-12 ${
              i === 0 ? 'border-t-2 border-ink' : 'border-t border-ink/20'
            } ${i === c.items.length - 1 ? 'border-b border-b-ink/20' : ''}`}
          >
            <div className="min-w-0 lg:col-span-4">
              <p className="mb-5">
                <CategoryTag num={s.num} size="svc">
                  {s.code}
                </CategoryTag>
              </p>
              <h3 id={`hizmet-${s.num}`} className="font-display text-h3-svc font-bold">
                {s.title}
              </h3>
            </div>
            <p className="min-w-0 text-body leading-[1.7] text-ink-body lg:col-span-5">{s.text}</p>
            <div className="min-w-0 lg:col-span-3">
              <ul className="font-mono text-[12px] leading-[1.5] tracking-[0.04em] text-ink-mono">
                {s.points.map((pt) => (
                  <li key={pt} className="border-t border-ink/[0.12] py-[9px]">
                    {pt}
                  </li>
                ))}
              </ul>
              {'link' in s && s.link && (
                <Link
                  href={s.link.href}
                  className="mt-[22px] inline-block border-b-2 border-accent pb-[3px] font-mono text-[12px] font-semibold uppercase tracking-[0.16em]"
                >
                  {s.link.label}
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
