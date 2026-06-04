import type { Metadata } from 'next'
import { Header } from '@/components/landing/Header'
import { Footer } from '@/components/landing/Footer'
import { SavedMatches } from '@/components/tool/SavedMatches'

export const metadata: Metadata = {
  title: 'Saved Matches',
  description: 'Your saved Taper Empire recommendations — pull up the brief, re-open the share link, or jump back into the tool for a fresh read.',
  robots: { index: false, follow: false },
}

export default function SavedPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <SavedMatches />
      </main>
      <Footer />
    </>
  )
}
