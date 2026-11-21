import type { Metadata, Viewport } from 'next'
import { Archivo, IBM_Plex_Mono, Inter } from 'next/font/google'
import { AdSlot } from '@/components/header/AdSlot'
import { Masthead } from '@/components/header/Masthead'
import { ServiceBar } from '@/components/header/ServiceBar'
import { StickyNav } from '@/components/header/StickyNav'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/ui/WhatsApp'
import { mainNav, site } from '@/content/site'
import { JsonLd, ogDefaults, organizationLd, SITE_URL } from '@/lib/seo'
import './globals.css'

// latin-ext: Türkçe karakterler (ğ, ş, ı, İ) için zorunlu.
const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700'],
  variable: '--font-archivo',
  display: 'swap',
})
const plexMono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

const description =
  'Türkiye’de haberin, prodüksiyonun ve markanızın çözüm ortağı: uluslararası medya ekipleri ve markalar için fikserlik (fixer in Türkiye), prodüksiyon, belgesel, marka ve PR.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'ELIS360 NEWS – Fixer in Türkiye, prodüksiyon, marka & PR', template: '%s – ELIS360 NEWS' },
  description,
  applicationName: site.name,
  openGraph: { ...ogDefaults, description },
  twitter: { card: 'summary_large_image' },
  // hreflang: İngilizce sürüm yayına girince alternates.languages ile eklenecek.
}

export const viewport: Viewport = { themeColor: '#07111F' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${archivo.variable} ${plexMono.variable} ${inter.variable}`}>
      <body>
        <JsonLd data={organizationLd()} />
        <a
          href="#icerik"
          className="sr-only z-50 bg-ink px-4 py-3 font-mono text-meta uppercase text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          İçeriğe geç
        </a>

        {/* 1 — Reklam şeridi (kayar) */}
        <AdSlot />

        {/* 2 + 3 — Servis barı ve logo satırı (kayar) */}
        <header className="surface-dark glass-fx relative z-30 bg-glass">
          <ServiceBar clocks={site.clocks} social={site.social} email={site.email} />
          <Masthead />
        </header>

        {/*
          4 — Yapışkan navigasyon. <header>'ın DIŞINDA, <body>'nin doğrudan çocuğu
          olmak ZORUNDA: position:sticky yalnızca ebeveyninin sınırları içinde çalışır.
          Header'ın içine taşınırsa header kaybolduğunda nav da kaybolur.
        */}
        <StickyNav
          items={mainNav}
          locales={[
            { code: 'TR', label: 'TR', href: '/', current: true },
            { code: 'EN', label: 'EN', href: null }, // İngilizce sürüm — sonraki faz
          ]}
        />

        {/* Son dakika şeridi 2026-11'de kaldırıldı (müşteri kararı). Bileşen: git geçmişinde
            src/components/header/BreakingBar.tsx — geri gelirse buraya eklenir. */}

        <div id="icerik" tabIndex={-1} className="outline-none">
          {children}
        </div>

        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
