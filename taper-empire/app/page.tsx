import dynamic from 'next/dynamic'
import { Header } from '@/components/landing/Header'
import { Hero } from '@/components/landing/Hero'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Footer } from '@/components/landing/Footer'

/**
 * Below-the-fold sections — code-split out of the initial bundle so the
 * Hero + HowItWorks columns ship first. Each section still renders during
 * SSR (ssr: true is the dynamic() default in Next 14 server components),
 * but its client JS is fetched separately as the page scrolls in.
 */
const TaperHeightStudy = dynamic(
  () => import('@/components/landing/TaperHeightStudy').then((m) => m.TaperHeightStudy),
)
const RealMatchExamples = dynamic(
  () => import('@/components/landing/RealMatchExamples').then((m) => m.RealMatchExamples),
)
const RealResults = dynamic(
  () => import('@/components/landing/RealResults').then((m) => m.RealResults),
)
const BarberBriefShowcase = dynamic(
  () => import('@/components/landing/BarberBriefShowcase').then((m) => m.BarberBriefShowcase),
)
const AuthorityContent = dynamic(
  () => import('@/components/landing/AuthorityContent').then((m) => m.AuthorityContent),
)
const FAQ = dynamic(() => import('@/components/landing/FAQ').then((m) => m.FAQ))
const FinalCTA = dynamic(
  () => import('@/components/landing/FinalCTA').then((m) => m.FinalCTA),
)

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://taperempire.com'

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Taper Empire Recommendation Engine',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'Web',
  description:
    'AI-assisted taper haircut recommendation engine for matching face shape, hair type, maintenance preference, and barber communication requirements.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: SITE_URL,
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to choose the right taper haircut',
  step: [
    { '@type': 'HowToStep', name: 'Identify face shape', text: 'Map your face to round, oval, square, diamond, or heart structure.' },
    { '@type': 'HowToStep', name: 'Confirm hair texture', text: 'Classify texture as straight, wavy, curly, or coily to avoid mismatch.' },
    { '@type': 'HowToStep', name: 'Choose taper height', text: 'Select low, mid, or high taper based on contrast tolerance and maintenance cycle.' },
    { '@type': 'HowToStep', name: 'Prepare barber instructions', text: 'Bring guard, blend-height, and neckline directions to reduce interpretation error.' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What taper haircut is best for a round face?',
      acceptedAnswer: { '@type': 'Answer', text: 'A low taper with height-focused top styling is usually the best starting point for a round face because it reduces side width while creating vertical structure.' } },
    { '@type': 'Question', name: 'Is a taper better than a fade for professional settings?',
      acceptedAnswer: { '@type': 'Answer', text: 'A taper is often better for professional environments because it grows out cleaner and keeps side transitions less aggressive than most skin fades.' } },
    { '@type': 'Question', name: 'How often should a taper haircut be maintained?',
      acceptedAnswer: { '@type': 'Answer', text: 'Most taper cuts need edge cleanup every 10–14 days and full shape maintenance every 3–4 weeks, depending on hair texture and contrast level.' } },
    { '@type': 'Question', name: 'What should I tell my barber for a low taper?',
      acceptedAnswer: { '@type': 'Answer', text: 'Ask for low tapering around temples and nape, guard progression details, and clear instructions on how much weight to keep near the parietal ridge.' } },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL }],
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header />
      <main id="main-content">
        <Hero />
        <HowItWorks />
        <RealMatchExamples />
        <RealResults />
        <TaperHeightStudy />
        <BarberBriefShowcase />
        <AuthorityContent />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
