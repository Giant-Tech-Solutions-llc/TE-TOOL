import type { Article } from './types'

/**
 * Face Shapes cluster — five primary face structures, each mapped to the
 * taper height that supports it and the geometry that fights it.
 *
 * Editorial voice: precise, structural, barber-precise — not horoscope
 * advice. We tell the reader why a taper height works, not just that it
 * "complements" their face.
 */

const PUBLISHED = '2026-05-12'
const UPDATED = '2026-05-17'

export const FACE_SHAPE_ARTICLES: Article[] = [
  /* ─────────────────────────────────────────────────────────────────
   * ROUND FACE
   * ───────────────────────────────────────────────────────────────── */
  {
    cluster: 'face-shapes',
    slug: 'round',
    title: 'Best Taper Haircut for a Round Face',
    subtitle:
      'Round faces win on vertical structure and lose on visible side width. The right taper compresses width and lifts the crown — here is the geometry that works and the geometry that backfires.',
    eyebrow: 'Face Shape · Round',
    metaDescription:
      'A practical decision guide to the best taper haircut for round faces — geometry, height, contrast, and the barber-ready specifications that work for a round structure.',
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
    readMinutes: 8,
    directAnswer: {
      question: 'What taper haircut is best for a round face?',
      answer:
        'A low taper paired with height-focused top styling is the highest-success recommendation for a round face. The low contrast keeps the eye moving vertically instead of horizontally, the height on top adds the structural definition a round jaw lacks, and the gradual blend grows out without forming the visible block of width that a high or skin fade creates around the temples.',
      bullets: [
        'Low taper, mid taper for a slightly sharper look — avoid high taper and burst fade on a true round face.',
        'Style with 2.5"–4" of height on top to add vertical structure.',
        'Keep sides shorter than top by at least a 3× ratio for silhouette balance.',
        'Defined hairline (square or angular front) outperforms a rounded front line.',
      ],
    },
    sections: [
      {
        id: 'why-low-taper',
        heading: 'Why a low taper outperforms higher tapers on round faces',
        eyebrow: 'Geometry',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'A round face has near-equal width and height with soft jaw definition and a generally circular outline. The styling problem is not the face — round faces photograph cleanly. The problem is haircut interaction. Any cut that adds visible width near the cheekbone line amplifies the already-balanced horizontal axis and reads as "wider" rather than "structured."',
              'A low taper starts the contrast around the temple and tracks tight to the skin only near the ears and nape. The visible side mass — what most people see in a three-quarter view — remains roughly uniform top to side. That uniformity is the goal: it eliminates the horizontal band of contrast that a high taper or burst fade installs across the widest point of the face.',
              'A mid taper is the upper edge of what still works. Going higher than the mid-parietal line begins to cut across the round face\'s widest visual zone and reintroduces the width problem the low taper exists to solve.',
            ],
          },
          {
            type: 'pair',
            left: { label: 'Recommended', value: 'Low Taper · Mid Taper' },
            right: { label: 'Avoid', value: 'High Taper · Burst Fade' },
          },
        ],
      },
      {
        id: 'top-styling',
        heading: 'Top styling does the heavy lifting',
        eyebrow: 'Silhouette',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'The taper is a structural device, not a styling solution. On a round face, height on top is what delivers the perceived elongation. The minimum useful height is roughly 2.5 inches at the front; 3.5–4 inches gives a more editorial silhouette without crossing into pompadour territory.',
              'Texture matters. Straight hair needs product structure to hold height — a paste with medium-firm hold and a matte finish keeps the silhouette without slicking the hair into a wet, weight-collapsing finish. Wavy and curly hair already have natural lift and require less structural product, but benefit from a curl cream or a light hold paste to define the vertical line.',
            ],
          },
          {
            type: 'checklist',
            intro: 'Three styling moves that work consistently on round faces:',
            items: [
              'Dry upward and forward, not downward — gravity is the enemy of perceived height.',
              'Use a matte product, not a wet shine — shine flattens visible structure.',
              'Build the silhouette with two product passes, not one — pre-dry product for lift, post-dry product for definition.',
            ],
          },
        ],
      },
      {
        id: 'hairline',
        heading: 'Hairline geometry — keep it square',
        eyebrow: 'Edges',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'A rounded front hairline (the natural arc most men inherit) mirrors and reinforces a round face. A defined, more angular front edge — even by a few millimeters — reads as structural and helps the cut do its job.',
              'A square edge-up is the most common solution: the barber straightens the front line through the temple corners, then squares the temple to the sideburn. This is not the same as a "blocky" or aggressive edge — done lightly, it adds definition without looking carved.',
            ],
          },
          {
            type: 'callout',
            tone: 'gold',
            heading: 'Defined corners outperform soft corners on a round face.',
            body: 'Ask for a square edge-up rather than a "natural arc." A 1–2mm crisper temple corner does measurable work in side-profile photos without looking heavy-handed.',
          },
        ],
      },
      {
        id: 'barber-spec',
        heading: 'Barber-ready specification for a round face',
        eyebrow: 'Brief',
        blocks: [
          {
            type: 'howto',
            intro: 'Walk into the chair with this brief and there is no interpretation gap:',
            steps: [
              {
                name: 'Length on top',
                text: 'Leave 3"–4" at the front, graduating shorter toward the crown so the silhouette finishes with vertical structure rather than a uniform pad.',
              },
              {
                name: 'Taper height',
                text: 'Start the taper at or just above the top of the ear (low taper). Do not bring the contrast above the temple — that creates the side-width problem the cut is supposed to solve.',
              },
              {
                name: 'Guard progression',
                text: '#2 base on the sides, blended through #1.5 and #1 toward the taper line, finishing skin-light only at the immediate hairline if requested.',
              },
              {
                name: 'Hairline',
                text: 'Square the front edge through the temple corners — a defined, slightly angular front line beats a rounded arc on this face shape.',
              },
              {
                name: 'Neckline',
                text: 'Square or rounded — both work. Avoid a tapered neckline that pulls the eye downward; the styling intent is vertical.',
              },
            ],
          },
        ],
      },
      {
        id: 'common-mistakes',
        heading: 'The three mistakes that ruin this cut',
        eyebrow: 'Pitfalls',
        blocks: [
          {
            type: 'table',
            intro: 'Most failed round-face cuts trace back to one of these errors — usually a barber over-correcting in the wrong direction.',
            columns: ['Mistake', 'What goes wrong', 'Correction'],
            rows: [
              [
                'Taper too high',
                'A high taper creates a visible band of contrast across the widest point of the face, amplifying perceived width.',
                'Drop the start point to the top of the ear and re-blend.',
              ],
              [
                'Top too short',
                'Without 2.5"+ of height, the silhouette stays uniformly round — the cut delivers no structural lift.',
                'Grow the top out before the next refresh, or ask for scissor-over-comb to preserve length.',
              ],
              [
                'Rounded edge-up',
                'A soft arc at the front hairline reinforces the round outline of the face.',
                'Square the front through the temple corners on the next edge cleanup.',
              ],
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Is a mid taper okay on a round face?',
        a: 'Yes — a mid taper works if the top length is at least 3 inches and the silhouette is styled with vertical intent. Above mid-parietal the cut starts to amplify width, so the mid taper is the upper edge of the safe zone.',
      },
      {
        q: 'What about a burst fade on a round face?',
        a: 'A burst fade is generally a poor fit. It deliberately widens the perceived ear zone and creates a horizontal contrast band — the opposite of what a round face needs. If you want sharper edges, choose a defined low taper with a square edge-up instead.',
      },
      {
        q: 'How long should the top be specifically?',
        a: 'A minimum of 2.5 inches at the front. The most consistently successful range is 3 to 4 inches. Less than that and the cut delivers no vertical structure; more than 5 inches and the silhouette starts to fight the face from a different direction.',
      },
      {
        q: 'How often will this need maintenance?',
        a: 'Edge cleanup every 10–14 days keeps the square front line crisp. A full taper refresh every 3–4 weeks holds the silhouette. Round-face cuts tolerate slightly longer cycles than burst or high fades because the low taper grows out more uniformly.',
      },
    ],
    related: [
      { href: '/guide/taper-styles/low-taper', label: 'Low Taper Defined', hook: 'The taper height that pairs best with round and softer-edged faces — geometry and guard progression.' },
      { href: '/guide/face-shapes/square', label: 'Best Taper for a Square Face', hook: 'How square faces use a different taper logic — and why the round and square recommendations rarely overlap.' },
      { href: '/guide/compare/low-vs-mid-taper', label: 'Low vs Mid Taper', hook: 'When to step up to a mid taper — and when staying low is the right call.' },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────
   * OVAL FACE
   * ───────────────────────────────────────────────────────────────── */
  {
    cluster: 'face-shapes',
    slug: 'oval',
    title: 'Best Taper Haircut for an Oval Face',
    subtitle:
      'Oval faces are the most permissive shape in men\'s grooming — almost any taper geometry works. The decision is no longer "what fits" but "what voice." Here is how to think about it.',
    eyebrow: 'Face Shape · Oval',
    metaDescription:
      'A complete decision brief for the best taper haircut on an oval face — why oval faces tolerate every taper height and how to choose the right one for tone and lifestyle.',
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
    readMinutes: 7,
    directAnswer: {
      question: 'What taper haircut is best for an oval face?',
      answer:
        'An oval face supports every standard taper height — low, mid, high, and burst — without structural compromise. The decision is voice and lifestyle: low taper reads conservative and grows out cleanly, mid taper is the most universally flattering, high taper reads athletic and sharp, and burst reads editorial. Because the face geometry is already balanced, the recommendation should be driven by maintenance cadence and aesthetic preference, not by structural correction.',
      bullets: [
        'All four primary taper heights are structurally compatible with an oval face.',
        'Mid taper is the highest-frequency recommendation — it photographs cleanly across most settings.',
        'Top length is flexible: anywhere from 1" textured crops to 5" sculpted silhouettes work.',
        'Use the taper choice to signal context, not to correct the face.',
      ],
    },
    sections: [
      {
        id: 'why-oval-permissive',
        heading: 'Why oval faces are the most permissive shape',
        eyebrow: 'Geometry',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'An oval face has slightly longer vertical height than width, a softly defined jaw, and a forehead that is marginally wider than the chin. Every dimension is balanced — no axis dominates, no zone over-projects. The result is a face that does not need the haircut to do corrective work.',
              'This is unusual. Round, square, diamond, and heart faces all benefit when the cut compensates for a structural feature. Oval faces benefit when the cut expresses intent. The taper becomes a tonal choice rather than a structural one.',
              'In practical terms: oval-faced men can choose the taper they want, not the one they need. The decision shifts to which signal the cut should send.',
            ],
          },
        ],
      },
      {
        id: 'taper-by-tone',
        heading: 'Choose the taper by the tone you want to project',
        eyebrow: 'Voice',
        blocks: [
          {
            type: 'table',
            intro: 'Each taper height carries a recognizable cultural reading. Pick the one that matches the room you spend your time in.',
            columns: ['Taper Height', 'Cultural Reading', 'Best For'],
            rows: [
              ['Low Taper', 'Conservative · Editorial · Grown-up', 'Office, finance, professional services, mature settings.'],
              ['Mid Taper', 'Versatile · Modern · Default', 'General-purpose. The cut that works in most rooms.'],
              ['High Taper', 'Sharp · Athletic · Confident', 'Younger creative environments, sports, fashion-forward dress.'],
              ['Burst Fade', 'Editorial · Statement · Streetwear', 'Creative industries, performers, people who treat hair as visible signal.'],
            ],
          },
        ],
      },
      {
        id: 'top-styling',
        heading: 'Top styling has the most range here',
        eyebrow: 'Silhouette',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'Because the underlying face is balanced, the silhouette is free to commit to a direction. A long sculpted top reads classic. A textured crop reads modern. A close-cropped short top reads precise and athletic. All three work.',
              'The constraint is consistency — the top length should match the taper voice. A 5-inch sculpted top with a burst fade reads visually loud (top says editorial, sides say editorial). A 5-inch top with a low taper reads like a classic high-side. Both are intentional, but they say different things.',
            ],
          },
          {
            type: 'checklist',
            intro: 'Three pairings that consistently photograph well on oval faces:',
            items: [
              'Mid taper + 3"–4" sculpted top → modern executive default.',
              'High taper + 1"–1.5" textured crop → athletic, low-maintenance.',
              'Low taper + 4"–5" pomade-finished top → editorial classic.',
            ],
          },
        ],
      },
      {
        id: 'choose-by-maintenance',
        heading: 'Let maintenance tolerance break the tie',
        eyebrow: 'Cadence',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'Because every taper height is structurally available, maintenance cadence is the most useful tie-breaker. The higher the taper starts on the head, the more visible the regrowth, and the shorter the visit cycle the cut requires.',
              'A low taper holds shape for 4–5 weeks. A mid taper for 3–4. A high taper or burst fade is sharp at week 2 and starts to look unintentional by week 4. If chair-time is constrained — travel schedule, parenting, location — match the taper to the visit cycle you can actually keep.',
            ],
          },
          {
            type: 'callout',
            heading: 'Match the taper to your visit cycle, not your aspiration.',
            body: 'A cut that looks great at week 1 and tired by week 3 will signal the wrong thing more often than it signals the right one. Choose the taper you can maintain at the cadence your life actually allows.',
          },
        ],
      },
      {
        id: 'barber-spec',
        heading: 'Default barber-ready specification',
        eyebrow: 'Brief',
        blocks: [
          {
            type: 'howto',
            intro: 'The mid-taper default — the highest-frequency oval-face recommendation:',
            steps: [
              { name: 'Length on top', text: 'Leave 3"–4" at the front, scissor-cut for soft graduation toward the crown.' },
              { name: 'Taper height', text: 'Start the taper at the mid-parietal line — roughly an inch above the top of the ear.' },
              { name: 'Guard progression', text: '#2 base, blended through #1.5, #1, and #0.5 into the taper line. Skin-light only at the immediate hairline if requested.' },
              { name: 'Hairline', text: 'Natural or square — both work. Default to a softly squared front edge for cleanest photo-readability.' },
              { name: 'Neckline', text: 'Square neckline. Avoid tapered neckline unless a deliberate "longer behind the ear" look is intended.' },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Is there ever a bad taper for an oval face?',
        a: 'Structurally, no. There are stylistically inappropriate choices — for example, a burst fade in a conservative legal or finance environment may signal mismatch with the room — but the cut will not fight the face.',
      },
      {
        q: 'Which taper photographs best on an oval face?',
        a: 'Mid taper with a sculpted 3–4 inch top is the most consistently photogenic combination — it carries enough structure to read intentional without becoming the visible focal point.',
      },
      {
        q: 'How long should the top be on an oval face?',
        a: 'Any length from 1 inch to 5 inches works structurally. The most common high-success range is 2.5 to 4 inches, which leaves room for daily styling without forcing daily maintenance.',
      },
      {
        q: 'Does oval tolerate skin fades?',
        a: 'Yes — oval is one of the few face shapes where skin fades and mid-to-high tapers do not introduce structural compromise. The decision should still be made on maintenance cadence and aesthetic context.',
      },
    ],
    related: [
      { href: '/guide/taper-styles/mid-taper', label: 'Mid Taper Defined', hook: 'The most-recommended taper height in the system — what it is and what it pairs with.' },
      { href: '/guide/face-shapes/diamond', label: 'Best Taper for a Diamond Face', hook: 'The other face shape with significant taper flexibility — and how its logic differs from oval.' },
      { href: '/guide/compare/taper-vs-fade', label: 'Taper vs Fade', hook: 'When an oval-faced client should pick a true fade over a taper.' },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────
   * SQUARE FACE
   * ───────────────────────────────────────────────────────────────── */
  {
    cluster: 'face-shapes',
    slug: 'square',
    title: 'Best Taper Haircut for a Square Face',
    subtitle:
      'A square face already has structural definition the haircut does not need to invent. The right taper preserves jaw architecture instead of competing with it.',
    eyebrow: 'Face Shape · Square',
    metaDescription:
      'A precise decision brief for the best taper haircut on a square face — how to preserve jaw architecture, choose the right contrast, and avoid the boxy silhouette that flattens a strong jaw.',
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
    readMinutes: 7,
    directAnswer: {
      question: 'What taper haircut is best for a square face?',
      answer:
        'A mid taper or high taper with controlled top length is the strongest recommendation for a square face. The square jaw is already the defining structural feature, so the cut should add sharp vertical contrast that complements the jawline rather than competing with it. Avoid heavy, blocky top silhouettes — they double the square reading and flatten the natural architecture of the face.',
      bullets: [
        'Mid taper or high taper outperforms low taper on a square face.',
        'Keep top length to 2"–3.5" — longer becomes a competing block.',
        'Textured top finish beats slick, weighted top finish.',
        'Soft or rounded edge-up reads better than a heavy square front.',
      ],
    },
    sections: [
      {
        id: 'jaw-as-feature',
        heading: 'The jaw is the feature — let it be the feature',
        eyebrow: 'Geometry',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'A square face has near-equal width and height with a defined, angular jawline. Where a round face needs the haircut to invent structure, a square face already has it. The mistake square-faced men most often make is asking the cut to add more architecture — which is when the silhouette starts to read blocky.',
              'The job of the taper, in this case, is to keep the visual focus on the jaw without crowding it. A mid or high taper delivers sharp side definition that mirrors the jaw\'s angularity. A low taper, by contrast, lets the side mass extend the visual width and weakens the jaw\'s contrast against the head.',
            ],
          },
        ],
      },
      {
        id: 'top-balance',
        heading: 'The top should be textured, not blocky',
        eyebrow: 'Silhouette',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'Top length on a square face should land between 2 and 3.5 inches. Below that the cut reads close-cropped and loses some of the silhouette interaction with the jaw. Above 3.5 inches the top starts to form a heavy block above the already-rectangular face — two squares stacked is rarely the intended outcome.',
              'Finish matters as much as length. A textured, matte top reads as soft above the strong jaw, creating useful contrast. A wet, slicked-back top emphasizes the rectangle shape and pushes the whole silhouette toward "stern" rather than "structured."',
            ],
          },
          {
            type: 'checklist',
            intro: 'Three top-styling moves that consistently work on square faces:',
            items: [
              'Cut with texture, not weight — texture-thinning shears or point-cutting break up the block.',
              'Style with a matte clay or fiber, not a wet pomade — matte softens, shine hardens.',
              'Disrupt the front line — let a few strands fall forward instead of slicking everything back.',
            ],
          },
        ],
      },
      {
        id: 'edge-softening',
        heading: 'Soften the edges, don\'t double the angles',
        eyebrow: 'Edges',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'A common error on square faces is to square the front edge as well — the logic being that "sharp matches sharp." In practice, this reads as carved and heavy. The face\'s natural architecture is already angular; matching that with a square edge-up creates a too-uniform geometric statement.',
              'A natural or softly rounded front edge contrasts the jaw\'s angularity and lets the jaw remain the dominant geometric feature. The same logic applies to the temple corners — keep them defined but slightly softened, not knife-cut.',
            ],
          },
          {
            type: 'callout',
            tone: 'gold',
            heading: 'Contrast the angles — don\'t mirror them.',
            body: 'A soft front edge against a sharp jaw is what makes a square face read editorial. Matching angles end-to-end reads like an architectural diagram, not a haircut.',
          },
        ],
      },
      {
        id: 'barber-spec',
        heading: 'Barber-ready specification for a square face',
        eyebrow: 'Brief',
        blocks: [
          {
            type: 'howto',
            intro: 'The default brief for a mid-taper square-face cut:',
            steps: [
              { name: 'Length on top', text: 'Leave 2.5"–3" at the front, point-cut or texture-shear the ends to break up the block.' },
              { name: 'Taper height', text: 'Start the taper at the mid-parietal line — roughly an inch above the top of the ear. Bring slightly higher (¼–½ inch) if the client wants the sharper voice of a high taper.' },
              { name: 'Guard progression', text: '#2 base on the sides, blended through #1.5 and #1 to a #0.5 or skin finish at the immediate hairline.' },
              { name: 'Hairline', text: 'Natural or softly rounded — avoid a hard square edge that mirrors the jaw.' },
              { name: 'Neckline', text: 'Square neckline. Tapered neckline is also acceptable for a slightly more conservative read.' },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Should a square face go with a low taper?',
        a: 'Generally not. A low taper lets the side mass extend the visible width and weakens the contrast between the head silhouette and the strong jaw. Mid taper is the highest-success starting point.',
      },
      {
        q: 'Is a slicked-back style wrong for a square face?',
        a: 'Not categorically wrong, but it amplifies the rectangular reading. A textured, matte finish is more flattering more often. If a slicked-back look is the goal, keep the top length under 3 inches and use a low-shine pomade.',
      },
      {
        q: 'What about a high taper or skin fade?',
        a: 'High taper works well — it mirrors the jaw\'s sharpness with a confident, modern side. A full skin fade is acceptable but raises maintenance cadence to a two-week visit cycle.',
      },
      {
        q: 'How long should the top be?',
        a: 'The high-success window is 2 to 3.5 inches. Below 2 inches the cut reads close-cropped and loses interaction with the jaw. Above 3.5 inches the silhouette starts to stack a second block above the face.',
      },
    ],
    related: [
      { href: '/guide/taper-styles/mid-taper', label: 'Mid Taper Defined', hook: 'The taper height that pairs best with strong-jaw face structures.' },
      { href: '/guide/face-shapes/round', label: 'Best Taper for a Round Face', hook: 'The opposite-direction recommendation — and why the two should never share a brief.' },
      { href: '/guide/compare/mid-vs-high-taper', label: 'Mid vs High Taper', hook: 'When to step up to a high taper — and when the mid is doing enough.' },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────
   * DIAMOND FACE
   * ───────────────────────────────────────────────────────────────── */
  {
    cluster: 'face-shapes',
    slug: 'diamond',
    title: 'Best Taper Haircut for a Diamond Face',
    subtitle:
      'Diamond faces have prominent cheekbones and narrower forehead and chin. The right taper widens the upper third of the silhouette without exaggerating the cheekbone projection.',
    eyebrow: 'Face Shape · Diamond',
    metaDescription:
      'A precise decision brief for the best taper haircut on a diamond face — how to balance prominent cheekbones with a wider upper silhouette and avoid the geometry that emphasises the narrow forehead.',
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
    readMinutes: 7,
    directAnswer: {
      question: 'What taper haircut is best for a diamond face?',
      answer:
        'A low or mid taper with substantial top width is the strongest recommendation for a diamond face. Diamond faces have the most projection at the cheekbones, so the taper should keep side mass intact rather than carving the head silhouette to a narrow stem. Build width at the upper third with a fuller, finger-styled or side-textured top to rebalance the silhouette against the wide cheekbone line.',
      bullets: [
        'Low taper or mid taper — avoid high taper and burst that narrow the upper silhouette.',
        'Top should add visible width, not vertical height alone.',
        'Side-textured, finger-tossed, or quiff silhouettes outperform sculpted columns.',
        'Soft front hairline beats a heavy square edge — let the forehead read full.',
      ],
    },
    sections: [
      {
        id: 'cheekbone-geometry',
        heading: 'The cheekbone is the widest point — work with it',
        eyebrow: 'Geometry',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'A diamond face has narrow forehead, prominent cheekbones, and narrow chin. The visual silhouette is widest at the middle and tapers on both ends. The structural issue is the imbalance between the wide cheekbone band and the narrower upper and lower thirds — and the haircut has direct control over the upper third.',
              'A low or mid taper preserves enough side mass at the forehead level to add upper-silhouette width. A high taper or burst fade does the opposite — it carves the upper third narrow and amplifies the cheekbone-to-temple width contrast.',
            ],
          },
        ],
      },
      {
        id: 'top-width',
        heading: 'Build width on top, not just height',
        eyebrow: 'Silhouette',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'On a round face the styling intent is vertical lift. On a diamond face it is horizontal width. The top should not stand straight up — it should expand outward, with the front strands styled forward or sideways rather than straight back.',
              'A finger-tossed or side-swept silhouette delivers this width naturally. A quiff with deliberate volume at the front and lateral spread also works. A tight slicked-back style or a vertical pompadour does the opposite — it columns the silhouette and amplifies the diamond shape.',
            ],
          },
          {
            type: 'checklist',
            intro: 'Three top moves that consistently rebalance diamond faces:',
            items: [
              'Style the front strands forward or sideways — never straight up.',
              'Use a low-hold cream or paste — too much hold collapses the lateral width into a column.',
              'Texture the top with point-cutting so strands spread instead of clumping.',
            ],
          },
        ],
      },
      {
        id: 'hairline-soft',
        heading: 'Soft hairline — the forehead should read full',
        eyebrow: 'Edges',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'A diamond face\'s forehead is naturally narrower than the cheekbones. A heavy square edge-up at the front line reinforces this narrowness by drawing a sharp line across the upper third. A softer, more natural front hairline lets the forehead read fuller and reduces the visual gap between forehead and cheekbone width.',
              'Temple corners should be defined but not severe. Aggressive temple work narrows the upper third further — exactly the opposite of what this face shape needs.',
            ],
          },
        ],
      },
      {
        id: 'barber-spec',
        heading: 'Barber-ready specification for a diamond face',
        eyebrow: 'Brief',
        blocks: [
          {
            type: 'howto',
            intro: 'The default low-taper-plus-width brief:',
            steps: [
              { name: 'Length on top', text: 'Leave 2.5"–3.5" with extra length retained at the sides of the top section so the silhouette spreads, not towers.' },
              { name: 'Taper height', text: 'Low taper — start the taper at the top of the ear, not above it. The upper third needs side mass to read full.' },
              { name: 'Guard progression', text: '#2.5 base on the sides, blended through #2 and #1.5. Skip the skin finish — diamond faces benefit from softer contrast.' },
              { name: 'Hairline', text: 'Soft, natural front edge. Avoid square edge-up. Light temple corner definition only.' },
              { name: 'Neckline', text: 'Rounded neckline. The visual goal is softness around the edges of the head silhouette.' },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Can a diamond face wear a high taper?',
        a: 'It is the weakest of the standard options. A high taper carves the upper third narrow and amplifies the cheekbone-to-temple contrast. If a high taper is the goal anyway, compensate with substantial lateral width at the top — but a mid or low taper is the safer pick.',
      },
      {
        q: 'What about a buzz cut on a diamond face?',
        a: 'A close-cropped uniform buzz exposes the diamond geometry directly — wide cheekbones with narrower forehead and chin. It can work as a deliberate aesthetic choice, but it does no rebalancing work. A buzz with a slight top length differential and a low taper reads better.',
      },
      {
        q: 'Is a side-part style a good fit?',
        a: 'Yes — a side-part with the heavier side falling toward the forehead is one of the most consistent rebalancing styles for a diamond face. It adds asymmetric width and softens the cheekbone projection.',
      },
      {
        q: 'How often does this cut need maintenance?',
        a: 'A low taper holds shape for 4–5 weeks comfortably. Edge cleanup every two weeks keeps the front line soft. The lower contrast level means regrowth reads as intentional rather than overdue for longer than a high-taper cut.',
      },
    ],
    related: [
      { href: '/guide/taper-styles/low-taper', label: 'Low Taper Defined', hook: 'The taper height that pairs best with cheekbone-prominent faces.' },
      { href: '/guide/face-shapes/heart', label: 'Best Taper for a Heart Face', hook: 'The related but inverse problem — wide forehead and narrower jaw.' },
      { href: '/guide/hair-textures/wavy', label: 'Wavy Hair + Tapers', hook: 'Wavy texture naturally creates lateral width — useful information for diamond-face styling.' },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────
   * HEART FACE
   * ───────────────────────────────────────────────────────────────── */
  {
    cluster: 'face-shapes',
    slug: 'heart',
    title: 'Best Taper Haircut for a Heart-Shaped Face',
    subtitle:
      'A heart-shaped face is widest at the forehead and narrowest at the chin. The right taper avoids stacking more visual width above the eyes and lets the jaw line read with more confidence.',
    eyebrow: 'Face Shape · Heart',
    metaDescription:
      'A precise decision brief for the best taper haircut on a heart-shaped face — how to balance a wide forehead with a narrow chin and avoid the geometry that exaggerates the imbalance.',
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
    readMinutes: 7,
    directAnswer: {
      question: 'What taper haircut is best for a heart-shaped face?',
      answer:
        'A mid taper with a moderate, textured top is the strongest recommendation for a heart-shaped face. The face is already wide at the forehead and pointed at the chin, so the cut should reduce visible top-mass and add a small amount of structure near the lower third to rebalance the silhouette. Avoid heavy slicked-back tops, oversized pompadours, and burst fades — all three exaggerate the existing imbalance.',
      bullets: [
        'Mid taper outperforms low and high taper for most heart-shaped faces.',
        'Top length: 2"–3", textured, not heavy — never an oversized pompadour.',
        'A short beard or controlled stubble helps balance the narrow chin.',
        'Soft, natural front hairline — the forehead does not need additional emphasis.',
      ],
    },
    sections: [
      {
        id: 'imbalance',
        heading: 'The imbalance is top-to-bottom, not side-to-side',
        eyebrow: 'Geometry',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'A heart-shaped face widens at the temples and forehead, then narrows steadily to a defined point at the chin. The structural challenge sits on the vertical axis — too much visible mass above the eyes, too little support below them.',
              'The taper has direct control over the upper portion of the silhouette. A mid taper keeps the side mass tight at the temples, reducing the apparent forehead width. A burst fade or high taper does the opposite — it broadens the upper third visually and worsens the imbalance with the narrow chin.',
            ],
          },
        ],
      },
      {
        id: 'top-restraint',
        heading: 'Top restraint is the move',
        eyebrow: 'Silhouette',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'Most face shapes benefit from a top with at least some height. Heart faces do not. Tall, structural tops stack additional visible mass above the already-wide forehead. The strongest recommendation is a moderate, textured top — 2 to 3 inches at the front, with the styling intent being soft directional flow, not vertical lift.',
              'A side-part style works well. So does a textured, slightly forward-fall crop. What does not work is a quiff, pompadour, or any silhouette that converts top length into visible vertical mass.',
            ],
          },
          {
            type: 'pair',
            left: { label: 'Recommended', value: 'Textured Crop · Side Part' },
            right: { label: 'Avoid', value: 'Pompadour · Tall Quiff' },
          },
        ],
      },
      {
        id: 'beard-balance',
        heading: 'A short beard does the rebalancing work',
        eyebrow: 'Beard',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'A short, well-defined beard or controlled stubble is one of the most effective rebalancing tools for a heart-shaped face. It adds visible mass at the chin — exactly where the face structure is narrowest — and brings the upper and lower thirds closer to parity.',
              'The beard does not need to be full or long. A 3–5mm beard line with a clean jaw line is enough. The key is presence at the chin, not bulk.',
            ],
          },
          {
            type: 'callout',
            tone: 'gold',
            heading: 'For heart faces, the beard does what the taper alone can\'t.',
            body: 'Adding a short controlled beard rebalances the vertical axis of the face in a way no haircut alone can match. Even men who prefer to stay clean-shaven should expect the cut to do roughly 70% of the work and the beard the remaining 30%.',
          },
        ],
      },
      {
        id: 'barber-spec',
        heading: 'Barber-ready specification for a heart face',
        eyebrow: 'Brief',
        blocks: [
          {
            type: 'howto',
            intro: 'The default mid-taper-with-restrained-top brief:',
            steps: [
              { name: 'Length on top', text: 'Leave 2"–3" at the front. Textured, not weighted. Avoid pompadour-style buildup at the front.' },
              { name: 'Taper height', text: 'Mid taper — start the contrast at the mid-parietal line, slightly above the top of the ear. Stay below the parietal ridge to avoid widening the upper third.' },
              { name: 'Guard progression', text: '#2 base on the sides, blended through #1.5 and #1, finishing close to skin only at the immediate hairline.' },
              { name: 'Hairline', text: 'Soft, natural front edge. No hard square — the forehead reads wide enough already.' },
              { name: 'Neckline', text: 'Square or rounded — both work. Avoid heavy taper at the nape that draws the eye downward.' },
              { name: 'Beard', text: 'If wearing facial hair, keep it short (3–5mm) with a defined jaw line. Trim the moustache cleanly to maintain proportion.' },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Should a heart-shaped face avoid all volume on top?',
        a: 'Not all volume — just vertical volume. Soft directional volume (forward, side-swept) is fine. What to avoid is height-focused styling (pompadour, quiff, vertical lift) because it stacks more visible mass above the already-wide forehead.',
      },
      {
        q: 'Is a burst fade a bad choice for a heart-shaped face?',
        a: 'Yes, generally. A burst fade deliberately widens the visible mass behind and above the ear, which sits in the same horizontal band as the already-wide temple. The pairing exaggerates the heart shape.',
      },
      {
        q: 'What about a beard for a heart-shaped face?',
        a: 'Strongly recommended if comfortable wearing facial hair. A short, well-defined beard adds visual mass at the chin — exactly where the face is narrowest — and is one of the most effective rebalancing tools available.',
      },
      {
        q: 'How long should the top be?',
        a: '2 to 3 inches at the front, textured, never structurally tall. Longer than 3 inches typically forces the styling intent into vertical territory, which works against the face shape.',
      },
    ],
    related: [
      { href: '/guide/taper-styles/mid-taper', label: 'Mid Taper Defined', hook: 'The taper height that pairs best with forehead-prominent faces.' },
      { href: '/guide/face-shapes/diamond', label: 'Best Taper for a Diamond Face', hook: 'The related cheekbone-projecting face shape — and how its taper logic differs.' },
      { href: '/guide/maintenance/styling', label: 'Styling Routines That Hold', hook: 'Heart-face cuts depend on styling — the routines that keep the silhouette right.' },
    ],
  },
]
