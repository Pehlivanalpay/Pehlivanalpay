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
  /** Logonun altındaki alt başlık (PDF). */
  tagline: 'Media • Fixing • Production • Brand & PR',

  /** WhatsApp hattı — wa.me bağlantısı için uluslararası biçim, yalnızca rakam. Boşken düğmeler gizlenir. */
  whatsapp: '905432288921' as string,
  /** Ekranda gösterilen biçim. */
  whatsappDisplay: '+90 543 228 89 21',

  // Gerçek hesap adresleri gelince yazın. PLACEHOLDER_HREF olanlar sitede ve JSON-LD'de otomatik gizlenir
  // (ServiceBar, seo.tsx) — bu yüzden yayın denetimini durdurmaz.
  social: [
    { name: 'LinkedIn', href: PLACEHOLDER_HREF }, // check-placeholders: ignore
    { name: 'Instagram', href: PLACEHOLDER_HREF }, // check-placeholders: ignore
    { name: 'YouTube', href: PLACEHOLDER_HREF }, // check-placeholders: ignore
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

/** Yapışkan navigasyon — her başlık ayrı sayfa (2026-11 web sitesi önerisi, PDF). */
export const mainNav: NavItem[] = [
  { label: 'Ana sayfa', href: '/' },
  { label: 'Fikserlik', href: '/fixer-in-turkiye' },
  { label: 'Prodüksiyon', href: '/produksiyon' },
  { label: 'Marka & PR', href: '/marka-pr' },
  { label: 'Belgesel', href: '/belgesel' },
  { label: 'Haberler', href: '/haberler', live: true },
  { label: 'İletişim', href: '/iletisim' },
]


/** Footer. Gri metinler onDark-glass (metalik gri #AAB3C0) — koyu zeminde 8.9:1. */
export const footer = {
  tagline: 'Yerel bilgi. Güvenilir bağlantılar. Güçlü medya ve iletişim deneyimi.',
  columns: [
    {
      key: 'services' as const,
      span: 'lg:col-span-3',
      links: [
        { label: 'Fikserlik — Fixer in Türkiye', href: '/fixer-in-turkiye' },
        { label: 'Prodüksiyon', href: '/produksiyon' },
        { label: 'Marka & PR', href: '/marka-pr' },
        { label: 'Belgesel', href: '/belgesel' },
      ],
    },
    {
      key: 'company' as const,
      span: 'lg:col-span-2',
      links: [
        { label: 'Haberler', href: '/haberler' },
        { label: 'ELIS360 Journal', href: '/haber' },
        { label: 'İletişim', href: '/iletisim' },
        { label: 'English', href: '/en', lang: 'en' },
      ],
    },
  ],
  bottom: {
    copyright: `© ${new Date().getFullYear()} ELIS360 NEWS`,
    lines: ['Media · Fixing', 'Production · Brand & PR'],
    motto: ['Real stories,', 'a brighter tomorrow'],
  },
}
