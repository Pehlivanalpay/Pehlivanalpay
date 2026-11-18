/**
 * Örnek veri — WP_URL tanımlı DEĞİLKEN kullanılır (yerel geliştirme, WordPress bağlanmadan önceki derleme).
 * Metinler tasarım referansındaki (docs/reference/haber.html) yer tutuculardır; `npm run check:content`
 * bunları yakalar. WP_URL tanımlandığı anda bu dosya hiç kullanılmaz.
 */
import type { NewsArticle, NewsCategory, NewsPost } from './types'
import { NEWS_CATEGORIES } from './types'

const cat = (slug: string): NewsCategory => NEWS_CATEGORIES.find((c) => c.slug === slug) ?? NEWS_CATEGORIES[0]

let n = 0
function post(slug: string, title: string, time: string, extra: Partial<NewsPost> = {}): NewsPost {
  n++
  const c = cat(slug)
  return {
    id: n,
    slug: `ornek-${n}`,
    title,
    excerpt: '[Spot metni buraya gelecek.]',
    date: `2026-11-18T${time}:00+03:00`,
    modified: `2026-11-18T${time}:00+03:00`,
    author: 'ELIS360 NEWS',
    category: c,
    categories: [c],
    image: null,
    isBreaking: false,
    isExclusive: false,
    isSponsored: false,
    sponsorName: null,
    videoUrl: null,
    videoDuration: null,
    ...extra,
  }
}

export const fixturePosts: NewsPost[] = [
  post('gundem', '[Manşet başlığı — en fazla iki satır olacak şekilde yazılır]', '20:45', {
    isExclusive: true,
    isBreaking: true,
    category: { name: 'Saha', slug: 'gundem' },
    excerpt:
      '[Spot metni: haberin bir iki cümlelik özeti. Kendi ekibimizin sahadan çektiği görüntülerle hazırlanan dosyanın ne anlattığı buraya yazılır.]',
  }),
  post('gundem', '[İkinci başlık]', '20:30', { isBreaking: true }),
  post('dunya', '[Haber başlığı buraya gelecek]', '16:40'),
  post('video', '[Video haber başlığı buraya gelecek]', '15:12', { videoUrl: 'https://www.youtube.com/watch?v=placeholder', videoDuration: '04:32' }),
  post('izmir-ve-ege', '[Haber başlığı buraya gelecek]', '13:28'),
  post('turkiye', '[Haber başlığı buraya gelecek]', '11:05'),
  post('ozel-dosyalar', '[Özel dosya başlığı]', '09:40', { excerpt: '[Kısa açıklama metni buraya gelecek.]' }),
  post('ozel-dosyalar', '[Özel dosya başlığı]', '09:20', { excerpt: '[Kısa açıklama metni buraya gelecek.]' }),
  post('ozel-dosyalar', '[Özel dosya başlığı]', '09:00', { excerpt: '[Kısa açıklama metni buraya gelecek.]' }),
  post('izmir-ve-ege', '[Haber başlığı buraya gelecek]', '08:40'),
  post('izmir-ve-ege', '[Haber başlığı buraya gelecek]', '08:20'),
  post('dunya', '[Haber başlığı buraya gelecek]', '08:00'),
  post('dunya', '[Haber başlığı buraya gelecek]', '07:40'),
  post('video', '[Video başlığı buraya gelecek]', '07:20', { videoUrl: 'https://www.youtube.com/watch?v=placeholder', videoDuration: '04:32' }),
  post('video', '[Video başlığı buraya gelecek]', '07:00', { videoUrl: 'https://www.youtube.com/watch?v=placeholder', videoDuration: '04:32' }),
  post('gundem', '[Sponsorlu içerik başlığı]', '06:40', { isSponsored: true, sponsorName: '[Sponsor adı]' }),
]

export function fixtureArticle(slug: string): NewsArticle | null {
  const p = fixturePosts.find((x) => x.slug === slug)
  return p
    ? {
        ...p,
        contentHtml:
          '<p>[Haber metni buraya gelecek. Bu örnek içerik, WordPress bağlanana kadar sayfa düzenini göstermek içindir.]</p><h2>[Ara başlık]</h2><p>[Paragraf metni.]</p><blockquote><p>[Alıntı.]</p></blockquote>',
      }
    : null
}
