# cPanel'de yayına alma (Setup Node.js App)

Site, cPanel'in **Setup Node.js App** (Passenger) özelliğiyle çalışır. Sunucuda derleme yapılmaz
(paylaşımlı sunucularda bellek sınırına takılır); hazır paket yüklenir.

## Paketi alma

**GitHub'dan (önerilen):** depo → **Actions** → en üstteki yeşil ✓ "Derleme" → sayfanın altında
**Artifacts → elis360-site** → indir. İçinden `elis360-site.zip` çıkar.

**Kendi bilgisayarınızda (Node 20.9+ gerekir):** `npm ci && npm run build:cpanel`

## İlk kurulum — doğrudan www.elis360news.com

Kanonik adres **https://www.elis360news.com**; `elis360news.com` otomatik olarak www'ye yönlenir (src/proxy.ts).

Sunucu CloudLinux: paketler (`node_modules`) uygulama klasöründe tutulamaz, CloudLinux kendi
sanal ortamına kurar. Bu yüzden zip'te `node_modules` yoktur; **Run NPM Install** onları kurar.
`package-lock.json` sayesinde sunucuya derlemedekiyle birebir aynı sürümler kurulur.

### 1. "Yakında" sayfasını kaldır

`public_html` / `elis360news.com` klasöründe yalnızca şunlar kalsın: `.htaccess`, `.well-known`,
`cgi-bin`, `.user.ini`, `php.ini`. "Yakında" dosyalarını önce yedekleyin (Compress → klasörün dışına).

### 2. Node.js uygulaması

**cPanel → Setup Node.js App**

| Alan | Değer |
|---|---|
| Node.js version | **24.x** |
| Application mode | **Production** |
| Application root | `elis360news.com` *(alan adının klasörü)* |
| Application URL | `elis360news.com` |
| Application startup file | `server.js` |
| Passenger log file | `/home/defcodes/logs/elis360.log` |

### 3. Paketi yükle

File Manager → `elis360news.com` → **Upload** `elis360-site.zip` → sağ tık → **Extract** (bu klasöre)
→ zip'i silin. Klasörde şunlar görünmeli (gizli dosyaları göster açık olsun):
`.next`, `public`, `package.json`, `package-lock.json`, `server.js`.

### 4. Uygulama dosyalarını dışarıya kapat — ZORUNLU

Uygulama klasörü aynı zamanda sitenin herkese açık klasörü olduğu için, Apache bu klasördeki
dosyaları doğrudan sunabilir. `.next/prerender-manifest.json` taslak önizlemenin gizli imza
anahtarlarını içerir; dışarıdan okunursa yayımlanmamış taslaklar görülebilir.

File Manager → `elis360news.com/.htaccess` → **Düzenle** → dosyanın **en üstüne** ekleyin
(cPanel'in yazdığı `PASSENGER` bloğuna dokunmayın):

```apache
# BEGIN ELIS360 — uygulama dosyaları dışarıdan okunamaz
RedirectMatch 404 ^/(\.next|node_modules|server\.js|package(-lock)?\.json|\.env[^/]*)(/.*)?$
# END ELIS360
```

Kontrol: `https://www.elis360news.com/.next/prerender-manifest.json` ve
`https://www.elis360news.com/package.json` → **404** dönmeli. (Site normal açılmaya devam eder;
sitenin kendi dosyaları `/_next/…` altından gelir, bu kurala takılmaz.)

### 5. Paketleri kur

Setup Node.js App → uygulama → **Run NPM Install** → bitmesini bekleyin (birkaç dakika).
**Run JS script → build** ÇALIŞTIRMAYIN — paket zaten derlenmiş gelir.

### 6. Ortam değişkenleri

**Environment variables → Add variable**:

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

**SAVE** → **RESTART** → **OPEN**.

### 7. HTTPS

- **SSL/TLS Status** → `elis360news.com` ve `www.elis360news.com` → **Run AutoSSL**
- **Domains** → `elis360news.com` → **Force HTTPS Redirect: açık**

### 8. Kontrol listesi

- [ ] `https://www.elis360news.com` yeni siteyi açıyor
- [ ] `elis360news.com` ve `http://…` → `https://www.elis360news.com`
- [ ] `/.next/prerender-manifest.json` ve `/package.json` → 404
- [ ] /fikserlik, /iletisim, /haber açılıyor; mobil görünüm düzgün
- [ ] Görseller görünüyor
- [ ] İletişim formundan deneme mesajı → `info@` kutusuna düşüyor

**Geri dönüş:** Setup Node.js App → **Stop App** → yedeklediğiniz "yakında" dosyalarını geri açın.

## Güncelleme

Yeni paket → `elis360news.com` içine yükle → **Extract** (üzerine yaz) → zip'i sil →
`package.json` değiştiyse **Run NPM Install** → **Restart**. Ortam değişkenleri ve `.htaccess` korunur.

## Sorun giderme

| Belirti | Neden / çözüm |
|---|---|
| "Incomplete response" / 503 | Run NPM Install yapılmadı ya da yarım kaldı → tekrar çalıştırın. Ya da `server.js` kök klasörde değil (zip bir alt klasöre açılmış). |
| "Cloudlinux NodeJS Selector demands to store node modules…" | Uygulama klasöründe gerçek bir `node_modules` klasörü var (eski paketten kalmış) → silin, Run NPM Install. |
| Sayfalar açılıyor, görseller kırık | Görsel işleme kütüphanesi (sharp) sunucunun sistemiyle uyumsuz (eski CloudLinux 7). Haber verin — görsel optimizasyonu kapatılmış paket üretirim. |
| Form "gönderilemedi" diyor | SMTP değişkenleri eksik/yanlış. 465 olmazsa `SMTP_PORT=587` deneyin. |
| Haberler görünmüyor | `WP_URL` boş ya da WordPress'e ulaşılamıyor — bkz. wordpress/README.md |
| Değişiklik görünmüyor | Restart'a basıldı mı? |

## Ziyaretçinin şehri (servis barı)

Konum, isteğe eklenen başlıklardan okunur. Alan adı ve hosting Güzel Hosting'de, Cloudflare yok →
bu başlıklar gelmez; herkes için **İzmir** (yedek konum) ve İzmir'in hava durumu gösterilir. Ziyaretçinin kendi şehri için alan adı
**Cloudflare** (ücretsiz plan) arkasına alınıp *Rules → Managed Transforms → "Add visitor location
headers"* açılmalıdır; kod hazır.
