# TODO-CONTENT — yayına çıkmadan önce gelecek içerik

Bu listedeki her şey şu an yer tutucudur ve **yayında kalmamalı**.
Kontrol: `npm run check:content` (yer tutucu bulursa çıkış kodu 1 — CI'a eklenebilir).

Durum: ☐ bekliyor · ☑ tamam

## Header (Faz 1 — tamamlandı, içerik bekliyor)

| # | İçerik | Nerede | Not |
|---|---|---|---|
| ☐ | Sosyal hesap adresleri: LinkedIn, Instagram, YouTube | `src/content/site.ts` → `site.social` | Şu an `#`. Tam URL girilince yeni sekmede açılır. |
| ☐ | Son dakika manşetleri | `src/content/site.ts` → `breakingPlaceholder` | `[Manşet başlığı buraya gelecek]`, `[İkinci başlık]`. Faz 2'de WPGraphQL (`breaking` etiketi). **Yayın tarafı hazır değilse diziyi boşaltın** — şerit kendiliğinden kaybolur. |
| ☐ | Reklam / sponsor içeriği (970×90) | `src/app/layout.tsx` → `<AdSlot>` | `children` verilmezse kesik çizgili yer tutucu çizilir. Önce kendi sponsor bileşeni, sonra Google Ad Manager. Satılmamışsa `<AdSlot />` satırı kaldırılmalı. |
| ☐ | Arama sonuç sayfası `/ara?q=` | `Masthead` → `searchAction` | Sayfa yok (404). Faz 2: WPGraphQL arama. |
| ☐ | Haber portalı `/haber` | `src/content/site.ts` → `mainNav`, `breakingPlaceholder` | Faz 2. O zamana kadar "Haber" menü öğesi 404'e gider — kaldırılmalı ya da Faz 2 ile birlikte yayına alınmalı. |
| ☐ | İngilizce sürüm `/en` | `src/app/layout.tsx` → `StickyNav locales` | EN şu an bağlantısız ("Yakında"). `href: '/en'` verilince bağlantı olur. |
| ☐ | Yedek konum | `src/content/site.ts` → `site.fallbackLocation` | Konum algılanamazsa İzmir gösterilir. Karar: kalsın mı? |

## Ana sayfa (Faz 1 — kuruldu, içerik bekliyor)

İçerik dosyası: `src/content/home.ts`

| # | İçerik | Nerede | Not |
|---|---|---|---|
| ☐ | Haberler bölümü: manşet, 4 son haber, 3 özel dosya | `news` | Tümü `[…]` yer tutucu + `image: null` (gri kutu). Faz 2'de WPGraphQL. Faz 1 yayınında haber yoksa **`<News>` satırını `src/app/page.tsx`'ten kaldırın**. |
| ☐ | Haber görselleri | `news.*.image` | `image: null` → gri kutu çizilir. `{ src, alt, width, height }` verin. |
| ☐ | "Biz kimiz" görseli | `about.image` | Şu an hero fotoğrafı tekrar kullanılıyor. Saha arşivinden gerçek kare önerilir. |
| ☐ | Hero kayıt göstergesi, zaman kodu, koordinat | `hero.telemetry` | Süs. Kalacaksa dokunmayın; kaldırmak için `null` yapın. "Biz kimiz" görselindeki zaman kodu: `about.timecode`. |
| ☑ | Hero fotoğrafı mobilde | `DesktopBackdrop` | Karar: mobilde gizli — 960px altında hiç indirilmiyor. |
| ☑ | Haberler bölümü ve Son dakika şeridi | | Karar: tasarımdaki gibi kalıyor (içerik yer tutucu). |
| ☐ | Rakamlar (33 yıl, 11 bölge, 04 başlık) | `hero.panel.stats`, `why.record` | Doğrulanmalı. |
| ☐ | `/haber` bağlantıları | `news`, `newsBanner` | Faz 2'ye kadar 404. |

## İletişim

| # | İçerik | Nerede | Not |
|---|---|---|---|
| ☐ | SMTP bilgileri: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Vercel ortam değişkenleri, bkz. `.env.example` | Kurumun kendi posta hesabı (info@elis360news.com). Sağlayıcının "e-posta istemcisi / SMTP ayarları" sayfasından alınır. Yoksa yayında form hata verir ve kullanıcıya doğrudan e-posta adresi gösterilir. |
| ☐ | KVKK aydınlatma metni bağlantısı | form altı | Kişisel veri toplanıyor — hukuki metin gerekir. |

## SEO ve marka varlıkları

| # | İçerik | Nerede | Not |
|---|---|---|---|
| ☑ | Alan adı | `NEXT_PUBLIC_SITE_URL` | `https://elis360news.com` (onaylandı). |
| ☑ | Logo ve amblem | `src/components/ui/LogoMark.tsx`, `docs/brand/` | Eskizden çizildi. Onayınızı bekliyor — değişiklik gerekirse tek dosya. |
| ☑ | Site ikonu | `src/app/icon.svg`, `favicon.ico`, `apple-icon.png` | Amblemden üretildi. |
| ☑ | Paylaşım görseli (1200×630) | `public/og.jpg` | Logo + "Media • Fixer • Production". |
| ☑ | Schema logosu | `public/logo.png` (512×512) | |
| ☐ | Sosyal hesaplar → `sameAs` | `site.social` | Gerçek adresler girilince schema'ya kendiliğinden eklenir. |
| ☐ | Kurulmamış rotalar | `src/lib/routes.ts` → `UNBUILT` | Sayfa kurulunca listeden silin (önyükleme açılır). |
