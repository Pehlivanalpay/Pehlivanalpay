/**
 * English homepage copy. Written for international newsrooms, documentary producers and brands —
 * not a literal translation of src/content/home.ts. Same structure (types are enforced).
 */
import type { about as A, contact as C, hero as H, manifesto as M, selectedProjects as S, serviceAreas as SA, twoArms as T } from '../home'
import { imagesEn as images } from './images'

export const hero: typeof H = {
  eyebrow: ['News', 'Media', 'Communications'],
  title: { before: 'News, production and brand communications in Türkiye —', highlight: 'one trusted partner.' },
  lead: 'Local knowledge, trusted connections and end-to-end production support for international media teams and brands.',
  primary: { label: 'Media & field services', href: '/en/fixer-in-turkiye' },
  secondary: { label: 'Brand & communications', href: '/en/brand-pr' },
  image: images.studyo,
  telemetry: { timecode: '00:14:22:06', coords: '41.0082°N 28.9784°E' },
  stats: [
    { value: '30', unit: 'years', label: 'Media experience' },
    { value: 'Türkiye', unit: 'nationwide', label: 'Service network' },
    { value: 'TR · EN', unit: '', label: 'Working languages' },
    { value: '05', unit: '', label: 'Service areas' },
  ],
}

export const twoArms: typeof T = {
  index: '01',
  label: 'Two specialisms, one team',
  title: 'Media and field work, brand and communications — under one roof.',
  arms: [
    {
      letter: 'A',
      title: 'Media & Field',
      text: 'Fixer in Türkiye: story research, permits, local sources, camera crews, production, documentary and live broadcast support.',
      href: '/en/fixer-in-turkiye',
      cta: 'Media & field services →',
      tone: 'light',
    },
    {
      letter: 'B',
      title: 'Brand & Communications',
      text: 'Brand strategy, PR and media relations, corporate content, executive media training and brand documentaries.',
      href: '/en/brand-pr',
      cta: 'Brand & communications →',
      tone: 'dark',
    },
  ],
  values: ['Discretion', 'Speed', 'Local expertise', 'Broadcast discipline'],
}

export const about: typeof A = {
  index: '02',
  label: 'Who we are',
  title: 'Local knowledge, international perspective',
  paragraphs: [
    'ELIS360 NEWS brings 30 years of journalism, television, camera work and media planning under one roof — a media, consultancy and production company based in Türkiye.',
    'We get international crews to the right people, reliable sources and the right locations in Türkiye, fast. And we help brands tell their story to the public clearly, consistently and credibly.',
    'We see more than the pictures: the background, the people, the reputation and the impact behind every story.',
  ],
  points: ['Local source network', 'Permits & accreditation', 'Interpreters & guides', 'Brand & media relations'],
  image: images.kontrolOdasi,
  timecode: '00:14:22:06',
  caption: { left: 'Edit & broadcast', right: 'Camera · Edit · Live' },
}

export const manifesto: typeof M = {
  lines: ['We know news.', 'We know television.', 'We know brands and communications.'],
  text: 'The right message, the right shot and a trusted connection at the right moment can change the fate of a project. We have seen it happen.',
  image: images.sahaKameraman,
  stats: [
    { value: '30', unit: 'years', label: 'Television & media' },
    { value: '360°', unit: '', label: 'Communications approach' },
    { value: 'TR · EN', unit: '', label: 'Project coordination' },
  ],
}

export const serviceAreas: typeof SA = {
  index: '03',
  label: 'Services',
  title: 'Two service lines, one joined-up offer',
  intro: 'Choose the route that fits your project.',
  items: [
    { num: '01', title: 'Fixer in Türkiye', text: 'Research, sources, permits, interpreting, transport and on-the-ground coordination.', href: '/en/fixer-in-turkiye' },
    { num: '02', title: 'Production', text: 'Camera, lighting, sound, drones, live links, editing and technical crews.', href: '/en/production' },
    { num: '03', title: 'Brand & PR', text: 'Brand strategy, media relations, crisis communications and content.', href: '/en/brand-pr', dark: true },
    { num: '04', title: 'Documentary', text: 'From research and casting to the shoot and post-production.', href: '/en/documentary' },
    { num: '05', title: 'Special projects', text: 'Photo exhibitions, broadcast formats, corporate films and original content.', href: '/en/projects' },
  ],
}

export const selectedProjects: typeof S = {
  index: '04',
  label: 'Selected work',
  title: 'Selected work from the field',
  allLink: { label: 'All projects →', href: '/en/projects' },
}

export const contact: typeof C = {
  index: '05',
  label: 'Quick support',
  title: 'Let’s plan your project.',
  text: 'Tell us what you need for your news, documentary, production or brand project — we’ll put together the right crew and plan with you.',
  quickOptions: ['I’m planning a shoot', 'I need a camera operator', 'I need a fixer in Türkiye', 'I need urgent field support'],
  facts: [
    { label: 'Working languages', value: 'Turkish · English' },
    { label: 'Coverage', value: 'All of Türkiye' },
  ],
}
