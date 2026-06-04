import { ImageResponse } from 'next/og'
import { CLUSTERS, getArticle, type ClusterKey } from '@/lib/guide'

export const runtime = 'edge'
export const alt = 'Taper Empire — decision brief'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Dynamic per-article OG image. Generated at request time on the edge via
 * the Vercel ImageResponse renderer, so every shared article gets a unique
 * preview card without bloating the static asset pipeline.
 */
export default async function OG({ params }: { params: { cluster: string; slug: string } }) {
  const cluster = CLUSTERS.find((c) => c.slug === params.cluster)
  const article = cluster ? getArticle(cluster.key as ClusterKey, params.slug) : undefined

  const eyebrow = article?.eyebrow ?? cluster?.chapter ?? 'Taper Empire · Guide'
  const title = article?.title ?? 'The Taper Guide'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#070707',
          color: '#F5F3EF',
          padding: '72px 80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Top — eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '60px', height: '2px', background: '#8F7A58' }} />
          <span
            style={{
              fontSize: '20px',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: '#8F7A58',
              fontWeight: 500,
            }}
          >
            {eyebrow}
          </span>
        </div>

        {/* Middle — headline */}
        <div
          style={{
            display: 'flex',
            fontSize: title.length > 60 ? '60px' : '76px',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            lineHeight: 1.02,
            color: '#F5F3EF',
            maxWidth: '1040px',
          }}
        >
          {title}
        </div>

        {/* Bottom — brand row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: '18px',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: 'rgba(245,243,239,0.55)',
                marginBottom: '8px',
              }}
            >
              Taper Empire — Decision Briefs
            </span>
            <span
              style={{
                fontSize: '22px',
                color: 'rgba(245,243,239,0.85)',
              }}
            >
              taperempire.com/guide
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              padding: '14px 28px',
              borderRadius: '999px',
              border: '1px solid rgba(143,122,88,0.45)',
              color: '#8F7A58',
              fontSize: '18px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Vol. 01 · Guide
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
