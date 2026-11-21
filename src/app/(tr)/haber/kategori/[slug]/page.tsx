import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CategoryStrip } from '@/components/news/CategoryStrip'
import { LatestList } from '@/components/news/LatestList'
import { LeadStory } from '@/components/news/LeadStory'
import { CardGrid, NewsCard } from '@/components/news/NewsCard'
import { ogDefaults } from '@/lib/seo'
import { getPosts } from '@/lib/wp/client'
import { NEWS_CATEGORIES } from '@/lib/wp/types'

export const revalidate = 60

export function generateStaticParams() {
  return NEWS_CATEGORIES.map((c) => ({ slug: c.slug }))
}
export const dynamicParams = false

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const c = NEWS_CATEGORIES.find((x) => x.slug === slug)
  if (!c) return {}
  return {
    title: `${c.name} haberleri`,
    alternates: { canonical: `/haber/kategori/${c.slug}` },
    openGraph: { ...ogDefaults, title: `${c.name} – ELIS360 NEWS`, url: `/haber/kategori/${c.slug}` },
  }
}

/**
 * Kategori sayfası. Referansta ayrı tasarımı yok: haber.html'in manşet + liste + kart ızgarası
 * kalıpları kategoriye süzülerek kullanıldı.
 */
export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = NEWS_CATEGORIES.find((x) => x.slug === slug)
  if (!category) notFound()
  const posts = await getPosts({ first: 24, category: slug })
  const [lead, ...rest] = posts
  const side = rest.slice(0, 4)
  const grid = rest.slice(4)

  return (
    <main>
      <CategoryStrip active={slug} />
      <div className="shell py-[clamp(40px,4.5vw,64px)]">
        <h1 className="mb-9 flex items-baseline gap-3.5 border-b-2 border-ink pb-[18px] font-display text-h2-block font-bold">{category.name}</h1>
        {!lead && <p className="text-ink-muted">Bu kategoride henüz haber yok.</p>}
        {lead && (
          <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-6">
            <div className="min-w-0 lg:col-span-8">
              <LeadStory post={lead} variant="portal" as="h2" />
            </div>
            {side.length > 0 && (
              <div className="min-w-0 lg:col-span-4">
                <LatestList posts={side} title="Diğer haberler" dense />
              </div>
            )}
          </div>
        )}
        {grid.length > 0 && (
          <div className="mt-section-sm border-t-2 border-ink pt-10">
            <CardGrid>
              {grid.map((p) => (
                <NewsCard key={p.id} post={p} />
              ))}
            </CardGrid>
          </div>
        )}
      </div>
    </main>
  )
}
