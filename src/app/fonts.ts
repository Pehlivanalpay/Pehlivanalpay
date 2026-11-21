import { Archivo, IBM_Plex_Mono, Inter } from 'next/font/google'

// İki dilin kök layout'u da aynı fontları kullanır. latin-ext: Türkçe karakterler (ğ, ş, ı, İ) için zorunlu.
export const archivo = Archivo({ subsets: ['latin', 'latin-ext'], weight: ['500', '600', '700'], variable: '--font-archivo', display: 'swap' })
export const plexMono = IBM_Plex_Mono({ subsets: ['latin', 'latin-ext'], weight: ['400', '500', '600'], variable: '--font-plex-mono', display: 'swap' })
export const inter = Inter({ subsets: ['latin', 'latin-ext'], weight: ['300', '400', '500'], variable: '--font-inter', display: 'swap' })

export const fontVars = `${archivo.variable} ${plexMono.variable} ${inter.variable}`
