import Link from 'next/link'
import { ButtonLink } from '@/components/ui/Button'
import { SearchIcon } from '@/components/ui/icons'

type MastheadProps = {
  /** Arama formunun gönderileceği yol (GET, `q` parametresi). Faz 2: WPGraphQL arama. */
  searchAction?: string
  ctaLabel?: string
  ctaHref?: string
}

/** Header 3. katman (88px): logo, arama, "Teklif alın". Kayar. */
export function Masthead({ searchAction = '/ara', ctaLabel = 'Teklif alın', ctaHref = '/iletisim' }: MastheadProps) {
  return (
    <div className="shell flex min-h-[88px] flex-wrap items-center justify-between gap-x-10 gap-y-3.5 py-3.5">
      <Link href="/" aria-label="ELIS360 NEWS ana sayfa" className="inline-flex min-h-11 items-center gap-[11px]">
        <span className="font-display text-[30px] font-bold leading-none tracking-[0.11em] text-white">
          ELIS<span className="text-accent-light">360</span>
        </span>
        <span className="font-mono text-[14px] font-medium tracking-[0.32em] text-onDark-glass">NEWS</span>
      </Link>

      <form
        role="search"
        action={searchAction}
        method="get"
        className="flex max-w-[460px] flex-[1_1_300px] items-stretch border border-white/25 bg-white/[0.06]"
      >
        <label htmlFor="site-search" className="sr-only">
          Sitede ara
        </label>
        <input
          id="site-search"
          name="q"
          type="search"
          placeholder="Hizmet, saha veya haber arayın"
          className="h-[46px] min-w-0 flex-1 border-0 bg-transparent px-[15px] font-sans text-[14px] text-white placeholder:text-[#99A1AD] focus-visible:outline-offset-0"
        />
        <button
          type="submit"
          aria-label="Ara"
          className="flex min-h-[46px] w-12 cursor-pointer items-center justify-center border-0 border-l border-white/20 bg-transparent text-white"
        >
          <SearchIcon />
        </button>
      </form>

      <ButtonLink href={ctaHref} size="md">
        {ctaLabel}
      </ButtonLink>
    </div>
  )
}
