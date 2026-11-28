import { LogoMark } from '@/components/ui/LogoMark'
import { MediaFrame } from '@/components/ui/MediaFrame'
import type { NewsPost } from '@/lib/wp/types'

/**
 * Haber görseli; video ise ortada oynatma işareti.
 * Görseli olmayan yazıda gri yer tutucu yerine markalı koyu kutu (amblem) çizilir — canlıda da düzgün görünür.
 */
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
  if (!post.image) {
    return (
      <div className={`surface-dark relative overflow-hidden bg-ink ${className ?? ''}`} style={{ aspectRatio: ratio }}>
        <div aria-hidden="true" className="absolute inset-0 bg-scan-dark" />
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
          <LogoMark size={size === 'sm' ? 28 : size === 'md' ? 44 : 64} className="opacity-60" />
        </div>
        {post.videoUrl && <PlayBadge size={size} play={play} icon={icon} />}
        {children}
      </div>
    )
  }
  return (
    <MediaFrame
      image={post.image}
      label={label}
      ratio={ratio}
      sizes={sizes}
      className={`${tone === 'dark' && !post.image ? '[&>div]:!bg-[#2A3038] [&>div]:!text-onDark-glass' : ''} ${className ?? ''}`}
      labelClassName={size === 'sm' ? 'text-[9px] tracking-[0.14em]' : 'text-[11px] tracking-[0.2em]'}
    >
      {post.videoUrl && <PlayBadge size={size} play={play} icon={icon} />}
      {children}
    </MediaFrame>
  )
}

function PlayBadge({ size, play, icon }: { size: 'sm' | 'md' | 'lg'; play: string; icon: number }) {
  return (
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
  )
}
