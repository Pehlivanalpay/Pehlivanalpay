import { CategoryTag } from '@/components/ui/CategoryTag'
import { newsTime } from '@/lib/format'
import type { NewsPost } from '@/lib/wp/types'

/** Kategori etiketi + saat (+ isteğe bağlı kaynak). */
export function NewsMeta({
  post,
  tone = 'light',
  size = 'xs',
  source,
  showDuration = false,
  hideTime = false,
  label: labelOverride,
  className = '',
}: {
  post: NewsPost
  tone?: 'light' | 'dark'
  size?: 'xs' | 'sm'
  source?: string
  /** Video bloklarında saat yerine süre (04:32). */
  showDuration?: boolean
  hideTime?: boolean
  /** Etiket metnini değiştir (ör. "Özel dosya"). */
  label?: string
  className?: string
}) {
  const muted = tone === 'dark' ? 'text-onDark-glass' : 'text-ink-muted'
  const label = labelOverride ?? (post.videoUrl && post.category?.slug !== 'video' ? 'Video' : post.category?.name)
  return (
    <span className={`flex flex-wrap items-center gap-x-3.5 gap-y-2.5 font-mono font-semibold uppercase ${size === 'xs' ? 'text-meta-xs' : 'text-meta'} ${className}`}>
      {label && (
        <CategoryTag tone={tone} size={size === 'xs' ? 'xs' : 'sm'} className="!px-2.5 !py-[5px] !text-meta-xs">
          {label}
        </CategoryTag>
      )}
      {!hideTime && (
        <time dateTime={post.date} className={`tracking-[0.2em] ${muted}`}>
          {showDuration && post.videoDuration ? post.videoDuration : newsTime(post.date)}
        </time>
      )}
      {source && <span className={muted}>{source}</span>}
    </span>
  )
}
