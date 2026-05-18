'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { easeLux } from '@/lib/motion'
import { Mail, Check, AlertCircle } from 'lucide-react'
import type { Recommendation } from '@/types'
import { encodeShare, shareUrl as shareUrlFor } from '@/lib/share'
import { getReferrer, getSelfId } from '@/lib/referral'

interface Props {
  rec: Recommendation
}

type Mode = 'idle' | 'saving' | 'sent' | 'error'

/**
 * RemindMe — inline email-capture block that pairs with the lifecycle API.
 * Users get the share link emailed to them so they can return later (and
 * we have permission to drip them maintenance reminders).
 */
export function RemindMe({ rec }: Props) {
  const [email, setEmail] = useState('')
  const [mode, setMode] = useState<Mode>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (mode === 'saving') return
    setError(null)

    const trimmed = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      setMode('error')
      setError('Use a valid email — we only send the brief and an optional refresh reminder.')
      return
    }

    setMode('saving')
    try {
      const refererId = getReferrer() ?? undefined
      const selfId = getSelfId()
      const token = encodeShare(rec, selfId)
      const url = shareUrlFor(token)

      const r = await fetch('/api/lifecycle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'remind_match',
          email: trimmed,
          shareToken: token,
          shareUrl: url,
          styleName: rec.style_name,
          matchScore: rec.match_score,
          refererId,
          cadenceWeeks: 3,
        }),
      })
      if (!r.ok) throw new Error('send failed')
      setMode('sent')
    } catch {
      setMode('error')
      setError('Couldn\'t save right now. Try again, or copy the share link instead.')
    }
  }

  return (
    <div className="rounded-3xl border border-line bg-surface/30 overflow-hidden">
      <div className="px-6 lg:px-10 py-5 border-b border-line flex items-center justify-between gap-4">
        <p className="text-[10px] font-medium tracking-[0.32em] uppercase text-gold">
          Save &amp; remind
        </p>
        <p className="hidden sm:block text-[10px] font-medium tracking-[0.32em] uppercase text-mute">
          We&apos;ll email the brief + a refresh nudge in three weeks
        </p>
      </div>

      <div className="px-6 lg:px-10 py-7 lg:py-8">
        <AnimatePresence mode="wait" initial={false}>
          {mode !== 'sent' ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: easeLux }}
            >
              <p className="font-display font-extrabold tracking-[-0.025em] text-soft text-xl lg:text-2xl leading-[1.2] mb-2 max-w-xl">
                Email me the brief.
              </p>
              <p className="text-soft/65 leading-[1.7] text-[14.5px] mb-6 max-w-xl">
                We send the shareable link plus a single maintenance reminder near week three.
                No newsletter, no list.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
                <label htmlFor="remindme-email" className="sr-only">Email address</label>
                <div className="relative flex-1">
                  <Mail
                    aria-hidden="true"
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-soft/45"
                    strokeWidth={1.5}
                  />
                  <input
                    id="remindme-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (mode === 'error') setMode('idle') }}
                    placeholder="you@example.com"
                    required
                    className="w-full h-12 pl-11 pr-4 rounded-pill bg-surface2 border border-line text-soft text-sm placeholder:text-soft/40 focus:outline-none focus:border-gold focus:bg-surface transition-colors duration-300"
                  />
                </div>
                <button
                  type="submit"
                  disabled={mode === 'saving'}
                  className="h-12 px-7 rounded-pill bg-soft text-ink text-[11px] font-semibold tracking-[0.20em] uppercase transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {mode === 'saving' ? 'Sending…' : 'Send me the brief'}
                </button>
              </div>

              {mode === 'error' && error && (
                <p className="mt-4 flex items-center gap-2 text-[13px] text-red-300/90">
                  <AlertCircle className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                  {error}
                </p>
              )}
            </motion.form>
          ) : (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: easeLux }}
              className="flex items-start gap-4"
            >
              <span className="mt-1 grid place-items-center w-8 h-8 rounded-full bg-gold/15 border border-gold/45 text-gold">
                <Check className="w-4 h-4" strokeWidth={2} />
              </span>
              <div>
                <p className="font-display font-extrabold tracking-[-0.02em] text-soft text-xl lg:text-2xl leading-[1.2] mb-2">
                  Sent — check your inbox.
                </p>
                <p className="text-soft/65 leading-[1.75] text-[14.5px] max-w-xl">
                  We&apos;ll send the brief now and a single refresh reminder around week three. You can
                  unsubscribe from any reminder with one tap.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
