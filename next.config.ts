import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // İki kök layout (TR / EN) olduğu için eşleşmeyen adreslere ortak 404: src/app/global-not-found.tsx
  experimental: { globalNotFound: true },
  // cPanel (Passenger) için kendi kendine yeten paket: .next/standalone/server.js
  // Paketleme: npm run build:cpanel → elis360-site.zip (docs/deploy-cpanel.md)
  output: 'standalone',
  // Güvenlik başlıkları — tüm yanıtlar.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
          // Betik kısıtlaması yok (Next satır içi betikleri); yalnızca çerçeveleme, form hedefi, eklenti ve base.
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'; form-action 'self'; object-src 'none'; base-uri 'self'" },
        ],
      },
    ]
  },
  // Eski adresler → yeni sayfa yapısı (2026-11). Kalıcı: arama motorları yeni adresi öğrenir.
  async redirects() {
    // 2026-11-28: elis360news.com haber sitesi oldu; kurumsal sayfalar www.elis360medya.com'a taşındı.
    const MEDYA = 'https://www.elis360medya.com'
    const corporate: [string, string][] = [
      ['/fikserlik', '/fixer-in-turkiye'],
      ['/fixer-in-turkiye', '/fixer-in-turkiye'],
      ['/produksiyon', '/produksiyon'],
      ['/marka-pr', '/marka-pr'],
      ['/belgesel', '/belgesel'],
      ['/projeler', '/projeler'],
      ['/haberler', '/projeler'],
    ]
    return [
      ...corporate.map(([source, to]) => ({ source, destination: `${MEDYA}${to}`, permanent: true })),
      { source: '/en', destination: `${MEDYA}/en`, permanent: true },
      { source: '/en/:path*', destination: `${MEDYA}/en/:path*`, permanent: true },
      // Eski haber portalı adresleri → yeni yapı (yazılar /haber/[slug]'da kalır)
      { source: '/haber', destination: '/', permanent: true },
      { source: '/haber/kategori/:slug', destination: '/:slug', permanent: true },
    ]
  },
  images: {
    // 50: yalnızca ağır filtrelenmiş dekoratif fotoğraflar (hero zemini, motifler) — gri ton + düşük opaklık altında fark görünmez.
    qualities: [50, 75],
    formats: ['image/avif', 'image/webp'],
    // WordPress medya kitaplığı (haber görselleri)
    remotePatterns: [{ protocol: 'https', hostname: 'cms.elis360news.com', pathname: '/wp/wp-content/uploads/**' }],
  },
}

export default nextConfig
