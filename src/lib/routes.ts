/**
 * Henüz kurulmamış rotalar. Bunlara giden <Link>'ler önceden yüklenmez
 * (aksi halde tarayıcı konsolunda 404 oluşur). Sayfa kurulunca buradan silin.
 */
const UNBUILT: string[] = []

export function prefetchFor(href: string): false | undefined {
  const path = href.split(/[?#]/)[0]
  return UNBUILT.some((r) => path === r || path.startsWith(`${r}/`)) ? false : undefined
}
