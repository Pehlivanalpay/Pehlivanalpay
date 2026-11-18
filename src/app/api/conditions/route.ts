import { type NextRequest, NextResponse } from 'next/server'
import { site } from '@/content/site'
import { describeWeather, type Conditions } from '@/lib/weather'

/**
 * Ziyaretçinin şehri + anlık hava durumu.
 *
 * Şehir, barındırma katmanının isteğe eklediği konum başlıklarından okunur — ek API çağrısı yok:
 *  - Cloudflare (alan adı Cloudflare arkasındaysa; ücretsiz planda "Add visitor location headers"
 *    yönetilen dönüşümü açık olmalı): cf-ipcity, cf-iplatitude, cf-iplongitude
 *  - Vercel: x-vercel-ip-city, x-vercel-ip-latitude, x-vercel-ip-longitude
 * Hiçbiri yoksa (doğrudan cPanel, yerel geliştirme) `site.fallbackLocation` (İzmir).
 *
 * Hava: Open-Meteo, anahtarsız. 15 dk önbellek (koordinata göre ayrı anahtar).
 */
function readGeo(h: Headers): { city: string; lat: number; lon: number } | null {
  const sources = [
    ['cf-ipcity', 'cf-iplatitude', 'cf-iplongitude'],
    ['x-vercel-ip-city', 'x-vercel-ip-latitude', 'x-vercel-ip-longitude'],
  ]
  for (const [c, la, lo] of sources) {
    const raw = h.get(c)
    const lat = Number(h.get(la))
    const lon = Number(h.get(lo))
    if (raw && Number.isFinite(lat) && Number.isFinite(lon) && !(lat === 0 && lon === 0)) {
      let city = raw
      try {
        city = decodeURIComponent(raw)
      } catch {}
      return { city, lat, lon }
    }
  }
  return null
}

export async function GET(req: NextRequest) {
  const geo = readGeo(req.headers)
  const fb = site.fallbackLocation
  const city = geo?.city ?? fb.city
  const latitude = geo?.lat ?? fb.latitude
  const longitude = geo?.lon ?? fb.longitude

  const body: Conditions = { city, temperature: null, kind: null, label: null }

  try {
    // Önbellek isabetini artırmak için koordinatı ~11 km'ye yuvarla.
    const url =
      'https://api.open-meteo.com/v1/forecast' +
      `?latitude=${latitude.toFixed(1)}&longitude=${longitude.toFixed(1)}` +
      '&current=temperature_2m,weather_code&timezone=auto'
    const res = await fetch(url, { next: { revalidate: 900 }, signal: AbortSignal.timeout(3000) })
    if (res.ok) {
      const data = (await res.json()) as { current?: { temperature_2m?: number; weather_code?: number } }
      const t = data.current?.temperature_2m
      const code = data.current?.weather_code
      if (typeof t === 'number') body.temperature = Math.round(t)
      if (typeof code === 'number') Object.assign(body, describeWeather(code))
    }
  } catch {
    // Hava servisine ulaşılamazsa yalnızca şehir döner; arayüz hava kısmını gizler.
  }

  return NextResponse.json(body, {
    // Yanıt ziyaretçinin konumuna bağlı — paylaşılan önbelleğe girmemeli.
    headers: { 'Cache-Control': 'private, max-age=600' },
  })
}
