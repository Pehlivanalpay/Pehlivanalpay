import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { serviceAreas as Content } from '@/content/home'

/** 03 — Hizmet alanları: her biri kendi sayfasına giden beş kart. Marka & PR kartı koyu (PDF). */
export function ServiceAreas({ content: c }: { content: typeof Content }) {
  return (
    <section aria-labelledby="hizmet-alanlari-baslik" className="border-t border-rule">
      <div className="shell py-section">
        <div className="mb-12 grid grid-cols-1 items-end gap-y-5 lg:grid-cols-12 lg:gap-x-6">
          <div className="min-w-0 lg:col-span-8">
            <SectionLabel index={c.index}>{c.label}</SectionLabel>
            <h2 id="hizmet-alanlari-baslik" className="font-display text-h2 font-bold">
              {c.title}
            </h2>
          </div>
          <p className="min-w-0 text-small font-light text-ink-muted lg:col-span-4">{c.intro}</p>
        </div>
        {/* Akışkan ızgara (§3) — ek kırılma noktası yok */}
        <ul className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(340px,100%),1fr))]">
          {c.items.map((s) => {
            const dark = 'dark' in s && s.dark
            return (
              <li key={s.num} className="min-w-0">
                <Link
                  href={s.href}
                  className={`flex h-full min-h-[220px] flex-col justify-between gap-8 border p-7 ${
                    dark ? 'surface-dark border-ink bg-ink text-onDark' : 'border-rule bg-white'
                  }`}
                >
                  <span>
                    <span className={`mb-4 block font-mono text-[12px] font-semibold tracking-[0.2em] ${dark ? 'text-accent-light' : 'text-accent'}`}>{s.num}</span>
                    <span className={`mb-3 block font-display text-h3-card font-semibold ${dark ? 'text-white' : ''}`}>{s.title}</span>
                    <span className={`block text-small ${dark ? 'text-onDark-muted' : 'text-ink-mono'}`}>{s.text}</span>
                  </span>
                  <span className={`font-mono text-[12px] font-semibold uppercase tracking-[0.16em] ${dark ? 'text-onDark-glass' : 'text-ink-muted'}`}>
                    Sayfaya git →
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
