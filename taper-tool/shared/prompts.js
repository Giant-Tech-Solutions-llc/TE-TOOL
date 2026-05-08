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
  const profile = inputData && inputData.type === 'photo'
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

  return [
    'You are a professional barber consultant. Analyze and recommend 3 taper haircut styles.',
    '',
    'Input Profile:',
    profile,
    '',
    'Return ONLY valid JSON with this schema:',
    '{',
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
    'Return 3 recommendations ranked by match score. Use only the slugs above for related_url.'
  ].join('\n');
}

export function buildEditPrompt(rec) {
  return [
    'Edit this photograph to show the same person with a new haircut.',
    'CRITICAL: keep the person\'s face, skin tone, eyes, eyebrows, mouth, beard,',
    'expression, identity, clothing, lighting, and background EXACTLY the same.',
    `Replace ONLY the hairstyle with: ${rec.style_name}.`,
    `Cut details: ${rec.barber_instructions || ''}`,
    'Realistic, photorealistic, professional barbershop portrait quality,',
    'sharp focus on the hair, natural shadows, no text, no watermark.'
  ].join(' ');
}

export function buildStockPrompt(rec) {
  return [
    `Generate a realistic professional barbershop portrait photograph of a man`,
    `with a ${rec.style_name} haircut.`,
    `Cut details: ${rec.barber_instructions || ''}`,
    'Head-and-shoulders, neutral studio background, soft natural lighting,',
    'photorealistic, high resolution, clean editorial style, no text, no watermark.'
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

export function parseRecommendations(text) {
  if (!text || typeof text !== 'string') return null;
  try {
    const parsed = JSON.parse(text);
    if (parsed && Array.isArray(parsed.recommendations)) return parsed.recommendations;
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        const parsed = JSON.parse(match[0]);
        if (parsed && Array.isArray(parsed.recommendations)) return parsed.recommendations;
      } catch {
        return null;
      }
    }
  }
  return null;
}

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
