import Link from 'next/link'
import { LogoMark } from '@/components/ui/LogoMark'
import { WhatsAppLink } from '@/components/ui/WhatsApp'
import { footerEn } from '@/content/en/site'
import { footer as footerTr, site } from '@/content/site'
import { EN_LIVE, route, type Locale } from '@/i18n/config'
import { ui } from '@/i18n/ui'
import { prefetchFor } from '@/lib/routes'
import { hasJournal } from '@/lib/wp/client'

const colTitle = 'mb-[18px] font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-onDark-glass'

export async function Footer({ locale }: { locale: Locale }) {
  const journal = locale === 'tr' && (await hasJournal())
  const t = ui(locale).footer
  const footer = locale === 'en' ? { ...footerTr, ...footerEn } : footerTr
  return (
    <footer className="surface-dark bg-ink text-onDark">
      <div className="shell pt-14">
        <div className="grid grid-cols-1 gap-y-10 pb-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="min-w-0 lg:col-span-5">
            <p className="mb-3.5 flex items-center gap-[9px]">
              <LogoMark size={30} className="mr-1 flex-none" />
              <span className="font-display text-[21px] font-bold tracking-[0.14em] text-white">
                ELIS<span className="text-accent-light">360</span>
              </span>
              <span className="font-mono text-[12px] font-medium tracking-[0.3em] text-onDark-muted">NEWS</span>
            </p>
            <p className="max-w-[340px] text-[15px] font-light leading-[1.7] text-onDark-muted">{footer.tagline}</p>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.key} aria-label={col.key === 'services' ? t.servicesAria : t.companyAria} className={`min-w-0 ${col.span}`}>
              <p className={colTitle}>{col.key === 'services' ? t.services : t.company}</p>
              <ul className="flex flex-col gap-[3px] text-[15px] font-light">
                {(
                  col.links as readonly {
                    label: string
                    href: string
                    lang?: string
                  }[]
                )
                  .filter((l) => (EN_LIVE || l.lang !== 'en') && (journal || l.href !== '/haber'))
                  .map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} prefetch={prefetchFor(l.href)} lang={l.lang} hrefLang={l.lang} className="inline-block py-1">
                        {l.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
          ))}

          <div className="min-w-0 lg:col-span-2">
            <p className={colTitle}>{t.contact}</p>
            <a href={`mailto:${site.email}`} className="break-all border-b border-accent-light pb-0.5 font-mono text-[13px] leading-[1.6] text-white">
              {site.email}
            </a>
            {site.whatsapp && (
              <p className="mt-4 font-mono text-[13px] text-white">
                <span className="mb-1 block text-[11px] uppercase tracking-[0.2em] text-onDark-glass">WhatsApp</span>
                <WhatsAppLink locale={locale} className="border-b border-accent-light pb-0.5" />
              </p>
            )}
          </div>
        </div>

        {/* max-lg:pb-24: mobilde sabit WhatsApp düğmesi son satırı örtmesin */}
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2.5 border-t border-rule-dark py-5 max-lg:pb-24 font-mono text-[11px] uppercase tracking-[0.16em] text-onDark-glass">
          <span>
            {footer.bottom.copyright}
            <span aria-hidden="true"> · </span>
            <Link href={route('privacy', locale)} className="underline-offset-4 hover:underline">
              {t.privacy}
            </Link>
          </span>
          {/* lang="en": Türkçe büyük harf dönüşümü i → İ yapar ("FİXİNG"); İngilizce metinde I olmalı */}
          <span lang="en" className="flex flex-wrap gap-x-[26px] gap-y-2">
            {footer.bottom.lines.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </span>
          <span lang="en" className="tracking-[0.08em]">
            <span className="text-onDark">{footer.bottom.motto[0]}</span> {footer.bottom.motto[1]}
          </span>
        </div>
      </div>
    </footer>
  )
}
