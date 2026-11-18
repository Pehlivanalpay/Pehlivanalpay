/** Haber verisinin uygulama içi biçimi — WPGraphQL yanıtı buna dönüştürülür (client.ts → normalize). */

export type NewsImage = { src: string; alt: string; width: number; height: number }

export type NewsCategory = { name: string; slug: string }

export type NewsPost = {
  id: number
  slug: string
  title: string
  /** Düz metin özet (HTML'den arındırılmış). */
  excerpt: string
  /** ISO tarih (yayın). */
  date: string
  modified: string
  author: string | null
  category: NewsCategory | null
  categories: NewsCategory[]
  image: NewsImage | null
  isBreaking: boolean
  isExclusive: boolean
  isSponsored: boolean
  sponsorName: string | null
  videoUrl: string | null
  videoDuration: string | null
}

export type NewsArticle = NewsPost & {
  /** WordPress gövde HTML'i — render öncesi sanitize edilir (lib/wp/sanitize.ts). */
  contentHtml: string
}

/** Sitenin tanıdığı haber kategorileri — sıra kategori şeridindeki sıradır (haber.html). */
export const NEWS_CATEGORIES: NewsCategory[] = [
  { name: 'Gündem', slug: 'gundem' },
  { name: 'Türkiye', slug: 'turkiye' },
  { name: 'İzmir ve Ege', slug: 'izmir-ve-ege' },
  { name: 'Dünya', slug: 'dunya' },
  { name: 'Video', slug: 'video' },
  { name: 'Özel dosyalar', slug: 'ozel-dosyalar' },
]
