/** Same photographs as src/content/images.ts, with English alt text for the /en pages. */
import { images as tr } from '../images'

type Images = typeof tr
const withAlt = <K extends keyof Images>(k: K, alt: string) => ({ ...tr[k], alt })

export const imagesEn = {
  studyo: withAlt('studyo', 'Shooting in a TV news studio: camera operator, lighting technician, sound engineer and director, with a presenter at the desk'),
  kontrolOdasi: withAlt('kontrolOdasi', 'A team at work in a broadcast control room, in front of a wall of monitors and an edit desk'),
  sahaEkip: withAlt('sahaEkip', 'A foreign media team in the field: a reporter in a press vest, a producer coordinating with a map and radio, a camera in the foreground'),
  sahaKameraman: withAlt('sahaKameraman', 'A camera operator with PRESS on his back filming on a mountainside; a map of assignment regions overlaid on the sky'),
  savasinCocuklari: withAlt('savasinCocuklari', 'Children looking through bullet-cracked glass — from the Children of War project'),
  kaleKesif: withAlt('kaleKesif', 'Location scouting on castle walls: a producer pointing over a map, a camera on a tripod and a drone operator, with a town and plain below'),
  bergamaCekim: withAlt('bergamaCekim', 'A foreign documentary crew at the ancient city of Pergamon: camera operator, fixer with a map, producer taking notes and sound recordist with a boom'),
  sokakCekimi: withAlt('sokakCekimi', 'A documentary shoot on a cobbled street: camera on a dolly, boom microphone, director, and an elderly man walking towards camera'),
  havalimaniLojistik: withAlt('havalimaniLojistik', 'A field team meeting a foreign film crew at the airport, loading camera cases and tripods into a van'),
} satisfies Images
