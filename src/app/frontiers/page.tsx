import type { Metadata } from "next";
import { Subpage, Entry } from "@/components/site/subpage";

export const metadata: Metadata = {
  title: "Reserve Frontiers — forward-deployed AI engineering",
  description: "Senior engineers embedded inside client teams, shipping AI systems into production across travel, sports CV, health wearables, and legal tech.",
};

export default function FrontiersPage() {
  return (
    <Subpage
      index="R"
      label="Frontiers"
      title="We deploy into your team, and ship."
      intro="Every client is a frontier: a domain where AI hasn't been made to work yet. We embed senior engineers inside the team, build with your people, and leave running systems — not slide decks. The frontier work funds our products and feeds them domain knowledge."
    >
      <Entry
        tag="TRAVEL"
        title="Travel tech"
        blurb="Production AI inside a travel platform — the systems that decide, rank, and respond while the traveler is still typing."
      />
      <Entry
        tag="SPORTS CV"
        title="Golf, seen by machines"
        blurb="Computer vision that reads a swing the way a coach does — frame by frame, in production."
      />
      <Entry
        tag="HEALTH"
        title="Health & wearables"
        blurb="Wearable data turned into daily guidance — the same domain knowledge that powers our flagship."
      />
      <Entry
        tag="LEGAL"
        title="Legal tech"
        blurb="Applied AI where precision is non-negotiable: documents, citations, and judgment support."
      />
    </Subpage>
  );
}
