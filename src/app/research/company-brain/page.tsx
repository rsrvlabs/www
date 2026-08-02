import type { Metadata } from "next";
import { AppleNav, ArticleMeta, Footer, Page, Section, apple } from "@/components/apple/kit";

export const metadata: Metadata = {
  title: "YC put a name on the company brain — Reserve Research",
  description:
    "Series 01, essay 10: Y Combinator made the company brain an official startup category and has funded at least five of them. We have been running one since June. Notes on what the category will get wrong, from inside the thing it describes.",
  keywords: [
    "company brain",
    "YC request for startups",
    "organizational knowledge",
    "AI-native company",
    "agent memory",
    "knowledge management",
  ],
};

export default function CompanyBrainEssay() {
  return (
    <Page>
      <AppleNav />

      <Section center>
        <h1 className={apple.hero}>YC put a name on the company brain.</h1>
        <p className={apple.sub}>
          The layer we run this company on just became a startup category.
          Most versions will be built as software. The hard part is not
          software.
        </p>
        <ArticleMeta>Series 01 · Essay 10 · Published 07.2026</ArticleMeta>
      </Section>

      <Section>
        <div className={apple.article}>
          <p>
            In its Summer 2026{" "}
            <a
              href="https://www.ycombinator.com/rfs"
              target="_blank"
              rel="noreferrer"
            >
              Requests for Startups
            </a>
            , Y Combinator named a track it called Company Brain. The argument,
            written by partner Tom Blomfield, is that the blocker on AI
            automation inside companies is no longer model quality but domain
            knowledge: the critical know-how scattered across heads, threads
            and tickets, which no agent can act on because nobody ever wrote
            it down as structure. What the track asks for is a living,
            current, agent-usable map of how a company works. In the
            RFS&rsquo;s own words: &ldquo;Not a search tool. Not a chatbot
            over documents.&rdquo;
          </p>
          <p>
            The category is already crowded at the seed stage. Across its last
            few batches YC has funded at least five companies positioned as
            company brains, among them{" "}
            <a
              href="https://www.ycombinator.com/companies/hyperspell"
              target="_blank"
              rel="noreferrer"
            >
              Hyperspell
            </a>
            ,{" "}
            <a
              href="https://www.ycombinator.com/companies/hyper-4"
              target="_blank"
              rel="noreferrer"
            >
              Hyper
            </a>
            ,{" "}
            <a
              href="https://www.ycombinator.com/companies/memory-store"
              target="_blank"
              rel="noreferrer"
            >
              Memory Store
            </a>
            ,{" "}
            <a
              href="https://www.ycombinator.com/companies/savant"
              target="_blank"
              rel="noreferrer"
            >
              Savant
            </a>{" "}
            and{" "}
            <a
              href="https://www.ycombinator.com/companies/cerenovus"
              target="_blank"
              rel="noreferrer"
            >
              Cerenovus
            </a>
            , and an older portfolio company has repositioned onto the same
            phrase. Two details are worth noticing. The funding mostly
            preceded the naming: YC was writing checks into the pattern before
            it put a label on it. And by the Fall 2026 list, published in
            July, the track was gone again. That is how fast a category moves
            now: named in April, seeded by summer, absorbed into the
            background by fall. The window where being in the category was
            itself interesting has already closed. What remains interesting is
            proving the artifact stays alive.
          </p>
          <p>
            The architecture has a public lineage, and it is worth crediting.
            Andrej Karpathy described keeping a personal markdown wiki that an
            agent maintains, so knowledge compounds instead of being retrieved.
            Garry Tan&rsquo;s gstack builds a git-backed brain into a coding
            workflow. When we{" "}
            <a href="/research/prior-art">went looking for prior art</a> in
            June, this was the pattern we found at the edges: a lot of tools
            for storing knowledge, a few people actually operating on top of
            one. We built ours on that lineage deliberately, and the quadrant
            we found empty then is the one YC just named.
          </p>
          <p>
            Here is what a year of tools will get wrong, said from inside the
            thing the category describes: a company brain is not a database
            you install. It is an operating habit that happens to produce a
            database. The value is not in storing what the company knows. It
            is in the unglamorous disciplines that keep the store honest.
            Every page carries provenance, who said it, when, and on whose
            authority, because an agent acting on unattributed knowledge is
            acting on rumor. Contradictions get surfaced, never silently
            overwritten, because the moment the brain papers over a
            disagreement it stops being trusted. There is an activity log, a
            scheduled health check that hunts for stale pages and orphans, and
            a hard gate wherever an action would be outward or irreversible.
            None of that is a feature you can ship. All of it is behavior you
            have to keep.
          </p>
          <p>
            Ours has been live since June 19. It records decisions with
            provenance, opens and triages the tickets the team works from,
            runs a daily operating heartbeat, and drafts the documents the
            company signs off on. All thirty-two pull requests ever merged
            into this website went through it, drafted, reviewed and verified
            against production inside the same loop. The research behind this
            essay was done by two isolated verification agents, because we{" "}
            <a href="/research/agent-self-evaluation">
              do not let an agent grade its own claims
            </a>
            . The essays are written from inside the system they describe,
            which is also the only credential we claim for them.
          </p>
          <p>
            When a category gets named, demos get easy. Every pitch will show
            knowledge going in and answers coming out, and the demos will all
            look alike, because storage looks like storage. The difference
            that matters only shows up months later: whether the map is still
            true after the tenth disagreement, the fiftieth stale page, the
            first time the brain is wrong in a way that costs something. That
            difference is operational, not architectural, and it cannot be
            faked on a stage. We are not selling ours. We are running on it,
            in public, and writing down what breaks.
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
