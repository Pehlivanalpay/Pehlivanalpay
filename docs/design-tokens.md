# ELIS360 NEWS — Tasarım Sistemi ve Kodlama Dökümü

Tasarım yönü: **"Ölçüm cihazı"** — havacılık ve yayın ekipmanı markalarının hassasiyeti, haber kanalı bilgi mimarisi, siyah cam yüzeyler.

Hedef yığın: Next.js (App Router) + TypeScript + Tailwind, headless WordPress (WPGraphQL).

Görsel referans: `reference/index.html`, `reference/fikserlik.html`, `reference/haber.html`. Bunlar tasarımın birebir çıktısıdır — bir değerden emin değilseniz oradan okuyun, tahmin etmeyin. **Üretim kodu değildir**: saatler statik, görseller yer tutucudur.

---

## 1. Renk

### Zemin

| Token | Değer | Kullanım |
|---|---|---|
| `paper` | `#F2F3F5` | Ana sayfa zemini |
| `paper-alt` | `#E6E8EB` | Reklam şeritleri |
| `ink` | `#0B0D10` | Koyu bölümler, kategori etiketleri, footer |
| `glass` | `rgba(0,0,0,.90)` | Header (servis barı + logo satırı) |
| `glass-nav` | `rgba(0,0,0,.88)` | Yapışkan navigasyon |
| `surface-dark` | `rgba(26,32,40,.97)` | Haber geçiş şeridi, bülten kutusu |
| `panel-dark` | `rgba(17,21,27,.93)` | Hero'daki saha kaydı paneli |
| `img-placeholder` | `#C9CDD3` | Görsel yer tutucuları — **yayında kalmamalı** |

Cam yüzeylerin tamamı: `backdrop-filter: blur(26px) saturate(180%)` + `-webkit-` ön eki.

### Vurgu

| Token | Değer | Kural |
|---|---|---|
| `accent` | `#C41E2A` | Marka kırmızısı. **Yalnızca açık zeminde.** |
| `accent-light` | `#FF5C6C` | Koyu zeminde kırmızı. Marka kırmızısı siyah üzerinde 3.3:1 kalıyor, eşiği geçmiyor. |
| `accent-2` | `#00B8D9` | Sadece durum göstergesi. Başka hiçbir yerde kullanılmaz. |

### Metin

| Token | Değer | Kontrast (zemininde) |
|---|---|---|
| `text` | `#0B0D10` | 18.6:1 |
| `text-body` | `#1A212A` | 14.1:1 |
| `text-mono` | `#3C4553` | 8.7:1 |
| `text-muted` | `#5A6372` | 5.5:1 |
| `on-dark` | `#E8EAED` | 15.2:1 |
| `on-dark-muted` | `#B6BCC6` | 10.1:1 |
| `on-glass-muted` | `#AEB5BF` | 5.2:1 — cam yüzeyde bundan koyusu kullanılamaz |

### Çizgiler

```
rule-soft    rgba(11,13,16,.09)    bölüm içi ayraçlar
rule         rgba(11,13,16,.16)    standart kılcal çizgi
rule-strong  rgba(11,13,16,.40)    buton kenarı, ilk hizmet satırı
rule-ink     #0B0D10 2px           bölüm başlığı altı
rule-dark    rgba(255,255,255,.14) koyu yüzeylerde
```

---

## 2. Tipografi

Üç aile, Google Fonts:

```
Archivo        500 600 700   başlıklar
IBM Plex Mono  400 500 600   etiket, veri, navigasyon, saat
Inter          300 400 500   gövde metni
```

### Ölçek

