'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { submitEmail, markAuthenticated } from '@/lib/api-client'
import { easeLux } from '@/lib/motion'

/**
 * Phase 07 — Auth Wall (premium conversion overlay)
 *
 * Triggers at ~80 % analysis progress, after emotional investment. The
 * visible page state freezes behind a blurred preview, and the foreground
 * presents a luxury fullscreen panel asking the user to claim their
 * profile via Google, Apple, or email. Email capture is wired to a real
 * /api/email endpoint that forwards to webhook + server log.
 *
 * Closing the wall (X / Esc) is intentionally allowed during beta — we
 * value session continuity over hard signup gates while the funnel is
 * still calibrating. Set `gate` to 'hard' to block dismissal.
 */

interface AuthWallProps {
  open: boolean
  /** Either 'soft' (X + Esc allowed) or 'hard' (must complete). Default soft. */
  gate?: 'soft' | 'hard'
  /** Blurred preview backdrop — top recommendation image url. */
  previewImageUrl?: string | null
  /** Flow tag for analytics (photo / quiz / etc). */
  flow?: string
  /** Soft headline override — defaults to spec headline. */
  headline?: string
  onClose?: () => void
  onAuthenticated?: () => void
}

type View = 'choice' | 'email' | 'done'

export function AuthWall({
  open,
  gate = 'soft',
  previewImageUrl,
  flow,
  headline,
  onClose,
  onAuthenticated,
}: AuthWallProps) {
  const [view, setView] = useState<View>('choice')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)

  // Reset to choice screen each time the wall opens
  useEffect(() => {
    if (open) { setView('choice'); setError(null) }
  }, [open])

  // Focus email field whenever the email view opens
  useEffect(() => {
    if (view === 'email') {
      const t = setTimeout(() => emailRef.current?.focus({ preventScroll: true }), 240)
      return () => clearTimeout(t)
    }
  }, [view])

  // Esc to close (soft gate only)
  useEffect(() => {
    if (!open || gate === 'hard') return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, gate, onClose])

  // Body scroll lock while open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setError(null)
    setSubmitting(true)
    const res = await submitEmail({ email, name: name.trim(), source: 'auth-wall', flow })
    setSubmitting(false)
    if (!res.ok) { setError(res.error || 'Could not submit. Try again.'); return }

    markAuthenticated()
    setView('done')

    // Brief reveal, then signal parent
    setTimeout(() => {
      onAuthenticated?.()
    }, 1200)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="authwall-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: easeLux }}
          className="fixed inset-0 z-[80] flex"
        >
          {/* ── Blurred preview backdrop ─────────────────────────── */}
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            {previewImageUrl ? (
              <div
                className="absolute inset-0 scale-110 opacity-50"
                style={{
                  backgroundImage: `url(${previewImageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(28px) saturate(1.1)',
                }}
              />
            ) : null}
            {/* Tonal scrim */}
            <div className="absolute inset-0 bg-ink/85" />
            {/* Warm gold spotlight */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 55% 45% at 22% 18%, rgba(143,122,88,0.16) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 80% 85%, rgba(143,122,88,0.10) 0%, transparent 65%)',
              }}
            />
          </div>

          {/* ── Foreground content ───────────────────────────────── */}
          <div className="relative w-full h-full grid lg:grid-cols-12">

            {/* LEFT — preview meta (lg+) */}
            <div className="hidden lg:flex lg:col-span-7 flex-col justify-end p-12 xl:p-16 text-soft">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: easeLux }}
                className="type-eyebrow text-gold mb-5 flex items-center gap-4"
              >
                <span aria-hidden="true" className="block h-px w-12 bg-gold/70" />
                Preview — Your Grooming Profile
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: easeLux }}
                className="type-hero-lg max-w-[16ch] mb-12"
              >
                Three matches.
                <br />
                <span className="italic font-medium text-mute">Locked.</span>
              </motion.h1>

              <motion.dl
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: easeLux }}
                className="grid grid-cols-3 gap-x-10 gap-y-3 max-w-xl"
              >
                {[
                  ['TaperMatch™',  '—'],
                  ['Compatibility','—'],
                  ['Status',       'Complete'],
                ].map(([k, v]) => (
                  <div key={k as string}>
                    <dt className="type-eyebrow text-mute mb-2">{k}</dt>
                    <dd className="font-display text-xl font-extrabold tracking-tight text-soft">{v}</dd>
                  </div>
                ))}
              </motion.dl>
            </div>

            {/* RIGHT — auth panel */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.6, delay: 0.1, ease: easeLux }}
              className="col-span-12 lg:col-span-5 bg-ink/95 backdrop-blur-2xl border-l border-line flex flex-col justify-center p-6 sm:p-10 lg:p-12 xl:p-14 relative"
            >
              {gate === 'soft' && onClose && (
                <button
                  type="button"
                  aria-label="Close"
                  onClick={onClose}
                  className="absolute top-6 right-6 w-11 h-11 rounded-full bg-surface2/60 border border-line grid place-items-center text-mute hover:text-soft hover:bg-surface2 hover:scale-105 transition-all duration-300 ease-lux"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: easeLux }}
              >
                <p className="type-eyebrow text-gold mb-6 flex items-center gap-4">
                  <span aria-hidden="true" className="block h-px w-12 bg-gold/70" />
                  Edition I — Access
                </p>

                <h2
                  id="authwall-title"
                  className="font-display font-extrabold tracking-[-0.035em] leading-[0.95] text-[clamp(2.25rem,4vw,3.75rem)] mb-6 max-w-[16ch]"
                >
                  {headline ?? (
                    <>
                      Your taper profile
                      <br />
                      <span className="italic font-medium text-mute">is ready.</span>
                    </>
                  )}
                </h2>

                <p className="text-base text-soft/70 leading-[1.75] max-w-md mb-10">
                  Unlock your personalized grooming intelligence report — AI taper recommendations,
                  compatibility scores, face-shape analysis, and barber-ready references.
                </p>
              </motion.div>

              {/* View switcher — choice / email / done */}
              <AnimatePresence mode="wait">
                {view === 'choice' && (
                  <motion.div
                    key="choice"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: easeLux }}
                    className="space-y-3"
                  >
                    <Button
                      variant="cream"
                      size="xl"
                      shape="pill"
                      onClick={() => setView('email')}
                      className="w-full !justify-between !px-6"
                    >
                      <span className="flex items-center gap-3">
                        <GoogleMark />
                        <span>Continue with Google</span>
                      </span>
                      <span aria-hidden="true">→</span>
                    </Button>

                    <Button
                      variant="outline"
                      size="xl"
                      shape="pill"
                      onClick={() => setView('email')}
                      className="w-full !justify-between !px-6"
                    >
                      <span className="flex items-center gap-3">
                        <AppleMark />
                        <span>Continue with Apple</span>
                      </span>
                      <span aria-hidden="true">→</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="xl"
                      shape="pill"
                      onClick={() => setView('email')}
                      className="w-full !justify-between !px-6"
                    >
                      <span>Continue with email</span>
                      <span aria-hidden="true">→</span>
                    </Button>
                  </motion.div>
                )}

                {view === 'email' && (
                  <motion.form
                    key="email"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: easeLux }}
                    onSubmit={handleEmailSubmit}
                    className="space-y-4"
                  >
                    <p className="type-eyebrow text-gold mb-5 flex items-center gap-3">
                      <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
                      One moment — claim your profile
                    </p>

                    <div>
                      <label htmlFor="aw-name" className="block type-eyebrow text-mute mb-2">
                        Name <span className="text-mute/60">(optional)</span>
                      </label>
                      <input
                        id="aw-name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value.slice(0, 120))}
                        placeholder="What should we call you?"
                        className="w-full bg-surface2 text-soft border border-line rounded-pill px-6 h-14 outline-none focus:border-gold transition-colors duration-300 placeholder:text-mute/60"
                      />
                    </div>

                    <div>
                      <label htmlFor="aw-email" className="block type-eyebrow text-mute mb-2">
                        Email
                      </label>
                      <input
                        id="aw-email"
                        ref={emailRef}
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value.slice(0, 320))}
                        placeholder="your@email.com"
                        className="w-full bg-surface2 text-soft border border-line rounded-pill px-6 h-14 outline-none focus:border-gold transition-colors duration-300 placeholder:text-mute/60"
                      />
                    </div>

                    {error && (
                      <p role="alert" className="text-sm text-error">{error}</p>
                    )}

                    <Button
                      type="submit"
                      variant="cream"
                      size="xl"
                      shape="pill"
                      loading={submitting}
                      disabled={submitting}
                      className="w-full !justify-between !px-6"
                    >
                      <span>{submitting ? 'Unlocking…' : 'Unlock my profile'}</span>
                      {!submitting && <ArrowRight className="w-4 h-4" />}
                    </Button>

                    <button
                      type="button"
                      onClick={() => setView('choice')}
                      className="w-full text-center text-[11px] tracking-[0.22em] uppercase text-mute hover:text-soft transition-colors duration-300 pt-2"
                    >
                      ← Other options
                    </button>
                  </motion.form>
                )}

                {view === 'done' && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: easeLux }}
                    className="text-center"
                  >
                    <div className="w-14 h-14 mx-auto mb-5 grid place-items-center rounded-full bg-gold text-ink">
                      <Check className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                    <p className="font-display font-extrabold tracking-[-0.02em] text-2xl mb-2 text-soft">
                      Profile unlocked.
                    </p>
                    <p className="text-sm text-soft/65 leading-[1.75]">
                      Your grooming report is loading.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Beta messaging */}
              <p className="mt-10 type-eyebrow text-mute leading-[1.8]">
                Currently free during beta &nbsp;·&nbsp; No card &nbsp;·&nbsp; Used only for your grooming profile
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── Brand marks — minimal, monochrome-on-cream ─────────────────────── */
function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  )
}

function AppleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 384 512" aria-hidden="true" className="text-ink">
      <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
    </svg>
  )
}
