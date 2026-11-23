# ELIS360 NEWS — teslim belgesi

Tarih: 2026-11-21 · Alan adı: https://www.elis360news.com · CMS: https://cms.elis360news.com/wp

Bu belge sitenin ne olduğunu, nasıl yayına alındığını, içeriğin nasıl değiştirildiğini ve neyin
açık kaldığını tek yerde toplar. Ayrıntılı kılavuzlar: `docs/deploy-cpanel.md`, `wordpress/README.md`.

## 1. Neler teslim ediliyor

| Dil | Sayfalar |
|---|---|
| Türkçe | `/` · `/fixer-in-turkiye` · `/produksiyon` · `/marka-pr` · `/belgesel` · `/projeler` · `/iletisim` · `/ara` · `/kvkk` · `/haber` (WordPress haber portalı: yazı, kategori, önizleme) |
| English | `/en` · `/en/fixer-in-turkiye` · `/en/production` · `/en/brand-pr` · `/en/documentary` · `/en/projects` · `/en/contact` · `/en/search` · `/en/privacy` |

- **İngilizce metinler** çeviri değil, yabancı yayın kuruluşları ve yapımcılar için yeniden yazıldı.
  Görsellerin alternatif metinleri, form hata mesajları, e-posta konusu (`[EN]`), WhatsApp hazır mesajı ve
  hava durumu da İngilizce. Haber portalı (Journal) Türkçe yazılardan oluştuğu için yalnızca Türkçe sitede.
- **Dil anahtarı** bulunduğunuz sayfanın diğer dildeki karşılığına gider (Belgesel ↔ Documentary).
- **İletişim formu** JavaScript kapalıyken de çalışır; spam koruması: kaynak denetimi, görünmez alan,
  3 sn zaman tuzağı, 10 dakikada 5 deneme sınırı, bağlantı denetimi.
- **Erişilebilirlik:** 19 sayfa × 2 genişlik (390 / 1440 px) axe-core WCAG 2.2 AA + best-practice
  denetimi — ihlal yok; yatay taşma yok; hareket azaltma tercihinde iki animasyon da kapalı.
- **SEO:** sayfa başına başlık/açıklama, canonical, hreflang (tr / en / x-default), iki dilli site
  haritası, Google News haritası, JSON-LD (Organization, Service, BreadcrumbList, ContactPage).
- **Güvenlik:** HSTS, X-Content-Type-Options, Referrer-Policy, X-Frame-Options, Permissions-Policy,
  CSP (frame-ancestors / form-action / object-src / base-uri); `X-Powered-By` kapalı;
  uygulama dosyaları `.htaccess` ile dışarıya kapalı (deploy § 4).

## 2. İngilizce sürüm — yayında

2026-11-21'de müşteri onayıyla İngilizce sürüm dil anahtarıyla birlikte yayına alındı: menüde TR · EN,
footer'da "English", hreflang ve iki dilli site haritası açık; /en sayfaları arama motorlarına açık.

Metin düzeltmeleri için `docs/ceviri-onay.md` (TR ve EN yan yana) kullanılabilir.
İngilizceyi geçici olarak yayından çekmek gerekirse: GitHub → Settings → Secrets and variables → Actions →
Variables → `NEXT_PUBLIC_EN_LIVE` = `0` → yeniden derleme. Sayfalar açık kalır ama noindex olur ve menüden kalkar.

## 3. Yayına alma (cPanel)

İlk kurulum adım adım: `docs/deploy-cpanel.md`. **Güncelleme** (bu teslimat dahil):

1. GitHub → Actions → son "Build" çalışması → `elis360-site` paketini indirin
   (ya da yerelde `npm run build:cpanel` → `elis360-site.zip`).
2. cPanel → **Setup Node.js App** → uygulama → **Stop App**.
3. File Manager → `elis360news.com` → eski `.next` klasörünü silin → zip'i yükleyip **Extract**.
   `.htaccess`, `.well-known` ve `node_modules` bağlantısına dokunmayın.
4. `package.json` değiştiyse **Run NPM Install**. Bu teslimatta bağımlılıklar değişmedi.
5. **Start App** / **Restart**.
6. Kontrol: `/`, `/en`, `/kvkk`, `/ara?q=belgesel` açılıyor; `/package.json` → 404; formdan deneme mesajı.

**Ortam değişkenleri** (cPanel → Setup Node.js App → Environment variables). Değerleri sohbet ya da
e-postayla paylaşmayın; yalnızca cPanel'e girin.

