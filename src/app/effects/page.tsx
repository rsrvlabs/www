import type { Metadata } from "next";
import { Subpage, Entry } from "@/components/site/subpage";

export const metadata: Metadata = {
  title: "Reserve — effects & testimonials",
  description: "What changes when Reserve deploys: systems in production, decisions made faster, and partners who extend.",
};

export default function EffectsPage() {
  return (
    <Subpage
      index="E"
      label="Effects & testimonials"
      current="/effects"
      title="What changes when we arrive."
      intro="The measure of a frontier engagement is simple: systems in production, decisions made faster, and a team that keeps us. Four frontiers run Reserve-built AI today — travel, sports vision, health, legal."
      cta={{
        line: "Ask what we'd ship for you.",
        label: "Write to us",
        subject: "Hello Reserve",
      }}
    >
      <Entry
        tag="SHIPPED"
        title="AI in production, not in planning"
        blurb="Every engagement ends with running systems the client's own team operates — ranking engines, vision pipelines, reasoning tools."
        spec="shipped · production systems"
      />
      <Entry
        tag="COMPOUNDING"
        title="Engagements that extend"
        blurb="Frontiers keep us past the first project — the strongest effect we can show. Their words will live here, verbatim, as they give them."
        spec="compounding · retention · words pending"
      />
    </Subpage>
  );
}
