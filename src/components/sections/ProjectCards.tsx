import Image from 'next/image'
import Link from 'next/link'
import type { ProjectCard } from '@/content/pages'

/** Kurum adı gerektirmeyen proje kartları (PDF s.7). Akışkan ızgara: auto-fit, en dar 300px. */
export function ProjectCards({ cards, headingLevel = 3 }: { cards: readonly ProjectCard[]; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <ul className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">
      {cards.map((c) => (
        <li key={c.title} className="min-w-0">
          <Link href={c.href ?? '/haberler'} className="block">
            <div className="relative aspect-[3/2] overflow-hidden bg-ink">
              <Image
                src={c.image.src}
                alt={c.image.alt}
                fill
                sizes="(min-width: 960px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="border-t-2 border-accent pt-4">
              <H className="mb-1.5 mt-1 font-mono text-[13px] font-semibold uppercase tracking-[0.16em]">{c.title}</H>
              <p className="text-small text-ink-mono">{c.text}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
