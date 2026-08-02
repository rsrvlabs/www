import Image from "next/image";
import Link from "next/link";
import { AppleNav, Page, Section, Eyebrow, H2, Tile, CtaButton, Footer, apple } from "@/components/apple/kit";
import m from "../mock.module.css";

/** MOCK C — 混合 (the editorial house).
 *  Hero answers "what is this company" in one sentence that names the products,
 *  then the page runs an editorial rhythm: the works, the journal, the stance,
 *  the door. Reference: Every — a small AI-native house with products, writing
 *  and engagements under one roof. Founder review only; not in nav or sitemap. */

export const metadata = {
  title: "Reserve — mock C",
  robots: { index: false, follow: false },
};

const WORKS = [
  {
    kicker: "Flagship",
    title: "Limere",
    body: "A dating app you finish in person. You only meet the people you actually crossed paths with — one room at a time.",
    href: "/limere",
  },
  {
    kicker: "Labs",
    title: "Reserve Finance",
    body: "A US-equities desk that reasons in public — it scores the market, publishes its brief, and answers for the call.",
    href: "/labs",
  },
  {
    kicker: "Labs",
    title: "Glow",
    body: "Beauty tech, in the making — the third work on the bench.",
    href: "/labs",
  },
  {
    kicker: "Frontiers",
    title: "Forward deployment",
    body: "Senior engineers embedded inside a client's team, shipping AI systems into production.",
    href: "/frontiers",
  },
];

const JOURNAL: Array<[string, string, string]> = [
  ["Essay 11", "Apps for meeting nearby keep dying.", "/research/graveyard"],
  ["Essay 10", "YC put a name on the company brain.", "/research/company-brain"],
  ["Essay 09", "The bottleneck moved.", "/research/bottleneck-moved"],
  ["Essay 06", "Don't let the agent grade itself.", "/research/agent-self-evaluation"],
];

const STANCE: Array<[string, string]> = [
  [
    "Products first.",
    "A few embedded engagements pay for them — never the other way round.",
  ],
  [
    "Every claim shows its work.",
    "Numbers arrive with their workings; findings that can't be traced don't ship.",
  ],
  [
    "A human signs the call.",
    "Agents hold standing jobs here. Nothing leaves the building unsigned.",
  ],
];

export default function MockC() {
  return (
    <Page>
      <AppleNav />

      <Section center>
        <h1 className={apple.display}>We ship products, and publish how.</h1>
        <p className={apple.sub}>
          Reserve is an AI-native studio in Taipei. Limere is our flagship — a
          dating app you finish in person. Reserve Finance publishes a daily
          US-equities brief. Glow is on the bench. A few embedded engagements
          pay for all of it.
        </p>
        <div className={apple.linkRow}>
          <a className={apple.link} href="/limere">
            Meet Limere &rsaquo;
          </a>
          <a className={apple.link} href="/research">
            Read the journal &rsaquo;
          </a>
        </div>

        <div className={m.stillRow}>
          <div>
            <Image src="/limere/nearby-en.png" alt="Limere — nearby" width={780} height={1696} priority />
          </div>
          <div>
            <Image src="/limere/venue-en.png" alt="Limere — the room" width={780} height={1696} />
          </div>
          <div>
            <Image src="/limere/detail-en.png" alt="Limere — a person" width={780} height={1696} />
          </div>
        </div>
      </Section>

      <Section tinted>
        <div className={apple.center}>
          <Eyebrow>The works</Eyebrow>
          <H2>Four things on the bench.</H2>
        </div>
        <div className={apple.grid2}>
          {WORKS.map((w) => (
            <Tile key={w.title} {...w} />
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>The journal</Eyebrow>
        <H2>We publish what we learn, weekly.</H2>
        <div className={m.journal}>
          {JOURNAL.map(([meta, title, href]) => (
            <Link key={href} href={href} className={m.jrow}>
              <span className={m.jmeta}>{meta}</span>
              <p className={m.jtitle}>{title}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section tinted>
        <Eyebrow>How we work</Eyebrow>
        <H2>Three rules, and we say them out loud.</H2>
        <div className={m.stance}>
          {STANCE.map(([title, body]) => (
            <div className={m.stanceItem} key={title}>
              <h3 className={m.stanceTitle}>{title}</h3>
              <p className={m.stanceBody}>{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section center>
        <H2>One address.</H2>
        <p className={m.ledeCenter}>
          Early access to Limere, an embedded team, or the journal — we answer
          everything.
        </p>
        <CtaButton subject="Hello Reserve" label="Get in touch" />
      </Section>

      <Footer />
    </Page>
  );
}
