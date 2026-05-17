import type { Article } from './types'

const PUBLISHED = '2026-05-12'
const UPDATED = '2026-05-17'

export const TAPER_STYLE_ARTICLES: Article[] = [
  /* ─────────────────────────────────────────────────────────────────
   * LOW TAPER
   * ───────────────────────────────────────────────────────────────── */
  {
    cluster: 'taper-styles',
    slug: 'low-taper',
    title: 'Low Taper — Geometry, Application, and Who It Serves',
    subtitle:
      'The lowest contrast point in the taper family. A low taper keeps the side mass intact through the parietal ridge and tracks tight only near the ears and nape — the most forgiving height in the system.',
    eyebrow: 'Taper Style · Low',
    metaDescription:
      'A full technical brief on the low taper — geometry, blend points, guard progression, who it suits, growth-out behavior, and when to choose it over mid, high, or burst.',
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
    readMinutes: 8,
    directAnswer: {
      question: 'What is a low taper and who is it for?',
      answer:
        'A low taper is a haircut where the side hair gradually shortens to near-skin contrast only near the ears and the nape, leaving the side mass above that line uniform. It is the most forgiving taper height — it grows out cleanly, holds shape for 4–5 weeks, and pairs structurally with round, diamond, heart, and long face shapes. It reads conservative and editorial rather than athletic or sharp.',
      bullets: [
        'Contrast begins at or just above the top of the ear.',
        'Holds shape for 4–5 weeks between full visits.',
        'Best for round, diamond, heart, and long faces.',
        'Reads conservative, editorial, and grown-up rather than athletic.',
      ],
    },
    sections: [
      {
        id: 'definition',
        heading: 'What "low" means in barber language',
        eyebrow: 'Definition',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'A taper is the gradient between the longer hair on the top and the shorter hair around the ears, neck, and nape. The "height" refers to where that gradient begins on the head. A low taper starts the contrast at or just above the top of the ear and brings the hair down to skin or near-skin only at the immediate hairline.',
              'Above the start point, the hair stays at its base guard length — usually a #2 or #2.5. The visible side mass remains roughly uniform from the top of the ear up to where it meets the top section. This is the structural signature of a low taper: a clean, mostly uniform side with only a narrow band of contrast near the ear.',
            ],
          },
          {
            type: 'pair',
            left: { label: 'Start point', value: 'Top of the ear · Below the parietal ridge' },
            right: { label: 'End point', value: 'Skin or #0.5 at the immediate hairline' },
          },
        ],
      },
      {
        id: 'who-it-serves',
        heading: 'Who a low taper serves best',
        eyebrow: 'Match logic',
        blocks: [
          {
            type: 'table',
            intro: 'The low taper has the broadest face-shape compatibility of any taper height.',
            columns: ['Face Shape', 'Compatibility', 'Why'],
            rows: [
              ['Round', 'Strongly recommended', 'Keeps side mass uniform; no horizontal contrast band at the cheekbone line.'],
              ['Diamond', 'Strongly recommended', 'Preserves side mass at the temple, balancing the wide cheekbone projection.'],
              ['Heart', 'Recommended', 'Compatible but mid taper is usually marginally better — reduces upper-third width further.'],
              ['Oval', 'Optional', 'Works structurally; chosen by aesthetic preference, not structural need.'],
              ['Square', 'Not recommended', 'Lets side mass extend the visible width; competes with the jaw.'],
            ],
          },
        ],
      },
      {
        id: 'guard-progression',
        heading: 'Standard guard progression',
        eyebrow: 'Technique',
        blocks: [
          {
            type: 'howto',
            intro: 'The standard low-taper guard sequence on a typical Wahl/Andis clipper:',
            steps: [
              { name: 'Base guard', text: '#2 or #2.5 over the parietal ridge — establishes the consistent side length that defines the low taper.' },
              { name: 'First blend', text: '#1.5 below the ear-top line — begins the gradient down toward the hairline.' },
              { name: 'Second blend', text: '#1 in the half-inch above the hairline — closes the gap toward skin contrast.' },
              { name: 'Detail edge', text: '#0.5 or skin only at the immediate hairline and around the ear cup — defines the cut edge cleanly.' },
              { name: 'Neckline', text: 'Square or rounded — finished with trimmer for clean geometry.' },
            ],
          },
        ],
      },
      {
        id: 'growth-out',
        heading: 'Growth-out behavior — the under-rated advantage',
        eyebrow: 'Maintenance',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'Because the base side guard sits at a moderate length (#2 to #2.5) and the contrast band is narrow, regrowth on a low taper reads as intentional length rather than as overdue maintenance. By week three, the contrast line has softened but the cut still looks finished. By week five, an edge cleanup restores the line without a full re-cut.',
              'This is the structural reason low taper is the strongest choice for clients with constrained visit cadence. The cut tolerates a longer maintenance cycle than any other taper height. A high taper at week four looks tired; a low taper at week four still looks intentional.',
            ],
          },
          {
            type: 'checklist',
            intro: 'Maintenance cadence guideline for a low taper:',
            items: [
              'Week 1–2: cut is at peak — visible contrast band sharp and crisp.',
              'Week 3: contrast softens — still looks finished, not yet overdue.',
              'Week 4: edge cleanup recommended — restores the front line and ear arc.',
              'Week 5–6: full taper refresh — reset the contrast geometry.',
            ],
          },
        ],
      },
      {
        id: 'common-pairings',
        heading: 'Top silhouettes that pair well with a low taper',
        eyebrow: 'Pairings',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'A low taper supports almost any top length and styling. The classic pairings are the high-side scissor cut (4"–5" on top, slicked or pomade-finished) and the textured crop with structured front (2.5"–3.5", point-cut, matte styling).',
              'It does not pair well with extremely short top lengths — under 1.5 inches the contrast between sides and top becomes minimal and the cut reads as a uniform buzz rather than a tapered cut. If a near-buzz aesthetic is the goal, a mid or high taper is the better choice to preserve visible contrast.',
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Is a low taper the same as a "low fade"?',
        a: 'They are related but not identical. A low fade always blends to skin; a low taper may stop at #0.5 or #1 and never reach true skin contrast. In casual conversation the terms get used interchangeably, but a precise brief at the chair should specify "taper" if no skin contact is intended.',
      },
      {
        q: 'How often does a low taper need maintenance?',
        a: 'Edge cleanup every 10–14 days. Full taper refresh every 4–5 weeks. This is the longest maintenance cycle of any taper height — one of the strongest reasons to choose it.',
      },
      {
        q: 'Does a low taper work for thinning hair?',
        a: 'Yes — better than higher tapers, generally. Higher tapers create stronger contrast that can highlight density loss at the parietal ridge. A low taper keeps the side mass uniform and softer-edged.',
      },
      {
        q: 'Can a low taper be styled aggressively?',
        a: 'It can be styled for sharpness — a slick-back finish over a low taper reads polished and editorial — but the cut\'s underlying voice is restrained. For a deliberately sharp, athletic look, a mid or high taper carries the right side voice.',
      },
    ],
    related: [
      { href: '/guide/face-shapes/round', label: 'Best Taper for a Round Face', hook: 'The face shape with the strongest indication for a low taper.' },
      { href: '/guide/compare/low-vs-mid-taper', label: 'Low vs Mid Taper', hook: 'When to step up to mid — and when staying low is the call.' },
      { href: '/guide/compare/taper-vs-fade', label: 'Taper vs Fade', hook: 'Why a low taper and a low fade are not the same cut.' },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────
   * MID TAPER
   * ───────────────────────────────────────────────────────────────── */
  {
    cluster: 'taper-styles',
    slug: 'mid-taper',
    title: 'Mid Taper — The Most-Recommended Height in the System',
    subtitle:
      'The mid taper starts the contrast at the mid-parietal line — high enough to read sharp, low enough to forgive. The default recommendation for clients without a specific aesthetic constraint.',
    eyebrow: 'Taper Style · Mid',
    metaDescription:
      'A full technical brief on the mid taper — geometry, blend points, guard progression, who it suits, and why it is the highest-frequency recommendation in the system.',
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
    readMinutes: 8,
    directAnswer: {
      question: 'What is a mid taper and why is it the default recommendation?',
      answer:
        'A mid taper is a haircut where the side contrast begins at the mid-parietal line — roughly an inch above the top of the ear. It is the most universally compatible taper height, pairing structurally with oval, square, and heart face shapes and acceptably with diamond and round. It reads modern and intentional without leaning conservative or athletic — the reason it is the most frequently recommended height in the system.',
      bullets: [
        'Contrast begins one to two inches above the top of the ear.',
        'Holds shape for 3–4 weeks between full visits.',
        'Pairs structurally with oval, square, heart, and most diamond and round configurations.',
        'Reads modern and intentional — neither conservative nor athletic.',
      ],
    },
    sections: [
      {
        id: 'definition',
        heading: 'Where "mid" sits on the head',
        eyebrow: 'Definition',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'The mid-parietal line is the horizontal band roughly an inch above the top of the ear, where the side of the head transitions from the temple to the broader side mass. A mid taper starts the contrast at this line. Above it, the hair stays at the base guard length; below it, the contrast gradually closes toward the hairline.',
              'Compared with a low taper, the visible contrast band is taller — usually two to three fingers wide — and sits higher on the head. Compared with a high taper, it stops below the parietal ridge, keeping side mass intact above the cheekbone line.',
            ],
          },
        ],
      },
      {
        id: 'who-it-serves',
        heading: 'Who a mid taper serves best',
        eyebrow: 'Match logic',
        blocks: [
          {
            type: 'table',
            intro: 'The mid taper has the highest cross-face compatibility of any taper height.',
            columns: ['Face Shape', 'Compatibility', 'Why'],
            rows: [
              ['Oval', 'Strongly recommended', 'Default. Adds intentional structure without correcting a non-existent problem.'],
              ['Square', 'Strongly recommended', 'Mirrors the jaw\'s angularity with a confident side contrast.'],
              ['Heart', 'Recommended', 'Reduces upper-third width without exaggerating the imbalance.'],
              ['Round', 'Acceptable upper edge', 'Works if the top is at least 3 inches; do not go higher.'],
              ['Diamond', 'Acceptable lower edge', 'Works if combined with substantial lateral top width.'],
            ],
          },
        ],
      },
      {
        id: 'guard-progression',
        heading: 'Standard guard progression',
        eyebrow: 'Technique',
        blocks: [
          {
            type: 'howto',
            intro: 'A typical mid-taper guard sequence on a standard clipper:',
            steps: [
              { name: 'Base guard', text: '#2 or #1.5 above the mid-parietal line — defines the consistent side mass.' },
              { name: 'First blend', text: '#1.5 just below the start point — establishes the top of the contrast gradient.' },
              { name: 'Second blend', text: '#1 mid-way through the gradient.' },
              { name: 'Third blend', text: '#0.5 in the half-inch above the hairline.' },
              { name: 'Detail edge', text: 'Skin contrast at the immediate hairline — defines the final edge cleanly.' },
            ],
          },
        ],
      },
      {
        id: 'why-default',
        heading: 'Why mid is the default recommendation',
        eyebrow: 'Logic',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'Three properties make the mid taper the highest-frequency match in the recommendation engine. First, broad face-shape compatibility — five of the standard face structures accept it without structural compromise. Second, balanced cultural reading — it does not lean conservative or athletic, which makes it appropriate across professional and casual contexts. Third, reasonable maintenance cadence — three to four weeks per visit cycle, which most schedules can sustain.',
              'When a face-shape input does not strongly indicate a different height, the recommendation engine defaults to mid. It is the cut that does the least work to be wrong.',
            ],
          },
          {
            type: 'callout',
            tone: 'gold',
            heading: 'Default isn\'t the same as boring.',
            body: 'The mid taper is the highest-recommended height because it is the highest-success height — not because it is the safest. Combined with a sculpted top, it carries a deliberate editorial voice; combined with a textured crop, it carries an athletic one. The taper height is permissive — the styling decides the room.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Is a mid taper appropriate for a professional office?',
        a: 'Yes — it is one of the most office-appropriate cuts in the system. The contrast is intentional but not aggressive. It reads as well-groomed across legal, finance, consulting, and tech contexts.',
      },
      {
        q: 'How often does a mid taper need maintenance?',
        a: 'Edge cleanup every 10–14 days. Full taper refresh every 3–4 weeks. The visit cycle is slightly tighter than a low taper but considerably more forgiving than a high taper or burst fade.',
      },
      {
        q: 'Can a mid taper be styled for a more conservative look?',
        a: 'Yes — paired with a 4" sculpted top and a pomade finish, a mid taper reads classically conservative. Paired with a 1.5" textured crop, it reads modern athletic. The cut\'s voice is decided more by the top than by the side.',
      },
      {
        q: 'What is the difference between a mid taper and a mid fade?',
        a: 'A mid fade ends at skin contrast at the hairline; a mid taper may stop at #0.5 or #1. The start position on the head is the same. In practice, a "mid taper" with a skin finish at the hairline is functionally a mid fade — the distinction matters more in the chair than in conversation.',
      },
    ],
    related: [
      { href: '/guide/face-shapes/oval', label: 'Best Taper for an Oval Face', hook: 'The face shape where mid taper is the strongest default.' },
      { href: '/guide/compare/low-vs-mid-taper', label: 'Low vs Mid Taper', hook: 'When the step up to mid is the right call.' },
      { href: '/guide/compare/mid-vs-high-taper', label: 'Mid vs High Taper', hook: 'When to push further — and when to stay mid.' },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────
   * HIGH TAPER
   * ───────────────────────────────────────────────────────────────── */
  {
    cluster: 'taper-styles',
    slug: 'high-taper',
    title: 'High Taper — Sharp Side Contrast and the Faces That Earn It',
    subtitle:
      'A high taper starts the contrast above the parietal ridge, near the temple band. It is the sharpest of the standard taper heights — high signal, high maintenance, structurally demanding.',
    eyebrow: 'Taper Style · High',
    metaDescription:
      'A full technical brief on the high taper — geometry, who it serves, the face shapes that earn it, the cost in maintenance cadence, and when to choose it over mid or burst.',
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
    readMinutes: 7,
    directAnswer: {
      question: 'What is a high taper and who should choose it?',
      answer:
        'A high taper is a haircut where the side contrast begins above the parietal ridge — at or near the temple band. It produces the sharpest side silhouette of the standard taper heights and reads athletic and confident. It pairs structurally with oval and square face shapes; it should generally be avoided on round, diamond, and heart faces because it widens or narrows the upper third in ways that work against those structures. Maintenance cadence is tight — two to three weeks per visit cycle.',
      bullets: [
        'Contrast begins above the parietal ridge — high on the side of the head.',
        'Maintenance cycle: 2–3 weeks per full visit.',
        'Best for oval and square face shapes with strong, defined features.',
        'Reads sharp, athletic, and modern; can read aggressive depending on top.',
      ],
    },
    sections: [
      {
        id: 'definition',
        heading: 'Where "high" sits on the head',
        eyebrow: 'Definition',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'The parietal ridge is the natural horizontal band running around the head where the curve of the upper side meets the flatter top. A high taper starts the contrast above this ridge — placing the visible gradient band high on the head, around the temple level rather than the ear level.',
              'The result is a much taller side contrast zone than a low or mid taper produces. The visible side mass becomes a narrow stripe between the gradient line and the top section. This is the cut\'s structural signature: a thin band of side hair against a strongly delineated contrast field.',
            ],
          },
        ],
      },
      {
        id: 'who-it-serves',
        heading: 'Who a high taper serves best',
        eyebrow: 'Match logic',
        blocks: [
          {
            type: 'table',
            intro: 'The high taper is the most structurally selective of the standard heights.',
            columns: ['Face Shape', 'Compatibility', 'Why'],
            rows: [
              ['Square', 'Strongly recommended', 'Mirrors the jaw\'s angularity with confident vertical contrast.'],
              ['Oval', 'Recommended', 'No structural penalty; chosen for the sharper voice.'],
              ['Round', 'Not recommended', 'Widens the perceived face at the cheekbone band.'],
              ['Heart', 'Not recommended', 'Exaggerates the wide-forehead, narrow-chin imbalance.'],
              ['Diamond', 'Not recommended', 'Carves the upper third narrow, amplifying cheekbone projection.'],
            ],
          },
        ],
      },
      {
        id: 'cost',
        heading: 'The maintenance cost — and how to budget for it',
        eyebrow: 'Cadence',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'A high taper looks sharp in week one. By week two the contrast line softens. By week three the cut looks tired. By week four it reads as unintentional. This is the cost of the height: the visible gradient sits where regrowth shows fastest.',
              'Plan a two-to-three-week visit cycle. Edge cleanup every week or ten days. Clients who cannot commit to that cadence are better served by a mid taper, which delivers most of the modern voice with half the upkeep.',
            ],
          },
          {
            type: 'callout',
            heading: 'The visit cycle is the gating constraint.',
            body: 'A high taper at week four looks worse than a low taper at week four. If the schedule cannot sustain a two-to-three-week visit cycle, the high taper is the wrong cut.',
          },
        ],
      },
      {
        id: 'top-pairings',
        heading: 'Top pairings that work',
        eyebrow: 'Pairings',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'The high taper carries a strong side voice. The top should not compete with it. Tall, sculpted pompadours over a high taper read aggressive — high signal both top and side. Restrained top silhouettes balance the cut better.',
              'The reliable pairings are a textured crop (1"–2", point-cut, matte finish), a short combover (1.5"–2.5", side part, defined), or a deliberately short top (under 1") that lets the taper carry the cut. All three keep the visual emphasis on the side gradient without amplifying it.',
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Is a high taper the same as a high fade?',
        a: 'A high fade always ends at skin contrast; a high taper may stop above skin (typically #0.5 or #1). The start position is the same. A "high taper" with a skin finish at the hairline is, in practice, a high fade — the distinction is technical, not visual.',
      },
      {
        q: 'How often does a high taper need maintenance?',
        a: 'Two to three weeks per full visit. Edge cleanup every 7–10 days. Plan accordingly — the cut cannot tolerate a four-week gap without visibly losing structure.',
      },
      {
        q: 'Can a high taper work for a round face?',
        a: 'Generally no. The contrast band sits across the widest visible portion of a round face, amplifying horizontal width. A low or mid taper is the correct choice.',
      },
      {
        q: 'Is a high taper appropriate for professional environments?',
        a: 'Yes in most modern professional environments, particularly when paired with a restrained top. In conservative legal or finance settings a mid taper reads more universally appropriate, but the high taper is not categorically inappropriate.',
      },
    ],
    related: [
      { href: '/guide/face-shapes/square', label: 'Best Taper for a Square Face', hook: 'The face shape with the strongest indication for a high taper.' },
      { href: '/guide/compare/mid-vs-high-taper', label: 'Mid vs High Taper', hook: 'When stepping up makes sense — and when it does not.' },
      { href: '/guide/taper-styles/burst-fade', label: 'Burst Fade Defined', hook: 'The closest cousin to high taper — and why they read differently.' },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────
   * BURST FADE
   * ───────────────────────────────────────────────────────────────── */
  {
    cluster: 'taper-styles',
    slug: 'burst-fade',
    title: 'Burst Fade — The Editorial Outlier in the Taper Family',
    subtitle:
      'A burst fade is not a height variant — it is a different geometry. The contrast curves around the ear instead of running horizontally, producing a deliberately editorial silhouette with its own structural logic.',
    eyebrow: 'Taper Style · Burst',
    metaDescription:
      'A complete brief on the burst fade — geometry, who it suits, why it is structurally distinct from low, mid, and high tapers, and the styling pairings that make it work.',
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
    readMinutes: 7,
    directAnswer: {
      question: 'What is a burst fade and how is it different from a high taper?',
      answer:
        'A burst fade curves the contrast gradient around the ear in a half-moon shape, fading outward in all directions from a central point behind the ear. A high taper, by contrast, runs the contrast in a horizontal band across the side. The burst is a geometry variant, not a height variant — and it produces a distinct editorial silhouette with the longer hair often left tapered at the nape rather than tracked to skin. It suits oval faces and creative settings; it should generally be avoided on round and heart faces.',
      bullets: [
        'Curved, not horizontal — the contrast geometry differs fundamentally from low, mid, and high.',
        'Often paired with a longer nape, mohawk, or pony silhouette.',
        'Best for oval faces and editorial / creative contexts.',
        'High maintenance — 2 weeks per cycle is typical.',
      ],
    },
    sections: [
      {
        id: 'definition',
        heading: 'The geometry — what makes it a burst',
        eyebrow: 'Definition',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'The burst fade is defined by the shape of the contrast region. Where a low, mid, or high taper produces a horizontal contrast band running parallel to the floor, the burst fade produces a radial contrast region centred behind the ear — fading outward in a half-moon shape that follows the ear arc.',
              'Above and behind the burst region, the hair is often left longer than a standard taper allows. This produces a tapered or untouched nape (sometimes called a "long burst" or "burst with mohawk"), giving the cut a recognizable rear silhouette that no horizontal taper can match.',
            ],
          },
        ],
      },
      {
        id: 'who-it-serves',
        heading: 'Who a burst fade serves best',
        eyebrow: 'Match logic',
        blocks: [
          {
            type: 'table',
            intro: 'The burst fade is the most context-sensitive of the standard cuts.',
            columns: ['Face Shape', 'Compatibility', 'Why'],
            rows: [
              ['Oval', 'Recommended', 'Balanced structure tolerates the editorial geometry without amplification.'],
              ['Square', 'Acceptable', 'Works in creative contexts; the strong jaw can carry the editorial side.'],
              ['Diamond', 'Acceptable', 'Works if the cheekbones are not the most prominent feature in profile.'],
              ['Round', 'Not recommended', 'Burst widens the visible mass at the ear band — amplifies round geometry.'],
              ['Heart', 'Not recommended', 'Widens the upper third further; exaggerates the wide-forehead imbalance.'],
            ],
          },
        ],
      },
      {
        id: 'context',
        heading: 'The context the burst belongs in',
        eyebrow: 'Voice',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'A burst fade reads creative, editorial, and confident. It does not read conservative. In environments where personal style is expected to project — fashion, music, hospitality, creative industries — the cut delivers strong signal cleanly. In conservative office environments it may signal mismatch with the room.',
              'This is not a critique of the cut; it is a structural property. Each taper geometry carries a cultural reading, and the burst is the highest-signal of the standard family. Choose it when projecting that signal is the intent.',
            ],
          },
          {
            type: 'callout',
            tone: 'gold',
            heading: 'The burst is a statement cut — treat it accordingly.',
            body: 'Pair it with intentional top styling, not a default crop. Pair it with the right room. It is one of the few taper geometries where the cut reads as a deliberate aesthetic choice rather than a neutral grooming decision.',
          },
        ],
      },
      {
        id: 'top-pairings',
        heading: 'Top silhouettes built for the burst',
        eyebrow: 'Pairings',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'The burst fade pairs distinctively with three top silhouettes. The classic pairing is a mohawk-influenced top — longer at the center, gradually shorter toward the sides, giving the cut its iconic rear profile. The second is a long textured top swept forward or to one side, which leverages the cut\'s editorial voice without committing to a full mohawk. The third is a curl-emphasized top for clients with curly or coily texture — the burst geometry frames the natural curl pattern cleanly.',
              'What does not work is a standard short crop. The burst\'s rear silhouette demands enough length on top to interact with the curved contrast region. Under two inches the cut starts to look incomplete.',
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Is a burst fade harder to ask for than a regular taper?',
        a: 'Slightly — the geometry is less standard, so a clear reference image and explicit "burst, curved around the ear, longer at the nape" instruction reduces interpretation error. Most experienced barbers know the cut by name.',
      },
      {
        q: 'How long does a burst fade hold its shape?',
        a: 'Roughly two weeks at peak. Three weeks is the practical upper limit before the contrast region softens noticeably. Plan a two-week visit cycle for maintained sharpness.',
      },
      {
        q: 'Is a burst fade still trending?',
        a: 'It remains the dominant editorial taper geometry in 2025–2026. It is no longer a novelty cut but it is also no longer the default — it sits firmly in "statement choice" territory rather than "everyone wears this" territory.',
      },
      {
        q: 'Does a burst fade work with straight hair?',
        a: 'Yes, but with caveats. Straight hair without texture compromises the rear silhouette interaction. A point-cut or texturized top section restores the visual interest. Curly and coily textures pair more naturally.',
      },
    ],
    related: [
      { href: '/guide/compare/burst-vs-classic-taper', label: 'Burst vs Classic Taper', hook: 'The fundamental geometry comparison — curved vs horizontal contrast.' },
      { href: '/guide/hair-textures/curly', label: 'Curly Hair + Burst Fade', hook: 'The texture that pairs most naturally with burst geometry.' },
      { href: '/guide/face-shapes/oval', label: 'Best Taper for an Oval Face', hook: 'The face shape that handles burst fade best.' },
    ],
  },
]
