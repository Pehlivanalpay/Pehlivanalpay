import type { Metadata, Viewport } from 'next'
import { SiteChrome } from '@/components/SiteChrome'
import { site } from '@/content/site'
import { ogDefaults, SITE_URL } from '@/lib/seo'
import { fontVars } from '../fonts'
import '../globals.css'

/** Türkçe kök layout (/, /fixer-in-turkiye, …). İngilizce: src/app/en/layout.tsx */

const description =
  'Türkiye’de haberin, prodüksiyonun ve markanızın çözüm ortağı: uluslararası medya ekipleri ve markalar için fikserlik (fixer in Türkiye), prodüksiyon, belgesel, marka ve PR.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'ELIS360 NEWS – Fixer in Türkiye, prodüksiyon, marka & PR', template: '%s – ELIS360 NEWS' },
  description,
  applicationName: site.name,
  openGraph: { ...ogDefaults, description },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = { themeColor: '#07111F' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={fontVars}>
      <body>
        <SiteChrome locale="tr">{children}</SiteChrome>
      </body>
    </html>
  )
}
