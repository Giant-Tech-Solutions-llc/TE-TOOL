'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, MessageSquare } from 'lucide-react'
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
      if (r.validationError) {
        validation(r.validationError.message)
        return
      }
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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-10"
      >
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-jet-black mb-3 tracking-tight">
          How would you like to get started?
        </h1>
        <p className="text-mocha">Upload a photo for the most accurate AI recommendations</p>
      </motion.div>

      {/* Mode selector */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-stretch mb-10">
        <button
          type="button"
          onClick={() => setTab('photo')}
          className={`relative p-5 rounded-2xl border-2 transition-colors text-center flex flex-col items-center gap-2
            ${tab === 'photo' ? 'border-accent bg-oat/40' : 'border-border bg-milk hover:border-accent'}`}
        >
          <span className="absolute top-2 right-2 bg-accent text-milk px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider">
            Best
          </span>
          <Upload className={`w-7 h-7 ${tab === 'photo' ? 'text-accent' : 'text-mocha'}`} />
          <span className="font-semibold text-jet-black">Upload Photo</span>
          <span className="text-sm text-mocha">AI reads your face shape</span>
        </button>

        <div className="hidden sm:flex items-center text-taupe font-semibold">OR</div>

        <button
          type="button"
          onClick={() => setTab('quiz')}
          className={`p-5 rounded-2xl border-2 transition-colors text-center flex flex-col items-center gap-2
            ${tab === 'quiz' ? 'border-accent bg-oat/40' : 'border-border bg-milk hover:border-accent'}`}
        >
          <MessageSquare className={`w-7 h-7 ${tab === 'quiz' ? 'text-accent' : 'text-mocha'}`} />
          <span className="font-semibold text-jet-black">Quick Quiz</span>
          <span className="text-sm text-mocha">5 questions, ~1 minute</span>
        </button>
      </div>

      {validationError && (
        <div role="alert" className="bg-oat/40 border border-error rounded-xl p-4 mb-6 text-jet-black">
          <strong className="text-error">Heads up: </strong>
          {validationError}
        </div>
      )}

      <AnimatePresence mode="wait">
        {tab === 'photo' ? (
          <motion.div
            key="photo"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <PhotoUpload onAnalyze={handlePhoto} />
          </motion.div>
        ) : (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <Quiz onComplete={handleQuiz} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
