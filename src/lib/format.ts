const TZ = 'Europe/Istanbul'
const hm = new Intl.DateTimeFormat('tr-TR', { timeZone: TZ, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
const dayKey = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' })
const short = new Intl.DateTimeFormat('tr-TR', { timeZone: TZ, day: 'numeric', month: 'short' })
const long = new Intl.DateTimeFormat('tr-TR', { timeZone: TZ, day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })

/** Kart/şerit zamanı: bugünse "20:45", değilse "17 Kas" (İstanbul saatine göre). */
export function newsTime(iso: string, now = new Date()): string {
  const d = new Date(iso)
  return dayKey.format(d) === dayKey.format(now) ? hm.format(d) : short.format(d)
}

/** Yazı sayfası: "18 Kasım 2026 20:45" */
export function newsDateLong(iso: string): string {
  return long.format(new Date(iso)).replace(',', '')
}
