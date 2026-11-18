import Link from 'next/link'
import { NewsMeta } from './NewsMeta'
import { NewsThumb } from './NewsThumb'
import type { NewsPost } from '@/lib/wp/types'

/**
 * Manşet. `variant="portal"`: haber sayfası (h1, 8 sütun). `variant="home"`: ana sayfa (h3, 7 sütun).
 * "Özel haber" rozeti yalnızca isExclusive olan yazıda.
 */
export function LeadStory({ post, variant, as: H = 'h2' }: { post: NewsPost; variant: 'portal' | 'home'; as?: 'h1' | 'h2' | 'h3' }) {
  const portal = variant === 'portal'
  return (
    <article>
      <Link href={`/haber/${post.slug}`} className="block">
        <NewsThumb post={post} ratio="16/9" sizes={portal ? '(min-width: 960px) 66vw, 100vw' : '(min-width: 960px) 58vw, 100vw'} label="[Manşet görseli]" size="lg">
          {post.isExclusive && (
            <span
              className={`absolute bottom-0 left-0 inline-flex items-center gap-2.5 bg-accent font-mono text-meta font-semibold uppercase text-white ${
                portal ? 'px-[18px] py-2.5' : 'px-4 py-[9px]'
              }`}
            >
              <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-white motion-safe:animate-blip" />
              Özel haber
            </span>
          )}
        </NewsThumb>
        <NewsMeta post={post} size="sm" source="ELIS360 NEWS" className={portal ? 'mb-3.5 mt-6' : 'mb-3 mt-[22px]'} />
        <H
          className={
            portal
              ? 'mb-4 font-display text-h1-news font-bold'
              : 'mb-3.5 font-display text-[clamp(26px,2.6vw,36px)] font-bold leading-[1.08] tracking-[-0.025em]'
          }
        >
          {post.title}
        </H>
        {post.excerpt && (
          <p className={portal ? 'max-w-[720px] text-[17px] leading-[1.65] text-ink-body' : 'max-w-lead text-body leading-[1.7] text-ink-body'}>
            {post.excerpt}
          </p>
        )}
      </Link>
    </article>
  )
}
