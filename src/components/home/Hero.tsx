import Image from 'next/image'
import Link from 'next/link'
import { buttonClass } from '@/components/ui/Button'
import type { hero as HeroContent } from '@/content/home'

/**
 * Hero — açık zemin üzerinde gri tonlu fotoğraf + perde + tarama + mühendislik ızgarası,
 * sağda 90 sn'de dönen nişangâh (hareket #1, reduced-motion'da durur),
 * sağda notch'lu "Saha kaydı" paneli (kesik köşe #2).
 * Görsel `priority` — sitede priority alan TEK görsel budur.
 */
export function Hero({ content: c }: { content: typeof HeroContent }) {
  return (
    <section className="relative overflow-hidden border-b border-rule">
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <Image
          src={c.image.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_42%] opacity-[0.62] mix-blend-multiply contrast-[1.22] grayscale"
        />
      </div>
      {/* Perde: dar ekranda düz %94 — metin okunurluğu (§3) */}
      <div aria-hidden="true" className="absolute inset-0 z-[1] bg-[rgba(242,243,245,.94)] lg:bg-transparent lg:bg-hero-veil" />
      <div aria-hidden="true" className="absolute inset-0 z-[1] bg-scan" />
      <div aria-hidden="true" className="absolute inset-0 z-[1] bg-blueprint" />

      {c.telemetry && (
        <div
          aria-hidden="true"
          className="absolute bottom-[22px] right-edge z-[2] hidden items-center gap-[18px] font-mono text-[11px] tracking-[0.18em] text-ink-muted lg:flex"
        >
          <span className="inline-flex items-center gap-2">
            <span className="h-[7px] w-[7px] rounded-full bg-accent motion-safe:animate-blip" />
            REC
          </span>
          <span>{c.telemetry.timecode}</span>
          <span>{c.telemetry.coords}</span>
        </div>
      )}

      {/* Nişangâh — dekoratif; bölüm overflow:hidden olduğu için taşma yaratmaz */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[180px] top-1/2 z-[1] -mt-[380px] h-[760px] w-[760px] opacity-50 motion-safe:animate-rot"
      >
        <svg viewBox="0 0 600 600" width="100%" height="100%">
          <circle cx="300" cy="300" r="296" fill="none" stroke="rgba(11,13,16,.14)" strokeWidth="1" />
          <circle cx="300" cy="300" r="250" fill="none" stroke="rgba(11,13,16,.2)" strokeWidth="4" strokeDasharray="1 29.2" />
          <circle cx="300" cy="300" r="196" fill="none" stroke="rgba(196,30,42,.28)" strokeWidth="1" strokeDasharray="140 46" />
        </svg>
      </div>

      <div className="shell relative z-[2] pb-[clamp(56px,6vw,88px)] pt-[clamp(64px,7vw,108px)]">
        <div className="grid grid-cols-1 items-end gap-y-10 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-14">
          <div className="min-w-0 lg:col-span-7">
            <p className="mb-[30px] font-mono text-label font-semibold uppercase text-ink-muted">
              {c.eyebrow.map((e, i) => (
                <span key={e}>
                  {i > 0 && <>&nbsp;/&nbsp; </>}
                  {e}
                </span>
              ))}
            </p>
            <h1 className="font-display text-h1 font-bold">{c.title}</h1>
            <div aria-hidden="true" className="mb-[30px] mt-[38px] h-px bg-ink/[0.18]" />
            <p className="mb-3.5 max-w-lead text-lead font-light text-[#232A33]">{c.lead}</p>
            <p lang="en" className="mb-[38px] font-mono text-[12px] tracking-[0.06em] text-ink-muted">
              {c.leadEn}
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Link href={c.primary.href} className={buttonClass('primary', 'lg')}>
                {c.primary.label}
              </Link>
              <Link href={c.secondary.href} className={buttonClass('secondary', 'lg')}>
                {c.secondary.label}
              </Link>
            </div>
          </div>

          <aside
            aria-label={c.panel.title}
            className="surface-dark min-w-0 border border-rule-dark bg-glass-panel text-onDark backdrop-blur-[10px] notch-26 lg:col-span-5"
          >
            <div className="flex items-center justify-between gap-4 border-b border-rule-dark px-7 py-6">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-white">{c.panel.title}</span>
              <span className="font-mono text-[11px] tracking-[0.18em] text-[#99A1AD]">{c.panel.meta}</span>
            </div>
            <dl className="px-7 pb-[22px] pt-2">
              {c.panel.stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex items-baseline justify-between gap-5 py-[18px] ${i < c.panel.stats.length - 1 ? 'border-b border-white/10' : ''}`}
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#99A1AD]">{s.label}</dt>
                  <dd className="font-display text-[40px] font-bold leading-none tracking-[-0.02em] text-white">
                    {s.value} <span className="text-[16px] font-medium text-[#99A1AD]">{s.unit}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="border-t border-rule-dark bg-white/5 px-7 py-4 font-mono text-[11px] leading-[1.7] tracking-[0.08em] text-onDark-muted">
              {c.panel.note}
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
