import {
  buildRecommendationPrompt,
  parseModelResponse,
  parseGenderCheck,
  normalizeRecommendations,
  getFallbackRecommendations,
  extractBase64,
  TEXT_MODEL_FALLBACKS,
  RECOMMENDATION_RESPONSE_SCHEMA
} from './_lib/prompts.js';

const VALIDATION_MESSAGES = {
  female: 'Taper Empire is a men\'s barbershop tool, so we can only match male-presenting subjects. Please upload a different photo, or try the quick quiz to get matched without one.',
  unclear: 'We couldn\'t make out a clear face in that photo. Try a sharper headshot taken in good light, or use the quick quiz instead.'
};

function pickArrayLocal(parsed) {
  if (!parsed) return null;
  if (Array.isArray(parsed)) return parsed;
  if (Array.isArray(parsed.recommendations)) return parsed.recommendations;
  if (Array.isArray(parsed.results)) return parsed.results;
  if (Array.isArray(parsed.styles)) return parsed.styles;
  if (Array.isArray(parsed.items)) return parsed.items;
  if (Array.isArray(parsed.data)) return parsed.data;
  return null;
}

const PRIMARY_TEXT_MODEL = process.env.GEMINI_TEXT_MODEL || TEXT_MODEL_FALLBACKS[0];

const TEXT_CHAIN = [PRIMARY_TEXT_MODEL, ...TEXT_MODEL_FALLBACKS]
  .filter((value, index, arr) => value && arr.indexOf(value) === index);

function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string' && req.body.length > 0) {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  return new Promise((resolve) => {
    let chunks = '';
    req.on('data', (c) => { chunks += c; });
    req.on('end', () => {
      try { resolve(JSON.parse(chunks || '{}')); } catch { resolve({}); }
    });
    req.on('error', () => resolve({}));
  });
}

async function callTextModel(model, body, apiKey) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  return fetch(`${endpoint}?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({
      ok: true,
      hasKey: Boolean(process.env.GEMINI_API_KEY),
      model: PRIMARY_TEXT_MODEL
    });
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    res.status(400).json({ error: 'Invalid JSON body' });
    return;
  }

  const inputData = body && body.inputData ? body.inputData : null;
  if (!inputData || typeof inputData !== 'object') {
    res.status(400).json({ error: 'Missing inputData' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(200).json({
      recommendations: getFallbackRecommendations(inputData.data || {}),
      source: 'fallback',
      reason: 'no_server_key'
    });
    return;
  }

  // Build request body once (camelCase as per Gemini REST spec)
  const parts = [{ text: buildRecommendationPrompt(inputData) }];
  if (inputData.type === 'photo' && inputData.data && inputData.data.photo) {
    parts.push({
      inlineData: {
        mimeType: inputData.data.mimeType || 'image/jpeg',
        data: extractBase64(inputData.data.photo)
      }
    });
  }

  const requestBody = {
    contents: [{ parts }],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 2048,
      responseMimeType: 'application/json',
      responseSchema: RECOMMENDATION_RESPONSE_SCHEMA
    }
  };

  const errors = [];
  let quotaHit = false;
  for (const model of TEXT_CHAIN) {
    try {
      const response = await callTextModel(model, requestBody, apiKey);
      if (!response.ok) {
        const errText = await response.text().catch(() => '');
        const summary = `${response.status} ${errText.slice(0, 240)}`.trim();
        console.error(`Gemini text model ${model} -> ${summary}`);
        errors.push({ model, status: response.status, summary });
        if (response.status === 429) quotaHit = true;
        continue;
      }
      const data = await response.json();
      const text =
        data && data.candidates && data.candidates[0] &&
        data.candidates[0].content && data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text;

      const parsed = parseModelResponse(text);
      const genderCheck = parseGenderCheck(parsed);
      const recs = pickArrayLocal(parsed);

      // Photo flow: hard-fail when the gating rule says non-male.
      if (inputData.type === 'photo' && (genderCheck === 'female' || genderCheck === 'unclear')) {
        res.status(200).json({
          recommendations: [],
          source: 'gemini',
          model,
          validationError: {
            type: genderCheck === 'female' ? 'not_male' : 'unclear_subject',
            message: VALIDATION_MESSAGES[genderCheck]
          }
        });
        return;
      }

      if (recs && recs.length > 0) {
        res.status(200).json({
          recommendations: normalizeRecommendations(recs),
          source: 'gemini',
          model
        });
        return;
      }
      const snippet = text ? text.slice(0, 280) : '(empty response)';
      errors.push({ model, status: 200, summary: `no_recommendations_parsed: ${snippet}` });
    } catch (error) {
      console.error(`Gemini text model ${model} threw`, error);
      errors.push({ model, status: 0, summary: String(error && error.message ? error.message : error) });
    }
  }

  res.status(200).json({
    recommendations: getFallbackRecommendations(inputData.data || {}),
    source: 'fallback',
    reason: quotaHit ? 'quota_exceeded' : 'upstream_error',
    errors
  });
}
