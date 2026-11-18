import { geolocation } from '@vercel/functions'
import { type NextRequest, NextResponse } from 'next/server'
import { site } from '@/content/site'
import { describeWeather, type Conditions } from '@/lib/weather'

/**
 * Ziyaretçinin şehri + anlık hava durumu.
 *
 * Şehir: Vercel'in her isteğe eklediği coğrafi konum başlıkları. Next 15+
 * `request.geo`'yu kaldırdı; resmî yerine geçen `@vercel/functions` →
 * `geolocation()` aynı başlıkları (`x-vercel-ip-city` vb.) okur — ek API çağrısı yok.
 * Yerelde veya başlık yoksa `site.fallbackLocation` (İzmir) kullanılır.
 *
 * Hava: Open-Meteo, anahtarsız. 15 dk önbellek (koordinata göre ayrı anahtar).
 */
export async function GET(req: NextRequest) {
  const geo = geolocation(req)
  const lat = Number(geo.latitude)
  const lon = Number(geo.longitude)
  const hasGeo = Boolean(geo.city) && Number.isFinite(lat) && Number.isFinite(lon) && !(lat === 0 && lon === 0)

  const fb = site.fallbackLocation
  const city = hasGeo ? geo.city! : fb.city
  const latitude = hasGeo ? lat : fb.latitude
  const longitude = hasGeo ? lon : fb.longitude

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
    // Yanıt ziyaretçinin IP konumuna bağlı — paylaşılan CDN önbelleğine girmemeli.
    headers: { 'Cache-Control': 'private, max-age=600' },
  })
}

