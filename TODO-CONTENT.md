# TODO-CONTENT — açık içerik kalemleri (haber sitesi)

Güncel durum: 2026-11-28. Teslim belgesi: `TESLIM.md`.
Yayın denetimi: `npm run check:content` (yer tutucu ya da boş künye alanı bulursa çıkış kodu 1).

Durum: ☐ bekliyor · ☑ tamam

## Yayından önce zorunlu

| # | İçerik | Nerede | Not |
|---|---|---|---|
| ☐ | **Künye:** yayın sahibi, sorumlu yazı işleri müdürü, yönetim yeri, telefon | `src/content/kunye.ts` | 5187 sayılı Basın Kanunu. Boş alanlar sayfada gösterilmez ama denetim uyarır. |
| ☐ | KVKK metni hukuki kontrolü | `src/content/legal.ts` | Ticari unvan, MERSİS, adres, VERBİS durumu. |
| ☐ | WordPress bağlantısı (`WP_URL`) ve ilk haberler | `wordpress/README.md` | Bağlanana kadar ana sayfa "yayın akışı çok yakında" gösterir. |
| ☐ | SMTP (haber ihbarı formu) | `docs/deploy-cpanel.md` § 6 | |

## Sonra

| # | İçerik | Nerede |
|---|---|---|
| ☐ | Sosyal hesap adresleri (girilmedikçe otomatik gizli) | `src/content/site.ts` → `site.social` |
| ☐ | Reklam / sponsor (verilmedikçe hiçbir şey çizilmez) | `src/components/SiteChrome.tsx` → `<AdSlot>`, ana sayfa billboard |
| ☐ | Google News Publisher Center, Search Console | — |
| ☐ | Yeni kategori gerekirse (ör. Ekonomi, Spor) | TESLIM.md § 3 |

## Tamamlananlar (2026-11-28)

| ☑ | Kalem |
|---|---|
| ☑ | elis360news.com → haber sitesi; kurumsal site `elis360medya-kurumsal` dalında korunuyor (elis360medya.com) |
| ☑ | Kurumsal ve `/en` adresleri elis360medya.com'a 308 |
| ☑ | Haber ana sayfası, 6 kategori sayfası, son dakika, künye + yayın ilkeleri, RSS, haber ihbarı formu |
| ☑ | Son dakika şeridi (WordPress'ten, animasyonsuz), paylaşım bağlantıları, görselsiz haber için markalı kutu |
| ☑ | NewsMediaOrganization şeması, yeni paylaşım görseli, KVKK haber sitesine göre güncel |
| ☑ | WordPress eklentisi 1.1.0 (kategori adresleri) |
