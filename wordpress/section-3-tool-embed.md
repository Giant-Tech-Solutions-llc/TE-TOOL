# Section 3 — Tool Embed

This section is the actual AI tool. The build pipeline produces a single
self-contained HTML snippet you paste directly into an Elementor HTML
widget. No extra script tags, no asset paths, no iframe.

## How to update after every code change

```bash
cd taper-tool
npm run build
```

The build runs `vite build` (single-file via `vite-plugin-singlefile`)
and then `scripts/extract-embed.mjs`, which produces:

```
taper-tool/dist/wordpress-embed.html
```

That file already contains:

```html
<div id="tool" style="scroll-margin-top:80px">
  <div id="root"></div>
  <style>...</style>
  <script>...</script>
</div>
```

It is the only file you paste in Section 3.

## Where to paste

In Elementor:
1. Open the homepage (`taperempire.com/`).
2. Drag in an **HTML** widget where Section 3 should sit.
3. Open `taper-tool/dist/wordpress-embed.html` in any text editor.
4. Copy the entire contents.
5. Paste into the HTML widget.
6. Update the page.

## Notes

- The wrapper has `id="tool"` — every other section's *Try Tool* / hero
  CTA links to `#tool`, so the homepage's smooth scroll lands here.
- `scroll-margin-top:80px` keeps the tool's heading clear of a sticky
  header.
- The tool calls `/api/recommend`, `/api/generate-image`, `/api/feedback`,
  and `/api/health` on the **same origin** as the WordPress site. Those
  endpoints live on Vercel, not WordPress. To make them resolve from
  `taperempire.com`, configure WordPress (or your CDN) to proxy
  `/api/*` to your Vercel deployment, OR change the fetch base URL in
  `taper-tool/src/utils/api.js` to point to `https://your-app.vercel.app`
  before building.

  **Recommended:** add a CNAME / custom domain in Vercel so the tool
  lives at `app.taperempire.com`, then reverse-proxy `/api/*` from
  `taperempire.com` to `app.taperempire.com`. That keeps SEO on the
  primary domain *and* the API key server-side.
