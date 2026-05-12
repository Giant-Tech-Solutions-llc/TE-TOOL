'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all
              ${isDragActive ? 'border-accent-hover bg-oat/40' : 'border-border hover:border-accent hover:bg-oat/20'}`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 mx-auto mb-4 text-accent" />
            <h3 className="font-display text-xl font-semibold text-jet-black mb-2">
              {isDragActive ? 'Drop your photo here' : 'Upload your photo'}
            </h3>
            <p className="text-mocha mb-2">Drag and drop, or click to browse</p>
            <p className="text-sm text-taupe">JPG, PNG, or WebP · up to 10 MB</p>
            {error && <p className="text-error text-sm mt-3">{error}</p>}
            <p className="text-sm text-taupe mt-6">
              Never stored · Processed securely · Deleted after analysis
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-oat/40 border border-border rounded-2xl p-6 text-center"
          >
            <div className="relative inline-block mb-5">
              <Image
                src={photo.dataUrl}
                alt="Your upload"
                width={320}
                height={320}
                className="rounded-xl shadow-md object-cover"
                unoptimized
              />
              <button
                type="button"
                onClick={() => { setPhoto(null); setError(null) }}
                aria-label="Remove photo"
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-milk border border-border flex items-center justify-center hover:bg-error hover:text-milk hover:border-error transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-mocha mb-5">
              {originalName} · {(photo.size / 1024).toFixed(0)} KB
              {photo.downscaled && ' · optimized'}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button size="lg" onClick={() => onAnalyze(photo)}>
                Analyze My Photo
              </Button>
              <Button variant="ghost" size="lg" onClick={() => setPhoto(null)}>
                Choose Different
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
