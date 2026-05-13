// Render public/favicon.svg into PNG fallbacks + multi-resolution favicon.ico
// Run: node scripts/make-favicons.mjs
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const src  = path.join(root, 'public', 'favicon.svg')
const out  = path.join(root, 'public')

const sizes = [16, 32, 48, 64, 96, 180, 192, 512]
const svg = await fs.readFile(src)

const renderings = {}
for (const size of sizes) {
  const buf = await sharp(svg, { density: 384 })
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 1 } })
    .png()
    .toBuffer()
  await fs.writeFile(path.join(out, `icon-${size}.png`), buf)
  renderings[size] = buf
  console.log(`Wrote icon-${size}.png  (${buf.length} bytes)`)
}

await fs.writeFile(path.join(out, 'apple-touch-icon.png'), renderings[180])
console.log('Wrote apple-touch-icon.png')

// Multi-resolution ICO — manual builder. ICO header + ICONDIRENTRY blocks + PNG payloads.
const icoSizes = [16, 32, 48, 64]
const images = icoSizes.map((s) => renderings[s])

const HEADER = Buffer.alloc(6)
HEADER.writeUInt16LE(0, 0)              // reserved
HEADER.writeUInt16LE(1, 2)              // type: 1 = ICO
HEADER.writeUInt16LE(icoSizes.length, 4) // image count

const ENTRY_SIZE = 16
let offset = HEADER.length + icoSizes.length * ENTRY_SIZE
const entries = []
for (let i = 0; i < icoSizes.length; i++) {
  const e = Buffer.alloc(ENTRY_SIZE)
  const s = icoSizes[i]
  e.writeUInt8(s === 256 ? 0 : s, 0)       // width
  e.writeUInt8(s === 256 ? 0 : s, 1)       // height
  e.writeUInt8(0, 2)                       // colors in palette
  e.writeUInt8(0, 3)                       // reserved
  e.writeUInt16LE(1, 4)                    // color planes
  e.writeUInt16LE(32, 6)                   // bits per pixel
  e.writeUInt32LE(images[i].length, 8)     // size
  e.writeUInt32LE(offset, 12)              // offset
  offset += images[i].length
  entries.push(e)
}

const ico = Buffer.concat([HEADER, ...entries, ...images])
await fs.writeFile(path.join(out, 'favicon.ico'), ico)
console.log(`Wrote favicon.ico  (${ico.length} bytes, ${icoSizes.length} sizes)`)
