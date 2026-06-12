'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  submitEmail, markAuthenticated, type AuthProvider,
} from '@/lib/api-client'
import { track, getSessionId } from '@/lib/analytics'
import { getReferrer, getSelfId } from '@/lib/referral'
import { easeLux } from '@/lib/motion'

/**
 * Phase 07.5 — Premium Hard Auth Wall
 *
 * Hard-gate fullscreen overlay that blocks all access to final results
 * until the user claims their grooming intelligence profile. There is
 * intentionally no close button and Esc is intercepted — results are
 * the product, and unlocking them is the conversion event the entire
 * funnel is optimized around.
 *
 * Emotional framing: 'premium access unlocking' rather than 'please
 * create an account'. Headline, value bullets, and beta-access trust
 * copy all reinforce the future-paid product positioning.
 */

interface AuthWallProps {
  open: boolean
  /** Blurred preview backdrop — usually the top recommendation image URL. */
  previewImageUrl?: string | null
  /** Top recommendation snapshot for both backdrop chrome and analytics. */
  topStyle?: string
  topScore?: number
  /** Flow tag for analytics + lifecycle segmentation. */
  flow?: 'photo' | 'quiz' | string
  uploadMethod?: 'photo' | 'quiz' | string
  quizComplete?: boolean
  /** Called once the user has authenticated. Parent should reveal results. */
  onAuthenticated: () => void
}

type View = 'choice' | 'email' | 'done'

const VALUE_BULLETS = [
  'Face Structure Index™',
  'TaperMatch™ Score',
  'Grooming Compatibility Rating™',
  'Maintenance Profile™',
  'Barber-ready recommendations',
] as const

