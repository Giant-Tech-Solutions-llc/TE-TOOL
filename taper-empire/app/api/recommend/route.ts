import { NextRequest, NextResponse } from 'next/server'
import {
  buildRecommendationPrompt,
  parseModelResponse,
  parseGenderCheck,
  normalizeRecommendations,
  getFallbackRecommendations,
  extractBase64,
  TEXT_MODEL_FALLBACKS,
  RECOMMENDATION_RESPONSE_SCHEMA,
} from '@/lib/gemini/prompts'

export const runtime = 'nodejs'
export const maxDuration = 60

const VALIDATION_MESSAGES = {
  female:
    "Taper Empire is a men's barbershop tool, so we can only match male-presenting subjects. Please upload a different photo, or try the quick quiz to get matched without one.",
  unclear:
    "We couldn't make out a clear face in that photo. Try a sharper headshot taken in good light, or use the quick quiz instead.",
} as const

const PRIMARY_TEXT_MODEL = process.env.GEMINI_TEXT_MODEL || TEXT_MODEL_FALLBACKS[0]
const TEXT_CHAIN = [PRIMARY_TEXT_MODEL, ...TEXT_MODEL_FALLBACKS].filter(
  (value, index, arr) => value && arr.indexOf(value) === index
)

function pickArrayLocal(parsed: any): any[] | null {
  if (!parsed) return null
  if (Array.isArray(parsed)) return parsed
  for (const k of ['recommendations', 'results', 'styles', 'items', 'data']) {
    if (Array.isArray(parsed[k])) return parsed[k]
  }
  return null
}

async function callTextModel(model: string, body: any, apiKey: string) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`
  return fetch(`${endpoint}?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    hasKey: Boolean(process.env.GEMINI_API_KEY),
    model: PRIMARY_TEXT_MODEL,
  })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 })
}

export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const inputData = body?.inputData
  if (!inputData || typeof inputData !== 'object') {
    return NextResponse.json({ error: 'Missing inputData' }, { status: 400 })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json({
      recommendations: getFallbackRecommendations(inputData.data || {}),
      source: 'fallback',
      reason: 'no_server_key',
    })
  }

  const parts: any[] = [{ text: buildRecommendationPrompt(inputData) }]
  if (inputData.type === 'photo' && inputData.data?.photo) {
    parts.push({
      inlineData: {
        mimeType: inputData.data.mimeType || 'image/jpeg',
        data: extractBase64(inputData.data.photo),
      },
    })
  }

  const requestBody = {
    contents: [{ parts }],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 2048,
      responseMimeType: 'application/json',
      responseSchema: RECOMMENDATION_RESPONSE_SCHEMA,
    },
  }

  const errors: Array<{ model: string; status: number; summary: string }> = []
  let quotaHit = false

  for (const model of TEXT_CHAIN) {
    try {
      const response = await callTextModel(model, requestBody, apiKey)
      if (!response.ok) {
        const errText = await response.text().catch(() => '')
        const summary = `${response.status} ${errText.slice(0, 240)}`.trim()
        console.error(`Gemini text ${model} -> ${summary}`)
        errors.push({ model, status: response.status, summary })
        if (response.status === 429) quotaHit = true
        continue
      }
      const data = await response.json()
      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || null

      const parsed = parseModelResponse(text)
      const genderCheck = parseGenderCheck(parsed)
      const recs = pickArrayLocal(parsed)

      if (inputData.type === 'photo' && (genderCheck === 'female' || genderCheck === 'unclear')) {
        return NextResponse.json({
          recommendations: [],
          source: 'gemini',
          model,
          validationError: {
            type: genderCheck === 'female' ? 'not_male' : 'unclear_subject',
            message: VALIDATION_MESSAGES[genderCheck as 'female' | 'unclear'],
          },
        })
      }

      if (recs && recs.length > 0) {
        return NextResponse.json({
          recommendations: normalizeRecommendations(recs),
          source: 'gemini',
          model,
        })
      }
      const snippet = text ? text.slice(0, 280) : '(empty response)'
      errors.push({ model, status: 200, summary: `no_recommendations_parsed: ${snippet}` })
    } catch (error: any) {
      console.error(`Gemini text ${model} threw`, error)
      errors.push({ model, status: 0, summary: String(error?.message || error) })
    }
  }

  return NextResponse.json({
    recommendations: getFallbackRecommendations(inputData.data || {}),
    source: 'fallback',
    reason: quotaHit ? 'quota_exceeded' : 'upstream_error',
    errors,
  })
}
