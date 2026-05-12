import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(d)
}

export function truncate(str: string, length: number): string {
  return str.length > length ? `${str.substring(0, length)}…` : str
}

export function slugify(name: string): string {
  return String(name || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function clamp(value: unknown, min: number, max: number): number | null {
  const n = Number(value)
  if (!Number.isFinite(n)) return null
  return Math.max(min, Math.min(max, Math.round(n)))
}

export function cleanString(s: unknown, maxLen = 2000): string {
  if (typeof s !== 'string') return ''
  return s.replace(/[\x00-\x1F\x7F]/g, '').slice(0, maxLen)
}