export function AuthWall({
  open,
  previewImageUrl,
  topStyle,
  topScore,
  flow,
  uploadMethod,
  quizComplete,
  onAuthenticated,
}: AuthWallProps) {
  const [view, setView] = useState<View>('choice')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [provider, setProvider] = useState<AuthProvider>('email')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  // Phase S — GDPR/CAN-SPAM consent.
  // Terms is hard-required; marketing is opt-in (pre-UNCHECKED).
  const [consentTerms, setConsentTerms] = useState(false)
  const [consentMarketing, setConsentMarketing] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)

  // Reset to choice each time the wall opens
  useEffect(() => {
    if (open) {
      setView('choice'); setError(null); setProvider('email')
      setConsentTerms(false); setConsentMarketing(false)
      track('auth_wall_viewed', { flow })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Focus email field when email view opens
  useEffect(() => {
    if (view === 'email') {
      const t = setTimeout(() => emailRef.current?.focus({ preventScroll: true }), 240)
      return () => clearTimeout(t)
    }
  }, [view])

  // Hard gate — intercept Esc so it can't dismiss the wall
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation() }
    }
    document.addEventListener('keydown', onKey, { capture: true })
    return () => document.removeEventListener('keydown', onKey, { capture: true } as any)
  }, [open])

  // Body scroll lock while open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  const chooseProvider = (p: AuthProvider) => {
    setProvider(p)
    setView('email')
    track('auth_method_selected', { method: p, flow })
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setError(null)

    // Phase S — Terms consent is the lawful basis for storing the lead.
    // Marketing consent stays optional; the /api/email endpoint also
    // re-validates this server-side.
    if (!consentTerms) {
      setError('Please accept the Terms & Privacy Policy to continue.')
      return
    }

    setSubmitting(true)

    // UTM + landing path + referral attribution — read at submit time so the
    // values reflect the actual session, not a stale snapshot.
    const params =
      typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams()
    const landingPath =
      typeof window !== 'undefined' ? window.location.pathname : null

    const res = await submitEmail({
      email,
      name: name.trim() || undefined,
      provider,
      source: 'auth-wall',
      flow,
      uploadMethod,
      quizComplete,
      topStyle,
      topScore,
      sessionId: getSessionId(),
      // Phase S — Supabase email capture
      refererId: getReferrer(),
      selfId: getSelfId(),
      utm: {
        source: params.get('utm_source'),
        medium: params.get('utm_medium'),
        campaign: params.get('utm_campaign'),
        term: params.get('utm_term'),
        content: params.get('utm_content'),
      },
      landingPath,
      consentTerms,
      consentMarketing,
    })
    setSubmitting(false)

    if (!res.ok) {
      setError(res.error || 'Could not submit. Try again.')
      return
    }

    markAuthenticated({
      email: email.toLowerCase(),
      provider,
      ts: Date.now(),
      name: name.trim() || undefined,
    })

    track('lead_captured', { leadId: res.leadId ?? null, flow })
    track('signup_completed', { method: provider, flow, topStyle, topScore: topScore ?? null })
    setView('done')

    // Brief reveal moment, then signal parent
    setTimeout(() => onAuthenticated(), 1300)
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
          transition={{ duration: 0.55, ease: easeLux }}
          className="fixed inset-0 z-[80] flex"
        >
          {/* ── Blurred preview backdrop ─────────────────────────── */}
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            {previewImageUrl ? (
              <div
                className="absolute inset-0 scale-110 opacity-55"
                style={{
                  backgroundImage: `url(${previewImageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(32px) saturate(1.1)',
                }}
              />
            ) : null}
            <div className="absolute inset-0 bg-ink/85" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 55% 45% at 22% 18%, rgba(143,122,88,0.18) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 80% 85%, rgba(143,122,88,0.10) 0%, transparent 65%)',
              }}
            />
          </div>

          {/* ── Foreground content ───────────────────────────────── */}
          <div className="relative w-full h-full grid lg:grid-cols-12">

            {/* LEFT — blurred preview tease */}
            <div className="hidden lg:flex lg:col-span-7 flex-col justify-end p-12 xl:p-16 text-soft">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18, ease: easeLux }}
                className="type-eyebrow text-gold mb-5 flex items-center gap-4"
              >
                <span aria-hidden="true" className="block h-px w-12 bg-gold/70" />
                Preview — Your Grooming Profile
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.05, delay: 0.22, ease: easeLux }}
                className="type-hero-lg max-w-[16ch] mb-10"
              >
                Three matches.
                <br />
                <span className="italic font-medium text-mute">Locked.</span>
              </motion.h1>

              {/* Blurred stat tease — visible enough to create curiosity */}
              <motion.dl
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: easeLux }}
                className="grid grid-cols-3 gap-x-10 gap-y-3 max-w-xl"
              >
                {[
                  ['TaperMatch™',   topScore ? `${topScore}%`   : '——'],
                  ['Top Style',     topStyle || '— — — — —'],
                  ['Profile',       'Complete'],
                ].map(([k, v], i) => (
                  <div key={k as string}>
                    <dt className="type-eyebrow text-mute mb-2">{k}</dt>
                    <dd className={`font-display text-xl font-extrabold tracking-tight ${
                      i < 2 ? 'blur-[3px] select-none' : 'text-soft'
                    }`}>
                      {v}
                    </dd>
                  </div>
                ))}
              </motion.dl>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="mt-8 text-[11px] tracking-[0.32em] uppercase text-mute"
              >
                Unlock to reveal · Free beta access before premium launch
              </motion.p>
            </div>

            {/* RIGHT — auth panel */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.12, ease: easeLux }}
              className="col-span-12 lg:col-span-5 bg-ink/95 backdrop-blur-2xl border-l border-line flex flex-col justify-center p-6 sm:p-10 lg:p-12 xl:p-14 relative overflow-y-auto"
            >
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.28, ease: easeLux }}
              >
                <p className="type-eyebrow text-gold mb-6 flex items-center gap-4">
                  <span aria-hidden="true" className="block h-px w-12 bg-gold/70" />
                  Edition I — Access
                </p>

                <h2
                  id="authwall-title"
                  className="font-display font-extrabold tracking-[-0.035em] leading-[0.95] text-[clamp(2rem,3.6vw,3.25rem)] mb-5 max-w-[16ch]"
                >
                  Your taper profile
                  <br />
                  <span className="italic font-medium text-mute">is ready.</span>
                </h2>

                <p className="text-base text-soft/70 leading-[1.75] max-w-md mb-7">
                  Unlock your personalized grooming intelligence report.
                </p>

                {/* Value bullets — proprietary frameworks */}
                <ul className="mb-9 space-y-3 max-w-md">
                  {VALUE_BULLETS.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-sm text-soft/85">
                      <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
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
                      onClick={() => chooseProvider('google')}
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
                      onClick={() => chooseProvider('apple')}
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
                      onClick={() => chooseProvider('email')}
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
                    <p className="type-eyebrow text-gold mb-4 flex items-center gap-3">
                      <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
                      One moment — claim your profile
                    </p>

                    <div>
                      <label htmlFor="aw-name" className="block type-eyebrow text-mute mb-2">
                        Name <span className="text-mute/60 normal-case tracking-normal text-[10px]">(optional)</span>
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
                      <label htmlFor="aw-email" className="block type-eyebrow text-mute mb-2">Email</label>
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

                    {/* Phase S — required consent + opt-in marketing */}
                    <div className="space-y-3 pt-2">
                      <label className="flex items-start gap-3 text-[13px] text-soft/85 leading-[1.5] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consentTerms}
                          onChange={(e) => setConsentTerms(e.target.checked)}
                          required
                          className="mt-1 h-4 w-4 shrink-0 accent-gold cursor-pointer"
                        />
                        <span>
                          I agree to the{' '}
                          <a
                            href="/terms"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-soft/40 hover:decoration-gold hover:text-soft transition-colors"
                          >
                            Terms
                          </a>{' '}
                          and{' '}
                          <a
                            href="/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-soft/40 hover:decoration-gold hover:text-soft transition-colors"
                          >
                            Privacy Policy
                          </a>
                          .
                        </span>
                      </label>

                      <label className="flex items-start gap-3 text-[13px] text-soft/75 leading-[1.5] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consentMarketing}
                          onChange={(e) => setConsentMarketing(e.target.checked)}
                          className="mt-1 h-4 w-4 shrink-0 accent-gold cursor-pointer"
                        />
                        <span>Email me lifecycle tips and product picks.</span>
                      </label>
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
                      disabled={submitting || !consentTerms}
                      className="w-full !justify-between !px-6"
                    >
                      <span>{submitting ? 'Unlocking…' : 'Unlock my profile'}</span>
                      {!submitting && <ArrowRight className="w-4 h-4" />}
                    </Button>

                    <button
                      type="button"
                      onClick={() => setView('choice')}
                      className="w-full text-center type-eyebrow text-mute hover:text-soft transition-colors duration-300 pt-2"
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
                    transition={{ duration: 0.45, ease: easeLux }}
                    className="text-center"
                  >
                    <motion.div
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, ease: easeLux }}
                      className="w-14 h-14 mx-auto mb-5 grid place-items-center rounded-full bg-gold text-ink"
                    >
                      <Check className="w-6 h-6" strokeWidth={2.5} />
                    </motion.div>
                    <p className="font-display font-extrabold tracking-[-0.02em] text-2xl mb-2 text-soft">
                      Profile unlocked.
                    </p>
                    <p className="text-sm text-soft/65 leading-[1.75]">
                      Revealing your grooming report.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Beta trust copy */}
              <p className="mt-10 type-eyebrow text-mute leading-[1.8]">
                Currently free during early access &nbsp;·&nbsp; No card &nbsp;·&nbsp; Used only for your grooming profile
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── Brand marks ────────────────────────────────────────────────────── */
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
    <svg width="18" height="18" viewBox="0 0 384 512" aria-hidden="true" className="text-soft">
      <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
    </svg>
  )
}
