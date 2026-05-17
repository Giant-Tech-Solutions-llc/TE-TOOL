import type { Article } from './types'

const PUBLISHED = '2026-05-12'
const UPDATED = '2026-05-17'

export const MAINTENANCE_ARTICLES: Article[] = [
  {
    cluster: 'maintenance',
    slug: 'maintenance-system',
    title: 'Taper Haircut Maintenance — Cycles, Edge-Ups, and Growth-Out',
    subtitle:
      'A taper is not finished at the chair. It is finished by the maintenance system that follows it home. Here is the visit cycle, the edge-up rhythm, and the growth-out handling that protects the cut.',
    eyebrow: 'Maintenance · System',
    metaDescription:
      'A complete maintenance system for taper haircuts — visit cadence, edge-up rhythm, growth-out behavior, and the routines that protect a taper between barber chairs.',
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
    readMinutes: 8,
    directAnswer: {
      question: 'How do you maintain a taper haircut between barber visits?',
      answer:
        'A taper haircut requires two distinct maintenance cycles: edge cleanup every 7–14 days (the front hairline, ear arcs, and neckline) and full taper refresh every 2–5 weeks depending on taper height. Low tapers tolerate the longest cycle; high tapers and burst fades the shortest. Edge cleanup can be done at home with a trimmer; full taper work should be done in the chair. Style daily with appropriate products to keep the silhouette intentional.',
      bullets: [
        'Two cycles: 7–14 day edge cleanup, 2–5 week full refresh.',
        'Cycle length scales with taper height — low taper longest, burst shortest.',
        'At-home edge maintenance is reasonable; full taper work should stay in the chair.',
        'Product strategy is part of maintenance — daily styling protects the silhouette.',
      ],
    },
    sections: [
      {
        id: 'two-cycles',
        heading: 'There are two cycles, not one',
        eyebrow: 'Framework',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'Maintenance discussions usually default to "how often should I get my hair cut?" — but that question conflates two different operations. The edge cleanup is a 10–15 minute touch-up that resets the front hairline, ear arcs, and neckline. The full taper refresh is a 30–45 minute session that resets the side geometry.',
              'These two operations have different cadences and serve different visual functions. The edge cleanup keeps the cut looking finished day to day. The full refresh keeps the cut looking intentional week to week. Both are necessary — neither replaces the other.',
            ],
          },
          {
            type: 'pair',
            left: { label: 'Edge cleanup', value: 'Every 7–14 days · 10–15 minutes' },
            right: { label: 'Full refresh', value: 'Every 2–5 weeks · 30–45 minutes' },
          },
        ],
      },
      {
        id: 'cycle-by-height',
        heading: 'Cycle length by taper height',
        eyebrow: 'Cadence',
        blocks: [
          {
            type: 'table',
            intro: 'The maintenance cycle scales directly with where the taper begins on the head — higher tapers expose regrowth faster.',
            columns: ['Taper Height', 'Edge cleanup', 'Full refresh', 'Peak window'],
            rows: [
              ['Low Taper', 'Every 12–14 days', 'Every 4–5 weeks', '~21 days'],
              ['Mid Taper', 'Every 10–12 days', 'Every 3–4 weeks', '~14 days'],
              ['High Taper', 'Every 7–10 days', 'Every 2–3 weeks', '~10 days'],
              ['Burst Fade', 'Every 7–10 days', 'Every 2 weeks', '~7–10 days'],
            ],
          },
        ],
      },
      {
        id: 'home-edge',
        heading: 'At-home edge cleanup — what to do and what to skip',
        eyebrow: 'Technique',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'A basic trimmer (Andis T-Outliner, Wahl Detailer, or similar) is the only equipment needed for at-home edge maintenance. The work is limited to three operations: the front hairline edge, the area around the ears, and the back neckline.',
              'What to skip at home: the actual taper gradient. The blend between guard levels requires shears, a comb, and significant practice to execute without creating visible step boundaries. Attempting to "freshen the taper" at home almost always damages the gradient — better to live with slightly soft sides for a few extra days than to cut into a clean blend.',
            ],
          },
          {
            type: 'checklist',
            intro: 'A safe at-home edge cleanup checklist:',
            items: [
              'Trim only the front edge of the hairline — follow the existing line precisely, do not move it.',
              'Clean the immediate area around each ear — outline the existing arc, do not raise it.',
              'Square or maintain the neckline — follow the existing geometry.',
              'Do not touch the taper gradient. Leave it for the next chair visit.',
            ],
          },
        ],
      },
      {
        id: 'growth-out',
        heading: 'Growth-out behavior across taper heights',
        eyebrow: 'Behavior',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'Different taper heights age differently. A low taper at week four has a softer contrast line but still reads as a deliberate cut. A high taper at week four reads as overdue. A burst fade at week three already needs attention. Understanding this asymmetry is what makes the visit-cycle decision work.',
              'A practical heuristic: if the cut still looks intentional in a three-quarter-profile photo at the planned visit interval, the cadence is right. If it looks tired or vague, the cycle needs to be shorter — either by booking more often or by stepping the taper down a height.',
            ],
          },
          {
            type: 'callout',
            heading: 'The cycle you can keep is the cycle you should plan for.',
            body: 'A cut maintained on cycle reads as deliberate. A cut maintained off cycle reads as overdue. Match the taper height to the visit cycle you can actually sustain — not to the cycle you aspire to.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Can I do my own full taper at home?',
        a: 'Strongly not recommended. Taper gradient work requires multiple guard sizes, careful comb-and-cut technique, and significant practice to execute without creating visible step boundaries. The downside risk (a cut that looks worse than letting it grow out) is high. At-home work should be limited to edge cleanup.',
      },
      {
        q: 'What if I miss my window — say, four weeks on a high taper?',
        a: 'Two options. Book the next available appointment and live with a soft cut for a few extra days. Or, if the cut has fully grown out and lost its line, ask the barber on the next visit to reset the taper a half-height lower — softer contrast, longer growth-out tolerance, easier to catch the next cycle.',
      },
      {
        q: 'How do I know when it\'s time for edge cleanup?',
        a: 'The clearest signal is the front hairline: if the line is no longer crisp in profile, the cleanup is overdue. A secondary signal is hairs growing past the ear arc. Both are fast — usually visible by day ten on most hair types.',
      },
      {
        q: 'Does washing affect the cut\'s lifespan?',
        a: 'Indirectly. Over-washing strips natural oils and can make hair lie flat against the head, exaggerating the appearance of regrowth. Wash 2–3 times per week for most hair types; coily textures often benefit from less frequent washing with more conditioning.',
      },
    ],
    related: [
      { href: '/guide/maintenance/styling', label: 'Styling Routines That Hold', hook: 'The daily product strategy that protects the cut between visits.' },
      { href: '/guide/taper-styles/low-taper', label: 'Low Taper Defined', hook: 'The taper height with the longest maintenance cycle in the system.' },
      { href: '/guide/barber-communication/clipper-guards', label: 'Clipper Guard Reference', hook: 'Standard guard progressions for full taper resets.' },
    ],
  },

  {
    cluster: 'maintenance',
    slug: 'styling',
    title: 'Styling Routines That Hold the Silhouette',
    subtitle:
      'Daily product strategy decides whether week three still looks intentional or merely lived-in. Here is the product order, the tools, and the technique that protect a taper silhouette.',
    eyebrow: 'Maintenance · Daily Styling',
    metaDescription:
      'Daily styling routines for taper haircuts — product order, blow-dry technique, and the morning sequence that holds the silhouette across hair textures.',
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
    readMinutes: 7,
    directAnswer: {
      question: 'What is the right daily styling routine for a taper haircut?',
      answer:
        'A reliable daily styling routine has three stages: a pre-dry product applied to damp hair for volume or definition, a directional blow-dry or air-dry that establishes the silhouette, and a post-dry finishing product that locks the shape. The specifics depend on hair texture — straight and wavy hair benefit most from blow-dry structure; curly and coily hair benefit most from leave-in conditioning and air-drying. Total time: 3–7 minutes daily.',
      bullets: [
        'Three stages: pre-dry, drying, post-dry — skip a stage and the silhouette fails.',
        'Match the routine to the texture, not to a single product hype cycle.',
        'Total time 3–7 minutes daily — anything longer is over-engineered.',
        'Use less product than feels right — overdose is the most common error.',
      ],
    },
    sections: [
      {
        id: 'three-stages',
        heading: 'The three-stage routine — why it works',
        eyebrow: 'Framework',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'Most styling failures come from collapsing the routine into one stage — usually applying product to dry hair and hoping it produces a styled outcome. This works for the lightest cuts (a #2 buzz with no top length) and fails for everything else.',
              'A reliable routine has three distinct stages. Pre-drying product establishes the structural foundation (volume, curl pattern lock, hold). Drying establishes the directional silhouette. Post-drying product defines the visible texture and adds finish. Each stage does something the next stage cannot fix later — skip one and the result reads incomplete.',
            ],
          },
        ],
      },
      {
        id: 'by-texture',
        heading: 'Routine by texture — pick the right tools',
        eyebrow: 'Texture',
        blocks: [
          {
            type: 'table',
            intro: 'The pre/dry/post product family changes by texture. Pick the texture row, follow the column sequence.',
            columns: ['Texture', 'Pre-dry', 'Drying', 'Post-dry'],
            rows: [
              ['Straight', 'Sea salt spray or mousse', 'Blow-dry up & forward', 'Matte clay or fiber'],
              ['Wavy', 'Cream or low-hold paste', 'Air-dry or diffuse low', 'Light paste touch-up'],
              ['Curly', 'Curl cream on soaking hair', 'Air-dry, no touching', 'Optional curl gel for hold'],
              ['Coily', 'Leave-in conditioner + oil', 'Air-dry under satin or durag', 'Defining cream'],
            ],
          },
        ],
      },
      {
        id: 'tools',
        heading: 'Tools — minimal kit, maximum effect',
        eyebrow: 'Tools',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'A complete styling kit is smaller than most men think. For straight and wavy hair: a blow-dryer with a concentrator nozzle (or a diffuser for wavy), one good comb, and two products — pre-dry and post-dry. For curly and coily hair: a microfiber towel or t-shirt, a wide-tooth comb, and the LOC product family (leave-in, oil, cream).',
              'What is not needed: round brushes (most men), flat irons (almost no men), styling powders (gimmick), product layering rituals (over-engineered). A clean three-stage routine outperforms a six-step ritual on every hair type.',
            ],
          },
          {
            type: 'checklist',
            intro: 'Minimum viable styling kit for any texture:',
            items: [
              'Pre-dry product matched to texture (mousse, cream, curl cream, leave-in).',
              'Post-dry product matched to texture (clay, paste, curl cream, defining cream).',
              'A blow-dryer (for straight/wavy) or microfiber towel (for curly/coily).',
              'One good comb — wide-tooth for curly/coily, fine-tooth for straight/wavy.',
            ],
          },
        ],
      },
      {
        id: 'common-errors',
        heading: 'The four product errors that ruin good cuts',
        eyebrow: 'Errors',
        blocks: [
          {
            type: 'table',
            intro: 'The most common reasons a fresh taper looks unfinished by week one:',
            columns: ['Error', 'What goes wrong', 'Fix'],
            rows: [
              ['Too much product', 'Hair looks weighted, greasy, or clumped.', 'Halve the amount. Most men use 2–3× what they need.'],
              ['Wrong finish (shine on straight)', 'Straight hair reads "wet" or "greasy" with high-shine pomade.', 'Switch to matte clay or fiber.'],
              ['One-stage routine', 'No volume on straight/wavy; no definition on curly/coily.', 'Add a pre-dry product to the routine.'],
              ['Product on scalp', 'Weighs hair down at the root, kills volume.', 'Apply to hair, not skin — start mid-length and work to ends.'],
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'How much product should I actually use?',
        a: 'Pea-sized for short cuts, dime-sized for medium length, quarter-sized for long sculpted tops. If the hair feels weighty or looks greasy, use less. The most common error is overdose — start with half the amount and add only if needed.',
      },
      {
        q: 'Is daily washing necessary?',
        a: 'No — and for most textures, it is counterproductive. Daily washing strips natural sebum that helps style and shape the hair. Most adult men do best on 2–3 washes per week. Curly and coily hair often does best on 1–2 washes per week with conditioning between.',
      },
      {
        q: 'What product brand should I use?',
        a: 'The brand matters less than the product type. A matte clay from any reputable brand outperforms a high-shine pomade for most modern silhouettes. Spend on the right product type, not on the most expensive brand.',
      },
      {
        q: 'Can I skip the pre-dry product?',
        a: 'Generally no for straight, wavy, curly, or coily hair — but yes for very short crops with minimal top length. If the top length is under one inch, a single post-dry product is usually enough.',
      },
    ],
    related: [
      { href: '/guide/maintenance/maintenance-system', label: 'Maintenance System', hook: 'The visit-cycle framework that pairs with the daily routine.' },
      { href: '/guide/hair-textures/straight', label: 'Best Taper for Straight Hair', hook: 'How straight texture pairs with the styling routine.' },
      { href: '/guide/hair-textures/curly', label: 'Best Taper for Curly Hair', hook: 'Curl-specific routine logic.' },
    ],
  },
]
