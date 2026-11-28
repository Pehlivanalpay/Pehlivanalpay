import 'server-only'
import { categoryInfo } from '@/content/news'
import { NEWS_CATEGORIES } from '@/lib/wp/types'
import type { Locale } from '@/i18n/config'

export type PageHit = { title: string; description: string; href: string }

const fold = (s: string) =>
  s
    .toLocaleLowerCase('tr')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ı/g, 'i')

/** Sabit sayfalar + kategoriler. Haberlerin kendisi WordPress aramasıyla (searchPosts) bulunur. */
const INDEX: PageHit[] = [
  ...NEWS_CATEGORIES.map((c) => ({ title: c.name, description: categoryInfo[c.slug]?.description ?? '', href: `/${c.slug}` })),
  { title: 'Son dakika', description: 'Son dakika haberleri ve gelişmeler.', href: '/son-dakika' },
  { title: 'Künye ve yayın ilkeleri', description: 'Yayın sahibi, sorumlu müdür, iletişim bilgileri ve yayın ilkelerimiz.', href: '/kunye' },
  { title: 'Haber ihbarı ve iletişim', description: 'Haber ihbarı, düzeltme ve cevap hakkı, reklam ve iş birliği.', href: '/iletisim' },
  { title: 'KVKK aydınlatma metni', description: 'Kişisel verilerin korunması.', href: '/kvkk' },
]

/** Sabit sayfalarda arama: tüm kelimeler başlıkta ya da açıklamada geçmeli. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function searchPages(q: string, _locale: Locale = 'tr'): PageHit[] {
  const terms = fold(q).split(/\s+/).filter((t) => t.length > 1)
  if (!terms.length) return []
  return INDEX.filter((p) => {
    const all = fold(`${p.title} ${p.description}`)
    return terms.every((t) => all.includes(t))
  })
}
