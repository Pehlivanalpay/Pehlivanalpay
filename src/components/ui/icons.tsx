/** Dekoratif ikonlar. Hepsi aria-hidden; erişilebilir ad, ikonu taşıyan elemanda verilir. */
import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>
const base = { 'aria-hidden': true, focusable: false } as const

export const PinIcon = (p: P) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...base} {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

export const SearchIcon = (p: P) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.6-3.6" />
  </svg>
)

export const MenuIcon = (p: P) => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...base} {...p}>
    <path d="M0 1h20M0 7h20M0 13h20" />
  </svg>
)

export const CloseIcon = (p: P) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...base} {...p}>
    <path d="M2 2l14 14M16 2 2 16" />
  </svg>
)

export const LinkedInIcon = (p: P) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" {...base} {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14m1.78 13.02H3.55V9h3.57zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0" />
  </svg>
)

export const InstagramIcon = (p: P) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" {...base} {...p}>
    <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="5.4" />
    <circle cx="12" cy="12" r="4.3" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
)

export const YouTubeIcon = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...base} {...p}>
    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.08 0 12 0 12s0 3.92.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.81M9.55 15.57V8.43L15.82 12z" />
  </svg>
)

/* ── Hava durumu ikonları (15px, ince çizgi — referanstaki "parçalı bulutlu" çizgisiyle aynı dil) ── */
const wx = { width: 15, height: 15, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', ...base } as const

export const WxClear = (p: P) => (
  <svg {...wx} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)
export const WxPartly = (p: P) => (
  <svg {...wx} {...p}>
    <circle cx="8.5" cy="8.5" r="3" />
    <path d="M8.5 2.6v1.6M3.2 8.5H1.6M4.7 4.7 3.6 3.6M12.3 4.7l1.1-1.1" />
    <path d="M17.4 19.4H9a4 4 0 0 1 .6-8 5.5 5.5 0 0 1 10.3 2.2 3 3 0 0 1-.5 5.8z" />
  </svg>
)
export const WxCloud = (p: P) => (
  <svg {...wx} {...p}>
    <path d="M17.5 19H8a5 5 0 1 1 .9-9.9A6 6 0 0 1 20.4 12a3.5 3.5 0 0 1-2.9 7z" />
  </svg>
)
export const WxFog = (p: P) => (
  <svg {...wx} {...p}>
    <path d="M4 9h16M2 13h20M5 17h14" />
  </svg>
)
export const WxRain = (p: P) => (
  <svg {...wx} {...p}>
    <path d="M17.5 15H8a5 5 0 1 1 .9-9.9A6 6 0 0 1 20.4 8a3.5 3.5 0 0 1-2.9 7z" />
    <path d="M8 18l-1 3M12 18l-1 3M16 18l-1 3" />
  </svg>
)
export const WxSnow = (p: P) => (
  <svg {...wx} {...p}>
    <path d="M17.5 15H8a5 5 0 1 1 .9-9.9A6 6 0 0 1 20.4 8a3.5 3.5 0 0 1-2.9 7z" />
    <path d="M8 19h.01M12 21h.01M16 19h.01" strokeWidth="2.4" />
  </svg>
)
export const WxStorm = (p: P) => (
  <svg {...wx} {...p}>
    <path d="M17.5 15H8a5 5 0 1 1 .9-9.9A6 6 0 0 1 20.4 8a3.5 3.5 0 0 1-2.9 7z" />
    <path d="m12.5 15-2 3.5h3l-2 3.5" />
  </svg>
)
