// Convert the Method card 'Face Structure Read' image to optimized WebP.
// Source is already WebP from the brand team — we re-encode at q=94 for
// consistency with the rest of the asset pipeline and generate a tiny
// blur placeholder so next/image gets a proper initial state.
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const src = process.argv[2] ?? 'C:/Users/Administrator/Downloads/Chapter I — The Method - Face Structure Read.webp'
const root = path.resolve(import.meta.dirname, '..')
const outDir = path.join(root, 'public', 'method')
await fs.mkdir(outDir, { recursive: true })

const buf = await fs.readFile(src)
const meta = await sharp(buf).metadata()
console.log(`Source: ${meta.width}x${meta.height} ${meta.format}`)

const heroBuf = await sharp(buf)
  .resize({ width: 1600, withoutEnlargement: true, fit: 'inside' })
  .webp({ quality: 94, alphaQuality: 100, effort: 6, smartSubsample: false })
  .toBuffer()
await fs.writeFile(path.join(outDir, 'face-read.webp'), heroBuf)

const blurBuf = await sharp(buf).resize(24).webp({ quality: 40 }).toBuffer()
await fs.writeFile(path.join(outDir, 'face-read-blur.webp'), blurBuf)

const stat = (b) => `${(b.length / 1024).toFixed(0)} kB`
console.log(`Wrote:
  /public/method/face-read.webp        ${stat(heroBuf)}
  /public/method/face-read-blur.webp   ${stat(blurBuf)}`)
