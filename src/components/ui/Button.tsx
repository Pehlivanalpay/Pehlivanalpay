import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

/**
 * Buton — tasarım dökümü §4.
 * Birincil: accent zemin, notch'lu (kesik köşe yalnızca burada, hero panelinde ve ana görsel çerçevesinde).
 * İkincil: şeffaf, 1px kenar; açık ve koyu zemin sürümleri.
 * Hepsi Mono 600 / 13px / 0.16em / uppercase.
 *
 * size="md": header'daki "Teklif alın" (46px, notch 12) — referans HTML'den.
 * size="lg": sayfa içi butonlar (52px, notch 14).
 */
type Variant = 'primary' | 'secondary' | 'secondary-dark'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-3 font-mono text-[13px] font-semibold uppercase tracking-[0.16em] leading-none'

const variants: Record<Variant, Record<Size, string>> = {
  primary: { md: 'bg-accent text-white notch-12', lg: 'bg-accent text-white notch-14' },
  secondary: { md: 'border border-rule-strong text-ink', lg: 'border border-rule-strong text-ink' },
  'secondary-dark': { md: 'border border-white/45 text-white', lg: 'border border-white/45 text-white' },
}

const sizes: Record<Size, string> = {
  md: 'min-h-[46px] px-7 py-[13px]',
  lg: 'min-h-[52px] px-8 py-4',
}

export function buttonClass(variant: Variant = 'primary', size: Size = 'lg', extra = '') {
  return [base, sizes[size], variants[variant][size], extra].filter(Boolean).join(' ')
}

type LinkButtonProps = Omit<ComponentProps<typeof Link>, 'className'> & {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

/** Bağlantı görünümlü buton — gezinti içindir, her zaman gerçek `<a href>`. */
export function ButtonLink({ variant = 'primary', size = 'lg', className, children, ...rest }: LinkButtonProps) {
  return (
    <Link {...rest} className={buttonClass(variant, size, className)}>
      {children}
    </Link>
  )
}

type ButtonProps = Omit<ComponentProps<'button'>, 'className'> & {
  variant?: Variant
  size?: Size
  className?: string
}

/** Eylem butonu — form gönderimi vb. için gerçek `<button>`. */
export function Button({ variant = 'primary', size = 'lg', className, type = 'button', ...rest }: ButtonProps) {
  return <button type={type} {...rest} className={buttonClass(variant, size, `cursor-pointer ${className ?? ''}`)} />
}
