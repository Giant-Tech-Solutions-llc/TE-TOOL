import { ImageResponse } from 'next/og'
import { getComparison } from '@/lib/guide'

export const runtime = 'edge'
export const alt = 'Taper Empire — comparison brief'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OG({ params }: { params: { slug: string } }) {
  const c = getComparison(params.slug)
  const title = c?.title ?? 'Comparison Brief'
  const left = c?.leftLabel ?? 'Option A'
  const right = c?.rightLabel ?? 'Option B'

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
            {c?.eyebrow ?? 'Comparison Brief'}
          </span>
        </div>

        {/* Versus row */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
              fontSize: '64px',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#F5F3EF',
            }}
          >
            <span>{left}</span>
            <span style={{ color: '#8F7A58', fontStyle: 'italic', fontWeight: 500, fontSize: '52px' }}>vs</span>
            <span>{right}</span>
          </div>
          <span
            style={{
              fontSize: '28px',
              color: 'rgba(245,243,239,0.65)',
              maxWidth: '960px',
              lineHeight: 1.35,
            }}
          >
            {title}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <span
            style={{
              fontSize: '18px',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'rgba(245,243,239,0.55)',
            }}
          >
            Taper Empire — taperempire.com/guide
          </span>
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
            Decision Brief
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
