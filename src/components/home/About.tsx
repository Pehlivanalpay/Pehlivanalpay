import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { about as Content } from '@/content/home'
import { blurProps } from '@/content/images'

const corner = 'absolute h-[26px] w-[26px] border-white/[0.72]'

/**
 * 02 — Biz kimiz. Görsel "kamera monitörü" çerçevesinde (§7): dört köşebent,
 * nişan artısı, REC + zaman kodu, tarama çizgileri, radyal vinyet.
 * Bu muamele yalnızca bu görselde. Çerçeve notch'lu (kesik köşe #3).
 */
export function About({ content: c }: { content: typeof Content }) {
  return (
    <section aria-labelledby="biz-kimiz-baslik">
      <div className="shell py-section">
        <div className="grid grid-cols-1 items-center gap-y-10 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-12">
          <figure className="relative m-0 min-w-0 overflow-hidden bg-ink notch-30 lg:col-span-6">
            <Image
              src={c.image.src}
              alt={c.image.alt}
              width={c.image.width}
              height={c.image.height}
              {...blurProps(c.image)}
              sizes="(min-width: 960px) 50vw, 100vw"
              className="block aspect-[16/10] w-full object-cover brightness-[.94] contrast-[1.18] grayscale"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-scan-dark" />
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,transparent_42%,rgba(11,13,16,.55)_100%)]" />
            <div aria-hidden="true" className="absolute inset-[clamp(16px,2vw,26px)]">
              <span className={`${corner} left-0 top-0 border-l-2 border-t-2`} />
              <span className={`${corner} right-0 top-0 border-r-2 border-t-2`} />
              <span className={`${corner} bottom-0 left-0 border-b-2 border-l-2`} />
              <span className={`${corner} bottom-0 right-0 border-b-2 border-r-2`} />
              <span className="absolute left-1/2 top-1/2 -ml-[13px] h-px w-[26px] bg-white/50" />
              <span className="absolute left-1/2 top-1/2 -mt-[13px] h-[26px] w-px bg-white/50" />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-x-[clamp(26px,2.6vw,38px)] top-[clamp(26px,2.6vw,38px)] flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 font-mono text-[11px] font-medium tracking-[0.2em] text-white [text-shadow:0_1px_4px_rgba(11,13,16,.9)]"
            >
              <span className="inline-flex items-center gap-[9px]">
                <span className="h-2 w-2 rounded-full bg-accent-light motion-safe:animate-blip" />
                REC
              </span>
              <span>{c.timecode}</span>
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 bg-gradient-to-t from-ink/[0.92] to-ink/0 px-[clamp(26px,2.6vw,38px)] py-[18px] font-mono text-[11px] uppercase tracking-[0.2em] text-white">
              <span>{c.caption.left}</span>
              <span className="text-[#C2C8D2]">{c.caption.right}</span>
            </figcaption>
          </figure>

          <div className="min-w-0 lg:col-span-6">
            <SectionLabel index={c.index}>{c.label}</SectionLabel>
            <h2 id="biz-kimiz-baslik" className="mb-[26px] font-display text-h2 font-bold">
              {c.title}
            </h2>
            {c.paragraphs.map((p, i) => (
              <p key={i} className={`${i === c.paragraphs.length - 1 ? 'mb-8' : 'mb-5'} text-body font-light leading-[1.75] text-[#232A33]`}>
                {p}
              </p>
            ))}
            <ul className="grid gap-x-6 [grid-template-columns:repeat(auto-fit,minmax(min(200px,100%),1fr))]">
              {c.points.map((pt) => (
                <li key={pt} className="border-t border-rule py-3.5 font-mono text-[12px] uppercase tracking-[0.14em] text-[#232A33]">
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
