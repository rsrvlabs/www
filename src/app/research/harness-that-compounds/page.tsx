import type { Metadata } from "next";
import Link from "next/link";
import { SubpageHeader, MetaBar, CtaBand } from "@/components/site/subpage";
import { TwoHarnesses } from "@/components/visuals/two-harnesses";

export const metadata: Metadata = {
  title: "The harness has an expiration date. Ours mostly doesn't. — Reserve Research",
  description:
    "Series 01, essay 05: as models get stronger, the bitter lesson says delete your scaffolding. True — for the harness that compensates for a weak model. But a second harness (memory, accountability, permission, cadence) compounds instead of expiring. Here's how we tell them apart.",
  keywords: [
    "agent harness",
    "bitter lesson",
    "context engineering",
    "AI scaffolding",
    "AI-native company",
    "agent reliability",
  ],
};

/**
 * Series 01 · Essay 05 — de-magazined night blueprint (grotesk sans, monochrome).
 * Grounded in the 2025–26 harness/bitter-lesson debate; the TwoHarnesses figure
 * carries the argument (expiring vs compounding value across model capability).
 */
export default function HarnessEssay() {
  return (
    <main className="lab-ground relative min-h-[100svh] w-full overflow-x-clip">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[40svh] grid-paper-night"
      />
      <SubpageHeader index="Q" label="Research" current="/research" />
      <article className="relative mx-auto w-full max-w-[68rem] px-6 pb-[16svh] pt-[22svh] md:px-10">
        <MetaBar items={["Series 01 · Essay 05", "Reserve", "Published 07.2026"]} />
        <h1 className="mt-8 max-w-[20ch] font-display text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-paper">
          The harness has an expiration date. Ours mostly doesn&rsquo;t.
        </h1>

        <div className="mx-auto mt-14 max-w-[850px]">
          <div className="hairline-dashed-night space-y-7 pt-12 font-sans text-[17px] leading-[1.85] text-paper/85">
            <p>
              There is a line going around that we keep nodding at: as the models
              get stronger, the harness around them matters less. The scaffolding
              you built to make a weaker model reliable — the prompt chains, the
              routing layers, the retrieval bolted on to paper over a short
              context, the loops that catch the model&rsquo;s mistakes — is a tax
              you pay for a gap in capability, and each new generation closes some
              of the gap. People have started treating this as the bitter lesson
              arriving for agents: every piece of harness logic should carry an
              expiration date, and when the next model can do the thing without
              your scaffolding, you delete the scaffolding. Teams have been
              deleting in public — tools removed, retrieval systems torn out,
              whole routing layers replaced with a plain handoff.
            </p>
            <p>
              We think that is exactly right, and also that it is being used to
              argue something false. There is a competing claim, just as loud,
              that the harness is now <em>the</em> lever — that in 2026 the
              marginal reliability of an agent comes more from the harness than
              from swapping in a slightly better model. Both camps are describing
              real things. They are just not describing the same harness.
            </p>
            <p>
              Because &ldquo;harness&rdquo; is two different objects wearing one
              word. One kind exists only to compensate for what the model cannot
              yet do on its own. The other exists to hold what the model will
              never do for itself, no matter how smart it gets. The first has an
              expiration date. The second compounds.
            </p>

            <TwoHarnesses />

            <p>
              The compensating harness is the one the bitter lesson is right
              about. Prompt scaffolding, error-correction loops, elaborate
              routing, retrieval standing in for a weak context window — every one
              of these is a bet that the model is worse than it will be next
              quarter. Treat that code as a consumable. We write it freely and we
              delete it without ceremony; a skill that existed only to walk a
              weaker model through a task gets thrown out the week a stronger model
              can do the task cold. Keeping it would be sentimentality, and
              sentimental scaffolding is how a system rots.
            </p>
            <p>
              The durable harness is a different animal, and it is most of what we
              actually built. It is not there to make the model smarter. It is
              there to make the <em>company</em> real. A file-based brain that an
              agent maintains so that what we learn on Tuesday is still known in
              March — no model ships with your institution&rsquo;s memory. A
              scheduled heartbeat that keeps un-forgetful attention on the things
              that decay when no one is watching — no model volunteers a cadence.
              Gates on the two verbs that can hurt you, spending money and
              speaking outside the company — no model should be trusted to grant
              itself those, and a smarter one only raises the stakes. And, from
              the last essay, an evaluator kept structurally isolated from the
              thing it scores — a check the checked cannot touch. None of these
              are crutches for a weak model. They are the institutional layer, and
              a better model makes them more valuable, not less, because it does
              more per day and so needs a stronger memory, a firmer gate, a
              cleaner ledger.
            </p>
            <blockquote className="mx-auto max-w-[42ch] border-l border-paper/25 py-4 pl-6 font-display not-italic text-[clamp(1.35rem,2.3vw,1.75rem)] leading-[1.35] text-paper/90">
              The question was never how much harness. It is which harness — the
              kind a smarter model deletes, or the kind a smarter model needs
              more of.
            </blockquote>
            <p>
              This is why our operating system does not look like a pile of
              prompt engineering, even though we are two engineers who could have
              built exactly that. The parts we invest in are the parts with no
              expiration date: memory, cadence, permission, accountability. The
              parts we hold loosely are the ones a model release can obsolete
              overnight. When a new model lands, our first move is subtraction —
              we go looking for the scaffolding it just made pointless and we
              remove it — and our second move is to notice that the durable layer
              now carries more weight, because the agent wearing it just got more
              capable of doing damage as well as work.
            </p>
            <p>
              So we nod at the line, with an edit. As the models get stronger, the
              harness that <em>apologized</em> for them matters less, and you
              should be deleting it on a schedule. The harness that
              <em> remembers, gates, paces, and holds to account</em> matters
              more. A company that only heard the first half will keep tearing out
              scaffolding until it has torn out its own institution. We are trying
              to build the half that survives the next model — and the one after
              that.
            </p>
          </div>

          <footer className="hairline-dashed-night mt-16 grid grid-cols-1 gap-4 pt-8 md:grid-cols-[220px_1fr]">
            <span className="kicker text-paper/50">Author</span>
            <div>
              <p className="font-display text-xl leading-snug text-paper">
                Reserve — curators, one brain.
              </p>
              <Link
                href="/research"
                className="label-mono link-underline mt-5 inline-block text-paper/60"
              >
                ← all research
              </Link>
            </div>
          </footer>

          <CtaBand
            line="New essays land as we learn."
            label="Get pinged when they do"
            subject="Research pings"
          />
        </div>
      </article>
    </main>
  );
}
