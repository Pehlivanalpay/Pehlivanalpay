import Link from 'next/link'
import { buttonClass } from '@/components/ui/Button'
import { CategoryTag } from '@/components/ui/CategoryTag'
import { MediaFrame } from '@/components/ui/MediaFrame'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { news as Content } from '@/content/home'
import { prefetchFor } from '@/lib/routes'

/** 04 — Haberler. Faz 2'de WPGraphQL'den beslenecek; şimdilik içerik yer tutucu. */
export function News({ content: c }: { content: typeof Content }) {
  const lead = c.lead
  return (
    <section id="haberler" aria-labelledby="haberler-baslik" className="border-t border-rule">
      <div className="shell py-section">
        <div className="mb-14 grid grid-cols-1 items-end gap-y-5 lg:grid-cols-12 lg:gap-x-6">
          <div className="min-w-0 lg:col-span-8">
            <SectionLabel index={c.index}>{c.label}</SectionLabel>
            <h2 id="haberler-baslik" className="font-display text-h2 font-bold">
              {c.title}
            </h2>
          </div>
          <div className="flex min-w-0 lg:col-span-4 lg:justify-end">
            <Link href={c.allLink.href} prefetch={prefetchFor(c.allLink.href)} className={buttonClass('secondary', 'lg', '!min-h-12 !px-7 !py-3.5')}>
              {c.allLink.label}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-6">
          {/* manşet */}
          <article className="min-w-0 lg:col-span-7">
            <Link href={lead.href} prefetch={prefetchFor(lead.href)} className="block">
              <MediaFrame image={lead.image} label={lead.imageLabel} ratio="16/9" sizes="(min-width: 960px) 58vw, 100vw">
                <span className="absolute bottom-0 left-0 inline-flex items-center gap-2.5 bg-accent px-4 py-[9px] font-mono text-meta font-semibold uppercase text-white">
                  <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-white motion-safe:animate-blip" />
                  {lead.badge}
                </span>
              </MediaFrame>
              <p className="mb-3 mt-[22px] flex flex-wrap items-center gap-x-3.5 gap-y-2.5 font-mono text-meta font-semibold uppercase">
                <CategoryTag size="sm">{lead.category}</CategoryTag>
                <span className="text-ink-muted">{lead.time}</span>
                <span className="text-ink-muted">{lead.source}</span>
              </p>
              <h3 className="mb-3.5 font-display text-[clamp(26px,2.6vw,36px)] font-bold leading-[1.08] tracking-[-0.025em]">
                {lead.title}
              </h3>
              <p className="max-w-lead text-body leading-[1.7] text-ink-body">{lead.summary}</p>
            </Link>
          </article>

          {/* liste */}
          <div className="min-w-0 lg:col-span-5">
            <h3 className="mb-1 border-b-2 border-ink pb-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-ink">
              {c.latestLabel}
            </h3>
            <ul>
              {c.latest.map((n, i) => (
                <li key={i} className="border-b border-rule">
                  <Link href={n.href} prefetch={prefetchFor(n.href)} className="flex items-start gap-[18px] py-5">
                    <MediaFrame
                      image={n.image}
                      label="[GÖRSEL]"
                      ratio="4/3"
                      sizes="104px"
                      className="w-[104px] flex-none"
                      labelClassName="text-[9px] tracking-[0.14em]"
                    >
                      {n.video && (
                        <span
                          aria-hidden="true"
                          className="absolute left-1/2 top-1/2 flex h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink/[0.82]"
                        >
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="#fff">
                            <path d="M3 1.5 10 6l-7 4.5z" />
                          </svg>
                        </span>
                      )}
                    </MediaFrame>
                    <span className="min-w-0">
                      <span className="mb-2 flex flex-wrap gap-2.5 font-mono text-meta-xs font-semibold uppercase">
                        <CategoryTag>{n.category}</CategoryTag>
                        <span className="self-center text-ink-muted">{n.time}</span>
                      </span>
                      <span className="block font-display text-h3-list font-semibold">
                        {n.video && <span className="sr-only">Video: </span>}
                        {n.title}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* özel dosyalar */}
        <div className="mt-[72px] border-t-2 border-ink pt-10">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-ink">{c.dossiers.label}</h3>
            <p className="text-[14px] text-ink-muted">{c.dossiers.note}</p>
          </div>
          <div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">
            {c.dossiers.items.map((d, i) => (
              <article key={i}>
                <Link href={d.href} prefetch={prefetchFor(d.href)} className="block">
                  <MediaFrame image={d.image} ratio="3/2" sizes="(min-width: 960px) 33vw, 100vw" />
                  <p className="mb-2.5 mt-[18px] font-mono text-meta-xs font-semibold uppercase">
                    <CategoryTag>{d.tag}</CategoryTag>
                  </p>
                  <h4 className="mb-2.5 font-display text-h3-card font-semibold">{d.title}</h4>
                  <p className="text-small text-ink-mono">{d.text}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
