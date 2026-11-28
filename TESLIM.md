# ELIS360 NEWS — haber sitesi teslim belgesi

Tarih: 2026-11-28 · Alan adı: https://www.elis360news.com · CMS: https://cms.elis360news.com/wp

2026-11-28'de elis360news.com kurumsal siteden **haber sitesine** dönüştürüldü. Tema, header ve footer
tasarımı aynen korundu; içerik haber yayınına göre yeniden kuruldu.

| | Kaynak | Alan adı |
|---|---|---|
| **Haber sitesi** (bu dal) | `claude/new-session-y41gd2` | www.elis360news.com |
| **Kurumsal site** (eski sürüm, korunuyor) | `elis360medya-kurumsal` dalı | www.elis360medya.com |

Eski kurumsal adresler (`/fixer-in-turkiye`, `/produksiyon`, `/marka-pr`, `/belgesel`, `/projeler`,
`/haberler`, `/fikserlik`, `/en/…`) www.elis360medya.com'daki karşılıklarına **kalıcı (308)** yönlenir;
arama motoru değeri yeni alan adına taşınır.

## 1. Sayfalar

| Adres | İçerik |
|---|---|
| `/` | Manşet (en yeni "özel haber", yoksa en yeni yazı) + öne çıkanlar, son haberler, kategori blokları (Gündem, Türkiye, İzmir ve Ege, Dünya), koyu Video bloğu, Özel dosyalar, sponsorlu içerik, bülten. Aynı haber sayfada iki kez çıkmaz. |
| `/gundem` `/turkiye` `/izmir-ve-ege` `/dunya` `/video` `/ozel-dosyalar` | Kategori sayfaları: manşet + kart ızgarası + "Daha eski haberler" sayfalaması |
| `/son-dakika` | Tüm haberler, en yeni en üstte, sayfalı |
| `/haber/[yazı]` | Haber: özel haber / sponsorlu etiketleri, YouTube videosu, paylaşım bağlantıları, son eklenenler |
| `/kunye` | Künye, yayın ilkeleri, düzeltme politikası |
| `/iletisim` | Haber ihbarı ve iletişim formu (konu: ihbar, fotoğraf/video, düzeltme ve cevap hakkı, reklam, diğer) |
| `/ara` | Arama: önce haberler, sonra kategoriler ve sabit sayfalar |
| `/kvkk` | KVKK aydınlatma metni (haber sitesine ve kaynak gizliliğine göre güncellendi) |
| `/rss.xml` · `/sitemap.xml` · `/news-sitemap.xml` | RSS, site haritası, Google News haritası (son 48 saat) |

**Header ve footer:** tasarım birebir aynı.
- **Logo satırı:** alt başlık "Haber • Gündem • Dosya • Video", sağdaki düğme **Haber ihbarı**.
- **Yapışkan menü:** Ana sayfa, Son dakika, kategoriler.
- **Son dakika şeridi:** yalnızca WordPress'te "Son dakika" işaretli yazı varken görünür; animasyon yok.
- **Footer:** "Kategoriler" ve "Kurumsal" sütunları (Künye, İletişim, RSS, ELIS360 Medya).

**Görseli olmayan haber:** gri kutu yerine markalı koyu kutu (amblem) çizilir.

**WordPress'te henüz yazı yokken:** ana sayfa "Yayın akışı çok yakında" mesajı, haber ihbarı düğmesi ve
bülten kutusu gösterir. Kategoriler "henüz haber yok" der. Site hiçbir durumda boş ya da kırık görünmez.

**SEO:**
- `NewsMediaOrganization` şeması (yayın ilkeleri, düzeltme politikası ve künye bağlantılarıyla), `NewsArticle`, `BreadcrumbList`.
- Kategori ve haber başına başlık/açıklama; sayfalanmış eski listeler `noindex`.
- Sponsorlu yazılar `noindex` ve `Article` (haber olarak sıralanmaz).
- Haber kimliğiyle yeni paylaşım görseli (`public/og.jpg`).

## 2. Yayına alma (cPanel)

İlk kurulum adımları: `docs/deploy-cpanel.md` (değişmedi). **Bu güncelleme için:**

1. cPanel → **Setup Node.js App** → elis360news.com uygulaması → **Stop App**.
2. File Manager → `elis360news.com` → eski `.next` klasörünü silin. Eski `public/images` klasörünü de silebilirsiniz; artık kullanılmıyor.
3. `elis360-site.zip` yükle → **Extract** → zip'i sil.
4. **Start App** — bağımlılıklar değişmedi, "Run NPM Install" gerekmez.
5. Kontrol: `/`, `/gundem`, `/kunye`, `/iletisim`; `/fixer-in-turkiye` → elis360medya.com'a gidiyor.

**Kurumsal site (elis360medya.com):**
- cPanel'de alan adı eklenir, SSL açılır ve ayrı bir Node.js uygulaması kurulur. Adımlar `docs/deploy-cpanel.md` ile aynı, yalnızca klasör ve alan adı farklı.
- Paket `elis360medya-kurumsal` dalından üretilir (`elis360medya-kurumsal.zip`).
- O dalda `/haber` adresleri www.elis360news.com'a yönlenir.

