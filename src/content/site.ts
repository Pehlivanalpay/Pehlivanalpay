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
  tagline: 'Haber • Gündem • Dosya • Video',
  /** Kurumsal site (eski elis360news.com içeriği) — 2026-11-28'de taşındı. */
  corporateUrl: 'https://www.elis360medya.com',

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

/** Yapışkan navigasyon — haber kategorileri (WordPress kategorileriyle aynı adresler: src/lib/wp/types.ts). */
export const mainNav: NavItem[] = [
  { label: 'Ana sayfa', href: '/' },
  { label: 'Son dakika', href: '/son-dakika', live: true },
  { label: 'Gündem', href: '/gundem' },
  { label: 'Türkiye', href: '/turkiye' },
  { label: 'İzmir ve Ege', href: '/izmir-ve-ege' },
  { label: 'Dünya', href: '/dunya' },
  { label: 'Video', href: '/video' },
  { label: 'Özel dosyalar', href: '/ozel-dosyalar' },
]

export const footer = {
  tagline: 'Sahadan, doğrulanmış ve bağımsız haber. Türkiye’den ve dünyadan, ELIS360 ekibinin gözünden.',
  columns: [
    {
      key: 'services' as const,
      span: 'lg:col-span-3',
      links: [
        { label: 'Son dakika', href: '/son-dakika' },
        { label: 'Gündem', href: '/gundem' },
        { label: 'Türkiye', href: '/turkiye' },
        { label: 'İzmir ve Ege', href: '/izmir-ve-ege' },
        { label: 'Dünya', href: '/dunya' },
        { label: 'Video', href: '/video' },
        { label: 'Özel dosyalar', href: '/ozel-dosyalar' },
      ],
    },
    {
      key: 'company' as const,
      span: 'lg:col-span-2',
      links: [
        { label: 'Künye', href: '/kunye' },
        { label: 'Haber ihbarı ve iletişim', href: '/iletisim' },
        { label: 'RSS', href: '/rss.xml' },
        { label: 'ELIS360 Medya', href: 'https://www.elis360medya.com' },
      ],
    },
  ],
  bottom: {
    copyright: `© ${new Date().getFullYear()} ELIS360 NEWS`,
    lines: ['Haber · Gündem', 'Dosya · Video'],
    motto: ['Real stories,', 'a brighter tomorrow'],
  },
}
