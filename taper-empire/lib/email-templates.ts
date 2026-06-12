/**
 * Phase T — Lifecycle email templates.
 *
 * Six stages mapped 1:1 to the cron schedule + leads.dayN_sent_at columns:
 *   day1_profile_ready     → Day 1   — "your profile is ready"
 *   day2_barber_comms      → Day 2   — what to say at the chair
 *   day5_styling_tips      → Day 5   — styling between cuts
 *   day10_maintenance      → Day 10  — maintenance cadence
 *   day14_refresh          → Day 14  — refresh trigger
 *   day21_loyalty          → Day 21  — loyalty / re-engagement
 *
 * Every template emits BOTH plain text and HTML so the recipient's client
 * decides what to render. Every template embeds a working unsubscribe link
 * in the visible footer, AND the cron sets the `List-Unsubscribe` +
 * `List-Unsubscribe-Post` headers so Gmail/Apple Mail show the native
 * one-click button. Non-negotiable for CAN-SPAM compliance.
 */

export type TemplateKey =
  | 'day1_profile_ready'
  | 'day2_barber_comms'
  | 'day5_styling_tips'
  | 'day10_maintenance'
  | 'day14_refresh'
  | 'day21_loyalty'

export interface RenderContext {
  /** First name or null — falls back to "there" if absent. */
  name?: string | null
  /** Absolute unsubscribe URL, includes the lead's UUID token. */
  unsubscribeUrl: string
  /** Marketing landing page. */
  brandUrl?: string
  /** Recommendation snapshot — used by some stages to personalise. */
  topStyle?: string | null
  topScore?: number | null
}

export interface RenderedEmail {
  subject: string
  text: string
  html: string
}

const BRAND_URL_DEFAULT = 'https://tool.taperempire.com'

const greet = (name?: string | null) => (name && name.trim() ? name.trim() : 'there')

/* ─────────────────────────────────────────────────────────────────────
 *  HTML shell — every template renders into this wrapper so visual
 *  consistency is single-sourced and the unsubscribe footer is impossible
 *  to forget. Inline CSS only; no <style> blocks (Gmail strips them).
 * ───────────────────────────────────────────────────────────────────── */
