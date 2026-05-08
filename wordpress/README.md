# Taper Empire — WordPress / Elementor integration

Production-ready files for embedding the Taper Empire AI tool into the
existing `taperempire.com` WordPress site (Elementor).

## What's in this folder

| File | Where it goes |
|---|---|
| `section-1-navigation.html` | Elementor Header HTML widget |
| `section-2-hero.html` | Homepage Section 2 (Elementor HTML widget) |
| `section-3-tool-embed.md` | Instructions for Section 3 — the actual tool embed |
| `section-4-how-it-works.html` | Homepage Section 4 |
| `section-5-social-proof.html` | Homepage Section 5 |
| `section-6-faq.html` | Homepage Section 6 (FAQPage schema included) |
| `section-7-final-cta.html` | Homepage Section 7 |
| `blog-sidebar-cta.html` | `/blog/` index sticky sidebar |
| `blog-post-ctas.html` | 3 CTAs for every individual blog post |

## The single-file embed (Section 3)

The actual tool is built as one self-contained HTML snippet. Build it
once, paste it into the Elementor HTML widget for Section 3:

```bash
cd ../taper-tool
npm install
npm run build
```

Output: `taper-tool/dist/wordpress-embed.html` — the only file that goes
into Section 3. It already includes the `<div id="tool">` wrapper that
every CTA on the homepage and blog links to.

Re-run `npm run build` any time the React app changes; the embed file
regenerates automatically.

## API routing

The embed calls `/api/recommend`, `/api/generate-image`, `/api/feedback`,
and `/api/health` on the same origin as the page it's loaded from. Two
ways to make those resolve:

**A. (Recommended) Reverse-proxy `/api/*` from WordPress to Vercel.**
Keeps SEO on the apex domain, key on the server.
- Cloudflare Workers / Page Rules: route `taperempire.com/api/*` →
  `te-tool.vercel.app/api/*`.
- Or add a `location ~ ^/api/` block in your nginx / WP host config.

**B. Hard-code an absolute API base URL in the bundle.**
Edit `taper-tool/src/utils/api.js` so `RECOMMEND_PROXY` and
`IMAGE_PROXY` start with `https://your-app.vercel.app/api/...` before
running `npm run build`. (Less ideal — you also have to enable CORS on
the Vercel functions.)

## Vercel configuration

Project settings:
- **Root Directory:** `taper-tool`
- **Framework Preset:** Vite (auto-detected)

Environment variables (Production + Preview):
- `GEMINI_API_KEY` — your Google AI Studio key
- `FEEDBACK_WEBHOOK_URL` — *(optional)* Slack/Discord/Sheets webhook

Verify with `https://your-app.vercel.app/api/health` — returns
`{"hasKey": true, ...}` when the env var is set.

## SEO

- Hero (`section-2-hero.html`) ships with `WebSite` schema + 4.9-star
  aggregate rating.
- FAQ (`section-6-faq.html`) ships with `FAQPage` schema covering all
  10 questions.
- Tool embed wrapper carries `id="tool"` and `scroll-margin-top:80px`
  so anchor links land cleanly under any sticky header.

Yoast / RankMath (homepage):

```
Title:        AI Taper Haircut Finder - Find Your Perfect Style | Taper Empire
Description:  Upload a photo or take our quiz for AI-powered taper haircut recommendations with photo previews. Free tool trusted by 12,000+ men.
Focus key:    taper haircut finder
```

## Deployment checklist

- [ ] Run `npm run build` in `taper-tool/`.
- [ ] Paste `dist/wordpress-embed.html` into Elementor Section 3.
- [ ] Paste `wordpress/section-{1,2,4,5,6,7}-*.html` into the
      corresponding Elementor HTML widgets in order.
- [ ] Add `wordpress/blog-sidebar-cta.html` to the blog index sidebar.
- [ ] Drop the three blocks from `wordpress/blog-post-ctas.html` into
      every post.
- [ ] In Vercel, set `GEMINI_API_KEY` and (optionally)
      `FEEDBACK_WEBHOOK_URL`.
- [ ] In Google AI Studio, enable billing if you've been hitting 429s
      on image generation.
- [ ] Configure the `/api/*` reverse proxy on the WordPress host.
- [ ] Verify `taperempire.com/api/health` returns `hasKey: true`.
- [ ] Test photo upload, quiz, AI preview, feedback, exit-intent on
      mobile + desktop.
- [ ] Submit the homepage URL to Google Search Console.
