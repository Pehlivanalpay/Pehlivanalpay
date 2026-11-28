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
    return [
      { source: '/fikserlik', destination: '/fixer-in-turkiye', permanent: true },
      // 2026-11-23: menüdeki "Haberler" → "Projeler" (sayfa seçili projeleri gösteriyor)
      { source: '/haberler', destination: '/projeler', permanent: true },
      // Haber portalı 2026-11'de kendi alan adına taşındı: www.elis360news.com
      { source: '/haber', destination: 'https://www.elis360news.com', permanent: true },
      { source: '/haber/:path*', destination: 'https://www.elis360news.com/haber/:path*', permanent: true },
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
