import Image from 'next/image'
import type { Img } from '@/content/home'

/**
 * Görsel kutusu. `image` null ise gri yer tutucu çizer — YAYINDA KALMAMALI
 * (`npm run check:content` içerikteki `image: null` değerlerini yakalar).
 */
export function MediaFrame({
  image,
  label = '[Görsel]',
  ratio,
  sizes,
  className = '',
  labelClassName = 'text-[11px] tracking-[0.2em]',
  children,
}: {
  image: Img | null
  label?: string
  ratio: string
  sizes: string
  className?: string
  labelClassName?: string
  children?: React.ReactNode
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: ratio }}>
      {image ? (
        <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <div /* check-placeholders: ignore */ className={`flex h-full w-full items-center justify-center bg-placeholder font-mono uppercase text-ink-mono ${labelClassName}`}>
          {label}
        </div>
      )}
      {children}
    </div>
  )
}
