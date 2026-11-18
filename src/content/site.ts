/**
 * Sitenin paylaşılan içerik kaynağı.
 *
 * YAYIN ÖNCESİ: Bu dosyadaki `PLACEHOLDER` işaretli her değer gerçek içerikle
 * değiştirilmeli. `npm run check:content` köşeli parantezli metinleri ve boş (#)
 * bağlantıları listeler. Ayrıntı: TODO-CONTENT.md
 */

export const PLACEHOLDER_HREF = '#' // check-placeholders: ignore

export type SocialLink = { name: 'LinkedIn' | 'Instagram' | 'YouTube'; href: string }

export const site = {
  name: 'ELIS360 NEWS',
  email: 'info@elis360news.com',

  // PLACEHOLDER — gerçek hesap adresleri gelecek
  social: [
    { name: 'LinkedIn', href: PLACEHOLDER_HREF },
    { name: 'Instagram', href: PLACEHOLDER_HREF },
    { name: 'YouTube', href: PLACEHOLDER_HREF },
  ] satisfies SocialLink[],

  /** Konum algılanamazsa (yerel geliştirme, bot) gösterilecek şehir. */
  fallbackLocation: { city: 'İzmir', latitude: 38.4237, longitude: 27.1428 },

  /** Servis barındaki saatler. İlki vurgulu (yerel) saattir. */
  clocks: [
    { label: 'TSİ', timeZone: 'Europe/Istanbul' },
    { label: 'LDN', timeZone: 'Europe/London' },
    { label: 'NYC', timeZone: 'America/New_York' },
    { label: 'DXB', timeZone: 'Asia/Dubai' },
  ],
} as const

export type NavItem = { label: string; href: string; live?: boolean }

/** Yapışkan navigasyon. Sıra ve etiketler referans HTML'den. */
export const mainNav: NavItem[] = [
  { label: 'Haber', href: '/haber', live: true }, // Faz 2 — haber portalı
  { label: 'Fikserlik', href: '/fikserlik' },
  { label: 'Prodüksiyon', href: '/#hizmetler' },
  { label: 'Haberler', href: '/#haberler' },
  { label: 'Belgesel', href: '/#belgesel' },
  { label: 'Sahalar', href: '/#sahalar' },
  { label: 'İletişim', href: '/iletisim' },
]

export type BreakingItem = { time: string; title: string; href: string }

/** Footer. `#6E7686` (referans) koyu zeminde 4.26:1 — eşiği geçmiyor; onDark-glass (#AEB5BF) kullanılıyor. */
export const footer = {
  tagline: 'Yerel bilgi. Güvenilir bağlantılar. Güçlü saha deneyimi.',
  columns: [
    {
      title: 'Hizmetler',
      label: 'Alt menü – hizmetler',
      span: 'lg:col-span-3',
      links: [
        { label: 'Fikserlik', href: '/fikserlik' },
        { label: 'Prodüksiyon', href: '/#hizmetler' },
        { label: 'Kriz sahası', href: '/#hizmetler' },
        { label: 'Belgesel', href: '/#belgesel' },
      ],
    },
    {
      title: 'Kurumsal',
      label: 'Alt menü – kurumsal',
      span: 'lg:col-span-2',
      links: [
        { label: 'Sahalar', href: '/#sahalar' },
        { label: 'Haber', href: '/haber' },
        { label: 'İletişim', href: '/iletisim' },
      ],
    },
  ],
  bottom: {
    copyright: `© ${new Date().getFullYear()} ELIS360 NEWS`,
    lines: ['Research · Fixing', 'Production · Logistics'],
    motto: ['Real stories,', 'a brighter tomorrow'],
  },
}
