import type { Metadata } from "next";
import { AppleNav, Footer, Page, Section, apple } from "@/components/apple/kit";

export const metadata: Metadata = {
  title: "The AI-native company — Reserve Research",
  description:
    "Series 01, essay 01: what changes when a studio runs on an AI operating system — one shared brain, agents with jobs, humans making the calls.",
};

/**
 * Post page in the Apple grammar (Ryvn 2026-07-23: the whole site follows
 * Apple design): centered title + standfirst, then a 42rem long-form column.
 * The prose is the published essay, unchanged.
 */
export default function AiNativeCompanyEssay() {
  return (
    <Page>
      <AppleNav />

      <Section center>
        <h1 className={apple.hero}>The AI-native company</h1>
        <p className={apple.sub}>
          What changes when a studio runs on an AI operating system — one shared
          brain, agents with jobs, humans making the calls.
        </p>
        <p className={apple.articleMeta}>
          Series 01 · Essay 01 · Published 07.2026 · Reserve — curators, one brain.
        </p>
      </Section>

      <Section>
        <div className={apple.article}>
          <p>
            Every company is a machine for turning attention into decisions.
            Most of that machine was never the product: it is the meetings,
            the handoffs, the status updates, the documents nobody reads
            twice — the connective tissue between people who are each holding
            a fragment of the whole. For fifty years software has nibbled at
            the edges of that tissue. We think the tissue itself has become
            programmable.
          </p>
          <p>
            Reserve is a studio that runs on an AI operating system we
            built for ourselves. There is one shared brain — a
            knowledge base that the agents and the humans read and write,
            where meetings, decisions, and lessons land as pages instead of
            memories. And there are agents with actual jobs: a finance desk
            that researches and publishes its own morning brief before we
            wake up, a product manager that triages tickets, reviewers that
            argue with our plans before we commit to them. The brain
            remembers. The agents operate. The humans decide.
          </p>
          <p>
            <strong>
              The org chart is a cache of old decisions. We wanted a company
              that re-decides its defaults every morning.
            </strong>
          </p>
          <p>
            None of this makes the humans superhuman. It makes them
            un-forgetful, which turns out to be most of what a company is
            for. A department, seen coldly, is a promise that somebody will
            keep paying attention to a domain after the humans stop. When
            attention can be delegated to something that never sleeps and
            never files a resignation, the department stops being a room full
            of people and becomes a role the brain can wear — with a human
            still accountable for every call that matters.
          </p>
          <p>
            The honest version of this story includes the failures: agents
            that confidently did the wrong job, knowledge that went stale the
            moment nobody linted it, safety rails we added only after
            something leaked past us. Running a company this way is not a
            productivity hack. It is an organizational experiment, and the
            experiment fails in new ways weekly. That is exactly why it is
            worth writing down.
          </p>
          <p>
            This series is our field notes, published as we learn them: the
            org design, the failures, and the parts that feel like the
            future. We will write what actually happened — not what would
            look good in a deck.
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
