import type { Metadata, Viewport } from 'next'
import { SiteChrome } from '@/components/SiteChrome'
import { site } from '@/content/site'
import { ogDefaults, SITE_URL } from '@/lib/seo'
import { fontVars } from '../fonts'
import '../globals.css'

/** Kök layout — haber sitesi (yalnızca Türkçe). */

const description =
  'ELIS360 NEWS: Türkiye’den ve dünyadan son dakika ve güncel haberler. Gündem, Türkiye, İzmir ve Ege, dünya, video ve sahadan özel dosyalar.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'ELIS360 NEWS – Son dakika ve güncel haberler', template: '%s – ELIS360 NEWS' },
  description,
  applicationName: site.name,
  openGraph: { ...ogDefaults, description },
  twitter: { card: 'summary_large_image' },
  alternates: { types: { 'application/rss+xml': [{ url: '/rss.xml', title: 'ELIS360 NEWS' }] } },
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
