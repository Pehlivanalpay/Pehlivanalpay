import { getImageProps } from 'next/image'
import { preload } from 'react-dom'

const DESKTOP = '(min-width: 960px)'
// 1×1 şeffaf GIF — dar ekranda <img> hiçbir şey indirmez.
const BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

/**
 * Sayfa başı zemin fotoğrafı — YALNIZCA 960px ve üstünde indirilir.
 * Dar ekranda %94'lük perde fotoğrafı zaten görünmez kılıyor; indirmek boşa bant genişliği
 * ve mobil LCP gecikmesi demek (karar: mobilde gizle).
 *
 * Next "art direction" yöntemi: getImageProps + <picture>. `priority` iken önyükleme de
 * aynı medya koşuluyla yapılır, böylece mobil tarayıcı onu da indirmez.
 */
export function DesktopBackdrop({
  src,
  width,
  height,
  priority = false,
  className = '',
}: {
  src: string
  width: number
  height: number
  priority?: boolean
  className?: string
}) {
  const {
    props: { srcSet, src: fallback },
  } = getImageProps({ src, alt: '', width, height, quality: 50, sizes: '100vw' })

  if (priority && srcSet) {
    preload(fallback, { as: 'image', imageSrcSet: srcSet, imageSizes: '100vw', media: DESKTOP, fetchPriority: 'high' })
  }

  return (
    <picture>
      <source media={DESKTOP} srcSet={srcSet} sizes="100vw" />
      <img
        src={BLANK}
        alt=""
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        className={`absolute inset-0 hidden h-full w-full lg:block ${className}`}
      />
    </picture>
  )
}
