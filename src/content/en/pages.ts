/**
 * English service-page copy. Same structure as src/content/pages.ts (types enforced), rewritten for
 * foreign newsrooms and producers rather than translated word for word.
 */
import type { belgesel as B, fikserlik as F, markaPr as M, produksiyon as P, projeler as PR } from '../pages'
import { imagesEn as images } from './images'

const home = { label: 'Home', href: '/en' }

/* ── /en/fixer-in-turkiye ─────────────────────────────────────────────── */

export const fixer: typeof F = {
  meta: {
    title: 'Fixer in Türkiye',
    description:
      'Fixer in Türkiye for international news crews and documentary teams: story research, local sources, permits and press accreditation, interpreters, logistics, camera crews and production support anywhere in the country.',
  },
  hero: {
    label: 'Fixer in Türkiye',
    title: { before: 'Your trusted production partner', highlight: 'across Türkiye' },
    titleLang: 'en',
    lead: 'From initial research to final delivery: local access, permits, logistics, crew and production support anywhere in Türkiye.',
    leadLang: 'en',
    leadTr: 'From the big cities to border regions, rural areas and disaster zones — we know how to get your team where the story is.',
    cta: { label: 'Plan your shoot', href: '/en/contact' },
    image: images.kaleKesif,
    breadcrumb: [home, { label: 'Fixer in Türkiye' }],
  },
  columns: [
    {
      label: 'Fixing & local support',
      items: ['Story research', 'Access to local sources and experts', 'Interview and location set-up', 'Permits and press accreditation', 'Interpreting, transport and logistics'],
    },
    {
      label: 'Production services',
      items: ['Camera operators and DoPs', 'Camera, lighting and sound kit', 'Drone and multi-camera shoots', 'Live broadcast and technical links', 'Editing, voice-over and post-production'],
    },
  ],
  logistics: {
    label: 'Transport & logistics',
    title: 'From the airport to the location — crew and kit together.',
    text: 'We meet your team, move your equipment safely and plan transport, accommodation and field logistics around your shooting schedule.',
    points: ['Airport pick-up and transfers', 'Crew and equipment transport', 'Accommodation and field logistics', 'Safe routes and contingency plans'],
    image: images.havalimaniLojistik,
  },
  band: {
    label: 'Camera crew',
    title: 'Camera, lighting, sound and the director’s monitor — one team.',
    text: 'Our camera, sound and lighting crew works alongside you on news, documentary and live shoots.',
    image: images.sokakCekimi,
  },
  detail: {
    label: 'What we do',
    title: 'Our fixing services',
    text: 'We plan and run the whole process from one desk — from the first research call to the last day of filming.',
    items: [
      'Background research for news and documentary stories',
      'Finding local sources, experts and witnesses',
      'Setting up interviews',
      'Location scouting before the shoot',
      'Liaison with local institutions and on-the-ground coordination',
      'Support with filming permits and accreditation',
      'Interpreters and local guides',
      'Planning transport, accommodation and field logistics',
      'Daily news monitoring and situation updates',
      'Advice on cultural, regional and social sensitivities',
    ],
  },
}

/* ── /en/production ───────────────────────────────────────────────────── */

export const production: typeof P = {
  meta: {
    title: 'Production & technical crews',
    description:
      'Camera operators, DoPs, sound, lighting, drones, live links, editing and post-production in Türkiye — technical crews for news, documentary and corporate shoots.',
  },
  hero: {
    label: 'Production & technical crews',
    title: { before: 'From camera to live link —', highlight: 'a complete technical crew.' },
    lead: 'From a one-person rapid news team to a full-scale documentary production, we scale to what your project needs.',
    cta: { label: 'Request crew and kit', href: '/en/contact' },
    image: images.kontrolOdasi,
    breadcrumb: [home, { label: 'Production' }],
  },
  list: {
    label: 'Technical support',
    title: 'Our production services',
    items: [
      'Camera operators and directors of photography',
      'Field production teams',
      'Camera, sound, lighting and grip',
      'Multi-camera shoot planning',
      'Drone filming',
      'Live broadcast and technical link support',
      'News and documentary filming',
      'Interview production',
      'Editing, voice-over and post-production',
      'Archive footage research and content consultancy',
    ],
  },
  band: {
    label: 'In front of and behind the camera',
    title: 'Presenter, camera, lighting and monitor — one discipline.',
    text: 'Broadcast-standard picture and sound, in the studio or in the field.',
    image: images.studyo,
  },
  method: {
    label: 'How we work',
    title: 'The same commitment from first idea to final frame',
    steps: [
      { title: 'We listen', text: 'We learn the story, the outlet, your goals, the shooting dates and the technical requirements.' },
      { title: 'We plan', text: 'We prepare the research, budget, crew, locations, transport and shooting plan.' },
      { title: 'We run it on the ground', text: 'We handle all communication between your team and local sources, and update the schedule as the situation develops.' },
    ],
  },
}

/* ── /en/brand-pr ─────────────────────────────────────────────────────── */

