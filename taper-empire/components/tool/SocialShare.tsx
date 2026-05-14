'use client'

import { useState } from 'react'
import { Share2, Link2, Twitter, Bookmark, Download, Check, Instagram } from 'lucide-react'
import type { Recommendation } from '@/types'

interface Props { rec: Recommendation }

export function SocialShare({ rec }: Props) {
  const [copied, setCopied] = useState(false)
  const [busy, setBusy]     = useState(false)

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/results/${encodeURIComponent(rec.related_url || rec.style_name)}`
      : 'https://taperempire.com'
  const shareText = `${rec.match_score}% TaperMatch™ — ${rec.style_name} · taperempire.com`

  const handleNative = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'My Taper Profile', text: shareText, url: shareUrl }) }
      catch { /* user cancelled */ }
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
      const next = [
        { name: rec.style_name, score: rec.match_score, url: rec.related_url, ts: Date.now() },
        ...saved.filter((s: any) => s.name !== rec.style_name),
      ].slice(0, 12)
      localStorage.setItem(key, JSON.stringify(next))
      setCopied(true); setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  /** Render a 1080×1920 (Instagram Story) editorial poster card and trigger download. */
  const handleStory = async () => {
    if (busy) return
    setBusy(true)
    try {
      await renderStoryPoster(rec, 1080, 1920, 'instagram-story')
    } finally { setBusy(false) }
  }

  /** Square 1080×1080 luxury share card. */
  const handleDownload = async () => {
    if (busy) return
    setBusy(true)
    try {
      await renderStoryPoster(rec, 1080, 1080, 'card')
    } finally { setBusy(false) }
  }

  const actions = [
    { label: 'Share',           icon: Share2,    onClick: handleNative,   key: 'share' },
    { label: copied ? 'Copied' : 'Copy link',   icon: copied ? Check : Link2,     onClick: handleCopy,     key: 'copy' },
    { label: 'Share on X',      icon: Twitter,   onClick: handleTwitter,  key: 'x' },
    { label: 'IG Story',        icon: Instagram, onClick: handleStory,    key: 'ig' },
    { label: 'Save',            icon: Bookmark,  onClick: handleSave,     key: 'save' },
    { label: 'Download card',   icon: Download,  onClick: handleDownload, key: 'dl' },
  ]

  return (
    <div className="border-y border-line bg-surface/40">
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
            className="flex flex-col items-center justify-center gap-2 py-6 hover:bg-surface2 disabled:opacity-50 transition-colors group"
          >
            <a.icon className="w-5 h-5 text-soft group-hover:text-gold transition-colors" strokeWidth={1.5} />
            <span className="text-[9px] font-medium tracking-[0.32em] uppercase text-soft/80">
              {a.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

/**
 * Render the share card on a hidden canvas and trigger a download.
 * Layout: editorial poster — TaperEmpire logo + plate · large hairstyle image · oversized score · style name · URL.
 */
async function renderStoryPoster(
  rec: Recommendation,
  w: number,
  h: number,
  filenameBase: string
) {
  const canvas = document.createElement('canvas')
  canvas.width = w; canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const pad = Math.round(w * 0.06)
  const gold = '#8F7A58'
  const soft = '#F5F3EF'
  const mute = '#A8A39A'
  const ink  = '#0A0A0A'

  /* Background — gradient + grain feel */
  const bg = ctx.createLinearGradient(0, 0, 0, h)
  bg.addColorStop(0, '#1A1714')
  bg.addColorStop(0.5, '#121110')
  bg.addColorStop(1, ink)
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)

  /* Subtle scan-line texture */
  ctx.globalAlpha = 0.04
  for (let y = 0; y < h; y += 3) {
    ctx.fillStyle = soft
    ctx.fillRect(0, y, w, 1)
  }
  ctx.globalAlpha = 1

  /* Top header — eyebrow + plate */
  ctx.fillStyle = gold
  ctx.font = `500 ${Math.round(w * 0.022)}px Inter, system-ui, sans-serif`
  ctx.textBaseline = 'top'
  ctx.fillText('TAPER · EMPIRE   —   GROOMING INTELLIGENCE', pad, pad)

  ctx.fillStyle = mute
  ctx.font = `500 ${Math.round(w * 0.018)}px Inter, system-ui, sans-serif`
  ctx.textAlign = 'right'
  ctx.fillText('PLATE I', w - pad, pad)
  ctx.textAlign = 'left'

  /* Hairstyle image — main hero block */
  let img: HTMLImageElement | null = null
  if (rec.image_url) {
    try {
      img = await loadImage(rec.image_url)
    } catch {}
  }

  const imgY = pad + 120
  const imgH = Math.round(h * (h > w ? 0.45 : 0.55))
  const imgW = w - pad * 2
  if (img) {
    drawCovered(ctx, img, pad, imgY, imgW, imgH)
  } else {
    ctx.fillStyle = '#1A1714'
    ctx.fillRect(pad, imgY, imgW, imgH)
  }

  /* Tonal floor over image */
  const floor = ctx.createLinearGradient(0, imgY + imgH - 200, 0, imgY + imgH)
  floor.addColorStop(0, 'rgba(10,10,10,0)')
  floor.addColorStop(1, 'rgba(10,10,10,0.9)')
  ctx.fillStyle = floor
  ctx.fillRect(pad, imgY + imgH - 200, imgW, 200)

  /* Score block */
  const scoreY = imgY + imgH + Math.round(h * 0.04)
  ctx.fillStyle = gold
  ctx.font = `500 ${Math.round(w * 0.022)}px Inter, system-ui, sans-serif`
  ctx.fillText('TAPERMATCH™ SCORE', pad, scoreY)

  ctx.fillStyle = soft
  const sized = Math.round(w * 0.22)
  ctx.font = `800 ${sized}px Bricolage Grotesque, Inter, sans-serif`
  ctx.textBaseline = 'top'
  ctx.fillText(`${rec.match_score}%`, pad, scoreY + 40)

  /* Style name */
  ctx.fillStyle = mute
  ctx.font = `500 ${Math.round(w * 0.024)}px Inter, sans-serif`
  ctx.fillText('STYLE', pad, scoreY + 40 + sized + 30)

  ctx.fillStyle = soft
  const titleSize = Math.round(w * 0.06)
  ctx.font = `800 ${titleSize}px Bricolage Grotesque, Inter, sans-serif`
  wrapText(ctx, rec.style_name, pad, scoreY + 40 + sized + 80, w - pad * 2, titleSize * 1.05)

  /* Footer URL */
  ctx.fillStyle = mute
  ctx.font = `500 ${Math.round(w * 0.022)}px Inter, sans-serif`
  ctx.textAlign = 'center'
  ctx.fillText('TAPEREMPIRE.COM  /  AI GROOMING INTELLIGENCE', w / 2, h - pad - 40)

  /* Trigger download */
  const blob: Blob = await new Promise((res) => canvas.toBlob((b) => res(b as Blob), 'image/png', 0.95))
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `taperempire-${filenameBase}-${rec.related_url || 'match'}.png`
  document.body.appendChild(a); a.click(); document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
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

function drawCovered(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number, y: number, w: number, h: number
) {
  const ar = img.width / img.height
  const targetAR = w / h
  let sx = 0, sy = 0, sw = img.width, sh = img.height
  if (ar > targetAR) {
    sw = img.height * targetAR
    sx = (img.width - sw) / 2
  } else {
    sh = img.width / targetAR
    sy = (img.height - sh) / 4
  }
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h)
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string, x: number, y: number, maxWidth: number, lineHeight: number
) {
  const words = text.split(' ')
  let line = ''
  for (let n = 0; n < words.length; n++) {
    const test = line + words[n] + ' '
    const w = ctx.measureText(test).width
    if (w > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, y)
      line = words[n] + ' '
      y += lineHeight
    } else { line = test }
  }
  ctx.fillText(line.trim(), x, y)
}
