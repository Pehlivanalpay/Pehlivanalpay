/**
 * İletişim formu — alanlar ve doğrulama. İstemci ve sunucu aynı kuralları kullanır.
 */
export const contactFields = {
  name: { label: 'Ad soyad', max: 120, required: true },
  org: { label: 'Kurum', max: 160, required: false },
  email: { label: 'E-posta', max: 254, required: true },
  dates: { label: 'Çekim tarihleri', max: 160, required: false },
  message: { label: 'Proje konusu ve ihtiyaçlar', max: 5000, required: true },
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
  for (const k of ['name', 'org', 'email', 'dates'] as const) out[k] = out[k].replace(/[\r\n]+/g, ' ')
  return out
}

export function validate(input: ContactInput): ContactErrors {
  const e: ContactErrors = {}
  for (const [k, f] of Object.entries(contactFields) as [ContactField, (typeof contactFields)[ContactField]][]) {
    const v = input[k]
    if (f.required && !v) e[k] = `${f.label} alanı zorunludur.`
    else if (v.length > f.max) e[k] = `${f.label} en fazla ${f.max} karakter olabilir.`
  }
  if (!e.email && input.email && !EMAIL_RE.test(input.email)) e.email = 'Geçerli bir e-posta adresi yazın.'
  if (!e.message && input.message && input.message.length < 10) e.message = 'Projenizi birkaç cümleyle anlatın.'
  return e
}
