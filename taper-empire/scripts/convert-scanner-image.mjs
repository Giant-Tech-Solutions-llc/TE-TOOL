/**
 * Convert the Phase II scanner subject portrait to optimized WebP.
 *   /public/scanner/subject.webp + blur placeholder
 *
 * Same pipeline as the hero/match assets (q94, longest-edge 1600 cap,
 * 24w q40 blur placeholder).
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC = process.argv[2] ?? 'C:/Users/Administrator/Downloads/Phase II  Analysis in progress - Image.png'
const root = path.resolve(import.meta.dirname, '..')
const OUT = path.join(root, 'public', 'scanner')
await fs.mkdir(OUT, { recursive: true })

const buf = await fs.readFile(SRC)
const meta = await sharp(buf).metadata()

const heroBuf = await sharp(buf)
  .resize({ width: 1600, height: 1600, withoutEnlargement: true, fit: 'inside' })
  .webp({ quality: 94, alphaQuality: 100, effort: 6, smartSubsample: false })
  .toBuffer()
await fs.writeFile(path.join(OUT, 'subject.webp'), heroBuf)

const blurBuf = await sharp(buf).resize(24).webp({ quality: 40 }).toBuffer()
await fs.writeFile(path.join(OUT, 'subject-blur.webp'), blurBuf)

console.log(
  `Source: ${meta.width}x${meta.height} ${meta.format}\n` +
  `  /scanner/subject.webp        ${(heroBuf.length / 1024).toFixed(0)} kB\n` +
  `  /scanner/subject-blur.webp   ${blurBuf.length} B`,
)
