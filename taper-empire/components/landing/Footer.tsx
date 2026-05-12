import Link from 'next/link'

const links = [
  { href: '/low-taper-guide',           label: 'Low Taper Guide' },
  { href: '/mid-taper-guide',           label: 'Mid Taper Guide' },
  { href: '/high-taper-guide',          label: 'High Taper Guide' },
  { href: '/taper-vs-fade',             label: 'Taper vs Fade' },
  { href: '/best-taper-for-round-face', label: 'Best Taper for Round Face' },
  { href: '/best-taper-for-curly-hair', label: 'Best Taper for Curly Hair' },
  { href: '/barber-guide-for-tapers',   label: 'Barber Guide' },
]

export function Footer() {
  return (
    <footer className="bg-charcoal text-oat py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <p className="font-display text-lg font-bold tracking-tight text-milk mb-3">TAPER EMPIRE</p>
            <p className="text-sm text-taupe leading-relaxed max-w-xs">
              Decision intelligence for men&rsquo;s taper haircuts. AI-matched recommendations with
              barber-ready instructions.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-milk mb-4">Guides</h4>
            <ul className="space-y-2 text-sm">
              {links.slice(0, 4).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-milk transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-milk mb-4">By Face & Hair</h4>
            <ul className="space-y-2 text-sm">
              {links.slice(4).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-milk transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-mocha pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-taupe">
          <p>© {new Date().getFullYear()} Taper Empire. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-milk transition-colors">Privacy</Link>
            <Link href="/terms"   className="hover:text-milk transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-milk transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
