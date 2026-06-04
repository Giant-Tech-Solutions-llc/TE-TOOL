/**
 * Phase Y.1 — convert 9 portrait references:
 *   5 face shapes for the rebuilt Face Geometry section
 *   4 hair textures for the rebuilt Texture Behavior section
 *
 * Same pipeline as the rest of the v2 drop: q94, 1200 longest-edge cap,
 * 24w q40 blur placeholder per asset.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC_GEO = 'C:/Users/Administrator/Downloads/Taper Empire New Images File/Chapter III — Face Geometry Section File'
const SRC_TEX = 'C:/Users/Administrator/Downloads/Taper Empire New Images File/Chapter IV — Texture Behavior Section File'

const root = path.resolve(import.meta.dirname, '..')
const PUB_GEO = path.join(root, 'public', 'face-geometry')
const PUB_TEX = path.join(root, 'public', 'textures')
await fs.mkdir(PUB_GEO, { recursive: true })
await fs.mkdir(PUB_TEX, { recursive: true })

const GEO = [
  { src: 'Chapter III — Face Geometry - Round.webp',   out: 'round'   },
  { src: 'Chapter III — Face Geometry - Oval.webp',    out: 'oval'    },
  { src: 'Chapter III — Face Geometry - Square.webp',  out: 'square'  },
  { src: 'Chapter III — Face Geometry - Diamond.webp', out: 'diamond' },
  { src: 'Chapter III — Face Geometry - Heart.webp',   out: 'heart'   },
]

const TEX = [
  { src: 'Chapter IV — Texture Behavior - Straight Hair.webp', out: 'straight' },
  { src: 'Chapter IV — Texture Behavior - Wavy Hair.webp',     out: 'wavy'     },
  { src: 'Chapter IV — Texture Behavior - Curly Hair.webp',    out: 'curly'    },
  { src: 'Chapter IV — Texture Behavior - Coily Hair.webp',    out: 'coily'    },
]

async function run(srcDir, plan, outDir, tag) {
  for (const job of plan) {
    const buf = await fs.readFile(path.join(srcDir, job.src))
    const meta = await sharp(buf).metadata()

    const heroBuf = await sharp(buf)
      .resize({ width: 1200, height: 1200, withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: 94, alphaQuality: 100, effort: 6, smartSubsample: false })
      .toBuffer()
    await fs.writeFile(path.join(outDir, `${job.out}.webp`), heroBuf)

    const blurBuf = await sharp(buf).resize(24).webp({ quality: 40 }).toBuffer()
    await fs.writeFile(path.join(outDir, `${job.out}-blur.webp`), blurBuf)

    console.log(
      `[${tag}] ${job.out.padEnd(9)} ${String(meta.width).padStart(5)}x${String(meta.height).padEnd(5)} → ${String((heroBuf.length / 1024).toFixed(0)).padStart(4)} kB · blur ${String(blurBuf.length).padStart(4)} B`,
    )
  }
}

await run(SRC_GEO, GEO, PUB_GEO, 'GEO')
await run(SRC_TEX, TEX, PUB_TEX, 'TEX')

console.log(`\nDone — ${(GEO.length + TEX.length) * 2} files written.`)
