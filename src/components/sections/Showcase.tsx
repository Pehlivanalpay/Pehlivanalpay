import Image from 'next/image'
import Link from 'next/link'
import { CategoryTag } from '@/components/ui/CategoryTag'
import type { projeler } from '@/content/pages'
import { blurProps } from '@/content/images'

/**
 * Haberler sayfası vitrini (PDF s.7): büyük "ana haber görseli" + vitrin proje metni (görselin
 * DIŞINDA — fotoğrafa yazı basılmaz), sağda üç kısa proje.
 */
export function Showcase({ content: c }: { content: Pick<typeof projeler, 'showcase' | 'side'> }) {
  const s = c.showcase
  return (
    <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-6">
      <article className="min-w-0 lg:col-span-8">
        <div className="relative aspect-[16/9] overflow-hidden bg-ink">
          <Image src={s.image.src} alt={s.image.alt} fill priority {...blurProps(s.image)} sizes="(min-width: 960px) 66vw, 100vw" className="object-cover" />
        </div>
        <p className="mb-3 mt-6 font-mono text-label font-semibold uppercase text-accent">{s.label}</p>
        <h2 className="mb-3.5 font-display text-[clamp(26px,2.6vw,36px)] font-bold leading-[1.1] tracking-[-0.025em]">{s.title}</h2>
        <p className="max-w-lead text-body leading-[1.7] text-ink-body">{s.text}</p>
      </article>
      <ul className="min-w-0 lg:col-span-4">
        {c.side.map((p) => (
          <li key={p.tag} className="border-b border-rule first:border-t-2 first:border-t-ink">
            <Link href={p.href} className="flex items-start gap-[18px] py-5">
              <span className="relative block aspect-[4/3] w-[120px] flex-none overflow-hidden bg-ink">
                <Image src={p.image.src} alt="" fill {...blurProps(p.image)} sizes="120px" className="object-cover" />
              </span>
              <span className="min-w-0">
                <CategoryTag className="mb-2.5">{p.tag}</CategoryTag>
                <span className="block font-display text-h3-list font-semibold">{p.title}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