| Değişken | Ne zaman | Açıklama |
|---|---|---|
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Hemen | Formun e-posta göndermesi. Yoksa form hata verir ve ziyaretçiye e-posta adresi gösterilir. |
| `CONTACT_TO` | İsteğe bağlı | Formun gideceği adres (varsayılan info@elis360news.com) |
| `WP_URL` | WordPress hazır olunca | `https://cms.elis360news.com/wp` — GitHub değişkeni olarak da girilmeli |
| `WP_WEBHOOK_SECRET`, `WP_PREVIEW_SECRET`, `WP_PREVIEW_USER`, `WP_PREVIEW_APP_PASSWORD` | WordPress hazır olunca | `wordpress/README.md` |

Derleme anında okunan (GitHub → Variables): `WP_URL`, `NEXT_PUBLIC_EN_LIVE`.
`NEXT_PUBLIC_SITE_URL` iş akışında sabit: `https://www.elis360news.com`.

## 4. İçerik nasıl değiştirilir

Kurumsal sayfa metinleri kodun yanındaki içerik dosyalarındadır (WordPress'te değil). Değişiklik →
GitHub'da commit → Actions paketi üretir → § 3 Güncelleme.

| Ne | Türkçe | English |
|---|---|---|
| Ana sayfa | `src/content/home.ts` | `src/content/en/home.ts` |
| Hizmet sayfaları, Projeler/Projects | `src/content/pages.ts` | `src/content/en/pages.ts` |
| Menü, footer, e-posta, WhatsApp, sosyal hesaplar | `src/content/site.ts` | `src/content/en/site.ts` |
| Düğmeler, form etiketleri, hata mesajları | `src/i18n/ui.ts` (`tr`) | `src/i18n/ui.ts` (`en`) |
| KVKK / Privacy | `src/content/legal.ts` (`kvkk`) | `src/content/legal.ts` (`privacy`) |
| Fotoğraflar ve alternatif metinleri | `public/images/`, `src/content/images.ts` | `src/content/en/images.ts` |

İngilizce dosyalar Türkçe dosyalarla aynı yapıdadır: bir alan eklenip karşılığı unutulursa derleme hata
verir. Metin değişince `npm run translations` çeviri onay dosyasını yeniler.

**ELIS360 Journal** (haberler, `/haber`) WordPress'ten gelir (cms.elis360news.com/wp/wp-admin). Yayında hiç yazı yokken
Journal bağlantıları gizlenir ve `/haber` Projeler sayfasına yönlenir; ilk yazı yayımlanınca kendiliğinden açılır.
Yayımlanan yazı sitede 60 sn içinde,
webhook kuruluysa hemen görünür. Editör kılavuzu: `wordpress/README.md`.

## 5. Geliştirici notları

- Next.js 16.4.6 (App Router, Turbopack) · React 19.3.1 · Tailwind 3.4 · Node 24. Bağımlılıklar sabit sürüm.
- İki kök layout: `src/app/(tr)/layout.tsx` ve `src/app/en/layout.tsx`; ortak iskelet `src/components/SiteChrome.tsx`.
  Diller arası geçiş tam sayfa yüklemesidir (her dilin kendi `<html lang>` değeri olduğu için).
- **Yapışkan navigasyon `<header>`'ın içine taşınmamalı** — gerekçe `StickyNav.tsx` ve `SiteChrome.tsx` içinde.
- Çentik (kesik köşe) yalnızca üç yerde; animasyon yalnızca iki (hero nişangâhı, durum noktası) ve
  `prefers-reduced-motion` ile kapanır; tek kırılım noktası 960 px. Tasarım kuralları: `docs/design-tokens.md`.
- Komutlar: `npm run dev` · `npm run build` · `npm run lint` · `npm run typecheck` ·
  `npm run check:content` (yer tutucu denetimi) · `npm run translations` · `npm run build:cpanel`.
- Yerelde WordPress yokken örnek haberler görünür; yayında görünmez (`WP_FIXTURES=1` ile zorlanabilir).

## 6. Açık kalemler

| # | Kalem | Sorumlu |
|---|---|---|
| 1 | KVKK metnine ticari unvan, MERSİS, adres, VERBİS durumu; hukukçu kontrolü | Müşteri / hukuk |
| 2 | SMTP değişkenleri ve canlı form testi | Müşteri (cPanel) |
| 3 | WordPress: SSL, eklentiler, wp-config anahtarları, `WP_URL`, editör hesapları | Müşteri — `wordpress/README.md` |
| 4 | Sosyal hesap adresleri; Marka & PR ve "Biz kimiz" için özgün görseller | Müşteri |
| 5 | Fotoğraflardaki kişiler için kullanım izinleri | Müşteri |
| 6 | Google Search Console: alan adı doğrulama, `sitemap.xml` ve `news-sitemap.xml` gönderimi | Müşteri |

Bilinen sınır: form deneme sınırı sunucu belleğindedir; uygulama yeniden başlayınca sıfırlanır.
Tek sunuculu cPanel kurulumu için yeterli.
