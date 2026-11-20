import type { Config } from 'tailwindcss'

/**
 * ELIS360 NEWS — tasarım sistemi
 * Değerler elis360-design-tokens.md'den; renkler 2026-11 web sitesi önerisi (PDF) paletine güncellendi:
 * gece laciverti #07111F, bordo #A3133D, kırık beyaz #F3EFE7, metalik gri #AAB3C0.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: '#F2F3F5', alt: '#E6E8EB', cream: '#F3EFE7' }, // cream: kırık beyaz (PDF paleti)
        ink: { DEFAULT: '#07111F', // gece laciverti (PDF paleti)
                 body: '#1A212A', mono: '#3C4553', muted: '#5A6372' },
        glass: {
          DEFAULT: 'rgba(7,17,31,0.92)',  // header — gece laciverti cam
          nav: 'rgba(7,17,31,0.90)',      // yapışkan navigasyon
          surface: 'rgba(16,28,46,0.97)', // koyu şeritler, bülten
          panel: 'rgba(10,20,36,0.93)',   // hero paneli
        },
        accent: {
          DEFAULT: '#A3133D',  // bordo — yalnızca açık zemin (6.7–7.7:1)
          light: '#F2667D',    // açık bordo — koyu zemin (lacivert üzerinde 6.3:1)
          info: '#00B8D9',     // yalnızca durum göstergesi
        },
        onDark: { DEFAULT: '#F3EFE7', muted: '#B6BCC6', glass: '#AAB3C0' }, // glass: metalik gri
        rule: {
          soft: 'rgba(11,13,16,0.09)',
          DEFAULT: 'rgba(11,13,16,0.16)',
          strong: 'rgba(11,13,16,0.40)',
          dark: 'rgba(255,255,255,0.14)',
        },
        placeholder: '#C9CDD3', // görsel yer tutucusu — yayında kalmamalı
        // .mark / .mark-num için --accent ve --accent-light CSS değişkenleri
        // globals.css'te :root üzerinde tanımlanmalı:
        //   :root { --accent:#A3133D; --accent-light:#F2667D }
      },

      fontFamily: {
        display: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'monospace'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        // [boyut, { lineHeight, letterSpacing }]
        h1:        ['clamp(40px,5.4vw,74px)', { lineHeight: '1.03', letterSpacing: '-0.022em' }],
        'h1-news': ['clamp(30px,3.6vw,50px)', { lineHeight: '1.04', letterSpacing: '-0.028em' }],
        h2:        ['clamp(30px,3.4vw,46px)', { lineHeight: '1.10', letterSpacing: '-0.020em' }],
        'h2-block':['clamp(24px,2.4vw,32px)', { lineHeight: '1.15', letterSpacing: '-0.018em' }],
        'h3-svc':  ['clamp(28px,2.7vw,38px)', { lineHeight: '1.06', letterSpacing: '-0.025em' }],
        'h3-card': ['22px', { lineHeight: '1.18', letterSpacing: '-0.015em' }],
        'h3-list': ['18px', { lineHeight: '1.22', letterSpacing: '-0.012em' }],
        lead:      ['18px', { lineHeight: '1.68' }],
        body:      ['16px', { lineHeight: '1.72' }],
        small:     ['15px', { lineHeight: '1.60' }],
        label:     ['11px', { lineHeight: '1.4', letterSpacing: '0.26em' }],
        nav:       ['14px', { lineHeight: '1',   letterSpacing: '0.10em' }],
        meta:      ['11px', { lineHeight: '1.4', letterSpacing: '0.20em' }],
        'meta-xs': ['10px', { lineHeight: '1.4', letterSpacing: '0.20em' }],
      },

      maxWidth: { container: '1440px', content: '1280px', lead: '620px' },

      spacing: {
        gutter: '24px',
        edge: 'clamp(20px,5.56vw,80px)',   // 1440'ta tam 80px
        section: 'clamp(72px,7.5vw,116px)',
        'section-sm': 'clamp(56px,5.5vw,84px)',
      },

      screens: { lg: '960px' },  // tek kırılma noktası

      backdropBlur: { glass: '26px' },
      backdropSaturate: { glass: '180%' },

      keyframes: {
        rot:  { to: { transform: 'rotate(360deg)' } },
        blip: { '0%,100%': { opacity: '0.3' }, '50%': { opacity: '1' } },
      },
      animation: {
        rot: 'rot 90s linear infinite',
        blip: 'blip 2.4s ease-in-out infinite',
      },

      backgroundImage: {
        // fotoğraf motifi perdesi — açık zeminli bölümlerde
        'motif-veil-r':
          'linear-gradient(90deg,#F2F3F5 0%,rgba(242,243,245,.74) 44%,rgba(242,243,245,.28) 100%)',
        'motif-veil-l':
          'linear-gradient(270deg,#F2F3F5 0%,rgba(242,243,245,.74) 44%,rgba(242,243,245,.28) 100%)',
        'motif-scan':
          'repeating-linear-gradient(0deg,rgba(0,0,0,.025) 0,rgba(0,0,0,.025) 1px,transparent 1px,transparent 3px)',
        'motif-grid':
          'linear-gradient(rgba(0,0,0,.028) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.028) 1px,transparent 1px)',
        // hero tarama çizgileri (animasyon değil, statik desen)
        scan: 'repeating-linear-gradient(0deg,rgba(11,13,16,.05) 0,rgba(11,13,16,.05) 1px,transparent 1px,transparent 3px)',
        'scan-dark': 'repeating-linear-gradient(0deg,rgba(255,255,255,.05) 0,rgba(255,255,255,.05) 1px,transparent 1px,transparent 3px)',
        // mühendislik ızgarası
        blueprint:
          'linear-gradient(rgba(11,13,16,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(11,13,16,.045) 1px,transparent 1px)',
        // hero perdesi
        'hero-veil':
          'linear-gradient(100deg,rgba(242,243,245,.95) 0%,rgba(242,243,245,.82) 40%,rgba(242,243,245,.34) 100%)',
      },
      backgroundSize: { blueprint: '80px 80px' },
    },
  },
  plugins: [
    // Kesik köşe — SADECE birincil buton, hero paneli, görsel çerçevesi
    function ({ addUtilities }: { addUtilities: (u: Record<string, Record<string, string>>) => void }) {
      const notch = (n: number) => ({
        clipPath: `polygon(0 0, calc(100% - ${n}px) 0, 100% ${n}px, 100% 100%, ${n}px 100%, 0 calc(100% - ${n}px))`,
      })
      const wash = (pct: number, h: string) =>
        `linear-gradient(to top,color-mix(in srgb,var(--accent) ${pct}%,transparent) 0,` +
        `color-mix(in srgb,var(--accent) ${pct}%,transparent) ${h},transparent ${h})`
      addUtilities({
        '.notch-12': notch(12),
        '.notch-14': notch(14),
        '.notch-26': notch(26),
        '.notch-30': notch(30),
        // Fosforlu vurgu — numaralı liste metinleri. Inline span'e uygulanır.
        '.mark': {
          display: 'inline',
          backgroundImage: wash(17, '.64em'),
          WebkitBoxDecorationBreak: 'clone',
          boxDecorationBreak: 'clone',
          padding: '0 .16em',
        },
        '.mark-dark': {
          display: 'inline',
          backgroundImage: wash(15, '.64em').replace(/--accent/g, '--accent-light'),
          WebkitBoxDecorationBreak: 'clone',
          boxDecorationBreak: 'clone',
          padding: '0 .16em',
        },
        '.mark-num': {
          padding: '4px 8px',
          background: 'color-mix(in srgb,var(--accent) 11%,transparent)',
        },
        '.mark-num-dark': {
          padding: '4px 8px',
          background: 'color-mix(in srgb,var(--accent-light) 13%,transparent)',
        },
      })
    },
  ],
}

export default config
