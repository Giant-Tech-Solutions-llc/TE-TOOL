import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/landing/Header'
import { Footer } from '@/components/landing/Footer'
import { LegalShell } from '@/components/legal/LegalShell'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://taperempire.com'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Taper Empire collects, uses, retains, and protects the data submitted to the grooming intelligence platform — including uploaded photos, quiz inputs, email addresses, and analytics.',
  alternates: { canonical: `${SITE_URL}/privacy` },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <LegalShell
          eyebrow="Legal · Privacy"
          title="Privacy Policy"
          lastUpdated="May 1, 2026"
        >
          <p>
            Taper Empire (&ldquo;<strong>Taper Empire</strong>,&rdquo; &ldquo;<strong>we</strong>,&rdquo;
            &ldquo;<strong>us</strong>,&rdquo; or &ldquo;<strong>our</strong>&rdquo;) operates the
            grooming-intelligence platform available at <Link href="/">taperempire.com</Link> and
            its subdomains. This Privacy Policy explains what information we collect, how we use
            it, who we share it with, and the choices and rights you have over that information.
          </p>
          <p>
            By using the Service you agree to the practices described here. If you do not agree,
            please discontinue use of the Service.
          </p>

          <h2>1. Information we collect</h2>

          <h3>1.1 Information you submit directly</h3>
          <ul>
            <li>
              <strong>Photographs.</strong> When you choose the photo-based analysis, you submit
              an image of your face. The image is transmitted to our recommendation engine and to
              the third-party model providers we use to generate your match.
            </li>
            <li>
              <strong>Quiz responses.</strong> When you choose the quiz-based path you submit
              answers describing your face shape, hair texture, lifestyle, age range, and
              maintenance preference.
            </li>
            <li>
              <strong>Email addresses.</strong> If you ask us to email you your brief or a
              maintenance reminder, we collect the address you provide.
            </li>
            <li>
              <strong>Feedback.</strong> If you submit a rating or written comment after viewing
              your match, we collect the rating, the comment, and the recommendations the
              feedback is attached to.
            </li>
          </ul>

          <h3>1.2 Information collected automatically</h3>
          <ul>
            <li>
              <strong>Technical data.</strong> IP address, browser type and version, operating
              system, device type, referring URL, time-zone, language preference, and
              session-level interaction events.
            </li>
            <li>
              <strong>Local storage.</strong> Your browser persists certain values locally —
              including your saved matches list, a randomly generated referral identifier, and
              authentication state — so the platform can recognize a returning device. These
              values never leave your browser unless you take an explicit action that sends them
              (saving a match server-side, emailing a brief, etc.).
            </li>
            <li>
              <strong>Analytics.</strong> We use first-party analytics to measure aggregate usage
              of the Service. We do not sell analytics data.
            </li>
          </ul>

          <h3>1.3 Information we do not collect</h3>
          <p>
            We do not request, collect, or store government identifiers, payment instruments,
            biometric templates for identification, precise geolocation, or contents of third-party
            accounts. Photographs are processed for the express purpose of generating a
            recommendation and are not used to identify you.
          </p>

          <h2>2. How we use information</h2>
          <ul>
            <li>
              <strong>To produce your recommendation.</strong> Photos and quiz inputs are sent to
              our recommendation engine and language-model providers to generate the taper match.
            </li>
            <li>
              <strong>To operate the Service.</strong> Including authentication, account
              continuity, save/share functionality, and feature delivery.
            </li>
            <li>
              <strong>To send transactional email.</strong> When you explicitly request your brief
              or a maintenance reminder, we use your email address to deliver that message and a
              single follow-up reminder.
            </li>
            <li>
              <strong>To improve the platform.</strong> Aggregate, de-identified usage data
              informs product decisions, model evaluation, and UX changes.
            </li>
            <li>
              <strong>To prevent abuse.</strong> We use technical signals to detect automated
              traffic, fraud, and platform abuse.
            </li>
          </ul>

          <h2>3. Third parties</h2>
          <p>
            We share information only with vendors that help us operate the Service, and only
            for the purposes described above. Current categories include:
          </p>
          <ul>
            <li><strong>Cloud hosting and edge delivery</strong> for serving the site.</li>
            <li>
              <strong>Recommendation and language-model providers</strong> that process your
              photo or quiz inputs to generate your match. These providers operate under
              data-processing agreements that prohibit training on your submitted content unless
              you opt in elsewhere.
            </li>
            <li>
              <strong>Transactional email infrastructure</strong> for delivering briefs and
              reminders when you request them.
            </li>
            <li><strong>Analytics</strong> for aggregate measurement.</li>
          </ul>
          <p>
            We do not sell personal information, and we do not share information for cross-context
            behavioral advertising.
          </p>

          <h2>4. Retention</h2>
          <ul>
            <li>
              <strong>Uploaded photos</strong> are retained only as long as needed to generate
              your match and are then discarded from our processing infrastructure. Cached copies
              may persist briefly with our model providers under their published retention windows.
            </li>
            <li>
              <strong>Email addresses</strong> submitted for transactional reminders are retained
              while the reminder cadence is active and removed after the final reminder unless you
              opt in to additional communication.
            </li>
            <li>
              <strong>Feedback</strong> is retained in aggregated form to inform product
              improvements.
            </li>
            <li>
              <strong>Saved matches</strong> persist on your device in browser local storage and
              can be cleared at any time from the <Link href="/saved">Saved Matches</Link> page.
            </li>
          </ul>

          <h2>5. Your rights</h2>
          <p>
            Subject to applicable law, you have the right to (a) access the personal information
            we hold about you, (b) request correction of inaccurate data, (c) request deletion of
            your information, (d) object to or restrict certain processing, and (e) receive a
            copy of your information in a portable format. Requests can be submitted via the
            contact channel below. We will respond within the period required by applicable law.
          </p>

          <h2>6. Security</h2>
          <p>
            We use industry-standard administrative, technical, and physical safeguards to
            protect the information we hold. All transmission is encrypted in transit via TLS.
            No internet-based service is perfectly secure; we cannot guarantee absolute security
            but commit to maintaining commercially reasonable protections.
          </p>

          <h2>7. Children</h2>
          <p>
            The Service is intended for adult users and is not directed at children under 13. We
            do not knowingly collect personal information from anyone under 13. If you believe a
            child has provided us with information, please contact us so we can remove it.
          </p>

          <h2>8. International users</h2>
          <p>
            The Service is operated from the United States. By using the Service from outside the
            United States you consent to the transfer of your information to, and processing in,
            the United States.
          </p>

          <h2>9. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we will revise the
            &ldquo;Last updated&rdquo; date above. Material changes will be communicated via the
            Service or by email where appropriate. Continued use of the Service after an update
            constitutes acceptance of the revised policy.
          </p>

          <h2>10. Contact</h2>
          <p>
            Questions, requests, or complaints regarding this Privacy Policy can be sent to{' '}
            <a href="mailto:privacy@taperempire.com">privacy@taperempire.com</a>.
          </p>
        </LegalShell>
      </main>
      <Footer />
    </>
  )
}
