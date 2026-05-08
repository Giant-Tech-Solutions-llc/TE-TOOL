# Cowork Runbook — Take Taper Empire AI Tool Live on `taperempire.com`

> **For the cowork agent.** This file is self-contained. Treat it as your
> single source of truth. Don't ask the operator questions that are already
> answered here — just execute, then report.

## What you're shipping

Embed the React tool from this repo (`Giant-Tech-Solutions-LLC/TE-TOOL`,
`main` branch, project root `taper-tool/`) into the existing WordPress
homepage at `https://taperempire.com/`, and add 3 CTAs to each blog post.
The tool's API key must stay server-side on Vercel — never bundled into
WordPress.

## Required MCP servers (verify in this order)

Run each `*:list_*` or equivalent tool **before** you start; if any are
missing, ask the operator to install/connect that one MCP, then continue.

| Capability | MCP tool name pattern | Purpose |
|---|---|---|
| Vercel | `mcp__plugin_vercel_vercel__*` | Project lookup, env vars, deployments |
| WordPress | `mcp__wordpress*` or `mcp__wp*` | Edit Elementor pages, blog posts, headers |
| Browser | `mcp__Claude_in_Chrome__*` | Verify live site, run smoke tests |
| GitHub | `gh` CLI via `Bash` | Confirm the latest `main` SHA is deployed |

If a WordPress MCP isn't available, fall back to the **manual
WordPress** path in step 4 (operator pastes; you generate the exact
content + walk them through it screen-by-screen via Browser MCP).

---

## Step 0 — Snapshot the current state

1. `Bash`: `git -C F:/GitHub/TE-TOOL rev-parse main` → record SHA.
2. **Vercel MCP**: list projects, confirm one named `te-tool` (or
   similar) connected to `Giant-Tech-Solutions-LLC/TE-TOOL`. Record the
   production URL (e.g. `te-tool.vercel.app`).
3. **WordPress MCP**: confirm you can read the current homepage and at
   least one blog post; record the homepage page ID.

Report what you found before continuing.

---

## Step 1 — Verify Vercel is healthy

1. **Vercel MCP**: read project env vars. Required:
   - `GEMINI_API_KEY` — must be set on **Production**.
   - `FEEDBACK_WEBHOOK_URL` — *optional*, if absent skip; do not block.
2. **Vercel MCP**: confirm the most recent production deployment SHA
   matches the `main` SHA from Step 0. If not, trigger a redeploy.
3. **Browser MCP** (or `Bash` `curl`): `GET https://<vercel-url>/api/health`
   - Expect: `{ "ok": true, "hasKey": true, "model": "gemini-2.5-flash", ... }`
   - If `hasKey` is false → env var didn't propagate; redeploy and retry.
   - If 404 → Vercel root directory isn't `taper-tool`; fix in project
     settings (Settings → General → Root Directory) and redeploy.
4. Quick smoke test the API:
   ```
   POST https://<vercel-url>/api/recommend
   Content-Type: application/json
   { "inputData": { "type": "quiz", "data": { "faceShape": "oval", "hairType": "straight", "lifestyle": "professional", "age": "30s", "maintenance": "medium" } } }
   ```
   Expect a 200 with `recommendations` length 3 and `source: "gemini"`.
   If `source: "fallback"` and `reason: "quota_exceeded"`, tell the
   operator to enable billing in Google AI Studio — this is a
   non-blocking finding (the tool still ships, just with curated copy
   until quota resets).

---

## Step 2 — Build the embed locally

```bash
cd F:/GitHub/TE-TOOL/taper-tool
npm install      # only if node_modules missing
npm run build
```

Outputs:
- `dist/index.html` — single-file build (~210 KB)
- `dist/wordpress-embed.html` — the snippet to paste into Elementor

Read `dist/wordpress-embed.html` and confirm it starts with
`<div id="tool"` and contains both a `<style>…</style>` and a
`<script>…</script>` block. If it doesn't, the build is broken — stop
and report.

---

## Step 3 — Decide API routing

