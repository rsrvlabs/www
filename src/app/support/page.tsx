// Support URL for App Store Connect (a required submission field). Answers
// verified against the live app, not guessed:
//  - "Why don't I see anyone nearby?" mirrors the app's own empty-state copy,
//    sw-app lib/l10n/app_en.arb (nearbySearchingTitle/Subtitle, nearbySearchingGoVenues).
//  - "Report or block someone" mirrors the real menu entries, sw-app
//    lib/screens/profile_detail_screen.dart and chat_screen.dart (the ••• menu,
//    pdReportPerson/pdBlockPerson, chatReportPerson/chatBlockPerson).
//  - "Delete my account" matches Privacy Policy §7 (email-based, 30-day
//    turnaround) — the CURRENT truth. sw-app PR #137 adds in-app deletion
//    ("Me" screen → "Delete account") but is NOT merged/live yet; see the
//    inline note below and the PR body for this change.
import type { Metadata } from "next";
import Link from "next/link";
import { AppleNav, Footer, Page, Section, apple } from "@/components/apple/kit";

export const metadata: Metadata = {
  title: "Support",
  description: "Answers to common Limere questions, plus how to reach us.",
};

/**
 * Same article shell as the legal pages (Page → AppleNav → centered
 * title/standfirst → .article long-form column → Footer). Doubles as the
 * App Store Connect "Support URL" submission field.
 */
export default function SupportPage() {
  return (
    <Page>
      <AppleNav />

      <Section center>
        <h1 className={apple.hero}>Support</h1>
        <p className={apple.sub}>Get help with Limere.</p>
      </Section>

      <Section>
        <div className={apple.article}>
          <p>
            <Link href="/zh/support">中文版 →</Link>
          </p>

          <h2>Frequently asked questions</h2>

          <h3>What is Limere?</h3>
          <p>
            Limere helps you reconnect with people you&rsquo;ve actually crossed paths with, at
            the events and venues you go to. It isn&rsquo;t for browsing strangers. You only see
            people you were really near, and you decide who to talk to next.
          </p>

          <h3>Why don&rsquo;t I see anyone nearby?</h3>
          <p>
            An empty Nearby screen usually just means nobody else around you has Limere open
            right now, and that&rsquo;s expected outside of an event. Join an activity from the
            Activities tab: people who also have Limere open at that event will start showing up
            as you cross paths with them.
          </p>

          <h3>How do matching and messaging work?</h3>
          <p>
            Liking someone doesn&rsquo;t open a conversation by itself. Messaging only unlocks
            once you both like each other, and that mutual like is what turns a crossed path into
            a match. Nobody can message you unless you&rsquo;ve liked them back.
          </p>

          <h3>How do I report or block someone?</h3>
          <p>
            Open their profile, or your conversation with them, and tap the ••• menu in the top
            corner. From there you can choose Report this person or Block this person.
          </p>

          {/* TODO(support-faq): sw-app PR #137 adds in-app deletion ("Me" screen
              → "Delete account", two-step confirm sheet) but is not merged yet.
              Once it ships, flip this answer to point at that flow instead of
              email, and update Privacy Policy §7 in the same change. */}
          <h3>How do I delete my account?</h3>
          <p>
            Account deletion isn&rsquo;t self-serve in the app yet. Email hello@rsrvlabs.com with
            the subject line &ldquo;Delete my account,&rdquo; and we&rsquo;ll delete your account
            and its personal data within 30 days.
          </p>

          <h2>Contact</h2>
          <p>
            Can&rsquo;t find what you need? Email{" "}
            <a href="mailto:hello@rsrvlabs.com">hello@rsrvlabs.com</a> and we&rsquo;ll get back to
            you.
          </p>
          <p>
            See also our <Link href="/legal/terms">Terms of Service</Link> and{" "}
            <Link href="/legal/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </Section>

      <Footer />
    </Page>
  );
}
