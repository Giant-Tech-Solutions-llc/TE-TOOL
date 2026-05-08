// Shared between Vite client (src/utils/api.js) and Vercel functions (api/*).
// Pure JS, no env vars, no DOM, no Node-only globals.

export const FACE_SHAPES = ['round', 'oval', 'square', 'heart', 'diamond'];
export const HAIR_TYPES = ['straight', 'wavy', 'curly', 'coily'];

export const APPROVED_STYLES = [
  { name: 'Low Taper Fade', slug: 'low-taper-fade' },
  { name: 'Mid Taper Fade', slug: 'mid-taper-fade' },
  { name: 'High Taper Fade', slug: 'high-taper-fade' },
  { name: 'Blowout Taper', slug: 'blowout-taper' },
  { name: 'Low Blowout Taper', slug: 'low-blowout-taper' }
];

export function buildRecommendationPrompt(inputData) {
  const d = (inputData && inputData.data) || {};
  const isPhoto = inputData && inputData.type === 'photo';
  const profile = isPhoto
    ? '- Analyzing uploaded photo for face shape and hair type'
    : [
        `- Face Shape: ${d.faceShape || 'unspecified'}`,
        `- Hair Type: ${d.hairType || 'unspecified'}`,
        `- Lifestyle: ${d.lifestyle || 'unspecified'}`,
        `- Age Range: ${d.age || 'unspecified'}`,
        `- Maintenance Preference: ${d.maintenance || 'unspecified'}`
      ].join('\n');

  const styleList = APPROVED_STYLES
    .map((s) => `- ${s.name} -> ${s.slug}`)
    .join('\n');

  const genderInstructions = isPhoto
    ? [
        'GATING RULE — read this before everything else:',
        'This is a men\'s barbershop tool. The recommendations are only valid for male-presenting subjects.',
        'Examine the uploaded photo and set "gender_check" to one of these exact values:',
        '  - "male"           : a male-presenting face is clearly visible. Continue and produce 3 recommendations.',
        '  - "female"         : the subject appears female-presenting. Return an empty recommendations array.',
        '  - "unclear"        : no clear face, multiple people, or you cannot tell. Return an empty recommendations array.',
        'When gender_check is not "male", recommendations must be an empty array — do not invent placeholder content.'
      ].join('\n')
    : 'Set "gender_check" to "not_applicable" because no photo was provided.';

  return [
    'You are a professional barber consultant for men\'s taper haircuts.',
    '',
    genderInstructions,
    '',
    'Input Profile:',
    profile,
    '',
    'Return ONLY valid JSON with this schema:',
    '{',
    '  "gender_check": "male" | "female" | "unclear" | "not_applicable",',
    '  "recommendations": [',
    '    {',
    '      "style_name": "Low Taper Fade",',
    '      "match_score": 92,',
    '      "why_it_works": "2 sentences explaining match",',
    '      "barber_instructions": "Exact technical instructions including guard sizes and length",',
    '      "maintenance": "Frequency and effort",',
    '      "related_url": "low-taper-fade"',
    '    }',
    '  ]',
    '}',
    '',
    'Approved styles with their URLs:',
    styleList,
    '',
    'When gender_check is "male" or "not_applicable", return 3 recommendations ranked by match score using only the slugs above for related_url.'
  ].join('\n');
}

export function buildEditPrompt(rec) {
  return [
    'Edit this photograph to show the same person with a new haircut.',
    'FRAMING: produce a tight head-and-shoulders portrait. The hairstyle, full face,',
    'and the top of the shoulders MUST be fully visible inside the frame. Do NOT include',
    'the chest, torso, arms, or anything below the upper shoulders. Do NOT zoom out, do',
    'NOT add or change clothing below the collar.',
    'IDENTITY: keep the person\'s face, skin tone, eyes, eyebrows, mouth, beard,',
    'expression, lighting, and background EXACTLY the same.',
    `Replace ONLY the hairstyle with: ${rec.style_name}.`,
    `Cut details: ${rec.barber_instructions || ''}`,
    'Photorealistic, professional barbershop portrait quality, sharp focus on the hair,',
    'natural shadows, no text, no watermark.'
  ].join(' ');
}

export function buildStockPrompt(rec) {
  return [
    'Generate a realistic professional headshot photograph of an adult man',
    `with a ${rec.style_name} haircut.`,
    `Cut details: ${rec.barber_instructions || ''}`,
    'FRAMING: tight head-and-shoulders portrait. The hairstyle, full face, and the',
    'top of the shoulders MUST be fully visible. Do NOT include chest, torso, arms,',
    'or anything below the upper shoulders.',
    'Neutral studio background, soft natural lighting, photorealistic, high resolution,',
    'clean editorial barbershop style, no text, no watermark.'
  ].join(' ');
}

