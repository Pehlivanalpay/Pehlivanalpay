import type { ReactNode } from 'react'

/**
 * Reklam alanı — header'ın 1. katmanı (kayar).
 * `children` verilmezse kesik çizgili yer tutucu çizilir. Önce kendi sponsor
 * bileşeniniz, sonra Google Ad Manager slotu buraya `children` olarak girer.
 * Genişlik akışkan: en fazla `width`, dar ekranda %100.
 */
type AdSlotProps = {
  width?: number
  height?: number
  format?: string
  /** "header": sayfa tepesi (8px dolgu). "inline": içerik arası billboard (20px dolgu, üst+alt çizgi). */
  placement?: 'header' | 'inline'
  children?: ReactNode
}

export function AdSlot({ width = 970, height = 90, format = 'Leaderboard', placement = 'header', children }: AdSlotProps) {
  const inline = placement === 'inline'
  return (
    <aside aria-label={inline ? "Reklam alanı – içerik arası" : "Reklam alanı – üst"} className={inline ? 'border-y border-rule bg-paper-alt' : 'border-b border-ink/10 bg-paper-alt'}>
      <div className={`shell relative flex flex-col items-start lg:flex-row lg:items-center lg:justify-center ${inline ? 'py-5' : 'py-2'}`}>
        <span className="mb-2 font-mono text-meta-xs uppercase tracking-[0.24em] text-ink-muted lg:absolute lg:left-edge lg:top-1/2 lg:mb-0 lg:-translate-y-1/2">
          Reklam
        </span>
        <div className="w-full" style={{ maxWidth: width, height }}>
          {children ?? (
            <div className="flex h-full w-full items-center justify-center border border-dashed border-ink/25 font-mono text-[11px] tracking-[0.18em] text-ink-muted">
              {width} × {height}&nbsp;·&nbsp;{format.toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
