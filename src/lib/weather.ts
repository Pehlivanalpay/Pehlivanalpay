/**
 * WMO hava durumu kodları → Türkçe etiket + ikon türü.
 * Open-Meteo `weather_code` alanı bu kodları döndürür.
 * https://open-meteo.com/en/docs (WMO Weather interpretation codes)
 */
export type WeatherKind = 'clear' | 'partly' | 'cloud' | 'fog' | 'rain' | 'snow' | 'storm'

export function describeWeather(code: number): { kind: WeatherKind; label: string } {
  if (code === 0) return { kind: 'clear', label: 'Açık' }
  if (code === 1) return { kind: 'partly', label: 'Az bulutlu' }
  if (code === 2) return { kind: 'partly', label: 'Parçalı bulutlu' }
  if (code === 3) return { kind: 'cloud', label: 'Kapalı' }
  if (code === 45 || code === 48) return { kind: 'fog', label: 'Sisli' }
  if (code >= 51 && code <= 57) return { kind: 'rain', label: 'Çisenti' }
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return { kind: 'rain', label: 'Yağmurlu' }
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return { kind: 'snow', label: 'Karlı' }
  if (code >= 95) return { kind: 'storm', label: 'Gök gürültülü' }
  return { kind: 'cloud', label: 'Bulutlu' }
}

export type Conditions = {
  city: string
  temperature: number | null
  kind: WeatherKind | null
  label: string | null
}
