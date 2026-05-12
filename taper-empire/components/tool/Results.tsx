'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ResultCard } from './ResultCard'
import { InlineFeedback } from './InlineFeedback'
import { FeedbackToast } from './FeedbackToast'
import { useToolStore } from '@/store/useToolStore'
import { generateImage } from '@/lib/api-client'
import type { Recommendation } from '@/types'

export function Results() {
  const { recommendations, diagnostics, inputData, reset, setRecommendation } = useToolStore()
  const [imageLoading, setImageLoading] = useState<Record<number, boolean>>({})
  const flow = (diagnostics?.proxy as string) || 'next'

  // Generate AI images progressively after recommendations land
  useEffect(() => {
    if (!recommendations.length) return
    const photo = inputData?.type === 'photo' ? (inputData.data as any).photo : undefined
    const mimeType = inputData?.type === 'photo' ? (inputData.data as any).mimeType : undefined

    recommendations.forEach((rec: Recommendation, idx: number) => {
      if (rec.image_url) return
      setImageLoading((m) => ({ ...m, [idx]: true }))
      generateImage(rec, photo, mimeType)
        .then((r) => {
          if (r.image_url) setRecommendation(idx, { image_url: r.image_url })
        })
        .catch(() => { /* swallow */ })
        .finally(() => setImageLoading((m) => ({ ...m, [idx]: false })))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-jet-black mb-3 tracking-tight">
          Here are your perfect matches
        </h2>
        <p className="text-lg text-mocha">Based on your unique features and preferences</p>
      </motion.div>

      {recommendations.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-mocha mb-6">We couldn&apos;t generate recommendations. Please try again.</p>
          <Button onClick={reset}>Start Over</Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 items-start">
          {recommendations.map((rec, i) => (
            <ResultCard key={i} rec={rec} index={i} imageLoading={!!imageLoading[i]} />
          ))}
        </div>
      )}

      <div className="mb-12">
        <InlineFeedback recommendations={recommendations} flow={flow} />
      </div>

      <div className="text-center">
        <Button variant="outline" onClick={reset}>Start Over</Button>
      </div>

      <FeedbackToast recommendations={recommendations} flow={flow} />
    </div>
  )
}
