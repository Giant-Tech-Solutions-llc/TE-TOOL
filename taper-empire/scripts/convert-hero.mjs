// Convert the source hero portrait PNG to a sharp, high-density WebP.
// next/image generates srcset variants from this source so it must contain
// enough pixels for retina rendering. A 1200x1200 source at q=94 with full
// chroma + smartSubsample disabled looks crisp at 2x DPR on a 600px column.
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const src = process.argv[2] ?? 'C:/Users/Administrator/Downloads/Hero-image.png'
const root = path.resolve(import.meta.dirname, '..')
const outDir = path.join(root, 'public', 'hero')
await fs.mkdir(outDir, { recursive: true })

const input = sharp(await fs.readFile(src))
const meta = await input.metadata()
console.log(`Source: ${meta.width}x${meta.height} ${meta.format} ${meta.size ? (meta.size/1024).toFixed(0)+' kB' : ''}`)

// Primary delivery — cap longest edge at 1600 px (hero column ≤ 600 px
// display × 2 DPR = 1200; adds headroom for ultra-wide retina). Sources
// 3000 px+ otherwise blow up file size with no visible quality gain.
const heroBuf = await sharp(await fs.readFile(src))
  .resize({ width: 1600, height: 1600, withoutEnlargement: true, fit: 'inside' })
  .webp({
    quality: 94,
    alphaQuality: 100,
    effort: 6,
    smartSubsample: false,   // preserve chroma detail — important for skin tone & beard stubble
  })
  .toBuffer()
await fs.writeFile(path.join(outDir, 'subject.webp'), heroBuf)

// Tiny blur placeholder — 24w q=40 for instant pop while the main loads.
const blurBuf = await sharp(await fs.readFile(src))
  .resize(24)
  .webp({ quality: 40 })
  .toBuffer()
await fs.writeFile(path.join(outDir, 'subject-blur.webp'), blurBuf)

const stat = (b) => `${(b.length / 1024).toFixed(0)} kB`
console.log(`
Wrote:
  /public/hero/subject.webp        ${stat(heroBuf)} (full ${meta.width}px, q94)
  /public/hero/subject-blur.webp   ${stat(blurBuf)}`)
