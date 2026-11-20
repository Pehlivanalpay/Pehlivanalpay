import Link from 'next/link'
import { buttonClass } from '@/components/ui/Button'
import { DesktopBackdrop } from '@/components/ui/DesktopBackdrop'
import type { hero as HeroContent } from '@/content/home'

/**
 * Hero — gece laciverti zemin (PDF önerisi), üzerinde stüdyo fotoğrafı + soldan perde + tarama +
 * mühendislik ızgarası; sağda 90 sn'de dönen nişangâh (hareket #1, reduced-motion'da durur) ve
 * kesik köşeli "Güven göstergeleri" paneli (kesik köşe #2).
 * Fotoğraf yalnızca masaüstünde indirilir ve sitede `priority` alan TEK görseldir.
 */
export function Hero({ content: c }: { content: typeof HeroContent }) {
  return (
    <section className="surface-dark relative overflow-hidden bg-ink text-onDark">
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <DesktopBackdrop
          src={c.image.src}
          width={c.image.width}
          height={c.image.height}
          priority
          className="object-cover object-[center_40%] opacity-[0.55] saturate-[0.85]"
        />
      </div>
      {/* Perde: metnin olduğu soldan koyu, sağa doğru açılır. Dar ekranda düz lacivert. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-ink lg:bg-transparent lg:bg-[linear-gradient(100deg,rgba(7,17,31,.97)_0%,rgba(7,17,31,.86)_42%,rgba(7,17,31,.45)_100%)]"
      />
      <div aria-hidden="true" className="absolute inset-0 z-[1] bg-scan-dark" />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[length:80px_80px]"
      />

      {c.telemetry && (
        <div
          aria-hidden="true"
          className="absolute bottom-[22px] right-edge z-[2] hidden items-center gap-[18px] font-mono text-[11px] tracking-[0.18em] text-onDark-glass lg:flex"
        >
          <span className="inline-flex items-center gap-2">
            <span className="h-[7px] w-[7px] rounded-full bg-accent-light motion-safe:animate-blip" />
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
          <circle cx="300" cy="300" r="296" fill="none" stroke="rgba(243,239,231,.16)" strokeWidth="1" />
          <circle cx="300" cy="300" r="250" fill="none" stroke="rgba(243,239,231,.22)" strokeWidth="4" strokeDasharray="1 29.2" />
          <circle cx="300" cy="300" r="196" fill="none" stroke="rgba(242,102,125,.45)" strokeWidth="1" strokeDasharray="140 46" />
        </svg>
      </div>

      <div className="shell relative z-[2] pb-[clamp(56px,6vw,88px)] pt-[clamp(64px,7vw,108px)]">
        <div className="grid grid-cols-1 items-end gap-y-10 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-14">
          <div className="min-w-0 lg:col-span-7">
            <p className="mb-[30px] font-mono text-label font-semibold uppercase text-onDark-glass">
              {c.eyebrow.map((e, i) => (
                <span key={e}>
                  {i > 0 && <>&nbsp;•&nbsp; </>}
                  {e}
                </span>
              ))}
            </p>
            <h1 className="font-display text-h1 font-bold text-white">
              {c.title.before} <span className="text-accent-light">{c.title.highlight}</span>
            </h1>
            <div aria-hidden="true" className="mb-[30px] mt-[38px] h-px bg-white/[0.18]" />
            <p className="mb-[38px] max-w-lead text-lead font-light text-onDark-muted">{c.lead}</p>
            <div className="flex flex-wrap gap-3.5">
              <Link href={c.primary.href} className={buttonClass('primary', 'lg')}>
                {c.primary.label}
              </Link>
              <Link href={c.secondary.href} className={buttonClass('secondary-dark', 'lg')}>
                {c.secondary.label}
              </Link>
            </div>
          </div>

          <aside
            aria-label={c.panel.title}
            className="min-w-0 border border-rule-dark bg-glass-panel text-onDark backdrop-blur-[10px] notch-26 lg:col-span-5"
          >
            <div className="flex items-center justify-between gap-4 border-b border-rule-dark px-7 py-6">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-white">{c.panel.title}</span>
              <span className="font-mono text-[11px] tracking-[0.18em] text-onDark-glass">{c.panel.meta}</span>
            </div>
            <dl className="px-7 pb-[22px] pt-2">
              {c.panel.stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex items-baseline justify-between gap-5 py-[16px] ${i < c.panel.stats.length - 1 ? 'border-b border-white/10' : ''}`}
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-onDark-glass">{s.label}</dt>
                  <dd className="text-right font-display text-[clamp(28px,2.6vw,36px)] font-bold leading-none tracking-[-0.02em] text-white">
                    {s.value} {s.unit && <span className="text-[16px] font-medium text-onDark-glass">{s.unit}</span>}
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
