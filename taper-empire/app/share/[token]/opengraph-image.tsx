import { ImageResponse } from 'next/og'
import { decodeShare } from '@/lib/share'

export const runtime = 'edge'
export const alt = 'Taper Empire — shared TaperMatch™ result'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OG({ params }: { params: { token: string } }) {
  const payload = decodeShare(params.token)
  const score = payload?.matchScore ?? 0
  const style = payload?.styleName ?? 'Taper Match'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#070707',
          color: '#F5F3EF',
          padding: '60px 80px',
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
            TaperMatch™ · Shared Brief
          </span>
        </div>

        {/* Middle — score + style */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '56px' }}>
          {/* Oversized score numeral */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              color: '#F5F3EF',
              fontWeight: 800,
              letterSpacing: '-0.045em',
              lineHeight: 0.85,
            }}
          >
            <span style={{ fontSize: '240px' }}>{score}</span>
            <span style={{ fontSize: '72px', color: 'rgba(245,243,239,0.55)', marginLeft: '12px' }}>%</span>
          </div>

          {/* Hairline divider + style block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '560px' }}>
            <span
              style={{
                fontSize: '16px',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: 'rgba(245,243,239,0.55)',
              }}
            >
              Recommended cut
            </span>
            <div
              style={{
                display: 'flex',
                fontSize: style.length > 24 ? '52px' : '64px',
                fontWeight: 800,
                letterSpacing: '-0.035em',
                lineHeight: 1.02,
                color: '#F5F3EF',
              }}
            >
              {style}
            </div>
          </div>
        </div>

        {/* Bottom — brand row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <span
            style={{
              fontSize: '18px',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'rgba(245,243,239,0.55)',
            }}
          >
            Taper Empire — taperempire.com
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
            Get yours →
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
