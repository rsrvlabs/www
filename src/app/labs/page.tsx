import type { Metadata } from "next";
import { Subpage, Entry } from "@/components/site/subpage";

export const metadata: Metadata = {
  title: "Reserve Labs — finance & beauty tech",
  description: "The product lab: a quant market desk that publishes while you sleep, an advisor that shows its work, and beauty tech in the making.",
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
        subject: "Fermi Discord invite",
      }}
    >
      <Entry
        tag="LIVE · 08:00 DAILY"
        title="Fermi — the morning brief"
        blurb="A cold, quantitative US-equities desk that generates and publishes its own morning brief at 08:00 every trading day. Numbers and probabilities, zero hype. No human touches it."
        spec="live · us-equities · daily 08:00"
      />
      <Entry
        tag="ADVISOR"
        title="Feynman — reasoning you can audit"
        blurb="An advisor that never hands down a verdict: every read comes with its full reasoning chain, its data, and its uncertainty. Teach-the-why, from first principles."
        spec="experimental · advisor · reasoning + uncertainty"
      />
      <Entry
        tag="BEAUTY"
        title="Glow — beauty, instrumented"
        blurb="AI meets beauty tech: personal, sensor-informed, and opinionated. The lab's next character."
        spec="exploring · beauty tech"
      />
    </Subpage>
  );
}
