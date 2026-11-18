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
- `docs/brand/` — amblem (SVG, koyu/açık), logo kilidi (PNG), orijinal eskiz

## Yapı

```
src/app/layout.tsx          header katmanları (reklam → header → yapışkan nav → son dakika) + footer
src/app/page.tsx            ana sayfa, bölüm bölüm
src/app/iletisim            iletişim sayfası
src/app/api/conditions      ziyaretçi şehri (Vercel geo başlıkları) + hava (Open-Meteo)
src/app/api/contact         form gönderimi: doğrulama, spam koruması, SMTP (nodemailer) ile e-posta
src/app/fikserlik           Fikserlik hizmet sayfası
src/app/haber               haber portalı, /haber/[slug], /haber/kategori/[slug], /haber/onizleme/[id]
src/app/api/revalidate      WordPress yayın bildirimi → önbellek tazeleme
src/app/api/preview         WordPress önizleme → taslak modu
src/app/api/newsletter      bülten kaydı → WordPress
src/app/news-sitemap.xml    Google News site haritası (son 48 saat)
src/lib/wp/                 WPGraphQL istemcisi, örnek veri, HTML temizleme
wordpress/                  ELIS360 Headless eklentisi + kurulum kılavuzu
src/components/home/        ana sayfa bölümleri
src/components/contact/     ContactSection, ContactForm
src/content/home.ts         ana sayfa içeriği
src/lib/seo.tsx             JSON-LD (Organization, Service), Open Graph varsayılanları, SITE_URL
src/lib/routes.ts           henüz kurulmamış rotalar (önyükleme kapalı)
src/app/sitemap.ts, robots.ts
src/components/header/      AdSlot, ServiceBar, Masthead, StickyNav, BreakingBar, Clocks, Conditions
src/components/ui/          LogoMark, DesktopBackdrop, Button, CategoryTag, NumberedList, SectionMotif, SectionLabel, MediaFrame, ikonlar
src/content/site.ts         paylaşılan içerik — yer tutucular tek yerde
TODO-CONTENT.md             yayın öncesi beklenen içerik listesi
```

**Yapışkan navigasyon `<header>`'ın içine taşınmamalı** — açıklaması `StickyNav.tsx` ve `layout.tsx` içinde.

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
