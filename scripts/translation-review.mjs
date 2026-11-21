#!/usr/bin/env node
/**
 * Çeviri onay dosyası üretir: docs/ceviri-onay.md — Türkçe ve İngilizce metinler yan yana.
 * İki dildeki içerik dosyaları aynı yapıdadır (TypeScript zorunlu kılar); bu betik ikisini birlikte gezer.
 * Kullanım: npm run translations
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import createJiti from 'jiti'

const root = fileURLToPath(new URL('..', import.meta.url))
// jiti 1.x (tailwindcss bağımlılığı olarak kurulu): TypeScript dosyalarını ve @/ takma adını çözer
const jiti = createJiti(fileURLToPath(import.meta.url), { alias: { '@': `${root}src` }, interopDefault: false })
const load = async (p) => jiti(`${root}${p}`)

const [trHome, enHome, trPages, enPages, ui, legal, trSite, enSite] = await Promise.all([
  load('src/content/home.ts'),
  load('src/content/en/home.ts'),
  load('src/content/pages.ts'),
  load('src/content/en/pages.ts'),
  load('src/i18n/ui.ts'),
  load('src/content/legal.ts'),
  load('src/content/site.ts'),
  load('src/content/en/site.ts'),
])

const SKIP = new Set(['src', 'width', 'height', 'href', 'telemetry', 'timecode', 'tone', 'num', 'index', 'letter', 'dark', 'titleLang', 'leadLang', 'span', 'key', 'lang'])
const esc = (s) => String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ')

function pairs(tr, en, path = '', out = []) {
  if (typeof tr === 'function' && typeof en === 'function') {
    out.push([path, tr(3, 'drone'), en(3, 'drone')])
  } else if (typeof tr === 'string' || typeof en === 'string') {
    if (tr !== en || /[a-z]/i.test(String(tr))) out.push([path, tr ?? '—', en ?? '—'])
  } else if (Array.isArray(tr) || Array.isArray(en)) {
    const n = Math.max(tr?.length ?? 0, en?.length ?? 0)
    for (let i = 0; i < n; i++) pairs(tr?.[i], en?.[i], `${path}[${i + 1}]`, out)
  } else if ((tr && typeof tr === 'object') || (en && typeof en === 'object')) {
    for (const k of new Set([...Object.keys(tr ?? {}), ...Object.keys(en ?? {})])) {
      if (SKIP.has(k)) continue
      pairs(tr?.[k], en?.[k], path ? `${path}.${k}` : k, out)
    }
  }
  return out
}

const table = (title, url, tr, en) => {
  const rows = pairs(tr, en).filter(([, a, b]) => a !== b || true)
  return [
    `## ${title}`,
    url ? `\n${url}\n` : '',
    '| ☐ | Alan | Türkçe | English |',
    '|---|---|---|---|',
    ...rows.map(([p, a, b]) => `| ☐ | \`${esc(p)}\` | ${esc(a)} | ${esc(b)} |`),
    '',
  ].join('\n')
}

const pick = (m, keys) => Object.fromEntries(keys.map((k) => [k, m[k]]))
const homeKeys = ['hero', 'twoArms', 'about', 'manifesto', 'serviceAreas', 'selectedProjects', 'contact']

const md = [
  '# Çeviri onayı — Türkçe ↔ English',
  '',
  'Bu dosya `npm run translations` ile içerik dosyalarından üretilir; elle düzenlemeyin.',
  'İngilizce metinler birebir çeviri değil, yabancı yayın kuruluşları ve yapımcılar için yeniden yazıldı (PDF not 01).',
  '',
  '**Nasıl onaylanır:** her satırı okuyun; düzeltme varsa satırı ve yeni metni bize yazın. Hepsi tamam olunca',
  'GitHub › Settings › Secrets and variables › Actions › Variables › `NEXT_PUBLIC_EN_LIVE` = `1` yapılır ve site',
  'yeniden derlenir. O ana kadar /en sayfaları açılır ama arama motorlarına kapalıdır ve menüde görünmez.',
  '',
  '> Sayfalar: www.elis360news.com/en (ön izleme) — yerelde `npm run dev` ile http://localhost:3000/en',
  '',
  table('Ana sayfa', '/ ↔ /en', pick(trHome, homeKeys), pick(enHome, homeKeys)),
  table('Fixer in Türkiye', '/fixer-in-turkiye ↔ /en/fixer-in-turkiye', trPages.fikserlik, enPages.fixer),
  table('Prodüksiyon / Production', '/produksiyon ↔ /en/production', trPages.produksiyon, enPages.production),
  table('Marka & PR / Brand & PR', '/marka-pr ↔ /en/brand-pr', trPages.markaPr, enPages.brand),
  table('Belgesel / Documentary', '/belgesel ↔ /en/documentary', trPages.belgesel, enPages.documentary),
  table('Haberler / Projects', '/haberler ↔ /en/projects', trPages.projeler, enPages.projects),
  // Sayfa sonu şeritlerinin sayfaya özel metinleri (src/components/pages/ServicePages.tsx)
  table('Sayfa sonu şeritleri (Marka & PR, Belgesel)', '', {
    brand: { label: 'Marka ve iletişim', title: 'Markanızı birlikte anlatalım.', text: 'Hedefinizi, kitlenizi ve takviminizi bize yazın; iletişim planını birlikte kuralım.' },
    documentary: { label: 'Belgesel ve saha', title: 'Hikâyenizi sahada birlikte kuralım.', text: 'Konuyu, bölgeyi ve takvimi bize yazın; araştırma, ekip ve güvenlik planını birlikte oluşturalım.' },
  }, {
    brand: { label: 'Brand & communications', title: 'Let’s tell your brand’s story together.', text: 'Tell us your goals, audience and timeline — we’ll build the communications plan with you.' },
    documentary: { label: 'Documentary & field', title: 'Let’s build your story on the ground.', text: 'Tell us the topic, the region and the timeline — we’ll plan research, crew and safety with you.' },
  }),
  table('Menü ve alt bilgi', '', { nav: trSite.mainNav, footer: trSite.footer }, { nav: enSite.mainNavEn, footer: enSite.footerEn }),
  table('Arayüz metinleri (düğmeler, form, hata mesajları)', '', ui.ui('tr'), ui.ui('en')),
  table('KVKK / Privacy notice', '/kvkk ↔ /en/privacy', legal.kvkk, legal.privacy),
].join('\n')

writeFileSync(`${root}docs/ceviri-onay.md`, md)
console.log('docs/ceviri-onay.md yazıldı')
