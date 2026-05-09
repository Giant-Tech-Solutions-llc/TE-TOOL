import Button from '../components/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

const tocLinks = [
  { id: 'direct-answer', label: 'Direct answer' },
  { id: 'why-taper-choice-matters', label: 'Why taper choice matters' },
  { id: 'face-shape-system', label: 'Face shape matching system' },
  { id: 'hair-type-system', label: 'Hair type recommendation system' },
  { id: 'engine-workflow', label: 'How recommendation engine works' },
  { id: 'style-categories', label: 'Taper style categories' },
  { id: 'comparisons', label: 'Comparison blocks' },
  { id: 'barber-communication', label: 'Barber communication protocol' },
  { id: 'mistakes', label: 'Common taper mistakes' },
  { id: 'maintenance', label: 'Maintenance system' },
  { id: 'faq', label: 'Frequently asked questions' },
  { id: 'internal-links', label: 'Internal link hub' }
];

const faceShapeRows = [
  ['Round', 'Low taper with textured volume', 'Keeps width low on sides and builds vertical balance', 'Ask for soft corners and extra height on top'],
  ['Oval', 'Mid taper with natural side compression', 'Preserves symmetry without over-sharpening', 'Request blend from temple to occipital without hard disconnect'],
  ['Square', 'Low-to-mid taper with controlled graduation', 'Retains jawline strength while reducing helmet bulk', 'Keep corners clean but avoid aggressive skin fade'],
  ['Diamond', 'Mid taper with fuller temple transition', 'Prevents cheekbone overexposure and protects silhouette', 'Tell barber to leave slight temple density'],
  ['Heart', 'Low taper with fringe-compatible top', 'Balances forehead width and narrows lower side profile', 'Keep sideburns soft and avoid high start point']
];

const hairTypeRows = [
  ['Straight hair', 'Low or mid taper with directional texture', 'Can look flat after bulk removal', 'Use matte clay and request point-cut texture'],
  ['Wavy hair', 'Mid taper with layered top', 'Wave pattern can collapse if taper starts too high', 'Keep compression below parietal ridge'],
  ['Curly hair', 'Low taper with curl-preserving perimeter', 'Over-fading removes curl frame and causes shape loss', 'Ask for scissor-over-comb around curl line'],
  ['Coily hair', 'Temple-and-nape taper with shape retention', 'Shrinks fast and exposes scalp contrast quickly', 'Use sponge or twist styling plan between cuts']
];

const faqItems = [
  {
    q: 'What taper haircut is best for a round face?',
    a: 'A low taper with height-focused top styling is usually the best starting point for a round face because it reduces side width while creating vertical structure.'
  },
  {
    q: 'Is taper better than fade for professional settings?',
    a: 'A taper is often better for professional environments because it grows out cleaner and keeps side transitions less aggressive than most skin fades.'
  },
  {
    q: 'How often should a taper haircut be maintained?',
    a: 'Most taper cuts need edge cleanup every 10-14 days and full shape maintenance every 3-4 weeks, depending on hair texture and contrast level.'
  },
  {
    q: 'What should I tell my barber for a low taper?',
    a: 'Ask for low tapering around temples and nape, guard progression details, and clear instructions on how much weight to keep near the parietal ridge.'
  }
];

