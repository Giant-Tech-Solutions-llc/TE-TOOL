import type { Article } from './types'

const PUBLISHED = '2026-05-12'
const UPDATED = '2026-05-17'

export const HAIR_TEXTURE_ARTICLES: Article[] = [
  /* ─────────────────────────────────────────────────────────────────
   * STRAIGHT
   * ───────────────────────────────────────────────────────────────── */
  {
    cluster: 'hair-textures',
    slug: 'straight',
    title: 'Best Taper for Straight Hair',
    subtitle:
      'Straight hair telegraphs precision. Every angle in the cut shows. The right taper exploits this transparency instead of fighting it.',
    eyebrow: 'Hair Texture · Straight',
    metaDescription:
      'A decision brief for the best taper haircut on straight hair — why straight texture rewards precision geometry, which taper heights work, and the styling routines that hold straight tops.',
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
    readMinutes: 7,
    directAnswer: {
      question: 'What taper haircut works best with straight hair?',
      answer:
        'Straight hair pairs best with mid taper or high taper because the texture shows every angle of the cut cleanly, which rewards precise side geometry. The styling challenge is volume — straight hair falls flat without product structure — so the top should be cut with enough length (2.5"+) to support intentional silhouette. Avoid skin-light tapers if hair is thinning; the contrast highlights density loss.',
      bullets: [
        'Mid taper or high taper — straight texture rewards visible geometry.',
        'Top length 2.5" or more to support styled height.',
        'Matte products outperform shine on straight hair (less density collapse).',
        'Edge cleanup is highly visible — 10-day cadence keeps it sharp.',
      ],
    },
    sections: [
      {
        id: 'transparency',
        heading: 'Straight hair is transparent — work with it',
        eyebrow: 'Material',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'Straight hair lies flat against the head, which means every angle in the cut is visible. A taper line that bends slightly to one side shows up clearly. A blend that skips a guard reads as a visible step. There is no curl or wave to camouflage technique errors.',
              'This transparency is a constraint and an opportunity. The constraint is that the cut must be technically clean — straight hair punishes shortcuts. The opportunity is that a precise cut on straight hair photographs with exceptional definition. Every advantage of geometric precision shows.',
            ],
          },
        ],
      },
      {
        id: 'top-volume',
        heading: 'Volume is the styling problem to solve',
        eyebrow: 'Silhouette',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'Straight hair falls flat. Without product structure, even a 4-inch top will lie close to the head and the silhouette will read as a longer crop rather than a styled shape. The cut must be paired with product strategy or the styled outcome will look unfinished.',
              'The reliable approach is a two-pass product routine: a pre-dry volumizer (mousse or sea-salt spray) to add structural body during the blow-out, and a post-dry matte styling product (paste, fiber, or clay) to lock the silhouette. A one-pass routine — product applied to dry hair only — almost never produces enough volume on straight texture.',
            ],
          },
          {
            type: 'checklist',
            intro: 'Three product moves that consistently produce volume on straight hair:',
            items: [
              'Apply a volumizing mousse or sea salt spray to towel-dried hair before blow-drying.',
              'Blow-dry upward and forward with a round brush or by hand — never with hair falling down.',
              'Finish with a matte paste or fiber, applied to fingers and worked through the top — never to scalp.',
            ],
          },
        ],
      },
      {
        id: 'guard-cleanliness',
        heading: 'Guard progression must be technically clean',
        eyebrow: 'Technique',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'Because straight hair shows every angle, a sloppy taper progression is immediately visible. Each guard step should blend smoothly into the next, with shears or a tapered comb closing any visible boundary between guard levels.',
              'This is also the reason skin-light tapers can backfire on thinning straight hair. The sharp contrast at the hairline draws the eye directly to the area where density loss is most visible. A #0.5 or #1 finish gives 90% of the visual sharpness with significantly less density exposure.',
            ],
          },
        ],
      },
      {
        id: 'pairings',
        heading: 'Strong pairings for straight hair',
        eyebrow: 'Pairings',
        blocks: [
          {
            type: 'table',
            intro: 'Three combinations that consistently photograph well on straight texture:',
            columns: ['Cut', 'Top length', 'Reads as'],
            rows: [
              ['Mid taper + sculpted top', '3.5"–4.5"', 'Classic editorial · executive default'],
              ['High taper + textured crop', '1.5"–2.5"', 'Modern athletic · low-maintenance'],
              ['Low taper + side-part scissor cut', '4"–5"', 'Conservative · grown-up'],
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Does straight hair need more styling time than curly hair?',
        a: 'Generally yes. Curl provides natural volume; straight hair requires product structure to produce equivalent silhouette. Expect a 5–8 minute morning routine for a styled straight top, versus 2–3 minutes for a curly top of comparable length.',
      },
      {
        q: 'Why does straight hair always look greasy with pomade?',
        a: 'Pomade is high-shine and silicone-rich, which reads as "wet" on straight hair more obviously than on curly or coily textures. Switch to a matte clay or fiber for a cleaner finish — and use significantly less product than a curly user would.',
      },
      {
        q: 'Should I use heat tools on straight hair?',
        a: 'A blow-dryer is almost essential for volume. A heat-styling tool (round brush, flat iron) is optional but useful for a polished sculpted top. Always finish with a cool-shot to set the silhouette.',
      },
      {
        q: 'How often does a straight-hair taper need edge cleanup?',
        a: 'Every 7–10 days. Because straight hair telegraphs the contrast line precisely, regrowth shows fastest visually. A weekly edge maintenance routine — or a willingness to do at-home edge cleanup between visits — keeps the cut sharp.',
      },
    ],
    related: [
      { href: '/guide/taper-styles/mid-taper', label: 'Mid Taper Defined', hook: 'The taper height most often paired with straight hair.' },
      { href: '/guide/maintenance/styling', label: 'Styling Routines That Hold', hook: 'Two-pass product routines built for low-volume textures.' },
      { href: '/guide/hair-textures/wavy', label: 'Best Taper for Wavy Hair', hook: 'The texture one step further from straight — and how its logic differs.' },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────
   * WAVY
   * ───────────────────────────────────────────────────────────────── */
  {
    cluster: 'hair-textures',
    slug: 'wavy',
    title: 'Best Taper for Wavy Hair',
    subtitle:
      'Wavy hair has natural volume and lateral spread. The right taper exploits both — sharp side contrast against organic top texture.',
    eyebrow: 'Hair Texture · Wavy',
    metaDescription:
      'A decision brief for the best taper haircut on wavy hair — how wave pattern interacts with taper geometry, which heights produce the strongest silhouette, and the styling routines that respect the wave.',
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
    readMinutes: 7,
    directAnswer: {
      question: 'What taper haircut works best with wavy hair?',
      answer:
        'Wavy hair pairs strongly with mid taper or high taper because the wave pattern already provides natural top volume, and the sharp side contrast frames the organic top texture cleanly. Top length should land in the 2.5"–4" range to let the wave pattern develop without becoming unruly. Avoid heavy-hold products that block the wave — use cream-based or low-hold paste to define the pattern instead.',
      bullets: [
        'Mid taper or high taper — sharp sides frame natural top volume.',
        'Top length 2.5"–4" lets the wave develop without going unruly.',
        'Cream or low-hold paste protects the wave pattern.',
        'Air-dry or finger-styled finish reads better than blow-dried.',
      ],
    },
    sections: [
      {
        id: 'wave-as-asset',
        heading: 'The wave is a styling asset — protect it',
        eyebrow: 'Material',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'Wavy hair sits between straight and curly. The s-curve pattern adds natural volume, organic texture, and a degree of randomness that breaks the geometric flatness of straight hair. Every one of these properties is valuable in a styled silhouette — and every one of them is undone by the wrong product or the wrong cut.',
              'The cut should preserve enough length for the wave pattern to develop visibly. Under 2 inches the wave compresses to a barely-visible texture; at 2.5–4 inches the pattern becomes the visual interest. Product choice protects this: heavy-hold pomade glues the wave shut; cream and low-hold paste hold the pattern in shape without flattening it.',
            ],
          },
        ],
      },
      {
        id: 'taper-pairings',
        heading: 'Sharp sides, soft top — the consistent pairing',
        eyebrow: 'Silhouette',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'The strongest silhouette on wavy hair sets a sharp, defined taper against the soft, organic top. A mid or high taper provides the architectural contrast; the wave provides the editorial softness. This contrast between geometric side and organic top is the visual signature of the strongest wavy cuts.',
              'A low taper softens the side too, which removes the contrast and lets the cut read as undefined. It is not categorically wrong, but it misses the texture\'s strongest asset.',
            ],
          },
          {
            type: 'pair',
            left: { label: 'Recommended', value: 'Mid · High taper with 2.5"–4" wavy top' },
            right: { label: 'Avoid', value: 'Heavy pomade · Tight skin fade for thinning wavy hair' },
          },
        ],
      },
      {
        id: 'styling',
        heading: 'Styling routine — let the wave do the work',
        eyebrow: 'Routine',
        blocks: [
          {
            type: 'howto',
            intro: 'The reliable wavy-hair routine:',
            steps: [
              { name: 'Wash less', text: 'Wave pattern needs natural sebum to define. Shampoo 2–3 times per week, condition daily.' },
              { name: 'Towel dry gently', text: 'Squeeze water out; do not rub. Rubbing breaks the wave into frizz.' },
              { name: 'Apply cream', text: 'A pea-sized amount of curl cream or low-hold paste, worked through damp hair with fingers, not a brush.' },
              { name: 'Air dry or diffuse', text: 'Air-drying preserves the wave pattern best. If time-constrained, use a diffuser on low heat with the hair scrunched upward.' },
              { name: 'Touch up dry', text: 'Once dry, work a small amount of additional paste through to define the visual silhouette.' },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Why does my wavy hair go frizzy?',
        a: 'Most frizz comes from one of three causes: over-washing (sebum depletion), towel-rubbing (cuticle disruption), or wrong product (heavy holds break the wave). Adjust each in turn — washing first, then drying technique, then product.',
      },
      {
        q: 'Should I cut wavy hair when wet or dry?',
        a: 'Dry, generally. Wavy hair is significantly shorter when wet — a 4-inch wet length can dry to 3 inches. Cutting dry shows the actual finished length. If a barber insists on cutting wet, ask for an extra half-inch of length retained to compensate.',
      },
      {
        q: 'Does a high taper work for thinning wavy hair?',
        a: 'Cautiously. A high taper with skin contrast at the hairline can highlight density loss. A mid taper with a #0.5 finish gives most of the sharpness without exposing density.',
      },
      {
        q: 'How often does a wavy-hair taper need maintenance?',
        a: 'The taper itself follows the standard cycle for its height (2 weeks for high, 3–4 for mid, 4–5 for low). The top can go significantly longer — wavy texture grows out cleanly and reads as intentional length for longer than straight texture does.',
      },
    ],
    related: [
      { href: '/guide/taper-styles/mid-taper', label: 'Mid Taper Defined', hook: 'The taper height most often paired with wavy texture.' },
      { href: '/guide/hair-textures/curly', label: 'Best Taper for Curly Hair', hook: 'One step beyond wave — and a different styling logic.' },
      { href: '/guide/face-shapes/diamond', label: 'Best Taper for a Diamond Face', hook: 'Wavy texture and diamond face shape — a natural pairing.' },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────
   * CURLY
   * ───────────────────────────────────────────────────────────────── */
  {
    cluster: 'hair-textures',
    slug: 'curly',
    title: 'Best Taper for Curly Hair',
    subtitle:
      'Curly hair compresses vertical height and projects lateral width. The right taper respects this geometry — sharp sides to contain the spread, generous top to let the curl pattern define the silhouette.',
    eyebrow: 'Hair Texture · Curly',
    metaDescription:
      'A complete decision brief for the best taper haircut on curly hair — curl pattern interaction, taper heights that respect the geometry, and the styling logic that protects the curl.',
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
    readMinutes: 8,
    directAnswer: {
      question: 'What taper haircut works best with curly hair?',
      answer:
        'Curly hair pairs strongest with mid taper, high taper, or burst fade because the sharp side contrast frames the natural top volume that curl produces. Top length should be substantial — 3 to 5 inches — to let the curl pattern develop fully. Avoid skin-light tapers if combined with very short top length; that combination compresses the curl interaction and can look choppy. Specific products built for curl (cream, gel-cream hybrid) outperform paste or pomade.',
      bullets: [
        'Mid taper, high taper, or burst — all three frame curl volume cleanly.',
        'Top length: 3"–5" lets the curl pattern develop fully.',
        'Use curl-specific products — cream or gel-cream, not paste.',
        'Avoid heat damage — air-dry or diffuse, never flat-iron.',
      ],
    },
    sections: [
      {
        id: 'curl-geometry',
        heading: 'Curl geometry — vertical compression, lateral spread',
        eyebrow: 'Material',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'A 4-inch curl pattern visible on the head represents perhaps 8 inches of actual hair length. Curl compresses vertical length and projects horizontal width — the opposite of straight hair, which lies flat lengthwise. This changes every styling decision.',
              'Cut length is measured differently. A curly cut needs more actual length retained to produce a visible silhouette, because every inch of curl displays as roughly half an inch of visible top mass. Underestimating this is the most common error in curly-hair cuts: clients ask for "3 inches on top" expecting a styled height, and end up with a barely-textured crop.',
            ],
          },
        ],
      },
      {
        id: 'taper-pairings',
        heading: 'Taper height pairs sharp with substantial top',
        eyebrow: 'Silhouette',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'The strongest pairing on curly hair sets a sharp taper against generous top length. The curl produces the volume; the taper provides the geometric frame that prevents the cut from reading as undefined. A mid or high taper carries this geometry cleanly. A burst fade frames the curl with an editorial curved contrast that reads particularly well on tight curl patterns.',
              'A low taper is the weakest option for most curly cuts. Without strong side contrast, the curl mass merges visually with the side hair and the cut loses definition.',
            ],
          },
          {
            type: 'callout',
            tone: 'gold',
            heading: 'Curl is the volume — the taper is the frame.',
            body: 'On curly hair, the side contrast and the top length work as a single compositional system. Sharp taper plus generous top equals defined silhouette. Soft taper plus short top equals undefined mass.',
          },
        ],
      },
      {
        id: 'styling',
        heading: 'Styling routine — curl deserves its own product family',
        eyebrow: 'Routine',
        blocks: [
          {
            type: 'howto',
            intro: 'The reliable curly-hair routine:',
            steps: [
              { name: 'Wash less, condition more', text: 'Curly hair is naturally drier than straight hair. Shampoo 1–2 times per week with sulfate-free formula. Condition every wash.' },
              { name: 'Apply product to soaking-wet hair', text: 'Curl pattern locks in while the hair is wet. Apply curl cream or gel-cream hybrid to soaking hair, before any drying.' },
              { name: 'Scrunch upward', text: 'Squeeze the hair upward toward the scalp with a microfiber towel or t-shirt. This locks the curl pattern.' },
              { name: 'Air dry or diffuse on low', text: 'No high heat. Air-drying preserves pattern best; diffuser on low heat is the time-saving alternative.' },
              { name: 'Do not touch until dry', text: 'Touching wet or damp curl breaks the pattern into frizz. Wait until fully dry to reshape if needed.' },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Why is my curl pattern uneven?',
        a: 'Uneven curl usually comes from inconsistent product application or heat damage. Apply product evenly to soaking-wet hair and avoid blow-drying or flat-ironing — both disrupt the pattern over time.',
      },
      {
        q: 'Should curly hair be cut wet or dry?',
        a: 'Strongly recommended: dry. Curly hair shrinks 40–50% when wet. Cutting wet produces a finished length significantly shorter than expected. A dry cut shows actual finished silhouette.',
      },
      {
        q: 'Is a burst fade good for curly hair?',
        a: 'Yes — particularly well-paired. The curved geometry of the burst frames curl volume editorially, and the longer rear hair option carries texture cleanly. Burst fade on tight curl is one of the strongest pairings in the system.',
      },
      {
        q: 'What products should I avoid?',
        a: 'Anything with sulfates (drying), most paste and clay products (designed for straight hair, weigh curl down), and high-shine pomades (weight + shine compress curl pattern). Stick to curl creams, gel-cream hybrids, and water-based defining products.',
      },
    ],
    related: [
      { href: '/guide/taper-styles/burst-fade', label: 'Burst Fade Defined', hook: 'The taper geometry that pairs most naturally with curl texture.' },
      { href: '/guide/hair-textures/coily', label: 'Best Taper for Coily Hair', hook: 'The texture one step beyond curl — and how its rules differ.' },
      { href: '/guide/maintenance/styling', label: 'Styling Routines That Hold', hook: 'Routines built around the curl-as-volume principle.' },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────
   * COILY
   * ───────────────────────────────────────────────────────────────── */
  {
    cluster: 'hair-textures',
    slug: 'coily',
    title: 'Best Taper for Coily Hair',
    subtitle:
      'Coily hair has the tightest curl pattern in the texture family. The right taper supports natural volume, respects shrinkage, and uses moisture-first product strategy as the foundation of the cut.',
    eyebrow: 'Hair Texture · Coily',
    metaDescription:
      'A precise decision brief for the best taper haircut on coily hair — pattern geometry, moisture-first styling, and the taper heights that work best with type 4 textures.',
    publishedAt: PUBLISHED,
    updatedAt: UPDATED,
    readMinutes: 8,
    directAnswer: {
      question: 'What taper haircut works best with coily hair?',
      answer:
        'Coily hair pairs strongly with mid taper, high taper, or burst fade because the tight curl pattern needs strong side contrast to read as a defined cut rather than as undifferentiated volume. Top length must account for significant shrinkage (50–70% versus stretched length). Moisture-first styling — leave-in conditioner, oil, then sealant — outperforms hold-based product systems.',
      bullets: [
        'Mid taper, high taper, or burst fade — sharp sides frame coily volume.',
        'Account for 50–70% shrinkage when specifying top length at the chair.',
        'Moisture-first product order: leave-in, oil, sealant — not hold-only.',
        'Sleep on satin or wear a durag to protect the pattern overnight.',
      ],
    },
    sections: [
      {
        id: 'shrinkage',
        heading: 'Shrinkage is the single most important variable',
        eyebrow: 'Material',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'Coily hair (type 4 in the standard classification) shrinks more than any other texture. A strand that is 6 inches long when stretched can sit at 2 inches when natural and dry. This compression dominates every cut decision — the actual hair length and the visible silhouette length are different numbers.',
              'When specifying top length at the chair, account for this directly. A "2 inches on top" specification yields close to a buzz on coily hair, because the actual hair length is already shorter than the stretched measurement. Ask for 4 to 6 inches of stretched length and let the natural pattern compress it to the visible silhouette.',
            ],
          },
          {
            type: 'callout',
            heading: 'Specify stretched length, not visible length.',
            body: 'Tell the barber the length you want when the hair is stretched, not when it is in its natural pattern. The 50–70% shrinkage compresses to the visible silhouette automatically.',
          },
        ],
      },
      {
        id: 'taper-pairings',
        heading: 'Sharp sides are non-negotiable',
        eyebrow: 'Silhouette',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'Without sharp side contrast, a coily cut blurs into undifferentiated mass. The natural pattern projects in all directions and the silhouette loses definition. A mid taper, high taper, or burst fade provides the geometric edge that makes the natural volume read as a deliberate cut.',
              'The most consistently strong pairing is a mid taper with a 4-inch (stretched) top — sometimes called a curl sponge cut when the pattern is enhanced with a sponge tool. The mid taper provides intentional side contrast; the top length gives the pattern room to express.',
            ],
          },
        ],
      },
      {
        id: 'moisture-routine',
        heading: 'Moisture-first product order',
        eyebrow: 'Routine',
        blocks: [
          {
            type: 'howto',
            intro: 'The standard LOC method (Liquid, Oil, Cream) adapted for coily men\'s hair:',
            steps: [
              { name: 'Wash', text: 'Sulfate-free shampoo 1–2 times per week. Co-wash (conditioner-only wash) between full washes if hair feels dry.' },
              { name: 'Deep condition', text: 'Once per week. Leave in for 10–15 minutes under a shower cap or warm towel to lock moisture into the cuticle.' },
              { name: 'Apply leave-in', text: 'Water-based leave-in conditioner to soaking wet hair. This is the moisture foundation.' },
              { name: 'Seal with oil', text: 'Argan, jojoba, or castor oil applied lightly. Locks moisture inside the cuticle.' },
              { name: 'Define with cream', text: 'Curl-defining cream to shape the pattern and add light hold. Avoid heavy waxes — they block moisture.' },
              { name: 'Protect overnight', text: 'Satin or silk pillowcase, or a durag, to preserve the pattern and reduce friction breakage.' },
            ],
          },
        ],
      },
      {
        id: 'maintenance',
        heading: 'Maintenance cycle for coily-haired cuts',
        eyebrow: 'Cadence',
        blocks: [
          {
            type: 'prose',
            paragraphs: [
              'Coily hair tolerates a longer cycle between full visits than straight or wavy hair, because the natural pattern absorbs regrowth more gracefully. Plan a 3–4 week cycle for the full taper refresh, with edge cleanup every 7–10 days to keep the front line and ear arcs crisp.',
              'The exception is a tight high-taper or burst fade with skin contrast — these have the standard 2-week peak window for any high taper, regardless of texture. The contrast region shows regrowth at the same speed across all textures.',
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Does coily hair need different products than curly hair?',
        a: 'Mostly yes. Coily hair needs more moisture and more sealing than curly hair. Products designed for type 3 curl (curl cream, gel-cream) may not deliver enough moisture for type 4 coily. Look for products that include shea butter, castor oil, or other heavy moisturizers.',
      },
      {
        q: 'Should I use a sponge tool on coily hair?',
        a: 'A curl sponge enhances the natural pattern by coaxing each coil into a defined formation. It works particularly well on mid-length tops (3–5 inches stretched). It is optional, not required, and works best on freshly washed and moisturized hair.',
      },
      {
        q: 'Why does my hair feel dry even when I oil it daily?',
        a: 'Oil seals moisture in but does not add moisture. If the cuticle was not properly moisturized before the oil was applied, the oil is sealing in dryness. Apply leave-in conditioner (water-based) first, then oil, then a defining cream.',
      },
      {
        q: 'Is a burst fade good for coily hair?',
        a: 'Yes — exceptionally well-paired. The curved burst geometry frames type-4 volume cleanly and the editorial reading is well-aligned with the visible drama of natural coil. It is one of the strongest pairings in the system.',
      },
    ],
    related: [
      { href: '/guide/taper-styles/burst-fade', label: 'Burst Fade Defined', hook: 'The taper geometry that pairs most cinematically with coily texture.' },
      { href: '/guide/hair-textures/curly', label: 'Best Taper for Curly Hair', hook: 'One step less compressed — and where the rules diverge.' },
      { href: '/guide/maintenance/maintenance-system', label: 'Maintenance System', hook: 'Cycle and edge cadence built around real maintenance reality.' },
    ],
  },
]
