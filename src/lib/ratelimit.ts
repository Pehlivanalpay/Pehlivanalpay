/**
 * Bellek içi, IP başına kayan pencere hız sınırı. Sunucusuz ortamda her örneğin kendi belleği
 * vardır; bu en iyi çaba korumasıdır. Kalıcı sınır gerekirse Upstash Redis / Vercel KV.
 */
export function createRateLimit({ windowMs, max }: { windowMs: number; max: number }) {
  const hits = new Map<string, number[]>()
  return function limited(key: string): boolean {
    const now = Date.now()
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
    recent.push(now)
    hits.set(key, recent)
    if (hits.size > 5000) for (const [k, v] of hits) if (now - v[v.length - 1] > windowMs) hits.delete(k)
    return recent.length > max
  }
}

export function clientIp(headers: Headers): string {
  return headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'yerel'
}

/** İstek başka bir siteden mi geliyor? (Origin başlığı varsa ve host'la eşleşmiyorsa) */
export function foreignOrigin(headers: Headers, host: string): boolean {
  const origin = headers.get('origin')
  if (!origin || origin === 'null') return false
  try {
    return new URL(origin).host !== host
  } catch {
    return true
  }
}
