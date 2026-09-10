// Privacy Policy v3 (English) — a faithful translation of /zh/legal/privacy, which
// governs. REVIEW ONLY: merge = publish. This is the URL given to App Review
// (sw-app docs/app-review-notes.md, Data section), so it must never lag the zh page.
//
// Ticket: [Ops] 瀏覽足跡的規則使用者兩邊都讀不到（Notion 3ccdae10-8b25-8175-8dd0-cc540264093d）.
// Draft of record + founder notes: brain/wiki/projects/limere-privacy-policy-2026-09-10.md
//
// Written under R213 (outward documents are business instruments: lawful and true,
// otherwise broad — no retention numbers, no mechanisms, no technology) and R254
// (no technology names in user-facing copy). Replaces the 2026-08-07 v1 text, which
// contradicted the app in several places (see the brain page).
//
// Before merge: set the effective date to the publish date. The company's legal
// entity name is pending incorporation — "Reserve" stays until then.
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
        <ArticleMeta>Version v3 · Effective 10 September 2026</ArticleMeta>
      </Section>

      <Section>
        <div className={apple.article}>
          <p>
            <Link href="/zh/legal/privacy">中文版 →</Link>
          </p>

          <h2>1. Who this policy covers, and how you agree to it</h2>
          <p>
            This Privacy Policy describes how Reserve, an AI-native studio (&ldquo;Reserve,&rdquo;
            &ldquo;we,&rdquo; &ldquo;us&rdquo;), collects, processes, uses, keeps, and shares your
            information through Limere (the &ldquo;App&rdquo;) and the rsrvlabs.com website
            (together, the &ldquo;Service&rdquo;).
          </p>
          <p>
            You can open this policy and the <Link href="/legal/terms">Terms of Service</Link> and
            read them in full before you sign in or create an account. By signing in, creating an
            account, or continuing to use the Service, you accept the versions of both documents
            in effect at that time. <strong>The App does not show a second consent checkbox or
            confirmation dialog.</strong> If you do not accept them, please do not sign in.
          </p>

          <h2>2. Information we collect</h2>
          <p>
            To make Limere work, make it better, and keep the people using it safe, we collect the
            following kinds of information.
          </p>
          <ul>
            <li>
              <strong>Your account.</strong> The email address you sign in with, or the basic
              account details provided by the sign-in method you choose, your sign-in and
              verification status, and the identifier we use to recognise your account.
            </li>
            <li>
              <strong>Your age.</strong> When you sign up we ask for your date of birth, which we
              use to confirm you are eligible and to work out your age. Your age may be shown on
              your profile to other users; we do not show your date of birth to other users.
            </li>
            <li>
              <strong>Your profile and photos.</strong> Your display name, photos, a short tagline,
              and any of the optional fields you choose to fill in. You can also create more than
              one persona under the same account; each persona has its own name, photos, content,
              and interaction history.
            </li>
            <li>
              <strong>Activities you take part in.</strong> Which activities you create or join,
              when and where they take place, and your participation status in them.
            </li>
            <li>
              <strong>Your interactions with other users.</strong> Who you crossed paths with in
              person, whose profile you viewed and who viewed yours, who you showed interest in,
              who was introduced to you and whether you connected, the content of your
              conversations (including photos and expiring photos you send), ratings you give to
              an activity or another user, blocks and reports, and the events associated with
              these actions.
            </li>
            <li>
              <strong>Location.</strong> We process your location when you create an activity
              with a venue, when you are at an activity, when you turn on features tied to
              arriving at or leaving a venue, or when you use other location-based features.
            </li>
            <li>
              <strong>Nearby signals during activities.</strong> Limere is built around meeting
              people who are actually near you. While you take part in an activity, your phone
              and other Limere users&rsquo; phones recognise each other, and this may continue
              while the App is not on screen. We process these recognition signals to work out
              who is nearby and who has actually arrived. This happens only while you are taking
              part in an activity, and only between people who are both using Limere.
            </li>
            <li>
              <strong>Device and usage information.</strong> The device and operating system you
              use, the App version, the device identifier needed for push notifications, which
              permissions you have granted, and what you do in the App: which actions you take,
              which screens you open, and when errors or crashes occur. Some of this is collected
              through usage-analytics and crash-diagnostics tools provided by our service
              providers.
            </li>
            <li>
              <strong>Messages you send us.</strong> When you contact us by email or another
              channel, including reports, appeals, or requests about your information, we keep
              the correspondence and the details you provide.
            </li>
            <li>
              <strong>This website.</strong> If you sign up for early access on this website, we
              collect the email address you provide and the type of account you select. This
              website may use cookies or similar technologies to operate and to understand how it
              is used.
            </li>
          </ul>
          <p>
            Some of the optional fields you can fill in may be treated as sensitive categories in
            certain jurisdictions, such as ethnicity, religion, political views, or lifestyle
            habits. <strong>Whether to fill them in, and whether to show them to others, is
            entirely your choice</strong>; you can leave them all blank. A field you have filled
            in but chosen not to share is not visible to other users.
          </p>

          <h2>3. How we use your information</h2>
          <p>We collect, process, and use your information for the following purposes:</p>
          <ul>
            <li>To create and maintain your account and provide the features of the Service.</li>
            <li>
              To keep the Service stable and of good quality, and to find and fix problems,
              errors, and crashes.
            </li>
            <li>
              To understand how the Service is used, and to improve existing features and develop
              new features and services on that basis.
            </li>
            <li>
              To personalise content and recommendations for you based on your information, your
              ratings, and how you use the Service, including deciding who to introduce you to.
            </li>
            <li>
              To keep the Service safe and honest: confirming eligibility, handling reports and
              ratings, preventing fraud, harassment, abuse, and other violations, and restricting
              accounts where necessary.
            </li>
            <li>
              To carry out research, statistics, and business analysis.{" "}
              <strong>We may use information in de-identified or aggregated form</strong>;
              information that can no longer identify a specific person may be used by us for any
              lawful purpose and is not subject to this policy.
            </li>
            <li>
              To send you notices related to the Service, product information, and marketing, and
              to promote and commercially use our own products and services.
            </li>
            <li>
              To comply with the law, or with requests from regulators, courts, or other
              authorities.
            </li>
          </ul>
          <p>
            We do not currently sell your personal information. If we ever intend to use personal
            information by selling it or in a similar way, we will update this policy first and
            obtain any consent the law requires.
          </p>

          <h2>4. Who we share it with</h2>
          <p>
            To the extent necessary to provide the Service, we entrust information to{" "}
            <strong>service providers</strong> that process it on our behalf under contractual
            and security obligations &mdash; for example, hosting and data storage, file storage,
            push notifications, email delivery, maps, usage analytics, and crash diagnostics.
            These providers may process information outside Taiwan, which constitutes an
            international transfer; we reduce the risk through contracts, access controls,
            encryption in transit, and least-privilege access.
          </p>
          <p>
            We may also disclose or transfer information: where required by law or by a
            government authority; to protect the rights, property, or safety of the Service, its
            users, or third parties; in connection with a{" "}
            <strong>merger, acquisition, reorganisation, investment, or transfer of assets</strong>,
            in which case the information may be transferred to the successor, who will continue
            to process it within the scope of this policy; and in other cases with your consent.
          </p>

          <h2>5. Who can see your information in the App</h2>
          <p>
            <strong>Your profile.</strong> Your name, photos, tagline, and age are visible to
            people you have crossed paths with or connected with. The remaining fields follow one
            simple rule: <strong>filling in a field yourself is what unlocks seeing that same
            field on someone else&rsquo;s profile</strong>; a field you leave blank is one you will
            not see on other people&rsquo;s profiles either. A field you have chosen not to share
            is not visible to other users. Conversations are visible only to the two people in
            them.
          </p>
          <p>
            <strong>Profile views.</strong> When you view someone&rsquo;s full profile, they may be
            able to see that you visited, for a limited time; likewise, you may be able to see who
            has recently viewed you. These traces are shown for a limited time only and then stop
            being displayed; how long may change as the product evolves. We keep interaction
            records for safety and integrity purposes even after they are no longer displayed to
            anyone.
          </p>
          <p>
            <strong>Joining without being shown.</strong> Each time you enter an activity, you
            choose whether to appear openly or to join without being shown. When you join without
            being shown, your profile is not displayed to other people at the activity and you do
            not leave profile-view traces. This choice is made at the moment you enter.
          </p>
          <p>
            <strong>Ratings.</strong> A rating you give another user is not shown to that person;
            a rating you give an activity is not shown to other participants. We use ratings for
            the purposes described in Section 3, such as deciding who to introduce you to and
            keeping the Service safe.
          </p>
          <p>
            <strong>Blocking and reporting.</strong> Blocking is permanent. Once you block someone,
            they no longer appear in your nearby list, neither of you can message the other, any
            existing connection ends, and{" "}
            <strong>you will not be able to unblock that person within Limere afterwards</strong>.
            If you report someone, we see the report; they are not told who filed it.
          </p>
          <p>
            <strong>Expiring photos.</strong> An expiring photo you send in a conversation can be
            opened by the recipient once, for a limited time. As with any messaging feature, we
            cannot guarantee that the recipient will not save a copy by other means before it
            disappears.
          </p>

          <h2>6. How long we keep it</h2>
          <p>
            We keep your information{" "}
            <strong>for as long as necessary to fulfil the purposes described in this policy</strong>,
            with different retention and clean-up practices depending on the nature of the
            information, its risk, and our operational needs. Some content (for example,
            short-lived interaction records you leave in the Service) is cleared after a shorter
            period, and these periods may change as the product evolves.
          </p>
          <p>
            Information processed by service providers (for example, usage analytics and crash
            diagnostics) is retained for a period under their respective policies and then
            deleted.
          </p>
          <p>
            <strong>Safety-related information is kept longer.</strong> Reports, restrictions,
            ratings, and necessary evidence are retained as needed for safety, appeals, audits,
            and legal obligations, and{" "}
            <strong>do not disappear because the person reported deletes their account</strong>.
          </p>
          <p>
            Please also note: messages that have already been delivered may remain in the
            conversation, shown as coming from a &ldquo;deleted user&rdquo;; backups and service
            providers&rsquo; systems may also need a reasonable time to complete rotation and
            deletion.
          </p>

          <h2>7. Deleting your account, and your rights</h2>
          <p>
            You can remove individual photos in the App at any time,{" "}
            <strong>and you can delete your whole account from within the App</strong> &mdash; the
            entry is on the &ldquo;Me&rdquo; page. Once deleted, your account is deactivated
            immediately, you can no longer sign in, and you no longer appear in other users&rsquo;
            Apps. We delete the remaining information <strong>within a reasonable period</strong>,
            except for what must be retained under Section 6.
          </p>
          <p>
            If you deleted your account by mistake, email{" "}
            <a href="mailto:hello@rsrvlabs.com">hello@rsrvlabs.com</a> as soon as you can and we
            will help where the information still exists.
          </p>
          <p>
            Under the Personal Data Protection Act, you may ask us to{" "}
            <strong>let you inquire about or review your personal information, provide a copy,
            supplement or correct it, stop collecting, processing, or using it, or delete it</strong>.
            If the law of the place where you live gives you other rights &mdash; such as data
            portability, objecting to certain processing, withdrawing consent, or lodging a
            complaint with a supervisory authority &mdash; you may exercise them with us under
            that law. Write to <a href="mailto:hello@rsrvlabs.com">hello@rsrvlabs.com</a> and we
            will respond within a reasonable period; we may verify your identity by reasonable
            means before responding. Where we cannot comply because the law requires otherwise or
            because it is necessary to keep the Service safe, we will explain why.
          </p>
          <p>
            You can also, directly in the App, decide which fields to disclose, join an activity
            without being shown, leave an activity, block or report anyone, and delete your
            account. Using the Service means you agree to the data collection described in this
            policy; <strong>the App does not currently offer a separate opt-out switch</strong>.
            You can withdraw consent by stopping use or deleting your account.
          </p>

          <h2>8. How we protect it</h2>
          <p>
            We take reasonable technical and organisational measures to protect your information,
            such as encryption in transit, access controls, private media storage, and the
            principle of least privilege. No method is completely secure, and we cannot guarantee
            absolute security; if an incident occurs that the law requires us to notify, we will
            handle it as the law requires.
          </p>

          <h2>9. Minors</h2>
          <p>
            Limere is only for people aged 18 or over. We ask for your age information when you
            sign up, and we do not knowingly collect personal information from anyone under 18.
            If we learn that an account belongs to someone under 18, we will close it and handle
            its information under the applicable procedure. If you believe a minor has given us
            information, please contact{" "}
            <a href="mailto:hello@rsrvlabs.com">hello@rsrvlabs.com</a>.
          </p>

          <h2>10. Changes to this policy</h2>
          <p>
            This page shows a version number and an effective date. We may revise this policy in
            response to product, legal, or operational needs; significant changes will be
            announced in a reasonable way and take effect from the announced effective date. By
            continuing to use the Service after a change takes effect, you accept the revised
            policy.
          </p>

          <h2>11. Contact and language versions</h2>
          <p>
            For data rights, privacy questions, or complaints, write to{" "}
            <a href="mailto:hello@rsrvlabs.com">hello@rsrvlabs.com</a>. We are a small team, and
            a person reads every message.
          </p>
          <p>
            The <Link href="/zh/legal/privacy">Traditional Chinese page</Link> is the version
            linked from the App&rsquo;s sign-in screen; this English page is a translation of it.
          </p>
          <p>
            <strong>
              During the Taiwan launch, the Traditional Chinese version of this policy governs;
              where the two versions differ, the Chinese text prevails.
            </strong>
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
