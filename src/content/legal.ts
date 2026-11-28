/**
 * KVKK aydınlatma metni (TR) ve gizlilik bildirimi (EN).
 * Sitenin bugün gerçekten yaptığı işlemeye göre yazıldı: iletişim formu (e-posta ile iletim),
 * bülten kaydı (WordPress), kötüye kullanım için kısa süreli IP sınırı, hava durumu için IP'den şehir
 * tahmini (saklanmaz). Analitik ya da reklam çerezi yok.
 * YAYIN ÖNCESİ: şirketin ticari unvanı, MERSİS/adres ve VERBİS durumu hukuk danışmanıyla eklenmeli —
 * bkz. TESLIM.md › Açık kalemler. `controller` alanı bunun için ayrıldı.
 */
export type LegalSection = { title: string; paragraphs?: readonly string[]; items?: readonly string[] }
export type LegalDoc = { title: string; label: string; updated: string; intro: string; sections: readonly LegalSection[] }

const UPDATED = '2026-11-28'

export const kvkk: LegalDoc = {
  label: 'Kişisel verilerin korunması',
  title: 'KVKK aydınlatma metni',
  updated: UPDATED,
  intro:
    'Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu’nun 10. maddesi uyarınca, elis360news.com sitesini kullanırken paylaştığınız kişisel verilerin nasıl işlendiğini açıklar.',
  sections: [
    {
      title: 'Veri sorumlusu',
      paragraphs: [
        'Kişisel verileriniz, veri sorumlusu sıfatıyla ELIS360 NEWS tarafından işlenir. Bu metinle ilgili tüm sorularınız ve başvurularınız için info@elis360news.com adresine yazabilirsiniz.',
      ],
    },
    {
      title: 'Hangi verileri işliyoruz?',
      items: [
        'Haber ihbarı ve iletişim formu: ad soyad, e-posta, varsa kurum, olayın yeri ve zamanı ile mesajınızda yazdıklarınız.',
        'WhatsApp veya e-posta ile bize ulaştığınızda: telefon numaranız, e-posta adresiniz ve mesajınızın içeriği.',
        'Bülten kaydı: e-posta adresiniz.',
        'Teknik veriler: güvenlik ve kötüye kullanımı önleme amacıyla IP adresiniz; hava durumu bilgisini göstermek için IP adresinden tahmin edilen şehir (bu bilgi saklanmaz).',
      ],
    },
    {
      title: 'Hangi amaçlarla işliyoruz?',
      items: [
        'Haber ihbarlarını değerlendirmek ve doğrulamak; düzeltme ve cevap hakkı taleplerini yanıtlamak; reklam ve iş birliği taleplerine dönüş yapmak.',
        'Talep ettiğiniz bülten ve duyuruları göndermek.',
        'Sitenin güvenliğini sağlamak; spam ve otomatik gönderimleri engellemek.',
        'Yasal yükümlülüklerimizi yerine getirmek.',
      ],
    },
    {
      title: 'Hukuki sebep ve toplama yöntemi',
      paragraphs: [
        'Verileriniz, sitedeki formlar ve doğrudan iletişim kanalları aracılığıyla elektronik ortamda toplanır. İşleme; bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması (KVKK m.5/2-c), hukuki yükümlülüğün yerine getirilmesi (m.5/2-ç) ve temel hak ve özgürlüklerinize zarar vermemek kaydıyla meşru menfaatimiz (m.5/2-f) hukuki sebeplerine dayanır. Bülten gönderimi açık rızanıza dayanır; rızanızı her zaman geri alabilirsiniz.',
      ],
    },
    {
      title: 'Haber kaynaklarının gizliliği',
      paragraphs: [
        'Bize haber ihbarında bulunan kişilerin kimliği, kendi açık izinleri olmadan hiçbir koşulda yayımlanmaz ve üçüncü kişilerle paylaşılmaz. Gönderdiğiniz bilgi ve görüntüler yalnızca haberin doğrulanması ve hazırlanması için kullanılır.',
      ],
    },
    {
      title: 'Kimlere aktarıyoruz?',
      paragraphs: [
        'Verileriniz satılmaz ve reklam amacıyla paylaşılmaz. Yalnızca hizmeti sunabilmek için kullandığımız barındırma (hosting) ve e-posta hizmet sağlayıcılarımızla ve kanunen yetkili kamu kurumlarıyla, gerekli olduğu ölçüde paylaşılır. Yurt dışına aktarım gerekirse KVKK m.9’daki şartlara uygun olarak yapılır.',
      ],
    },
    {
      title: 'Ne kadar süre saklıyoruz?',
      paragraphs: [
        'Haber ihbarları ve iletişim talepleri, değerlendirmenin tamamlanmasından itibaren en fazla iki yıl; bülten kaydı, aboneliğinizi sonlandırana kadar saklanır. Güvenlik amaçlı IP kayıtları kısa süreli tutulur ve otomatik olarak silinir. Süresi dolan veriler silinir, yok edilir veya anonim hâle getirilir.',
      ],
    },
    {
      title: 'Çerezler',
      paragraphs: [
        'Sitede analitik, reklam veya takip çerezi kullanılmaz. Yalnızca içerik editörlerinin taslak önizlemesi için gereken teknik bir oturum çerezi bulunur; ziyaretçilere bu çerez yerleştirilmez.',
      ],
    },
    {
      title: 'Haklarınız',
      paragraphs: ['KVKK m.11 uyarınca, veri sorumlusuna başvurarak:'],
      items: [
        'kişisel verilerinizin işlenip işlenmediğini öğrenme ve işlenmişse buna ilişkin bilgi talep etme,',
        'işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,',
        'yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,',
        'eksik veya yanlış işlenmişse düzeltilmesini, şartları oluştuğunda silinmesini veya yok edilmesini isteme ve bu işlemlerin aktarıldığı üçüncü kişilere bildirilmesini talep etme,',
        'münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonucun ortaya çıkmasına itiraz etme,',
        'kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme haklarına sahipsiniz.',
      ],
    },
    {
      title: 'Başvuru',
      paragraphs: [
        'Başvurularınızı, kimliğinizi doğrulamamıza imkân verecek bilgilerle birlikte info@elis360news.com adresine iletebilirsiniz. Başvurunuz en geç otuz gün içinde ücretsiz olarak sonuçlandırılır.',
      ],
    },
  ],
}

