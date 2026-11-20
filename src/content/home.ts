/**
 * Ana sayfa içeriği — 2026-11 web sitesi önerisi (docs/reference/web-sitesi-onerisi-2026-11.pdf).
 * Sıralama PDF s.9'daki "Ana sayfa sıralaması"na göre.
 */
import { images } from './images'

export type Img = { src: string; alt: string; width: number; height: number }

export const hero = {
  eyebrow: ['Haber', 'Medya', 'İletişim'],
  title: { before: 'Türkiye’de haberin, prodüksiyonun ve markanızın', highlight: 'çözüm ortağı' },
  lead: 'Uluslararası medya ekipleri ve markalar için yerel bilgi, güvenilir bağlantılar ve uçtan uca üretim desteği.',
  primary: { label: 'Medya & saha hizmetleri', href: '/fixer-in-turkiye' },
  secondary: { label: 'Marka & iletişim', href: '/marka-pr' },
  image: images.studyo,
  /** Süs: kayıt göstergesi, zaman kodu, koordinat. null → gizle. */
  telemetry: { timecode: '00:14:22:06', coords: '41.0082°N 28.9784°E' } as { timecode: string; coords: string } | null,
  panel: {
    title: 'Güven göstergeleri',
    meta: 'TR · EN',
    stats: [
      { label: 'Medya deneyimi', value: '30', unit: 'yıl' },
      { label: 'Hizmet ağı', value: 'Türkiye', unit: 'geneli' },
      { label: 'Çalışma dili', value: 'TR · EN', unit: '' },
      { label: 'Hizmet alanı', value: '05', unit: 'başlık' },
    ],
    note: 'Araştırma, izin, ekip, ulaşım, çekim ve iletişim planı tek merkezden yürütülür.',
  },
}

export const twoArms = {
  index: '01',
  label: 'İki uzmanlık, tek merkez',
  title: 'Medya ve saha ile marka ve iletişim, aynı ekipte.',
  arms: [
    {
      letter: 'A',
      title: 'Medya & Saha',
      text: 'Fixer in Türkiye, araştırma, izin, yerel kaynak, kameraman, prodüksiyon, belgesel ve canlı yayın desteği.',
      href: '/fixer-in-turkiye',
      cta: 'Medya & saha hizmetleri →',
      tone: 'light' as const,
    },
    {
      letter: 'B',
      title: 'Marka & İletişim',
      text: 'Marka stratejisi, PR, medya ilişkileri, kurumsal içerik, medya eğitimi ve marka belgeseli.',
      href: '/marka-pr',
      cta: 'Marka & iletişim →',
      tone: 'dark' as const,
    },
  ],
  values: ['Gizlilik', 'Hız', 'Yerel uzmanlık', 'Yayın disiplini'],
}

export const about = {
  index: '02',
  label: 'Biz kimiz',
  title: 'Yerel bilgi, uluslararası bakış',
  paragraphs: [
    'ELIS360 NEWS; 30 yıllık gazetecilik, televizyonculuk, görüntü yönetimi ve medya planlama deneyimini aynı çatı altında buluşturan bir medya, danışmanlık ve prodüksiyon kuruluşudur.',
    'Yabancı medya ekiplerinin Türkiye’de doğru kişilere, güvenilir kaynaklara ve uygun çekim noktalarına ulaşmasını sağlıyor; markaların kamuoyuna doğru, tutarlı ve etkili biçimde anlatılmasına yardımcı oluyoruz.',
    'Haberin yalnızca görüntüsünü değil; arka planını, insanını, itibarını ve yarattığı etkiyi de görüyoruz.',
  ],
  points: ['Yerel kaynak ağı', 'İzin ve akreditasyon', 'Tercüme ve rehberlik', 'Marka ve medya ilişkileri'],
  image: images.kontrolOdasi,
  timecode: '00:14:22:06',
  caption: { left: 'Kurgu ve yayın', right: 'Kamera · Kurgu · Canlı bağlantı' },
}

export const manifesto = {
  lines: ['Haberi biliyoruz.', 'Televizyonu biliyoruz.', 'Markayı ve iletişimi biliyoruz.'],
  text: 'Doğru mesajın, doğru görüntünün ve doğru zamanda kurulan güvenilir iletişimin bir projenin kaderini değiştirebileceğini biliyoruz.',
  image: images.sahaKameraman,
  stats: [
    { value: '30', unit: 'yıl', label: 'Televizyon ve medya' },
    { value: '360°', unit: '', label: 'İletişim yaklaşımı' },
    { value: 'TR · EN', unit: '', label: 'Proje koordinasyonu' },
  ],
}

export const serviceAreas = {
  index: '03',
  label: 'Hizmet alanları',
  title: 'İki ana hizmet kolu, birbirini tamamlayan çözümler',
  intro: 'İhtiyacınıza göre doğru hizmet yoluna buradan geçin.',
  items: [
    { num: '01', title: 'Fikserlik', text: 'Araştırma, kaynak, izin, tercüme, ulaşım ve saha koordinasyonu.', href: '/fixer-in-turkiye' },
    { num: '02', title: 'Prodüksiyon', text: 'Kamera, ışık, ses, drone, canlı bağlantı, kurgu ve teknik ekip.', href: '/produksiyon' },
    { num: '03', title: 'Marka & PR', text: 'Marka stratejisi, medya ilişkileri, kriz iletişimi ve içerik.', href: '/marka-pr', dark: true },
    { num: '04', title: 'Belgesel', text: 'Araştırmadan karakter seçimine, çekimden post prodüksiyona.', href: '/belgesel' },
    { num: '05', title: 'Özel projeler', text: 'Fotoğraf sergisi, yayın formatı, kurumsal film ve özgün içerik geliştirme.', href: '/haberler' },
  ],
}

export const selectedProjects = {
  index: '04',
  label: 'Seçili projeler',
  title: 'Sahadan seçili işler',
  allLink: { label: 'Tüm projeler →', href: '/haberler' },
}

/** Ana sayfadaki "ELIS360 Journal" bölümünün sabit metinleri. Yazılar WordPress'ten gelir. */
export const news = {
  index: '05',
  label: 'ELIS360 Journal',
  title: 'Haber, rehber, analiz ve saha hikâyeleri',
  allLink: { label: 'Tüm yazılar →', href: '/haber' },
  latestLabel: 'Son eklenenler',
  dossiers: { label: 'Özel dosyalar', note: 'Kendi ekibimizin sahadan çektiği görüntülerle' },
}

export const contact = {
  index: '06',
  label: 'Hızlı destek',
  title: 'Projenizi birlikte planlayalım.',
  text: 'Haber, belgesel, prodüksiyon veya marka iletişimi ihtiyacınızı bize yazın. Size özel ekip ve çalışma planını birlikte oluşturalım.',
  quickOptions: ['Bir çekim planlıyorum', 'Kameraman arıyorum', 'Türkiye’de fixer gerekiyor', 'Acil saha desteği istiyorum'],
  facts: [
    { label: 'Çalışma dili', value: 'Türkçe · İngilizce' },
    { label: 'Kapsam', value: 'Türkiye geneli' },
  ],
}
