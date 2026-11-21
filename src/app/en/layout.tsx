import type { Metadata, Viewport } from 'next'
import { SiteChrome } from '@/components/SiteChrome'
import { site } from '@/content/site'
import { EN_LIVE } from '@/i18n/config'
import { ogDefaults, SITE_URL } from '@/lib/seo'
import { fontVars } from '../fonts'
import '../globals.css'

/** English root layout (/en/…). Turkish: src/app/(tr)/layout.tsx */

const description =
  'Your fixer and production partner in Türkiye: research, access, permits, crews, logistics and live support for international newsrooms, documentary teams and brands.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'ELIS360 NEWS – Fixer in Türkiye, production, brand & PR', template: '%s – ELIS360 NEWS' },
  description,
  applicationName: site.name,
  openGraph: { ...ogDefaults, locale: 'en_GB', alternateLocale: ['tr_TR'], description },
  twitter: { card: 'summary_large_image' },
  // Onay öncesi: sayfalar açılır ama dizine eklenmez (bkz. EN_LIVE)
  ...(EN_LIVE ? {} : { robots: { index: false, follow: false } }),
}

export const viewport: Viewport = { themeColor: '#07111F' }

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
      <body>
        <SiteChrome locale="en">{children}</SiteChrome>
      </body>
    </html>
  )
}
