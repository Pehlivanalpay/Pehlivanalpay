#!/usr/bin/env node
/**
 * Yayın öncesi yer tutucu denetimi. Bulursa çıkış kodu 1 döner.
 * - src/content/** içinde köşeli parantezli metinler: '[Manşet başlığı …]'
 * - src/content/** içinde PLACEHOLDER_HREF ya da href: '#'
 * - src/content/** içinde `image: null` (gri kutu çizilir)
 * - src/** içinde gri görsel kutusu: bg-placeholder / #C9CDD3
 * Ayrıntı ve bekleyen içerik listesi: TODO-CONTENT.md
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const walk = (d) =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f)
    return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|mdx?)$/.test(p) ? [p] : []
  })

const rules = [
  { dir: 'src/content', re: /(['"`])\[[^\]\n]+\]\1/g, why: 'köşeli parantezli yer tutucu metin' },
  // Not: src/lib/wp/fixtures.ts bilerek taranmaz — yalnızca WordPress bağlı değilken ve canlı dışında
  // kullanılır (lib/wp/client.ts → usingFixtures).
  { dir: 'src/content', re: /href:\s*(PLACEHOLDER_HREF|['"]#['"])/g, why: 'boş bağlantı (#)' },
  { dir: 'src/content', re: /image:\s*null/g, why: 'gri görsel yer tutucusu (görsel yok)' },
  { dir: 'src', re: /bg-placeholder|#C9CDD3/gi, why: 'gri görsel yer tutucusu' },
]

let hits = 0
for (const { dir, re, why } of rules) {
  for (const file of walk(dir)) {
    readFileSync(file, 'utf8')
      .split('\n')
      .forEach((line, i) => {
        if (line.includes('check-placeholders: ignore')) return
        for (const m of line.matchAll(re)) {
          hits++
          console.log(`${file}:${i + 1}  ${why}  →  ${m[0]}`)
        }
      })
  }
}
console.log(hits ? `\n${hits} yer tutucu bulundu. Yayına çıkmadan önce TODO-CONTENT.md'yi tamamlayın.` : 'Yer tutucu yok.')
process.exit(hits ? 1 : 0)
