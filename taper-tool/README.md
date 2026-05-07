# Taper Tool — AI Taper Haircut Finder

Production web app for **Taper Empire** that recommends taper haircuts from a quick quiz or photo upload, powered by the Google Gemini API.

## Stack

- React 18 + Vite 5
- lucide-react (icons)
- Google Gemini 1.5 Flash (recommendation engine)
- Single-file build for easy iframe embedding

## Local development

```bash
npm install
cp .env.example .env       # then add your Gemini key
npm run dev                # http://localhost:3000
```

## Production build

```bash
npm run build
```

The bundle is emitted to `dist/`.

## Environment

Set `VITE_GEMINI_API_KEY` to a Gemini API key. Without a key the app falls back to a curated set of recommendations so it never fails closed.

## Deployment

- **Vercel**: `vercel --prod` from the project root.
- **WordPress / Elementor**: embed the deployed URL via an HTML widget:

  ```html
  <iframe src="https://your-vercel-url.vercel.app" width="100%" height="900" frameborder="0"></iframe>
  ```
