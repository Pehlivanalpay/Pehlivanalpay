# WordPress (cms.elis360news.com) kurulumu

WordPress yalnızca **yönetim paneli ve veri kaynağıdır**. Ziyaretçiler elis360news.com'u (Next.js) görür;
`cms.elis360news.com`'a gelen biri ana siteye yönlendirilir.

Adresler (WordPress `/wp` klasörüne kurulu):

| | |
|---|---|
| Yönetim paneli | `https://cms.elis360news.com/wp/wp-admin` |
| GraphQL | `https://cms.elis360news.com/wp/graphql` |
| Vercel `WP_URL` | `https://cms.elis360news.com/wp` |

---

## 1. SSL (zorunlu — diğer her şeyden önce)

cPanel → **SSL/TLS Status** → `cms.elis360news.com` seçili → **Run AutoSSL**.
Birkaç dakika sonra yeşil kilit görünür. Sonra:

- WordPress → **Ayarlar → Genel**: *WordPress Adresi* ve *Site Adresi* `https://` ile başlasın.
- Neden zorunlu: Next.js veriyi şifreli bağlantıyla çeker; önizleme için gereken
  "Uygulama Parolası" özelliği WordPress'te yalnızca HTTPS'te açılır.

## 2. Panel ayarları (ekran görüntüsündeki Softaculous ekranı)

| Ayar | Değer | Neden |
|---|---|---|
| Arama Motoru Görünürlüğü | **Devre Dışı** | İçerik yalnızca elis360news.com'da indekslenmeli (eklenti de bunu zorlar) |
| Çekirdeği Otomatik Yükselt | **Küçük (güvenlik) sürümleri** | Güvenlik yamaları beklemeden gelsin |
| Eklentileri Otomatik Yükselt | **Etkin** | Aynı neden |
| Hata Ayıklama Modu | Devre Dışı | (zaten öyle) |

## 3. Eklentiler

WordPress → **Eklentiler → Yeni ekle**:

1. **WPGraphQL** (yazarı: WPGraphQL) → kur → etkinleştir
2. **ELIS360 Headless** (bu klasör) → *Eklenti yükle* → `elis360-headless.zip` → etkinleştir
   - Etkinleştirince kategoriler (Gündem, Türkiye, İzmir ve Ege, Dünya, Video, Özel dosyalar)
     kendiliğinden oluşur ve kalıcı bağlantılar "Yazı adı" yapılır.

Ayrıca önerilen (isteğe bağlı): iki adımlı giriş için **Two Factor** eklentisi.

## 4. wp-config.php — gizli anahtarlar

cPanel → **Dosya Yöneticisi** → `cms.elis360news.com/wp/wp-config.php` → düzenle.
`/* That's all, stop editing! */` satırının **üstüne** ekleyin:

```php
define('ELIS360_FRONTEND_URL', 'https://www.elis360news.com');
define('ELIS360_WEBHOOK_SECRET', 'BURAYA-UZUN-RASTGELE-1');
define('ELIS360_PREVIEW_SECRET', 'BURAYA-UZUN-RASTGELE-2');
```

Rastgele değer üretmek için: https://api.wordpress.org/secret-key/1.1/salt/ sayfasındaki
satırlardan birinin tırnak içindeki kısmını kopyalayın (iki ayrı satır, iki ayrı değer).
**Aynı iki değer Vercel'e de girilecek** (aşağıda). Bu değerleri sohbete/e-postaya yazmayın.

## 5. Kullanıcılar (2–3 kişi)

**Kullanıcılar → Yeni ekle**, her kişiye ayrı hesap:

| Rol | Ne yapabilir |
|---|---|
| **Editör** | Herkesin yazısını düzenler ve yayımlar — haber müdürü |
| **Yazar** | Kendi yazısını yazar ve yayımlar |
| **Katkıda bulunan** | Yazar ama yayımlayamaz; editör onaylar |

Yönetici (admin) hesabını günlük işte kullanmayın.

**Önizleme kullanıcısı:** önizlemenin taslakları okuyabilmesi için bir hesap gerekir.
Kendi editör hesabınızda **Profil → Uygulama Parolaları** → ad: `vercel-onizleme` → *Yeni ekle* →
çıkan parolayı kopyalayın (bir kez gösterilir) → Vercel'e girin.

## 6. Vercel ortam değişkenleri

Vercel → Proje → **Settings → Environment Variables**:

| Ad | Değer |
|---|---|
| `WP_URL` | `https://cms.elis360news.com/wp` |
| `WP_WEBHOOK_SECRET` | wp-config'teki `ELIS360_WEBHOOK_SECRET` ile aynı |
| `WP_PREVIEW_SECRET` | wp-config'teki `ELIS360_PREVIEW_SECRET` ile aynı |
| `WP_PREVIEW_USER` | önizleme parolasını oluşturduğunuz kullanıcı adı |
| `WP_PREVIEW_APP_PASSWORD` | uygulama parolası |

Değişkenleri girdikten sonra **yeniden dağıtın** (Deployments → Redeploy).

## 7. Haber girerken

Yazı ekranının sağında **"ELIS360 — haber ayarları"** kutusu:

- **Son dakika** — header'daki kırmızı şeritte görünür (en yeni 2 tanesi)
- **Özel haber** — manşette kırmızı "Özel haber" rozeti; en yeni özel haber manşete çıkar
- **Sponsorlu içerik** — sitede HER ZAMAN "Sponsorlu içerik" etiketiyle çıkar, haber listelerine
  karışmaz, arama motorlarında haber olarak sıralanmaz. Bu etiket kaldırılamaz (editoryal yükümlülük).
- **Video adresi** — YouTube bağlantısı; doluysa yazı sayfasında video oynatıcı çıkar
- **Öne çıkan görsel** — kartlarda ve paylaşımda kullanılır. *Alternatif metin* alanını doldurun
  (görme engelli okurlar ve Google için).

Yayımla'ya basınca site birkaç saniye içinde güncellenir. Yayından kaldırınca da (taslağa çek / çöpe at)
anında kaybolur.

## 8. Bülten aboneleri

Sitedeki bülten formundan gelen adresler **Bülten** menüsünde listelenir (açık rıza tarihiyle).
Harici bir servis seçildiğinde buradan dışa aktarılır.

---

### Eklenti zip'ini yeniden üretmek

```bash
cd wordpress && zip -r elis360-headless.zip elis360-headless
```
