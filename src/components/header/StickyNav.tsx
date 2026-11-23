'use client'

/*
 * ─── YAPIŞKAN NAVİGASYON — YAPI KURALI ──────────────────────────────────────
 * Bu bileşen <header> elemanının İÇİNE KONMAMALI; sayfa kökünün (<body>)
 * doğrudan çocuğu olarak render edilir (bkz. src/app/layout.tsx).
 *
 * Neden: `position: sticky` yalnızca kendi ebeveyninin sınırları içinde
 * yapışır. Nav <header>'ın içinde olsaydı, header ekrandan çıktığı anda nav da
 * onunla birlikte giderdi. Kökün çocuğu olduğunda ebeveyn tüm sayfadır ve nav
 * sayfa boyunca üstte kalır. Header'ın diğer dört katmanı (reklam, servis barı,
 * logo satırı, son dakika) normal akışta kayar.
 * ───────────────────────────────────────────────────────────────────────────
 */

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { CloseIcon, MenuIcon } from '@/components/ui/icons'
import type { NavItem } from '@/content/site'
import { LOCALES, switchPath, type Locale } from '@/i18n/config'
import { ui } from '@/i18n/ui'
import { prefetchFor } from '@/lib/routes'

type StickyNavProps = {
  items: readonly NavItem[]
  locale: Locale
}

export function StickyNav({ items, locale }: StickyNavProps) {
  const pathname = usePathname()
  const t = ui(locale).nav
  const langs: Locale[] = locale === 'en' ? ['tr', 'en'] : LOCALES
  const home = locale === 'en' ? '/en' : '/'
  // Menü, açıldığı sayfanın yolunu tutar; sayfa değişince kendiliğinden kapanmış sayılır.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const setOpen = (v: boolean) => setOpenOn(v ? pathname : null)
  const panelId = useId()
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenOn(null)
        btnRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const isCurrent = (href: string) =>
    !href.includes('#') && (href === home ? pathname === home : pathname.startsWith(href))

  return (
    <div className="surface-dark glass-fx sticky top-0 z-40 border-y border-b-white/[0.12] border-t-white/10 bg-glass-nav">
      <div className="shell flex min-h-[58px] flex-wrap items-center justify-between gap-x-8">
        <nav aria-label={t.main} className="flex flex-wrap items-center gap-x-[30px] font-mono text-nav font-semibold uppercase text-white">
          <button
            ref={btnRef}
            type="button"
            aria-label={open ? t.close : t.open}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen(!open)}
            className="-ml-3 flex h-11 w-11 cursor-pointer items-center justify-center border-0 bg-transparent text-white"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
          {/* 960px altında satır içi bağlantılar gizlenir; hamburger paneli devralır. */}
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              prefetch={prefetchFor(it.href)}
              aria-current={isCurrent(it.href) ? 'page' : undefined}
              className="hidden min-h-[58px] items-center gap-[9px] aria-[current=page]:shadow-[inset_0_-3px_0_#F2667D] lg:inline-flex"
            >
              {it.live && <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent-light motion-safe:animate-blip" />}
              {it.label}
            </Link>
          ))}
        </nav>

        {/* Dil anahtarı: bulunduğun sayfanın diğer dildeki karşılığı (i18n/config → ROUTES).
            EN yayında değilken (EN_LIVE) Türkçe sayfalarda gizli; İngilizce önizlemede TR'ye dönüş için görünür. */}
        {langs.length > 1 && (
          <nav aria-label={t.language} className="flex items-center gap-[9px] font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-white">
            {langs.map((l, i) => (
              <span key={l} className="contents">
                {i > 0 && (
                  <span aria-hidden="true" className="text-onDark-glass">
                    ·
                  </span>
                )}
                {l === locale ? (
                  <span lang={l} aria-current="true" className="border-b-2 border-accent-light pb-[3px]">
                    {l.toUpperCase()}
                  </span>
                ) : (
                  <Link
                    href={switchPath(pathname, l)}
                    lang={l}
                    hrefLang={l}
                    aria-label={l === 'en' ? 'English' : 'Türkçe'}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center text-onDark-glass"
                  >
                    {l.toUpperCase()}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>

      {/* Bölüm paneli — nav ile birlikte yapışkan kalır. */}
      <div id={panelId} hidden={!open} className="border-t border-white/10">
        <ul className="shell grid grid-cols-1 py-2 font-mono text-nav font-semibold uppercase text-white lg:grid-cols-4 lg:gap-x-6 lg:py-4">
          {items.map((it) => (
            <li key={it.href} className="border-b border-white/10 last:border-b-0 lg:border-b-0">
              <Link
                href={it.href}
                prefetch={prefetchFor(it.href)}
                onClick={() => setOpen(false)}
                aria-current={isCurrent(it.href) ? 'page' : undefined}
                className="flex min-h-12 items-center gap-[9px]"
              >
                {it.live && <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent-light motion-safe:animate-blip" />}
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
