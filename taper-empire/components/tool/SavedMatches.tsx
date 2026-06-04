'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bookmark, ExternalLink, Trash2 } from 'lucide-react'
import { Cinematic } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { easeLux } from '@/lib/motion'

const STORAGE_KEY = 'taperempire-saved'

interface SavedEntry {
  name: string
  score: number
  url?: string
  token?: string
  ts: number
}

export function SavedMatches() {
  const [items, setItems] = useState<SavedEntry[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      setItems(raw ? JSON.parse(raw) : [])
    } catch {
      setItems([])
    }
    setHydrated(true)
  }, [])

  const sorted = useMemo(
    () => [...items].sort((a, b) => b.ts - a.ts),
    [items],
  )

  function removeOne(name: string) {
    setItems((prev) => {
      const next = prev.filter((p) => p.name !== name)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }

  function clearAll() {
    setItems([])
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }

  return (
    <section className="relative bg-ink text-soft border-t border-line grain-soft">
      <Cinematic className="pt-32 lg:pt-40 pb-28 lg:pb-36">
        <p className="type-eyebrow text-gold mb-7 flex items-center gap-3">
          <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
          Saved · Personal
        </p>

        <header className="mb-14 lg:mb-20 max-w-4xl">
          <h1 className="font-display font-extrabold tracking-[-0.04em] text-[clamp(44px,6vw,88px)] leading-[1] mb-7">
            Your saved matches.
          </h1>
          <p className="text-soft/70 leading-[1.7] text-lg lg:text-xl max-w-3xl">
            Everything you&apos;ve bookmarked from the tool, stored on this device only. Pull up the
            brief, re-open the share link, or start a fresh analysis.
          </p>
        </header>

        {hydrated && sorted.length === 0 && <EmptyState />}

        {sorted.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {sorted.map((item, i) => (
                <motion.article
                  key={item.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: easeLux }}
                  className="relative rounded-lg-x border border-line bg-surface/30 p-7 lg:p-8 transition-all duration-500 ease-lux hover:border-lineHover hover:bg-surface/60 hover:-translate-y-1 hover:shadow-luxury-sm"
                >
                  <div className="flex items-start justify-between mb-6">
                    <span className="grid place-items-center w-10 h-10 rounded-full bg-gold/10 border border-gold/35 text-gold">
                      <Bookmark className="w-4 h-4" strokeWidth={1.6} />
                    </span>
                    <span className="font-display font-extrabold tabular-nums tracking-[-0.04em] text-soft text-3xl leading-none">
                      {item.score}<span className="text-mute text-base align-top ml-1">%</span>
                    </span>
                  </div>

                  <p className="type-eyebrow text-gold mb-3">TaperMatch™</p>
                  <h2 className="font-display font-extrabold tracking-[-0.025em] text-soft text-xl lg:text-[22px] leading-[1.15] mb-6">
                    {item.name}
                  </h2>

                  <p className="text-[10px] font-medium tracking-[0.32em] uppercase text-soft/45 mb-6">
                    Saved {formatRelative(item.ts)}
                  </p>

                  <div className="flex items-center justify-between border-t border-line pt-5">
                    {item.token ? (
                      <Link
                        href={`/share/${item.token}`}
                        className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.32em] uppercase text-gold hover:text-soft transition-colors"
                      >
                        Open brief
                        <ExternalLink className="w-3 h-3" strokeWidth={1.6} />
                      </Link>
                    ) : (
                      <Link
                        href="/tool"
                        className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.32em] uppercase text-gold hover:text-soft transition-colors"
                      >
                        Re-run analysis
                        <span aria-hidden="true">→</span>
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => removeOne(item.name)}
                      aria-label={`Remove ${item.name} from saved`}
                      className="text-soft/50 hover:text-red-300 transition-colors p-1 -m-1"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="mt-16 flex flex-wrap items-center justify-between gap-4 pt-10 border-t border-line">
              <p className="text-[10px] font-medium tracking-[0.32em] uppercase text-soft/55">
                {sorted.length} saved · stored locally
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="text-[10px] font-medium tracking-[0.32em] uppercase text-soft/55 hover:text-red-300 transition-colors"
              >
                Clear all
              </button>
            </div>
          </>
        )}

        {/* Empty-state CTA always available */}
        <div className="mt-20 lg:mt-24">
          <Button asChild variant="cream" size="lg" shape="pill">
            <Link href="/tool">
              Run a new analysis
              <span aria-hidden="true">→</span>
            </Link>
          </Button>
        </div>
      </Cinematic>
    </section>
  )
}

function EmptyState() {
  return (
    <div className="rounded-hero border border-line bg-surface/20 p-12 lg:p-16 text-center max-w-3xl">
      <Bookmark className="mx-auto w-8 h-8 text-soft/30 mb-6" strokeWidth={1.4} />
      <p className="font-display font-extrabold tracking-[-0.025em] text-soft text-2xl lg:text-3xl leading-[1.15] mb-4">
        Nothing saved yet.
      </p>
      <p className="text-soft/65 leading-[1.7] text-[15px] lg:text-base max-w-md mx-auto">
        Run the tool and use the &ldquo;Save&rdquo; button in the share bar to bookmark a match.
        Anything you save shows up here.
      </p>
    </div>
  )
}

function formatRelative(ts: number): string {
  const diff = Date.now() - ts
  const minutes = Math.floor(diff / 60_000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`
  const d = new Date(ts)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
