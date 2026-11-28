import type { Metadata } from 'next'
import Link from 'next/link'
import { AdSlot } from '@/components/header/AdSlot'
import { CategoryBlock } from '@/components/news/CategoryBlock'
import { LatestList } from '@/components/news/LatestList'
import { LeadStory } from '@/components/news/LeadStory'
import { NewsletterBox } from '@/components/news/NewsletterBox'
import { SponsoredCard } from '@/components/news/SponsoredCard'
import { buttonClass } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { emptyState, homeLabels } from '@/content/news'
import { alternates } from '@/i18n/config'
import { getPosts } from '@/lib/wp/client'
import { NEWS_CATEGORIES, type NewsPost } from '@/lib/wp/types'

export const metadata: Metadata = { alternates: alternates('home', 'tr') }
export const revalidate = 60

const cat = (slug: string) => NEWS_CATEGORIES.find((c) => c.slug === slug)!

/**
 * Haber ana sayfası — manşet + öne çıkanlar → son haberler → kategori blokları → bülten.
 * Aynı yazı sayfada iki kez görünmesin diye yukarıda gösterilenler aşağıdaki bloklardan çıkarılır.
 * WordPress'te yazı yokken boş durum gösterilir (canlıda boş sayfa yok).
 */
export default async function HomePage() {
  const [latest, gundem, turkiye, izmir, dunya, video, dosya, sponsored] = await Promise.all([
    getPosts({ first: 13 }),
    getPosts({ first: 8, category: 'gundem' }),
    getPosts({ first: 8, category: 'turkiye' }),
    getPosts({ first: 8, category: 'izmir-ve-ege' }),
    getPosts({ first: 8, category: 'dunya' }),
    getPosts({ first: 3, category: 'video' }),
    getPosts({ first: 3, category: 'ozel-dosyalar' }),
    getPosts({ first: 1, sponsored: true }),
  ])

  if (latest.length === 0) return <EmptyHome />

  // Manşet: en yeni "özel haber", yoksa en yeni yazı
  const lead = latest.find((p) => p.isExclusive) ?? latest[0]
  const rest = latest.filter((p) => p !== lead)
  const featured = rest.slice(0, 4)
  const recent = rest.slice(4, 10)
  const shown = new Set([lead, ...featured, ...recent].map((p) => p.id))
  const fresh = (posts: NewsPost[]) => {
    const out = posts.filter((p) => !shown.has(p.id)).slice(0, 3)
    out.forEach((p) => shown.add(p.id))
    return out
  }
  const blocks = [
    { category: cat('gundem'), posts: fresh(gundem) },
    { category: cat('turkiye'), posts: fresh(turkiye) },
    { category: cat('izmir-ve-ege'), posts: fresh(izmir) },
    { category: cat('dunya'), posts: fresh(dunya) },
  ].filter((b) => b.posts.length > 0)
  const sponsoredPost = sponsored[0]
  let n = 1
  const idx = () => String(n++).padStart(2, '0')

  return (
    <main>
      <h1 className="sr-only">{homeLabels.h1}</h1>

      <section aria-label="Manşet ve öne çıkanlar">
        <div className="shell py-[clamp(40px,4.5vw,64px)]">
          <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-6">
            <div className="min-w-0 lg:col-span-8">
              <LeadStory post={lead} variant="portal" as="h2" />
            </div>
            {featured.length > 0 && (
              <div className="min-w-0 lg:col-span-4">
                <LatestList posts={featured} title={homeLabels.featured} dense />
              </div>
            )}
          </div>
        </div>
      </section>

      <CategoryBlock index={idx()} title={homeLabels.latest} href="/son-dakika" posts={recent} max={6} />

      <AdSlot width={970} height={250} format="Billboard" placement="inline" />

      {blocks.map((b) => (
        <CategoryBlock key={b.category.slug} index={idx()} category={b.category} posts={b.posts} />
      ))}
      <CategoryBlock index={idx()} category={cat('video')} posts={video} tone="dark" />
      <CategoryBlock index={idx()} category={cat('ozel-dosyalar')} posts={dosya} tagLabel={homeLabels.dossierTag} />

      <section aria-label="Sponsorlu içerik ve bülten" className="border-t border-rule">
        <div className="shell py-section-sm">
          <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-6">
            {sponsoredPost && <SponsoredCard post={sponsoredPost} className="lg:col-span-7" />}
            <NewsletterBox className={sponsoredPost ? 'lg:col-span-5' : 'lg:col-span-6 lg:col-start-4'} />
          </div>
        </div>
      </section>
    </main>
  )
}

/** WordPress'te henüz yazı yok: yayın hazırlığı mesajı, kategoriler ve bülten. */
function EmptyHome() {
  return (
    <main>
      <h1 className="sr-only">{homeLabels.h1}</h1>
      <section aria-labelledby="yayin-baslik" className="surface-dark relative overflow-hidden bg-ink text-onDark">
        <div aria-hidden="true" className="absolute inset-0 bg-scan-dark" />
        <div className="shell relative py-section">
          <SectionLabel tone="dark">{emptyState.label}</SectionLabel>
          <h2 id="yayin-baslik" className="mb-6 max-w-[900px] font-display text-h1 font-bold text-white">
            {emptyState.title}
          </h2>
          <p className="mb-10 max-w-[680px] text-lead font-light text-onDark-muted">{emptyState.text}</p>
          <Link href={emptyState.cta.href} className={buttonClass('primary', 'lg')}>
            {emptyState.cta.label}
          </Link>
        </div>
      </section>
      <section aria-label="Bülten">
        <div className="shell py-section-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-6">
            <NewsletterBox className="lg:col-span-6 lg:col-start-4" />
          </div>
        </div>
      </section>
    </main>
  )
}
