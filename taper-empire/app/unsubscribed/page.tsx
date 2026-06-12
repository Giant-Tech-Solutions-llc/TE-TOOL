import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Unsubscribed · Taper Empire',
  robots: { index: false, follow: false },
}

// Branded confirmation page. Server component; reads ?status= for copy variants.
export default function UnsubscribedPage({
  searchParams,
}: {
  searchParams: { status?: string }
}) {
  const status = searchParams?.status ?? 'ok'

  const copy =
    status === 'invalid'
      ? {
          title: 'Link not recognized',
          body: 'That unsubscribe link is invalid or has expired. If you keep getting emails, reply to any of them and we will remove you right away.',
        }
      : status === 'error'
      ? {
          title: 'Something went wrong',
          body: 'We could not process your request just now. Please try the link again in a moment, or reply to any email to be removed.',
        }
      : {
          title: "You're unsubscribed",
          body: 'You will no longer receive marketing emails from Taper Empire. You can still use the tool any time at tool.taperempire.com.',
        }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0b0b0c',
        color: '#f5f5f4',
        padding: '24px',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: '100%',
          textAlign: 'center',
          background: '#141416',
          border: '1px solid #26262a',
          borderRadius: 16,
          padding: '40px 28px',
        }}
      >
        <div
          style={{
            fontSize: 13,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#c9a14a',
            marginBottom: 20,
            fontWeight: 700,
          }}
        >
          Taper Empire
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, margin: '0 0 12px' }}>{copy.title}</h1>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: '#b5b5b8', margin: '0 0 28px' }}>
          {copy.body}
        </p>
        <a
          href="https://tool.taperempire.com"
          style={{
            display: 'inline-block',
            background: '#c9a14a',
            color: '#0b0b0c',
            fontWeight: 700,
            fontSize: 15,
            textDecoration: 'none',
            padding: '12px 22px',
            borderRadius: 10,
          }}
        >
          Back to the tool
        </a>
      </div>
    </main>
  )
}
