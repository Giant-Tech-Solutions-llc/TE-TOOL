'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown, ExternalLink, Sparkles, Loader2 } from 'lucide-react'
import type { Recommendation } from '@/types'

interface ResultCardProps {
  rec: Recommendation
  index: number
  imageLoading: boolean
}

export function ResultCard({ rec, index, imageLoading }: ResultCardProps) {
  const [expanded, setExpanded] = useState(false)
  const slug = rec.related_url || ''
  const guideUrl = `https://taperempire.com/${slug}/`

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
      className="bg-milk border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
    >
      {/* Image area */}
      <div className="relative aspect-square w-full rounded-xl mb-4 overflow-hidden bg-oat">
        {imageLoading && !rec.image_url ? (
          <div className="absolute inset-0 flex items-center justify-center bg-oat">
            <div className="text-center">
              <Loader2 className="w-8 h-8 mx-auto mb-2 text-mocha animate-spin" />
              <p className="text-xs text-mocha">Rendering preview…</p>
            </div>
          </div>
        ) : rec.image_url ? (
          <Image
            src={rec.image_url}
            alt={rec.style_name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-top"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-mocha text-sm">
            Preview unavailable
          </div>
        )}

        {rec.image_url && (
          <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-milk px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> AI preview
          </div>
        )}
        <div className="absolute top-2 right-2 bg-accent text-milk px-3 py-1 rounded-full text-sm font-semibold">
          {rec.match_score}% Match
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {index === 0 && (
          <span className="bg-accent text-milk px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
            Best Match
          </span>
        )}
        <h3 className="font-display text-xl font-semibold text-jet-black">{rec.style_name}</h3>
      </div>

      <p className="text-mocha text-sm leading-relaxed mb-4">{rec.why_it_works}</p>

      {/* Barber instructions accordion */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="bg-oat/60 rounded-xl px-4 py-3 mb-4 text-left hover:bg-oat transition-colors"
      >
        <div className="flex justify-between items-center">
          <span className="font-semibold text-jet-black text-sm">Barber instructions</span>
          <ChevronDown className={`w-4 h-4 text-mocha transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </div>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <p className="mt-3 text-sm text-mocha leading-relaxed">{rec.barber_instructions}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <p className="text-sm text-mocha mb-4">
        <strong className="text-jet-black">Maintenance:</strong> {rec.maintenance}
      </p>

      <a
        href={guideUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-mocha hover:text-jet-black text-sm font-semibold transition-colors mt-auto"
      >
        <ExternalLink className="w-4 h-4" /> See full guide
      </a>
    </motion.div>
  )
}
