# Taper Tool — AI Taper Haircut Finder

Production web app for **Taper Empire** that recommends taper haircuts and renders the recommended cut **on the user's own face** using Google Gemini.

## Architecture

```
Browser (React + Vite)
  └─ POST /api/recommend       → Vercel function ─┐
  └─ POST /api/generate-image  → Vercel function ─┤
                                                  └─→ Google Gemini API
                                                      (key lives only on the server)
```

The Gemini API key never reaches the browser. End users open the site and use it — no setup on their end.

## Stack

- React 18 + Vite 5
- lucide-react (icons)
- Vercel Serverless Functions (`api/*`)
- Google Gemini 2.5 Flash (text) + Gemini 2.5 Flash Image (preview rendering)

## Project layout

```
taper-tool/
├── api/                    # Vercel serverless functions (server-only)
│   ├── recommend.js
│   └── generate-image.js
├── shared/                 # Code shared by client and server (pure JS, no env)
│   └── prompts.js
├── src/                    # Vite React app
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── vercel.json
├── vite.config.js
└── package.json
```

## Production deploy (Vercel)

> ⚠️ **Critical:** the Vercel project's **Root Directory** must be `taper-tool` (this folder), not the repo root. Otherwise Vercel won't find `api/` or `package.json`.

1. In Vercel → **Add New → Project** → import the GitHub repo.
2. **Configure Project**:
   - **Root Directory**: click **Edit** and choose `taper-tool`.
   - Framework Preset: **Vite** (auto-detected).
   - Build & Output: leave defaults.
3. **Environment Variables**: add
   - `GEMINI_API_KEY` = your Google AI Studio key (https://aistudio.google.com/app/apikey)
4. Click **Deploy**. Visitors will use the tool with no setup.

Verify it's working: open `https://your-app.vercel.app/api/health` — you should see `"hasKey": true`. If `false`, the env var isn't set or the deploy didn't pick it up; redeploy after saving.

Optional server-side overrides:
- `GEMINI_TEXT_MODEL` (default `gemini-2.5-flash`)
- `GEMINI_IMAGE_MODEL` (default `gemini-2.5-flash-image-preview`)

## Local development

Two ways:

**A. With Vercel CLI (recommended — exercises the same code path as prod):**
```bash
npm install
cp .env.example .env.local           # add GEMINI_API_KEY
vercel dev                           # serves Vite + /api/* on http://localhost:3000
```

**B. Vite alone (no `/api/*` available):**
```bash
npm install
npm run dev                          # http://localhost:3000
```
Then click the gear icon in the header and paste a Gemini key — it's stored
in localStorage and the frontend will call Google directly. This path is
*only for local dev*; in production the server proxy is always used.

## Production build

```bash
npm run build       # bundles the Vite client to dist/
```

## WordPress / Elementor embed

```html
<iframe src="https://your-vercel-url.vercel.app" width="100%" height="900" frameborder="0"></iframe>
```
