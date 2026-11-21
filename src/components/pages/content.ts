/** Dile göre içerik seçimi — sayfa gövdeleri bunu kullanır. */
import * as enHome from '@/content/en/home'
import * as enPages from '@/content/en/pages'
import * as trHome from '@/content/home'
import * as trPages from '@/content/pages'
import type { Locale } from '@/i18n/config'

export function homeContent(locale: Locale) {
  return locale === 'en'
    ? { ...enHome, projectCards: enPages.projects.cards }
    : { hero: trHome.hero, twoArms: trHome.twoArms, about: trHome.about, manifesto: trHome.manifesto, serviceAreas: trHome.serviceAreas, selectedProjects: trHome.selectedProjects, contact: trHome.contact, projectCards: trPages.projeler.cards }
}

export const pageContent = (locale: Locale) =>
  locale === 'en'
    ? { fixer: enPages.fixer, production: enPages.production, brand: enPages.brand, documentary: enPages.documentary, projects: enPages.projects }
    : { fixer: trPages.fikserlik, production: trPages.produksiyon, brand: trPages.markaPr, documentary: trPages.belgesel, projects: trPages.projeler }
