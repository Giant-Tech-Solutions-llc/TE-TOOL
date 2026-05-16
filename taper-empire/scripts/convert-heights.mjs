// Convert the four Taper Height plate PNGs to optimized WebP variants.
// Source files are ~2 MB editorial portraits with gold annotation lines.
// Output: full-resolution + tiny blur placeholder per height.
//
// Each plate gets:
//   /public/heights/<slug>.webp           full source res, q=94
//   /public/heights/<slug>-blur.webp      24 px blur placeholder
//
// Uses the same sharp settings as the hero / matches asset pipeline so
// the visual treatment stays consistent across the product.
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const DOWNLOADS = process.argv[2] ?? 'C:/Users/Administrator/Downloads'
const root = path.resolve(import.meta.dirname, '..')
const outDir = path.join(root, 'public', 'heights')
await fs.mkdir(outDir, { recursive: true })

const PLATES = [
  { slug: 'low',   file: 'lower-taper-fade.png' },
  { slug: 'mid',   file: 'mid-taper-fade.png' },
  { slug: 'high',  file: 'high-taper-fade.png' },
  { slug: 'burst', file: 'burst-fade.png' },
]

for (const { slug, file } of PLATES) {
  const srcPath = path.join(DOWNLOADS, file)
  const buf = await fs.readFile(srcPath)
  const meta = await sharp(buf).metadata()
  console.log(`\n${slug.padEnd(6)} source: ${meta.width}×${meta.height} ${meta.format} (${(buf.length / 1024).toFixed(0)} kB)`)

  // Primary delivery — downscale 3296 → 1200 width, still sharp at 2x DPR
  // for the ~310px card column. q=90 + smartSubsample false preserves the
  // gold annotation hairlines while keeping per-plate weight under 250 kB.
  const out = await sharp(buf)
    .resize({ width: 1200, withoutEnlargement: true, fit: 'inside' })
    .webp({
      quality: 90,
      alphaQuality: 100,
      effort: 6,
      smartSubsample: false,  // preserve skin tone + fine gold annotation lines
    })
    .toBuffer()
  await fs.writeFile(path.join(outDir, `${slug}.webp`), out)

  // Blur placeholder for instant pop
  const blur = await sharp(buf).resize(24).webp({ quality: 40 }).toBuffer()
  await fs.writeFile(path.join(outDir, `${slug}-blur.webp`), blur)

  console.log(`  → ${slug}.webp        ${(out.length / 1024).toFixed(0)} kB`)
  console.log(`  → ${slug}-blur.webp   ${blur.length} B`)
}

console.log('\nDone.')
