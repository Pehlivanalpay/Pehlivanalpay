import Image from 'next/image'
import type { Img } from '@/content/home'

/** "Haberi biliyoruz…" koyu şerit; isteğe bağlı fotoğraf (çok soluk) ve deneyim göstergeleri. */
export function Manifesto({
  lines,
  text,
  image,
  stats,
}: {
  lines: readonly string[]
  text: string
  image?: Img
  stats?: readonly { value: string; unit: string; label: string }[]
}) {
  return (
    <section aria-label="Neden ELIS360 NEWS" className="surface-dark relative overflow-hidden bg-ink text-onDark">
      {image && (
        <div aria-hidden="true" className="absolute inset-0">
          <Image src={image.src} alt="" fill quality={50} sizes="100vw" className="object-cover object-[center_40%] opacity-[0.17] contrast-[1.2] grayscale" />
        </div>
      )}
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,31,.96)_0%,rgba(7,17,31,.82)_60%,rgba(7,17,31,.92)_100%)]" />
      <div className="shell relative py-section">
        <div className="grid grid-cols-1 items-end gap-y-8 lg:grid-cols-12 lg:gap-x-6">
          <p className="min-w-0 font-display text-[clamp(32px,4.2vw,58px)] font-bold leading-[1.08] tracking-[-0.022em] text-white lg:col-span-7">
            {lines.map((l, i) => (
              <span key={l}>
                {l}
                {i < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
          <p className="min-w-0 text-body font-light leading-[1.75] text-onDark-muted lg:col-span-5">{text}</p>
        </div>
        {stats && (
          <dl className="mt-14 grid grid-cols-1 border-t border-rule-dark lg:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="border-b border-rule-dark py-6 lg:border-b-0 lg:border-r lg:pr-6 lg:last:border-r-0 lg:[&:not(:first-child)]:pl-6">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="font-display text-[clamp(36px,3.6vw,52px)] font-bold leading-none tracking-[-0.03em] text-accent-light">
                    {s.value}
                    {s.unit && <span className="ml-2 text-[20px] font-medium text-white">{s.unit}</span>}
                  </span>
                  <span aria-hidden="true" className="mt-3 block font-mono text-[11px] uppercase tracking-[0.2em] text-onDark-glass">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  )
}
