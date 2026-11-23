import Image from 'next/image'
import type { Img } from '@/content/home'
import { blurProps } from '@/content/images'

/** Görsel + metin yan yana (görsel solda). Lojistik gibi tek konuyu bir kareyle anlatan bölümler için. */
export function MediaSplit({ id, label, title, text, points, image }: { id: string; label: string; title: string; text: string; points: readonly string[]; image: Img }) {
  return (
    <section aria-labelledby={`${id}-baslik`} className="border-t border-rule bg-paper-cream">
      <div className="shell py-section">
        <div className="grid grid-cols-1 items-center gap-y-10 lg:grid-cols-12 lg:gap-x-6">
          <figure className="m-0 min-w-0 lg:col-span-7">
            <Image src={image.src} alt={image.alt} width={image.width} height={image.height} {...blurProps(image)} sizes="(min-width: 960px) 58vw, 100vw" className="block aspect-[16/10] w-full object-cover" />
          </figure>
          <div className="min-w-0 lg:col-span-5 lg:pl-6">
            <p className="mb-5 font-mono text-label font-semibold uppercase text-accent">{label}</p>
            <h2 id={`${id}-baslik`} className="mb-5 font-display text-[clamp(28px,3vw,40px)] font-bold leading-[1.08] tracking-[-0.02em]">
              {title}
            </h2>
            <p className="mb-7 text-body leading-[1.7] text-ink-body">{text}</p>
            <ul>
              {points.map((pt) => (
                <li key={pt} className="flex items-baseline gap-4 border-t border-rule py-3.5 font-display text-[17px] font-semibold last:border-b">
                  <span aria-hidden="true" className="h-2 w-2 flex-none translate-y-[-2px] rounded-full bg-accent" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
