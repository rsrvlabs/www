// TODO(legal-review): drafted from the actual app data model (supabase
// migrations), iOS Info.plist permission strings, and brain-wiki disclosure
// rules (see the ticket / PR body for the exact sources cited) — not
// reviewed by a lawyer. Get counsel to review this before or shortly after
// launch, especially §7 (account deletion isn't self-serve in-app yet; the
// 30-day turnaround is our commitment, not a legal requirement we verified)
// and whether a jurisdiction-specific rights section (GDPR/CCPA) is needed.
import type { Metadata } from "next";
import Link from "next/link";
import { AppleNav, ArticleMeta, Footer, Page, Section, apple } from "@/components/apple/kit";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Reserve collects, uses, and protects your information on Limere and this site.",
};

/**
 * Legal page in the Apple grammar, reusing the research-essay shell (Page →
 * AppleNav → centered title/standfirst → .article long-form column →
 * Footer). Unlike the essays, this content uses headings and lists — legal
 * text is read by section, not start to finish, and apple.module.css already
 * styles .article h2/ul for exactly this case.
 */
export default function PrivacyPage() {
  return (
    <Page>
      <AppleNav />

      <Section center>
        <h1 className={apple.hero}>Privacy Policy</h1>
        <p className={apple.sub}>
          How Reserve collects, uses, and protects your information on Limere and this site.
        </p>
        <ArticleMeta>Effective 7 August 2026</ArticleMeta>
      </Section>

      <Section>
        <div className={apple.article}>
          <h2>1. Scope</h2>
          <p>
            This Privacy Policy describes how Reserve, an AI-native studio (&ldquo;Reserve,&rdquo;
            &ldquo;we,&rdquo; &ldquo;us&rdquo;), collects, uses, and shares information through
            Limere (the app) and the rsrvlabs.com website (together, the &ldquo;Service&rdquo;).
            It applies to anyone who creates a Limere account or visits this site.
          </p>

          <h2>2. Who can use Limere</h2>
          <p>
            You must be 18 or older to create a Limere account. We ask for your birth year when
            you sign up to confirm this. Limere is not directed at anyone under 18; if we learn an
            account belongs to someone under 18, we will close it.
          </p>

          <h2>3. Information we collect</h2>
          <p>
            <strong>Account information.</strong> An email address and password to create and
            secure your account, and the birth year you enter at signup.
          </p>
          <p>
            <strong>Profile information.</strong> What you choose to add to your profile: your
            name, photos, a short tagline, and optional details like your interests and music
            taste. Most profile fields are optional beyond the minimum needed to create a
            profile, and you control which of them are visible (see &ldquo;Who can see
            what,&rdquo; below).
          </p>
          <p>
            <strong>Presence: who&rsquo;s nearby.</strong> Limere&rsquo;s core feature is showing
            you people you&rsquo;ve actually crossed paths with. While the app is open, your phone
            and another Limere user&rsquo;s phone can recognize that you&rsquo;re both nearby,
            automatically. This only works between two people who both have the app and are both
            using it; it doesn&rsquo;t reveal either person&rsquo;s precise location, and it does
            nothing with people who aren&rsquo;t on Limere. The signal your phone uses for this
            changes regularly, so it isn&rsquo;t a fixed identifier that someone outside the app
            could use to follow you around. You can turn off your visibility to nearby people at
            any time in the app&rsquo;s settings.
          </p>
          <p>
            <strong>Location.</strong> If you create or join an event with a venue attached, the
            app checks your location once, to confirm you&rsquo;re actually there. It does not
            track your location in the background or at any other time.
          </p>
          <p>
            <strong>Photos.</strong> Photos you add to your profile or send in chat. We ask for
            camera or photo library access only when you choose to take or attach a photo, or to
            scan an event QR code.
          </p>
          <p>
            <strong>Messages.</strong> The content of conversations with people you&rsquo;ve
            matched with, including any photo you send. Limere also offers expiring photos in
            chat: a photo sent this way can be opened once, for a short window, after which the
            recipient can&rsquo;t reopen it. As with any messaging feature, we can&rsquo;t stop
            someone from saving a copy, for example a screenshot, before it expires.
          </p>
          <p>
            <strong>Waitlist.</strong> If you join the early-access waitlist on this website, we
            collect the email address you provide and whether you&rsquo;re signing up as an
            individual or a business, so we can reach out when access opens.
          </p>

          <h2>4. Who can see what</h2>
          <p>
            Your name, photos, and tagline are visible to people you cross paths with or match
            with. Most other profile fields work on a simple rule: filling in a field yourself is
            what unlocks seeing that same field on someone else&rsquo;s profile. If you leave a
            field blank, you won&rsquo;t see it on other people&rsquo;s profiles either.
          </p>
          <p>
            Conversations are visible only to the two people in them. Looking at someone&rsquo;s
            full profile may let them see that you viewed it, similar to other social apps.
          </p>
          <p>
            If you block someone, you&rsquo;re immediately hidden from each other, any match
            between you ends, and your message history is hidden from both sides. If you unblock
            someone you were previously matched with, that match and its history are restored. If
            you report someone, we see the report; they aren&rsquo;t told who filed it.
          </p>

          <h2>5. How we store and protect information</h2>
          <p>
            We use third-party infrastructure providers to host the app and store data on our
            behalf. Connections between the app and our servers are encrypted in transit, and
            access to your data is restricted to what each part of the app needs. No method of
            storage or transmission is completely secure, and we can&rsquo;t guarantee absolute
            security.
          </p>
          <p>
            This website does not use analytics or advertising cookies.
          </p>

          <h2>6. How long we keep information</h2>
          <p>
            We keep your account and profile information for as long as your account is active,
            so we can provide the Service. This includes your history of people you&rsquo;ve
            crossed paths with, which we keep so you can look back at it. Messages are kept until
            you unsend them, which permanently clears the text, or until your account is deleted.
            If you delete your account, we delete this information as described below.
          </p>

          <h2>7. Deleting your account</h2>
          <p>
            You can remove individual photos from your profile at any time in the app. Self-serve
            account deletion inside the app is on our roadmap and isn&rsquo;t built yet. Until it
            is, email hello@rsrvlabs.com with the subject &ldquo;Delete my account,&rdquo; and
            we&rsquo;ll delete your account and the personal data associated with it within 30
            days, except where we need to keep limited records to meet a legal obligation or
            resolve a dispute.
          </p>

          <h2>8. Your choices</h2>
          <p>
            You can control which optional profile fields you share, turn off your visibility to
            nearby people, block or report anyone, and leave an event, all from within the app.
            Contact hello@rsrvlabs.com for any other request about your information.
          </p>

          <h2>9. Changes to this policy</h2>
          <p>
            We may update this policy as the product changes. We&rsquo;ll update the effective
            date above when we do. If a change is significant, we&rsquo;ll look for a reasonable
            way to let you know before it takes effect.
          </p>

          <h2>10. Contact</h2>
          <p>
            Questions about this policy, or about your information:{" "}
            <a href="mailto:hello@rsrvlabs.com">hello@rsrvlabs.com</a>.
          </p>

          <Link className={apple.backLink} href="/legal/terms">
            Terms of Service &rsaquo;
          </Link>
        </div>
      </Section>

      <Footer />
    </Page>
  );
}
