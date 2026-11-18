# cPanel'de yayına alma (Setup Node.js App)

Site, cPanel'in **Setup Node.js App** (Passenger) özelliğiyle çalışır. Sunucuda derleme yapılmaz
(paylaşımlı sunucularda bellek sınırına takılır); hazır paket yüklenir.

## Paketi alma

**GitHub'dan (önerilen):** depo → **Actions** → en üstteki yeşil ✓ "Derleme" → sayfanın altında
**Artifacts → elis360-site** → indir. İçinden `elis360-site.zip` çıkar.

**Kendi bilgisayarınızda (Node 20.9+ gerekir):** `npm ci && npm run build:cpanel`

## İlk kurulum

Önce bir **deneme alt alan adında** kurun (ör. `yeni.elis360news.com`), her şey çalışınca ana alan adına alın.

1. **cPanel → Domains → Create a New Domain**: `yeni.elis360news.com`
2. **cPanel → Setup Node.js App → Create Application**

   | Alan | Değer |
   |---|---|
   | Node.js version | **22.x** (yoksa en az 20.9 — Next 16'nın alt sınırı) |
   | Application mode | **Production** |
   | Application root | `elis360-app` (public_html'in **dışında**) |
   | Application URL | `yeni.elis360news.com` |
   | Application startup file | `server.js` |

   **Create**.
3. **File Manager** → `elis360-app` klasörü → içindekileri silin (cPanel örnek dosya koyar) →
   **Upload** → `elis360-site.zip` → zip'e sağ tık → **Extract** → `elis360-app` içine.
   Klasörde doğrudan `server.js`, `.next`, `node_modules`, `public` görünmeli.
   (*"Run NPM Install" düğmesine BASMAYIN* — gereken paketler zip'in içinde.)
4. **Setup Node.js App → uygulamayı düzenle → Environment variables → Add variable**:

   | Ad | Değer |
   |---|---|
   | `SMTP_HOST` | ör. `mail.elis360news.com` (aynı sunucudaysa `localhost` da olabilir) |
   | `SMTP_PORT` | `465` |
   | `SMTP_USER` | `info@elis360news.com` |
   | `SMTP_PASS` | e-posta hesabının şifresi |
   | `WP_URL` | `https://cms.elis360news.com/wp` *(WordPress kurulumu bitince)* |
   | `WP_WEBHOOK_SECRET` | wp-config'teki `ELIS360_WEBHOOK_SECRET` ile aynı |
   | `WP_PREVIEW_SECRET` | wp-config'teki `ELIS360_PREVIEW_SECRET` ile aynı |
   | `WP_PREVIEW_USER` / `WP_PREVIEW_APP_PASSWORD` | önizleme kullanıcısı + uygulama parolası |

   **Save** → **Restart**.
5. `https://yeni.elis360news.com` açılmalı. SSL için: **SSL/TLS Status → Run AutoSSL**.

## Kontrol listesi

- [ ] Ana sayfa, /fikserlik, /iletisim açılıyor; menü ve mobil görünüm düzgün
- [ ] Görseller görünüyor (hero, "Biz kimiz" fotoğrafı)
- [ ] İletişim formundan deneme mesajı → `info@` kutusuna düşüyor
- [ ] Saatler işliyor, hava durumu görünüyor

## Ana alan adına geçiş

Deneme sorunsuzsa: **Setup Node.js App → düzenle → Application URL**: `elis360news.com` → Save → Restart.
O alan adında başka bir site (public_html) varsa artık yerini bu uygulama alır — önce yedekleyin.
WordPress'teki `ELIS360_FRONTEND_URL` zaten `https://elis360news.com`.

## Güncelleme

Yeni paket → `elis360-app` içine yükle → **Extract** (üzerine yaz) → **Restart**.
Ortam değişkenleri ve `.next/cache` korunur.

## Sorun giderme

| Belirti | Neden / çözüm |
|---|---|
| "Incomplete response" / 503 | Node sürümü 20.9'dan eski → 22.x seçin. Ya da `server.js` kök klasörde değil (zip bir alt klasöre açılmış). |
| Sayfalar açılıyor, görseller kırık | Görsel işleme kütüphanesi (sharp) sunucunun sistemiyle uyumsuz (eski CloudLinux 7). Haber verin — görsel optimizasyonu kapatılmış paket üretirim. |
| Form "gönderilemedi" diyor | SMTP değişkenleri eksik/yanlış. 465 olmazsa `SMTP_PORT=587` deneyin. |
| Haberler görünmüyor | `WP_URL` boş ya da WordPress'e ulaşılamıyor — bkz. wordpress/README.md |
| Değişiklik görünmüyor | Restart'a basıldı mı? |

## Ziyaretçinin şehri (servis barı)

Konum, isteğe eklenen başlıklardan okunur. Doğrudan cPanel'de bu başlıklar yoktur → herkes için
**İzmir** (yedek konum) ve İzmir'in hava durumu gösterilir. Ziyaretçinin kendi şehri için alan adı
**Cloudflare** (ücretsiz plan) arkasına alınıp *Rules → Managed Transforms → "Add visitor location
headers"* açılmalıdır; kod hazır.
