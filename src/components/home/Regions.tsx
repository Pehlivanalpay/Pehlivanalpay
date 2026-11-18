import { NumberedList } from '@/components/ui/NumberedList'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { regions as Content } from '@/content/home'

/** 01 — Sahalar. Koyu zemin, fosforlu numaralı liste. */
export function Regions({ content: c }: { content: typeof Content }) {
  return (
    <section id="sahalar" aria-labelledby="sahalar-baslik" className="surface-dark bg-ink text-onDark">
      <div className="shell py-section-sm">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="min-w-0 lg:col-span-4">
            <SectionLabel index={c.index} tone="dark" className="mb-4">
              {c.label}
            </SectionLabel>
            <h2 id="sahalar-baslik" className="mb-[18px] font-display text-[clamp(26px,2.6vw,34px)] font-semibold leading-[1.14] tracking-[-0.015em]">
              {c.title}
            </h2>
            <p className="text-small font-light leading-[1.7] text-onDark-muted">{c.text}</p>
          </div>
          {/* pl-10: referansta <ol> tarayıcının 40px girintisini korur; 1440'ta 3 sütun bu sayede oluşur */}
          <NumberedList items={c.items} tone="dark" className="min-w-0 pl-10 lg:col-span-8" />
        </div>
      </div>
    </section>
  )
}