function shell(args: {
  preheader: string
  bodyHtml: string
  brandUrl: string
  unsubscribeUrl: string
}): string {
  const { preheader, bodyHtml, brandUrl, unsubscribeUrl } = args
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>Taper Empire</title>
</head>
<body style="margin:0;padding:0;background:#0b0b0c;color:#f5f5f4;font-family:'Inter',ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <!-- preheader (hidden inbox preview) -->
  <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">
    ${escapeHtml(preheader)}
  </div>
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#0b0b0c;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="560" style="max-width:560px;width:100%;background:#141416;border:1px solid #26262a;border-radius:16px;">
          <tr>
            <td style="padding:36px 36px 20px;">
              <div style="font-size:11px;letter-spacing:0.32em;text-transform:uppercase;color:#c9a14a;font-weight:700;">Taper Empire</div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 32px;font-size:15px;line-height:1.65;color:#e7e7e3;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 32px;">
              <a href="${brandUrl}" style="display:inline-block;background:#c9a14a;color:#0b0b0c;font-weight:700;font-size:14px;text-decoration:none;padding:12px 22px;border-radius:10px;">Open Taper Empire →</a>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 36px 32px;border-top:1px solid #26262a;font-size:12px;line-height:1.55;color:#8e8e90;">
              You're getting this because you unlocked your grooming profile at <a href="${brandUrl}" style="color:#b5b5b8;">tool.taperempire.com</a>.<br>
              No longer want these? <a href="${unsubscribeUrl}" style="color:#c9a14a;text-decoration:underline;">Unsubscribe in one click</a>.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function textFooter(unsubscribeUrl: string, brandUrl: string): string {
  return `\n\n— Taper Empire\n${brandUrl}\n\nUnsubscribe in one click: ${unsubscribeUrl}\n`
}

/* ─────────────────────────────────────────────────────────────────────
 *  Day 1 — your profile is ready
 * ───────────────────────────────────────────────────────────────────── */
function day1(ctx: RenderContext): RenderedEmail {
  const name = greet(ctx.name)
  const brandUrl = ctx.brandUrl ?? BRAND_URL_DEFAULT
  const top = ctx.topStyle ? ` — your top match is <strong>${escapeHtml(ctx.topStyle)}</strong>${ctx.topScore ? ` at ${ctx.topScore}%` : ''}.` : '.'
  const subject = ctx.topStyle
    ? `Your taper profile: ${ctx.topStyle}`
    : `Your taper profile is ready`
  const preheader = 'Three matches, ranked. Take this to the chair.'
  const bodyHtml = `
    <h1 style="margin:0 0 16px;font-size:24px;line-height:1.25;font-weight:800;color:#ffffff;">Your profile is ready, ${escapeHtml(name)}.</h1>
    <p style="margin:0 0 16px;">The engine read your face geometry, hair texture, and maintenance reality${top}</p>
    <p style="margin:0 0 16px;">Pull up the brief, then take the exact phrasing to your barber. It's the conversation difference between "what I asked for" and "what I actually got."</p>
    <ul style="margin:0 0 16px;padding-left:20px;color:#b5b5b8;">
      <li>Top three taper matches, ranked — not equalised</li>
      <li>Guard progression with exact numbers</li>
      <li>30-day maintenance cadence</li>
    </ul>
  `
  const text =
    `Your profile is ready, ${name}.\n\n` +
    `The engine read your face geometry, hair texture, and maintenance reality.` +
    (ctx.topStyle ? ` Your top match is ${ctx.topStyle}${ctx.topScore ? ` at ${ctx.topScore}%` : ''}.` : '') +
    `\n\nPull up the brief, then take the exact phrasing to your barber:\n${brandUrl}\n\n` +
    `· Top three taper matches, ranked\n· Guard progression with exact numbers\n· 30-day maintenance cadence` +
    textFooter(ctx.unsubscribeUrl, brandUrl)
  return { subject, text, html: shell({ preheader, bodyHtml, brandUrl, unsubscribeUrl: ctx.unsubscribeUrl }) }
}

/* ─────────────────────────────────────────────────────────────────────
 *  Day 2 — barber communication
 * ───────────────────────────────────────────────────────────────────── */
function day2(ctx: RenderContext): RenderedEmail {
  const name = greet(ctx.name)
  const brandUrl = ctx.brandUrl ?? BRAND_URL_DEFAULT
  const subject = `How to actually ask your barber for it`
  const preheader = 'The four lines that turn a recommendation into a haircut.'
  const bodyHtml = `
    <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;font-weight:800;color:#ffffff;">The chair conversation, ${escapeHtml(name)}.</h1>
    <p style="margin:0 0 16px;">Most disappointing cuts aren't bad barbering — they're decision mismatch. The brief solves it before the chair.</p>
    <p style="margin:0 0 12px;font-weight:600;color:#ffffff;">Four lines to say, in order:</p>
    <ol style="margin:0 0 16px;padding-left:20px;color:#b5b5b8;">
      <li>The taper height (low / mid / high / burst) and where the transition lands</li>
      <li>The starting guard at the nape, and how many steps to the top</li>
      <li>The texture finish — scissor-cut, point-cut, or matte clay finish</li>
      <li>The neckline preference + sideburn strategy</li>
    </ol>
    <p style="margin:0;">Open your brief — every one of these is filled in for you.</p>
  `
  const text =
    `The chair conversation, ${name}.\n\n` +
    `Most disappointing cuts aren't bad barbering — they're decision mismatch.\n\n` +
    `Four lines to say at the chair, in order:\n` +
    `1. Taper height + where the transition lands\n` +
    `2. Starting guard at the nape + steps to the top\n` +
    `3. Texture finish (scissor-cut / point-cut / matte)\n` +
    `4. Neckline preference + sideburn strategy\n\n` +
    `Open your brief — all four are pre-filled: ${brandUrl}` +
    textFooter(ctx.unsubscribeUrl, brandUrl)
  return { subject, text, html: shell({ preheader, bodyHtml, brandUrl, unsubscribeUrl: ctx.unsubscribeUrl }) }
}

/* ─────────────────────────────────────────────────────────────────────
 *  Day 5 — styling
 * ───────────────────────────────────────────────────────────────────── */
function day5(ctx: RenderContext): RenderedEmail {
  const name = greet(ctx.name)
  const brandUrl = ctx.brandUrl ?? BRAND_URL_DEFAULT
  const subject = `Day five — how it should look now`
  const preheader = 'The settle, the styling, and what week one tells you about the cut.'
  const bodyHtml = `
    <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;font-weight:800;color:#ffffff;">Week one, ${escapeHtml(name)}.</h1>
    <p style="margin:0 0 16px;">By day five the cut has settled. The silhouette you wake up with is the silhouette your barber actually delivered — first impressions lie.</p>
    <p style="margin:0 0 12px;font-weight:600;color:#ffffff;">Two things to check:</p>
    <ul style="margin:0 0 16px;padding-left:20px;color:#b5b5b8;">
      <li><strong style="color:#ffffff;">Compression behaviour.</strong> If the top reads flat by mid-morning, the styling product is too heavy for your texture.</li>
      <li><strong style="color:#ffffff;">Edge growth.</strong> By day five you should still see the original line. If the edge is blurring, the taper started too low for your maintenance cycle.</li>
    </ul>
    <p style="margin:0;">If something feels off, the brief includes the exact phrasing to adjust at your next visit — no starting over.</p>
  `
  const text =
    `Week one, ${name}.\n\n` +
    `By day five the cut has settled. The silhouette you wake up with is the real one.\n\n` +
    `Check two things:\n` +
    `· Compression behaviour — flat by mid-morning means the product's too heavy for your texture.\n` +
    `· Edge growth — should still be crisp. If it's blurring, the taper started too low for your cycle.\n\n` +
    `Open the brief to see the adjustment lines: ${brandUrl}` +
    textFooter(ctx.unsubscribeUrl, brandUrl)
  return { subject, text, html: shell({ preheader, bodyHtml, brandUrl, unsubscribeUrl: ctx.unsubscribeUrl }) }
}

/* ─────────────────────────────────────────────────────────────────────
 *  Day 10 — maintenance
 * ───────────────────────────────────────────────────────────────────── */
function day10(ctx: RenderContext): RenderedEmail {
  const name = greet(ctx.name)
  const brandUrl = ctx.brandUrl ?? BRAND_URL_DEFAULT
  const subject = `Mid-cycle: the maintenance window`
  const preheader = 'Why the right kind of touch-up at day 10 changes everything at day 21.'
  const bodyHtml = `
    <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;font-weight:800;color:#ffffff;">Mid-cycle, ${escapeHtml(name)}.</h1>
    <p style="margin:0 0 16px;">Day 10 is the maintenance window. The interior stays untouched — touch only the perimeter.</p>
    <ul style="margin:0 0 16px;padding-left:20px;color:#b5b5b8;">
      <li><strong style="color:#ffffff;">Nape:</strong> a quick cleanup at the original guard. Five minutes at the chair.</li>
      <li><strong style="color:#ffffff;">Temples:</strong> only if you can see fade-line drift, not by default.</li>
      <li><strong style="color:#ffffff;">Top:</strong> nothing. Resist.</li>
    </ul>
    <p style="margin:0;">Done right, you stretch a $40 cut to a $40-per-month cadence without losing the shape.</p>
  `
  const text =
    `Mid-cycle, ${name}.\n\n` +
    `Day 10 is the maintenance window. Interior stays untouched.\n\n` +
    `· Nape — cleanup at the original guard. Five minutes.\n` +
    `· Temples — only if there's visible fade-line drift.\n` +
    `· Top — nothing.\n\n` +
    `Open the brief for the full cadence: ${brandUrl}` +
    textFooter(ctx.unsubscribeUrl, brandUrl)
  return { subject, text, html: shell({ preheader, bodyHtml, brandUrl, unsubscribeUrl: ctx.unsubscribeUrl }) }
}

/* ─────────────────────────────────────────────────────────────────────
 *  Day 14 — refresh trigger
 * ───────────────────────────────────────────────────────────────────── */
function day14(ctx: RenderContext): RenderedEmail {
  const name = greet(ctx.name)
  const brandUrl = ctx.brandUrl ?? BRAND_URL_DEFAULT
  const subject = `Two weeks in — what to watch for`
  const preheader = "The week the silhouette starts to shift. Catch it before it forces a full restart."
  const bodyHtml = `
    <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;font-weight:800;color:#ffffff;">Two weeks in, ${escapeHtml(name)}.</h1>
    <p style="margin:0 0 16px;">Week two is when the cut starts asking you a question: ride to the full reset at day 21, or refresh now?</p>
    <p style="margin:0 0 12px;font-weight:600;color:#ffffff;">Refresh now if:</p>
    <ul style="margin:0 0 16px;padding-left:20px;color:#b5b5b8;">
      <li>The taper line is no longer visible from three feet away</li>
      <li>The top has lost its directional flow</li>
      <li>You have something in the calendar that matters</li>
    </ul>
    <p style="margin:0;">Otherwise — hold the line for seven more days. The Day 21 reset is the cleaner option.</p>
  `
  const text =
    `Two weeks in, ${name}.\n\n` +
    `Week two: refresh now, or ride to day 21?\n\n` +
    `Refresh now if:\n` +
    `· Taper line invisible from three feet\n` +
    `· Top has lost directional flow\n` +
    `· Something in the calendar matters\n\n` +
    `Otherwise hold. Day 21 reset is cleaner.\n\nBrief: ${brandUrl}` +
    textFooter(ctx.unsubscribeUrl, brandUrl)
  return { subject, text, html: shell({ preheader, bodyHtml, brandUrl, unsubscribeUrl: ctx.unsubscribeUrl }) }
}

/* ─────────────────────────────────────────────────────────────────────
 *  Day 21 — loyalty / re-engagement
 * ───────────────────────────────────────────────────────────────────── */
function day21(ctx: RenderContext): RenderedEmail {
  const name = greet(ctx.name)
  const brandUrl = ctx.brandUrl ?? BRAND_URL_DEFAULT
  const subject = `Full reset — back to the chair`
  const preheader = "The 30-day cycle, restarted. Same brief, optionally a new direction."
  const bodyHtml = `
    <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;font-weight:800;color:#ffffff;">Reset week, ${escapeHtml(name)}.</h1>
    <p style="margin:0 0 16px;">You've made it through one full Taper Empire cycle. The brief still holds — but if you want to push the shape, now's the right week to do it.</p>
    <p style="margin:0 0 12px;font-weight:600;color:#ffffff;">Two paths from here:</p>
    <ul style="margin:0 0 16px;padding-left:20px;color:#b5b5b8;">
      <li><strong style="color:#ffffff;">Same brief, sharper.</strong> Drop one guard at the nape for higher contrast.</li>
      <li><strong style="color:#ffffff;">Re-read.</strong> Re-run the engine — face geometry doesn't change but your preferences might.</li>
    </ul>
    <p style="margin:0;">Either way, take the brief with you. The chair conversation is the whole game.</p>
  `
  const text =
    `Reset week, ${name}.\n\n` +
    `You've made it through one full cycle. The brief still holds — but if you want to push, this is the week.\n\n` +
    `Two paths:\n` +
    `· Same brief, sharper. Drop one guard at the nape.\n` +
    `· Re-read. Re-run the engine.\n\n` +
    `Either way, take the brief: ${brandUrl}` +
    textFooter(ctx.unsubscribeUrl, brandUrl)
  return { subject, text, html: shell({ preheader, bodyHtml, brandUrl, unsubscribeUrl: ctx.unsubscribeUrl }) }
}

/* ─────────────────────────────────────────────────────────────────────
 *  Public registry
 * ───────────────────────────────────────────────────────────────────── */
const RENDERERS: Record<TemplateKey, (ctx: RenderContext) => RenderedEmail> = {
  day1_profile_ready:  day1,
  day2_barber_comms:   day2,
  day5_styling_tips:   day5,
  day10_maintenance:   day10,
  day14_refresh:       day14,
  day21_loyalty:       day21,
}

export function renderTemplate(key: TemplateKey, ctx: RenderContext): RenderedEmail {
  const fn = RENDERERS[key]
  if (!fn) throw new Error(`Unknown email template: ${key}`)
  return fn(ctx)
}

export const TEMPLATE_KEYS = Object.keys(RENDERERS) as TemplateKey[]
