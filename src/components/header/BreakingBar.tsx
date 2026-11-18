import Link from 'next/link'
import type { BreakingItem } from '@/content/site'
import { prefetchFor } from '@/lib/routes'

/**
 * Header 5. katman (46px): son dakika. Kayar.
 * `items` boşsa hiç render edilmez — yayın tarafı hazır değilse ilk sürümde böyle bırakın.
 * Dar ekranda yalnızca ilk manşet görünür.
 */
export function BreakingBar({ items }: { items: readonly BreakingItem[] }) {
  if (items.length === 0) return null
  const [first, ...rest] = items

  return (
    <section aria-label="Son dakika" className="surface-dark glass-fx relative z-20 bg-glass">
      <div className="shell flex min-h-[46px] flex-wrap items-center gap-x-5">
        {/* Kırmızı blok kabın sol kenarına taşar: negatif kenar boşluğu = kenar boşluğu */}
        <span className="-ml-edge inline-flex items-center self-stretch bg-accent px-4 font-mono text-meta font-semibold uppercase text-white">
          <span className="pl-edge">Son dakika</span>
        </span>
        <Link href={first.href} prefetch={prefetchFor(first.href)} className="inline-flex min-h-[46px] min-w-0 items-center gap-3 text-[14px] text-white">
          <span className="font-mono text-[11px] text-onDark-glass">{first.time}</span>
          {first.title}
        </Link>
        {rest.slice(0, 1).map((it) => (
          <Link key={it.href + it.title} href={it.href} prefetch={prefetchFor(it.href)} className="hidden min-h-[46px] items-center gap-3 text-[14px] text-onDark-glass lg:inline-flex">
            <span aria-hidden="true" className="h-3.5 w-px bg-white/20" />
            {it.title}
          </Link>
        ))}
      </div>
    </section>
  )
}
