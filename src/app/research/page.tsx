import type { Metadata } from "next";
import { Subpage, Entry } from "@/components/site/subpage";

export const metadata: Metadata = {
  title: "Reserve Research — notes on running an AI-native company",
  description: "Field notes from a two-person studio run on an AI-native operating system — one shared brain, agents with jobs, humans making the calls.",
};

export default function ResearchPage() {
  return (
    <Subpage
      index="Q"
      label="Research"
      title="Two founders. One brain. Agents with jobs."
      intro="We run this company on an AI-native operating system we built: a shared brain that remembers everything, agents that open tickets, run products, and review each other — and humans who make the calls. These notes document the experiment in public: the org design, the failures, and the parts that feel like the future."
    >
      <Entry
        tag="SERIES 01"
        title="The AI-native company"
        blurb="Does an AI-native company still need departments? What replaces the meeting? First essays in progress."
      />
    </Subpage>
  );
}
