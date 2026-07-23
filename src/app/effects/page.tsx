import type { Metadata } from "next";
import {
  AppleNav,
  Page,
  Section,
  Eyebrow,
  H2,
  Body,
  Rule,
  Tile,
  CtaButton,
  Footer,
  apple,
} from "@/components/apple/kit";

export const metadata: Metadata = {
  title: "Reserve — effects & testimonials",
  description: "What changes when Reserve deploys: systems in production, decisions made faster, and partners who extend.",
};

/** Copy carried over verbatim from the previous Subpage entries; the old `tag`
 *  and `spec` strings survive as the tile kicker so no status token is lost. */
const EFFECTS = [
  {
    kicker: "Shipped · production systems",
    title: "AI in production, not in planning",
    body: "Every engagement ends with running systems the client's own team operates — ranking engines, vision pipelines, reasoning tools.",
    href: "/frontiers",
    cta: "See the frontier work",
  },
  {
    kicker: "Compounding · retention · words pending",
    title: "Engagements that extend",
    body: "Frontiers keep us past the first project — the strongest effect we can show. Their words will live here, verbatim, as they give them.",
    href: "/frontiers",
    cta: "See the frontier work",
  },
];

export default function EffectsPage() {
  return (
    <Page>
      <AppleNav />

      <Section center>
        <h1 className={apple.hero}>What changes when we arrive.</h1>
        <p className={apple.sub}>
          The measure of a frontier engagement is simple: systems in production,
          decisions made faster, and a team that keeps us. Four frontiers run
          Reserve-built AI today — travel, sports vision, health, legal.
        </p>
      </Section>

      <Rule />

      <Section tinted>
        <div className={apple.center}>
          <Eyebrow>Effects</Eyebrow>
          <H2>Shipped, then compounding.</H2>
        </div>
        <div className={apple.grid2}>
          {EFFECTS.map((e) => (
            <Tile key={e.title} {...e} />
          ))}
        </div>
      </Section>

      <Section center>
        <H2>Ask what we&rsquo;d ship for you.</H2>
        <Body center>
          Tell us the frontier. We&rsquo;ll tell you what we would put into
          production, and how fast.
        </Body>
        <CtaButton subject="Hello Reserve" label="Write to us" />
      </Section>

      <Footer />
    </Page>
  );
}
