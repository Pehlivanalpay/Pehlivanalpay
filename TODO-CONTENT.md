# TODO-CONTENT — yayına çıkmadan önce gelecek içerik

Bu listedeki her şey şu an yer tutucudur ve **yayında kalmamalı**.
Kontrol: `npm run check:content` (yer tutucu bulursa çıkış kodu 1 — CI'a eklenebilir).

Durum: ☐ bekliyor · ☑ tamam

## Header (Faz 1 — tamamlandı, içerik bekliyor)

| # | İçerik | Nerede | Not |
|---|---|---|---|
| ☐ | Sosyal hesap adresleri: LinkedIn, Instagram, YouTube | `src/content/site.ts` → `site.social` | Şu an `#`. Tam URL girilince yeni sekmede açılır. |
| ☑ | Son dakika manşetleri | WordPress → yazıda "Son dakika" kutusu | WordPress'e bağlandı. İşaretli yazı yoksa şerit görünmez. |
| ☐ | Reklam / sponsor içeriği (970×90) | `src/app/layout.tsx` → `<AdSlot>` | `children` verilmezse kesik çizgili yer tutucu çizilir. Önce kendi sponsor bileşeni, sonra Google Ad Manager. Satılmamışsa `<AdSlot />` satırı kaldırılmalı. |
| ☐ | Arama sonuç sayfası `/ara?q=` | `Masthead` → `searchAction` | Sayfa yok (404). Sıradaki: WPGraphQL arama. |
| ☑ | Haber portalı `/haber` | `src/app/haber` | Kuruldu; WordPress bağlanınca gerçek haberler gelir. |
| ☐ | İngilizce sürüm `/en` | `src/app/layout.tsx` → `StickyNav locales` | EN şu an bağlantısız ("Yakında"). `href: '/en'` verilince bağlantı olur. |
| ☐ | Yedek konum | `src/content/site.ts` → `site.fallbackLocation` | Konum algılanamazsa İzmir gösterilir. Karar: kalsın mı? |

## Ana sayfa (Faz 1 — kuruldu, içerik bekliyor)

İçerik dosyası: `src/content/home.ts`

| # | İçerik | Nerede | Not |
|---|---|---|---|
| ☑ | Haberler bölümü | WordPress | Ana sayfa ve /haber WordPress'ten beslenir. WordPress bağlı değilken yerelde/ön izlemede örnek veri, canlıda bölüm gizli. |
| ☐ | "Biz kimiz" görseli | `about.image` | Şu an hero fotoğrafı tekrar kullanılıyor. Saha arşivinden gerçek kare önerilir. |
| ☐ | Hero kayıt göstergesi, zaman kodu, koordinat | `hero.telemetry` | Süs. Kalacaksa dokunmayın; kaldırmak için `null` yapın. "Biz kimiz" görselindeki zaman kodu: `about.timecode`. |
| ☑ | Hero fotoğrafı mobilde | `DesktopBackdrop` | Karar: mobilde gizli — 960px altında hiç indirilmiyor. |
| ☑ | Haberler bölümü ve Son dakika şeridi | | Karar: tasarımdaki gibi kalıyor (içerik yer tutucu). |
| ☑ | Rakamlar | `hero.panel.stats` | PDF'e göre: 30 yıl, Türkiye geneli, TR·EN, 05 hizmet alanı. |

## İletişim

| # | İçerik | Nerede | Not |
|---|---|---|---|
| ☐ | SMTP bilgileri: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Vercel ortam değişkenleri, bkz. `.env.example` | Kurumun kendi posta hesabı (info@elis360news.com). Sağlayıcının "e-posta istemcisi / SMTP ayarları" sayfasından alınır. Yoksa yayında form hata verir ve kullanıcıya doğrudan e-posta adresi gösterilir. |
| ☐ | KVKK aydınlatma metni bağlantısı | form altı | Kişisel veri toplanıyor — hukuki metin gerekir. |

## SEO ve marka varlıkları

| # | İçerik | Nerede | Not |
|---|---|---|---|
| ☑ | Alan adı | `NEXT_PUBLIC_SITE_URL` | `https://www.elis360news.com` (onaylandı). |
| ☑ | Logo ve amblem | `src/components/ui/LogoMark.tsx`, `docs/brand/` | Eskizden çizildi. Onayınızı bekliyor — değişiklik gerekirse tek dosya. |
| ☑ | Site ikonu | `src/app/icon.svg`, `favicon.ico`, `apple-icon.png` | Amblemden üretildi. |
| ☑ | Paylaşım görseli (1200×630) | `public/og.jpg` | Logo + "Media • Fixer • Production". |
| ☑ | Schema logosu | `public/logo.png` (512×512) | |
| ☐ | Sosyal hesaplar → `sameAs` | `site.social` | Gerçek adresler girilince schema'ya kendiliğinden eklenir. |
| ☐ | Kurulmamış rotalar | `src/lib/routes.ts` → `UNBUILT` | Sayfa kurulunca listeden silin (önyükleme açılır). |

## WordPress (haber)

Adım adım: `wordpress/README.md`

| # | İş | Kim |
|---|---|---|
| ☐ | cms.elis360news.com için SSL (cPanel → SSL/TLS Status → Run AutoSSL) | siz |
| ☐ | Arama motoru görünürlüğü: Devre Dışı; güvenlik güncellemeleri: otomatik | siz |
| ☐ | WPGraphQL + ELIS360 Headless eklentileri | siz |
| ☐ | wp-config.php'ye 3 satır (gizli anahtarlar) | siz |
| ☐ | 2–3 kullanıcı hesabı (Editör / Yazar) | siz |
| ☐ | Vercel ortam değişkenleri (WP_URL vb.) | siz |
| ☐ | Uçtan uca test: yayımla → sitede görünür, yayından kaldır → kaybolur, önizle | birlikte |
| ☐ | Bülten: KVKK aydınlatma metni + gönderim servisi kararı | siz |

## 2026-11 revizyonu (PDF: docs/reference/web-sitesi-onerisi-2026-11.pdf)

| # | İçerik | Nerede | Not |
|---|---|---|---|
| ☐ | **WhatsApp numarası** | `src/content/site.ts` → `site.whatsapp` | Boşken WhatsApp düğmeleri gizli. Uluslararası biçim, yalnızca rakam (ör. `905321234567`). Mobilde sabit düğme, masaüstünde iletişim alanında. |
| ☐ | Marka & PR görseli | `src/content/pages.ts` → `markaPr.hero.image` | Şu an stüdyo çekimi. PDF: yönetici röportajı, basın toplantısı veya marka filmi seti tercih edilmeli (savaş/haber arşivi değil). |
| ☐ | Belgesel "saha röportajı" görseli | `belgesel.visuals[0]` | Şu an Fikserlik sayfasıyla aynı kare. Gerçek bir karakterle yapılan saha röportajı önerilir. |
| ☐ | Görsel izinleri | `public/images/` | Savaşın Çocukları ve saha fotoğrafları için kişisel veri / izin kontrolü (PDF not 05). |
| ☐ | İngilizce sürüm | — | PDF not 01: İngilizce sayfalar otomatik çeviri olmamalı. Sıradaki iş. |
| ☑ | Her menü başlığı ayrı sayfa | `/`, `/fixer-in-turkiye`, `/produksiyon`, `/marka-pr`, `/belgesel`, `/haberler`, `/iletisim` | Eski `/fikserlik` → `/fixer-in-turkiye` (308). |
| ☑ | Renk paleti | `tailwind.config.ts` | Gece laciverti #07111F, bordo #A3133D (koyu zeminde #F2667D), kırık beyaz #F3EFE7, metalik gri #AAB3C0. |
| ☑ | Form alanları | `src/lib/contact.ts` | Hızlı destek seçimi, kurum, ülke, şehir, tarihler, ekip ihtiyacı, proje özeti. |
