'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'
import type { Recommendation } from '@/types'
import { Button } from '@/components/ui/button'

interface AuthWallProps {
  open: boolean
  preview?: Recommendation | null
  onContinueWithGoogle?: () => void
  onContinueWithEmail?: () => void
  onClose?: () => void
}

/**
 * Fullscreen luxury auth wall.
 * Background: blurred preview of the user's results.
 * Foreground: minimal premium auth panel.
 *
 * Wire into the flow by gating the Results page render on auth state.
 * The visual treatment matches the v2 spec — no SaaS OAuth boilerplate.
 */
export function AuthWall({
  open, preview, onContinueWithGoogle, onContinueWithEmail, onClose,
}: AuthWallProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[80] flex"
          role="dialog"
          aria-modal="true"
          aria-labelledby="authwall-title"
        >
          {/* Blurred preview background */}
          <div className="absolute inset-0 overflow-hidden">
            {preview?.image_url ? (
              <Image
                src={preview.image_url}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover scale-110 blur-xl opacity-60"
                unoptimized
              />
            ) : null}
            <div className="absolute inset-0 bg-ink/85" />
            <div className="absolute inset-0" style={{
              background:
                'radial-gradient(ellipse 60% 50% at 20% 20%, rgba(143,122,88,0.12) 0%, transparent 60%)',
            }} />
          </div>

          {/* Foreground */}
          <div className="relative w-full h-full grid lg:grid-cols-12">

            {/* LEFT — atmospheric preview meta */}
            <div className="hidden lg:flex lg:col-span-7 flex-col justify-end p-12 xl:p-16 text-soft">
              <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-gold mb-4 flex items-center gap-4">
                <span aria-hidden="true" className="block h-px w-12 bg-gold/70" />
                Preview — Your Grooming Profile
              </p>
              <p className="font-display font-extrabold tracking-[-0.04em] leading-[0.92] text-[clamp(2.5rem,5vw,5rem)] max-w-[16ch] mb-10">
                Three matches.
                <br />
                <span className="italic font-medium text-mute">Locked.</span>
              </p>

              {preview && (
                <dl className="grid grid-cols-3 gap-x-10 gap-y-3 max-w-xl">
                  {[
                    ['TaperMatch™', `${preview.match_score}%`],
                    ['Top Style',   preview.style_name],
                    ['Profile',     'Complete'],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[10px] tracking-[0.32em] uppercase text-mute mb-2">{k}</dt>
                      <dd className="font-display text-xl font-extrabold tracking-tight">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            {/* RIGHT — auth panel */}
            <div className="col-span-12 lg:col-span-5 bg-ink/95 backdrop-blur-2xl border-l border-line flex flex-col justify-center p-8 lg:p-12 xl:p-16 relative">
              {onClose && (
                <button
                  type="button"
                  aria-label="Close"
                  onClick={onClose}
                  className="absolute top-6 right-6 w-10 h-10 grid place-items-center text-mute hover:text-soft transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-gold mb-6 flex items-center gap-4">
                <span aria-hidden="true" className="block h-px w-12 bg-gold/70" />
                Edition I — Access
              </p>

              <h2
                id="authwall-title"
                className="font-display font-extrabold tracking-[-0.035em] leading-[0.95] text-[clamp(2.25rem,4vw,3.75rem)] mb-6"
              >
                Your taper profile
                <br />
                <span className="italic font-medium text-mute">is ready.</span>
              </h2>
              <p className="text-base text-soft/65 leading-[1.75] max-w-md mb-10">
                Unlock your personalized grooming intelligence report — AI taper recommendations,
                compatibility scores, face-shape analysis, and barber-ready references.
              </p>

              {/* OAuth — oversized luxury, soft tactile pill */}
              <Button
                variant="cream"
                size="xl"
                shape="pill"
                onClick={onContinueWithGoogle}
                className="w-full !justify-between !px-7 mb-3"
              >
                <span className="flex items-center gap-4">
                  <GoogleMark />
                  <span>Continue with Google</span>
                </span>
                <span aria-hidden="true">→</span>
              </Button>

              <Button
                variant="outline"
                size="xl"
                shape="pill"
                onClick={onContinueWithEmail}
                className="w-full !justify-between !px-7"
              >
                <span>Continue with email</span>
                <span aria-hidden="true">→</span>
              </Button>

              <p className="mt-10 text-[10px] tracking-[0.32em] uppercase text-mute leading-relaxed">
                No card · No spam · Used only for your grooming profile
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function GoogleMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  )
}
