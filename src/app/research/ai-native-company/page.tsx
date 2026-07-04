import type { Metadata } from "next";
import Link from "next/link";
import { SubpageHeader, MetaBar } from "@/components/site/subpage";

export const metadata: Metadata = {
  title: "The AI-native company — Reserve Research",
  description:
    "Series 01, essay 01: what changes when a two-founder company runs on an AI operating system — one shared brain, agents with jobs, humans making the calls.",
};

/**
 * Post page — the scrunch blueprint at night (design-refs/scrunch.md):
 * mono metadata bar → serif H1 at a narrow measure → 850px body column,
 * 19px serif at 1.7 leading, drop cap on the first paragraph, one centered
 * italic pull quote, dashed-divider author footer. No hero image until an
 * honest one exists (no stock, no generated filler).
 */
export default function AiNativeCompanyEssay() {
  return (
    <main className="relative min-h-[100svh] w-full overflow-x-clip bg-night">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[40svh] grid-paper-night"
      />
      <SubpageHeader index="Q" label="Research" />
      <article className="relative mx-auto w-full max-w-[68rem] px-6 pb-[16svh] pt-[22svh] md:px-10">
        {/* wide → narrow funnel: metadata bar → H1 → body snaps to 850px */}
        <MetaBar items={["Series 01 · Essay 01", "Reserve", "Published 07.2026"]} />
        <h1 className="mt-8 max-w-[14ch] font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[1.04] tracking-[-0.02em] text-paper">
          The AI-native company
        </h1>

        <div className="mx-auto mt-14 max-w-[850px]">
          <div className="hairline-dashed-night space-y-7 pt-12 font-display text-[19px] leading-[1.7] text-paper/85">
            {/* 5rem drop cap — the blueprint value (design-refs/scrunch.md /
                DESIGN.md blog blueprint; code had drifted to 4.6rem) */}
            <p className="first-letter:float-left first-letter:mr-3 first-letter:mt-2 first-letter:font-display first-letter:text-[5rem] first-letter:leading-[0.75] first-letter:text-paper">
              Every company is a machine for turning attention into decisions.
              Most of that machine was never the product: it is the meetings,
              the handoffs, the status updates, the documents nobody reads
              twice — the connective tissue between people who are each holding
              a fragment of the whole. For fifty years software has nibbled at
              the edges of that tissue. We think the tissue itself has become
              programmable.
            </p>
            <p>
              Reserve is a two-founder company that runs on an AI operating
              system we built for ourselves. There is one shared brain — a
              knowledge base that every agent and both humans read and write,
              where meetings, decisions, and lessons land as pages instead of
              memories. And there are agents with actual jobs: a finance desk
              that researches and publishes its own morning brief before we
              wake up, a product manager that triages tickets, reviewers that
              argue with our plans before we commit to them. The brain
              remembers. The agents operate. The humans decide.
            </p>
            <blockquote className="mx-auto max-w-[24ch] py-6 text-center font-display italic text-[clamp(1.5rem,2.6vw,1.95rem)] leading-[1.3] text-paper">
              The org chart is a cache of old decisions. We wanted a company
              that re-decides its defaults every morning.
            </blockquote>
            <p>
              None of this makes two people superhuman. It makes them
              un-forgetful, which turns out to be most of what a company is
              for. A department, seen coldly, is a promise that somebody will
              keep paying attention to a domain after the founders stop. When
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
          </div>

          {/* Author footer — dashed divider, mono label (scrunch grammar) */}
          <footer className="hairline-dashed-night mt-16 grid grid-cols-1 gap-4 pt-8 md:grid-cols-[220px_1fr]">
            <span className="kicker text-paper/50">Author</span>
            <div>
              <p className="font-display text-xl leading-snug text-paper">
                Reserve — two founders, one brain.
              </p>
              <Link
                href="/research"
                className="kicker link-underline mt-5 inline-block text-paper/60"
              >
                ← all research
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </main>
  );
}
