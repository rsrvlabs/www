import Link from "next/link";
import { AppleNav, Page, Section, CtaButton, Footer, apple } from "@/components/apple/kit";
import m from "../mock.module.css";

/** MOCK B — 主張先行 (the stance).
 *  The hero is a position, not an introduction: one rule that explains the whole
 *  company, then the rest of what the house believes as the page's architecture.
 *  The works sit underneath as evidence the beliefs produced something.
 *  Reference: 37signals — a numbered manifesto is the homepage; products are
 *  two links in the corner. Founder review only; not in nav or sitemap. */

export const metadata = {
  title: "Reserve — mock B",
  robots: { index: false, follow: false },
};

const STANCE: Array<[string, string, string]> = [
  [
    "01",
    "Products first. Engagements pay for them.",
    "Client work funds the products, never the other way round. It also keeps us honest — you cannot sell an AI system into production and still believe your own slides.",
  ],
  [
    "02",
    "Ship weekly, in public.",
    "Every week something leaves the building: a build, an essay, a note on what broke. Nothing waits for a launch date that keeps moving.",
  ],
  [
    "03",
    "Every claim shows its work.",
    "Numbers come with their workings and sources; a finding that cannot be traced does not get published. It is the same standard we hold our own desk to.",
  ],
  [
    "04",
    "AI-native, from the inside out.",
    "The company runs on an operating system we built. Agents hold standing jobs — the digest, the sweep, the board — and a human signs anything that leaves the building.",
  ],
  [
    "05",
    "Finish in the real world.",
    "Software that ends on a screen is only half of the thing. Limere is not finished until you and the other person are in the same room.",
  ],
  [
    "06",
    "Say the boring part out loud.",
    "What failed, what we stopped building, what we still cannot prove — the journal is where that goes, unedited.",
  ],
];

const WORKS: Array<{ name: string; body: string; meta: string; href: string }> = [
  {
    name: "Limere",
    body: "A dating app you finish in person — you only meet the people you actually crossed paths with.",
    meta: "Flagship",
    href: "/limere",
  },
  {
    name: "Reserve Finance",
    body: "A US-equities desk that scores the market, publishes the brief, and answers for the call.",
    meta: "Labs",
    href: "/labs",
  },
  {
    name: "Glow",
    body: "Beauty tech, on the bench.",
    meta: "Labs",
    href: "/labs",
  },
  {
    name: "Forward deployment",
    body: "Senior engineers embedded in a client's team, shipping AI systems into production.",
    meta: "Frontiers",
    href: "/frontiers",
  },
];

export default function MockB() {
  return (
    <Page>
      <AppleNav />

      <Section center>
        <p className={m.tag}>Reserve · an AI-native studio in Taipei</p>
        <h1 className={apple.display}>Products first. Engagements pay for them.</h1>
        <p className={apple.sub}>
          One rule decides the rest — what we build, what we turn down, how fast
          it ships. Here is the rest of it, and the four things it has produced.
        </p>
      </Section>

      <Section tinted>
        <div className={m.stance}>
          {STANCE.map(([n, title, body]) => (
            <div className={m.stanceItem} key={n}>
              <p className={m.stanceNum}>{n}</p>
              <h2 className={m.stanceTitle}>{title}</h2>
              <p className={m.stanceBody}>{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className={apple.h2}>What it has produced.</h2>
        <div className={m.index}>
          {WORKS.map((w) => (
            <Link key={w.name} href={w.href} className={m.row}>
              <span className={m.num}>&mdash;</span>
              <span>
                <h3 className={m.rowName}>{w.name}</h3>
                <p className={m.rowBody}>{w.body}</p>
              </span>
              <span className={m.rowMeta}>{w.meta}</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section center>
        <h2 className={apple.h2}>Disagree? Write to us.</h2>
        <p className={m.ledeCenter}>
          Early access, an embedded team, or an argument about any of the six.
          One address — we answer everything.
        </p>
        <CtaButton subject="Hello Reserve" label="Get in touch" />
      </Section>

      <Footer />
    </Page>
  );
}
