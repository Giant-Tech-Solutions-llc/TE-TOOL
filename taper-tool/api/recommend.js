import {
  buildRecommendationPrompt,
  parseRecommendations,
  normalizeRecommendations,
  getFallbackRecommendations,
  extractBase64
} from '../shared/prompts.js';

const TEXT_MODEL = process.env.GEMINI_TEXT_MODEL || 'gemini-2.5-flash';

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

export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({
      ok: true,
      hasKey: Boolean(process.env.GEMINI_API_KEY),
      model: TEXT_MODEL
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
      source: 'fallback'
    });
    return;
  }

  const parts = [{ text: buildRecommendationPrompt(inputData) }];
  if (inputData.type === 'photo' && inputData.data && inputData.data.photo) {
    parts.push({
      inline_data: {
        mime_type: inputData.data.mimeType || 'image/jpeg',
        data: extractBase64(inputData.data.photo)
      }
    });
  }

  const requestBody = {
    contents: [{ parts }],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 2048,
      responseMimeType: 'application/json'
    }
  };

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${TEXT_MODEL}:generateContent`;

  try {
    const response = await fetch(`${endpoint}?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      console.error('Gemini text API error', response.status, errText.slice(0, 500));
      res.status(200).json({
        recommendations: getFallbackRecommendations(inputData.data || {}),
        source: 'fallback',
        error: `Upstream ${response.status}`
      });
      return;
    }

    const data = await response.json();
    const text =
      data && data.candidates && data.candidates[0] &&
      data.candidates[0].content && data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text;

    const recs = parseRecommendations(text);
    if (recs && recs.length > 0) {
      res.status(200).json({
        recommendations: normalizeRecommendations(recs),
        source: 'gemini'
      });
      return;
    }

    res.status(200).json({
      recommendations: getFallbackRecommendations(inputData.data || {}),
      source: 'fallback'
    });
  } catch (error) {
    console.error('recommend handler error', error);
    res.status(200).json({
      recommendations: getFallbackRecommendations(inputData.data || {}),
      source: 'fallback',
      error: 'handler_exception'
    });
  }
}
