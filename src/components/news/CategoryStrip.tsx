import Link from 'next/link'
import { NEWS_CATEGORIES } from '@/lib/wp/types'

/** Haber kategorileri şeridi (haber.html). Aktif kategori kırmızı alt çizgili. */
export function CategoryStrip({ active }: { active?: string }) {
  return (
    <nav aria-label="Haber kategorileri" className="border-b border-rule bg-paper">
      <ul className="shell flex flex-wrap items-center gap-x-8 font-mono text-[13px] font-semibold uppercase tracking-[0.12em]">
        {NEWS_CATEGORIES.map((c) => {
          const on = c.slug === active
          return (
            <li key={c.slug}>
              <Link
                href={`/haber/kategori/${c.slug}`}
                aria-current={on ? 'page' : undefined}
                className={`inline-flex min-h-[52px] items-center ${on ? 'text-ink shadow-[inset_0_-3px_0_#C41E2A]' : 'text-ink-mono'}`}
              >
                {c.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
