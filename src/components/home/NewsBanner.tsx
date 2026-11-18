import Link from 'next/link'
import { buttonClass } from '@/components/ui/Button'
import type { newsBanner as Content } from '@/content/home'
import { prefetchFor } from '@/lib/routes'

/** Haber sitesine geçiş şeridi — surface-dark. */
export function NewsBanner({ content: c }: { content: typeof Content }) {
  return (
    <section aria-label={c.label} className="surface-dark bg-glass-surface text-onDark">
      <div className="shell flex flex-wrap items-center justify-between gap-x-12 gap-y-6 py-11">
        <div className="min-w-0 flex-[1_1_440px]">
          <p className="mb-2.5 flex items-center gap-2.5 font-mono text-label font-semibold uppercase text-[#99A1AD]">
            <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-accent-light motion-safe:animate-blip" />
            {c.label}
          </p>
          <p className="font-display text-[28px] font-semibold leading-[1.2] tracking-[-0.015em] text-white">{c.text}</p>
        </div>
        <Link href={c.link.href} prefetch={prefetchFor(c.link.href)} className={buttonClass('secondary-dark', 'lg')}>
          {c.link.label}
        </Link>
      </div>
    </section>
  )
}
