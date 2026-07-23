import type { Metadata } from "next";
import {
  AppleNav,
  Body,
  Card,
  CtaButton,
  Eyebrow,
  Footer,
  H2,
  Page,
  Rule,
  Section,
  apple,
  CONTACT,
} from "@/components/apple/kit";

export const metadata: Metadata = {
  title: "Reserve Frontiers — forward-deployed AI engineering",
  description: "Senior engineers embedded inside client teams, shipping AI systems into production across travel, sports CV, health wearables, and legal tech.",
};

const ENTRIES = [
  {
    tag: "TRAVEL",
    title: "Travel tech",
    blurb:
      "Production AI inside a travel platform — the systems that decide, rank, and respond while the traveler is still typing.",
    spec: "in production · travel · rank + respond",
  },
  {
    tag: "SPORTS CV",
    title: "Golf, seen by machines",
    blurb:
      "Computer vision that reads a swing the way a coach does — frame by frame, in production.",
    spec: "in production · golf · computer vision",
  },
  {
    tag: "HEALTH",
    title: "Health & wearables",
    blurb:
      "Wearable data turned into daily guidance — the same domain knowledge that powers our flagship.",
    spec: "in production · health · wearables",
  },
  {
    tag: "LEGAL",
    title: "Legal tech",
    blurb:
      "Applied AI where precision is non-negotiable: documents, citations, and judgment support.",
    spec: "in production · legal · documents",
  },
];

export default function FrontiersPage() {
  return (
    <Page>
      <AppleNav />

      {/* Hero */}
      <Section center>
        <h1 className={apple.hero}>We deploy into your team, and ship.</h1>
        <p className={apple.sub}>
          Every client is a frontier — a domain where AI hasn&rsquo;t been made to work yet.
          We embed inside the team, build with your people, and leave running systems. The
          frontier work feeds our products.
        </p>
        <div className={apple.linkRow}>
          <a
            className={apple.link}
            href={`mailto:${CONTACT}?subject=${encodeURIComponent("Frontier engagement")}`}
          >
            Start a conversation &rsaquo;
          </a>
          <a className={apple.link} href="#work">
            See the frontiers &rsaquo;
          </a>
        </div>
      </Section>

      <Rule />

      {/* The model + the frontiers */}
      <Section tinted center id="work">
        <Eyebrow>THE MODEL</Eyebrow>
        <H2>We don&rsquo;t consult. We deploy.</H2>
        <Body center>
          The model is forward deployment: senior engineers embedded inside your team,
          building with your people in your codebase — not a deck, not a pilot that dies in
          procurement. We leave running systems behind.
        </Body>
        <Body center>
          A frontier is any domain where AI hasn&rsquo;t been made to work yet. We take the
          ones others call too messy, and ship the thing that works.
        </Body>

        <div className={apple.grid2}>
          {ENTRIES.map((entry) => (
            <Card
              key={entry.title}
              kicker={entry.tag}
              title={entry.title}
              body={entry.blurb}
              spec={entry.spec}
            />
          ))}
        </div>
      </Section>

      {/* Why it compounds */}
      <Section center>
        <Eyebrow>WHY IT COMPOUNDS</Eyebrow>
        <H2>Client work that pays us twice.</H2>
        <Body center>
          A frontier engagement is not a detour from the products — it is how they get
          sharper. The health &amp; wearables work is the same domain knowledge behind our
          flagship; the ranking systems, the vision pipelines, the judgment tooling all
          return as capability.
        </Body>
        <Body center>
          Cash flow one way, know-how the other. We get paid to learn what we would have had
          to learn anyway.
        </Body>
      </Section>

      <Rule />

      {/* Close */}
      <Section tinted center>
        <H2>Have a frontier? It starts with one email.</H2>
        <CtaButton subject="Frontier engagement" label="Start a conversation" />
      </Section>

      <Footer />
    </Page>
  );
}
