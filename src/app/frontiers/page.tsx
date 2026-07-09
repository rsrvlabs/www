import type { Metadata } from "next";
import { Subpage, Entry, Movement } from "@/components/site/subpage";

export const metadata: Metadata = {
  title: "Reserve Frontiers — forward-deployed AI engineering",
  description: "Senior engineers embedded inside client teams, shipping AI systems into production across travel, sports CV, health wearables, and legal tech.",
};

export default function FrontiersPage() {
  return (
    <Subpage
      index="R"
      label="Frontiers"
      current="/frontiers"
      title="We deploy into your team, and ship."
      intro="Every client is a frontier — a domain where AI hasn't been made to work yet. We embed inside the team, build with your people, and leave running systems. The frontier work feeds our products."
      cta={{
        line: "Have a frontier? It starts with one email.",
        label: "Start a conversation",
        subject: "Frontier engagement",
      }}
    >
      <Movement kicker="THE MODEL" title="We don't consult. We deploy.">
        <p>
          The model is forward deployment: senior engineers embedded inside
          your team, building with your people in your codebase — not a deck,
          not a pilot that dies in procurement. We leave running systems
          behind.
        </p>
        <p>
          A frontier is any domain where AI hasn&rsquo;t been made to work yet.
          We take the ones others call too messy, and ship the thing that
          works.
        </p>
      </Movement>

      <Entry
        tag="TRAVEL"
        title="Travel tech"
        blurb="Production AI inside a travel platform — the systems that decide, rank, and respond while the traveler is still typing."
        spec="in production · travel · rank + respond"
      />
      <Entry
        tag="SPORTS CV"
        title="Golf, seen by machines"
        blurb="Computer vision that reads a swing the way a coach does — frame by frame, in production."
        spec="in production · golf · computer vision"
      />
      <Entry
        tag="HEALTH"
        title="Health & wearables"
        blurb="Wearable data turned into daily guidance — the same domain knowledge that powers our flagship."
        spec="in production · health · wearables"
      />
      <Entry
        tag="LEGAL"
        title="Legal tech"
        blurb="Applied AI where precision is non-negotiable: documents, citations, and judgment support."
        spec="in production · legal · documents"
      />

      <Movement kicker="WHY IT COMPOUNDS" title="Client work that pays us twice.">
        <p>
          A frontier engagement is not a detour from the products — it is how
          they get sharper. The health &amp; wearables work is the same domain
          knowledge behind our flagship; the ranking systems, the vision
          pipelines, the judgment tooling all return as capability.
        </p>
        <p>
          Cash flow one way, know-how the other. We get paid to learn what we
          would have had to learn anyway.
        </p>
      </Movement>
    </Subpage>
  );
}
