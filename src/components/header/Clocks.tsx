'use client'

import { useSyncExternalStore } from 'react'

/**
 * Dünya saatleri — istemci tarafı, 15 sn aralıkla.
 * Sunucuda ve hidrasyon anında `--:--` iskeleti çizilir; Mono yazı tipi eşit
 * genişlikli olduğu için gerçek saat geldiğinde satır kaymaz.
 */
type Clock = { label: string; timeZone: string }

const TICK_MS = 15_000

function subscribe(cb: () => void) {
  const id = window.setInterval(cb, TICK_MS)
  return () => window.clearInterval(id)
}
// Kararlı anlık görüntü: 15 sn'lik dilim numarası. Dilim değişince yeniden çizilir.
const getSnapshot = () => Math.floor(Date.now() / TICK_MS)
const getServerSnapshot = () => null

const formatters = new Map<string, Intl.DateTimeFormat>()
function fmt(timeZone: string) {
  let f = formatters.get(timeZone)
  if (!f) {
    f = new Intl.DateTimeFormat('tr-TR', { timeZone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
    formatters.set(timeZone, f)
  }
  return f
}

function useTick() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

function Time({ timeZone, tick }: { timeZone: string; tick: number | null }) {
  if (tick === null) {
    return (
      <span aria-hidden="true" className="opacity-40">
        --:--
      </span>
    )
  }
  const now = new Date(tick * TICK_MS)
  return <time dateTime={now.toISOString()}>{fmt(timeZone).format(now)}</time>
}

/** Yerel saat (vurgulu) + diğer şehirler (dar ekranda gizli). */
export function Clocks({ clocks, locale = 'tr' }: { clocks: readonly Clock[]; locale?: 'tr' | 'en' }) {
  const tick = useTick()
  const [local, ...others] = clocks
  return (
    <>
      <span className="text-white">
        <Time timeZone={local.timeZone} tick={tick} /> <span className="text-onDark-glass">{locale === 'en' ? 'TRT' : local.label}</span>
      </span>
      <span className="hidden gap-4 text-onDark-glass lg:inline-flex">
        {others.map((c) => (
          <span key={c.label}>
            {c.label} <Time timeZone={c.timeZone} tick={tick} />
          </span>
        ))}
      </span>
    </>
  )
}
