const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

const FACE_SHAPES = ['round', 'oval', 'square', 'heart', 'diamond'];
const HAIR_TYPES = ['straight', 'wavy', 'curly', 'coily'];

function buildPrompt(inputData) {
  const d = inputData.data || {};
  const lines = [
    'You are an expert barber and men\'s grooming stylist.',
    'Recommend exactly 3 taper haircuts tailored to the following client profile.',
    '',
    'Client profile:',
    `- Face shape: ${d.faceShape || 'unspecified'}`,
    `- Hair type: ${d.hairType || 'unspecified'}`,
    `- Lifestyle: ${d.lifestyle || 'unspecified'}`,
    `- Age range: ${d.age || 'unspecified'}`,
    `- Maintenance preference: ${d.maintenance || 'unspecified'}`,
    '',
    'For each recommendation include: style_name (string), match_score (integer 70-99),',
    'why_it_works (1-2 sentences), barber_instructions (specific cut directions including',
    'guard sizes and length on top), maintenance (frequency and at-home routine).',
    '',
    'Respond ONLY with valid JSON in this exact shape:',
    '{ "recommendations": [ { "style_name": "...", "match_score": 0,',
    '"why_it_works": "...", "barber_instructions": "...", "maintenance": "..." } ] }'
  ];
  return lines.join('\n');
}

function buildPhotoPrompt() {
  return [
    'You are an expert barber and men\'s grooming stylist.',
    'Analyze the attached photo to estimate the client\'s face shape and hair type,',
    'then recommend exactly 3 taper haircuts tailored to those features.',
    '',
    'For each recommendation include: style_name, match_score (integer 70-99),',
    'why_it_works, barber_instructions (with guard sizes and length on top),',
    'and maintenance.',
    '',
    'Respond ONLY with valid JSON:',
    '{ "recommendations": [ { "style_name": "...", "match_score": 0,',
    '"why_it_works": "...", "barber_instructions": "...", "maintenance": "..." } ] }'
  ].join('\n');
}

function extractBase64(dataUrl) {
  if (!dataUrl) return null;
  const idx = dataUrl.indexOf(',');
  return idx === -1 ? dataUrl : dataUrl.slice(idx + 1);
}

function buildBody(inputData) {
  if (inputData.type === 'photo' && inputData.data && inputData.data.photo) {
    return {
      contents: [{
        parts: [
          { text: buildPhotoPrompt() },
          {
            inline_data: {
              mime_type: inputData.data.mimeType || 'image/jpeg',
              data: extractBase64(inputData.data.photo)
            }
          }
        ]
      }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 2048,
        responseMimeType: 'application/json'
      }
    };
  }
  return {
    contents: [{ parts: [{ text: buildPrompt(inputData) }] }],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 2048,
      responseMimeType: 'application/json'
    }
  };
}

function parseRecommendations(text) {
  if (!text || typeof text !== 'string') return null;
  try {
    const parsed = JSON.parse(text);
    if (parsed && Array.isArray(parsed.recommendations)) {
      return parsed.recommendations;
    }
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        const parsed = JSON.parse(match[0]);
        if (parsed && Array.isArray(parsed.recommendations)) {
          return parsed.recommendations;
        }
      } catch {
        return null;
      }
    }
  }
  return null;
}

function normalize(recs) {
  if (!Array.isArray(recs)) return [];
  return recs.slice(0, 3).map((r) => ({
    style_name: String(r.style_name || 'Taper Style'),
    match_score: clampScore(r.match_score),
    why_it_works: String(r.why_it_works || ''),
    barber_instructions: String(r.barber_instructions || ''),
    maintenance: String(r.maintenance || '')
  }));
}

function clampScore(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 85;
  return Math.max(70, Math.min(99, Math.round(n)));
}

export async function getRecommendations(inputData) {
  if (!API_KEY) {
    return getFallbackRecommendations(inputData.data || {});
  }

  try {
    const response = await fetch(`${ENDPOINT}?key=${encodeURIComponent(API_KEY)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildBody(inputData))
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const text =
      data &&
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0] &&
      data.candidates[0].content.parts[0].text;

    const recs = parseRecommendations(text);
    if (recs && recs.length > 0) {
      return normalize(recs);
    }
    return getFallbackRecommendations(inputData.data || {});
  } catch (error) {
    console.error('API Error:', error);
    return getFallbackRecommendations(inputData.data || {});
  }
}

function getFallbackRecommendations(data) {
  const face = FACE_SHAPES.includes(data.faceShape) ? data.faceShape : 'oval';
  const hair = HAIR_TYPES.includes(data.hairType) ? data.hairType : 'straight';
  const maintenance = data.maintenance || 'medium';

  const catalog = [
    {
      style_name: 'Low Taper Fade',
      match_score: 92,
      why_it_works:
        `A clean low taper fade balances a ${face} face shape and keeps ${hair} hair on top easy to style.`,
      barber_instructions:
        'Low taper fade starting at the temple. Use a #1 guard at the base, blend up to a #2 around the ears, leave 2-3 inches on top scissor-cut for natural movement.',
      maintenance: maintenance === 'low'
        ? 'Low - barber visit every 4 weeks, light pomade as needed.'
        : 'Medium - barber every 2-3 weeks, light styling cream daily.'
    },
    {
      style_name: 'Mid Taper with Textured Crop',
      match_score: 88,
      why_it_works:
        `A mid taper draws focus upward and a textured crop adds dimension that flatters a ${face} face with ${hair} hair.`,
      barber_instructions:
        'Mid taper from the parietal ridge. #1 at the bottom, #2 mid, hand-blended to scissor work above. Top: 1.5-2 inches, point-cut for texture, fringe forward.',
      maintenance: 'Medium - reshape every 3 weeks, matte clay for finish.'
    },
    {
      style_name: 'High Taper Pompadour',
      match_score: 84,
      why_it_works:
        `A high taper combined with a pompadour adds height and a sharp silhouette that suits ${face} features and works well with ${hair} hair.`,
      barber_instructions:
        'High taper with a defined edge above the temples. #0.5 at the base, #2 transitioning into scissor work. Leave 3-4 inches on top, blow-dry back and up, finish with strong-hold pomade.',
      maintenance: 'High - barber every 2 weeks, daily blow-dry and product.'
    }
  ];

  return catalog;
}
