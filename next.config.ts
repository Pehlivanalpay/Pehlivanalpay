import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // 50: yalnızca ağır filtrelenmiş dekoratif fotoğraflar (hero zemini, motifler) — gri ton + düşük opaklık altında fark görünmez.
    qualities: [50, 75],
    formats: ['image/avif', 'image/webp'],
    // WordPress medya kitaplığı (haber görselleri)
    remotePatterns: [{ protocol: 'https', hostname: 'cms.elis360news.com', pathname: '/wp/wp-content/uploads/**' }],
  },
}

export default nextConfig
