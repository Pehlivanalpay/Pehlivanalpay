import type { Metadata } from 'next'
import { AdSlot } from '@/components/header/AdSlot'
import { CategoryBlock } from '@/components/news/CategoryBlock'
import { CategoryStrip } from '@/components/news/CategoryStrip'
import { LatestList } from '@/components/news/LatestList'
import { LeadStory } from '@/components/news/LeadStory'
import { NewsletterBox } from '@/components/news/NewsletterBox'
import { SponsoredCard } from '@/components/news/SponsoredCard'
import { ogDefaults } from '@/lib/seo'
import { redirect } from 'next/navigation'
import { getPosts } from '@/lib/wp/client'
import { NEWS_CATEGORIES } from '@/lib/wp/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Haber',
  description: 'ELIS360 NEWS haber: sahadan özel görüntüler ve dosyalar. Gündem, Türkiye, İzmir ve Ege, Dünya, video.',
  alternates: { canonical: '/haber' },
  openGraph: { ...ogDefaults, title: 'Haber – ELIS360 NEWS', url: '/haber' },
}

const cat = (slug: string) => NEWS_CATEGORIES.find((c) => c.slug === slug)!

/** Haber portalı — docs/reference/haber.html */
export default async function HaberPage() {
  const [latest, izmir, dunya, video, sponsored] = await Promise.all([
    getPosts({ first: 12 }),
    getPosts({ first: 3, category: 'izmir-ve-ege' }),
    getPosts({ first: 3, category: 'dunya' }),
    getPosts({ first: 3, category: 'video' }),
    getPosts({ first: 1, sponsored: true }),
  ])
  // Henüz yazı yoksa boş sayfa göstermek yerine Projeler'e (müşteri isteği, 2026-11-23)
  if (latest.length === 0) redirect('/projeler')
  // Manşet: en yeni "özel haber", yoksa en yeni yazı
  const lead = latest.find((p) => p.isExclusive) ?? latest[0]
  const rest = latest.filter((p) => p !== lead).slice(0, 5)
  const sponsoredPost = sponsored[0]

  return (
    <main>
      <h1 className="sr-only">ELIS360 NEWS Haber</h1>
      <CategoryStrip active="gundem" />

      <section aria-label="Manşet ve son eklenenler">
        <div className="shell py-[clamp(40px,4.5vw,64px)]">
          {lead ? (
            <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-6">
              <div className="min-w-0 lg:col-span-8">
                <LeadStory post={lead} variant="portal" as="h2" />
              </div>
              <div className="min-w-0 lg:col-span-4">
                <LatestList posts={rest} dense />
              </div>
            </div>
          ) : (
            <p className="text-ink-muted">Henüz yayımlanmış haber yok.</p>
          )}
        </div>
      </section>

      <AdSlot width={970} height={250} format="Billboard" placement="inline" />

      <CategoryBlock index="01" category={cat('izmir-ve-ege')} posts={izmir} />
      <CategoryBlock index="02" category={cat('dunya')} posts={dunya} />
      <CategoryBlock index="03" category={cat('video')} posts={video} tone="dark" />

      <section aria-label="Sponsorlu içerik ve bülten">
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
