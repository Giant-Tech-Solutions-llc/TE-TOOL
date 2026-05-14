'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { PrimaryMatch } from './PrimaryMatch'
import { SecondaryRail } from './SecondaryRail'
import { SocialShare } from './SocialShare'
import { InlineFeedback } from './InlineFeedback'
import { FeedbackToast } from './FeedbackToast'
import { useToolStore } from '@/store/useToolStore'
import { generateImage } from '@/lib/api-client'
import type { Recommendation } from '@/types'

export function Results() {
  const { recommendations, diagnostics, inputData, reset, setRecommendation } = useToolStore()
  const [imageLoading, setImageLoading] = useState<Record<number, boolean>>({})
  const flow = (diagnostics?.proxy as string) || 'next'

  useEffect(() => {
    if (!recommendations.length) return
    const photo = inputData?.type === 'photo' ? (inputData.data as any).photo : undefined
    const mimeType = inputData?.type === 'photo' ? (inputData.data as any).mimeType : undefined

    recommendations.forEach((rec: Recommendation, idx: number) => {
      if (rec.image_url) return
      setImageLoading((m) => ({ ...m, [idx]: true }))
      generateImage(rec, photo, mimeType)
        .then((r) => { if (r.image_url) setRecommendation(idx, { image_url: r.image_url }) })
        .catch(() => {})
        .finally(() => setImageLoading((m) => ({ ...m, [idx]: false })))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [primary, ...secondary] = recommendations

  return (
    <div className="bg-ink text-soft">
      <div className="pt-32 lg:pt-40 pb-24 lg:pb-32">

        {/* Editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1480px] mx-auto px-6 lg:px-10 mb-14 lg:mb-20"
        >
          <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
            <div className="col-span-12 lg:col-span-8">
              <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-gold mb-6 flex items-center gap-4">
                <span aria-hidden="true" className="block h-px w-12 bg-gold/70" />
                Your Grooming Report — Edition I
              </p>
              <h1 className="font-display font-extrabold tracking-[-0.04em] leading-[0.92] text-[clamp(2.75rem,7vw,6.5rem)]">
                The taper styles
                <br />
                <span className="italic font-medium text-mute">most likely to suit you.</span>
              </h1>
            </div>
            <div className="col-span-12 lg:col-span-3 lg:col-start-10 lg:pt-3">
              <p className="text-[10px] tracking-[0.32em] uppercase text-mute mb-2">Methodology</p>
              <p className="text-sm text-soft/65 leading-[1.85]">
                Each match is scored against your face geometry, hair texture, and maintenance
                tolerance. Recommendations are ranked, not equalized.
              </p>
            </div>
          </div>
        </motion.div>

        {recommendations.length === 0 ? (
          <div className="max-w-[1480px] mx-auto px-6 lg:px-10 py-20 text-center border-y border-line">
            <p className="text-base text-soft/65 mb-8">We couldn&apos;t generate a recommendation right now.</p>
            <Button variant="cream" size="lg" onClick={reset}>Start over</Button>
          </div>
        ) : (
          <div className="space-y-20 lg:space-y-28">
            {/* PRIMARY — full bleed */}
            {primary && (
              <section aria-labelledby="primary-heading" className="border-y border-line">
                <h2 id="primary-heading" className="sr-only">Primary match</h2>
                <PrimaryMatch rec={primary} imageLoading={!!imageLoading[0]} />
                <SocialShare rec={primary} />
              </section>
            )}

            {/* SECONDARY — horizontal lookbook rail */}
            {secondary.length > 0 && (
              <div className="max-w-[1480px] mx-auto px-6 lg:px-10">
                <SecondaryRail
                  recs={secondary}
                  imageLoading={imageLoading}
                />
              </div>
            )}

            {/* Feedback */}
            <div className="max-w-[1480px] mx-auto px-6 lg:px-10">
              <InlineFeedback recommendations={recommendations} flow={flow} />
            </div>

            <div className="text-center">
              <Button variant="outline" size="lg" onClick={reset}>
                Start a new analysis
              </Button>
            </div>
          </div>
        )}
      </div>

      <FeedbackToast recommendations={recommendations} flow={flow} />
    </div>
  )
}
