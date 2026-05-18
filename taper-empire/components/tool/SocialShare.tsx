'use client'

import { useMemo, useState } from 'react'
import { Share2, Link2, Twitter, Bookmark, Download, Check, Instagram } from 'lucide-react'
import type { Recommendation } from '@/types'
import { encodeShare } from '@/lib/share'
import { getSelfId } from '@/lib/referral'

interface Props { rec: Recommendation }

export function SocialShare({ rec }: Props) {
  const [copied, setCopied] = useState(false)
  const [busy, setBusy]     = useState(false)

  // Build a real /share/[token] link with the user's stable self-id as the
  // referrer hook. Recomputed only when the recommendation changes.
  const { shareUrl, shareText } = useMemo(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://taperempire.com'
    const selfId = typeof window !== 'undefined' ? getSelfId() : undefined
    const token = encodeShare(rec, selfId)
    return {
      shareUrl: `${origin}/share/${token}`,
      shareText: `${rec.match_score}% TaperMatch™ — ${rec.style_name} · taperempire.com`,
    }
  }, [rec])

  const handleNative = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'My Taper Profile', text: shareText, url: shareUrl }) }
      catch {}
    } else { handleCopy() }
  }
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
      setCopied(true); setTimeout(() => setCopied(false), 2200)
    } catch {}
  }
  const handleTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      '_blank', 'noopener,noreferrer'
    )
  }
  const handleSave = () => {
    try {
      const key = 'taperempire-saved'
      const saved = JSON.parse(localStorage.getItem(key) || '[]')
      // Pull the token out of the prebuilt share URL — it's the last
      // path segment of /share/[token]. Lets /saved re-open the brief
      // directly without recomputing.
      const token = shareUrl.split('/share/')[1] || undefined
      const next = [
        {
          name: rec.style_name,
          score: rec.match_score,
          url: rec.related_url,
          token,
          ts: Date.now(),
        },
        ...saved.filter((s: any) => s.name !== rec.style_name),
      ].slice(0, 12)
      localStorage.setItem(key, JSON.stringify(next))
      setCopied(true); setTimeout(() => setCopied(false), 1800)
    } catch {}
  }
  const handleStory = async () => {
    if (busy) return; setBusy(true)
    try { await renderShareCard(rec, 1080, 1620, 'instagram-story') } finally { setBusy(false) }
  }
  const handleDownload = async () => {
    if (busy) return; setBusy(true)
    try { await renderShareCard(rec, 1080, 1620, 'card') } finally { setBusy(false) }
  }

  const actions = [
    { label: 'Share',         icon: Share2,                    onClick: handleNative,   key: 'share' },
    { label: copied ? 'Copied' : 'Copy link', icon: copied ? Check : Link2, onClick: handleCopy, key: 'copy' },
    { label: 'Share on X',    icon: Twitter,                   onClick: handleTwitter,  key: 'x' },
    { label: 'IG Story',      icon: Instagram,                 onClick: handleStory,    key: 'ig' },
    { label: 'Save',          icon: Bookmark,                  onClick: handleSave,     key: 'save' },
    { label: 'Download card', icon: Download,                  onClick: handleDownload, key: 'dl' },
  ]

  return (
    <div className="border-y border-line bg-surface/40 rounded-3xl overflow-hidden mx-4 sm:mx-6 lg:mx-0">
      <div className="px-6 lg:px-10 py-5 border-b border-line flex items-center justify-between gap-4">
        <p className="text-[10px] font-medium tracking-[0.32em] uppercase text-gold">
          Share &amp; save
        </p>
        <p className="hidden sm:block text-[10px] font-medium tracking-[0.32em] uppercase text-mute">
          {rec.match_score}% — {rec.style_name}
        </p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6 divide-x divide-y sm:divide-y-0 divide-line">
        {actions.map((a) => (
          <button
            key={a.key}
            type="button"
            onClick={a.onClick}
            disabled={busy}
            className="group/btn flex flex-col items-center justify-center gap-2 py-6 hover:bg-surface2 disabled:opacity-50 transition-all duration-300 ease-out"
          >
            <span className="grid place-items-center w-10 h-10 rounded-full bg-surface border border-line text-soft transition-all duration-300 group-hover/btn:bg-gold group-hover/btn:border-gold group-hover/btn:text-ink group-hover/btn:scale-105">
              <a.icon className="w-4 h-4" strokeWidth={1.5} />
            </span>
            <span className="text-[9px] font-medium tracking-[0.32em] uppercase text-soft/80 group-hover/btn:text-soft transition-colors">
              {a.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
 *  BRANDED SHARE CARD RENDERER
 *  Composes a 1080×1620 portrait card matching the reference design —
 *  TaperEmpire wordmark · hero photograph with rounded border · brand crown
 *  + QR + score block · footer URL. Triggers a PNG download.
 * ───────────────────────────────────────────────────────────────────────── */
async function renderShareCard(
  rec: Recommendation,
  w: number,
  h: number,
  filenameBase: string
) {
  const canvas = document.createElement('canvas')
  canvas.width = w; canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const ink  = '#0A0A0A'
  const soft = '#F5F3EF'
  const mute = '#A8A39A'

  // Background — deep ink with subtle radial spotlight from top
  const bg = ctx.createLinearGradient(0, 0, 0, h)
  bg.addColorStop(0, '#141210')
  bg.addColorStop(0.5, '#0E0C0B')
  bg.addColorStop(1, ink)
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)

  // Layout constants
  const M     = Math.round(w * 0.055)        // outer card margin
  const innerR = Math.round(w * 0.045)       // outer card corner radius

  // Outer card panel — slightly darker than bg
  ctx.save()
  roundRect(ctx, M, M, w - M * 2, h - M * 2, innerR)
  ctx.fillStyle = '#0A0807'
  ctx.fill()
  ctx.restore()

  // Wordmark pill at top center
  const pillW = Math.round(w * 0.36)
  const pillH = Math.round(w * 0.06)
  const pillX = (w - pillW) / 2
  const pillY = M - pillH / 2 + Math.round(w * 0.02)
  ctx.save()
  roundRect(ctx, pillX, pillY, pillW, pillH, pillH / 2)
  const pillGrad = ctx.createLinearGradient(0, pillY, 0, pillY + pillH)
  pillGrad.addColorStop(0, '#1E1B17')
  pillGrad.addColorStop(1, '#0A0807')
  ctx.fillStyle = pillGrad
  ctx.fill()
  ctx.restore()

  // Wordmark text (use Bricolage if available, fallback Inter)
  ctx.fillStyle = soft
  ctx.font = `800 ${Math.round(pillH * 0.45)}px Bricolage Grotesque, Inter, system-ui, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('TaperEmpire', w / 2, pillY + pillH / 2 + 2)

  // Hero image with rounded white border — main visual
  const imgX = M + Math.round(w * 0.04)
  const imgY = M + Math.round(w * 0.10)
  const imgW = w - imgX * 2
  const imgH = Math.round(h * 0.62)
  const imgR = Math.round(w * 0.04)

  // White ring around image
  ctx.save()
  roundRect(ctx, imgX - 6, imgY - 6, imgW + 12, imgH + 12, imgR + 6)
  ctx.fillStyle = '#1A1714'
  ctx.fill()
  ctx.restore()

  // Image clip + draw
  ctx.save()
  roundRect(ctx, imgX, imgY, imgW, imgH, imgR)
  ctx.clip()
  ctx.fillStyle = '#15110D'
  ctx.fillRect(imgX, imgY, imgW, imgH)

  let img: HTMLImageElement | null = null
  if (rec.image_url) {
    try { img = await loadImage(rec.image_url) } catch {}
  }
  if (img) {
    drawCover(ctx, img, imgX, imgY, imgW, imgH)
  } else {
    // Fallback gradient if no image
    const fg = ctx.createRadialGradient(imgX + imgW / 2, imgY + imgH / 3, 0, imgX + imgW / 2, imgY + imgH / 3, imgW)
    fg.addColorStop(0, '#3B2F22')
    fg.addColorStop(1, '#0F0C0A')
    ctx.fillStyle = fg
    ctx.fillRect(imgX, imgY, imgW, imgH)
  }
  ctx.restore()

  // Bottom info strip — crown + QR on left, score+style+URL on right
  const stripY = imgY + imgH + Math.round(h * 0.04)
  const stripH = h - stripY - M - Math.round(h * 0.02)

  // Crown icon (top-left of strip area)
  try {
    const crown = await loadImage('/logos/brand-icon.svg')
    const crownH = Math.round(stripH * 0.36)
    const crownW = (crown.width / crown.height) * crownH
    ctx.drawImage(crown, imgX, stripY, crownW, crownH)
  } catch {}

  // QR code (below crown, left)
  try {
    const qr = await loadImage('/logos/qr-code.svg')
    const qrSize = Math.round(stripH * 0.55)
    const qrX = imgX
    const qrY = stripY + Math.round(stripH * 0.42)
    // White background for QR for scanability
    ctx.save()
    roundRect(ctx, qrX - 4, qrY - 4, qrSize + 8, qrSize + 8, 8)
    ctx.fillStyle = soft
    ctx.fill()
    ctx.restore()
    ctx.drawImage(qr, qrX, qrY, qrSize, qrSize)
  } catch {}

  // Right side — score + style + URL
  const rightX = imgX + Math.round(imgW * 0.42)
  const scoreLabelY = stripY + Math.round(stripH * 0.18)

  // "94% Taper Match"
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'
  ctx.fillStyle = mute
  ctx.font = `500 ${Math.round(w * 0.028)}px Inter, system-ui, sans-serif`
  ctx.fillText(`${rec.match_score}%  Taper  Match`, rightX, scoreLabelY)

  // Style name — large oversized
  ctx.fillStyle = soft
  const styleSize = Math.round(w * 0.058)
  ctx.font = `800 ${styleSize}px Bricolage Grotesque, Inter, sans-serif`
  wrapText(ctx, rec.style_name, rightX, scoreLabelY + Math.round(w * 0.04), w - rightX - M - Math.round(w * 0.04), styleSize * 1.05)

  // URL — bottom right of strip
  ctx.fillStyle = mute
  ctx.font = `500 ${Math.round(w * 0.022)}px Inter, system-ui, sans-serif`
  ctx.fillText('Taperempire.com', rightX, stripY + stripH - Math.round(w * 0.04))

  // Trigger download
  const blob: Blob = await new Promise((res) => canvas.toBlob((b) => res(b as Blob), 'image/png', 0.95))
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `taperempire-${filenameBase}-${rec.related_url || 'match'}.png`
  document.body.appendChild(a); a.click(); document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y,     x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x,     y + h, r)
  ctx.arcTo(x,     y + h, x,     y,     r)
  ctx.arcTo(x,     y,     x + w, y,     r)
  ctx.closePath()
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number) {
  const ar = img.width / img.height
  const targetAR = w / h
  let sx = 0, sy = 0, sw = img.width, sh = img.height
  if (ar > targetAR) {
    sw = img.height * targetAR
    sx = (img.width - sw) / 2
  } else {
    sh = img.width / targetAR
    sy = Math.max(0, (img.height - sh) / 4)
  }
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h)
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(' ')
  let line = ''
  for (let n = 0; n < words.length; n++) {
    const test = line + words[n] + ' '
    const ww = ctx.measureText(test).width
    if (ww > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, y)
      line = words[n] + ' '
      y += lineHeight
    } else { line = test }
  }
  ctx.fillText(line.trim(), x, y)
}