| Rol | Boyut | Satır | Harf aralığı | Aile/ağırlık |
|---|---|---|---|---|
| `h1` | `clamp(40px, 5.4vw, 74px)` | 1.03 | -0.022em | Archivo 700 |
| `h1-haber` | `clamp(30px, 3.6vw, 50px)` | 1.04 | -0.028em | Archivo 700 |
| `h2` | `clamp(30px, 3.4vw, 46px)` | 1.10 | -0.020em | Archivo 700 |
| `h2-sayfa` | `clamp(28px, 3vw, 40px)` | 1.08 | -0.020em | Archivo 700 |
| `h2-blok` | `clamp(24px, 2.4vw, 32px)` | 1.15 | -0.018em | Archivo 700 |
| `h3-hizmet` | `clamp(28px, 2.7vw, 38px)` | 1.06 | -0.025em | Archivo 700 |
| `h3-kart` | `22px` | 1.18 | -0.015em | Archivo 600 |
| `h3-liste` | `18px` | 1.22 | -0.012em | Archivo 600 |
| `lead` | `18px` | 1.68 | — | Inter 300 |
| `body` | `16px` | 1.70–1.75 | — | Inter 300/400 |
| `small` | `15px` | 1.60 | — | Inter 300 |
| `label` | `11px` | 1.4 | 0.26em | Mono 600, uppercase |
| `nav` | `14px` | 1 | 0.10em | Mono 600, uppercase |
| `meta` | `10–11px` | 1.4 | 0.20em | Mono 600, uppercase |
| `logo` | `30px` | 1 | 0.11em | Archivo 700 |

`text-wrap: balance` başlıklarda, `text-wrap: pretty` paragraflarda.

---

## 3. Izgara ve boşluk

```
container        max-width: 1440px
yatay padding    clamp(20px, 5.56vw, 80px)      → 1440'ta tam 80px
içerik genişliği 1280px
kolon            12
oluk (gutter)    24px
kolon genişliği  84.67px (1440'ta)
```

