/**
 * Hizmet sayfaları içeriği — 2026-11 web sitesi önerisi (PDF). PDF'te karşılığı olmayan metinler
 * (ör. Prodüksiyon sayfası) mevcut sitedeki onaylı metinlerden alındı.
 */
import { images } from './images'

export type ProjectCard = { title: string; text: string; image: (typeof images)[keyof typeof images]; href?: string }

/* ── Fikserlik — /fixer-in-turkiye ───────────────────────────────────────── */

export const fikserlik = {
  meta: {
    title: 'Fixer in Türkiye — Fikserlik',
    description:
      'Fixer in Türkiye: yabancı medya ekipleri için Türkiye genelinde araştırma, yerel kaynak, izin ve akreditasyon, tercüme, lojistik, kamera ekibi ve prodüksiyon desteği.',
  },
  hero: {
    // Doğrudan büyük harf: CSS'in Türkçe dönüşümü "IN"i "İN" yapmasın
    label: 'FIXER IN TÜRKİYE / FİKSERLİK',
    title: { before: 'Türkiye genelinde', highlight: 'güvenilir prodüksiyon ortağınız', after: '.' },
    lead: 'İlk araştırmadan son teslime kadar: Türkiye’nin her yerinde yerel erişim, izinler, lojistik, ekip ve prodüksiyon desteği.',
    leadTr: 'Büyük şehirlerden sınır bölgelerine, kırsal alanlardan afet bölgelerine — ekibinizi hikâyenin olduğu yere ulaştırmayı biliyoruz.',
    cta: { label: 'Projenizi planlayalım', href: '/iletisim' },
    image: images.kaleKesif,
    breadcrumb: [{ label: 'Ana sayfa', href: '/' }, { label: 'Fikserlik' }],
  },
  columns: [
    {
      label: 'Fixing & local support',
      items: ['Konu ön araştırması', 'Yerel kaynak ve uzman erişimi', 'Röportaj ve mekân organizasyonu', 'İzin ve akreditasyon desteği', 'Tercüme, ulaşım ve lojistik'],
    },
    {
      label: 'Production services',
      items: ['Kameraman ve görüntü yönetmeni', 'Kamera, ışık ve ses ekipmanı', 'Drone ve çok kameralı çekim', 'Canlı yayın ve teknik bağlantı', 'Kurgu, seslendirme ve post prodüksiyon'],
    },
  ],
  logistics: {
    label: 'Ulaşım ve lojistik',
    title: 'Havalimanından sahaya, ekip ve ekipmanla birlikte.',
    text: 'Ekibinizi karşılıyor, ekipmanınızı güvenle taşıyor; ulaşım, konaklama ve saha lojistiğini çekim planına göre kuruyoruz.',
    points: ['Havalimanı karşılama ve transfer', 'Ekip ve ekipman taşıma', 'Konaklama ve saha lojistiğinin planlanması', 'Güvenli ulaşım ve alternatif güzergâh'],
    image: images.havalimaniLojistik,
  },
  band: {
    label: 'Çekim ekibi',
    title: 'Kamera, ışık, ses ve yönetmen monitörü — tek ekip.',
    text: 'Profesyonel kamera, ses ve ışık ekibimiz haber, belgesel ve canlı yayın çekimlerinde sahada sizinle.',
    image: images.sokakCekimi,
  },
  detail: {
    label: 'Hizmet listesi',
    title: 'Fikserlik hizmetlerimiz',
    text: 'İlk araştırmadan çekimin son gününe kadar bütün süreci tek merkezden planlıyor ve yönetiyoruz.',
    items: [
      'Haber ve belgesel konularının ön araştırması',
      'Yerel kaynakların, uzmanların ve tanıkların belirlenmesi',
      'Röportaj bağlantılarının kurulması',
      'Çekim öncesi mekân araştırması ve keşif çalışması',
      'Yerel kurumlarla iletişim ve saha koordinasyonu',
      'Çekim izinleri ve akreditasyon süreçlerinde destek',
      'Tercüman ve yerel rehber temini',
      'Ulaşım, konaklama ve saha lojistiğinin planlanması',
      'Günlük haber takibi ve gelişmelere ilişkin bilgilendirme',
      'Kültürel, bölgesel ve toplumsal hassasiyetler konusunda danışmanlık',
    ],
  },
}

/* ── Prodüksiyon — /produksiyon ─────────────────────────────────────────── */

