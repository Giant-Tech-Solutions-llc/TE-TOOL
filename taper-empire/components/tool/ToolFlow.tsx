'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PhotoUpload } from './PhotoUpload'
import { Quiz } from './Quiz'
import { LoadingView } from './LoadingView'
import { Results } from './Results'
import { useToolStore } from '@/store/useToolStore'
import { getRecommendations } from '@/lib/api-client'
import { captureReferral } from '@/lib/referral'
import { track } from '@/lib/analytics'
import type { QuizData, ToolInput } from '@/types'
import type { PreparedPhoto } from '@/lib/image'

type Tab = 'photo' | 'quiz'

export function ToolFlow() {
  const { step, submit, success, validation, validationError } = useToolStore()
  const [tab, setTab] = useState<Tab>('photo')

  // Phase 11 — capture inbound ?ref=<id> attribution + funnel entry telemetry
  // on first paint. First attribution wins; subsequent ?ref= visits don't
  // overwrite. The captured id flows through to outbound share links and the
  // lifecycle API so the upstream sharer gets credit.
  useEffect(() => {
    track('upload_started', { initialTab: tab })
    const ref = captureReferral()
    if (ref) {
      // Best-effort attribution ping — fire-and-forget, no UX cost.
      fetch('/api/lifecycle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'referral', refererId: ref }),
        keepalive: true,
      }).catch(() => {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dispatch = async (input: ToolInput) => {
    track('analysis_started', { flow: input.type })
    submit(input)
    try {
      const r = await getRecommendations(input)
      if (r.validationError) { validation(r.validationError.message); return }
      success(r.recommendations, {
        proxy: r.source === 'gemini' ? 'ok' : 'server-no-key',
        textSource: r.source,
        textReason: r.reason,
        errors: r.errors,
      })
    } catch (e: any) {
      validation(e?.message || 'Something went wrong.')
    }
  }

  const handlePhoto = (photo: PreparedPhoto) =>
    dispatch({ type: 'photo', data: { photo: photo.dataUrl, mimeType: photo.mimeType } as any })

  const handleQuiz = (data: QuizData) => {
    track('quiz_started', { completed: true })
    dispatch({ type: 'quiz', data })
  }

  if (step === 'loading') return <LoadingView mode={tab} />
  if (step === 'results') return <Results />

  return (
    <div className="bg-ink text-soft min-h-screen pt-32 lg:pt-40 pb-24">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">

        {/* Editorial intro */}
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12 mb-16 lg:mb-24">
          <div className="col-span-12 lg:col-span-8">
            <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-gold mb-6 flex items-center gap-4">
              <span aria-hidden="true" className="block h-px w-12 bg-gold/70" />
              Phase I — Capture
            </p>
            <h1 className="font-display font-extrabold tracking-[-0.04em] leading-[0.92] text-[clamp(2.5rem,6.2vw,5.5rem)]">
              Begin the
              <br />
              <span className="italic font-medium text-mute">analysis.</span>
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pt-3">
            <p className="text-base text-soft/65 leading-[1.75]">
              Two paths, same destination — a structured read of your face geometry, hair
              texture, and maintenance reality.
            </p>
          </div>
        </div>

        {/* Mode selector — tonal tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-10 lg:mb-14 p-1 rounded-2xl bg-surface/30 border border-line" role="tablist" aria-label="Capture method">
          <TabButton
            active={tab === 'photo'}
            num="I"
            title="Upload Photo"
            sub="Photo-based facial read"
            badge="Recommended"
            onClick={() => setTab('photo')}
          />
          <TabButton
            active={tab === 'quiz'}
            num="II"
            title="Quick Quiz"
            sub="Five questions, ~60s"
            onClick={() => setTab('quiz')}
          />
        </div>

        {validationError && (
          <div role="alert" className="border-l-2 border-error bg-surface/60 px-6 py-5 mb-10 rounded-r-2xl">
            <p className="text-[10px] font-medium tracking-[0.32em] uppercase text-error mb-2">Heads up</p>
            <p className="text-sm text-soft leading-relaxed">{validationError}</p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {tab === 'photo' ? (
            <motion.div
              key="photo"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <PhotoUpload onAnalyze={handlePhoto} />
            </motion.div>
          ) : (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Quiz onComplete={handleQuiz} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function TabButton({
  active, num, title, sub, badge, onClick,
}: {
  active: boolean; num: string; title: string; sub: string; badge?: string; onClick: () => void
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`relative text-left p-5 lg:p-7 rounded-xl transition-all duration-300 ease-out ${
        active
          ? 'bg-surface2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_4px_18px_rgba(0,0,0,0.35)]'
          : 'bg-transparent hover:bg-surface/60'
      }`}
    >
      <div className="flex items-baseline gap-5">
        <span className={`text-[10px] font-medium tracking-[0.4em] uppercase transition-colors ${active ? 'text-gold' : 'text-mute'}`}>
          {num}
        </span>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className={`font-display font-extrabold tracking-[-0.015em] text-xl lg:text-2xl transition-colors ${
              active ? 'text-soft' : 'text-soft/80'
            }`}>
              {title}
            </span>
            {badge && (
              <span className="text-[9px] font-medium tracking-[0.32em] uppercase bg-gold text-ink px-2.5 py-0.5 rounded-full">
                {badge}
              </span>
            )}
          </div>
          <p className={`text-sm transition-colors ${active ? 'text-mute' : 'text-mute/70'}`}>{sub}</p>
        </div>
      </div>
    </button>
  )
}
