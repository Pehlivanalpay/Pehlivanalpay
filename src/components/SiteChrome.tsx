import { AdSlot } from '@/components/header/AdSlot'
import { Masthead } from '@/components/header/Masthead'
import { ServiceBar } from '@/components/header/ServiceBar'
import { StickyNav } from '@/components/header/StickyNav'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/ui/WhatsApp'
import { mainNavEn } from '@/content/en/site'
import { mainNav, site } from '@/content/site'
import type { Locale } from '@/i18n/config'
import { ui } from '@/i18n/ui'
import { JsonLd, organizationLd } from '@/lib/seo'

/**
 * Sayfa iskeleti — iki dilin kök layout'u da bunu kullanır.
 *
 * YAPI KURALI: Yapışkan navigasyon <header>'ın DIŞINDA, <body>'nin doğrudan çocuğu olmak ZORUNDA:
 * position:sticky yalnızca ebeveyninin sınırları içinde çalışır. Header'ın içine taşınırsa header
 * ekrandan çıktığında nav da kaybolur. (Bu bileşen fragment döndürür; çocukları doğrudan <body>'ye düşer.)
 */
export function SiteChrome({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = ui(locale)
  return (
    <>
      <JsonLd data={organizationLd()} />
      <a
        href="#icerik"
        className="sr-only z-50 bg-ink px-4 py-3 font-mono text-meta uppercase text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t.skip}
      </a>

      {/* 1 — Reklam şeridi (kayar). Satılmış reklam yoksa canlıda çizilmez. */}
      <AdSlot locale={locale} />

      {/* 2 + 3 — Servis barı ve logo satırı (kayar) */}
      <header className="surface-dark glass-fx relative z-30 bg-glass">
        <ServiceBar clocks={site.clocks} social={site.social} email={site.email} locale={locale} />
        <Masthead locale={locale} />
      </header>

      {/* 4 — Yapışkan navigasyon: <body>'nin doğrudan çocuğu (yukarıdaki kural) */}
      <StickyNav items={locale === 'en' ? mainNavEn : mainNav} locale={locale} />

      <div id="icerik" tabIndex={-1} className="outline-none">
        {children}
      </div>

      <Footer locale={locale} />
      <WhatsAppFloat locale={locale} />
    </>
  )
}
