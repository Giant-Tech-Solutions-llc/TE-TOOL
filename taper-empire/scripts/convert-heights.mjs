// Convert the four Taper Height editorial plates to optimized WebP.
// Each source is ~2 MB at native resolution; output is ~150 kB q=94 WebP
// preserving the gold annotation detail + skin tonality.
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC_DIR = process.argv[2] ?? 'C:/Users/Administrator/Downloads'
const root = path.resolve(import.meta.dirname, '..')
const outDir = path.join(root, 'public', 'heights')
await fs.mkdir(outDir, { recursive: true })

const PLATES = [
  { slug: 'low',   file: 'lower-taper-fade.png' },
  { slug: 'mid',   file: 'mid-taper-fade.png' },
  { slug: 'high',  file: 'high-taper-fade.png' },
  { slug: 'burst', file: 'burst-fade.png' },
]

for (const plate of PLATES) {
  const srcPath = path.join(SRC_DIR, plate.file)
  const buf = await fs.readFile(srcPath)
  const meta = await sharp(buf).metadata()

  // Cap longest edge at 1200 px to keep file sizes lean while staying crisp at
  // retina on the 4-up card (max display ~320 px wide on 2x DPR = 640 px).
  const heroBuf = await sharp(buf)
    .resize({ width: 1200, withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: 94, alphaQuality: 100, effort: 6, smartSubsample: false })
    .toBuffer()
  await fs.writeFile(path.join(outDir, `${plate.slug}.webp`), heroBuf)

  // Tiny blur placeholder
  const blurBuf = await sharp(buf).resize(24).webp({ quality: 40 }).toBuffer()
  await fs.writeFile(path.join(outDir, `${plate.slug}-blur.webp`), blurBuf)

  console.log(`${plate.slug.padEnd(6)} ${meta.width}x${meta.height} → ${(heroBuf.length / 1024).toFixed(0)} kB · blur ${blurBuf.length} B`)
}

console.log(`\nWrote ${PLATES.length * 2} files to /public/heights/`)
