import { Header } from '@/components/landing/Header'
import { Footer } from '@/components/landing/Footer'

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  )
}