export const brand: typeof M = {
  meta: {
    title: 'Brand, PR & corporate communications',
    description:
      'Brand and communications strategy, PR and media relations, corporate content, crisis and reputation management, executive media training, brand documentaries and corporate films.',
  },
  hero: {
    label: 'Brand, PR & corporate communications',
    title: { before: 'We make your brand’s story', highlight: 'visible and credible', after: '.' },
    lead: 'We help brands not just to be seen, but to be understood — with a communication voice that lasts.',
    cta: { label: 'Book a brand consultation', href: '/en/contact' },
    image: images.studyo,
    breadcrumb: [home, { label: 'Brand & PR' }],
  },
  list: {
    label: 'Services',
    title: 'Our brand and communications services',
    items: [
      'Brand and communications strategy',
      'PR and media relations',
      'Corporate content production',
      'Crisis and reputation management',
      'Executive media training',
      'Brand documentaries and corporate films',
      'Social media content',
      'Launch and event communications',
    ],
  },
  why: {
    lines: ['We know news.', 'We know television.', 'We know brands and communications.'],
    text: 'Thirty years around newsrooms taught us what journalists need, what the camera sees and what the public trusts. We build your brand’s message on that knowledge.',
  },
}

/* ── /en/documentary ──────────────────────────────────────────────────── */

export const documentary: typeof B = {
  meta: {
    title: 'Documentary & hostile environments',
    description:
      'Documentary production and field operations in war, conflict, disaster and crisis zones: research, characters, risk planning, safe transport, filming and post-production.',
  },
  hero: {
    label: 'Documentary & hostile environments',
    title: { before: 'We find the story', highlight: 'and bring it to life', after: 'in the field.' },
    lead: 'We care about a documentary’s story, not just its shoot.',
    cta: { label: 'Tell us about your documentary', href: '/en/contact' },
    image: images.bergamaCekim,
    breadcrumb: [home, { label: 'Documentary' }],
  },
  visuals: [
    { image: images.sokakCekimi, caption: 'Filming with a character', tone: 'light' },
    { image: images.sahaKameraman, caption: 'Hostile environments', tone: 'dark' },
  ],
  cards: [
    {
      num: '01',
      title: 'Documentary production',
      text: 'Topic research, casting, location scouting, interview planning, filming, archive research and post-production.',
      points: ['History, culture and human stories', 'War, migration and security stories', 'Location research and scouting', 'Archive footage research', 'Post-production management'],
      tone: 'light',
    },
    {
      num: '02',
      title: 'Hostile environment operations',
      text: 'Situation assessment, risk planning, local contacts, safe transport, contingency routes and field coordination.',
      points: ['Experienced war camera operator and field team', 'Risk assessment', 'Local contacts and source organisation', 'Safe transport and work planning', 'Emergency and contingency plans'],
      tone: 'dark',
    },
  ],
  regions: {
    label: 'Field experience',
    title: 'Where we have worked',
    text: 'Years of experience in places shaped by war, conflict, disaster and social crisis.',
    items: ['Kosovo', 'Afghanistan', 'Lebanon', 'Georgia–Ossetia', 'Kenya', 'Iraq', 'Syria', 'Libya', 'Yemen', 'Israel', 'Türkiye'],
  },
  feature: {
    label: 'Featured project',
    title: 'Children of War',
    text: 'An exhibition, documentary and human-stories project built from real photographs taken in war zones.',
    quote: 'When the war ends, childhood does not come back.',
    image: images.savasinCocuklari,
  },
}

/* ── /en/projects ─────────────────────────────────────────────────────── */

export const projects: typeof PR = {
  meta: {
    title: 'Projects',
    description: 'Selected work by ELIS360 NEWS: fixing, documentary, brand and live broadcast projects in Türkiye.',
  },
  hero: {
    label: 'Selected work from the field',
    title: 'We don’t just tell you what we do — we show you.',
  },
  showcase: {
    label: 'Featured project',
    title: 'Field coordination in Türkiye for an international media team',
    text: 'Research, local sources, locations, transport, interpreting, camera and delivery — all run from one desk.',
    image: images.bergamaCekim,
  },
  side: [
    { tag: 'Fixer in Türkiye', title: 'End-to-end field support for a foreign news crew', image: images.kaleKesif, href: '/en/fixer-in-turkiye' },
    { tag: 'Documentary', title: 'An original production, from research to post', image: images.sokakCekimi, href: '/en/documentary' },
    { tag: 'Brand & PR', title: 'A brand documentary that tells a company’s story', image: images.studyo, href: '/en/brand-pr' },
  ],
  cardsLabel: 'More projects',
  cards: [
    { title: 'Children of War', text: 'Photo exhibition and documentary project', image: images.savasinCocuklari, href: '/en/documentary' },
    { title: 'Live broadcast support', text: 'Crew, links and field coordination', image: images.kontrolOdasi, href: '/en/production' },
    { title: 'Exclusive footage', text: 'International news and feature content', image: images.sahaEkip, href: '/en/contact' },
  ],
}
