import type { Metadata } from 'next'
import { Header } from '@/components/landing/Header'
import { Footer } from '@/components/landing/Footer'
import { ToolFlow } from '@/components/tool/ToolFlow'

export const metadata: Metadata = {
  title: 'Get Your Taper Match',
  description: 'Upload a photo or take the 5-question quiz to get AI-matched taper recommendations.',
}

export default function ToolPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-[calc(100vh-4rem)]">
        <ToolFlow />
      </main>
      <Footer />
    </>
  )
}
