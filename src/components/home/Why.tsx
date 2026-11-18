import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { why as Content } from '@/content/home'

/** 05 — Neden ELIS360 NEWS. Koyu bölüm; fotoğraf %17 opaklık, gri ton (§7). */
export function Why({ content: c }: { content: typeof Content }) {
  return (
    <section aria-label={c.label} className="surface-dark relative overflow-hidden bg-ink text-onDark">
      <div aria-hidden="true" className="absolute inset-0">
        <Image src={c.image.src} alt="" fill quality={50} sizes="100vw" className="object-cover object-[center_42%] opacity-[0.17] contrast-[1.2] grayscale" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,13,16,.96)_0%,rgba(11,13,16,.8)_60%,rgba(11,13,16,.92)_100%)]" />
      <div className="shell relative py-section">
        <div className="grid grid-cols-1 items-center gap-y-10 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-12">
          <div className="min-w-0 lg:col-span-7">
            <SectionLabel index={c.index} tone="dark" className="mb-[26px]">
              {c.label}
            </SectionLabel>
            <p className="mb-[30px] font-display text-[clamp(32px,4.4vw,60px)] font-bold leading-[1.08] tracking-[-0.022em] text-white">
              {c.lines.map((l, i) => (
                <span key={l}>
                  {l}
                  {i < c.lines.length - 1 && <br />}
                </span>
              ))}
            </p>
            <p className="max-w-[580px] text-body font-light leading-[1.75] text-onDark-muted">{c.text}</p>
          </div>
          <div className="min-w-0 border border-white/20 bg-ink/[0.55] lg:col-span-5">
            <p className="border-b border-rule-dark px-[26px] py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-onDark-muted">
              {c.record.title}
            </p>
            <div className="px-[26px] py-7">
              <p className="flex flex-wrap items-baseline gap-3.5">
                <span className="font-display text-[76px] font-bold leading-none tracking-[-0.03em] text-white">{c.record.value}</span>
                <span className="font-display text-[24px] font-medium text-accent-light">{c.record.unit}</span>
              </p>
              <p className="mt-3.5 text-small text-onDark-muted">{c.record.text}</p>
            </div>
            <dl className="px-[26px] pb-[26px]">
              {c.record.facts.map((f) => (
                <div key={f.label} className="flex justify-between gap-4 border-t border-rule-dark py-[13px] font-mono text-[12px] tracking-[0.1em]">
                  <dt className="text-onDark-muted">{f.label}</dt>
                  <dd className="text-white">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