The embed calls **same-origin** paths: `/api/recommend`,
`/api/generate-image`, `/api/feedback`, `/api/health`. WordPress doesn't
serve those by default. Two routes:

### 3a (preferred) — Reverse-proxy `/api/*` to Vercel

Keeps the Gemini key server-side, keeps SEO on the apex domain.

- **Cloudflare in front of WP host:** add a Worker or Page Rule that
  forwards `taperempire.com/api/*` to `<vercel-url>/api/*` with all
  headers preserved.
- **Nginx host:** add a `location ^~ /api/` block proxying to Vercel.
- **Litespeed / Apache:** equivalent `mod_proxy` rule.

Use whichever the operator's stack provides. Verify by running
`curl https://taperempire.com/api/health` — must return the same JSON
as the Vercel URL.

### 3b (fallback) — Hard-code absolute API base in the bundle

Only if 3a is impossible:

1. Edit `taper-tool/src/utils/api.js`:
   ```js
   const RECOMMEND_PROXY = 'https://<vercel-url>/api/recommend';
   const IMAGE_PROXY     = 'https://<vercel-url>/api/generate-image';
   ```
   And in `src/utils/feedback.js` change `'/api/feedback'` to the
   absolute URL.
2. Add CORS to all three Vercel functions: at the top of each handler:
   ```js
   res.setHeader('Access-Control-Allow-Origin', 'https://taperempire.com');
   res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
   if (req.method === 'OPTIONS') { res.status(204).end(); return; }
   ```
3. Rebuild + redeploy + commit.

Default to 3a unless the operator pushes back.

---

## Step 4 — Inject sections into the WordPress homepage

Source files to use (already in this repo, do not regenerate):

| Section | File | Elementor widget type |
|---|---|---|
| 1 — Nav | `wordpress/section-1-navigation.html` | HTML widget in the header template |
| 2 — Hero | `wordpress/section-2-hero.html` | HTML widget |
| 3 — Tool | `taper-tool/dist/wordpress-embed.html` | HTML widget |
| 4 — How It Works | `wordpress/section-4-how-it-works.html` | HTML widget |
| 5 — Social Proof | `wordpress/section-5-social-proof.html` | HTML widget |
| 6 — FAQ | `wordpress/section-6-faq.html` | HTML widget |
| 7 — Final CTA | `wordpress/section-7-final-cta.html` | HTML widget |

### If WordPress MCP is connected:

1. Locate the homepage page (slug `/` or page ID from Step 0).
2. Back up the current Elementor data — read the page JSON, save it to
   `wordpress/.backup-homepage-<ISO-timestamp>.json` in the repo.
3. Build a new Elementor structure with seven HTML widgets in the order
   above. Each widget's HTML payload is the literal contents of the
   matching file. Do **not** wrap in `<html>` or `<body>` — Elementor
   embeds the snippet inline.
4. Save the page as a draft, not published. Surface the preview URL.
5. Stop and ask the operator to review the preview before publishing.

### If WordPress MCP is NOT connected:

Use Browser MCP to walk the operator through it:

1. Open `https://taperempire.com/wp-admin/`.
2. Edit the homepage with Elementor.
3. For each section in the table above:
   - Drag in an **HTML** widget (or replace existing).
   - Read the file, copy the contents to the operator's clipboard via
     `mcp__computer-use__write_clipboard`, and tell them "Paste".
4. Save as draft. Get the operator's eyes on it before publishing.

---

## Step 5 — Add blog CTAs

For every published post under `/blog/`:

1. Read the post body via WordPress MCP.
2. Insert the three blocks from `wordpress/blog-post-ctas.html` at:
   - **15 %** — the inline link (after the introduction paragraph)
   - **50 %** — the small CTA card (mid-content)
   - **End** — the full CTA card
   Use word count to estimate the 15 % and 50 % positions; insert at
   the nearest paragraph break.
3. Update sidebar widget on `/blog/` index with the contents of
   `wordpress/blog-sidebar-cta.html`.

If WordPress MCP isn't connected: prepare the post-by-post diffs and
hand them to the operator one at a time. Don't bulk-paste — they need
to verify the 15 % / 50 % insertion points read naturally.

---

