'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Share2, Link2, Twitter, Bookmark, Download, Check } from 'lucide-react'
import type { Recommendation } from '@/types'

interface Props {
  rec: Recommendation
}

export function SocialShare({ rec }: Props) {
  const [copied, setCopied] = useState(false)

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/results/${encodeURIComponent(rec.related_url || rec.style_name)}`
      : 'https://taperempire.com'

  const shareText = `${rec.match_score}% Match — ${rec.style_name} · TaperMatch™ via taperempire.com`

  const handleNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Taper Match', text: shareText, url: shareUrl })
      } catch { /* user cancelled */ }
    } else {
      handleCopy()
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch { /* noop */ }
  }

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleDownload = () => {
    if (rec.image_url) {
      const a = document.createElement('a')
      a.href = rec.image_url
      a.download = `taperempire-${rec.related_url || 'match'}.png`
      a.click()
    }
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
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* noop */ }
  }

  const actions = [
    { label: 'Share',          icon: Share2,   onClick: handleNative },
    { label: 'Copy link',      icon: copied ? Check : Link2, onClick: handleCopy },
    { label: 'Share on X',     icon: Twitter,  onClick: handleTwitter },
    { label: 'Save result',    icon: Bookmark, onClick: handleSave },
    { label: 'Download card',  icon: Download, onClick: handleDownload },
  ]

  return (
    <div className="border border-jet-black/15 bg-milk">
      <div className="px-6 lg:px-8 py-5 border-b border-jet-black/15 flex items-center justify-between gap-4">
        <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-mocha">
          Share &amp; save
        </p>
        <p className="hidden sm:block text-xs tracking-[0.18em] uppercase text-mocha">
          {rec.match_score}% — {rec.style_name}
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 divide-x divide-y sm:divide-y-0 divide-jet-black/15">
        {actions.map((a) => (
          <motion.button
            key={a.label}
            type="button"
            onClick={a.onClick}
            whileTap={{ scale: 0.97 }}
            className="flex flex-col items-center justify-center gap-2 py-6 hover:bg-oat/50 transition-colors group"
          >
            <a.icon className="w-5 h-5 group-hover:text-accent transition-colors" strokeWidth={1.75} />
            <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-jet-black">
              {a.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
