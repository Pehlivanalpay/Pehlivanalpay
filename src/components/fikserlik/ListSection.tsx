import Image from 'next/image'
import { NumberedList } from '@/components/ui/NumberedList'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionMotif } from '@/components/ui/SectionMotif'
import type { fikserlik } from '@/content/fikserlik'

type Section = (typeof fikserlik)['sections'][number]

/** Başlık (4 sütun) + fosforlu numaralı liste (8 sütun). Açık, koyu veya motifli. */
export function ListSection({ content: c }: { content: Section }) {
  const dark = c.tone === 'dark'
  return (
    <section
      id={c.id}
      aria-labelledby={`${c.id}-baslik`}
      className={`relative overflow-hidden ${dark ? 'surface-dark bg-ink text-onDark' : ''}`}
    >
      {dark && (
        <>
          <div aria-hidden="true" className="absolute inset-0">
            <Image src="/hero-bg.jpg" alt="" fill quality={50} sizes="100vw" className="object-cover object-[center_42%] opacity-[0.17] contrast-[1.2] grayscale" />
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,13,16,.96)_0%,rgba(11,13,16,.84)_60%,rgba(11,13,16,.94)_100%)]" />
        </>
      )}
      {c.motif && <SectionMotif side="right" />}
      <div className="shell relative z-[1] py-[clamp(72px,7.5vw,112px)]">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-12">
          <div className="min-w-0 lg:col-span-4">
            <SectionLabel index={c.index} tone={c.tone}>
              {c.label}
            </SectionLabel>
            <h2 id={`${c.id}-baslik`} className="mb-5 font-display text-[clamp(28px,3vw,40px)] font-bold leading-[1.08] tracking-[-0.02em]">
              {c.title}
            </h2>
            <p className={`text-[15px] font-light leading-[1.7] ${dark ? 'text-onDark-muted' : 'text-ink-muted'}`}>{c.text}</p>
          </div>
          <NumberedList items={c.items} tone={c.tone} variant="text" minCol={330} className="min-w-0 self-start lg:col-span-8" />
        </div>
      </div>
    </section>
  )
}
