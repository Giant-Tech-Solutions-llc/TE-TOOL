'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Cinematic, SectionEyebrow } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { PrimaryMatch } from './PrimaryMatch'
import { SecondaryRail } from './SecondaryRail'
import { SocialShare } from './SocialShare'
import { RemindMe } from './RemindMe'
import { InlineFeedback } from './InlineFeedback'
import { FeedbackToast } from './FeedbackToast'
import { AuthWall } from './AuthWall'
import { useToolStore } from '@/store/useToolStore'
import { generateImage, hasAuthenticated } from '@/lib/api-client'
import { easeLux } from '@/lib/motion'
import { track } from '@/lib/analytics'
import type { Recommendation } from '@/types'

/**
 * Phase 06 — Results Page Redesign (immersive premium product experience)
 *
 * Replaces the prior 3-equal-card grid with an editorial sequence:
 *
 *   • Cinematic header (Chapter eyebrow + type-section headline)
 *   • PRIMARY MATCH — fullscreen-feeling split with cinematic score ring,
 *     expanded grooming analysis grid, maintenance timeline, barber brief
 *   • SOCIAL SHARING module — full 6-action bar with luxury card export
 *   • SECONDARY RAIL — horizontal lookbook with snap scrolling
 *   • INLINE FEEDBACK — categorical micro-survey
 *   • RESTART CTA
 *
 * The page adopts Phase 01 design system tokens throughout so it reads
 * as the natural extension of the landing-page Real Match Examples
 * showcase the user just walked through.
 */

export function Results() {
  const {
    recommendations, diagnostics, inputData, reset, setRecommendation,
    authenticated, setAuthenticated,
  } = useToolStore()
  const [imageLoading, setImageLoading] = useState<Record<number, boolean>>({})
  const [authedLocal, setAuthedLocal] = useState(authenticated)
  const flow = inputData?.type ?? 'photo'

  // Phase 07.5 — sync auth state from sessionStorage on mount
  useEffect(() => {
    const auth = authenticated || hasAuthenticated()
    setAuthedLocal(auth)
    if (auth && !authenticated) setAuthenticated(true)
  }, [authenticated, setAuthenticated])

  // Progressive image generation — only run after auth (avoids burning API
  // quota on a session that never unlocks).
  useEffect(() => {
    if (!authedLocal || !recommendations.length) return
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
  }, [authedLocal])

  // Fire the result_viewed funnel event the moment results unlock
  useEffect(() => {
    if (authedLocal && recommendations.length > 0) {
      const top = recommendations[0]
      track('result_viewed', {
        flow,
        topStyle: top.style_name,
        topScore: top.match_score,
        count: recommendations.length,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authedLocal])

  // HARD GATE — if not authenticated, results stay locked behind the wall.
  // The wall renders here too as a defense-in-depth in case the user lands
  // on this step without passing through the LoadingView trigger.
  if (!authedLocal) {
    const top = recommendations[0]
    return (
      <div className="bg-ink text-soft min-h-screen pt-32 lg:pt-40 pb-24 grain-soft">
        <Cinematic>
          <p className="type-eyebrow text-gold mb-6 flex items-center gap-4">
            <span aria-hidden="true" className="block h-px w-12 bg-gold/70" />
            Your Grooming Report — Locked
          </p>
          <h1 className="type-hero-lg">
            One moment.
            <br />
            <span className="italic font-medium text-mute">Claim your profile.</span>
          </h1>
        </Cinematic>

        <AuthWall
          open
          previewImageUrl={top?.image_url ?? null}
          topStyle={top?.style_name}
          topScore={top?.match_score}
          flow={flow}
          uploadMethod={flow}
          quizComplete={flow === 'quiz'}
          onAuthenticated={() => {
            setAuthedLocal(true)
            setAuthenticated(true)
          }}
        />
      </div>
    )
  }

  const [primary, ...secondary] = recommendations

  return (
    <div className="bg-ink text-soft min-h-screen">

      {/* ── Cinematic editorial header ───────────────────────────── */}
      <Cinematic className="pt-32 lg:pt-40 pb-12 lg:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeLux }}
          className="grid grid-cols-12 gap-y-8 lg:gap-x-12"
        >
          <div className="col-span-12 lg:col-span-8">
            <SectionEyebrow className="mb-6">
              Your Grooming Report — Edition I
            </SectionEyebrow>
            <h1 className="type-hero-lg">
              The taper styles
              <br />
              <span className="italic font-medium text-mute">most likely to suit you.</span>
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-3 lg:col-start-10 lg:pt-3">
            <p className="type-eyebrow text-mute mb-3">Methodology</p>
            <p className="text-sm text-soft/65 leading-[1.75]">
              Each match is scored against your face geometry, hair texture, and maintenance
              tolerance. Recommendations are ranked — not equalized.
            </p>
          </div>
        </motion.div>
      </Cinematic>

      {recommendations.length === 0 ? (
        <Cinematic className="py-20">
          <div className="rounded-hero border border-line bg-surface/30 py-20 text-center">
            <p className="text-base text-soft/65 mb-8">
              We couldn&apos;t generate a recommendation right now.
            </p>
            <Button variant="cream" size="lg" onClick={reset}>Start over</Button>
          </div>
        </Cinematic>
      ) : (
        <div className="space-y-20 lg:space-y-28 pb-24 lg:pb-32">

          {/* ── Primary match — fullscreen-feeling immersive split ─ */}
          {primary && (
            <motion.section
              aria-labelledby="primary-heading"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: easeLux }}
            >
              <h2 id="primary-heading" className="sr-only">Primary match</h2>
              <Cinematic>
                <PrimaryMatch rec={primary} imageLoading={!!imageLoading[0]} />
              </Cinematic>

              {/* Sharing module — sits directly below the primary match */}
              <Cinematic className="mt-6">
                <SocialShare rec={primary} />
              </Cinematic>

              {/* Save & remind — pairs with lifecycle email API */}
              <Cinematic className="mt-6">
                <RemindMe rec={primary} />
              </Cinematic>
            </motion.section>
          )}

          {/* ── Secondary lookbook rail ─────────────────────────── */}
          {secondary.length > 0 && (
            <Cinematic>
              <SecondaryRail recs={secondary} imageLoading={imageLoading} />
            </Cinematic>
          )}

          {/* ── Inline feedback ─────────────────────────────────── */}
          <Cinematic>
            <InlineFeedback recommendations={recommendations} flow={flow} />
          </Cinematic>

          {/* ── Restart CTA ─────────────────────────────────────── */}
          <Cinematic>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: easeLux }}
              className="text-center pt-8 border-t border-line"
            >
              <p className="type-eyebrow text-mute mb-5">Another read</p>
              <p className="text-soft/65 leading-[1.75] max-w-md mx-auto mb-8">
                Profile didn&rsquo;t feel right? Re-run with a different photo or different inputs
                in under a minute.
              </p>
              <Button variant="outline" size="lg" onClick={reset}>
                Start a new analysis
              </Button>
            </motion.div>
          </Cinematic>
        </div>
      )}

      <FeedbackToast recommendations={recommendations} flow={flow} />
    </div>
  )
}
