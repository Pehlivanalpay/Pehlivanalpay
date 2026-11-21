/**
 * İletişim formu — alanlar ve doğrulama. İstemci ve sunucu aynı kuralları kullanır.
 */
export const contactFields = {
  need: { label: 'Destek türü', max: 80, required: false },
  name: { label: 'Ad soyad', max: 120, required: true },
  org: { label: 'Kurum', max: 160, required: false },
  email: { label: 'E-posta', max: 254, required: true },
  country: { label: 'Ülke', max: 80, required: false },
  city: { label: 'Çekim şehri', max: 120, required: false },
  dates: { label: 'Tarihler', max: 160, required: false },
  team: { label: 'Ekip ihtiyacı', max: 300, required: false },
  message: { label: 'Proje özeti', max: 5000, required: true },
} as const

export type ContactField = keyof typeof contactFields
export type ContactInput = Record<ContactField, string>
export type ContactErrors = Partial<Record<ContactField, string>>

/** Bal küpü alanı — insanlar görmez, botlar doldurur. */
export const HONEYPOT = 'website'
/** Formun açıldığı an (ms). Çok hızlı gönderim = bot. */
export const TIMESTAMP = 'ts'
export const MIN_FILL_MS = 3000

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function normalize(raw: Record<string, unknown>): ContactInput {
  const out = {} as ContactInput
  for (const k of Object.keys(contactFields) as ContactField[]) {
    const v = raw[k]
    out[k] = typeof v === 'string' ? v.trim() : ''
  }
  // Tek satırlık alanlarda satır sonu yok (e-posta başlığı enjeksiyonuna karşı).
  for (const k of ['need', 'name', 'org', 'email', 'country', 'city', 'dates', 'team'] as const) out[k] = out[k].replace(/[\r\n]+/g, ' ')
  return out
}

const LABELS_EN: Record<ContactField, string> = {
  need: 'Request type', name: 'Full name', org: 'Organisation', email: 'Email', country: 'Country',
  city: 'Filming location', dates: 'Dates', team: 'Crew needed', message: 'Project summary',
}

/** Alan doğrulaması. Mesajlar formun diline göre (istemci ve sunucu aynı metni üretir). */
export function validate(input: ContactInput, locale: 'tr' | 'en' = 'tr'): ContactErrors {
  const en = locale === 'en'
  const e: ContactErrors = {}
  for (const [k, f] of Object.entries(contactFields) as [ContactField, (typeof contactFields)[ContactField]][]) {
    const v = input[k]
    const label = en ? LABELS_EN[k] : f.label
    if (f.required && !v) e[k] = en ? `${label} is required.` : `${label} alanı zorunludur.`
    else if (v.length > f.max) e[k] = en ? `${label} can be at most ${f.max} characters.` : `${label} en fazla ${f.max} karakter olabilir.`
  }
  if (!e.email && input.email && !EMAIL_RE.test(input.email)) e.email = en ? 'Please enter a valid email address.' : 'Geçerli bir e-posta adresi yazın.'
  if (!e.message && input.message && input.message.length < 10) e.message = en ? 'Please describe your project in a few sentences.' : 'Projenizi birkaç cümleyle anlatın.'
  return e
}