## Step 6 — SEO finishing touches

1. Yoast / RankMath on the homepage:
   ```
   Title:        AI Taper Haircut Finder - Find Your Perfect Style | Taper Empire
   Description:  Upload a photo or take our quiz for AI-powered taper haircut recommendations with photo previews. Free tool trusted by 12,000+ men.
   Focus key:    taper haircut finder
   ```
2. Confirm the JSON-LD `WebSite` and `FAQPage` schemas already inside
   sections 2 and 6 are rendering by viewing source on the staging URL.
3. Submit `https://taperempire.com/sitemap_index.xml` to Google Search
   Console (operator may need to do this manually if no MCP for GSC).

---

## Step 7 — Live smoke test (Browser MCP)

Run on `https://taperempire.com/`:

1. Click the Hero CTA → page scrolls smoothly to `#tool`.
2. Click **Take Quiz** → answer all 5 questions → submit.
3. Wait for results. Confirm:
   - 3 cards rendered, each with a match score.
   - At least one card shows the **AI preview** badge (means Gemini
     image gen worked). If none do, that's the quota issue from Step 1
     — it's expected until billing is enabled.
   - All 3 cards are equal height; expanding *Barber Instructions* on
     one card doesn't stretch the others.
4. Below the cards, give a 4-emoji rating + a short comment, click
   *Send feedback*. Confirm the green confirmation appears.
5. Move the cursor toward the top edge of the viewport — the
   exit-intent modal must **not** fire (you've already given feedback
   in this session). Open an incognito tab and repeat without rating
   to confirm it does fire there.
6. Toggle dark mode via the header gear-adjacent button.
7. Re-run the entire flow on a real mobile device (use
   `mcp__Claude_in_Chrome__resize_window` to 390 × 844 first).

If any step fails, stop and report. Do not "fix" by editing WordPress
content — the bug is upstream in the React app and needs a code change
+ rebuild + redeploy.

---

## Step 8 — Verify feedback is landing

1. **Vercel MCP**: tail logs of the `feedback` function. Look for
   `TAPER_FEEDBACK <json>` lines from Step 7's submission.
2. If `FEEDBACK_WEBHOOK_URL` is set, confirm the same payload arrived
   in the destination (Slack channel, Sheet row, etc.).

If neither shows up, the `/api/*` proxy from Step 3 isn't routing.
Re-run Step 3a verification.

---

## Step 9 — Publish + report

1. Publish the homepage in Elementor.
2. Publish each updated blog post.
3. Final report to the operator with:
   - Live URL: `https://taperempire.com/#tool`
   - Vercel deployment URL + SHA
   - `/api/health` response
   - Smoke-test pass/fail table from Step 7
   - Any 429/quota warnings from Step 1
   - Whether `FEEDBACK_WEBHOOK_URL` is configured (and where feedback
     is going)

---

## Failure modes — quick fixes

| Symptom | Cause | Fix |
|---|---|---|
| `/api/health` 404 | Vercel root dir wrong | Set Root Directory = `taper-tool`, redeploy |
| `/api/health` returns `hasKey: false` | Env var missing/typo | Re-add `GEMINI_API_KEY`, redeploy |
| `taperempire.com/api/health` 404 but Vercel one works | Reverse proxy not configured | Step 3a |
| Cards show "AI text generation failed — curated catalog" | Gemini quota or invalid key | Click "Show upstream errors" — tells you which |
| Cards have no AI preview, only illustrations | Image quota (`429`) | Enable billing in Google AI Studio |
| Mode cards different heights | Old build cached | Redeploy + hard-refresh |
| Header gear icon visible to public | Server doesn't have key | Same as `hasKey: false` above |

---

## Don't do

- Don't paste the Gemini key into WordPress, into a blog post, or into
  any client-side code. It belongs only in Vercel env vars.
- Don't deploy as an iframe. The whole point of this build is direct
  embed for SEO.
- Don't edit `dist/wordpress-embed.html` by hand. It regenerates from
  the build — your edits will be lost on the next deploy.
- Don't bulk-edit blog posts without showing the operator at least
  one diff first.
