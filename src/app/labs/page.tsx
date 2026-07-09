import type { Metadata } from "next";
import { Subpage, Entry, Movement } from "@/components/site/subpage";

export const metadata: Metadata = {
  title: "Reserve Labs — finance & beauty tech",
  description: "The product lab: a market desk that publishes while you sleep, an advisor that shows its work, and beauty tech in the making.",
};

export default function LabsPage() {
  return (
    <Subpage
      index="L"
      label="Labs"
      current="/labs"
      title="The lab ships while you sleep."
      intro="Small products with sharp edges. The finance desk already runs itself — every trading day, before anyone wakes up. The rest of the lab is heading the same way."
      cta={{
        line: "The desk publishes every trading day — watch it work.",
        label: "Ask for the Discord invite",
        subject: "Reserve Finance Discord invite",
      }}
    >
      <Movement kicker="THE LAB" title="Software that runs itself.">
        <p>
          The lab has one obsession: products that operate without a hand on
          the wheel. Reserve Finance already lives it — a market desk that
          researches, decides, and publishes every trading day before anyone is
          awake, and no human touches the output.
        </p>
        <p>
          That is the bar for everything the lab ships next. Not a tool you
          drive. A thing that does the work and tells you what it found.
        </p>
      </Movement>

      <Entry
        tag="LIVE · 08:00 DAILY"
        title="A market desk that publishes itself"
        blurb="Reserve Finance runs a cold, quantitative US-equities desk that generates and publishes its own morning brief at 08:00 every trading day. Numbers and probabilities, zero hype. No human touches it."
        spec="live · us-equities · daily 08:00"
      />
      <Entry
        tag="ADVISOR"
        title="Reasoning you can audit"
        blurb="An advisor that never hands down a verdict: every read comes with its full reasoning chain, its data, and its uncertainty. Teach-the-why, from first principles — you leave understanding the market, not just obeying a call."
        spec="experimental · advisor · reasoning + uncertainty"
      />
      <Entry
        tag="BEAUTY"
        title="Glow — beauty, instrumented"
        blurb="AI meets beauty tech: personal, sensor-informed, and opinionated. The lab's next character."
        spec="exploring · beauty tech"
      />

      <Movement kicker="THE THROUGH-LINE" title="Instrument it, then have an opinion.">
        <p>
          Each product takes a domain people navigate on gut — the market, the
          mirror — and instruments it: turns it into signal, then into a point
          of view you can act on.
        </p>
        <p>
          Not a dashboard that shrugs and leaves the judgement to you. A desk
          that publishes. An advisor that argues its case. The lab builds the
          opinion, not just the readout.
        </p>
      </Movement>
    </Subpage>
  );
}
