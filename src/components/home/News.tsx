import Link from 'next/link'
import { LatestList } from '@/components/news/LatestList'
import { LeadStory } from '@/components/news/LeadStory'
import { CardGrid, NewsCard } from '@/components/news/NewsCard'
import { buttonClass } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { news as Content } from '@/content/home'
import type { NewsPost } from '@/lib/wp/types'

/** 04 — Haberler. Veri WordPress'ten (lib/wp/client); bağlı değilken örnek veri. */
export function News({
  content: c,
  lead,
  latest,
  dossiers,
}: {
  content: typeof Content
  lead: NewsPost | undefined
  latest: NewsPost[]
  dossiers: NewsPost[]
}) {
  if (!lead) return null
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
            <Link href={c.allLink.href} className={buttonClass('secondary', 'lg', '!min-h-12 !px-7 !py-3.5')}>
              {c.allLink.label}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-6">
          <div className="min-w-0 lg:col-span-7">
            <LeadStory post={lead} variant="home" as="h3" />
          </div>
          <div className="min-w-0 lg:col-span-5">
            <LatestList posts={latest} title={c.latestLabel} />
          </div>
        </div>

        {dossiers.length > 0 && (
          <div className="mt-[72px] border-t-2 border-ink pt-10">
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-ink">{c.dossiers.label}</h3>
              <p className="text-[14px] text-ink-muted">{c.dossiers.note}</p>
            </div>
            <CardGrid>
              {dossiers.map((d) => (
                <NewsCard key={d.id} post={d} headingLevel={4} tagLabel="Özel dosya" />
              ))}
            </CardGrid>
          </div>
        )}
      </div>
    </section>
  )
}
