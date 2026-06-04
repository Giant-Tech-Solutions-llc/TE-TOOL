import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/landing/Header'
import { Footer } from '@/components/landing/Footer'
import { LegalShell } from '@/components/legal/LegalShell'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://taperempire.com'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms governing use of the Taper Empire platform — eligibility, acceptable use, intellectual property, disclaimers, and dispute resolution.',
  alternates: { canonical: `${SITE_URL}/terms` },
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <LegalShell
          eyebrow="Legal · Terms"
          title="Terms of Service"
          lastUpdated="May 1, 2026"
        >
          <p>
            These Terms of Service (the &ldquo;<strong>Terms</strong>&rdquo;) govern your access
            to and use of the Taper Empire platform, including the website at{' '}
            <Link href="/">taperempire.com</Link>, its subdomains, and the recommendation
            engine offered through it (collectively, the &ldquo;<strong>Service</strong>&rdquo;).
            By accessing or using the Service you agree to be bound by these Terms. If you do not
            agree, do not use the Service.
          </p>

          <h2>1. Eligibility</h2>
          <p>
            You must be at least 13 years old to use the Service. If you are under the age of
            legal majority in your jurisdiction, you may use the Service only with the involvement
            of a parent or legal guardian who agrees to be bound by these Terms on your behalf.
          </p>

          <h2>2. The Service</h2>
          <p>
            Taper Empire provides an AI-assisted grooming-recommendation tool that analyzes
            user-submitted photographs and questionnaire inputs to suggest taper haircut styles,
            associated barber-communication guidance, and maintenance plans. The Service is
            offered for informational and personal use only.
          </p>
          <p>
            We may modify, suspend, or discontinue any feature of the Service at any time without
            liability, including features made available during a beta or preview period.
          </p>

          <h2>3. Your account and access</h2>
          <p>
            Certain features may require authentication. You are responsible for safeguarding any
            credentials associated with your access and for all activity that occurs through your
            session. You agree to notify us promptly of any unauthorized use.
          </p>

          <h2>4. Acceptable use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Submit content depicting another person without their consent.</li>
            <li>
              Submit content that infringes any third party&apos;s intellectual-property,
              privacy, or publicity rights.
            </li>
            <li>
              Use the Service to harass, defame, or harm any individual or group, or to generate
              content that violates the rights of others.
            </li>
            <li>
              Reverse-engineer, decompile, scrape, or otherwise attempt to derive the source code,
              prompts, weights, or training data of the Service except as expressly permitted by
              law.
            </li>
            <li>
              Interfere with or disrupt the integrity or performance of the Service, including
              circumventing rate limits or security controls.
            </li>
            <li>
              Use automated means to access the Service except via documented public APIs and
              within published limits.
            </li>
            <li>
              Resell, sublicense, or commercially exploit the Service or its outputs without our
              written permission.
            </li>
          </ul>

          <h2>5. Your content</h2>
          <p>
            You retain all rights to the content you submit to the Service, including photographs
            and quiz responses (&ldquo;<strong>User Content</strong>&rdquo;). By submitting User
            Content you grant Taper Empire a worldwide, non-exclusive, royalty-free license to
            process the User Content for the purpose of providing the Service to you.
          </p>
          <p>
            You represent and warrant that you own or have all necessary rights to the User
            Content you submit and that your submission and our processing of it will not violate
            the rights of any third party or any law.
          </p>

          <h2>6. Recommendations are not advice</h2>
          <p>
            The Service produces stylistic recommendations based on visual analysis and stated
            preferences. The recommendations are <strong>not</strong> medical, dermatological,
            psychological, or professional advice and should not be treated as such. Final
            decisions about your appearance, your hair, and your interactions with any barber or
            stylist remain yours. You acknowledge that results vary based on individual
            characteristics outside the scope of the analysis.
          </p>

          <h2>7. Intellectual property</h2>
          <p>
            Excluding User Content, all elements of the Service — including software, design,
            text, graphics, logos, taglines, recommendation methodology, and underlying models —
            are owned by Taper Empire or its licensors and are protected by copyright, trademark,
            and other laws. The Taper Empire name, &ldquo;TaperMatch&rdquo;, &ldquo;Face Structure
            Read&rdquo;, &ldquo;Taper Geometry Scored&rdquo;, &ldquo;Profile Generated&rdquo;, and
            associated wordmarks and logos are our trademarks.
          </p>
          <p>
            Subject to your compliance with these Terms we grant you a limited, revocable,
            non-exclusive, non-transferable license to access and use the Service for personal,
            non-commercial purposes.
          </p>

          <h2>8. Third-party services</h2>
          <p>
            The Service relies on third-party providers (including model providers, hosting
            providers, and email infrastructure). Use of those providers is subject to their
            respective terms. We are not responsible for third-party services and disclaim
            liability for their acts or omissions.
          </p>

          <h2>9. Beta features</h2>
          <p>
            We may make experimental features available before general release
            (&ldquo;<strong>Beta Features</strong>&rdquo;). Beta Features are provided
            &ldquo;as is,&rdquo; may change or be removed at any time, and may not function as
            documented. You assume all risk of using Beta Features.
          </p>

          <h2>10. Disclaimers</h2>
          <p>
            THE SERVICE IS PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS
            WITHOUT WARRANTY OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING ANY
            WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT,
            ACCURACY, OR UNINTERRUPTED OPERATION. WE DO NOT WARRANT THAT THE SERVICE WILL MEET
            YOUR REQUIREMENTS, THAT ANY RECOMMENDATION WILL BE SUITABLE FOR YOU, OR THAT THE
            SERVICE WILL BE ERROR-FREE OR FREE OF HARMFUL COMPONENTS.
          </p>

          <h2>11. Limitation of liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT WILL TAPER EMPIRE, ITS AFFILIATES,
            OR THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY
            INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR
            ANY LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR OPPORTUNITY, ARISING OUT OF OR
            RELATING TO YOUR USE OF THE SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY
            OF SUCH DAMAGES. OUR AGGREGATE LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICE WILL
            NOT EXCEED ONE HUNDRED U.S. DOLLARS ($100).
          </p>
          <p>
            Some jurisdictions do not allow the limitation or exclusion of liability for incidental
            or consequential damages. In such jurisdictions, the limitations above apply only to
            the maximum extent permitted by law.
          </p>

          <h2>12. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless Taper Empire and its affiliates from
            any claim, demand, loss, or expense (including reasonable attorneys&apos; fees)
            arising out of (a) your User Content, (b) your use of the Service in violation of
            these Terms, or (c) your violation of any law or the rights of a third party.
          </p>

          <h2>13. Termination</h2>
          <p>
            We may suspend or terminate your access to the Service at any time, with or without
            cause and with or without notice. Upon termination, the provisions of these Terms
            that by their nature should survive (including intellectual-property terms, disclaimers,
            limitations of liability, and indemnification) will continue to apply.
          </p>

          <h2>14. Governing law and disputes</h2>
          <p>
            These Terms are governed by the laws of the State of Delaware, without regard to its
            conflict-of-laws principles. You and Taper Empire agree that any dispute, claim, or
            controversy arising out of or relating to the Service or these Terms will be resolved
            by binding individual arbitration administered by the American Arbitration
            Association under its Consumer Arbitration Rules. You and Taper Empire waive any
            right to participate in a class action. Nothing in this section prevents either party
            from seeking injunctive relief in a court of competent jurisdiction for intellectual
            property infringement or violations of acceptable use.
          </p>

          <h2>15. Changes to these Terms</h2>
          <p>
            We may revise these Terms from time to time. The revised Terms will be effective on
            the date posted unless a later effective date is specified. Continued use of the
            Service after the effective date constitutes acceptance. If you do not agree with the
            revised Terms, you must stop using the Service.
          </p>

          <h2>16. Miscellaneous</h2>
          <p>
            These Terms, together with our <Link href="/privacy">Privacy Policy</Link>, constitute
            the entire agreement between you and Taper Empire concerning the Service and supersede
            any prior agreements on the subject. If any provision is held to be unenforceable, the
            remaining provisions will continue in full force. Our failure to enforce a right or
            provision is not a waiver of that right or provision. You may not assign these Terms
            without our prior written consent; we may assign them freely.
          </p>

          <h2>17. Contact</h2>
          <p>
            For questions about these Terms please contact{' '}
            <a href="mailto:legal@taperempire.com">legal@taperempire.com</a>.
          </p>
        </LegalShell>
      </main>
      <Footer />
    </>
  )
}
