import { ImageResponse } from 'next/og'
import { CLUSTERS, ALL_ARTICLES, ALL_COMPARISONS } from '@/lib/guide'

export const runtime = 'edge'
export const alt = 'Taper Empire — The Taper Guide'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OG() {
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
            Taper Empire · Vol. 01
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: '96px',
              fontWeight: 800,
              letterSpacing: '-0.045em',
              lineHeight: 0.96,
              color: '#F5F3EF',
            }}
          >
            Decision intelligence
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '64px',
              fontWeight: 500,
              fontStyle: 'italic',
              letterSpacing: '-0.025em',
              lineHeight: 1,
              color: 'rgba(245,243,239,0.55)',
            }}
          >
            for the modern cut.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', gap: '40px' }}>
            <Stat n={ALL_ARTICLES.length.toString().padStart(2, '0')} label="Briefs" />
            <Stat n={CLUSTERS.length.toString().padStart(2, '0')} label="Clusters" />
            <Stat n={ALL_COMPARISONS.length.toString().padStart(2, '0')} label="Comparisons" />
          </div>
          <span
            style={{
              fontSize: '20px',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'rgba(245,243,239,0.55)',
            }}
          >
            taperempire.com/guide
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontSize: '40px', fontWeight: 800, color: '#F5F3EF', letterSpacing: '-0.03em' }}>
        {n}
      </span>
      <span
        style={{
          fontSize: '14px',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'rgba(245,243,239,0.55)',
          marginTop: '4px',
        }}
      >
        {label}
      </span>
    </div>
  )
}
