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

## Ana sayfa (sıradaki adım)

| # | İçerik | Not |
|---|---|---|
| ☐ | Gri görsel kutuları (`#C9CDD3`) | Saha arşivinden gerçek fotoğraflar |
| ☐ | Hero'daki koordinat ve zaman kodu | Süs — kalacak mı karar verilmeli |
| ☐ | Köşeli parantezli tüm metinler | Bölümler kuruldukça buraya eklenecek |

## Fikserlik ve İletişim

Sayfalar kuruldukça eklenecek. Not: `fikserlik.html` ve `haber.html` referans dosyaları depoda yok — yalnızca `index.html` yüklendi.
