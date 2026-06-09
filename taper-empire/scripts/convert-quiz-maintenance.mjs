/**
 * Convert the 3 maintenance portraits for the Quick Quiz Question 05.
 *   /quiz/maintenance/{low,medium,high}.webp + blur placeholders
 *
 * Same pipeline as Q01–Q04 (q94, 1200 cap, 24w blur).
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC = 'C:/Users/Administrator/Downloads'
const root = path.resolve(import.meta.dirname, '..')
const OUT = path.join(root, 'public', 'quiz', 'maintenance')
await fs.mkdir(OUT, { recursive: true })

const PLAN = [
  { src: 'Low effort.png',  out: 'low'    },
  { src: 'Some effort.png', out: 'medium' },
  { src: 'High effort.png', out: 'high'   },
]

for (const job of PLAN) {
  const buf = await fs.readFile(path.join(SRC, job.src))
  const meta = await sharp(buf).metadata()

  const heroBuf = await sharp(buf)
    .resize({ width: 1200, height: 1200, withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: 94, alphaQuality: 100, effort: 6, smartSubsample: false })
    .toBuffer()
  await fs.writeFile(path.join(OUT, `${job.out}.webp`), heroBuf)

  const blurBuf = await sharp(buf).resize(24).webp({ quality: 40 }).toBuffer()
  await fs.writeFile(path.join(OUT, `${job.out}-blur.webp`), blurBuf)

  console.log(
    `${job.out.padEnd(7)} ${String(meta.width).padStart(5)}x${String(meta.height).padEnd(5)} → ${String((heroBuf.length / 1024).toFixed(0)).padStart(4)} kB · blur ${String(blurBuf.length).padStart(4)} B`,
  )
}

console.log(`\nDone — ${PLAN.length * 2} files written to /public/quiz/maintenance/`)
