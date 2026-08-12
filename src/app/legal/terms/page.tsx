// TODO(legal-review): drafted from the actual app data model, iOS permission
// strings, and brain-wiki disclosure rules (see the ticket / PR body for the
// exact sources cited) — not reviewed by a lawyer. Get counsel to review
// this before or shortly after launch, especially "Governing law" (Taiwan,
// chosen because Reserve is Taipei-based, not confirmed with counsel) and
// the account-deletion turnaround commitment in the Privacy Policy.
import type { Metadata } from "next";
import Link from "next/link";
import { AppleNav, ArticleMeta, Footer, Page, Section, apple } from "@/components/apple/kit";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern using Limere and the rest of the Reserve site.",
};

/**
 * Legal page in the Apple grammar, reusing the research-essay shell (Page →
 * AppleNav → centered title/standfirst → .article long-form column →
 * Footer). Unlike the essays, this content uses headings and a list — legal
 * text is read by section, not start to finish, and apple.module.css already
 * styles .article h2/ul for exactly this case.
 */
export default function TermsPage() {
  return (
    <Page>
      <AppleNav />

      <Section center>
        <h1 className={apple.hero}>Terms of Service</h1>
        <p className={apple.sub}>
          The terms that govern using Limere and the rest of the Reserve site.
        </p>
        <ArticleMeta>Effective 7 August 2026</ArticleMeta>
      </Section>

      <Section>
        <div className={apple.article}>
          <p>
            <Link href="/zh/legal/terms">中文版 →</Link>
          </p>

          <h2>1. Agreement to these terms</h2>
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your use of Limere (the app) and
            the rsrvlabs.com website (together, the &ldquo;Service&rdquo;), operated by Reserve,
            an AI-native studio (&ldquo;Reserve,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;). By
            creating an account or using the Service, you agree to these Terms. If you
            don&rsquo;t agree, don&rsquo;t use the Service.
          </p>
          <p>
            Limere is a pre-launch, early-access product. We&rsquo;re actively building it:
            features change, some things will break, and this document will be revised as the
            product and the company mature.
          </p>

          <h2>2. Who can use Limere</h2>
          <p>
            You must be at least 18 years old to create an account. By signing up, you confirm
            that you meet this requirement and that the information you provide is accurate.
            Limere is not directed at anyone under 18, and any account found to belong to someone
            under 18 will be closed.
          </p>

          <h2>3. Your account</h2>
          <p>
            You&rsquo;re responsible for the activity on your account and for keeping your login
            credentials secure. Use your own identity, and don&rsquo;t create an account for
            anyone but yourself. Tell us at hello@rsrvlabs.com if you think your account has been
            compromised.
          </p>

          <h2>4. Acceptable use</h2>
          <p>
            Limere exists to help people meet in person. Using it to do the opposite is not
            allowed. You agree not to:
          </p>
          <ul>
            <li>Harass, threaten, or abuse another person, on the app or off it.</li>
            <li>Impersonate anyone else, or misrepresent your age, identity, or intentions.</li>
            <li>Use Limere to solicit money, sell products or services, or run a scam.</li>
            <li>Scrape, reverse-engineer, or interfere with the app or the systems behind it.</li>
            <li>
              Take another person&rsquo;s photos, messages, or identity from the app and share
              them publicly without their consent.
            </li>
            <li>
              Use the Service if local law bars you from using a service like this, or if
              we&rsquo;ve already suspended you for a safety violation.
            </li>
          </ul>
          <p>
            We rely on reports from users to catch what we can&rsquo;t see ourselves. If someone
            makes you uncomfortable, block and report them from within the app.
          </p>
          <p>
            <strong>We review every report within 48 hours.</strong> Where a report is upheld we
            remove the content, and we suspend or terminate the account behind repeated or serious
            violations. We are a small team and we would rather commit to a window we can actually
            hold than to an instant one we cannot.
          </p>

          <h2>5. Content you share</h2>
          <p>
            You keep ownership of the photos, messages, and profile information you share on
            Limere. By posting or sending content through the Service, you give Reserve the
            license we need to store, display, and transmit it as part of running the app: for
            example, showing your profile to people you cross paths with, or delivering a message
            to the person you sent it to. We don&rsquo;t sell your content.
          </p>
          <p>
            You&rsquo;re responsible for what you post and send. Don&rsquo;t share anything you
            don&rsquo;t have the right to share or anything illegal, and don&rsquo;t post a photo
            of anyone who hasn&rsquo;t agreed to appear in it.
          </p>

          <h2>6. Meeting people in person</h2>
          <p>
            Limere is built around meeting people you&rsquo;ve actually crossed paths with.
            That&rsquo;s the point of the product, and it&rsquo;s also where our ability to
            protect you ends. We don&rsquo;t run background checks on users, and we can&rsquo;t
            verify anyone&rsquo;s identity or intentions beyond what they choose to tell us. Use
            ordinary caution: meet in public places, tell a friend where you&rsquo;re going, and
            trust your own judgment over the app&rsquo;s.
          </p>

          <h2>7. Suspension and termination</h2>
          <p>
            We can suspend or close an account that violates these Terms, creates risk for other
            users, or abuses the Service, with or without notice. You can stop using Limere at any
            time; see our <Link href="/legal/privacy">Privacy Policy</Link> for how to request
            that your account and data be deleted.
          </p>

          <h2>8. No warranty</h2>
          <p>
            The Service is provided &ldquo;as is,&rdquo; without warranties of any kind, express
            or implied, to the fullest extent the law allows. We don&rsquo;t promise the Service
            will be uninterrupted or error-free, and we don&rsquo;t promise it will find you a
            match: Limere shows you who you&rsquo;ve crossed paths with, and what happens next is
            between you and them.
          </p>

          <h2>9. Limitation of liability</h2>
          <p>
            To the fullest extent the law allows, Reserve is not liable for indirect, incidental,
            or consequential damages arising from your use of the Service, or for the conduct of
            other users, online or in person. Nothing in these Terms limits liability where the
            law doesn&rsquo;t allow it to be limited.
          </p>

          <h2>10. Changes to these terms</h2>
          <p>
            We may update these Terms as the product changes. We&rsquo;ll update the effective
            date above when we do. Continuing to use the Service after a change means you accept
            it.
          </p>

          <h2>11. Governing law</h2>
          <p>
            These Terms are governed by the laws of Taiwan, without regard to its conflict-of-law
            principles.
          </p>

          <h2>12. Contact</h2>
          <p>
            Questions about these Terms: <a href="mailto:hello@rsrvlabs.com">hello@rsrvlabs.com</a>.
          </p>

          <Link className={apple.backLink} href="/legal/privacy">
            Privacy Policy &rsaquo;
          </Link>
        </div>
      </Section>

      <Footer />
    </Page>
  );
}
