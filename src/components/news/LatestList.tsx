import Link from 'next/link'
import { NewsMeta } from './NewsMeta'
import { NewsThumb } from './NewsThumb'
import type { NewsPost } from '@/lib/wp/types'

/** "Son eklenenler" — küçük görsel + etiket + başlık. */
export function LatestList({ posts, title = 'Son eklenenler', dense = false }: { posts: NewsPost[]; title?: string; dense?: boolean }) {
  return (
    <div className="min-w-0">
      <h2 className="mb-1 border-b-2 border-ink pb-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-ink">{title}</h2>
      <ul>
        {posts.map((p) => (
          <li key={p.id} className="border-b border-rule">
            <Link href={`/haber/${p.slug}`} className={`flex items-start gap-[18px] ${dense ? 'py-[18px]' : 'py-5'}`}>
              <NewsThumb post={p} ratio="4/3" sizes="104px" label="[GÖRSEL]" size="sm" className="w-[104px] flex-none" />
              <span className="min-w-0">
                <NewsMeta post={p} className="mb-2" />
                <span className="block font-display text-h3-list font-semibold">
                  {p.videoUrl && <span className="sr-only">Video: </span>}
                  {p.title}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
