import { create } from 'zustand'
import type { Recommendation, ToolInput } from '@/types'

type Step = 'input' | 'loading' | 'results'

interface ToolState {
  step: Step
  inputData: ToolInput | null
  recommendations: Recommendation[]
  validationError: string | null
  /** Phase 07.5 — hard auth gate flag. Results are locked when false. */
  authenticated: boolean
  diagnostics: {
    proxy?: 'no-proxy' | 'server-no-key' | 'ok'
    textSource?: string
    imageSource?: 'gemini-all' | 'gemini-partial' | 'illustration'
    textReason?: string
    imageReason?: string
    errors?: Array<{ model: string; status: number; summary: string }>
  } | null
  setStep: (s: Step) => void
  submit: (input: ToolInput) => void
  success: (recs: Recommendation[], diagnostics?: any) => void
  setRecommendation: (idx: number, patch: Partial<Recommendation>) => void
  setAuthenticated: (b: boolean) => void
  fail: (msg: string) => void
  validation: (msg: string) => void
  reset: () => void
}

export const useToolStore = create<ToolState>((set) => ({
  step: 'input',
  inputData: null,
  recommendations: [],
  validationError: null,
  authenticated: false,
  diagnostics: null,
  setStep: (step) => set({ step }),
  submit: (inputData) => set({ step: 'loading', inputData, validationError: null }),
  success: (recommendations, diagnostics = null) =>
    set({ step: 'results', recommendations, diagnostics }),
  setRecommendation: (idx, patch) =>
    set((state) => {
      const next = [...state.recommendations]
      if (next[idx]) next[idx] = { ...next[idx], ...patch }
      return { recommendations: next }
    }),
  setAuthenticated: (b) => set({ authenticated: b }),
  fail: (msg) => set({ step: 'input', validationError: msg }),
  validation: (msg) => set({ step: 'input', validationError: msg }),
  reset: () =>
    set({
      step: 'input', inputData: null, recommendations: [],
      validationError: null, diagnostics: null,
      /* keep authenticated — session-level, not per-attempt */
    }),
}))
