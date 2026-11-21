import Link from 'next/link'
import { buttonClass } from '@/components/ui/Button'
import { WhatsAppIcon, whatsappHref } from '@/components/ui/WhatsApp'
import { site } from '@/content/site'
import { route, type Locale } from '@/i18n/config'
import { ui } from '@/i18n/ui'

/** Sayfa sonu çağrı şeridi — surface-dark. Birincil: iletişim formu; ikincil: e-posta. */
export function CtaBand({
  label,
  title,
  text,
  locale = 'tr',
}: {
  label?: string
  title?: string
  text?: string
  locale?: Locale
}) {
  const t = ui(locale).cta
  label ??= t.label
  title ??= t.title
  text ??= t.text
  return (
    <section aria-labelledby="cta-baslik" className="surface-dark bg-glass-surface text-onDark">
      <div className="shell flex flex-wrap items-center justify-between gap-x-16 gap-y-8 py-section-sm">
        <div className="min-w-0 flex-[1_1_460px]">
          <p className="mb-3.5 font-mono text-label font-semibold uppercase text-onDark-glass">{label}</p>
          <h2 id="cta-baslik" className="mb-2.5 font-display text-[clamp(26px,3vw,38px)] font-bold leading-[1.1] tracking-[-0.02em] text-white">
            {title}
          </h2>
          <p className="max-w-[560px] text-body font-light leading-[1.7] text-onDark-muted">{text}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href={route('contact', locale)} className={buttonClass('primary', 'lg')}>
            {t.form}
          </Link>
          {/* lang="en": büyük harfte "İNFO@ELİS…" olmasın */}
          <a href={`mailto:${site.email}`} lang="en" className={buttonClass('secondary-dark', 'lg', 'break-all')}>
            {site.email}
          </a>
          {site.whatsapp && (
            <a href={whatsappHref(locale)} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary-dark', 'lg')}>
              <WhatsAppIcon width={18} height={18} />
              WhatsApp
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
