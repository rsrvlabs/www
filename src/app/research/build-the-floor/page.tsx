import type { Metadata } from "next";
import { AppleNav, Footer, Page, Section, apple } from "@/components/apple/kit";

export const metadata: Metadata = {
  title: "Build the floor, not the ceiling — Reserve Research",
  description:
    "Series 01, essay 06: in 2026 guardrails became the bottleneck. But a gate is either a floor (guarantees an outcome, scales with the model) or a ceiling (restricts a process, expires). Build floors; keep only the irreversible as a thin membrane. The design law that closes the harness trilogy.",
  keywords: [
    "AI agent guardrails",
    "agent permissions",
    "harness design",
    "least agency",
    "verification vs restriction",
    "AI-native company",
  ],
};


export default function BuildTheFloorEssay() {
  return (
    <Page>
      <AppleNav />

      <Section center>
        <h1 className={apple.hero}>Build the floor, not the ceiling.</h1>
        <p className={apple.sub}>
          A gate either guarantees an outcome or restricts a process. One scales
          with the model. The other expires.
        </p>
        <p className={apple.articleMeta}>
          Series 01 · Essay 06 · Published 07.2026 · Reserve — curators, one brain.
        </p>
      </Section>

      <Section>
        <div className={apple.article}>
          <p>
            By 2026 the thing slowing agents down was no longer the model. It
            was the guardrails. As teams put agents into real operations —
            reportedly the large majority of deployed agents are past planning
            and actually running, while only a sliver have full security
            sign-off and most organizations have already had an agent-security
            incident — the industry did the reasonable thing and wrapped them
            in controls: scoped permissions, approval steps, restricted tools.
            And then noticed the controls had become the bottleneck. Security
            that adds latency chokes an agent that wants to act thousands of
            times a minute; a permission that made a weak agent safe makes a
            strong agent slow.
          </p>
          <p>
            This is the third of three notes on the harness — the scaffolding
            a company wraps around a model. The first argued that you must not
            let an agent grade its own work: keep the evaluator isolated from
            the evaluated. The second argued that most of your harness has an
            expiration date, except the part that compounds. This one is about
            the guardrails specifically, because the same confusion runs
            through all the hand-wringing about agent control: people talk
            about &ldquo;adding a gate&rdquo; as if all gates were the same
            thing. They are not. A gate is one of two opposite objects, and
            they age in opposite directions.
          </p>
          <p>
            A <em>ceiling</em> is a gate that restricts a process: you may only
            do this, you may not touch that, at most N turns, not that tool. A
            <em> floor</em> is a gate that guarantees an outcome: the result
            must pass this check before it counts. They feel similar when the
            model is weak — both keep it out of trouble. They come apart as the
            model gets strong.
          </p>


          <p>
            A ceiling caps what a capable model is allowed to attempt, so it
            starts to bind at exactly the moment the model gets good enough to
            exceed it. The capability is there; the harness refuses to let you
            spend it. That gap widens with every model release — capability you
            paid for and threw away — and it is why the &ldquo;delete your
            scaffolding as the model improves&rdquo; instinct is right about
            this kind of gate. A ceiling is the compensating harness wearing a
            safety badge.
          </p>
          <p>
            A floor does the opposite. It does not say how the work may be
            done; it says what the finished work must survive. &ldquo;An agent
            may not commit code&rdquo; is a ceiling. &ldquo;Any commit must
            pass the full test suite and be revertible&rdquo; is a floor — the
            same safety requirement, but now a stronger model is free to do
            more and the guarantee still holds, because it was never about
            restraining the model, only about verifying the result. This is the
            first note&rsquo;s lesson turned into a build rule: verification is
            a floor that scales, restriction is a ceiling that expires. So the
            move, almost every time you reach for a gate, is not to add a
            ceiling — it is to rewrite the ceiling as a floor.
          </p>
          <p>
            <strong>
              Ask of every gate: does it guarantee an outcome, or restrict a
              process? Guarantee, keep. Restrict, delete — or turn it into a
              guarantee.
            </strong>
          </p>
          <p>
            There is one honest exception, and getting it wrong in either
            direction is how teams end up either reckless or paralyzed. Some
            actions cannot be undone: spending money, sending a message to the
            outside world, deleting data, widening access. For those, verifying
            after the fact is no comfort — there is nothing to revert to. The
            floor there has to be a confirmation <em>before </em>the act. Keep
            that gate. But be precise about what it is constraining: not the
            model&rsquo;s capability — the world&rsquo;s irreversibility. That
            is why it does not age like a ceiling; a smarter model does not make
            a wire transfer more reversible. The industry is converging on the
            same shape from the risk-management side — heavy control and human
            approval on the high-consequence, irreversible actions, light
            oversight on everything else — which is just this floor, sorted by
            blast radius.
          </p>
          <p>
            The craft is to make that confirmation the <em>thinnest possible
            membrane</em>. Let the agent run all the way to the one irreversible
            step on its own, and stop it only there, for a single yes. A
            company that gates the whole approach to a risky action has built a
            ceiling and called it safety; a company that gates only the exact
            irreversible instant has kept the floor and given the model back
            everything above it. It is the difference between &ldquo;you may not
            go near the money&rdquo; and &ldquo;do all the work, and I&rsquo;ll
            confirm the transfer.&rdquo;
          </p>
          <p>
            So our own rule, the one the whole company runs under, is small. We
            gate the outward and the irreversible, as a thin confirm-before
            membrane, and almost nothing else. Everywhere reversible we prefer a
            floor we can verify over a restriction we would have to keep
            deleting. It is not a safety posture we tightened; it is one we
            designed to loosen by itself. Because a harness built as floors gets
            <em> more</em> valuable as the model improves — the guarantees hold,
            the ceiling was never there, the new capability lands as more work
            done inside the same envelope. A harness built as ceilings spends
            every model upgrade the same way: someone goes in and removes a
            limit before the improvement is allowed to arrive. Build the floor.
            Let the model raise the roof.
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
