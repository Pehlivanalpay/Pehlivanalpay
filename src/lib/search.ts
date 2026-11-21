import 'server-only'
import * as enHome from '@/content/en/home'
import * as enPages from '@/content/en/pages'
import * as trHome from '@/content/home'
import * as trPages from '@/content/pages'
import { ROUTES, type Locale, type RouteKey } from '@/i18n/config'

export type PageHit = { title: string; description: string; href: string }

/** Nesnedeki tüm metinleri toplar (görsel yolları/adresleri hariç) — sayfa içeriği dizini için. */
function texts(v: unknown, out: string[] = []): string[] {
  if (typeof v === 'string') {
    if (!/^(\/|https?:)/.test(v)) out.push(v)
  } else if (Array.isArray(v)) v.forEach((x) => texts(x, out))
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) if (k !== 'image' && k !== 'src') texts(x, out)
  return out
}

const fold = (s: string, locale: Locale) =>
  s
    .toLocaleLowerCase(locale)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ı/g, 'i')

type Entry = { key: RouteKey; title: string; description: string; body: unknown }

function index(locale: Locale): Entry[] {
  if (locale === 'en') {
    const p = enPages
    return [
      { key: 'home', title: 'ELIS360 NEWS', description: enHome.hero.lead, body: enHome },
      { key: 'fixer', title: p.fixer.meta.title, description: p.fixer.meta.description, body: p.fixer },
      { key: 'production', title: p.production.meta.title, description: p.production.meta.description, body: p.production },
      { key: 'brand', title: p.brand.meta.title, description: p.brand.meta.description, body: p.brand },
      { key: 'documentary', title: p.documentary.meta.title, description: p.documentary.meta.description, body: p.documentary },
      { key: 'projects', title: p.projects.meta.title, description: p.projects.meta.description, body: p.projects },
      { key: 'contact', title: 'Contact', description: enHome.contact.text, body: enHome.contact },
    ]
  }
  const p = trPages
  return [
    { key: 'home', title: 'ELIS360 NEWS', description: trHome.hero.lead, body: { ...trHome, news: undefined } },
    { key: 'fixer', title: 'Fixer in Türkiye — Fikserlik', description: p.fikserlik.meta.description, body: p.fikserlik },
    { key: 'production', title: p.produksiyon.meta.title, description: p.produksiyon.meta.description, body: p.produksiyon },
    { key: 'brand', title: p.markaPr.meta.title, description: p.markaPr.meta.description, body: p.markaPr },
    { key: 'documentary', title: p.belgesel.meta.title, description: p.belgesel.meta.description, body: p.belgesel },
    { key: 'projects', title: p.projeler.meta.title, description: p.projeler.meta.description, body: p.projeler },
    { key: 'contact', title: 'İletişim', description: trHome.contact.text, body: trHome.contact },
  ]
}

/** Kurumsal sayfalarda arama: tüm kelimeler geçmeli; başlıkta geçen üste çıkar. */
export function searchPages(q: string, locale: Locale): PageHit[] {
  const terms = fold(q, locale).split(/\s+/).filter((t) => t.length > 1)
  if (!terms.length) return []
  return index(locale)
    .map((e): { score: number; hit: PageHit } | null => {
      const title = fold(e.title, locale)
      const all = fold([e.title, e.description, ...texts(e.body)].join(' '), locale)
      if (!terms.every((t) => all.includes(t))) return null
      const score = terms.reduce((s, t) => s + (title.includes(t) ? 3 : 0) + (all.split(t).length - 1), 0)
      return { score, hit: { title: e.title, description: e.description, href: ROUTES[e.key][locale] } }
    })
    .filter((x): x is { score: number; hit: PageHit } => x !== null)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.hit)
}