export function slugify(name) {
  return String(name || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function clampScore(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 85;
  return Math.max(70, Math.min(99, Math.round(n)));
}

function pickArray(parsed) {
  if (!parsed) return null;
  if (Array.isArray(parsed)) return parsed;
  if (Array.isArray(parsed.recommendations)) return parsed.recommendations;
  if (Array.isArray(parsed.results)) return parsed.results;
  if (Array.isArray(parsed.styles)) return parsed.styles;
  if (Array.isArray(parsed.items)) return parsed.items;
  if (Array.isArray(parsed.data)) return parsed.data;
  return null;
}

function tryJsonParse(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

export function parseModelResponse(text) {
  if (!text || typeof text !== 'string') return null;

  // 1. Direct parse (Gemini with responseMimeType=application/json)
  let parsed = tryJsonParse(text);
  if (parsed) return parsed;

  // 2. Strip markdown code fences
  const stripped = text
    .replace(/^\s*```(?:json|JSON)?\s*\n?/g, '')
    .replace(/\n?\s*```\s*$/g, '')
    .trim();
  if (stripped !== text) {
    parsed = tryJsonParse(stripped);
    if (parsed) return parsed;
  }

  // 3. Extract a JSON object substring
  const objMatch = text.match(/\{[\s\S]*\}/);
  if (objMatch) {
    parsed = tryJsonParse(objMatch[0]);
    if (parsed) return parsed;
  }

  // 4. Extract a JSON array substring
  const arrMatch = text.match(/\[[\s\S]*\]/);
  if (arrMatch) {
    parsed = tryJsonParse(arrMatch[0]);
    if (parsed) return parsed;
  }

  return null;
}

export function parseRecommendations(text) {
  return pickArray(parseModelResponse(text));
}

export function parseGenderCheck(parsed) {
  if (!parsed || typeof parsed !== 'object') return null;
  const value = parsed.gender_check || parsed.genderCheck;
  if (typeof value === 'string') return value.toLowerCase();
  return null;
}

export const RECOMMENDATION_RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    gender_check: {
      type: 'STRING',
      enum: ['male', 'female', 'unclear', 'not_applicable']
    },
    recommendations: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          style_name: { type: 'STRING' },
          match_score: { type: 'INTEGER' },
          why_it_works: { type: 'STRING' },
          barber_instructions: { type: 'STRING' },
          maintenance: { type: 'STRING' },
          related_url: { type: 'STRING' }
        },
        required: ['style_name', 'match_score', 'why_it_works', 'barber_instructions', 'maintenance']
      }
    }
  },
  required: ['gender_check', 'recommendations']
};

export function normalizeRecommendations(recs) {
  if (!Array.isArray(recs)) return [];
  return recs.slice(0, 3).map((r) => {
    const styleName = String(r.style_name || 'Taper Style');
    const slug = r.related_url ? String(r.related_url) : slugify(styleName);
    return {
      style_name: styleName,
      match_score: clampScore(r.match_score),
      why_it_works: String(r.why_it_works || ''),
      barber_instructions: String(r.barber_instructions || ''),
      maintenance: String(r.maintenance || ''),
      related_url: slug,
      image_url: null
    };
  });
}

export function getFallbackRecommendations(data) {
  data = data || {};
  const face = FACE_SHAPES.includes(data.faceShape) ? data.faceShape : 'oval';
  const hair = HAIR_TYPES.includes(data.hairType) ? data.hairType : 'straight';
  const maintenance = data.maintenance || 'medium';

  return [
    {
      style_name: 'Low Taper Fade',
      match_score: 92,
      why_it_works:
        `A clean low taper fade balances a ${face} face shape and keeps ${hair} hair on top easy to style.`,
      barber_instructions:
        'Low taper fade starting at the temple. Use a #1 guard at the base, blend up to a #2 around the ears, leave 2-3 inches on top scissor-cut for natural movement.',
      maintenance: maintenance === 'low'
        ? 'Low - barber visit every 4 weeks, light pomade as needed.'
        : 'Medium - barber every 2-3 weeks, light styling cream daily.',
      related_url: 'low-taper-fade',
      image_url: null
    },
    {
      style_name: 'Mid Taper Fade',
      match_score: 88,
      why_it_works:
        `A mid taper draws focus upward and adds dimension that flatters a ${face} face with ${hair} hair.`,
      barber_instructions:
        'Mid taper from the parietal ridge. #1 at the bottom, #2 mid, hand-blended to scissor work above. Top: 1.5-2 inches, point-cut for texture, fringe forward.',
      maintenance: 'Medium - reshape every 3 weeks, matte clay for finish.',
      related_url: 'mid-taper-fade',
      image_url: null
    },
    {
      style_name: 'Blowout Taper',
      match_score: 84,
      why_it_works:
        `A blowout taper adds height and a sharp silhouette that suits ${face} features and works well with ${hair} hair.`,
      barber_instructions:
        'Mid-to-high taper with a defined edge. #0.5 at the base, #2 transitioning into scissor work. Leave 3-4 inches on top, blow-dry up and back, finish with strong-hold pomade.',
      maintenance: 'High - barber every 2 weeks, daily blow-dry and product.',
      related_url: 'blowout-taper',
      image_url: null
    }
  ];
}

export function extractInlineImage(data) {
  const candidates = data && data.candidates;
  if (!Array.isArray(candidates) || candidates.length === 0) return null;
  const parts = candidates[0] && candidates[0].content && candidates[0].content.parts;
  if (!Array.isArray(parts)) return null;
  for (const part of parts) {
    const inline = part && (part.inline_data || part.inlineData);
    if (inline && inline.data) {
      const mime = inline.mime_type || inline.mimeType || 'image/png';
      return `data:${mime};base64,${inline.data}`;
    }
  }
  return null;
}

export function extractBase64(dataUrl) {
  if (!dataUrl) return null;
  const idx = dataUrl.indexOf(',');
  return idx === -1 ? dataUrl : dataUrl.slice(idx + 1);
}

export const IMAGE_MODEL_FALLBACKS = [
  'gemini-2.5-flash-image-preview',
  'gemini-2.5-flash-image',
  'gemini-2.0-flash-preview-image-generation',
  'gemini-2.0-flash-exp-image-generation'
];

export const TEXT_MODEL_FALLBACKS = [
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.5-pro',
  'gemini-flash-latest',
  'gemini-flash-lite-latest',
  'gemini-2.0-flash'
];
