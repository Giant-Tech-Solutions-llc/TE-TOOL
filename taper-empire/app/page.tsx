import { Header } from '@/components/landing/Header'
import { Hero } from '@/components/landing/Hero'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { AuthorityContent } from '@/components/landing/AuthorityContent'
import { FAQ } from '@/components/landing/FAQ'
import { FinalCTA } from '@/components/landing/FinalCTA'
import { Footer } from '@/components/landing/Footer'

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
      <main>
        <Hero />
        <HowItWorks />
        <AuthorityContent />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
