import Link from 'next/link'
import { CardGrid, NewsCard } from './NewsCard'
import type { NewsCategory, NewsPost } from '@/lib/wp/types'

/**
 * Bölüm bloğu: numaralı başlık + "Tümü →" + kartlar. `tone="dark"` video bloğu (haber.html 03 — Video).
 * Kategoride yazı yoksa hiç render edilmez. `title`/`href` verilirse kategori dışı bölüm (ör. Son haberler).
 */
export function CategoryBlock({
  index,
  category,
  posts,
  tone = 'light',
  title,
  href,
  max = 3,
  tagLabel,
}: {
  index: string
  category?: NewsCategory
  posts: NewsPost[]
  tone?: 'light' | 'dark'
  title?: string
  href?: string
  max?: number
  tagLabel?: string
}) {
  if (posts.length === 0) return null
  const dark = tone === 'dark'
  const name = title ?? category?.name ?? ''
  const link = href ?? (category ? `/${category.slug}` : undefined)
  const id = `blok-${category?.slug ?? index}`
  return (
    <section aria-labelledby={id} className={dark ? 'surface-dark bg-ink text-onDark' : 'border-t border-rule first:border-t-0'}>
      <div className="shell py-section-sm">
        <div className={`mb-9 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-b-2 pb-[18px] ${dark ? 'border-accent-light' : 'border-ink'}`}>
          <h2 id={id} className={`flex items-baseline gap-3.5 font-display text-h2-block font-bold ${dark ? 'text-white' : ''}`}>
            <span className={`font-mono text-[12px] font-semibold tracking-[0.22em] ${dark ? 'text-accent-light' : 'text-accent'}`}>{index}</span>
            {name}
          </h2>
          {link && (
            <Link
              href={link}
              className={`-my-3 inline-flex items-center py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.16em] ${dark ? 'text-onDark-glass' : 'text-ink-muted'}`}
            >
              Tümü →<span className="sr-only"> {name} haberleri</span>
            </Link>
          )}
        </div>
        <CardGrid>
          {posts.slice(0, max).map((p) => (
            <NewsCard key={p.id} post={p} variant={dark ? 'video' : 'default'} tagLabel={tagLabel} />
          ))}
        </CardGrid>
      </div>
    </section>
  )
}
