import type { Metadata } from "next";
import { AppleNav, Footer, Page, Section, apple } from "@/components/apple/kit";

export const metadata: Metadata = {
  title: "Does an AI-native company still need departments? — Reserve Research",
  description:
    "Series 01, essay 02: a department is a standing promise to keep paying attention to a domain. We deleted the org chart and wrote a schedule instead — and here is what that traded away.",
};


export default function DepartmentsEssay() {
  return (
    <Page>
      <AppleNav />

      <Section center>
        <h1 className={apple.hero}>
          Does an AI-native company still need departments?
        </h1>
        <p className={apple.sub}>
          A department is a standing promise to keep paying attention to a
          domain. We deleted the org chart and wrote a schedule instead — and
          here is what that traded away.
        </p>
        <p className={apple.articleMeta}>
          Series 01 · Essay 02 · Published 07.2026 · Reserve — curators, one brain.
        </p>
      </Section>

      <Section>
        <div className={apple.article}>
          <p>
            A department is not a room full of people. Seen coldly, it is a
            standing promise: that somebody will keep paying attention to a
            domain — the money, the customers, the competition, the health of
            the codebase — long after the founders&rsquo; attention has moved
            on. The people are how companies have always kept that promise.
            They are not the only way to keep it.
          </p>
          <p>
            So when we started Reserve as two engineers, we did not draw an
            org chart with empty boxes waiting for hires. We asked a narrower
            question: what does this company owe itself attention on, and how
            often? Then we wrote the answer down as a schedule. There is one
            heartbeat — a scheduled process that wakes once a day whether or
            not anyone is at a keyboard — and it reads a table of standing
            jobs and runs the ones that are due.
          </p>


          <p>
            This is the whole trick, and it is less magical than it sounds. A
            &ldquo;marketing department&rdquo; becomes a weekly beat that
            scans the competition and files what changed. A
            &ldquo;chief of staff&rdquo; becomes a Wednesday review that reads
            where our effort actually went — from commits and tickets, not
            from what we claim in standup. Each role is a skill the brain
            wears on a cadence, not a person we could not yet afford to hire.
          </p>
          <p>
            <strong>
              We deleted the org chart and wrote a schedule. The company&rsquo;s
              attention is now a thing you can read in one page.
            </strong>
          </p>
          <p>
            The honest part is what the schedule cannot do, and where we had
            to put humans back. A cadence can notice that we have gone two
            weeks without a single real conversation with a customer — that
            one is a red line in the weekly review, and no amount of shipped
            code buys it back — but it cannot go have the conversation. It can
            draft the competitor ticket; it cannot decide the strategy the
            ticket implies. The heartbeat is deliberately timid: it defaults
            to doing nothing, and everything that reaches outside the company
            or spends money waits behind a human yes.
          </p>
          <p>
            We got that boundary wrong at first, in the instructive
            direction. The heartbeat had quietly forbidden itself from posting
            anything at all while unattended — the safe default of a system
            afraid of its own reach. A founder had to overrule it: you are
            allowed to speak to us, just not for us. The permission became a
            written, revocable decision, the way every expansion of what the
            machine may do on its own has. That paper trail is the real
            org chart now — not who reports to whom, but what the company has
            decided its software is allowed to do without asking.
          </p>
          <p>
            So: do you still need departments? You need the promise a
            department was standing in for — sustained, un-forgetful attention
            to the things that decay when no one is watching. We think that
            promise is now mostly schedulable, and that the humans are freed
            for the part that was never a department in the first place: the
            conversation, the taste, the call. The boxes were always a cache.
            We just stopped pretending the cache was the company.
          </p>

          <a className={apple.backLink} href="/research">
            &lsaquo; Research
          </a>
        </div>
      </Section>

      <Footer />
    </Page>
  );
}
