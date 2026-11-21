import Link from 'next/link'
import { ButtonLink } from '@/components/ui/Button'
import { LogoMark } from '@/components/ui/LogoMark'
import { SearchIcon } from '@/components/ui/icons'
import { site } from '@/content/site'
import { route, type Locale } from '@/i18n/config'
import { ui } from '@/i18n/ui'

type MastheadProps = { locale: Locale }

/** Header 3. katman (88px): logo, arama, teklif düğmesi. Kayar. Arama → /ara (TR), /en/search (EN). */
export function Masthead({ locale }: MastheadProps) {
  const t = ui(locale).masthead
  return (
    <div className="shell flex min-h-[88px] flex-wrap items-center justify-between gap-x-10 gap-y-3.5 py-3.5">
      {/* Erişilebilir ad görünen metinle başlamalı (WCAG 2.5.3): "ELIS360 NEWS ana sayfa" */}
      <Link href={route('home', locale)} className="inline-flex min-h-11 items-center gap-[11px]">
        <LogoMark size={40} className="mr-1 flex-none" />
        <span className="font-display text-[30px] font-bold leading-none tracking-[0.11em] text-white">
          ELIS<span className="text-accent-light">360</span>
        </span>{' '}
        <span className="flex flex-col gap-1.5">
          <span className="font-mono text-[14px] font-medium leading-none tracking-[0.32em] text-onDark-glass">NEWS</span>
          {/* lang="en": İngilizce alt başlık — Türkçe büyük harf dönüşümü "İ" yapmasın */}
          <span lang="en" className="hidden font-mono text-[9px] font-medium uppercase leading-none tracking-[0.2em] text-onDark-glass lg:block">
            {site.tagline}
          </span>
        </span>
        <span className="sr-only"> {t.home}</span>
      </Link>

      <form
        role="search"
        aria-label={t.searchLabel}
        action={route('search', locale)}
        method="get"
        className="flex max-w-[460px] flex-[1_1_300px] items-stretch border border-white/25 bg-white/[0.06]"
      >
        <label htmlFor="site-search" className="sr-only">
          {t.searchLabel}
        </label>
        <input
          id="site-search"
          name="q"
          type="search"
          placeholder={t.searchPlaceholder}
          className="h-[46px] min-w-0 flex-1 border-0 bg-transparent px-[15px] font-sans text-[14px] text-white placeholder:text-[#99A1AD] focus-visible:outline-offset-0"
        />
        <button
          type="submit"
          aria-label={t.search}
          className="flex min-h-[46px] w-12 cursor-pointer items-center justify-center border-0 border-l border-white/20 bg-transparent text-white"
        >
          <SearchIcon />
        </button>
      </form>

      <ButtonLink href={route('contact', locale)} size="md">
        {t.cta}
      </ButtonLink>
    </div>
  )
}
