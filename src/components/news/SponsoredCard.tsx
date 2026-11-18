import Link from 'next/link'
import { MediaFrame } from '@/components/ui/MediaFrame'
import type { NewsPost } from '@/lib/wp/types'

/**
 * Sponsorlu içerik kartı.
 * EDİTORYAL YÜKÜMLÜLÜK: "Sponsorlu içerik" etiketi her zaman görünür — prop'la kapatılamaz,
 * içerikten bağımsız sabit metindir. Bu bileşeni değiştirirken etiketi kaldırmayın.
 */
export function SponsoredCard({ post, className = '' }: { post: NewsPost; className?: string }) {
  return (
    <article className={`flex min-w-0 flex-wrap gap-7 border border-ink/[0.22] p-7 ${className}`}>
      <div className="min-w-0 flex-[1_1_220px]">
        <Link href={`/haber/${post.slug}`} tabIndex={-1} aria-hidden="true" className="block">
          <MediaFrame image={post.image} ratio="4/3" sizes="(min-width: 960px) 25vw, 100vw" />
        </Link>
      </div>
      <div className="min-w-0 flex-[1.2_1_260px]">
        <p className="mb-3.5">
          <span className="inline-block border-[1.5px] border-ink px-[11px] py-[5px] font-mono text-meta-xs font-semibold uppercase">
            Sponsorlu içerik
          </span>
          {post.sponsorName && <span className="ml-3 font-mono text-meta-xs uppercase tracking-[0.2em] text-ink-muted">{post.sponsorName}</span>}
        </p>
        <h3 className="mb-2.5 font-display text-[24px] font-semibold leading-[1.18] tracking-[-0.015em]">
          <Link href={`/haber/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-small text-ink-mono">Reklam ve sponsorlu içerikler açıkça etiketlenir. Haber kararını editoryal ekip verir.</p>
      </div>
    </article>
  )
}
