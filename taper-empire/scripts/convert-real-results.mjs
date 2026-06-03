/**
 * Phase X.1 — convert 10 before/after portraits for the Real Results
 * marquee section. Identical sharp pipeline to the rest of the v2 drop.
 *
 *   /real-results/before-{1..5}.webp
 *   /real-results/after-{1..5}.webp
 *   + 24w blur placeholders for each
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC = 'C:/Users/Administrator/Downloads/Real Result Section File'
const root = path.resolve(import.meta.dirname, '..')
const PUB = path.join(root, 'public', 'real-results')
await fs.mkdir(PUB, { recursive: true })

const PAIRS = [1, 2, 3, 4, 5]

for (const n of PAIRS) {
  for (const kind of ['before', 'after']) {
    const buf = await fs.readFile(path.join(SRC, `${kind} - ${n}.webp`))
    const meta = await sharp(buf).metadata()

    const heroBuf = await sharp(buf)
      .resize({ width: 1200, height: 1200, withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: 94, alphaQuality: 100, effort: 6, smartSubsample: false })
      .toBuffer()
    await fs.writeFile(path.join(PUB, `${kind}-${n}.webp`), heroBuf)

    const blurBuf = await sharp(buf).resize(24).webp({ quality: 40 }).toBuffer()
    await fs.writeFile(path.join(PUB, `${kind}-${n}-blur.webp`), blurBuf)

    console.log(
      `${kind}-${n}  ${String(meta.width).padStart(5)}x${String(meta.height).padEnd(5)} → ${String((heroBuf.length / 1024).toFixed(0)).padStart(4)} kB · blur ${String(blurBuf.length).padStart(4)} B`,
    )
  }
}

console.log(`\nDone — ${PAIRS.length * 2 * 2} files.`)
