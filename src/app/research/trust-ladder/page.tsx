import type { Metadata } from "next";
import { AppleNav, Footer, Page, Section, apple } from "@/components/apple/kit";
import TrustLadder from "@/components/visuals/trust-ladder";

export const metadata: Metadata = {
  title: "Autonomy is granted, not assumed — Reserve Research",
  description:
    "Series 01, essay 07: how much should an AI agent be allowed to do? We answer with a paper trail — every expansion of our agent's autonomy is a numbered, revocable decision record. Here is the ladder it climbed, and why the permissions live outside the agent's memory.",
  keywords: [
    "AI agent autonomy",
    "agent permissions",
    "decision records",
    "ADR",
    "agent governance",
    "execution bias",
    "AI-native company",
  ],
};

export default function TrustLadderEssay() {
  return (
    <Page>
      <AppleNav />

      <Section center>
        <h1 className={apple.hero}>Autonomy is granted, not assumed.</h1>
        <p className={apple.sub}>
          Every expansion of what our agent may do is a numbered, revocable
          decision record. Here is the ladder it climbed.
        </p>
        <p className={apple.articleMeta}>
          Series 01 · Essay 07 · Published 07.2026 · Reserve — curators, one brain.
        </p>
      </Section>

      <Section>
        <div className={apple.article}>
          <p>
            &ldquo;How much should an AI agent be allowed to do?&rdquo; is the
            question every team deploying agents ends up arguing about, and
            most of the industry answers it in one of two bad ways. Either by
            vibes — the agent does whatever it did yesterday plus whatever
            nobody objected to — or by a settings page, a pile of toggles that
            nobody remembers flipping and nothing explains. We answer it a
            third way: with a paper trail. Every time our company&rsquo;s agent
            gained the ability to act on the world without a human watching,
            that expansion was written down as a numbered decision record —
            what opened, how narrow, which guardrails, and how to take it back.
            The ledger runs sixteen numbers deep at this writing. The agent
            climbed it one rung at a time.
          </p>
          <p>
            The ladder looks like this. First grant: the agent may open and
            update tickets on the team board by itself — its first write
            surface, everything else still read-only. Second: it may
            auto-publish exactly one artifact, a daily brief, to exactly one
            internal channel — behind an enabled-flag that shipped switched
            off, a kill-switch file, once-per-day idempotency, and a
            no-mentions rule; for the first days a human posted the briefs
            manually while the automated path ran silent. Third: it may answer
            when addressed, in one channel. Fourth: full-agent mode inside one
            founder&rsquo;s direct messages, with two permission tiers keyed to
            the verified identity of whoever is talking. Fifth: the scheduled
            heartbeat may post digests to internal channels on its own —
            unprompted, at night, with nobody watching.
          </p>

          <TrustLadder />

          <p>
            Two moments on that ladder are worth pausing on, because they are
            the difference between a trust ladder and a slippery slope. The
            first: before the digest grant existed, the agent had defaulted
            itself to <em>no outward messages when nobody is watching</em> — and
            held that line until a founder deliberately opened it. The default
            was closed, and the opening was a human act with a document
            attached, not a drift. The second: during the full-agent grant, a
            founder supplied an identifier for the other founder that
            conflicted with what the agent already knew. It would have been
            easy — agreeable, even — to silently adopt the new value. Instead
            the agent flagged the conflict and the grant waited until a human
            reconciled it. A grant is itself a claim about the world; it gets
            verified like any other claim.
          </p>
          <p>
            Why paper, though? Why not just prompt the agent with &ldquo;be
            careful with outward actions&rdquo; and let it internalize the
            policy? Because of a failure mode the research community spent this
            year naming: execution bias. Agents that accumulate procedural
            experience — memories of how they did things — drift toward
            acting instead of asking. Each remembered success makes the next
            unprompted action feel more normal, which means the more competent
            the agent gets, the harder its own memory pushes it past the
            question &ldquo;may I?&rdquo;. A policy that lives inside the
            learned layer erodes at exactly the rate the agent improves.
            So the permissions live outside it, in documents the agent can
            read but cannot edit into its own memory, enforced by checks the
            agent does not control. The ladder is climbable, but the rungs are
            bolted to the wall, not to the climber.
          </p>
          <p>
            This is the companion piece to our design law of{" "}
            <a href="/research/build-the-floor">floors and ceilings</a>. That
            essay argued that the confirm-before-acting membrane should sit
            only on the outward and the irreversible, and everything inside it
            should be verifiable floors. This essay is about how the membrane
            itself moves. It does not dissolve as trust grows — it relocates,
            one deliberate document at a time. Each grant moves a specific,
            named action from &ldquo;confirm first&rdquo; to &ldquo;act, with
            guardrails, and log it&rdquo; — and because the grant is a
            document, it carries its own undo. Revoke the record and the
            membrane snaps back to where it was. Trust that expands by drift
            has no undo, because nobody can say what was granted or when.
          </p>
          <p>
            <strong>
              The test of an autonomy grant: can you point to the document, and
              can you take it back? If either answer is no, the agent
              doesn&rsquo;t have permissions — it has habits.
            </strong>
          </p>
          <p>
            What the ledger buys is boring and constant. When someone asks why
            the bot posts in this channel and not that one, there is a
            document. When a post misfires at 4 a.m., there is a kill-switch
            named in the same document that allowed the posting. When a new
            teammate wants to know what the agent is for, the ladder reads as
            a history of the company deciding, in public with itself, how much
            to trust its newest colleague. Which is the last thing to say: this
            is just onboarding. A new employee starts narrow, earns scope,
            and the promotions are written down. We did nothing more exotic
            than refuse to skip that process for an employee made of software —
            except that this employee&rsquo;s permissions are versioned, and
            yours probably aren&rsquo;t.
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
