import Link from 'next/link'
import { newsTime } from '@/lib/format'
import { getPosts } from '@/lib/wp/client'

/**
 * Header 5. katman (46px): son dakika. Kayar (yapışkan değil), animasyon yok (tasarım kuralı: kayan yazı yok).
 * WordPress'te "Son dakika" kutusu işaretli yazı yoksa hiç çizilmez.
 * Dar ekranda yalnızca ilk başlık görünür; geniş ekranda ikinci başlık da.
 */
export async function BreakingBar() {
  let items: Awaited<ReturnType<typeof getPosts>> = []
  try {
    items = await getPosts({ first: 2, breaking: true })
  } catch {
    return null // WordPress'e ulaşılamazsa header bozulmasın
  }
  if (items.length === 0) return null
  const [first, second] = items

  return (
    <section aria-label="Son dakika şeridi" className="surface-dark glass-fx relative z-20 bg-glass">
      <div className="shell flex min-h-[46px] flex-wrap items-center gap-x-5">
        {/* Kırmızı blok kabın sol kenarına taşar: negatif kenar boşluğu = kenar boşluğu */}
        <Link href="/son-dakika" className="-ml-edge inline-flex items-center self-stretch bg-accent px-4 font-mono text-meta font-semibold uppercase text-white">
          <span className="pl-edge">Son dakika</span>
        </Link>
        <Link href={`/haber/${first.slug}`} className="inline-flex min-h-[46px] min-w-0 flex-1 items-center gap-3 text-[14px] text-white lg:flex-none">
          <time dateTime={first.date} className="hidden font-mono text-[11px] text-onDark-glass sm:inline">
            {newsTime(first.date)}
          </time>
          <span className="line-clamp-2 min-w-0 py-1.5 leading-snug lg:line-clamp-1">{first.title}</span>
        </Link>
        {second && (
          <Link href={`/haber/${second.slug}`} className="hidden min-h-[46px] items-center gap-3 text-[14px] text-onDark-glass lg:inline-flex">
            <span aria-hidden="true" className="h-3.5 w-px bg-white/20" />
            {second.title}
          </Link>
        )}
      </div>
    </section>
  )
}
