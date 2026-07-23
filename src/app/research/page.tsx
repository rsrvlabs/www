import type { Metadata } from "next";
import {
  AppleNav,
  Body,
  CtaButton,
  Footer,
  H2,
  Page,
  Section,
  Tile,
  apple,
} from "@/components/apple/kit";

export const metadata: Metadata = {
  title: "Reserve Research — notes on running an AI-native company",
  description:
    "Field notes from a studio run on an AI-native operating system — one shared brain, agents with jobs, humans making the calls.",
};

/**
 * Blog INDEX in the Apple grammar (Ryvn 2026-07-23: the whole site follows
 * Apple design): centered hero → a two-up grid of product tiles, one per
 * essay. Titles and descriptions are the published ones, verbatim.
 */

const essays: Array<{
  kicker: string;
  title: string;
  body: string;
  href: string;
}> = [
  {
    kicker: "The thesis",
    title: "The AI-native company",
    body: "Series 01, essay 01: what changes when a studio runs on an AI operating system — one shared brain, agents with jobs, humans making the calls.",
    href: "/research/ai-native-company",
  },
  {
    kicker: "Org design",
    title: "Does an AI-native company still need departments?",
    body: "Series 01, essay 02: a department is a standing promise to keep paying attention to a domain. We deleted the org chart and wrote a schedule instead — and here is what that traded away.",
    href: "/research/departments",
  },
  {
    kicker: "Prior art",
    title: "We went looking for someone already doing this.",
    body: "Series 01, essay 03: we scanned the field for a company already run by one agentic brain, hoping to copy it. What we found was a lot of tools, a few demos, and one empty quadrant.",
    href: "/research/prior-art",
  },
  {
    kicker: "Verification",
    title: "Don't let the agent grade itself.",
    body: "Series 01, essay 04: 2026's agent bottleneck isn't generation, it's verification — and the deepest failure is self-evaluation. Unless the evaluator is isolated from the evaluated, no score can be trusted. Here is the structure we run instead.",
    href: "/research/agent-self-evaluation",
  },
  {
    kicker: "Harness",
    title: "The harness has an expiration date. Ours mostly doesn't.",
    body: "Series 01, essay 05: as models get stronger, the bitter lesson says delete your scaffolding. True — for the harness that compensates for a weak model. But a second harness (memory, accountability, permission, cadence) compounds instead of expiring. Here's how we tell them apart.",
    href: "/research/harness-that-compounds",
  },
  {
    kicker: "Design law",
    title: "Build the floor, not the ceiling.",
    body: "Series 01, essay 06: in 2026 guardrails became the bottleneck. But a gate is either a floor (guarantees an outcome, scales with the model) or a ceiling (restricts a process, expires). Build floors; keep only the irreversible as a thin membrane. The design law that closes the harness trilogy.",
    href: "/research/build-the-floor",
  },
];

export default function ResearchPage() {
  return (
    <Page>
      <AppleNav />

      <Section center>
        <h1 className={apple.hero}>One studio. One brain. Agents with jobs.</h1>
        <p className={apple.sub}>
          We run this company on an operating system we built: one shared brain,
          agents with jobs, humans making the calls. These notes document the
          experiment in public.
        </p>
        <Body center>
          Does an AI-native company still need departments? What replaces the
          meeting? Essays from inside the experiment — written as we learn, not
          after we&apos;ve won.
        </Body>
      </Section>

      <Section>
        <div className={apple.grid2}>
          {essays.map((e) => (
            <Tile
              key={e.href}
              kicker={e.kicker}
              title={e.title}
              body={e.body}
              href={e.href}
              cta="Read"
            />
          ))}
        </div>
        <p className={`${apple.articleMeta} ${apple.center}`}>
          In progress — 07 · What replaces the meeting?
        </p>
      </Section>

      <Section center>
        <H2>New essays land as we learn.</H2>
        <CtaButton subject="Research pings" label="Get pinged when they do" />
      </Section>

      <Footer />
    </Page>
  );
}
