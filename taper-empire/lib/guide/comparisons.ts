import type { Comparison } from './types'

const PUBLISHED = '2026-05-12'
const UPDATED = '2026-05-17'

export const COMPARISONS: Comparison[] = [
  /* ─────────────────────────────────────────────────────────────────
   * TAPER VS FADE
   * ───────────────────────────────────────────────────────────────── */
  {
    slug: 'taper-vs-fade',
    title: 'Taper vs Fade — The Real Distinction and When Each One Wins',
    subtitle:
      'The terms are used interchangeably in casual conversation. They are not the same cut. The difference shows in maintenance, professional readability, and growth-out behavior.',
    eyebrow: 'Comparison · Geometry',
    metaDescription:
      'A precise comparison of taper and fade haircuts — geometry, contrast level, maintenance, professional readability, and the situations where each is the correct choice.',
    leftLabel: 'Taper',
    rightLabel: 'Fade',
    verdict:
      'A taper stops above skin contrast; a fade goes to skin. Tapers are more forgiving on growth-out and read more grown-up. Fades are sharper, more athletic, and more demanding to maintain.',
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
    directAnswer: {
      question: 'What is the difference between a taper and a fade?',
      answer:
        'A taper gradually shortens the side hair toward the hairline but stops at a visible length (typically #0.5 or #1) rather than reaching skin. A fade continues the gradient all the way to skin contact at its lowest point. The geometry of the gradient region is similar; the end point is what defines the term. Tapers read more conservative, grow out more cleanly, and require less frequent maintenance. Fades read sharper, more athletic, and need 2–3 week visit cycles.',
      bullets: [
        'Taper ends above skin (#0.5 or #1); fade ends at skin contact.',
        'Tapers tolerate 3–5 week visit cycles; fades typically need 2–3.',
        'Tapers read conservative and editorial; fades read athletic and modern.',
        'Both can be paired with any face shape — the height matters more than the taper/fade label.',
      ],
    },
    attributes: [
      { attribute: 'End point at hairline', left: '#0.5 or #1 guard — visible hair', right: 'Skin contact — no visible hair' },
      { attribute: 'Visual contrast', left: 'Softer, more gradual', right: 'Sharper, harder edge' },
      { attribute: 'Maintenance cycle', left: '3–5 weeks per visit', right: '2–3 weeks per visit' },
      { attribute: 'Growth-out behavior', left: 'Reads intentional longer', right: 'Reads overdue faster' },
      { attribute: 'Cultural reading', left: 'Conservative, editorial, grown-up', right: 'Athletic, modern, sharp' },
      { attribute: 'Best for thinning hair', left: 'Better — softer contrast', right: 'Risky — exposes density loss' },
      { attribute: 'Photo readability', left: 'Reads as a refined cut', right: 'Reads as a strong cut' },
      { attribute: 'Professional contexts', left: 'Universally appropriate', right: 'Modern professional environments only' },
    ],
    sections: [
      {
        id: 'core-distinction',
        heading: 'The end point is the distinction — not the height',
        eyebrow: 'Definition',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'The taper-vs-fade distinction is widely misunderstood. The two terms are not about where the gradient begins on the head — they are about where it ends at the hairline. A "low taper" and a "low fade" begin at the same point on the side; they differ only in whether the contrast continues all the way to skin.',
              'Because the gradient region itself looks similar, casual viewers often cannot tell a taper from a fade in a quick glance. The difference shows on close inspection of the hairline and most clearly in how the cut ages: a taper at week three has a softer contrast line that still reads as intentional; a fade at week three is regrowing into its own gradient and shows visible roughness.',
            ],
          },
        ],
      },
      {
        id: 'when-to-pick',
        heading: 'When to choose each',
        eyebrow: 'Decision',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'Choose a taper if maintenance cadence is constrained, if the desired cultural reading is conservative or editorial, if the hair is thinning at the hairline, or if the cut needs to read appropriate in formal professional contexts.',
              'Choose a fade if the desired cultural reading is athletic or modern, if a sharp, defined silhouette is the priority, and if a 2–3 week visit cycle is sustainable.',
            ],
          },
          {
            type: 'pair',
            left: { label: 'Pick a taper if...', value: 'Long visit cycle · Thinning hair · Conservative context · Editorial voice' },
            right: { label: 'Pick a fade if...', value: 'Short visit cycle · Dense hair · Modern context · Athletic voice' },
          },
        ],
      },
      {
        id: 'hybrids',
        heading: 'The hybrid territory — most modern cuts',
        eyebrow: 'Reality',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'In practice, most modern cuts blur the taper-fade line. A "mid taper with skin contact only at the immediate hairline" is functionally a mid fade with one detail tweaked. A "mid fade with the contrast softened slightly at the lowest point" is functionally a mid taper. The hybrid territory is huge and most barbers move freely in it without naming the distinction.',
              'For the client, the practical specification is the guard end point: "fade to skin" or "taper to #0.5." That single detail is what the barber needs. The label is secondary.',
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'If I ask for a fade, will I get skin contact automatically?',
        a: 'Usually yes — a "fade" implies skin contact at the lowest point in most barbershops. If you want a softer end, specify "fade to #0.5" or use the term "taper" instead.',
      },
      {
        q: 'Can a taper become a fade later in the same visit?',
        a: 'Yes — the barber can extend a taper to skin contact at the hairline with a single additional pass. This is a useful "let me see it as a taper first, and I might want to take it to skin" approach.',
      },
      {
        q: 'Which is better for a first cut at a new barbershop?',
        a: 'A taper is the safer first cut. It is more forgiving if the barber\'s skin-fade technique varies from your previous barber, and it grows out cleanly if the result is not exactly right.',
      },
      {
        q: 'Are skin fades bad for the skin?',
        a: 'Not inherently. A skin fade with a clean blade, sanitized between clients, on healthy skin is fine. A skin fade on irritated, sunburned, or recently shaved skin can produce razor burn or ingrown hairs at the lowest point. The risk is technique-dependent, not categorical.',
      },
    ],
    related: [
      { href: '/guide/taper-styles/low-taper', label: 'Low Taper Defined', hook: 'The taper-side of the most common confusion zone.' },
      { href: '/guide/compare/low-vs-mid-taper', label: 'Low vs Mid Taper', hook: 'When the height — not the taper/fade label — decides the cut.' },
      { href: '/guide/maintenance/maintenance-system', label: 'Maintenance System', hook: 'Why fades cost more in visit cycle than tapers.' },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────
   * LOW VS MID TAPER
   * ───────────────────────────────────────────────────────────────── */
  {
    slug: 'low-vs-mid-taper',
    title: 'Low vs Mid Taper — Which Height Is Right for You',
    subtitle:
      'Both are forgiving. Both work for most face shapes. The choice is about cultural voice, visit cadence, and a specific structural question: do you want the contrast band visible above the cheekbone line or below it?',
    eyebrow: 'Comparison · Taper Height',
    metaDescription:
      'A precise comparison of low taper vs mid taper — where each starts on the head, who they serve, maintenance differences, and how to choose between the two.',
    leftLabel: 'Low Taper',
    rightLabel: 'Mid Taper',
    verdict:
      'Low taper for the longest visit cycle, the softest reading, and the broadest face-shape compatibility. Mid taper for intentional structure, modern voice, and slightly sharper visible silhouette — at the cost of one extra visit per cycle.',
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
    directAnswer: {
      question: 'Should I get a low taper or a mid taper?',
      answer:
        'A low taper starts the contrast at or just above the top of the ear and produces the softest visible gradient. A mid taper starts the contrast at the mid-parietal line — about an inch higher — producing a more visible side structure. Choose the low taper for the longest maintenance cycle and the most conservative reading. Choose the mid taper for slightly sharper visible silhouette and a more modern cultural voice. Both are forgiving choices; the decision is voice and cadence, not structural correction.',
      bullets: [
        'Low taper: contrast starts at top of ear · 4–5 week cycle · conservative reading.',
        'Mid taper: contrast starts an inch higher · 3–4 week cycle · modern reading.',
        'Face-shape compatibility: low taper has slightly broader range.',
        'Either pairs with virtually any top length — the side voice changes, not the top.',
      ],
    },
    attributes: [
      { attribute: 'Where contrast starts', left: 'Top of ear (low on head)', right: 'Mid-parietal line (an inch higher)' },
      { attribute: 'Visible band height', left: '1–2 inches narrow', right: '2–3 inches taller' },
      { attribute: 'Maintenance cycle', left: '4–5 weeks', right: '3–4 weeks' },
      { attribute: 'Cultural reading', left: 'Conservative, editorial, grown-up', right: 'Modern, intentional, default' },
      { attribute: 'Round face fit', left: 'Strong fit', right: 'Acceptable upper edge' },
      { attribute: 'Square face fit', left: 'Weak — side mass competes with jaw', right: 'Strong fit' },
      { attribute: 'Thinning hair tolerance', left: 'Better — softer contrast', right: 'Acceptable' },
      { attribute: 'Office appropriateness', left: 'Universally appropriate', right: 'Universally appropriate' },
    ],
    sections: [
      {
        id: 'parietal-as-decider',
        heading: 'The parietal ridge is the decision boundary',
        eyebrow: 'Geometry',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'The parietal ridge is the natural horizontal band where the head\'s side curve meets the flatter top. A low taper ends well below this line; a mid taper crosses partway up to it. This is the structural decision being made: does the visible contrast band sit below the widest part of the head (low taper) or partway up (mid taper)?',
              'For round and diamond faces, keeping the contrast below the cheekbone band matters — these face shapes benefit from preserved side mass at the cheekbone line. For square and oval faces, raising the contrast does no structural damage and adds visible sharpness.',
            ],
          },
        ],
      },
      {
        id: 'cadence-cost',
        heading: 'One extra visit per cycle — that\'s the real cost',
        eyebrow: 'Cadence',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'Both heights are forgiving, but the mid taper costs roughly one additional visit per year compared to the low. A low taper holds shape for 4–5 weeks; a mid taper for 3–4. Over a year, that\'s 11 visits versus 13 — a small but real difference for clients on tight schedules.',
              'For most clients this is a wash. For clients with constrained chair time — frequent travel, parenting, geographic constraint — the low taper\'s extra week of grace is meaningful and worth choosing for.',
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Is there a "lower-mid" taper?',
        a: 'Yes, informally. Many barbers will execute a taper that starts between the standard low and standard mid positions — useful for clients who want slightly more visible structure than a low taper but more growth-out forgiveness than a true mid. Specify "between low and mid" verbally.',
      },
      {
        q: 'Does the choice affect how long the top should be?',
        a: 'Slightly. A mid taper with a longer top (4"+) reads as a deliberate high-contrast silhouette. A low taper with the same top reads as a classic high-side. Both work; the cultural reading differs.',
      },
      {
        q: 'Can I switch between low and mid at different visits?',
        a: 'Yes, and many clients do — alternating heights based on season, professional context, or personal preference. The transition is clean: the barber simply starts the next taper at the new height.',
      },
      {
        q: 'Which photographs better?',
        a: 'Mid taper photographs with slightly more visible structure in a three-quarter profile. Low taper photographs softer and more refined. The decision is aesthetic, not technical.',
      },
    ],
    related: [
      { href: '/guide/taper-styles/low-taper', label: 'Low Taper Defined', hook: 'The taper height with the longest visit cycle.' },
      { href: '/guide/taper-styles/mid-taper', label: 'Mid Taper Defined', hook: 'The most-recommended height in the system.' },
      { href: '/guide/compare/mid-vs-high-taper', label: 'Mid vs High Taper', hook: 'The next step up in the contrast ladder.' },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────
   * MID VS HIGH TAPER
   * ───────────────────────────────────────────────────────────────── */
  {
    slug: 'mid-vs-high-taper',
    title: 'Mid vs High Taper — When the Step Up Is Worth It',
    subtitle:
      'Mid is the default. High is the statement. Both are sharp; only one is forgiving. The decision is structural — does the cut want visible drama or a balanced modern signal?',
    eyebrow: 'Comparison · Taper Height',
    metaDescription:
      'A precise comparison of mid taper vs high taper — geometry, visit cycle, face-shape fit, and the situations where the high taper is worth the maintenance cost.',
    leftLabel: 'Mid Taper',
    rightLabel: 'High Taper',
    verdict:
      'Mid taper for default modern signal at sustainable cadence. High taper for sharper visible structure, but with twice the maintenance and a narrower face-shape compatibility range.',
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
    directAnswer: {
      question: 'Should I get a mid taper or a high taper?',
      answer:
        'A mid taper starts the contrast at the mid-parietal line and produces a modern, balanced silhouette with universal face-shape compatibility. A high taper starts above the parietal ridge and produces a sharper, more visible side gradient that reads athletic but requires a 2–3 week visit cycle and pairs structurally only with square and oval faces. Choose mid for default versatility; choose high for deliberate athletic voice and the willingness to maintain it.',
      bullets: [
        'Mid taper: 3–4 week cycle · universal face fit · default modern signal.',
        'High taper: 2–3 week cycle · oval/square only · sharper athletic voice.',
        'Both are sharp; only mid is forgiving on growth-out.',
        'High taper without committed maintenance cycle reads worse than mid.',
      ],
    },
    attributes: [
      { attribute: 'Where contrast starts', left: 'Mid-parietal line', right: 'Above parietal ridge' },
      { attribute: 'Visible band height', left: '2–3 inches', right: '3–4 inches' },
      { attribute: 'Maintenance cycle', left: '3–4 weeks', right: '2–3 weeks' },
      { attribute: 'Cultural reading', left: 'Modern · default', right: 'Athletic · confident · sharp' },
      { attribute: 'Round face fit', left: 'Acceptable', right: 'Not recommended' },
      { attribute: 'Square face fit', left: 'Strong', right: 'Strong' },
      { attribute: 'Diamond face fit', left: 'Acceptable', right: 'Not recommended' },
      { attribute: 'Heart face fit', left: 'Acceptable', right: 'Not recommended' },
      { attribute: 'Top pairing range', left: 'Wide — any length', right: 'Narrower — short to medium top works best' },
    ],
    sections: [
      {
        id: 'face-shape-narrowing',
        heading: 'The high taper narrows the face-shape match',
        eyebrow: 'Geometry',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'A mid taper has near-universal face-shape compatibility. A high taper is the most structurally selective of the standard heights — it produces visible contrast at the cheekbone band, which works for square and oval faces but actively works against round, diamond, and heart faces.',
              'This narrowing of compatibility is the most important factor in the decision. A high taper looks great on the right face and looks worse than a mid taper on the wrong one. If the face shape is in the "not recommended" set, the mid taper is the clearly better choice regardless of personal aesthetic preference.',
            ],
          },
        ],
      },
      {
        id: 'maintenance-reality',
        heading: 'The maintenance reality is harsher than it sounds',
        eyebrow: 'Cadence',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'Two-to-three weeks per visit is roughly double the mid taper\'s cadence. Over a year that translates to 17–22 visits versus 13–17 for a mid taper. The cost is not just time and money — it is also the visual penalty of falling out of cycle. A high taper at week four reads as overdue; a mid taper at week four still looks intentional.',
              'For clients who can sustain the cadence — local barber, predictable schedule, comfort with the visit frequency — the high taper is a worthy choice. For clients without that sustainable structure, the mid taper delivers most of the modern voice with half the upkeep cost.',
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Is there a "lower-high" taper?',
        a: 'Yes, informally — a taper that starts slightly below the standard high position but above the standard mid. Useful for clients who want some of the high-taper sharpness without the full maintenance commitment. Specify "between mid and high" verbally.',
      },
      {
        q: 'Can I do a high taper as a one-off?',
        a: 'Yes — and many clients do, particularly for short-term aesthetic moments (weddings, fashion shoots, season changes). The cycle commitment only matters if the high taper is the ongoing cut.',
      },
      {
        q: 'Does a high taper work for older men?',
        a: 'It can — but the cultural reading is athletic, which may signal younger-coded styling. Many older clients find the mid taper carries the more grown-up signal they want; others find a high taper with a sculpted top reads as confidently modern at any age.',
      },
      {
        q: 'Which is harder to execute?',
        a: 'High taper is technically more demanding. The contrast region is taller and the gradient must remain consistent across a longer distance. Less experienced barbers will produce visible step boundaries on a high taper more often than on a mid.',
      },
    ],
    related: [
      { href: '/guide/taper-styles/mid-taper', label: 'Mid Taper Defined', hook: 'The most-recommended height in the system.' },
      { href: '/guide/taper-styles/high-taper', label: 'High Taper Defined', hook: 'Geometry and maintenance cost of the high taper.' },
      { href: '/guide/face-shapes/square', label: 'Best Taper for a Square Face', hook: 'The face shape where high taper works best.' },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────
   * BURST FADE VS CLASSIC TAPER
   * ───────────────────────────────────────────────────────────────── */
  {
    slug: 'burst-vs-classic-taper',
    title: 'Burst Fade vs Classic Taper — Two Different Geometries',
    subtitle:
      'A burst fade is not a higher taper. It is a fundamentally different contrast geometry — curved instead of horizontal — that produces a different silhouette and serves a different cultural purpose.',
    eyebrow: 'Comparison · Geometry',
    metaDescription:
      'A precise comparison of the burst fade and the classic taper — geometry differences, who each serves, and when the burst is the right call.',
    leftLabel: 'Classic Taper',
    rightLabel: 'Burst Fade',
    verdict:
      'A classic taper produces a horizontal contrast band — restrained, professional, universally legible. A burst fade curves the contrast around the ear, producing an editorial silhouette with a longer rear that reads as a deliberate aesthetic choice.',
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
    directAnswer: {
      question: 'Is a burst fade just a high taper?',
      answer:
        'No — the burst fade is a fundamentally different geometry from low, mid, or high tapers. A classic taper runs the contrast in a horizontal band parallel to the floor. A burst fade curves the contrast around the ear in a half-moon, fading outward from a central point behind the ear, and often leaves the hair longer at the nape. The two cuts serve different aesthetic purposes — classic tapers signal professional restraint; burst fades signal editorial intent.',
      bullets: [
        'Geometry: classic taper is horizontal, burst is curved around the ear.',
        'Rear silhouette: classic taper finishes uniform, burst often leaves nape longer.',
        'Cultural reading: classic is universally legible, burst is editorial/creative.',
        'Maintenance: both around 2–3 weeks at high contrast; burst slightly more demanding.',
      ],
    },
    attributes: [
      { attribute: 'Contrast geometry', left: 'Horizontal band', right: 'Curved half-moon around the ear' },
      { attribute: 'Rear of head', left: 'Uniform, tapered to neckline', right: 'Often longer — mohawk/pony silhouette' },
      { attribute: 'Cultural reading', left: 'Professional, restrained, broad', right: 'Editorial, creative, statement' },
      { attribute: 'Best face shape', left: 'Universal range', right: 'Oval, sometimes square or diamond' },
      { attribute: 'Maintenance cycle', left: '3–5 weeks (depending on height)', right: '~2 weeks' },
      { attribute: 'Photographs as', left: 'A refined cut', right: 'A deliberate aesthetic choice' },
      { attribute: 'Curl/coily compatibility', left: 'Good across taper heights', right: 'Exceptional — frames natural pattern' },
      { attribute: 'Office appropriateness', left: 'Universally appropriate', right: 'Creative-industry contexts only' },
    ],
    sections: [
      {
        id: 'geometry',
        heading: 'The geometry difference is fundamental',
        eyebrow: 'Definition',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'A classic taper — low, mid, or high — runs the contrast in a horizontal band parallel to the floor. This means the gradient looks roughly the same from the front of the ear all the way to the back of the head. The structural intent is balanced sides.',
              'A burst fade abandons the horizontal geometry. The contrast region is a curved half-moon centered behind the ear, with the gradient fading outward in all directions from a central point. Above and behind this region, the hair is often left untouched — producing the distinctive long-nape or mohawk silhouette that no classic taper can match.',
            ],
          },
        ],
      },
      {
        id: 'when-to-pick',
        heading: 'When to choose each',
        eyebrow: 'Decision',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'A classic taper is the right call in roughly 85% of recommendations. It is universally legible across professional and casual contexts, it pairs with every face shape, and the maintenance cost is sustainable. It is the default for a reason.',
              'A burst fade earns its place when the styling intent is editorial — when the cut should signal creative confidence rather than restrained competence. It is the right choice for clients who treat their hair as a visible aesthetic statement, who work in or adjacent to creative industries, or who have texture (especially curl or coil) that the burst geometry frames distinctively.',
            ],
          },
          {
            type: 'pair',
            left: { label: 'Pick a classic taper if...', value: 'Professional default · Universal context · Sustainable maintenance · Restrained signal' },
            right: { label: 'Pick a burst fade if...', value: 'Editorial intent · Creative context · Curly/coily texture · Statement signal' },
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Can a burst fade be done conservatively?',
        a: 'Cautiously. A "small burst" — the curved contrast region kept tight and the rear hair kept short — reads less editorial than a full burst. It still signals more aesthetic intent than a classic taper, but it can land in semi-professional contexts.',
      },
      {
        q: 'Do most barbers know how to do a burst fade?',
        a: 'Most contemporary barbers do. It became a mainstream cut in 2022–2024 and is now in the standard skill set. For first-time visits to a new barber, bringing a reference photo eliminates ambiguity.',
      },
      {
        q: 'Is a burst fade going out of style?',
        a: 'It moved from peak novelty (2023) to mainstream editorial (2025–2026). It is no longer a cutting-edge cut but it remains the dominant non-horizontal taper geometry and is unlikely to disappear quickly.',
      },
      {
        q: 'Does a burst fade work without a long nape?',
        a: 'Yes — a "short burst" with the rear hair cut to a normal tapered neckline is a valid variation. It loses some of the cut\'s distinctive rear silhouette but reads less aesthetically committed.',
      },
    ],
    related: [
      { href: '/guide/taper-styles/burst-fade', label: 'Burst Fade Defined', hook: 'The full technical brief on the burst geometry.' },
      { href: '/guide/taper-styles/high-taper', label: 'High Taper Defined', hook: 'The closest classic-taper relative — and how it differs.' },
      { href: '/guide/hair-textures/curly', label: 'Best Taper for Curly Hair', hook: 'Curl is the texture that pairs most naturally with burst geometry.' },
    ],
  },
]
