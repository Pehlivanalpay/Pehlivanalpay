/** İngilizce menü ve footer. Paylaşılan değerler (e-posta, WhatsApp, saatler) src/content/site.ts'te. */
import type { NavItem } from '../site'

export const mainNavEn: NavItem[] = [
  { label: 'Home', href: '/en' },
  { label: 'Fixer in Türkiye', href: '/en/fixer-in-turkiye' },
  { label: 'Production', href: '/en/production' },
  { label: 'Brand & PR', href: '/en/brand-pr' },
  { label: 'Documentary', href: '/en/documentary' },
  { label: 'Projects', href: '/en/projects', live: true },
  { label: 'Contact', href: '/en/contact' },
]

export const footerEn = {
  tagline: 'Local knowledge. Trusted connections. Proven media and communications experience.',
  columns: [
    {
      key: 'services' as const,
      span: 'lg:col-span-3',
      links: [
        { label: 'Fixer in Türkiye', href: '/en/fixer-in-turkiye' },
        { label: 'Production', href: '/en/production' },
        { label: 'Brand & PR', href: '/en/brand-pr' },
        { label: 'Documentary', href: '/en/documentary' },
      ],
    },
    {
      key: 'company' as const,
      span: 'lg:col-span-2',
      links: [
        { label: 'Projects', href: '/en/projects' },
        { label: 'Contact', href: '/en/contact' },
        { label: 'Türkçe', href: '/', lang: 'tr' },
      ],
    },
  ],
}