export const produksiyon = {
  meta: {
    title: 'Prodüksiyon ve teknik ekip',
    description: 'Türkiye’de kameraman, görüntü yönetmeni, ses, ışık, drone, canlı yayın bağlantısı, kurgu ve post prodüksiyon — haber, belgesel ve kurumsal çekimler için teknik ekip.',
  },
  hero: {
    label: 'Prodüksiyon ve teknik ekip',
    title: { before: 'Kameradan canlı bağlantıya,', highlight: 'eksiksiz teknik ekip.' },
    lead: 'İhtiyaca göre tek kişilik hızlı haber ekibinden geniş kapsamlı belgesel prodüksiyonuna kadar farklı ölçeklerde çözümler üretiyoruz.',
    cta: { label: 'Ekip ve ekipman isteyin', href: '/iletisim' },
    image: images.reji,
    breadcrumb: [{ label: 'Ana sayfa', href: '/' }, { label: 'Prodüksiyon' }],
  },
  list: {
    label: 'Teknik destek',
    title: 'Prodüksiyon hizmetlerimiz',
    items: [
      'Kameraman ve görüntü yönetmeni temini',
      'Saha prodüksiyon ekibi oluşturulması',
      'Kamera, ses, ışık ve yardımcı ekipman organizasyonu',
      'Çok kameralı çekim planlaması',
      'Drone çekimleri',
      'Canlı yayın ve teknik bağlantı desteği',
      'Haber ve belgesel çekimleri',
      'Röportaj prodüksiyonu',
      'Kurgu, seslendirme ve post prodüksiyon',
      'Arşiv görüntüsü araştırması ve içerik danışmanlığı',
    ],
  },
  band: {
    label: 'Kamera önü ve arkası',
    title: 'Konuşmacı, kamera, ışık ve yönetmen monitörü — aynı disiplin.',
    text: 'Stüdyoda ya da sahada, yayın standartlarında görüntü ve ses.',
    image: images.studyo,
  },
  method: {
    label: 'Çalışma yöntemi',
    title: 'İlk fikirden son görüntüye aynı sorumlulukla',
    steps: [
      { title: 'Dinliyoruz', text: 'Projenin konusunu, yayın mecrasını, hedefini, çekim tarihlerini ve teknik ihtiyaçlarını öğreniyoruz.' },
      { title: 'Planlıyoruz', text: 'Araştırma, bütçe, ekip, mekân, ulaşım ve çekim planını hazırlıyoruz.' },
      { title: 'Sahada yönetiyoruz', text: 'Yabancı ekip ile yerel kaynaklar arasındaki bütün iletişimi yönetiyor, gelişmelere göre programı güncelliyoruz.' },
    ],
  },
}

/* ── Marka & PR — /marka-pr ─────────────────────────────────────────────── */

export const markaPr = {
  meta: {
    title: 'Marka, PR ve kurumsal iletişim',
    description: 'Marka ve iletişim stratejisi, PR ve medya ilişkileri, kurumsal içerik, kriz ve itibar yönetimi, yönetici medya eğitimi, marka belgeseli ve tanıtım filmi.',
  },
  hero: {
    label: 'Marka, PR ve kurumsal iletişim',
    title: { before: 'Markanızın hikâyesini', highlight: 'görünür ve güvenilir', after: 'kılıyoruz.' },
    lead: 'Markaların yalnızca görünmesini değil; doğru anlaşılmasını ve sürdürülebilir bir iletişim dili kurmasını sağlıyoruz.',
    cta: { label: 'Marka görüşmesi planlayın', href: '/iletisim' },
    // PDF kuralı: bu sayfada savaş/haber arşivi kullanılmaz — kurumsal/stüdyo çekimi.
    image: images.markaFilmSeti,
    breadcrumb: [{ label: 'Ana sayfa', href: '/' }, { label: 'Marka & PR' }],
  },
  list: {
    label: 'Hizmetler',
    title: 'Marka ve iletişim hizmetlerimiz',
    items: [
      'Marka ve iletişim stratejisi',
      'PR ve medya ilişkileri',
      'Kurumsal içerik üretimi',
      'Kriz ve itibar yönetimi',
      'Yönetici medya eğitimi',
      'Marka belgeseli ve tanıtım filmi',
      'Sosyal medya içerikleri',
      'Lansman ve etkinlik iletişimi',
    ],
  },
  why: {
    lines: ['Haberi biliyoruz.', 'Televizyonu biliyoruz.', 'Markayı ve iletişimi biliyoruz.'],
    text: 'Gazetecinin neye ihtiyaç duyduğunu, kameranın neyi gördüğünü ve kamuoyunun neye güvendiğini 30 yıllık deneyimden biliyoruz. Markanızın mesajını bu bilgiyle kuruyoruz.',
  },
}

/* ── Belgesel — /belgesel ───────────────────────────────────────────────── */

