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
  Section,
  apple,
  CONTACT,
} from "@/components/apple/kit";

export const metadata: Metadata = {
  title: "Reserve Labs — finance & beauty tech",
  description: "The product lab: a market desk that publishes while you sleep, an advisor that shows its work, and beauty tech in the making.",
};

const ENTRIES = [
  {
    tag: "LIVE · 08:00 DAILY",
    title: "A market desk that publishes itself",
    blurb:
      "Reserve Finance runs a cold, quantitative US-equities desk that generates and publishes its own morning brief at 08:00 every trading day. Numbers and probabilities, zero hype. No human touches it.",
  },
  {
    tag: "Advisor",
    title: "Reasoning you can audit",
    blurb:
      "An advisor that never hands down a verdict: every read comes with its full reasoning chain, its data, and its uncertainty. Teach-the-why, from first principles — you leave understanding the market, not just obeying a call.",
  },
  {
    tag: "Beauty",
    title: "Glow — beauty, instrumented",
    blurb:
      "AI meets beauty tech: personal, sensor-informed, and opinionated. The lab's next character.",
  },
];

export default function LabsPage() {
  return (
    <Page>
      <AppleNav />

      {/* Hero — one large line, one quiet line, two ways in */}
      <Section center>
        <h1 className={apple.hero}>The lab ships while you sleep.</h1>
        <p className={apple.sub}>
          Small products with sharp edges. The finance desk already runs itself — every
          trading day, before anyone wakes up. The rest of the lab is heading the same way.
        </p>
        <div className={apple.linkRow}>
          <a
            className={apple.link}
            href={`mailto:${CONTACT}?subject=${encodeURIComponent("Reserve Finance Discord invite")}`}
          >
            Ask for the Discord invite &rsaquo;
          </a>
          <a className={apple.link} href="#lab">
            See what the lab ships &rsaquo;
          </a>
        </div>
      </Section>


      {/* The lab + the inventory */}
      <Section tinted center id="lab">
        <Eyebrow>The lab</Eyebrow>
        <H2>Software that runs itself.</H2>
        <Body center>
          The lab has one obsession: products that operate without a hand on the wheel.
          Reserve Finance already lives it — a market desk that researches, decides, and
          publishes every trading day before anyone is awake, and no human touches the
          output.
        </Body>
        <Body center>
          That is the bar for everything the lab ships next. Not a tool you drive. A thing
          that does the work and tells you what it found.
        </Body>

        <div className={apple.grid}>
          {ENTRIES.map((entry) => (
            <Card
              key={entry.title}
              kicker={entry.tag}
              title={entry.title}
              body={entry.blurb}
            />
          ))}
        </div>
      </Section>

      {/* The through-line */}
      <Section center>
        <Eyebrow>THE THROUGH-LINE</Eyebrow>
        <H2>Instrument it, then have an opinion.</H2>
        <Body center>
          Each product takes a domain people navigate on gut — the market, the mirror — and
          instruments it: turns it into signal, then into a point of view you can act on.
        </Body>
        <Body center>
          Not a dashboard that shrugs and leaves the judgement to you. A desk that
          publishes. An advisor that argues its case. The lab builds the opinion, not just
          the readout.
        </Body>
      </Section>


      {/* Close */}
      <Section tinted center>
        <H2>The desk publishes every trading day — watch it work.</H2>
        <CtaButton subject="Reserve Finance Discord invite" label="Ask for the Discord invite" />
      </Section>

      <Footer />
    </Page>
  );
}
