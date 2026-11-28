/**
 * Yerel fotoğraflar (public/images) için bulanık ön izleme yardımcısı.
 * Haber görselleri WordPress'ten gelir; yerel fotoğraf eklenirse `npm run images` ön izlemeleri üretir.
 */
import { blur } from './image-blur'

/** next/image için: ön izleme varsa yüklenirken onu göster (siyah kutu yerine). */
export const blurProps = (img: { src?: string; blurDataURL?: string }) => {
  const data = img.blurDataURL ?? (img.src ? blur[img.src] : undefined)
  return data ? { placeholder: 'blur' as const, blurDataURL: data } : {}
}
