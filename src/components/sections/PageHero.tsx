import Image from 'next/image'
import Link from 'next/link'
import { buttonClass } from '@/components/ui/Button'
import type { Img } from '@/content/home'
import type { Locale } from '@/i18n/config'
import { ui } from '@/i18n/ui'
import { blurProps } from '@/content/images'


type Title = { before: string; highlight: string; after?: string }

/**
 * Hizmet sayfası başlığı: konum (breadcrumb) + etiket + başlık (bordo vurgulu) + spot + düğme,
 * sağda sayfanın ana görseli. Ana görsel kesik köşeli çerçevede (kesik köşe #3).
 * tone="dark": gece laciverti zemin (Marka & PR, Prodüksiyon). tone="light": kâğıt zemin + ızgara.
 */
export function PageHero({
  label,
  title,
  titleLang,
  lead,
  leadLang,
  leadSecondary,
  cta,
  image,
  breadcrumb,
  tone = 'light',
  locale = 'tr',
}: {
  label: string
  title: Title
  titleLang?: string
  lead: string
  leadLang?: string
  leadSecondary?: string
  cta?: { label: string; href: string }
  image?: Img
  breadcrumb: { label: string; href?: string }[]
  tone?: 'light' | 'dark'
  locale?: Locale
}) {
  const dark = tone === 'dark'
  return (
    <section className={`relative overflow-hidden border-b ${dark ? 'surface-dark border-rule-dark bg-ink text-onDark' : 'border-rule'}`}>
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-[length:80px_80px] ${
          dark
            ? 'bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)]'
            : 'bg-blueprint'
        }`}
      />
      <div aria-hidden="true" className={`absolute inset-0 ${dark ? 'bg-scan-dark' : 'bg-scan'}`} />

      <div className="shell relative py-[clamp(56px,6vw,96px)]">
        <nav aria-label={ui(locale).breadcrumb} className={`mb-[34px] font-mono text-[11px] uppercase tracking-[0.2em] ${dark ? 'text-onDark-glass' : 'text-ink-muted'}`}>
          <ol className="flex flex-wrap items-center">
            {breadcrumb.map((b, i) => {
              const last = i === breadcrumb.length - 1
              return (
                <li key={b.label} className="flex items-center">
                  {i > 0 && (
                    <span aria-hidden="true" className="px-[0.6em]">
                      /
                    </span>
                  )}
                  {b.href ? (
                    <Link href={b.href} className={`border-b ${dark ? 'border-white/30' : 'border-ink/30'}`}>
                      {b.label}
                    </Link>
                  ) : (
                    <span aria-current={last ? 'page' : undefined} className={dark ? 'text-white' : 'text-ink'}>
                      {b.label}
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>

        <div className="grid grid-cols-1 items-center gap-y-10 lg:grid-cols-12 lg:gap-x-6">
          <div className={`min-w-0 ${image ? 'lg:col-span-6' : 'lg:col-span-9'}`}>
            <p className={`mb-6 font-mono text-label font-semibold uppercase ${dark ? 'text-accent-light' : 'text-accent'}`}>{label}</p>
            <h1 lang={titleLang} className={`font-display text-h1 font-bold ${dark ? 'text-white' : ''}`}>
              {title.before} <span className={dark ? 'text-accent-light' : 'text-accent'}>{title.highlight}</span>
              {title.after && <>{/^[.,!?]/.test(title.after) ? '' : ' '}{title.after}</>}
            </h1>
            <p lang={leadLang} className={`mt-7 max-w-lead text-lead font-light ${dark ? 'text-onDark-muted' : 'text-[#232A33]'}`}>
              {lead}
            </p>
            {leadSecondary && <p className={`mt-3 max-w-lead text-small ${dark ? 'text-onDark-glass' : 'text-ink-muted'}`}>{leadSecondary}</p>}
            {cta && (
              <div className="mt-9">
                <Link href={cta.href} className={buttonClass('primary', 'lg')}>
                  {cta.label}
                </Link>
              </div>
            )}
          </div>
          {image && (
            <figure className="relative m-0 min-w-0 overflow-hidden bg-ink notch-30 lg:col-span-6">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 960px) 50vw, 100vw"
                // Sayfanın ana görseli: önyüklenir (LCP) ve yüklenirken bulanık ön izleme görünür
                priority
                {...blurProps(image)}
                className="block aspect-[16/10] w-full object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-scan-dark" />
            </figure>
          )}
        </div>
      </div>
    </section>
  )
}
