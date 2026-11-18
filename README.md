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
- `docs/reference/*.html` — tasarımın birebir çıktısı; emin olunmayan her değer buradan okunur
- `tailwind.config.ts` — token'lar; elle değiştirmeyin, dökümanla birebir aynı

## Yapı

```
src/app/layout.tsx          header katmanları (reklam → header → yapışkan nav → son dakika) + footer
src/app/page.tsx            ana sayfa, bölüm bölüm
src/app/iletisim            iletişim sayfası
src/app/api/conditions      ziyaretçi şehri (Vercel geo başlıkları) + hava (Open-Meteo)
src/app/api/contact         form gönderimi: doğrulama, spam koruması, Resend ile e-posta
src/components/home/        ana sayfa bölümleri
src/components/contact/     ContactSection, ContactForm
src/content/home.ts         ana sayfa içeriği
src/lib/seo.tsx             JSON-LD (Organization, Service), Open Graph varsayılanları, SITE_URL
src/lib/routes.ts           henüz kurulmamış rotalar (önyükleme kapalı)
src/app/sitemap.ts, robots.ts
src/components/header/      AdSlot, ServiceBar, Masthead, StickyNav, BreakingBar, Clocks, Conditions
src/components/ui/          Button, CategoryTag, NumberedList, SectionMotif, SectionLabel, MediaFrame, ikonlar
src/content/site.ts         paylaşılan içerik — yer tutucular tek yerde
TODO-CONTENT.md             yayın öncesi beklenen içerik listesi
```

**Yapışkan navigasyon `<header>`'ın içine taşınmamalı** — açıklaması `StickyNav.tsx` ve `layout.tsx` içinde.

## Ortam değişkenleri

`.env.example`'a bakın. İletişim formu yayında `RESEND_API_KEY` ister; yerelde anahtar yoksa
mesaj e-posta yerine sunucu günlüğüne yazılır.

## İletişim formu — spam koruması

Köken denetimi, bal küpü alanı, zaman tuzağı (3 sn), IP başına hız sınırı (10 dk / 5),
bağlantı sayısı sezgisi. JS kapalıyken de çalışır (klasik POST → 303 yönlendirme).
Hız sınırı bellek içidir (sunucusuz örnek başına); kalıcı sınır gerekirse Upstash/Vercel KV.

## Ölçümler (yerel üretim derlemesi, Lighthouse 12)

| Sayfa | Cihaz | Perf | Erişilebilirlik | Best practices | SEO |
|---|---|---|---|---|---|
| / | masaüstü | 98 | 100 | 100 | 100 |
| / | mobil | 84–87 | 100 | 100 | 100 |
| /iletisim | masaüstü | 99 | 100 | 100 | 100 |
| /iletisim | mobil | 89 | 100 | 100 | 100 |

Mobil LCP (simüle 4G) ~3.9 sn; LCP öğesi hero'nun dekoratif zemin fotoğrafı. CLS her yerde 0.
