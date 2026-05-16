// Convert the Real Match Examples subject portrait to optimized WebP.
// Source is 1122x1402 (5:6.25 aspect — close to the 4:5 frame this asset
// renders into). We keep the full native resolution at q=94 with
// smartSubsample disabled to preserve skin tone, beard stubble, and eye
// detail — the same treatment used for the hero image.
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const src = process.argv[2] ?? 'C:/Users/Administrator/Downloads/Chapter II — Real Match Examples Section.png'
const root = path.resolve(import.meta.dirname, '..')
const outDir = path.join(root, 'public', 'matches')
await fs.mkdir(outDir, { recursive: true })

const meta = await sharp(await fs.readFile(src)).metadata()
console.log(`Source: ${meta.width}x${meta.height} ${meta.format}`)

// Primary delivery — full native resolution, near-lossless WebP.
const heroBuf = await sharp(await fs.readFile(src))
  .webp({
    quality: 94,
    alphaQuality: 100,
    effort: 6,
    smartSubsample: false,    // preserve chroma fidelity on skin & hair
  })
  .toBuffer()
await fs.writeFile(path.join(outDir, 'subject.webp'), heroBuf)

// Blur placeholder
const blurBuf = await sharp(await fs.readFile(src)).resize(24).webp({ quality: 40 }).toBuffer()
await fs.writeFile(path.join(outDir, 'subject-blur.webp'), blurBuf)

const stat = (b) => `${(b.length / 1024).toFixed(0)} kB`
console.log(`
Wrote:
  /public/matches/subject.webp        ${stat(heroBuf)} (full ${meta.width}px, q94)
  /public/matches/subject-blur.webp   ${stat(blurBuf)}`)
