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
| ☐ | Rakamlar (33 yıl, 11 bölge, 04 başlık) | `hero.panel.stats`, `why.record` | Doğrulanmalı. |
| ☐ | `/haber` bağlantıları | `news`, `newsBanner` | Faz 2'ye kadar 404. |
| ☐ | `/fikserlik` bağlantıları | `services.items[0].link`, footer, nav | Sayfa henüz yok — **`fikserlik.html` referansı bekleniyor**. |

## İletişim

| # | İçerik | Nerede | Not |
|---|---|---|---|
| ☐ | `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO` | Vercel ortam değişkenleri, bkz. `.env.example` | Yayında anahtar yoksa form hata verir ve kullanıcıya doğrudan e-posta adresi gösterilir. `CONTACT_FROM` alan adı Resend'de doğrulanmalı. |
| ☐ | KVKK aydınlatma metni bağlantısı | form altı | Kişisel veri toplanıyor — hukuki metin gerekir. |

## SEO ve marka varlıkları

| # | İçerik | Nerede | Not |
|---|---|---|---|
| ☐ | Alan adı doğrulaması | `NEXT_PUBLIC_SITE_URL` | Varsayılan `https://elis360news.com` — e-posta alan adından tahmin edildi. www'li mi, değil mi? |
| ☐ | Site ikonu | `src/app/icon.svg`, `src/app/favicon.ico` | **Yer tutucu**: siyah kare üzerinde kırmızı "360". Marka ikonu gelince değiştirin. |
| ☐ | Paylaşım görseli (1200×630) | `src/lib/seo.tsx` → `ogDefaults.images` | Şu an hero fotoğrafı kullanılıyor (1376×768). Logolu, kırpılmaya uygun ayrı görsel önerilir. |
| ☐ | Logo görseli | `organizationLd()` | Schema'da `logo` alanı boş — marka logosu (PNG/SVG) gelince eklenecek. |
| ☐ | Sosyal hesaplar → `sameAs` | `site.social` | Gerçek adresler girilince schema'ya kendiliğinden eklenir. |
| ☐ | Kurulmamış rotalar | `src/lib/routes.ts` → `UNBUILT` | Sayfa kurulunca listeden silin (önyükleme açılır). |
