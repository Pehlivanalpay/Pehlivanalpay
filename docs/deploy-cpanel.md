# cPanel'de yayına alma (Setup Node.js App)

Site, cPanel'in **Setup Node.js App** (Passenger) özelliğiyle çalışır. Sunucuda derleme yapılmaz
(paylaşımlı sunucularda bellek sınırına takılır); hazır paket yüklenir.

## Paketi alma

**GitHub'dan (önerilen):** depo → **Actions** → en üstteki yeşil ✓ "Derleme" → sayfanın altında
**Artifacts → elis360-site** → indir. İçinden `elis360-site.zip` çıkar.

**Kendi bilgisayarınızda (Node 20.9+ gerekir):** `npm ci && npm run build:cpanel`

## İlk kurulum — doğrudan www.elis360news.com

Kanonik adres **https://www.elis360news.com**. `elis360news.com`'a gelen ziyaretçi otomatik olarak
www'ye yönlenir (src/proxy.ts). Kurulum sırasında site birkaç dakika kapalı kalır.

### 1. "Yakında" sayfasını yedekle ve kaldır

**File Manager → public_html**:
1. Tümünü seç → **Compress** → `yakinda-yedek.zip` (ana dizine, public_html'in **dışına** kaydedin)
2. public_html içindeki dosyaları **silin**, şunlar hariç: `.well-known` (SSL doğrulaması), `cgi-bin`.
   Neden: `index.html` gibi dosyalar kalırsa Apache onları uygulamanın önünde sunar ve hâlâ
   "yakında" sayfası görünür.

### 2. Node.js uygulamasını oluştur

**cPanel → Setup Node.js App → Create Application**

| Alan | Değer |
|---|---|
| Node.js version | **24.x** (sunucuda önerilen; paket GitHub'da Node 24 ile derlenir) |
| Application mode | **Production** |
| Application root | `elis360-app` (public_html'in **dışında**) |
| Application URL | `elis360news.com` (listeden; www aynı uygulamaya düşer) |
| Application startup file | `server.js` |

**Create**.

### 3. Paketi yükle

**File Manager → `elis360-app`** → içindekileri silin (cPanel örnek dosya koyar) → **Upload** →
`elis360-site.zip` → zip'e sağ tık → **Extract** → `elis360-app` içine.
Klasörde doğrudan `server.js`, `.next`, `node_modules`, `public` görünmeli.
*"Run NPM Install" düğmesine BASMAYIN* — gereken paketler zip'in içinde.

### 4. Ortam değişkenleri

**Setup Node.js App → uygulamayı düzenle → Environment variables → Add variable**:

| Ad | Değer |
|---|---|
| `SMTP_HOST` | cPanel → E-posta Hesapları → Connect Devices'taki "Outgoing Server" |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `info@elis360news.com` |
| `SMTP_PASS` | e-posta hesabının şifresi |
| `WP_URL` | `https://cms.elis360news.com/wp` *(WordPress kurulumu bitince)* |
| `WP_WEBHOOK_SECRET` | wp-config'teki `ELIS360_WEBHOOK_SECRET` ile aynı |
| `WP_PREVIEW_SECRET` | wp-config'teki `ELIS360_PREVIEW_SECRET` ile aynı |
| `WP_PREVIEW_USER` / `WP_PREVIEW_APP_PASSWORD` | önizleme kullanıcısı + uygulama parolası |

**Save** → **Restart**.

### 5. HTTPS

- **SSL/TLS Status** → `elis360news.com` ve `www.elis360news.com` → **Run AutoSSL** (yeşil kilit)
- **Domains** → `elis360news.com` → **Force HTTPS Redirect: açık**

### 6. Kontrol listesi

- [ ] `https://www.elis360news.com` açılıyor (yakında sayfası değil)
- [ ] `elis360news.com` ve `http://…` adresleri `https://www.elis360news.com`'a yönleniyor
- [ ] /fikserlik, /iletisim açılıyor; menü ve mobil görünüm düzgün
- [ ] Görseller görünüyor (hero, "Biz kimiz" fotoğrafı)
- [ ] İletişim formundan deneme mesajı → `info@` kutusuna düşüyor
- [ ] Saatler işliyor, hava durumu görünüyor

**Geri dönüş** (bir şey ters giderse): Setup Node.js App → uygulamayı **Stop** → `yakinda-yedek.zip`'i
public_html'e açın.

## Güncelleme

Yeni paket → `elis360-app` içine yükle → **Extract** (üzerine yaz) → **Restart**.
Ortam değişkenleri ve `.next/cache` korunur.

## Sorun giderme

| Belirti | Neden / çözüm |
|---|---|
| "Incomplete response" / 503 | Node sürümü 20.9'dan eski → 24.x seçin. Ya da `server.js` kök klasörde değil (zip bir alt klasöre açılmış). |
| Sayfalar açılıyor, görseller kırık | Görsel işleme kütüphanesi (sharp) sunucunun sistemiyle uyumsuz (eski CloudLinux 7). Haber verin — görsel optimizasyonu kapatılmış paket üretirim. |
| Form "gönderilemedi" diyor | SMTP değişkenleri eksik/yanlış. 465 olmazsa `SMTP_PORT=587` deneyin. |
| Haberler görünmüyor | `WP_URL` boş ya da WordPress'e ulaşılamıyor — bkz. wordpress/README.md |
| Değişiklik görünmüyor | Restart'a basıldı mı? |

## Ziyaretçinin şehri (servis barı)

Konum, isteğe eklenen başlıklardan okunur. Alan adı ve hosting Güzel Hosting'de, Cloudflare yok →
bu başlıklar gelmez; herkes için **İzmir** (yedek konum) ve İzmir'in hava durumu gösterilir. Ziyaretçinin kendi şehri için alan adı
**Cloudflare** (ücretsiz plan) arkasına alınıp *Rules → Managed Transforms → "Add visitor location
headers"* açılmalıdır; kod hazır.
