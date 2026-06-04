import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Cinematic } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/landing/Header'
import { Footer } from '@/components/landing/Footer'
import { decodeShare, shareText } from '@/lib/share'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://taperempire.com'

interface PageProps {
  params: { token: string }
}

export function generateMetadata({ params }: PageProps): Metadata {
  const payload = decodeShare(params.token)
  if (!payload) {
    return {
      title: 'Shared Taper Match',
      robots: { index: false, follow: false },
    }
  }
  const title = `${payload.matchScore}% TaperMatch™ — ${payload.styleName}`
  const description = payload.why
    ? payload.why.slice(0, 200)
    : 'A shared taper recommendation from Taper Empire — see the full brief and run your own analysis.'
  const url = `${SITE_URL}/share/${params.token}`
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      siteName: 'Taper Empire',
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default function SharePage({ params }: PageProps) {
  const payload = decodeShare(params.token)
  if (!payload) notFound()

  const ctaHref = payload.referrer
    ? `/tool?ref=${encodeURIComponent(payload.referrer)}`
    : '/tool'

  return (
    <>
      <Header />
      <main id="main-content">
        <section className="relative bg-ink text-soft border-t border-line grain-soft">
          <Cinematic className="pt-32 lg:pt-40 pb-28 lg:pb-36">

            {/* ── Eyebrow ─────────────────────────────────────────── */}
            <p className="type-eyebrow text-gold mb-7 flex items-center gap-3">
              <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
              {payload.referrer ? `Shared by ${payload.referrer}` : 'Shared TaperMatch™'}
            </p>

            {/* ── Score block ─────────────────────────────────────── */}
            <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12 mb-16 lg:mb-24">
              <div className="col-span-12 lg:col-span-6">
                <p className="type-eyebrow text-soft/55 mb-4">TaperMatch™ Score</p>
                <p className="font-display font-extrabold tabular-nums tracking-[-0.045em] text-[clamp(120px,18vw,224px)] leading-[0.85] text-soft">
                  {payload.matchScore}
                  <span className="text-mute text-[0.4em] align-top ml-2 tracking-[-0.02em]">%</span>
                </p>
              </div>
              <div className="col-span-12 lg:col-span-6 lg:pt-6">
                <p className="type-eyebrow text-gold mb-4">Recommended cut</p>
                <h1 className="font-display font-extrabold tracking-[-0.04em] text-[clamp(40px,5vw,68px)] leading-[1.02] text-soft mb-8">
                  {payload.styleName}
                </h1>
                <p className="text-soft/70 leading-[1.75] text-base lg:text-lg max-w-xl">
                  {shareText(payload)} — a personalized taper recommendation from the Taper Empire engine.
                  Run your own analysis below to get a brief built for your face.
                </p>
              </div>
            </div>

            {/* ── Detail panels ───────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 mb-16 lg:mb-24">
              {payload.why && (
                <Panel eyebrow="Why it works" body={payload.why} />
              )}
              {payload.barber && (
                <Panel eyebrow="Barber-ready brief" body={payload.barber} />
              )}
            </div>

            {/* ── CTA block ───────────────────────────────────────── */}
            <aside className="relative overflow-hidden rounded-hero border border-line bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.01)_100%)] p-8 lg:p-12">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent"
              />
              <p className="type-eyebrow text-gold mb-5 flex items-center gap-3">
                <span aria-hidden="true" className="block h-px w-10 bg-gold/70" />
                Your turn
              </p>
              <h2 className="font-display font-extrabold tracking-[-0.03em] text-soft text-3xl lg:text-[40px] leading-[1.05] mb-5 max-w-2xl">
                The same engine — built around your face.
              </h2>
              <p className="text-soft/70 leading-[1.75] text-base lg:text-lg mb-8 max-w-2xl">
                Sixty seconds. Three matches. Full taper geometry, maintenance plan, and the exact
                language to use at the chair.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild variant="cream" size="lg" shape="pill">
                  <Link href={ctaHref}>
                    Get my TaperMatch
                    <span aria-hidden="true">→</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" shape="pill">
                  <Link href="/guide">Read the guide</Link>
                </Button>
              </div>
            </aside>
          </Cinematic>
        </section>
      </main>
      <Footer />
    </>
  )
}

function Panel({ eyebrow, body }: { eyebrow: string; body: string }) {
  return (
    <div className="rounded-lg-x border border-line bg-surface/30 p-7 lg:p-9">
      <p className="type-eyebrow text-gold mb-5 flex items-center gap-3">
        <span aria-hidden="true" className="block h-px w-8 bg-gold/70" />
        {eyebrow}
      </p>
      <p className="text-soft/80 leading-[1.85] text-[15.5px] lg:text-base whitespace-pre-line">
        {body}
      </p>
    </div>
  )
}
