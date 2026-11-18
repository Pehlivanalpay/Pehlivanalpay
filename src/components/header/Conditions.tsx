'use client'

import { useEffect, useState } from 'react'
import { PinIcon, WxClear, WxCloud, WxFog, WxPartly, WxRain, WxSnow, WxStorm } from '@/components/ui/icons'
import type { Conditions as Data, WeatherKind } from '@/lib/weather'

const icons: Record<WeatherKind, typeof WxClear> = {
  clear: WxClear,
  partly: WxPartly,
  cloud: WxCloud,
  fog: WxFog,
  rain: WxRain,
  snow: WxSnow,
  storm: WxStorm,
}

/**
 * Gri çubuk iskelet — metnin satır yüksekliğini korur.
 * Genişlikler em cinsinden: Mono 11px'te bir karakter ≈ 0.6em + 0.14em harf aralığı = 0.74em.
 */
function Skel({ w }: { w: string }) {
  // İçindeki boşluk karakteri sayesinde yüksekliği gerçek metnin satır kutusuyla aynıdır;
  // gri çubuk ortadaki %50'lik bantta çizilir.
  return (
    <span
      aria-hidden="true"
      className="inline-block bg-[linear-gradient(transparent_25%,rgba(255,255,255,.15)_25%,rgba(255,255,255,.15)_75%,transparent_75%)]"
      style={{ width: w }}
    >
      &nbsp;
    </span>
  )
}

/**
 * Şehir + hava durumu. Veri gelene kadar sabit genişlikli iskelet gösterir.
 * Kaynak: /api/conditions (Vercel konum başlıkları + Open-Meteo).
 */
export function Conditions() {
  const [data, setData] = useState<Data | null>(null)

  useEffect(() => {
    const ctrl = new AbortController()
    fetch('/api/conditions', { signal: ctrl.signal })
      .then((r) => (r.ok ? (r.json() as Promise<Data>) : null))
      .then((d) => d && setData(d))
      .catch(() => {})
    return () => ctrl.abort()
  }, [])

  const Icon = data?.kind ? icons[data.kind] : WxPartly
  const hasWeather = data?.temperature != null

  // İki parça da iskelet ve dolu halde AYNI en küçük genişliği taşır; böylece dar
  // ekranda satır kırılması veri gelince değişmez ve header zıplamaz.
  // (5.5em ≈ ikon + 5 harf "İZMİR", 16.8em ≈ ikon + "16°  Parçalı bulutlu")
  return (
    <>
      <span className="inline-flex min-w-[5.5em] items-center gap-[7px] uppercase text-white" aria-busy={!data}>
        <PinIcon />
        {data ? data.city.toLocaleUpperCase('tr-TR') : <Skel w="3.7em" />}
        {!data && <span className="sr-only">Konum yükleniyor</span>}
      </span>
      <span className="inline-flex min-w-[16.8em] items-center gap-[7px]" aria-busy={!data}>
        {/* Hava verisi alınamazsa alan boş kalır ama yeri korunur. */}
        {(!data || hasWeather) && <Icon className={data ? undefined : 'opacity-40'} />}
        {data ? (
          hasWeather && (
            <>
              {data.temperature}°&nbsp; {data.label}
            </>
          )
        ) : (
          <Skel w="14.8em" />
        )}
      </span>
    </>
  )
}