Kolon genişlikleri (1440'ta): 3 = 302px, 4 = 386.7px, 5 = 519.3px, 7 = 736.7px, 8 = 821.3px.

### Bölüm boşlukları

```
bölüm dikey padding      clamp(72px, 7.5vw, 116px)
haber bloğu padding      clamp(56px, 5.5vw, 84px)
hizmet satırı padding    46px 0
kart grid gap            32px
satır arası (row-gap)    48px
```

### Kırılma

Tek kırılma noktası: **960px**. Altında 12 kolonluk ızgara tek kolona iner ve menü hamburger'e kapanır.

```css
@media (max-width: 960px) {
  .row { grid-template-columns: repeat(1, minmax(0,1fr)) !important; row-gap: 40px !important; }
  .row > * { grid-column: auto !important; }
  .hide-s { display: none !important; }
  nav[aria-label="Ana menü"] a { display: none !important; }   /* hamburger devralır */
  .hero-veil { background: rgba(242,243,245,.94) !important; } /* dar ekranda metin okunurluğu */
}
```

Kart ızgaraları zaten akışkan: `repeat(auto-fit, minmax(min(300px,100%), 1fr))`.

> **Asla sabit px genişlik vermeyin.** Prototipte kazara eklenen tek bir `width: 1437px`, 390px ekranda 1047px yatay taşmaya yol açtı. Her kap ya akışkan ya `max-width` olmalı.

---

## 4. Bileşenler

### Kesik köşe (notch)

Tasarımın imzası. **Sadece üç yerde**: birincil buton (14px), hero paneli (26px), ana görsel çerçevesi (30px).

```css
clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
```

### Kategori etiketi

Haber sitesi karakterinin taşıyıcısı.

```
arka plan   #0B0D10   (koyu zeminde accent-light, metin #0B0D10)
metin       #fff
font        Mono 600 / 10–11px / 0.20em / uppercase
padding     5px 10px (küçük) · 8px 15px (hizmet başlığı)
köşe        yok — keskin
```

Hizmet başlıklarında iki parçalı: kırmızı numara + beyaz kod. `01 FIXING`, `02 CREW`, `03 FIELD OPS`, `04 DOCUMENTARY`.

### Fosforlu vurgu (numaralı listeler)

Metnin alt yarısını kaplayan şeffaf kırmızı. Tam blok değil — harflerin üstü açıkta kalır.

```css
/* metin — inline span olmalı, blok değil; çok satırda her satıra uygulanır */
.mark {
  display: inline;
  background-image: linear-gradient(
    to top,
    color-mix(in srgb, var(--accent) 17%, transparent) 0,
    color-mix(in srgb, var(--accent) 17%, transparent) .64em,
    transparent .64em);
  -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
  padding: 0 .16em;
}
/* numara kutucuğu */
.mark-num { padding: 4px 8px; background: color-mix(in srgb, var(--accent) 11%, transparent); }
```

Koyu zeminde: `accent-light`, wash %15, kutucuk %13.

### Fotoğraf motifi (açık zeminli bölümler)

Hero fotoğrafı doku olarak. Fotoğraf gibi değil, filigran gibi okunmalı.

```html
<div aria-hidden="true" style="position:absolute;inset:0;overflow:hidden;pointer-events:none">
  <img src="…" alt="" style="position:absolute;right:-6%;top:50%;
       transform:translateY(-50%) scaleX(-1);width:64%;min-width:760px;
       opacity:.055;filter:grayscale(1) contrast(1.45)">
  <!-- perde: metnin olduğu kenardan başlar -->
  <div style="position:absolute;inset:0;background:linear-gradient(90deg,#F2F3F5 0%,rgba(242,243,245,.74) 44%,rgba(242,243,245,.28) 100%)"></div>
  <!-- tarama çizgileri -->
  <div style="position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(0,0,0,.025) 0,rgba(0,0,0,.025) 1px,transparent 1px,transparent 3px)"></div>
  <!-- mühendislik ızgarası -->
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(0,0,0,.028) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.028) 1px,transparent 1px);background-size:80px 80px"></div>
</div>
```

Kullanıldığı yerler: ana sayfa Hizmet kapsamı (sağ), ana sayfa İletişim (sol), Fikserlik Prodüksiyon (sağ). Bölüm `position:relative;overflow:hidden`, içerik `position:relative;z-index:1` olmalı.

### Butonlar

| Tip | Zemin | Metin | Kenar | Yükseklik |
|---|---|---|---|---|
| Birincil | `accent` | `#fff` | yok, notch'lu | 52px |
| İkincil (açık) | şeffaf | `ink` | `rule-strong` 1px | 52px |
| İkincil (koyu) | şeffaf | `#fff` | `rgba(255,255,255,.45)` 1px | 52px |

Hepsi Mono 600 / 13px / 0.16em / uppercase. Minimum dokunma alanı 44px; uygulananlar 46–58px.

### Form alanları

```
yükseklik   50px
kenar       1px rgba(11,13,16,.30)   (koyu: rgba(255,255,255,.26))
köşe        0
zemin       #fff                      (koyu: rgba(255,255,255,.06))
etiket      Mono 500 / 11px / 0.18em / uppercase / text-muted
```

---

## 5. Header

Beş katman, CNBC/Bloomberg bilgi mimarisi:

```
1  Reklam şeridi      970×90 leaderboard, ~107px              kayar
2  Servis barı        42px — konum, hava, 4 saat, sosyal       kayar
3  Logo satırı        88px — logo, arama, Teklif alın          kayar
4  Navigasyon         58px — bölümler, TR·EN                   YAPIŞKAN
5  Son dakika         46px — kırmızı blok + manşet             kayar
```

### Kritik yapı notu

Yapışkan olan sadece 4. katman. Bunun çalışması için **navigasyon satırı `<header>` elemanının çocuğu olmamalı**, sayfa kökünün doğrudan çocuğu olmalı. `position: sticky` yalnızca kendi ebeveyninin sınırları içinde çalışır; nav header'ın içindeyse header ekrandan çıktığı an yapışkanlık biter.

```tsx
<AdSlot />
<header>{/* servis barı + logo satırı */}</header>
<div className="sticky top-0 z-40 …">{/* navigasyon */}</div>
<BreakingBar />
<main>…</main>
```

---

## 6. Hareket

İki animasyon, ikisi de `prefers-reduced-motion: reduce` altında kapanır.

```css
rot    90s linear infinite    hero nişangâhı
blip   2.4s ease-in-out       durum noktaları (opacity .3 ↔ 1)
```

Glitch, tarama süpürmesi ve kayan şerit **bilinçli olarak kaldırıldı** — ciddiyeti düşürüyorlardı. Geri eklemeyin.

Hero'daki tarama çizgisi animasyon değil, statik desen:
```css
repeating-linear-gradient(0deg, rgba(11,13,16,.05) 0, rgba(11,13,16,.05) 1px, transparent 1px, transparent 3px)
```

---

## 7. Görsel işleme

```css
/* hero — açık zeminde */
opacity: .62; filter: grayscale(1) contrast(1.22); mix-blend-mode: multiply;
/* üstüne perde */
background: linear-gradient(100deg, rgba(242,243,245,.95) 0%, rgba(242,243,245,.82) 40%, rgba(242,243,245,.34) 100%);

/* koyu bölümlerde */
opacity: .17–.28; filter: grayscale(1) contrast(1.2);
```

**Kamera monitörü çerçevesi** (Biz kimiz görseli): dört köşe köşebendi `2px rgba(255,255,255,.72)`, ortada nişan artısı, üstte `● REC` + zaman kodu, tarama çizgileri, radyal vinyet. Bu muamele yalnızca o görselde kullanılır.

---

## 8. Erişilebilirlik — pazarlık edilemez

- Gerçek eleman kullanın: `<button>`, `<a href>`, `<input>` + `<label>`. `div` üzerine `onClick` yok; Tab atlıyor.
- İkon-butonlara `aria-label`. Dekoratif SVG'lere `aria-hidden="true"`.
- Metin kontrastı en az 4.5:1 (24px+ için 3:1). Yukarıdaki renk tablosundaki değerler ölçülmüştür, aşağı çekmeyin.
- Dokunma alanı en az 44px.
- Koyu zeminde `accent` kullanmayın, `accent-light` kullanın.

---

## 9. Bağlanacak veri kaynakları

| Öğe | Prototipteki durum | Çözüm |
|---|---|---|
| Saatler (İST/LDN/NYC/DXB) | **Çalışıyor** | `Intl.DateTimeFormat` + `timeZone`, istemci tarafı, 15sn aralık |
| Şehir | Örnek değer | Vercel `request.geo` (ek API gerekmez) |
| Hava durumu | Örnek değer | Open-Meteo (anahtarsız) veya OpenWeather |
| Son dakika manşetleri | Yer tutucu | WP — `sticky` veya `breaking` etiketli son yazılar |
| Haber listeleri | Yer tutucu | WPGraphQL |
| Reklam alanları | Yer tutucu | Önce kendi sponsor bileşeniniz, sonra Google Ad Manager |
| Arama | Statik | WPGraphQL arama sorgusu |
| Sosyal hesaplar | `href="#"` | Gerçek adresler |

---

## 10. Yayına çıkmadan önce temizlenecekler

1. **Sosyal hesap adresleri** — LinkedIn, Instagram, YouTube şu an `#`
2. **Son dakika şeridi** — yayın tarafı hazır değilse ilk sürümde kaldırın
3. **Köşeli parantezli yer tutucular** — `[Manşet başlığı buraya gelecek]` gibi her şey
4. **Gri görsel kutuları** (`#C9CDD3`) — saha arşivinden gerçek fotoğraflar
5. **Hero'daki koordinat ve zaman kodu** — süs; kalacak mı karar verin
6. **"İzmir 16° Parçalı bulutlu"** — gerçek veriye bağlanacak
7. **İngilizce sürüm** — yabancı müşteriler için öncelikli

---

## 11. SEO ve teknik

- Haber yazıları `NewsArticle`, kurumsal sayfalar `Organization` + `Service` schema
- Google News sitemap (haber portalı açıldığında)
- `hreflang` TR/EN
- Görseller `next/image`; `priority` sadece hero'da
- Yazı tipleri `next/font/google`, üç aile, `display: swap`
- ISR: haber listeleri 60sn, yazılar `revalidateTag` + WP webhook
