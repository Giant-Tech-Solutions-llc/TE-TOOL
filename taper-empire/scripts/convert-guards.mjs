/**
 * Phase 12.1 — convert the 5 Guard Progression portrait references.
 *
 *   /guards/{nape,lower,temple,above-ear,top}.webp
 *
 * Same pipeline as the v2 drop: q94, longest-edge cap 1200px, blur 24w.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC = 'C:/Users/Administrator/Downloads/Chapter IV — Barber-Ready Brief Section files'
const root = path.resolve(import.meta.dirname, '..')
const PUB = path.join(root, 'public', 'guards')
await fs.mkdir(PUB, { recursive: true })

const PLAN = [
  { src: 'Chapter IV - Guard progression - 1 Nape.webp',       out: 'nape' },
  { src: 'Guard progression - 1½ lower.webp',                  out: 'lower' },
  { src: 'Chapter IV - Guard progression - 2 Temple.webp',     out: 'temple' },
  { src: 'Chapter IV - Guard progression - 3 Above ear.webp',  out: 'above-ear' },
  { src: 'Chapter IV - Guard progression - Scissor Top.webp',  out: 'top' },
]

for (const job of PLAN) {
  const buf = await fs.readFile(path.join(SRC, job.src))
  const meta = await sharp(buf).metadata()

  const heroBuf = await sharp(buf)
    .resize({ width: 1200, height: 1200, withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: 94, alphaQuality: 100, effort: 6, smartSubsample: false })
    .toBuffer()
  await fs.writeFile(path.join(PUB, `${job.out}.webp`), heroBuf)

  const blurBuf = await sharp(buf).resize(24).webp({ quality: 40 }).toBuffer()
  await fs.writeFile(path.join(PUB, `${job.out}-blur.webp`), blurBuf)

  console.log(
    `${job.out.padEnd(12)} ${String(meta.width).padStart(5)}x${String(meta.height).padEnd(5)} → ${String((heroBuf.length / 1024).toFixed(0)).padStart(4)} kB · blur ${String(blurBuf.length).padStart(4)} B`,
  )
}

console.log(`\nDone — ${PLAN.length * 2} files written.`)
