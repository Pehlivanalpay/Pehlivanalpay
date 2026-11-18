/**
 * Ana sayfa içeriği. Metinler referans HTML'den (docs/reference/index.html) birebir.
 * Köşeli parantezli değerler ve görseli boş (null) alanlar yer tutucudur — bkz. TODO-CONTENT.md
 */

export type Img = { src: string; alt: string; width: number; height: number }

const heroBg: Img = {
  src: '/hero-bg.jpg',
  alt: 'Haber stüdyosunda kameraman, sunucu ve yayın masası; arka planda İstanbul Boğazı',
  width: 1376,
  height: 768,
}

export const hero = {
  eyebrow: ['Fikserlik', 'Prodüksiyon', 'Saha koordinasyonu'],
  title: 'Haberin olduğu yerde güvenilir çözüm ortağınız',
  lead: 'Türkiye’de çalışan uluslararası televizyon kanalları, haber ajansları, belgesel ekipleri ve bağımsız gazeteciler için profesyonel fikserlik ve prodüksiyon hizmetleri.',
  leadEn: 'Professional fixing and field production services across Türkiye.',
  primary: { label: 'Projenizi planlayalım', href: '#iletisim' },
  secondary: { label: 'Hizmet kapsamı', href: '#hizmetler' },
  image: heroBg,
  /** Süs: kayıt göstergesi, zaman kodu, koordinat. Karar verilene kadar açık. null → gizle. */
  telemetry: { timecode: '00:14:22:06', coords: '41.0082°N 28.9784°E' } as { timecode: string; coords: string } | null,
  panel: {
    title: 'Saha kaydı',
    meta: 'TR · EN',
    stats: [
      { label: 'Saha deneyimi', value: '33', unit: 'yıl' },
      { label: 'Görev yapılan saha', value: '11', unit: 'bölge' },
      { label: 'Hizmet hattı', value: '04', unit: 'başlık' },
    ],
    note: 'Araştırma, izin ve akreditasyon, ekip, ulaşım ve çekim planı tek merkezden yürütülür.',
  },
}

export const regions = {
  index: '01',
  label: 'Sahalar',
  title: 'Görev yaptığımız bölgeler',
  text: 'Savaş, çatışma, afet ve toplumsal krizlerin yaşandığı sahalarda edinilmiş uzun yıllara dayanan deneyim.',
  items: ['Kosova', 'Afganistan', 'Lübnan', 'Gürcistan-Osetya', 'Kenya', 'Irak', 'Suriye', 'Libya', 'Yemen', 'İsrail', 'Türkiye'],
}

export const about = {
  index: '02',
  label: 'Biz kimiz',
  title: 'Türkiye’de yerel bilgi, uluslararası deneyim',
  paragraphs: [
    'ELIS360 NEWS; uzun yıllara dayanan gazetecilik, televizyonculuk, uluslararası saha ve medya planlama deneyimini aynı çatı altında buluşturan bir medya, danışmanlık ve prodüksiyon kuruluşudur. Yabancı medya ekiplerinin Türkiye’de doğru kişilere, güvenilir kaynaklara ve uygun çekim noktalarına hızlı biçimde ulaşmasını sağlıyoruz. Ekiplerin zaman kaybetmeden sahaya çıkabilmesi için gerekli hazırlıkları yapıyoruz.',
    'Büyük şehirlerden sınır bölgelerine, kırsal alanlardan afet ve kriz sahalarına kadar farklı çalışma koşullarına hâkimiz. Her projeyi konusu, çekim bölgesi, teknik ihtiyaçları ve yayın hedefi doğrultusunda ayrı ayrı planlıyoruz.',
    'Kosova’dan Afganistan’a, Irak’tan Suriye ve Libya’ya uzanan uluslararası saha tecrübemizi; gazetecilik, haber planlama, görüntü yönetimi ve iletişim alanlarındaki birikimimizle birleştiriyoruz. Haberin yalnızca görüntüsünü değil, arka planını, insanını ve hikâyesini de görüyoruz.',
  ],
  points: ['Yerel kaynak ağı', 'İzin ve akreditasyon', 'Tercüme ve rehberlik', 'Ulaşım ve lojistik'],
  image: heroBg, // TODO-CONTENT: saha arşivinden gerçek kare
  timecode: '00:14:22:06',
  caption: { left: 'Saha kaydı', right: 'Kamera · Kurgu · Canlı bağlantı' },
}

export type Service = {
  id?: string
  num: string
  code: string
  title: string
  text: string
  points: string[]
  link?: { label: string; href: string }
}

