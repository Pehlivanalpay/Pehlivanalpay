import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // 50: yalnızca ağır filtrelenmiş dekoratif fotoğraflar (hero zemini, motifler) — gri ton + düşük opaklık altında fark görünmez.
    qualities: [50, 75],
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
