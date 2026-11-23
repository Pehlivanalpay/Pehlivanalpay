#!/usr/bin/env node
/**
 * public/images/*.jpg için küçük bulanık ön izlemeler üretir → src/content/image-blur.ts
 * Fotoğraf yüklenene kadar siyah kutu yerine bu görünür (next/image placeholder="blur").
 * Yeni fotoğraf eklenince: npm run images
 */
import { readdirSync, writeFileSync } from 'node:fs'
import sharp from 'sharp'

const dir = 'public/images'
const out = {}
for (const f of readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort()) {
  const buf = await sharp(`${dir}/${f}`).resize(24).blur(1.2).jpeg({ quality: 60 }).toBuffer()
  out[`/images/${f}`] = `data:image/jpeg;base64,${buf.toString('base64')}`
}
writeFileSync(
  'src/content/image-blur.ts',
  `/** Otomatik üretilir: npm run images — elle düzenlemeyin. */\nexport const blur: Record<string, string> = ${JSON.stringify(out, null, 2)}\n`,
)
console.log(`${Object.keys(out).length} görsel → src/content/image-blur.ts`)
