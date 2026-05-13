'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PhotoUpload } from './PhotoUpload'
import { Quiz } from './Quiz'
import { LoadingView } from './LoadingView'
import { Results } from './Results'
import { useToolStore } from '@/store/useToolStore'
import { getRecommendations } from '@/lib/api-client'
import type { QuizData, ToolInput } from '@/types'
import type { PreparedPhoto } from '@/lib/image'

type Tab = 'photo' | 'quiz'

export function ToolFlow() {
  const { step, submit, success, validation, validationError } = useToolStore()
  const [tab, setTab] = useState<Tab>('photo')

  const dispatch = async (input: ToolInput) => {
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

  const handleQuiz = (data: QuizData) => dispatch({ type: 'quiz', data })

  if (step === 'loading') return <LoadingView mode={tab} />
  if (step === 'results') return <Results />

  return (
    <div className="bg-milk text-jet-black">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-16 lg:pt-24 pb-24 lg:pb-32">

        {/* Editorial intro */}
        <div className="grid grid-cols-12 gap-y-8 lg:gap-x-10 mb-14 lg:mb-20">
          <div className="col-span-12 lg:col-span-8">
            <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-mocha mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="block h-px w-8 bg-jet-black" />
              Phase I — Capture
            </p>
            <h1 className="font-display font-extrabold tracking-[-0.03em] leading-[0.95] text-[clamp(2.25rem,5.5vw,4.5rem)]">
              Begin the analysis.
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pt-2">
            <p className="text-sm text-mocha leading-[1.7]">
              Two paths, same destination — a structured read of your face geometry, hair texture,
              and maintenance reality.
            </p>
          </div>
        </div>

        {/* Mode selector — editorial tabs */}
        <div className="border-t-2 border-jet-black flex" role="tablist" aria-label="Capture method">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'photo'}
            onClick={() => setTab('photo')}
            className={`flex-1 py-5 lg:py-6 px-4 text-left transition-colors border-r border-jet-black/15 group ${
              tab === 'photo' ? 'bg-milk' : 'bg-milk hover:bg-oat/40'
            }`}
          >
            <div className="flex items-baseline gap-4">
              <span className={`text-[10px] font-semibold tracking-[0.32em] uppercase ${
                tab === 'photo' ? 'text-jet-black' : 'text-mocha'
              }`}>
                I
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className={`font-display font-extrabold tracking-tight text-xl lg:text-2xl ${
                    tab === 'photo' ? 'text-jet-black' : 'text-mocha group-hover:text-jet-black'
                  } transition-colors`}>
                    Upload Photo
                  </span>
                  <span className="text-[9px] font-semibold tracking-[0.22em] uppercase bg-jet-black text-milk px-2 py-0.5">
                    Recommended
                  </span>
                </div>
                <p className={`text-sm ${tab === 'photo' ? 'text-mocha' : 'text-mocha/70'}`}>
                  Photo-based facial structure read
                </p>
              </div>
            </div>
            {tab === 'photo' && (
              <motion.div
                layoutId="tab-indicator"
                className="h-0.5 bg-jet-black mt-5 -mb-[1px]"
                transition={{ duration: 0.3 }}
              />
            )}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={tab === 'quiz'}
            onClick={() => setTab('quiz')}
            className={`flex-1 py-5 lg:py-6 px-4 text-left transition-colors group ${
              tab === 'quiz' ? 'bg-milk' : 'bg-milk hover:bg-oat/40'
            }`}
          >
            <div className="flex items-baseline gap-4">
              <span className={`text-[10px] font-semibold tracking-[0.32em] uppercase ${
                tab === 'quiz' ? 'text-jet-black' : 'text-mocha'
              }`}>
                II
              </span>
              <div className="flex-1">
                <span className={`font-display font-extrabold tracking-tight text-xl lg:text-2xl block mb-1 ${
                  tab === 'quiz' ? 'text-jet-black' : 'text-mocha group-hover:text-jet-black'
                } transition-colors`}>
                  Quick Quiz
                </span>
                <p className={`text-sm ${tab === 'quiz' ? 'text-mocha' : 'text-mocha/70'}`}>
                  Five short questions, ~1 minute
                </p>
              </div>
            </div>
            {tab === 'quiz' && (
              <motion.div
                layoutId="tab-indicator"
                className="h-0.5 bg-jet-black mt-5 -mb-[1px]"
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        </div>

        <div className="border-b-2 border-jet-black mb-10 lg:mb-12" aria-hidden="true" />

        {validationError && (
          <div role="alert" className="border-y border-error bg-oat/40 px-6 py-5 mb-8">
            <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-error mb-2">
              Heads up
            </p>
            <p className="text-sm text-jet-black leading-relaxed">{validationError}</p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {tab === 'photo' ? (
            <motion.div
              key="photo"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <PhotoUpload onAnalyze={handlePhoto} />
            </motion.div>
          ) : (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <Quiz onComplete={handleQuiz} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
