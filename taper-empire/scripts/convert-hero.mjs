// Convert the source hero portrait PNG to optimized WebP at 1024x1280
// (hero portrait aspect ~4:5). Stores into /public/hero/.
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const src = process.argv[2] ?? 'C:/Users/Administrator/Downloads/Hero-image.png'
const root = path.resolve(import.meta.dirname, '..')
const outDir = path.join(root, 'public', 'hero')
await fs.mkdir(outDir, { recursive: true })

const inputBuf = await fs.readFile(src)

// Hero portrait — keep aspect, target ~1024 wide for crisp HiDPI
const heroBuf = await sharp(inputBuf)
  .resize({ width: 1024, withoutEnlargement: false, fit: 'inside' })
  .webp({ quality: 88, effort: 6 })
  .toBuffer()
await fs.writeFile(path.join(outDir, 'subject.webp'), heroBuf)

// 2x retina variant — sharp 2048
const hero2xBuf = await sharp(inputBuf)
  .resize({ width: 2048, withoutEnlargement: false, fit: 'inside' })
  .webp({ quality: 86, effort: 6 })
  .toBuffer()
await fs.writeFile(path.join(outDir, 'subject@2x.webp'), hero2xBuf)

// Blur placeholder — tiny 24px wide for instant pop
const blurBuf = await sharp(inputBuf).resize(24).webp({ quality: 40 }).toBuffer()
await fs.writeFile(path.join(outDir, 'subject-blur.webp'), blurBuf)

const stat = (b) => `${(b.length / 1024).toFixed(0)} kB`
console.log(`Wrote:
  /public/hero/subject.webp        ${stat(heroBuf)}
  /public/hero/subject@2x.webp     ${stat(hero2xBuf)}
  /public/hero/subject-blur.webp   ${stat(blurBuf)}`)
