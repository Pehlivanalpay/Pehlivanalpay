# TODO-CONTENT — açık içerik kalemleri

Güncel durum: 2026-11-21. Teslim belgesi: `TESLIM.md`.
Yayın denetimi: `npm run check:content` (yer tutucu bulursa çıkış kodu 1).

Durum: ☐ bekliyor · ☑ tamam

## Müşteriden beklenen

| # | İçerik | Nerede | Not |
|---|---|---|---|
| ☐ | **KVKK metni hukuki kontrolü** | `src/content/legal.ts` | Ticari unvan, MERSİS no, açık adres ve VERBİS durumu eklenmeli. Metin sitenin bugün yaptığı işlemeye göre yazıldı. |
| ☐ | Sosyal hesap adresleri: LinkedIn, Instagram, YouTube | `src/content/site.ts` → `site.social` | Girilmedikçe sitede ve JSON-LD'de otomatik gizli. |
| ☐ | "Biz kimiz" görseli | `src/content/home.ts` → `about.image` | Şu an kontrol odası. Saha arşivinden gerçek kare önerilir. |
| ☐ | Görsel izinleri | `public/images/` | Savaşın Çocukları ve saha fotoğraflarındaki kişiler için izin kontrolü (PDF not 05). |
| ☐ | Reklam / sponsor | `src/components/SiteChrome.tsx` → `<AdSlot>` | İçerik verilmezse yayında hiçbir şey çizilmez. Sponsor gelince `children` olarak eklenir. |

## Sunucu / WordPress (siz)

| # | İş | Belge |
|---|---|---|
| ☐ | SMTP ortam değişkenleri (form e-postası) | `docs/deploy-cpanel.md` § 6 |
| ☐ | cms.elis360news.com SSL, WPGraphQL + ELIS360 Headless eklentileri, wp-config gizli anahtarları | `wordpress/README.md` |
| ☐ | GitHub değişkeni `WP_URL` + cPanel'de WP_* değişkenleri | `docs/deploy-cpanel.md` § 6 |
| ☐ | 2–3 editör hesabı; uçtan uca test (yayımla → görünür, önizle) | `wordpress/README.md` |

## Tamamlananlar (2026-11)

| ☑ | Kalem |
|---|---|
| ☑ | Her menü başlığı ayrı sayfa; `/fikserlik` → `/fixer-in-turkiye`, `/haberler` → `/projeler` (308) |
| ☑ | 2026-11-23 revizyonu: menüde "Projeler", Journal yazı yokken gizli (`/haber` → `/projeler`), "Özel görüntüler" → Fikserlik, Fikserlik başlığı Türkçe, iki yeni hızlı destek seçeneği, görsellerde önyükleme + bulanık ön izleme |
| ☑ | İngilizce sürüm `/en/…` — yayında (2026-11-21, müşteri onayı); 9 sayfa, yeniden yazılmış metin, hreflang, iki dilli site haritası, dil anahtarı |
| ☑ | Arama sayfası `/ara`, `/en/search` (kurumsal sayfalar + WordPress yazıları) |
| ☑ | KVKK `/kvkk` ve Privacy notice `/en/privacy`; form altında bağlantı |
| ☑ | İki dilli 404 ve hata sayfaları; güvenlik başlıkları (HSTS, CSP frame-ancestors, nosniff…) |
| ☑ | WhatsApp +90 543 228 89 21 (mobil sabit düğme, iletişim, footer, sayfa sonu şeritleri; dile göre hazır mesaj) |
| ☑ | Son dakika şeridi kaldırıldı; hero "güven göstergeleri" paneli yerine rakam şeridi |
| ☑ | Marka & PR ve Prodüksiyon ana görselleri: Pexels stok (marka filmi seti, gerçek yayın rejisi) — `docs/image-credits.md`. Kendi çekiminiz gelince aynı adla değiştirin. |
| ☑ | Renk paleti PDF'e göre; logo eskizden çizildi; site ikonu, paylaşım görseli |
