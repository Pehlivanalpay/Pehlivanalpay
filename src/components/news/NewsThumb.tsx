import { MediaFrame } from '@/components/ui/MediaFrame'
import type { NewsPost } from '@/lib/wp/types'

/** Haber görseli; video ise ortada oynatma işareti. Görsel yoksa gri yer tutucu (MediaFrame). */
export function NewsThumb({
  post,
  ratio,
  sizes,
  label = '[Görsel]',
  size = 'md',
  tone = 'light',
  className,
  children,
}: {
  post: NewsPost
  ratio: string
  sizes: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
  tone?: 'light' | 'dark'
  className?: string
  children?: React.ReactNode
}) {
  const play = { sm: 'h-[30px] w-[30px]', md: 'h-[44px] w-[44px]', lg: 'h-[52px] w-[52px]' }[size]
  const icon = { sm: 11, md: 15, lg: 18 }[size]
  return (
    <MediaFrame
      image={post.image}
      label={label}
      ratio={ratio}
      sizes={sizes}
      className={`${tone === 'dark' && !post.image ? '[&>div]:!bg-[#2A3038] [&>div]:!text-onDark-glass' : ''} ${className ?? ''}`}
      labelClassName={size === 'sm' ? 'text-[9px] tracking-[0.14em]' : 'text-[11px] tracking-[0.2em]'}
    >
      {post.videoUrl && (
        <span
          aria-hidden="true"
          className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${play} ${
            size === 'lg' ? 'bg-white/[0.92]' : 'bg-ink/[0.82]'
          }`}
        >
          <svg width={icon} height={icon} viewBox="0 0 12 12" fill={size === 'lg' ? '#0B0D10' : '#fff'}>
            <path d="M3 1.5 10 6l-7 4.5z" />
          </svg>
        </span>
      )}
      {children}
    </MediaFrame>
  )
}
