import Image from 'next/image'
import type { Img } from '@/content/home'

/**
 * Geniş görsel şeridi ("alt bant görseli"). Metin fotoğrafa basılmaz, HTML olarak üstüne gelir (PDF kural 05).
 */
export function ImageBand({ label, title, text, image }: { label: string; title: string; text?: string; image: Img }) {
  return (
    <section aria-label={label} className="surface-dark relative overflow-hidden bg-ink text-onDark">
      <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover object-center" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,31,.94)_0%,rgba(7,17,31,.72)_50%,rgba(7,17,31,.25)_100%)]" />
      <div className="shell relative flex min-h-[clamp(320px,34vw,480px)] items-end py-section-sm">
        <div className="max-w-[640px]">
          <p className="mb-4 font-mono text-label font-semibold uppercase text-accent-light">{label}</p>
          <p className="font-display text-[clamp(26px,3vw,40px)] font-bold leading-[1.1] tracking-[-0.02em] text-white">{title}</p>
          {text && <p className="mt-4 text-body font-light text-onDark-muted">{text}</p>}
        </div>
      </div>
    </section>
  )
}
