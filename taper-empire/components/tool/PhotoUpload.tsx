'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { prepareUploadPhoto, type PreparedPhoto } from '@/lib/image'

interface PhotoUploadProps {
  onAnalyze: (photo: PreparedPhoto) => void
}

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
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`relative border bg-milk p-14 lg:p-20 cursor-pointer transition-colors ${
              isDragActive ? 'border-jet-black bg-oat/40' : 'border-jet-black/30 hover:border-jet-black hover:bg-oat/20'
            }`}
          >
            <input {...getInputProps()} />

            {/* Corner brackets — editorial framing */}
            <Bracket pos="tl" />
            <Bracket pos="tr" />
            <Bracket pos="bl" />
            <Bracket pos="br" />

            <div className="text-center">
              <Upload className="w-10 h-10 mx-auto mb-6 text-jet-black" strokeWidth={1.5} />
              <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-mocha mb-3">
                Phase I — Capture
              </p>
              <h3 className="font-display font-extrabold tracking-[-0.02em] leading-tight text-2xl lg:text-3xl mb-4 max-w-[20ch] mx-auto">
                {isDragActive ? 'Drop your photo here' : 'Upload your photo'}
              </h3>
              <p className="text-mocha max-w-md mx-auto leading-[1.7] mb-6">
                We read your facial structure, hair texture, and grooming compatibility to return the
                taper styles most likely to suit you.
              </p>
              <p className="text-xs tracking-[0.18em] uppercase text-mocha">
                JPG · PNG · WebP &nbsp;·&nbsp; up to 10 MB
              </p>
              {error && <p className="text-error text-sm mt-4">{error}</p>}
            </div>

            <p className="absolute bottom-4 left-0 right-0 text-center text-[10px] tracking-[0.22em] uppercase text-mocha">
              Never stored &nbsp;·&nbsp; Processed securely &nbsp;·&nbsp; Deleted after analysis
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-milk border border-jet-black/30 p-6 lg:p-8"
          >
            <div className="grid grid-cols-12 gap-6 lg:gap-8 items-start">
              <div className="col-span-12 sm:col-span-5">
                <div className="relative aspect-square max-w-[300px] mx-auto sm:mx-0">
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
                    className="absolute top-2 right-2 w-9 h-9 bg-milk border border-jet-black/30 grid place-items-center hover:bg-jet-black hover:text-milk transition-colors"
                  >
                    <X className="w-4 h-4" strokeWidth={1.75} />
                  </button>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-7">
                <p className="text-[10px] font-semibold tracking-[0.32em] uppercase text-mocha mb-3">
                  Image received
                </p>
                <h3 className="font-display font-extrabold tracking-[-0.02em] text-2xl lg:text-3xl mb-3 leading-tight">
                  Ready to analyze.
                </h3>
                <p className="text-sm text-mocha mb-6">
                  <span className="font-semibold text-jet-black">{originalName}</span>
                  <span className="mx-2 text-jet-black/30">·</span>
                  {(photo.size / 1024).toFixed(0)} KB
                  {photo.downscaled && <span className="text-mocha"> · optimized</span>}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="ink" size="lg" onClick={() => onAnalyze(photo)}>
                    Begin Analysis →
                  </Button>
                  <Button variant="ghost" size="lg" onClick={() => setPhoto(null)}>
                    Different photo
                  </Button>
                </div>
                <p className="mt-6 text-[10px] tracking-[0.22em] uppercase text-mocha">
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
    tl: 'top-4 left-4 border-t border-l',
    tr: 'top-4 right-4 border-t border-r',
    bl: 'bottom-4 left-4 border-b border-l',
    br: 'bottom-4 right-4 border-b border-r',
  }
  return <div className={`absolute w-5 h-5 border-jet-black ${map[pos]}`} aria-hidden="true" />
}
