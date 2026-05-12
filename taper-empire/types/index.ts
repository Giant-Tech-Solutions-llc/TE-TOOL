export type FaceShape  = 'round' | 'oval' | 'square' | 'heart' | 'diamond'
export type HairType   = 'straight' | 'wavy' | 'curly' | 'coily'
export type Lifestyle  = 'professional' | 'casual' | 'creative' | 'athletic'
export type AgeRange   = 'teen' | '20s' | '30s' | '40s+'
export type Maintenance = 'low' | 'medium' | 'high'

export interface QuizData {
  faceShape: FaceShape | null
  hairType: HairType | null
  lifestyle: Lifestyle | null
  age: AgeRange | null
  maintenance: Maintenance | null
}

export interface PhotoData extends Partial<QuizData> {
  photo: string
  mimeType: string
}

export type ToolInputType = 'photo' | 'quiz'

export interface ToolInput {
  type: ToolInputType
  data: PhotoData | QuizData
}

export interface Recommendation {
  style_name: string
  match_score: number
  why_it_works: string
  barber_instructions: string
  maintenance: string
  related_url?: string
  image_url?: string | null
}

export interface ValidationError {
  type: 'not_male' | 'unclear_subject'
  message: string
}

export interface RecommendResponse {
  recommendations: Recommendation[]
  source: 'gemini' | 'fallback'
  model?: string
  reason?: string
  validationError?: ValidationError
  errors?: Array<{ model: string; status: number; summary: string }>
}

export interface ImageResponse {
  image_url: string | null
  source: 'gemini' | 'unavailable' | 'no_key'
  model?: string
  reason?: string
  errors?: Array<{ model: string; status: number; summary: string }>
}

export interface FeedbackPayload {
  rating: number
  comment?: string
  flow?: string
  recommendations?: Array<{ style_name: string; match_score: number }>
  page?: string
  referrer?: string
}
