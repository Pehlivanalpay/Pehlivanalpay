/**
 * Haber sitesinin sabit metinleri: kategori açıklamaları, ana sayfa bölüm başlıkları, boş durum.
 * Kategori adresleri WordPress kategori kısa adlarıyla aynıdır (src/lib/wp/types.ts → NEWS_CATEGORIES).
 */
export const categoryInfo: Record<string, { description: string }> = {
  gundem: { description: 'Türkiye ve dünya gündeminden son gelişmeler, sahadan doğrulanmış haberler.' },
  turkiye: { description: 'Türkiye’nin dört bir yanından haberler; muhabir ağımızın sahadan aktardıkları.' },
  'izmir-ve-ege': { description: 'İzmir’den ve Ege’den kent, ekonomi, kültür ve yaşam haberleri.' },
  dunya: { description: 'Dünyadan haberler, kriz bölgelerinden saha notları ve uluslararası analizler.' },
  video: { description: 'ELIS360 ekiplerinin sahadan çektiği görüntüler, röportajlar ve video haberler.' },
  'ozel-dosyalar': { description: 'Uzun soluklu araştırmalar, saha dosyaları ve kendi ekibimizin özel haberleri.' },
}

export const homeLabels = {
  h1: 'ELIS360 NEWS — son dakika ve güncel haberler',
  featured: 'Öne çıkanlar',
  latest: 'Son haberler',
  latestAll: 'Tüm son dakika haberleri →',
  dossierTag: 'Özel dosya',
}

/** WordPress'te henüz yayımlanmış yazı yokken ana sayfa (canlıda boş sayfa göstermemek için). */
export const emptyState = {
  label: 'Yayın akışı',
  title: 'ELIS360 NEWS yayın akışı çok yakında burada.',
  text: 'Haber merkezimiz ilk haberleri hazırlıyor. Gelişmelerden ilk siz haberdar olmak için bültene kaydolun; bir haber ihbarınız varsa bize hemen ulaşın.',
  cta: { label: 'Haber ihbarı', href: '/iletisim' },
}
