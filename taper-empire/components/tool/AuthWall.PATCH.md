# AuthWall.tsx — required changes (Phase 5)

I can't surgically edit your real `components/tool/AuthWall.tsx` from here because the
repo isn't mounted in this session. Below is exactly what to merge. **Do not rename or
remove any existing fields** — only add.

## 1. Imports (top of file)

```tsx
import { getReferrer, getSelfId } from '@/lib/referral'
import { track } from '@/lib/analytics'
```

## 2. Consent state (inside the component, with your other useState)

```tsx
const [consentTerms, setConsentTerms] = useState(false)
const [consentMarketing, setConsentMarketing] = useState(false) // pre-UNCHECKED per GDPR
const [consentError, setConsentError] = useState<string | null>(null)
```

## 3. Build the POST body (in your submit handler) — ADD to existing fields

```tsx
const params = new URLSearchParams(window.location.search)

const body = {
  // ...all existing fields you already post (email, name, topStyle, topScore,
  //    flow, uploadMethod, quizComplete, shareToken, etc.) stay exactly as-is...
  refererId: getReferrer(),
  selfId: getSelfId(),
  utm: {
    source: params.get('utm_source'),
    medium: params.get('utm_medium'),
    campaign: params.get('utm_campaign'),
    term: params.get('utm_term'),
    content: params.get('utm_content'),
  },
  landingPath: typeof window !== 'undefined' ? window.location.pathname : null,
  consentTerms,
  consentMarketing,
}
```

> Note: the API also accepts `?ref=<id>` via `getReferrer()` so the Phase 10
> `?ref=<someid>` check populates `referrer_id`.

## 4. Gate submit until required boxes are ticked

```tsx
async function handleSubmit() {
  if (!consentTerms) {
    setConsentError('Please accept the Terms & Privacy Policy to continue.')
    return
  }
  setConsentError(null)

  const res = await fetch('/api/email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()

  if (data.ok) {
    track('lead_captured', { leadId: data.leadId ?? null, flow }) // Phase 4 analytics
    markAuthenticated()          // unchanged — from lib/api-client
    setAuthenticated(true)       // unchanged — from store/useToolStore
  } else {
    setConsentError(data.error ?? 'Something went wrong. Please try again.')
  }
}
```

The response contract is unchanged: the wall opens on `data.ok === true`. The
`leadId` may be `null` when Supabase is mid-outage (fail-soft) — that's fine,
the user still gets their results.

## 5. The consent checkboxes (in the form JSX, above the submit button)

```tsx
<label className="flex items-start gap-2 text-sm">
  <input
    type="checkbox"
    checked={consentTerms}
    onChange={(e) => setConsentTerms(e.target.checked)}
    required
  />
  <span>
    I agree to the{' '}
    <a href="/terms" target="_blank" className="underline">Terms</a> and{' '}
    <a href="/privacy" target="_blank" className="underline">Privacy Policy</a>.
  </span>
</label>

<label className="flex items-start gap-2 text-sm">
  <input
    type="checkbox"
    checked={consentMarketing}
    onChange={(e) => setConsentMarketing(e.target.checked)}
  />
  <span>Email me lifecycle tips and product picks.</span>
</label>

{consentError && <p className="text-sm text-red-500">{consentError}</p>}

<button type="submit" disabled={!consentTerms}>
  Show my results
</button>
```

Required = Terms (hard block). Marketing = optional, pre-unchecked → drives
`consent_marketing` and gates whether the lifecycle cron will ever email them.

## What you must NOT touch
- The LoadingView 80% trigger that fires the wall
- `hasAuthenticated()` / `markAuthenticated()` signatures in `lib/api-client.ts`
- The asset/quiz portrait pipeline
