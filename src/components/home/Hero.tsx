import Link from 'next/link'
import { buttonClass } from '@/components/ui/Button'
import { DesktopBackdrop } from '@/components/ui/DesktopBackdrop'
import type { hero as HeroContent } from '@/content/home'

/**
 * Hero — gece laciverti zemin, mühendislik ızgarası + tarama deseni, arkada 90 sn'de dönen
 * nişangâh (hareket #1, reduced-motion'da durur).
 * Sol: mesaj + iki hizmet girişi. Sağ: tek güçlü prodüksiyon görseli, kesik köşeli çerçevede
 * (kesik köşe #2 — hero). Alt: dört göstergeli şerit (PDF s.1).
 *
 * Görsel yalnızca masaüstünde indirilir (mobilde çerçeve hiç çizilmez) ve sitede `priority`
 * alan TEK görseldir.
 */
export function Hero({ content: c }: { content: typeof HeroContent }) {
  return (
    <section className="surface-dark relative overflow-hidden bg-ink text-onDark">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[length:80px_80px]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-scan-dark" />

      {/* Nişangâh — dekoratif; bölüm overflow:hidden olduğu için taşma yaratmaz */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[220px] top-[42%] -mt-[380px] h-[760px] w-[760px] opacity-50 motion-safe:animate-rot"
      >
        <svg viewBox="0 0 600 600" width="100%" height="100%">
          <circle cx="300" cy="300" r="296" fill="none" stroke="rgba(243,239,231,.14)" strokeWidth="1" />
          <circle cx="300" cy="300" r="250" fill="none" stroke="rgba(243,239,231,.2)" strokeWidth="4" strokeDasharray="1 29.2" />
          <circle cx="300" cy="300" r="196" fill="none" stroke="rgba(242,102,125,.45)" strokeWidth="1" strokeDasharray="140 46" />
        </svg>
      </div>

      <div className="shell relative pb-[clamp(40px,4vw,56px)] pt-[clamp(56px,6.5vw,100px)]">
        <div className="grid grid-cols-1 items-center gap-y-10 lg:grid-cols-12 lg:gap-x-6">
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
            <p className="mb-[38px] mt-8 max-w-lead text-lead font-light text-onDark-muted">{c.lead}</p>
            <div className="flex flex-wrap gap-3.5">
              <Link href={c.primary.href} className={buttonClass('primary', 'lg')}>
                {c.primary.label}
              </Link>
              <Link href={c.secondary.href} className={buttonClass('secondary-dark', 'lg')}>
                {c.secondary.label}
              </Link>
            </div>
          </div>

          {/* Ana prodüksiyon görseli — masaüstünde. Fotoğraf dekoratif değil: alt metni var. */}
          <figure className="relative m-0 hidden min-w-0 lg:col-span-5 lg:block">
            <div className="relative aspect-[4/3.4] overflow-hidden border border-rule-dark bg-ink notch-26">
              <DesktopBackdrop src={c.image.src} width={c.image.width} height={c.image.height} priority alt={c.image.alt} className="object-cover object-center" />
            </div>
            {c.telemetry && (
              <figcaption aria-hidden="true" className="mt-3.5 flex items-center justify-between gap-4 font-mono text-[11px] tracking-[0.18em] text-onDark-glass">
                <span className="inline-flex items-center gap-2">
                  <span className="h-[7px] w-[7px] rounded-full bg-accent-light motion-safe:animate-blip" />
                  REC {c.telemetry.timecode}
                </span>
                <span>{c.telemetry.coords}</span>
              </figcaption>
            )}
          </figure>
        </div>

        {/* Gösterge şeridi */}
        <dl className="mt-[clamp(48px,5vw,72px)] grid grid-cols-2 border-t border-rule-dark lg:grid-cols-4">
          {c.stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex min-w-0 flex-col-reverse gap-2.5 py-6 pr-4 ${i % 2 === 1 ? 'border-l border-rule-dark pl-5' : ''} ${
                i > 1 ? 'border-t border-rule-dark lg:border-t-0' : ''
              } ${i === 2 ? 'lg:border-l lg:pl-5' : ''}`}
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-onDark-glass">{s.label}</dt>
              <dd className="font-display text-[clamp(26px,2.8vw,40px)] font-bold leading-none tracking-[-0.02em] text-white">
                <span className="text-accent-light">{s.value}</span>
                {s.unit && <span className="ml-2 text-[0.5em] font-medium text-onDark">{s.unit}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
