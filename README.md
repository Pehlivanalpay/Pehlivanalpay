# ELIS360 NEWS — web sitesi

Next.js (App Router) + TypeScript + Tailwind 3. Headless WordPress (WPGraphQL) Faz 2'de bağlanacak.

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
src/app/(tr)/               Türkçe sayfalar (kök layout <html lang="tr">): /, /fixer-in-turkiye, /produksiyon,
                            /marka-pr, /belgesel, /projeler, /iletisim, /ara, /kvkk, /haber/…
src/app/en/                 İngilizce sayfalar (kök layout <html lang="en">): /en, /en/fixer-in-turkiye, /en/production,
                            /en/brand-pr, /en/documentary, /en/projects, /en/contact, /en/search, /en/privacy
src/app/global-not-found.tsx iki dilli 404 (adres hiçbir dile ait değilse)
src/components/SiteChrome.tsx her iki dilin ortak iskeleti: reklam → header → yapışkan nav → içerik → footer
src/components/pages/       sayfa gövdeleri — iki dil aynı bileşeni kullanır (HomePage, ServicePages, OtherPages, SearchPage, LegalPage)
src/components/sections/    sayfalarda ortak bölümler (PageHero, ListSection, ImageBand…)
src/i18n/config.ts          rota eşlemesi TR↔EN, hreflang, dil anahtarı, EN yayın anahtarı (EN_LIVE)
src/i18n/ui.ts              arayüz metinleri (düğmeler, form, hata mesajları) iki dilde
src/content/                Türkçe içerik: home.ts, pages.ts, images.ts, site.ts, legal.ts (KVKK + privacy)
src/content/en/             İngilizce içerik — Türkçe dosyalarla aynı yapı (TypeScript zorunlu kılar)
src/app/api/conditions      ziyaretçi şehri + hava (Open-Meteo), ?lang=en
src/app/api/contact         form gönderimi: doğrulama, spam koruması, SMTP (nodemailer); ?lang=en
src/app/api/revalidate      WordPress yayın bildirimi → önbellek tazeleme
src/app/api/preview         WordPress önizleme → taslak modu
src/app/api/newsletter      bülten kaydı → WordPress
src/app/news-sitemap.xml    Google News site haritası (son 48 saat)
src/app/sitemap.ts          iki dilli site haritası (hreflang karşılıklarıyla)
src/lib/search.ts           kurumsal sayfalarda arama; WordPress yazıları: lib/wp/client.ts → searchPosts
src/lib/wp/                 WPGraphQL istemcisi, örnek veri, HTML temizleme
src/lib/seo.tsx             JSON-LD (Organization, Service, Breadcrumb), SITE_URL
src/proxy.ts                elis360news.com → www (308)
wordpress/                  ELIS360 Headless eklentisi + kurulum kılavuzu
scripts/                    build-cpanel.sh (paket), check-placeholders.mjs, translation-review.mjs
TESLIM.md                   teslim belgesi — buradan başlayın
docs/ceviri-onay.md         TR↔EN metinler yan yana (onay için)
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
