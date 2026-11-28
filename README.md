# ELIS360 NEWS — web sitesi

Haber sitesi — Next.js (App Router) + TypeScript + Tailwind 3, içerik headless WordPress'ten (WPGraphQL).
Kurumsal site ayrı dalda: `elis360medya-kurumsal` (www.elis360medya.com). Teslim belgesi: TESLIM.md

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
npm run lint
npm run typecheck
npm run check:content  # yayın öncesi yer tutucu denetimi
```

## Tasarım kaynağı

- `docs/design-tokens.md` — tasarım sistemi (renk, tipografi, ızgara, bileşen kuralları)
- `docs/reference/*.html` — ilk tasarımın birebir çıktısı (tasarım dili, ölçüler)
- `docs/reference/web-sitesi-onerisi-2026-11.pdf` — 2026-11 revizyonu: sayfa yapısı, içerik, palet
- `tailwind.config.ts` — token'lar; elle değiştirmeyin, dökümanla birebir aynı
- `docs/brand/` — amblem (SVG, koyu/açık), logo kilidi (PNG), orijinal eskiz

## Yapı

```
src/app/(tr)/page.tsx       haber ana sayfası (manşet, son haberler, kategori blokları, bülten; yazı yokken boş durum)
src/app/(tr)/[kategori]     kategori sayfaları (/gundem, /turkiye, /izmir-ve-ege, /dunya, /video, /ozel-dosyalar)
src/app/(tr)/son-dakika     son dakika akışı (sayfalı)
src/app/(tr)/haber/[slug]   haber; /haber/onizleme/[id] taslak önizleme
src/app/(tr)/kunye          künye + yayın ilkeleri + düzeltme politikası
src/app/(tr)/iletisim, ara, kvkk
src/app/rss.xml, sitemap.ts, news-sitemap.xml, robots.ts
src/app/api/                contact (haber ihbarı, SMTP), newsletter, revalidate (WordPress bildirimi), preview, conditions
src/components/SiteChrome.tsx iskelet: reklam → header → yapışkan nav → son dakika şeridi → içerik → footer
src/components/header/      AdSlot, ServiceBar, Masthead, StickyNav, BreakingBar, Clocks, Conditions
src/components/news/        LeadStory, NewsCard, CategoryBlock, LatestList, PostsListPage, ArticleView, ShareLinks…
src/content/                site.ts (menü/footer), news.ts (kategori metinleri), kunye.ts, home.ts (iletişim), legal.ts
src/lib/wp/                 WPGraphQL istemcisi (liste, sayfalama, arama, önizleme), örnek veri, HTML temizleme
src/lib/seo.tsx             JSON-LD (NewsMediaOrganization, NewsArticle, Breadcrumb), SITE_URL
src/proxy.ts                elis360news.com → www (308)
next.config.ts              kurumsal ve /en adresleri → www.elis360medya.com (308)
wordpress/                  ELIS360 Headless eklentisi (1.1.0) + kurulum kılavuzu
TESLIM.md                   teslim belgesi — buradan başlayın
```

**Yapışkan navigasyon `<header>`'ın içine taşınmamalı** — açıklaması `StickyNav.tsx` ve `SiteChrome.tsx` içinde.

## Ortam değişkenleri

`.env.example`'a bakın. İletişim formu yayında SMTP bilgilerini (`SMTP_HOST`, `SMTP_USER`,
`SMTP_PASS`, isteğe bağlı `SMTP_PORT`) ister — kurumun kendi posta hesabı. Yerelde yoksa mesaj
e-posta yerine sunucu günlüğüne yazılır.

## İletişim formu — spam koruması

Köken denetimi, bal küpü alanı, zaman tuzağı (3 sn), IP başına hız sınırı (10 dk / 5),
bağlantı sayısı sezgisi. JS kapalıyken de çalışır (klasik POST → 303 yönlendirme).
Hız sınırı bellek içidir (sunucusuz örnek başına); kalıcı sınır gerekirse Upstash/Vercel KV.

## Ölçümler (yerel üretim derlemesi, Lighthouse 12)

| Sayfa | Masaüstü perf | Mobil perf | Erişilebilirlik | Best practices | SEO |
|---|---|---|---|---|---|
| / | 99 | 80–86 | 100 | 100 | 100 |
| /fikserlik | 99 | 87 | 100 | 100 | 100 |
| /iletisim | 99 | 88 | 100 | 100 | 100 |

CLS her yerde 0; mobil FCP 0.9 sn. Mobil LCP (simüle 4G) ~4 sn: LCP öğesi h1, Archivo yüklenince
yeniden çiziliyor. Hero fotoğrafı 960px altında hiç indirilmiyor (`DesktopBackdrop`).
Yalnızca Archivo'yu önyüklemek LCP'yi 3.3 sn'ye indirdi ama FCP'yi 2.4 sn'ye çıkardı — geri alındı.
