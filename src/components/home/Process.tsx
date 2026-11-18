import { SectionLabel } from '@/components/ui/SectionLabel'
import type { method as Content } from '@/content/home'

/** 06 — Çalışma yöntemi. Üç aşama. */
export function Process({ content: c }: { content: typeof Content }) {
  return (
    <section aria-labelledby="yontem-baslik">
      <div className="shell py-section">
        <SectionLabel index={c.index}>{c.label}</SectionLabel>
        <h2 id="yontem-baslik" className="mb-[60px] max-w-[760px] font-display text-h2 font-bold">
          {c.title}
        </h2>
        <ol className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-6">
          {c.steps.map((s, i) => (
            <li key={s.title} className="min-w-0 border-t border-rule pt-6 lg:col-span-4">
              <p className="mb-3.5 font-mono text-[11px] font-semibold tracking-[0.22em] text-ink-muted">
                AŞAMA {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mb-3 font-display text-[24px] font-semibold tracking-[-0.01em]">{s.title}</h3>
              <p className="text-[15px] font-light leading-[1.72] text-[#232A33]">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
