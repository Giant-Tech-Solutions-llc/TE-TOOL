/**
 * Phase 12 — bulk image conversion for the v2 asset drop.
 *
 *   /hero/subject.webp                  (replace existing hero)
 *   /method/face-read.webp              (replace existing method card)
 *   /heights/{low,mid,high,burst}.webp  (replace existing height plates)
 *   /matches/real-match.webp            (replace Real Match Examples)
 *   /face-geometry/{round,oval,square,heart,diamond}.webp
 *   /textures/{straight,wavy,curly,coily}.webp
 *
 * Each output is q94, longest-edge cap 1600px, smartSubsample disabled so
 * skin tone and beard stubble stay sharp. A 24w q40 blur placeholder is
 * generated alongside for next/image initial state.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC = 'C:/Users/Administrator/Downloads/Taper Empire New Images File'
const root = path.resolve(import.meta.dirname, '..')
const PUB = path.join(root, 'public')

const PLAN = [
  // Mechanical swaps
  { src: 'hero-section-image.webp',
    out: 'hero/subject.webp', blur: 'hero/subject-blur.webp', max: 1600 },
  { src: 'Chapter I — The Method Face Structure Rea - Card image.webp',
    out: 'method/face-read.webp', blur: 'method/face-read-blur.webp', max: 1600 },
  { src: 'Chapter II — Real Match Examples.webp',
    out: 'matches/real-match.webp', blur: 'matches/real-match-blur.webp', max: 1600 },
  { src: 'Section-Taper-Heights-lower-taper-fade.webp',
    out: 'heights/low.webp', blur: 'heights/low-blur.webp', max: 1200 },
  { src: 'Section-Taper-Heights-mid-taper-fade.webp',
    out: 'heights/mid.webp', blur: 'heights/mid-blur.webp', max: 1200 },
  { src: 'Section-Taper-Heights-high-taper-fade.webp',
    out: 'heights/high.webp', blur: 'heights/high-blur.webp', max: 1200 },
  { src: 'Section-Taper-Heights-Brust-Fade.webp',
    out: 'heights/burst.webp', blur: 'heights/burst-blur.webp', max: 1200 },

  // Face Geometry section
  { src: 'Chapter III — Face Geometry - Round.webp',
    out: 'face-geometry/round.webp', blur: 'face-geometry/round-blur.webp', max: 1200 },
  { src: 'Chapter III — Face Geometry - Oval.webp',
    out: 'face-geometry/oval.webp', blur: 'face-geometry/oval-blur.webp', max: 1200 },
  { src: 'Chapter III — Face Geometry - Square.webp',
    out: 'face-geometry/square.webp', blur: 'face-geometry/square-blur.webp', max: 1200 },
  { src: 'Chapter III — Face Geometry - Heart.webp',
    out: 'face-geometry/heart.webp', blur: 'face-geometry/heart-blur.webp', max: 1200 },
  { src: 'Chapter III — Face Geometry - Diamond.webp',
    out: 'face-geometry/diamond.webp', blur: 'face-geometry/diamond-blur.webp', max: 1200 },

  // Texture Behavior section
  { src: 'Chapter IV — Texture Behavior - Straight Hair.webp',
    out: 'textures/straight.webp', blur: 'textures/straight-blur.webp', max: 1200 },
  { src: 'Chapter IV — Texture Behavior - Wavy Hair.webp',
    out: 'textures/wavy.webp', blur: 'textures/wavy-blur.webp', max: 1200 },
  { src: 'Chapter IV — Texture Behavior - Curly Hair.webp',
    out: 'textures/curly.webp', blur: 'textures/curly-blur.webp', max: 1200 },
  { src: 'Chapter IV — Texture Behavior - Coily Hair.webp',
    out: 'textures/coily.webp', blur: 'textures/coily-blur.webp', max: 1200 },
]

for (const job of PLAN) {
  const srcPath = path.join(SRC, job.src)
  const outPath = path.join(PUB, job.out)
  const blurPath = path.join(PUB, job.blur)
  await fs.mkdir(path.dirname(outPath), { recursive: true })

  const buf = await fs.readFile(srcPath)
  const meta = await sharp(buf).metadata()

  const heroBuf = await sharp(buf)
    .resize({ width: job.max, height: job.max, withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: 94, alphaQuality: 100, effort: 6, smartSubsample: false })
    .toBuffer()
  await fs.writeFile(outPath, heroBuf)

  const blurBuf = await sharp(buf).resize(24).webp({ quality: 40 }).toBuffer()
  await fs.writeFile(blurPath, blurBuf)

  console.log(
    `${job.out.padEnd(40)} ${String(meta.width).padStart(5)}x${String(meta.height).padEnd(5)} → ${String((heroBuf.length / 1024).toFixed(0)).padStart(4)} kB · blur ${String(blurBuf.length).padStart(4)} B`,
  )
}

console.log(`\nDone — ${PLAN.length * 2} files written.`)