**WordPress eklentisi 1.1.0:** kategori bağlantıları yeni adreslere (`/gundem` vb.) gider.
`wordpress/elis360-headless.zip` → Eklentiler → Yeni ekle → Yükle → "Mevcut olanı değiştir".

**Ortam değişkenleri:** öncekiyle aynı (`SMTP_*`, `WP_URL`, `WP_WEBHOOK_SECRET`, `WP_PREVIEW_*`).
Haberlerin görünmesi için `WP_URL` hem cPanel'de hem GitHub değişkenlerinde tanımlı olmalı.
`NEXT_PUBLIC_EN_LIVE` artık kullanılmıyor.

## 3. İçerik

- **Haberler:** WordPress (cms.elis360news.com/wp/wp-admin). Yazı → kategori seçin → öne çıkan görsel → sağdaki
  "ELIS360 — haber ayarları": *Son dakika* (şeritte ve son dakika vurgusunda), *Özel haber* (manşet önceliği ve
  rozet), *Sponsorlu* (+ sponsor adı), *Video adresi* (YouTube). Yayımlanan yazı en geç 60 sn'de, webhook kuruluysa
  hemen görünür. Editör kılavuzu: `wordpress/README.md`.
- **Sabit metinler** (kodda):

  | Ne | Dosya |
  |---|---|
  | Menü, footer, e-posta, WhatsApp, sosyal hesaplar | `src/content/site.ts` |
  | Kategori açıklamaları, ana sayfa başlıkları, boş durum | `src/content/news.ts` |
  | Künye ve yayın ilkeleri | `src/content/kunye.ts` |
  | İletişim metni ve konu seçenekleri | `src/content/home.ts` |
  | KVKK | `src/content/legal.ts` |
  | Düğme ve form metinleri | `src/i18n/ui.ts` |

- **Kategori eklemek:**
  1. WordPress'te aynı kısa adla kategori açın.
  2. `src/lib/wp/types.ts` → `NEWS_CATEGORIES` listesine ekleyin.
  3. `src/content/news.ts` dosyasına açıklamasını yazın.
  4. `src/content/site.ts` içinde menüye ve footer'a ekleyin.

## 4. Doğrulama (2026-11-28)

- `tsc`, `eslint`, üretim derlemesi: temiz.
- Gerçekçi WordPress taklidiyle (26 yazı + sponsorlu, 6 kategori, video, sponsorlu, son dakika, sayfalama) uçtan uca test.
- axe-core WCAG 2.2 AA + best-practice: 13 sayfa × 390 / 1440 px → ihlal yok, yatay taşma yok.
- Yönlendirmeler: kurumsal adresler ve `/en/*` → elis360medya.com (308), `/haber` → `/`, `/haber/kategori/x` → `/x`.
- cPanel paketi CloudLinux benzeri ortamda (node_modules bağlantısı ile) çalıştırıldı: tüm sayfalar 200, görsel optimizasyonu çalışıyor.
- WordPress bağlı değilken boş durum ekranı ve kategori sayfaları denetlendi.

## 5. Açık kalemler

| # | Kalem | Sorumlu |
|---|---|---|
| 1 | **Künye:** yayın sahibi, sorumlu yazı işleri müdürü, yönetim yeri adresi, telefon (`src/content/kunye.ts`). Basın Kanunu gereği yayına çıkmadan önce. `npm run check:content` bunları listeler. | Müşteri / hukuk |
| 2 | WordPress: SSL, eklentiler (1.1.0), wp-config anahtarları, `WP_URL`, editör hesapları | Müşteri — `wordpress/README.md` |
| 3 | SMTP değişkenleri ve canlı form testi (haber ihbarları info@ adresine düşer) | Müşteri |
| 4 | elis360medya.com: alan adı, SSL, ayrı Node.js uygulaması, kurumsal paket | Müşteri |
| 5 | KVKK metninin hukukçu kontrolü (ticari unvan, MERSİS, adres) | Müşteri / hukuk |
| 6 | Sosyal hesap adresleri (`site.social`) | Müşteri |
| 7 | Google Search Console + Google News Publisher Center başvurusu; `sitemap.xml` ve `news-sitemap.xml` gönderimi | Müşteri |

## 6. Geliştirici notları

- **Sürümler:** Next.js 16.4.6 (App Router, Turbopack) · React 19.3.1 · Tailwind 3.4 · Node 24.
- **Yapışkan navigasyon `<header>`'ın içine taşınmamalı.** Gerekçesi `StickyNav.tsx` ve `SiteChrome.tsx` içinde.
- **Kategori adresleri:** `src/app/(tr)/[kategori]` altında; yalnızca `NEWS_CATEGORIES` listesindekiler çalışır (`dynamicParams=false`), başka adres 404 verir.
- **Sayfalama:** WPGraphQL imleci (`?sonra=…`) ile çalışır.
- **Yerel geliştirme:** `npm run dev` WordPress yokken örnek veriyle çalışır. Üretim derlemesinde örnek veri asla görünmez (`WP_FIXTURES=1` ile zorlanabilir).
- **Komutlar:** `npm run dev`, `npm run build`, `npm run lint`, `npm run typecheck`, `npm run check:content`, `npm run images`, `npm run build:cpanel`.
