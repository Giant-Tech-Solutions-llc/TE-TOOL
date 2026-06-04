import type { Article } from './types'

const PUBLISHED = '2026-05-12'
const UPDATED = '2026-05-17'

export const BARBER_ARTICLES: Article[] = [
  {
    cluster: 'barber-communication',
    slug: 'what-to-tell-your-barber',
    title: 'What to Tell Your Barber — A Brief That Removes Interpretation',
    subtitle:
      'Most cut failures are translation failures. The wrong words turn a precise recommendation into a generic interpretation. Here is the exact vocabulary that gets the cut you actually want.',
    eyebrow: 'Barber Communication · Brief',
    metaDescription:
      'A complete vocabulary for communicating a taper haircut to a barber — guard numbers, blend-height language, neckline directions, and the brief structure that eliminates interpretation error.',
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
    readMinutes: 8,
    directAnswer: {
      question: 'What is the right way to ask for a taper haircut?',
      answer:
        'A precise taper brief specifies five things in order: taper height (low, mid, high, or burst), guard numbers (typically #2 base, blending through #1, #0.5, to skin), top length (in inches), hairline style (square, natural, or rounded), and neckline (square, rounded, or tapered). Saying "give me a taper, like last time" produces inconsistent results because last time is not on the record. Verbalize each variable and the result is reproducible.',
      bullets: [
        'Five variables to specify: taper height, guards, top length, hairline, neckline.',
        'Use barber vocabulary — "mid taper, #2 base, blended to skin" — not consumer descriptions.',
        'Bring a photo for any ambiguous specification.',
        'Confirm at the chair before the first clip — saves rework on both sides.',
      ],
    },
    sections: [
      {
        id: 'the-five-variables',
        heading: 'The five variables that define a cut',
        eyebrow: 'Framework',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'A taper cut is fully specified by five variables. If a brief is missing any of them, the barber will fill in the blanks based on assumption, prior visit, or default — and the cut may or may not match the intended outcome.',
              'Spending 30 seconds verbalizing all five variables at the start of the chair time produces a reproducible cut every visit, even with a barber you have not worked with before. This is the single highest-leverage habit a client can build.',
            ],
          },
          {
            type: 'table',
            intro: 'The five variables and the vocabulary that specifies each cleanly:',
            columns: ['Variable', 'Vocabulary', 'Example'],
            rows: [
              ['Taper height', 'Low · Mid · High · Burst', '"Mid taper, starting at the mid-parietal line."'],
              ['Guard progression', 'Numbers + blend points', '"#2 base, blended through #1, #0.5, to skin at the hairline."'],
              ['Top length', 'Inches retained', '"Three inches at the front, graduating shorter toward the crown."'],
              ['Hairline', 'Square · Natural · Rounded', '"Square the front edge through the temple corners."'],
              ['Neckline', 'Square · Rounded · Tapered', '"Square the neckline — no taper at the nape."'],
            ],
          },
        ],
      },
      {
        id: 'the-template',
        heading: 'The 30-second brief template',
        eyebrow: 'Template',
        blocks: [
          {
            type: 'quote',
            body: 'I\'m going for a mid taper. #2 base on the sides, blended through #1 and #0.5 to skin at the hairline. Three inches on top, scissor cut with some texture. Square edge-up through the temple corners, square neckline. Hold the temple corners slightly — I don\'t want them aggressive.',
            attribution: 'Sample brief for a mid taper with sculpted top',
          },
          {
            type: 'prose',
            paragraphs: [
              'That brief takes 15 seconds to say and covers all five variables. No barber will misinterpret it. No barber will need to ask what you meant. The cut is fully specified before the first clip.',
              'Refine your own template once and reuse it. Two or three visits with the same brief produces a barber who already knows the cut — and conversations move from specification to optimization.',
            ],
          },
        ],
      },
      {
        id: 'photo-strategy',
        heading: 'When to bring a photo — and what kind',
        eyebrow: 'Visual',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'A photo resolves the most common ambiguity: top styling silhouette. Vocabulary handles taper height and guard numbers precisely; it handles top silhouette imprecisely, because "textured" or "sculpted" mean different things to different barbers.',
              'The best photo is a clear three-quarter profile of the styled outcome — not a head-on close-up of the hair pattern. The three-quarter view shows side, top, and overall silhouette in one frame. Two photos is also acceptable: one front-facing, one profile. More than two becomes confusing.',
            ],
          },
          {
            type: 'checklist',
            intro: 'A good reference photo:',
            items: [
              'Shows the styled outcome (the haircut after a styling routine), not a freshly-cut neutral.',
              'Is a clear three-quarter profile, with the side and top both visible.',
              'Is on someone with similar hair texture to yours — the cut will not produce the same silhouette on a different texture.',
              'Is recent enough that the style does not signal "from a different era."',
            ],
          },
        ],
      },
      {
        id: 'common-failures',
        heading: 'The three sentences that cause the most failures',
        eyebrow: 'Pitfalls',
        blocks: [
          {
            type: 'table',
            intro: 'These three phrases trigger more interpretation errors than any other in the chair. Replace them with specific vocabulary.',
            columns: ['Vague phrase', 'What it triggers', 'Replace with'],
            rows: [
              ['"Same as last time"', 'Barber best-guesses from memory — usually different on every visit.', '"Same brief as last time: mid taper, #2 base, 3 inches on top."'],
              ['"Just clean it up"', 'Barber decides scope — could be edge-up, could be full refresh.', '"Edge cleanup only — front, ears, neckline. No taper work today."'],
              ['"A little shorter"', 'Barber takes off either too much or not enough.', '"Cut a half-inch off the front, keep the rest."'],
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'What if the barber pushes back on my brief?',
        a: 'Listen — they may have a technical observation worth hearing (e.g., "your hair pattern won\'t hold that silhouette," or "your hairline isn\'t straight enough for a true square edge"). But you keep authority over the cut you receive. A good barber will offer their note and then execute your brief.',
      },
      {
        q: 'Should I use the names of celebrity haircuts as shorthand?',
        a: 'It works only if the barber knows the reference. Celebrity references are imprecise — they capture a vibe, not a specification. Use them as supplementary context after the five-variable brief, not as a replacement for it.',
      },
      {
        q: 'Do I need to know my face shape to communicate a cut?',
        a: 'Not strictly — the barber should observe it directly. But mentioning it briefly ("I have a round face, so I want to avoid widening the sides") gives the barber useful context for executing your brief.',
      },
      {
        q: 'Can I email my brief in advance?',
        a: 'Some barbers welcome it, especially for first visits. A clear text message before the appointment with the brief and a reference photo can save 5 minutes at the chair and reduce rework risk.',
      },
    ],
    related: [
      { href: '/guide/barber-communication/clipper-guards', label: 'Clipper Guard Reference', hook: 'The standard guard numbers and what each one actually leaves.' },
      { href: '/guide/maintenance/maintenance-system', label: 'Maintenance System', hook: 'The visit-cycle framework — pairs with the brief vocabulary.' },
      { href: '/guide/taper-styles/mid-taper', label: 'Mid Taper Defined', hook: 'A worked example of the brief format applied to the most-common cut.' },
    ],
  },

  {
    cluster: 'barber-communication',
    slug: 'clipper-guards',
    title: 'Clipper Guard Reference — What Each Number Actually Leaves',
    subtitle:
      'Guard #2 doesn\'t mean "short." It means a precise hair length — and the brand varies. A practical reference for what each guard number leaves, and how guard progression builds a taper.',
    eyebrow: 'Barber Communication · Reference',
    metaDescription:
      'A precise reference for clipper guard numbers — what each one actually leaves in millimetres and inches, brand variance, and how guard progression builds a taper.',
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
    readMinutes: 6,
    directAnswer: {
      question: 'What length does each clipper guard number leave?',
      answer:
        'Standard clipper guards in the US sizing system leave: #1 ≈ 3mm, #2 ≈ 6mm, #3 ≈ 10mm, #4 ≈ 13mm. The half-guards (#0.5, #1.5) fall between. Variance between Wahl, Andis, and Babyliss is roughly ±0.5mm per size. Skin contact (no guard, blade only) leaves no visible length — usually called "bald" or "zero."',
      bullets: [
        '#1 ≈ 3mm · #2 ≈ 6mm · #3 ≈ 10mm · #4 ≈ 13mm.',
        '#0.5 ≈ 1.5mm · #1.5 ≈ 4.5mm — the in-between guards used in blends.',
        'Brand variance is real — ±0.5mm between Wahl, Andis, Babyliss is normal.',
        'A taper is built by stepping through guards, not by jumping multiple sizes at once.',
      ],
    },
    sections: [
      {
        id: 'standard-table',
        heading: 'The standard guard table',
        eyebrow: 'Reference',
        blocks: [
          {
            type: 'table',
            intro: 'US/global standard clipper guard sizes. Lengths are approximate — actual length varies ±0.5mm between manufacturers.',
            columns: ['Guard', 'Length (mm)', 'Length (in)', 'Visible reading'],
            rows: [
              ['Skin / 0', '0mm', '0"', 'No hair visible — bald.'],
              ['#0.5', '~1.5mm', '~1/16"', 'Hair-grade stubble — visible but minimal.'],
              ['#1', '~3mm', '~1/8"', 'Very short — buzz-cut territory.'],
              ['#1.5', '~4.5mm', '~3/16"', 'Short — used heavily in mid-taper blends.'],
              ['#2', '~6mm', '~1/4"', 'Standard short — most common base for tapers.'],
              ['#3', '~10mm', '~3/8"', 'Short-medium — common for the top of a buzz.'],
              ['#4', '~13mm', '~1/2"', 'Medium — sides on a longer overall cut.'],
              ['#5', '~16mm', '~5/8"', 'Medium-long — uncommon on tapers.'],
              ['#6', '~19mm', '~3/4"', 'Long — uncommon, generally top-of-buzz only.'],
            ],
          },
        ],
      },
      {
        id: 'progression',
        heading: 'How guard progression builds a taper',
        eyebrow: 'Technique',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'A taper is not a single guard — it is a progression. The base guard establishes the consistent side length. Successive smaller guards close the gap toward the hairline, with each guard cutting only the lower portion of the previous guard\'s territory.',
              'A clean blend never jumps two full guard sizes at once. Going from #3 directly to #1 leaves a visible step. The intermediate guard (#2) is required to close the gradient. This is why a typical taper brief lists three or four guards in sequence rather than a start and end point.',
            ],
          },
          {
            type: 'howto',
            intro: 'A standard mid-taper guard progression:',
            steps: [
              { name: 'Base', text: '#2 over the entire side — establishes the consistent above-the-taper length.' },
              { name: 'First step', text: '#1.5 below the mid-parietal line — starts the gradient.' },
              { name: 'Second step', text: '#1 mid-way down the gradient — closes toward the lower section.' },
              { name: 'Third step', text: '#0.5 just above the hairline — final closing step before skin contact.' },
              { name: 'Edge', text: 'Skin (no guard) only at the immediate hairline — establishes the visible cut edge.' },
            ],
          },
        ],
      },
      {
        id: 'brand-variance',
        heading: 'Brand variance — why "#2" isn\'t universal',
        eyebrow: 'Variance',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'The standard guard numbers are widely used, but manufacturers calibrate slightly differently. Wahl, Andis, and Babyliss each ship with attachments that leave roughly the same length — but with up to 0.5mm variance per size. A #2 on a Wahl Magic Clip is closer to 6.5mm; the same number on an Andis Master is closer to 6mm.',
              'For most clients this difference is invisible. For clients sensitive to precise length (very short cuts, skin-finished tapers, thinning hair), the variance matters. Ask your barber which clipper they use and which guard size they would specify — the answer translates between barbershops more reliably than just a guard number.',
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'What is a "#0" or "zero" guard?',
        a: 'A zero or skin guard usually means no guard attachment — the clipper blade in direct contact with the skin. Some clippers ship with a #0.5 attachment that leaves about 1.5mm; this is sometimes called "zero" informally but is technically not bald.',
      },
      {
        q: 'How short is a "skin fade"?',
        a: 'A skin fade ends at literal skin contact at the lowest point — meaning no visible hair length at the lowest band of the taper. It is the most aggressive contrast option in the system and exposes scalp to the eye.',
      },
      {
        q: 'Do beard trimmers use the same guard sizes?',
        a: 'Often a separate sizing system. Beard trimmers commonly ship with 0.5mm increments (1mm, 2mm, 3mm, etc.) rather than the #1/#2/#3 system. The standard #1 hair guard is roughly the equivalent of a 3mm beard guard.',
      },
      {
        q: 'Can I ask for a length in millimetres instead of guard numbers?',
        a: 'Yes — and for precise specifications it is often more accurate. "Six millimetres on the sides" eliminates brand variance. Most experienced barbers translate either notation without difficulty.',
      },
    ],
    related: [
      { href: '/guide/barber-communication/what-to-tell-your-barber', label: 'What to Tell Your Barber', hook: 'The brief structure that integrates guard numbers cleanly.' },
      { href: '/guide/taper-styles/mid-taper', label: 'Mid Taper Defined', hook: 'A worked guard progression in context.' },
      { href: '/guide/maintenance/maintenance-system', label: 'Maintenance System', hook: 'How guard sizing affects regrowth visibility.' },
    ],
  },
]