export default function Hero({ onStart }) {
  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TaperEmpire Recommendation Engine',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web',
    description:
      'AI-assisted taper haircut recommendation engine for matching face shape, hair type, maintenance preference, and barber communication requirements.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    url: 'https://taperempire.com/'
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://taperempire.com/' },
      { '@type': 'ListItem', position: 2, name: 'Taper Haircut Hub', item: 'https://taperempire.com/#direct-answer' }
    ]
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to choose the right taper haircut',
    step: [
      { '@type': 'HowToStep', name: 'Identify face shape', text: 'Map your face to round, oval, square, diamond, or heart structure.' },
      { '@type': 'HowToStep', name: 'Confirm hair texture', text: 'Classify texture as straight, wavy, curly, or coily to avoid mismatch.' },
      { '@type': 'HowToStep', name: 'Choose taper height', text: 'Select low, mid, or high taper based on contrast tolerance and maintenance cycle.' },
      { '@type': 'HowToStep', name: 'Prepare barber instructions', text: 'Bring guard, blend-height, and neckline directions to reduce interpretation error.' }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    }))
  };

  return (
    <article className="tt-fade-in tt-authority-layout">
      <script type="application/ld+json">{JSON.stringify(softwareApplicationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      <aside className="tt-authority-toc" aria-label="Page table of contents">
        <div className="tt-authority-toc-inner">
          <p className="tt-authority-kicker">Semantic Navigation</p>
          <nav>
            {tocLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="tt-authority-toc-link">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      <div className="tt-authority-main">
        <header className="tt-authority-hero">
          <div className="tt-authority-badge">
            <Sparkles size={16} />
            Koray-Style Semantic Authority Hub
          </div>
          <h1>Find the Best Taper Haircut for Your Face Shape, Hair Type, and Maintenance Reality</h1>
          <p>
            TaperEmpire is a decision-intelligence resource for taper haircut selection. This page covers definitions, comparative frameworks, barber communication, and maintenance systems to satisfy informational, comparative, and transactional search intent in one retrievable semantic structure.
          </p>
          <div className="tt-authority-cta-row">
            <Button size="lg" icon={<ArrowRight size={20} />} onClick={onStart}>
              Get My Taper Recommendation
            </Button>
            <p className="tt-authority-trust">Used by men comparing low taper, mid taper, high taper, and fade alternatives before their next barber visit.</p>
          </div>
        </header>

        <section id="direct-answer" className="tt-authority-section">
          <h2>Direct Answer: What Is the Best Taper Haircut?</h2>
          <p>
            The best taper haircut is the one that aligns face geometry, hair texture behavior, contrast tolerance, and maintenance cadence. A recommendation engine should evaluate face shape (round, oval, square, diamond, heart), hair type (straight, wavy, curly, coily), desired taper height, and styling effort to output a barber-ready specification rather than a vague style label.
          </p>
          <div className="tt-authority-checklist">
            <h3>Quick decision checklist</h3>
            <ul>
              <li>Face shape determines side compression tolerance.</li>
              <li>Hair texture determines blend visibility and growth pattern.</li>
              <li>Taper height determines perceived sharpness and upkeep frequency.</li>
              <li>Barber communication quality determines final execution accuracy.</li>
            </ul>
          </div>
        </section>

        <section id="why-taper-choice-matters" className="tt-authority-section">
          <h2>Why Choosing the Right Taper Matters</h2>
          <p>
            Most haircut dissatisfaction is not caused by poor barber skill; it is caused by decision mismatch before the cut starts. Wrong taper height can widen a round face, flatten wavy volume, overexpose scalp contrast in coily textures, and increase maintenance cost. Correct taper selection improves proportion, confidence, and style longevity between appointments.
          </p>
        </section>

        <section id="face-shape-system" className="tt-authority-section">
          <h2>Face Shape Matching System for Taper Haircuts</h2>
          <p>
            This framework maps facial structure to taper strategy so each recommendation is independently quotable for AI systems and directly usable during barber consultation.
          </p>
          <div className="tt-authority-table-wrap">
            <table className="tt-authority-table">
              <thead>
                <tr>
                  <th>Face shape</th>
                  <th>Recommended taper style</th>
                  <th>Why it works</th>
                  <th>Barber instruction anchor</th>
                </tr>
              </thead>
              <tbody>
                {faceShapeRows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell) => (
                      <td key={cell}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="hair-type-system" className="tt-authority-section">
          <h2>Hair Type Recommendation System for Taper Selection</h2>
          <p>
            Hair texture modifies how taper transitions look after one week, two weeks, and one month. Any recommendation that ignores texture-specific growth behavior is incomplete.
          </p>
          <div className="tt-authority-table-wrap">
            <table className="tt-authority-table">
              <thead>
                <tr>
                  <th>Hair type</th>
                  <th>Best taper direction</th>
                  <th>Core risk</th>
                  <th>Execution note</th>
                </tr>
              </thead>
              <tbody>
                {hairTypeRows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell) => (
                      <td key={cell}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="engine-workflow" className="tt-authority-section">
          <h2>How the TaperEmpire Recommendation Engine Works</h2>
          <ol className="tt-authority-ordered">
            <li><strong>Entity capture:</strong> face shape, hair type, scalp contrast preference, lifestyle cadence.</li>
            <li><strong>Constraint scoring:</strong> eliminate taper options that violate proportion or maintenance constraints.</li>
            <li><strong>Comparative reasoning:</strong> generate low vs mid vs high alternatives with tradeoff explanations.</li>
            <li><strong>Output packaging:</strong> produce barber-ready communication and maintenance plan.</li>
          </ol>
        </section>

        <section id="style-categories" className="tt-authority-section">
          <h2>Taper Style Categories</h2>
          <h3>Low taper</h3>
          <p>Best for conservative transitions, professional contexts, and lower maintenance shock.</p>
          <h3>Mid taper</h3>
          <p>Balanced option for sharper profile without full high-contrast exposure.</p>
          <h3>High taper</h3>
          <p>Best for strong contrast preferences and bold edge definition with higher upkeep frequency.</p>
          <h3>Temple taper</h3>
          <p>Focused detail around front perimeter; ideal for subtle shape control with minimal side reduction.</p>
        </section>

        <section id="comparisons" className="tt-authority-section">
          <h2>Structured Comparison Blocks</h2>
          <div className="tt-authority-table-wrap">
            <table className="tt-authority-table">
              <thead>
                <tr>
                  <th>Comparison query</th>
                  <th>Winner for natural grow-out</th>
                  <th>Winner for sharp contrast</th>
                  <th>Use case</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Taper vs fade</td>
                  <td>Taper</td>
                  <td>Fade</td>
                  <td>Taper for longevity, fade for immediate edge sharpness.</td>
                </tr>
                <tr>
                  <td>Low taper vs mid taper</td>
                  <td>Low taper</td>
                  <td>Mid taper</td>
                  <td>Low for subtle polish, mid for visible structure.</td>
                </tr>
                <tr>
                  <td>Burst fade vs classic taper</td>
                  <td>Classic taper</td>
                  <td>Burst fade</td>
                  <td>Burst for style-forward looks, taper for universal compatibility.</td>
                </tr>
                <tr>
                  <td>Taper vs undercut</td>
                  <td>Taper</td>
                  <td>Undercut</td>
                  <td>Undercut for hard disconnect, taper for blended proportion.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="barber-communication" className="tt-authority-section">
          <h2>Barber Instructions and Communication Protocol</h2>
          <p>Use this script to reduce interpretation errors:</p>
          <ul>
            <li>State taper height clearly: low, mid, or high taper start point.</li>
            <li>Specify guard progression and neckline finish preference.</li>
            <li>Define sideburn strategy and temple transition shape.</li>
            <li>Ask for maintenance expectation: when line-up and full reset are needed.</li>
          </ul>
        </section>

        <section id="mistakes" className="tt-authority-section">
          <h2>Common Taper Mistakes That Cause Regret</h2>
          <ul>
            <li>Choosing taper height from trend photos without face-shape filtering.</li>
            <li>Ignoring hair texture shrinkage before selecting transition point.</li>
            <li>Using vague barber language like clean it up or make it short on sides.</li>
            <li>Skipping maintenance planning and blaming the cut after two weeks.</li>
          </ul>
        </section>

        <section id="maintenance" className="tt-authority-section">
          <h2>Maintenance and Styling System</h2>
          <p>
            A taper haircut is a maintenance system, not a one-time event. Define cadence, styling products, and touch-up strategy based on growth speed and texture behavior.
          </p>
          <div className="tt-authority-checklist">
            <h3>Maintenance checklist</h3>
            <ul>
              <li>Day 0-3: lock shape with texture-appropriate product.</li>
              <li>Day 7-14: edge cleanup for nape and temple refinement.</li>
              <li>Day 21-30: full taper refresh for silhouette integrity.</li>
              <li>Track photos by week to calibrate your ideal interval.</li>
            </ul>
          </div>
        </section>

        <section className="tt-authority-section">
          <h2>Social Proof and Decision Confidence</h2>
          <p>
            Thousands of users use TaperEmpire to convert vague haircut ideas into precise, barber-usable taper plans. The strongest outcomes happen when users follow the face-shape framework, comparison logic, and communication checklist together.
          </p>
        </section>

        <section id="faq" className="tt-authority-section">
          <h2>FAQ: Taper Haircut Decisions</h2>
          {faqItems.map((item) => (
            <details key={item.q} className="tt-authority-faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </section>

        <section id="internal-links" className="tt-authority-section">
          <h2>Internal Link Hub for Topical Authority Expansion</h2>
          <p>Explore supporting guides for deeper decision layers:</p>
          <div className="tt-authority-link-grid">
            <a href="/low-taper-guide">Low Taper Guide</a>
            <a href="/mid-taper-guide">Mid Taper Guide</a>
            <a href="/high-taper-guide">High Taper Guide</a>
            <a href="/taper-vs-fade">Taper vs Fade Comparison</a>
            <a href="/best-taper-for-round-face">Best Taper for Round Face</a>
            <a href="/best-taper-for-curly-hair">Best Taper for Curly Hair</a>
            <a href="/barber-guide-for-tapers">Barber Guide for Tapers</a>
            <a href="#direct-answer">Return to Direct Answer Block</a>
          </div>
        </section>

        <section className="tt-authority-section tt-authority-premium">
          <h2>Premium AI Preview CTA</h2>
          <p>
            Use the full TaperEmpire recommendation flow to receive a prioritized taper shortlist, comparison rationale, and barber script tailored to your face shape, texture, and maintenance tolerance.
          </p>
          <Button size="lg" icon={<ArrowRight size={20} />} onClick={onStart}>
            Generate My Full Taper Plan
          </Button>
        </section>
      </div>
    </article>
  );
}