export const belgesel = {
  meta: {
    title: 'Belgesel ve zorlu saha',
    description: 'Belgesel prodüksiyonu ve savaş, çatışma, afet ve kriz bölgelerinde saha operasyonları: araştırma, karakter, risk planı, güvenli ulaşım, çekim ve post prodüksiyon.',
  },
  hero: {
    label: 'Belgesel ve zorlu saha',
    title: { before: 'Hikâyeyi buluyor,', highlight: 'sahada gerçeğe', after: 'dönüştürüyoruz.' },
    lead: 'Bir belgeselin yalnızca çekimini değil, hikâyesini de önemsiyoruz.',
    cta: { label: 'Belgesel projenizi anlatın', href: '/iletisim' },
    image: images.bergamaCekim,
    breadcrumb: [{ label: 'Ana sayfa', href: '/' }, { label: 'Belgesel' }],
  },
  visuals: [
    { image: images.sokakCekimi, caption: 'Karakterle saha çekimi', tone: 'light' as const },
    { image: images.sahaKameraman, caption: 'Zorlu saha', tone: 'dark' as const },
  ],
  cards: [
    {
      num: '01',
      title: 'Belgesel prodüksiyonu',
      text: 'Konu araştırması, karakter seçimi, mekân keşfi, röportaj planı, çekim, arşiv araştırması ve post prodüksiyon.',
      points: ['Tarih, kültür ve insan hikâyeleri', 'Savaş, göç ve güvenlik dosyaları', 'Mekân araştırması ve keşif', 'Arşiv görüntüsü araştırması', 'Post prodüksiyon süreç yönetimi'],
      tone: 'light' as const,
    },
    {
      num: '02',
      title: 'Zorlu saha operasyonları',
      text: 'Güncel durum değerlendirmesi, risk planı, yerel bağlantılar, güvenli ulaşım, alternatif hareket planı ve saha koordinasyonu.',
      points: ['Deneyimli savaş kameramanı ve saha ekibi', 'Risk değerlendirmesi', 'Yerel bağlantı ve kaynak organizasyonu', 'Güvenli ulaşım ve çalışma planlaması', 'Acil durum ve alternatif hareket planı'],
      tone: 'dark' as const,
    },
  ],
  regions: {
    label: 'Sahalar',
    title: 'Görev yaptığımız bölgeler',
    text: 'Savaş, çatışma, afet ve toplumsal krizlerin yaşandığı sahalarda edinilmiş uzun yıllara dayanan deneyim.',
    items: ['Kosova', 'Afganistan', 'Lübnan', 'Gürcistan-Osetya', 'Kenya', 'Irak', 'Suriye', 'Libya', 'Yemen', 'İsrail', 'Türkiye'],
  },
  feature: {
    label: 'Öne çıkan özel proje',
    title: 'Savaşın Çocukları',
    text: 'Savaş bölgelerinde çekilmiş gerçek fotoğraflardan oluşan sergi, belgesel ve insan hikâyeleri projesi.',
    quote: 'Savaş bittiğinde çocukluk geri gelmiyor.',
    image: images.savasinCocuklari,
  },
}

/* ── Projeler / seçili projeler — /projeler ──────────────────────────────── */

export const projeler = {
  meta: {
    title: 'Projeler',
    description: 'ELIS360 NEWS sahadan seçili projeler: Türkiye’de fikserlik, belgesel, marka ve canlı yayın işleri.',
  },
  hero: {
    label: 'Sahadan seçili projeler',
    title: 'Ne yaptığımızı anlatmakla kalmıyor, örneklerle gösteriyoruz.',
  },
  showcase: {
    label: 'Vitrin proje',
    title: 'Uluslararası medya ekibine Türkiye saha koordinasyonu',
    text: 'Araştırma, yerel kaynak, çekim noktası, ulaşım, tercüme, kamera ve teslim süreci tek merkezden yönetilir.',
    image: images.bergamaCekim,
  },
  side: [
    { tag: 'Fikserlik', title: 'Yabancı haber ekibine uçtan uca saha desteği', image: images.kaleKesif, href: '/fixer-in-turkiye' },
    { tag: 'Belgesel', title: 'Araştırmadan post prodüksiyona özgün yapım', image: images.sokakCekimi, href: '/belgesel' },
    { tag: 'Marka & PR', title: 'Kurumsal hikâyeyi anlatan marka belgeseli', image: images.studyo, href: '/marka-pr' },
  ],
  cardsLabel: 'Proje kartları',
  cards: [
    { title: 'Savaşın Çocukları', text: 'Fotoğraf sergisi ve belgesel projesi', image: images.savasinCocuklari, href: '/belgesel' },
    { title: 'Canlı yayın desteği', text: 'Ekip, bağlantı ve saha koordinasyonu', image: images.kontrolOdasi, href: '/produksiyon' },
    { title: 'Özel görüntüler', text: 'Uluslararası haber ve dosya içerikleri', image: images.sahaEkip, href: '/fixer-in-turkiye' },
  ] satisfies ProjectCard[],
}
