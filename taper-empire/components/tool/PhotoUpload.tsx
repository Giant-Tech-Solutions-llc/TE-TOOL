'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { prepareUploadPhoto, type PreparedPhoto } from '@/lib/image'

interface PhotoUploadProps { onAnalyze: (photo: PreparedPhoto) => void }

const MAX_PHOTO_BYTES = 10 * 1024 * 1024

export function PhotoUpload({ onAnalyze }: PhotoUploadProps) {
  const [photo, setPhoto] = useState<PreparedPhoto | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [originalName, setOriginalName] = useState('')

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError(null)
    const file = acceptedFiles[0]
    if (!file) return
    if (file.size > MAX_PHOTO_BYTES) { setError('Image must be under 10 MB.'); return }
    try {
      const prepared = await prepareUploadPhoto(file)
      setPhoto(prepared)
      setOriginalName(file.name)
    } catch {
      setError('Could not read this file.')
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 1,
    maxSize: MAX_PHOTO_BYTES,
  })

  return (
    <div>
      <AnimatePresence mode="wait">
        {!photo ? (
          <motion.div
            key="dropzone"
            {...getRootProps() as any}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`relative bg-surface/60 p-12 sm:p-16 lg:p-24 cursor-pointer transition-all duration-300 rounded-3xl border border-line ${
              isDragActive ? 'bg-surface2 border-gold/60 scale-[1.005]' : 'hover:bg-surface hover:border-soft/20'
            }`}
          >
            <input {...getInputProps()} />

            <Bracket pos="tl" />
            <Bracket pos="tr" />
            <Bracket pos="bl" />
            <Bracket pos="br" />

            <div className="text-center">
              <Upload className="w-12 h-12 mx-auto mb-8 text-gold" strokeWidth={1.25} />
              <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-gold mb-5 flex items-center justify-center gap-4">
                <span aria-hidden="true" className="block h-px w-12 bg-gold/70" />
                Phase I — Capture
              </p>
              <h3 className="font-display font-extrabold tracking-[-0.025em] leading-[0.95] text-3xl lg:text-5xl mb-6 max-w-[20ch] mx-auto">
                {isDragActive ? 'Drop your photo here.' : 'Upload your photo.'}
              </h3>
              <p className="text-soft/65 max-w-md mx-auto leading-[1.75] mb-8">
                We read your facial structure, hair texture, and grooming compatibility to
                return the taper styles most likely to suit you.
              </p>
              <p className="text-[10px] tracking-[0.32em] uppercase text-mute">
                JPG · PNG · WebP &nbsp;·&nbsp; up to 10 MB
              </p>
              {error && <p className="text-error text-sm mt-5">{error}</p>}
            </div>

            <p className="absolute bottom-6 left-0 right-0 text-center text-[10px] tracking-[0.32em] uppercase text-mute">
              Never stored &nbsp;·&nbsp; Processed securely &nbsp;·&nbsp; Deleted after analysis
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-surface/60 p-6 sm:p-8 lg:p-10 rounded-3xl border border-line"
          >
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="col-span-12 sm:col-span-5">
                <div className="relative aspect-square max-w-[320px] mx-auto sm:mx-0 rounded-2xl overflow-hidden ring-1 ring-line">
                  <Image
                    src={photo.dataUrl}
                    alt="Your upload"
                    fill
                    sizes="(max-width: 640px) 100vw, 40vw"
                    className="object-cover"
                    unoptimized
                  />
                  <button
                    type="button"
                    onClick={() => { setPhoto(null); setError(null) }}
                    aria-label="Remove photo"
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-ink/80 backdrop-blur-sm border border-line grid place-items-center text-soft hover:bg-soft hover:text-ink hover:border-soft transition-all duration-300 hover:scale-105"
                  >
                    <X className="w-4 h-4" strokeWidth={1.75} />
                  </button>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-7">
                <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-gold mb-4">
                  Image received
                </p>
                <h3 className="font-display font-extrabold tracking-[-0.025em] text-3xl lg:text-4xl mb-4 leading-tight">
                  Ready to analyze.
                </h3>
                <p className="text-sm text-soft/65 mb-8">
                  <span className="font-semibold text-soft">{originalName}</span>
                  <span className="mx-2 text-mute">·</span>
                  {(photo.size / 1024).toFixed(0)} KB
                  {photo.downscaled && <span className="text-mute"> · optimized</span>}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="cream" size="lg" shape="pill" onClick={() => onAnalyze(photo)}>
                    Begin the analysis
                    <span aria-hidden="true">→</span>
                  </Button>
                  <Button variant="outline" size="lg" shape="pill" onClick={() => setPhoto(null)}>
                    Different photo
                  </Button>
                </div>
                <p className="mt-8 text-[10px] tracking-[0.32em] uppercase text-mute">
                  Never stored &nbsp;·&nbsp; Deleted after analysis
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Bracket({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const map = {
    tl: 'top-4 left-4 border-t border-l rounded-tl-xl',
    tr: 'top-4 right-4 border-t border-r rounded-tr-xl',
    bl: 'bottom-4 left-4 border-b border-l rounded-bl-xl',
    br: 'bottom-4 right-4 border-b border-r rounded-br-xl',
  }
  return <div className={`absolute w-6 h-6 border-gold/60 ${map[pos]}`} aria-hidden="true" />
}