export const privacy: LegalDoc = {
  label: 'Your data',
  title: 'Privacy notice',
  updated: UPDATED,
  intro:
    'This notice explains how ELIS360 NEWS handles the personal data you share when you use elis360news.com. It is provided under Türkiye’s Personal Data Protection Law No. 6698 (KVKK) and reflects the principles of the EU GDPR for visitors from the European Union.',
  sections: [
    {
      title: 'Who is responsible for your data',
      paragraphs: ['ELIS360 NEWS is the data controller. For any question about this notice, or to exercise your rights, write to info@elis360news.com.'],
    },
    {
      title: 'What we collect',
      items: [
        'Contact form: your name, organisation, email, country, filming location, dates, crew needs and whatever you write in the project summary.',
        'If you contact us on WhatsApp or by email: your phone number or email address and the content of your message.',
        'Newsletter sign-up: your email address.',
        'Technical data: your IP address, used to protect the site against abuse; and an approximate city derived from it to show the local weather (not stored).',
      ],
    },
    {
      title: 'Why we use it',
      items: [
        'To assess your project, send you a proposal or information, and stay in touch with you about it.',
        'To send the newsletter you asked for.',
        'To keep the site secure and block spam and automated submissions.',
        'To meet our legal obligations.',
      ],
    },
    {
      title: 'Legal basis',
      paragraphs: [
        'We process your data to take steps at your request before entering into a contract, or to perform one; to comply with legal obligations; and for our legitimate interest in running a secure website. The newsletter is based on your consent, which you can withdraw at any time.',
      ],
    },
    {
      title: 'Who we share it with',
      paragraphs: [
        'We never sell your data or share it for advertising. We share it only with the hosting and email providers we need to run the service, and with public authorities where the law requires. If your project involves working with partners outside Türkiye, any transfer happens only at your request and in line with the applicable rules.',
      ],
    },
    {
      title: 'How long we keep it',
      paragraphs: [
        'Enquiries are kept for up to two years after they are closed; newsletter sign-ups until you unsubscribe. Security logs of IP addresses are short-lived and deleted automatically. When the period ends, data is deleted, destroyed or anonymised.',
      ],
    },
    {
      title: 'Cookies',
      paragraphs: [
        'We use no analytics, advertising or tracking cookies. The only cookie is a technical session cookie used by our editors to preview drafts; it is never set for visitors.',
      ],
    },
    {
      title: 'Your rights',
      items: [
        'Find out whether we hold data about you, and get a copy of it.',
        'Learn why it is processed and whether it is used for that purpose.',
        'Know which third parties it has been shared with, in Türkiye or abroad.',
        'Have it corrected if it is incomplete or wrong, and erased when the conditions are met.',
        'Object to a decision against you made solely by automated processing.',
        'Claim compensation if you suffer damage from unlawful processing.',
      ],
    },
    {
      title: 'How to contact us',
      paragraphs: [
        'Send your request to info@elis360news.com with enough information for us to verify your identity. We will reply free of charge within thirty days.',
      ],
    },
  ],
}
