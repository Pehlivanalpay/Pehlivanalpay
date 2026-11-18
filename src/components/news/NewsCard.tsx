import Link from 'next/link'
import { NewsMeta } from './NewsMeta'
import { NewsThumb } from './NewsThumb'
import type { NewsPost } from '@/lib/wp/types'

/** Kart: 3:2 görsel, etiket, başlık, spot. Video kartı koyu zeminde 16:9 ve süreyle. */
export function NewsCard({
  post,
  variant = 'default',
  headingLevel = 3,
  tagLabel,
}: {
  post: NewsPost
  variant?: 'default' | 'video'
  headingLevel?: 3 | 4
  /** Verilirse yalnızca bu etiket gösterilir, saat gizlenir (ana sayfa "Özel dosya" kartları). */
  tagLabel?: string
}) {
  const H = headingLevel === 3 ? 'h3' : 'h4'
  const video = variant === 'video'
  return (
    <article>
      <Link href={`/haber/${post.slug}`} className="block">
        <NewsThumb
          post={post}
          ratio={video ? '16/9' : '3/2'}
          sizes="(min-width: 960px) 33vw, 100vw"
          label={video ? '[Video görseli]' : '[Görsel]'}
          size={video ? 'lg' : 'md'}
          tone={video ? 'dark' : 'light'}
        />
        <NewsMeta post={post} tone={video ? 'dark' : 'light'} showDuration={video} label={tagLabel} hideTime={!video} className={video ? 'mb-2.5 mt-4' : 'mb-2.5 mt-[18px]'} />
        <H className={`font-display font-semibold ${video ? 'text-[20px] leading-[1.2] tracking-[-0.015em] text-white' : 'mb-2.5 text-h3-card'}`}>{post.title}</H>
        {!video && post.excerpt && <p className="text-small text-ink-mono">{post.excerpt}</p>}
      </Link>
    </article>
  )
}

/** Akışkan kart ızgarası (§3): repeat(auto-fit, minmax(min(300px,100%), 1fr)), aralık 32px. */
export function CardGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">{children}</div>
}
