/**
 * Künye ve yayın ilkeleri (/kunye).
 *
 * 5187 sayılı Basın Kanunu ve 7418 sayılı düzenleme kapsamında internet haber sitelerinin künyesinde
 * yayın sahibi, sorumlu müdür, yönetim yeri adresi ve iletişim bilgileri bulunmalıdır.
 * YAYIN ÖNCESİ: `null` olan alanlar hukuki bilgilerle doldurulmalı (TODO-CONTENT.md). Boş alanlar
 * sayfada gösterilmez; `npm run check:content` bunları listeler.
 */
export type KunyeRow = { label: string; value: string | null; href?: string }

export const kunye: { rows: KunyeRow[] } = {
  rows: [
    { label: 'Yayın adı', value: 'ELIS360 NEWS' },
    { label: 'Yayın türü', value: 'Yaygın, süreli internet haber sitesi' },
    { label: 'Yayın sahibi', value: null },
    { label: 'Sorumlu yazı işleri müdürü', value: null },
    { label: 'Yönetim yeri', value: null },
    { label: 'Telefon', value: null },
    { label: 'E-posta', value: 'info@elis360news.com', href: 'mailto:info@elis360news.com' },
    { label: 'Haber ihbar hattı (WhatsApp)', value: '+90 543 228 89 21', href: 'https://wa.me/905432288921' },
    { label: 'Yer sağlayıcı', value: 'Güzel Hosting' },
  ],
}

export const principles = {
  intro:
    'ELIS360 NEWS, Basın Meslek İlkeleri’ni ve uluslararası gazetecilik etik ilkelerini benimser. Aşağıdaki ilkeler, haber merkezimizin her gün uyduğu kurallardır.',
  items: [
    { title: 'Doğruluk', text: 'Habere konu olan bilgiyi en az iki bağımsız kaynaktan doğrularız. Doğrulayamadığımız iddiaları haber olarak sunmayız; iddia olduğunu açıkça belirtiriz.' },
    { title: 'Kaynak gizliliği', text: 'Kimliğinin gizli kalmasını isteyen haber kaynaklarının adını hiçbir koşulda açıklamayız.' },
    { title: 'Tarafsızlık ve cevap hakkı', text: 'Haberde adı geçen kişi ve kurumlara görüş bildirme imkânı tanırız. Cevap ve düzeltme talepleri iletişim formumuzdan iletilebilir.' },
    { title: 'Görüntü etiği', text: 'Görüntüleri anlamını değiştirecek biçimde düzenlemeyiz. Çocukların ve mağdurların kimliğini korur, şiddet içeren görüntüleri yalnızca kamu yararı varsa ve uyarıyla yayımlarız.' },
    { title: 'Reklam ve haber ayrımı', text: 'Sponsorlu içerikler “Sponsorlu içerik” etiketiyle, haberden açıkça ayrılarak yayımlanır ve arama motorlarında haber olarak listelenmez.' },
  ],
  corrections:
    'Yayımladığımız bir haberde hata fark edildiğinde, düzeltmeyi gecikmeden yapar ve haberin sonuna düzeltmenin ne olduğunu ve ne zaman yapıldığını not ederiz. Düzeltme talepleri için iletişim formunda “Düzeltme veya cevap hakkı” konusunu seçebilirsiniz.',
}
