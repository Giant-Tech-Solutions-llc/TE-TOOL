'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { PrimaryMatch } from './PrimaryMatch'
import { SecondaryMatch } from './SecondaryMatch'
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
        .then((r) => {
          if (r.image_url) setRecommendation(idx, { image_url: r.image_url })
        })
        .catch(() => { /* swallow */ })
        .finally(() => setImageLoading((m) => ({ ...m, [idx]: false })))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [primary, ...secondary] = recommendations

  return (
    <div className="bg-milk text-jet-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-16 lg:pt-20 pb-24 lg:pb-32">

        {/* Editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-12 gap-y-8 lg:gap-x-10 mb-12 lg:mb-16"
        >
          <div className="col-span-12 lg:col-span-8">
            <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-mocha mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="block h-px w-8 bg-jet-black" />
              Your Grooming Report — Edition I
            </p>
            <h1 className="font-display font-extrabold tracking-[-0.03em] leading-[0.95] text-[clamp(2.5rem,6.5vw,5.5rem)]">
              The taper styles
              <br />
              <span className="italic font-medium text-mocha">most likely to suit you.</span>
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-3 lg:col-start-10 lg:pt-3">
            <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-mocha mb-2">
              Methodology
            </p>
            <p className="text-sm text-mocha leading-[1.7]">
              Each match is scored against your face geometry, hair texture, and maintenance tolerance.
              Recommendations are ranked, not equalized.
            </p>
          </div>
        </motion.div>

        {recommendations.length === 0 ? (
          <div className="border-y-2 border-jet-black py-20 text-center">
            <p className="text-base text-mocha mb-8">We couldn&apos;t generate a recommendation right now.</p>
            <Button variant="ink" size="lg" onClick={reset}>Start over</Button>
          </div>
        ) : (
          <div className="space-y-16 lg:space-y-20">
            {/* PRIMARY */}
            {primary && (
              <section aria-labelledby="primary-heading">
                <h2 id="primary-heading" className="sr-only">Primary match</h2>
                <PrimaryMatch rec={primary} imageLoading={!!imageLoading[0]} />
                <div className="mt-6">
                  <SocialShare rec={primary} />
                </div>
              </section>
            )}

            {/* SECONDARY */}
            {secondary.length > 0 && (
              <section aria-labelledby="secondary-heading">
                <div className="flex items-end justify-between gap-6 mb-8 pb-5 border-b-2 border-jet-black">
                  <h2 id="secondary-heading" className="font-display font-extrabold tracking-[-0.02em] text-3xl lg:text-4xl">
                    Alternate matches
                  </h2>
                  <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-mocha hidden sm:block">
                    Ranked
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {secondary.map((rec, i) => (
                    <SecondaryMatch key={i} rec={rec} index={i + 1} imageLoading={!!imageLoading[i + 1]} />
                  ))}
                </div>
              </section>
            )}

            {/* Feedback */}
            <InlineFeedback recommendations={recommendations} flow={flow} />

            {/* Restart */}
            <div className="text-center pt-4">
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
