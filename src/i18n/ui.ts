import type { Locale } from './config'

/**
 * Arayüz metinleri (içerik dışı): menü, form, düğme ve erişilebilirlik etiketleri.
 * İçerik metinleri src/content/ (TR) ve src/content/en/ (EN) altında.
 */
const tr = {
  skip: 'İçeriğe geç',
  ad: { label: 'Reklam', top: 'Reklam alanı – üst', inline: 'Reklam alanı – içerik arası' },
  clockLocal: 'TSİ',
  loadingLocation: 'Konum yükleniyor',
  masthead: {
    home: 'ana sayfa',
    searchLabel: 'Sitede ara',
    searchPlaceholder: 'Hizmet, saha veya haber arayın',
    search: 'Ara',
    cta: 'Teklif alın',
  },
  nav: { main: 'Ana menü', open: 'Tüm bölümler', close: 'Bölüm menüsünü kapat', language: 'Dil' },
  breadcrumb: 'Konum',
  home: 'Ana sayfa',
  footer: { services: 'Hizmetler', company: 'Kurumsal', contact: 'İletişim', servicesAria: 'Alt menü – hizmetler', companyAria: 'Alt menü – kurumsal', privacy: 'KVKK aydınlatma metni' },
  cta: {
    label: 'Projenizi birlikte planlayalım',
    title: 'Türkiye’de ne çekmek istiyorsunuz?',
    text: 'Konuyu, tarihleri ve ihtiyaçlarınızı bize yazın; size özel ekip ve çalışma planını birlikte oluşturalım.',
    form: 'Formu doldurun',
  },
  goToPage: 'Sayfaya git →',
  principles: 'Çalışma ilkelerimiz',
  why: 'Neden ELIS360 NEWS',
  scope: 'Hizmet kapsamı',
  email: 'E-posta',
  whatsapp: {
    aria: 'WhatsApp ile yazın',
    region: 'Hızlı iletişim',
    message: 'Merhaba, bir proje hakkında bilgi almak istiyorum.',
  },
  form: {
    heading: 'Proje bilgi formu',
    required: '* işaretli alanlar zorunludur.',
    quick: 'Hızlı destek seçenekleri',
    labels: { need: 'Destek türü', name: 'Ad soyad', org: 'Kurum', email: 'E-posta', country: 'Ülke', city: 'Çekim şehri', dates: 'Tarihler', team: 'Ekip ihtiyacı', message: 'Proje özeti' },
    placeholders: { city: 'ör. İstanbul, Hatay', dates: 'ör. 12–15 Aralık', team: 'ör. kameraman + ses, fixer, drone' },
    honeypot: 'Web siteniz (boş bırakın)',
    submit: 'Formu gönder',
    sending: 'Gönderiliyor…',
    ok: 'Teşekkürler — mesajınız bize ulaştı. En kısa sürede dönüş yapacağız.',
    failed: 'Mesaj gönderilemedi. Lütfen alanları kontrol edip tekrar deneyin.',
    retry: 'Mesaj gönderilemedi. Lütfen tekrar deneyin.',
    network: 'Bağlantı kurulamadı. Lütfen tekrar deneyin.',
    privacy: ['Kişisel verileriniz', 'KVKK aydınlatma metni', 'kapsamında yalnızca talebinizi yanıtlamak için işlenir.'],
  },
  notFound: { title: 'Sayfa bulunamadı', text: 'Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.', back: 'Ana sayfaya dön' },
  error: { title: 'Bir şeyler ters gitti', text: 'Sayfa şu an yüklenemedi. Lütfen birazdan tekrar deneyin.', retry: 'Tekrar dene' },
  searchPage: {
    title: 'Arama',
    label: 'Sitede ara',
    empty: 'Aramak istediğiniz kelimeyi yazın.',
    none: 'Sonuç bulunamadı. Farklı bir kelime deneyin ya da bize yazın.',
    results: (n: number, q: string) => `“${q}” için ${n} sonuç`,
    pages: 'Sayfalar',
    articles: 'Yazılar',
  },
}

type Dict = typeof tr

const en: Dict = {
  skip: 'Skip to content',
  ad: { label: 'Advertisement', top: 'Advertisement – top', inline: 'Advertisement – in content' },
  clockLocal: 'TRT',
  loadingLocation: 'Loading location',
  masthead: {
    home: 'home',
    searchLabel: 'Search the site',
    searchPlaceholder: 'Search services, locations or stories',
    search: 'Search',
    cta: 'Request a quote',
  },
  nav: { main: 'Main menu', open: 'All sections', close: 'Close section menu', language: 'Language' },
  breadcrumb: 'Breadcrumb',
  home: 'Home',
  footer: { services: 'Services', company: 'Company', contact: 'Contact', servicesAria: 'Footer – services', companyAria: 'Footer – company', privacy: 'Privacy notice' },
  cta: {
    label: 'Plan your project with us',
    title: 'What do you want to film in Türkiye?',
    text: 'Tell us the story, the dates and what you need — we’ll put together the right crew and plan.',
    form: 'Send a brief',
  },
  goToPage: 'View service →',
  principles: 'How we work',
  why: 'Why ELIS360 NEWS',
  scope: 'Scope of services',
  email: 'Email',
  whatsapp: {
    aria: 'Message us on WhatsApp',
    region: 'Quick contact',
    message: 'Hello, I’d like to talk about a production in Türkiye.',
  },
  form: {
    heading: 'Project brief',
    required: 'Fields marked * are required.',
    quick: 'How can we help?',
    labels: { need: 'Request type', name: 'Full name', org: 'Organisation', email: 'Email', country: 'Country', city: 'Filming location', dates: 'Dates', team: 'Crew needed', message: 'Project summary' },
    placeholders: { city: 'e.g. Istanbul, Hatay', dates: 'e.g. 12–15 December', team: 'e.g. camera + sound, fixer, drone' },
    honeypot: 'Your website (leave blank)',
    submit: 'Send brief',
    sending: 'Sending…',
    ok: 'Thank you — we’ve received your brief and will get back to you shortly.',
    failed: 'We couldn’t send your message. Please check the fields and try again.',
    retry: 'We couldn’t send your message. Please try again.',
    network: 'Connection failed. Please try again.',
    privacy: ['We process your details only to answer your request, as set out in our', 'privacy notice', '.'],
  },
  notFound: { title: 'Page not found', text: 'The page you are looking for may have moved or never existed.', back: 'Back to home' },
  error: { title: 'Something went wrong', text: 'This page couldn’t be loaded. Please try again in a moment.', retry: 'Try again' },
  searchPage: {
    title: 'Search',
    label: 'Search the site',
    empty: 'Type what you are looking for.',
    none: 'No results. Try another word, or get in touch.',
    results: (n: number, q: string) => `${n} result${n === 1 ? '' : 's'} for “${q}”`,
    pages: 'Pages',
    articles: 'Articles',
  },
}

const dicts: Record<Locale, Dict> = { tr, en }
export const ui = (locale: Locale) => dicts[locale]
export type UI = Dict