export const services = {
  index: '03',
  label: 'Hizmet kapsamı',
  title: 'İlk araştırmadan son görüntüye',
  intro: 'Projenin kapsamına göre tek kişilik hızlı haber ekibinden geniş kapsamlı belgesel prodüksiyonuna kadar farklı ölçeklerde çalışıyoruz.',
  items: [
    {
      num: '01',
      code: 'FIXING',
      title: 'Fikserlik',
      text: 'Türkiye’ye gelen yabancı gazeteciler ve medya ekipleri için araştırma, yerel kaynaklara erişim, röportaj ve çekim organizasyonu, tercüme, ulaşım, lojistik, izin süreçleri ve saha koordinasyonu.',
      points: ['Konu ön araştırması', 'İzin ve akreditasyon desteği', 'Tercüman ve yerel rehber', 'Günlük gündem bilgilendirmesi', 'Ulaşım, konaklama ve lojistik', 'Kültürel ve bölgesel danışmanlık'],
      link: { label: 'Hizmeti incele →', href: '/fikserlik' },
    },
    {
      num: '02',
      code: 'CREW',
      title: 'Prodüksiyon ve teknik ekip',
      text: 'Görüntü yönetmeni, kameraman, foto muhabiri, ses teknisyeni, drone operatörü, kurgu uzmanı ve saha prodüksiyon ekibi. Kamera, ses, ışık ve yardımcı ekipman organizasyonu dâhil.',
      points: ['Çok kameralı çekim planlaması', 'Drone çekimleri', 'Canlı yayın ve teknik bağlantı', 'Kamera, ses, ışık ve ekipman', 'Röportaj prodüksiyonu', 'Kurgu, seslendirme, post prodüksiyon'],
    },
    {
      num: '03',
      code: 'FIELD OPS',
      title: 'Savaş, çatışma, afet ve kriz bölgeleri',
      text: 'Riskleri önceden okumayı, doğru hareket planı oluşturmayı, ekip güvenliğini gözetmeyi ve şartlar değiştiğinde hızlı karar vermeyi kapsayan saha deneyimi. Her görev, bölgedeki güncel güvenlik şartları esas alınarak değerlendirilir.',
      points: ['Deneyimli savaş kameramanı', 'Güncel durum değerlendirmesi', 'Risk değerlendirmesi', 'Yerel bağlantı ve kaynak organizasyonu', 'Güvenli ulaşım ve çalışma planlaması', 'Acil durum ve alternatif plan'],
    },
    {
      id: 'belgesel',
      num: '04',
      code: 'DOCUMENTARY',
      title: 'Belgesel prodüksiyonu',
      text: 'Bir belgeselin yalnızca çekimini değil, hikâyesini de önemsiyoruz. Konunun araştırılmasından karakterlerin belirlenmesine, çekim planından post prodüksiyona belgesel yapımının bütün aşamalarında çalışıyoruz.',
      points: ['Tarih, kültür ve insan hikâyeleri', 'Savaş, göç ve güvenlik dosyaları', 'Mekân araştırması ve keşif', 'Arşiv görüntüsü araştırması', 'Post prodüksiyon süreç yönetimi'],
    },
  ] satisfies Service[],
}

/** Haberler bölümünün sabit metinleri. Haberlerin kendisi WordPress'ten gelir (lib/wp/client). */
export const news = {
  index: '04',
  label: 'Haberler',
  title: 'Sahadan son dosyalar',
  allLink: { label: 'Tüm haberler →', href: '/haber' },
  latestLabel: 'Son eklenenler',
  dossiers: { label: 'Özel dosyalar', note: 'Kendi ekibimizin sahadan çektiği görüntülerle' },
}

export const why = {
  index: '05',
  label: 'Neden ELIS360 NEWS',
  lines: ['Haberi biliyoruz.', 'Televizyonu biliyoruz.', 'Kamerayı biliyoruz.', 'Sahayı biliyoruz.'],
  text: 'Doğru kişiye ulaşmanın, doğru yerde bulunmanın ve doğru anda kayıt almanın bir yapımın kaderini değiştirebileceğini biliyoruz. Kameranın önünü de arkasını da biliyoruz: bir haber merkezinin neye ihtiyaç duyduğunu, yapım ekibinin sahada hangi sorunlarla karşılaşabileceğini ve zamanla yarışan gazeteciliğin nasıl işlediğini deneyimden biliyoruz.',
  image: heroBg,
  record: {
    title: 'Kurucu kaydı',
    value: '33',
    unit: 'yıl',
    text: 'TRT’de haber kameramanlığı; belgesel, röportaj ve kurgu deneyimi.',
    facts: [
      { label: 'Saha', value: '11 bölge' },
      { label: 'Çalışma dili', value: 'TR · EN' },
      { label: 'Kapsam', value: 'Türkiye geneli' },
    ],
  },
}

export const method = {
  index: '06',
  label: 'Çalışma yöntemi',
  title: 'İlk fikirden son görüntüye aynı sorumlulukla',
  steps: [
    { title: 'Dinliyoruz', text: 'Projenin konusunu, yayın mecrasını, hedefini, çekim tarihlerini ve teknik ihtiyaçlarını öğreniyoruz.' },
    { title: 'Planlıyoruz', text: 'Araştırma, bütçe, ekip, mekân, ulaşım ve çekim planını hazırlıyoruz.' },
    { title: 'Sahada yönetiyoruz', text: 'Yabancı ekip ile yerel kaynaklar arasındaki bütün iletişimi yönetiyor, gelişmelere göre programı güncelliyoruz.' },
  ],
}

export const newsBanner = {
  label: 'ELIS360 NEWS / Haber',
  text: 'Özel görüntüler, sahadan dosyalar.',
  link: { label: 'Haber sitesine geçin →', href: '/haber' },
}

export const contact = {
  index: '07',
  label: 'İletişim',
  title: 'Türkiye’de ne çekmek istiyorsunuz?',
  text: 'Haber, belgesel veya televizyon projenizin konusunu, çekim tarihlerini ve ihtiyaçlarını bize yazın. Size özel araştırma, ekip ve prodüksiyon planını birlikte oluşturalım.',
  facts: [
    { label: 'Çalışma dili', value: 'Türkçe · İngilizce' },
    { label: 'Kapsam', value: 'Türkiye geneli' },
  ],
}
