import Link from 'next/link'
import { CardGrid, NewsCard } from './NewsCard'
import type { NewsCategory, NewsPost } from '@/lib/wp/types'

/**
 * Kategori bloğu: numaralı başlık + "Tümü →" + 3 kart. `tone="dark"` video bloğu (§ haber.html 03 — Video).
 * Kategoride yazı yoksa hiç render edilmez.
 */
export function CategoryBlock({ index, category, posts, tone = 'light' }: { index: string; category: NewsCategory; posts: NewsPost[]; tone?: 'light' | 'dark' }) {
  if (posts.length === 0) return null
  const dark = tone === 'dark'
  const id = `blok-${category.slug}`
  return (
    <section aria-labelledby={id} className={dark ? 'surface-dark bg-ink text-onDark' : undefined}>
      <div className="shell py-section-sm">
        <div className={`mb-9 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-b-2 pb-[18px] ${dark ? 'border-accent-light' : 'border-ink'}`}>
          <h2 id={id} className={`flex items-baseline gap-3.5 font-display text-h2-block font-bold ${dark ? 'text-white' : ''}`}>
            <span className={`font-mono text-[12px] font-semibold tracking-[0.22em] ${dark ? 'text-accent-light' : 'text-accent'}`}>{index}</span>
            {category.name}
          </h2>
          <Link
            href={`/haber/kategori/${category.slug}`}
            className={`-my-3 inline-flex items-center py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.16em] ${dark ? 'text-onDark-glass' : 'text-ink-muted'}`}
          >
            Tümü →<span className="sr-only"> {category.name} haberleri</span>
          </Link>
        </div>
        <CardGrid>
          {posts.slice(0, 3).map((p) => (
            <NewsCard key={p.id} post={p} variant={dark ? 'video' : 'default'} />
          ))}
        </CardGrid>
      </div>
    </section>
  )
}
