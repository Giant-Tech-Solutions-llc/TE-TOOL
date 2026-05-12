'use client'

import { ScrollReveal } from '@/components/shared/ScrollReveal'

const faceShapeRows = [
  ['Round',   'Low taper with textured volume',           'Keeps width low on sides and builds vertical balance',     'Ask for soft corners and extra height on top'],
  ['Oval',    'Mid taper with natural side compression',  'Preserves symmetry without over-sharpening',               'Request blend from temple to occipital without hard disconnect'],
  ['Square',  'Low-to-mid taper with controlled graduation','Retains jawline strength while reducing helmet bulk',    'Keep corners clean but avoid aggressive skin fade'],
  ['Diamond', 'Mid taper with fuller temple transition',  'Prevents cheekbone overexposure and protects silhouette',  'Tell barber to leave slight temple density'],
  ['Heart',   'Low taper with fringe-compatible top',     'Balances forehead width and narrows lower side profile',   'Keep sideburns soft and avoid high start point'],
]

const hairTypeRows = [
  ['Straight', 'Low or mid taper with directional texture',     'Can look flat after bulk removal',                'Use matte clay and request point-cut texture'],
  ['Wavy',     'Mid taper with layered top',                    'Wave pattern can collapse if taper starts too high','Keep compression below parietal ridge'],
  ['Curly',    'Low taper with curl-preserving perimeter',      'Over-fading removes curl frame and causes shape loss','Ask for scissor-over-comb around curl line'],
  ['Coily',    'Temple-and-nape taper with shape retention',    'Shrinks fast and exposes scalp contrast quickly', 'Use sponge or twist styling plan between cuts'],
]

const compareRows = [
  ['Taper vs fade',            'Taper',          'Fade',         'Taper for longevity, fade for immediate edge sharpness.'],
  ['Low taper vs mid taper',   'Low taper',      'Mid taper',    'Low for subtle polish, mid for visible structure.'],
  ['Burst fade vs classic taper','Classic taper','Burst fade',   'Burst for style-forward looks, taper for universal compatibility.'],
  ['Taper vs undercut',        'Taper',          'Undercut',     'Undercut for hard disconnect, taper for blended proportion.'],
]

export function AuthorityContent() {
  return (
    <section id="authority" className="py-20 lg:py-28 bg-milk">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* Direct Answer block */}
        <ScrollReveal>
          <div className="bg-oat/40 border border-border rounded-3xl p-8 lg:p-12">
            <p className="text-sm font-semibold tracking-widest text-accent uppercase mb-3">Direct Answer</p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-jet-black mb-4">
              What is the best taper haircut?
            </h2>
            <p className="text-lg text-mocha leading-relaxed max-w-3xl mb-6">
              The best taper haircut is the one that aligns face geometry, hair texture behavior, contrast tolerance, and
              maintenance cadence. A recommendation engine should evaluate face shape, hair type, desired taper height,
              and styling effort to output a barber-ready specification rather than a vague style label.
            </p>
            <div className="bg-milk rounded-xl p-6 border border-border">
              <h3 className="font-display text-lg font-semibold mb-3">Quick decision checklist</h3>
              <ul className="space-y-2 text-mocha">
                <li>• Face shape determines side compression tolerance.</li>
                <li>• Hair texture determines blend visibility and growth pattern.</li>
                <li>• Taper height determines perceived sharpness and upkeep frequency.</li>
                <li>• Barber communication quality determines final execution accuracy.</li>
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* Face shape matching */}
        <ScrollReveal>
          <h2 id="face-shape" className="font-display text-3xl sm:text-4xl font-extrabold text-jet-black mb-3 tracking-tight">
            Face shape matching system
          </h2>
          <p className="text-mocha mb-8 max-w-3xl">
            Maps facial structure to taper strategy so every recommendation is independently quotable for AI systems
            and directly usable during your barber consultation.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-border bg-milk">
            <table className="w-full text-left min-w-[760px]">
              <thead className="bg-oat/60">
                <tr>
                  <th className="p-4 font-semibold">Face shape</th>
                  <th className="p-4 font-semibold">Recommended taper</th>
                  <th className="p-4 font-semibold">Why it works</th>
                  <th className="p-4 font-semibold">Barber anchor</th>
                </tr>
              </thead>
              <tbody>
                {faceShapeRows.map((row) => (
                  <tr key={row[0]} className="border-t border-border">
                    {row.map((cell, i) => (
                      <td key={i} className={`p-4 align-top ${i === 0 ? 'font-semibold text-jet-black' : 'text-mocha'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        {/* Hair type system */}
        <ScrollReveal>
          <h2 id="hair-type" className="font-display text-3xl sm:text-4xl font-extrabold text-jet-black mb-3 tracking-tight">
            Hair texture recommendation system
          </h2>
          <p className="text-mocha mb-8 max-w-3xl">
            Hair texture modifies how taper transitions look after one week, two weeks, and one month. Any recommendation
            that ignores texture-specific growth behavior is incomplete.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-border bg-milk">
            <table className="w-full text-left min-w-[760px]">
              <thead className="bg-oat/60">
                <tr>
                  <th className="p-4 font-semibold">Hair type</th>
                  <th className="p-4 font-semibold">Best taper direction</th>
                  <th className="p-4 font-semibold">Core risk</th>
                  <th className="p-4 font-semibold">Execution note</th>
                </tr>
              </thead>
              <tbody>
                {hairTypeRows.map((row) => (
                  <tr key={row[0]} className="border-t border-border">
                    {row.map((cell, i) => (
                      <td key={i} className={`p-4 align-top ${i === 0 ? 'font-semibold text-jet-black' : 'text-mocha'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        {/* Comparisons */}
        <ScrollReveal>
          <h2 id="comparisons" className="font-display text-3xl sm:text-4xl font-extrabold text-jet-black mb-3 tracking-tight">
            Structured comparison blocks
          </h2>
          <p className="text-mocha mb-8 max-w-3xl">
            Side-by-side decision frames that answer the actual queries men type before booking a cut.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-border bg-milk">
            <table className="w-full text-left min-w-[720px]">
              <thead className="bg-oat/60">
                <tr>
                  <th className="p-4 font-semibold">Comparison</th>
                  <th className="p-4 font-semibold">Natural grow-out</th>
                  <th className="p-4 font-semibold">Sharp contrast</th>
                  <th className="p-4 font-semibold">Use case</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row[0]} className="border-t border-border">
                    {row.map((cell, i) => (
                      <td key={i} className={`p-4 align-top ${i === 0 ? 'font-semibold text-jet-black' : 'text-mocha'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        {/* Maintenance system */}
        <ScrollReveal>
          <h2 id="maintenance" className="font-display text-3xl sm:text-4xl font-extrabold text-jet-black mb-3 tracking-tight">
            Maintenance & styling system
          </h2>
          <p className="text-mocha mb-6 max-w-3xl">
            A taper haircut is a maintenance system, not a one-time event. Define cadence, styling products, and
            touch-up strategy based on growth speed and texture behavior.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { range: 'Day 0–3',  text: 'Lock shape with texture-appropriate product.' },
              { range: 'Day 7–14', text: 'Edge cleanup for nape and temple refinement.' },
              { range: 'Day 21–30',text: 'Full taper refresh for silhouette integrity.' },
            ].map((b) => (
              <div key={b.range} className="bg-oat/40 border border-border rounded-2xl p-6">
                <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">{b.range}</p>
                <p className="text-mocha">{b.text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
