import Image from "next/image";
import Link from "next/link";
import { AppleNav, Page, Section, CtaButton, Footer, apple, CONTACT } from "@/components/apple/kit";
import m from "../mock.module.css";

/** MOCK B v3 — the house, rebalanced after founder review 2026-08-02.
 *  v2 read as a Limere landing page. It isn't: Frontiers is the commercial
 *  engine and the thing visitors actually write in about, so it leads the index
 *  and gets the first explanation; Limere keeps the flagship label but sits at
 *  product scale, not page scale; Reserve Finance stays in internal testing and
 *  shares one quiet Labs line with Glow. Copy is post-de-AI pass (v2).
 *  Founder review only; not in nav or sitemap. */

export const metadata = {
  title: "Reserve — mock B",
  robots: { index: false, follow: false },
};

/** The shape of the house, in the order a visitor cares about it. */
const HOUSE: Array<{ name: string; body: string; meta: string; href: string }> = [
  {
    name: "Frontiers",
    body: "Senior engineers who embed in your team and build in your codebase. Four domains are running in production: travel, sports vision, health, legal.",
    meta: "Engineering · open",
    href: "/frontiers",
  },
  {
    name: "Limere",
    body: "A dating app that only counts if you meet in person. You see the people whose paths actually crossed yours, one room at a time.",
    meta: "Flagship · in testing",
    href: "/limere",
  },
  {
    name: "Labs",
    body: "Reserve Finance and Glow. Both in testing, both quiet for now — we'll say more when they are ready to be used.",
    meta: "In testing",
    href: "/labs",
  },
];

const STANCE: Array<[string, string, string]> = [
  [
    "01",
    "Products first.",
    "The engagements pay for the products. We don't build products to win engagements. Working inside someone else's production system also keeps us honest about what ships and what only demos well.",
  ],
  [
    "02",
    "Something leaves every week.",
    "A build, or an essay. Some weeks it is a note about what broke. Nothing here waits for a launch date that keeps moving.",
  ],
  [
    "03",
    "Show the workings.",
    "If a number can't be traced back to where it came from, we don't publish it. That started as a rule for our own research and now covers everything we put out.",
  ],
  [
    "04",
    "AI-native, and specific about it.",
    "The company runs on an operating system we built. Agents here hold standing jobs and keep them, so the digest goes out whether or not anyone is awake. Nothing reaches you without a human signing it first.",
  ],
  [
    "05",
    "It has to end in the real world.",
    "An app that finishes on the screen is only half of Limere. It isn't done until you and the other person are in the same room. That constraint has cost us features we liked.",
  ],
  [
    "06",
    "We write down what didn't work.",
    "The journal carries the failures too: what we stopped building, what we still can't prove. Not out of humility. It is the only way to remember.",
  ],
];

export default function MockB() {
  return (
    <Page>
      <AppleNav />

      <Section center>
        <p className={m.tag}>Reserve · an AI-native studio in Taipei</p>
        <h1 className={apple.display}>We build our own products, and we ship yours.</h1>
        <p className={apple.sub}>
          Most of what pays the bills is the second half: our engineers embed in
          your team and put AI systems into production. The rest of the studio
          builds Limere, and two products that aren&rsquo;t ready to talk about.
        </p>
        <div className={apple.linkRow}>
          <a
            className={apple.link}
            href={`mailto:${CONTACT}?subject=${encodeURIComponent("Frontier engagement")}`}
          >
            Start an engagement &rsaquo;
          </a>
          <a className={apple.link} href="/limere">
            Meet Limere &rsaquo;
          </a>
        </div>
      </Section>

      <Section>
        <div className={m.index}>
          {HOUSE.map((w) => (
            <Link key={w.name} href={w.href} className={m.row}>
              <span className={m.num}>&mdash;</span>
              <span>
                <h2 className={m.rowName}>{w.name}</h2>
                <p className={m.rowBody}>{w.body}</p>
              </span>
              <span className={m.rowMeta}>{w.meta}</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tinted center>
        <p className={m.tag}>The engineering practice</p>
        <h2 className={apple.h2}>We don&rsquo;t consult. We deploy.</h2>
        <p className={m.ledeCenter}>
          Senior engineers work inside your team, in your codebase, and leave
          running systems behind. Not a deck, and not a pilot that dies in
          procurement. The domains we have taken so far were the ones people call
          too messy.
        </p>
        <div className={apple.linkRow}>
          <a className={apple.link} href="/frontiers">
            How an engagement works &rsaquo;
          </a>
        </div>
      </Section>

      <Section center>
        <p className={m.tag}>The flagship</p>
        <h2 className={apple.h2}>Limere</h2>
        <p className={m.ledeCenter}>
          Everything in the app exists to get you to the part that happens off
          the screen. In testing now.
        </p>
        <div className={m.still}>
          <Image
            src="/limere/nearby-en.png"
            alt="Limere on iPhone — the people you actually crossed paths with"
            width={780}
            height={1696}
          />
        </div>
      </Section>

      <Section tinted>
        <p className={m.tag}>How we work</p>
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

      <Section center>
        <h2 className={apple.h2}>Write to us.</h2>
        <p className={m.ledeCenter}>
          An engagement, early access to Limere, or an argument about any of the
          six. One address, and we answer everything.
        </p>
        <CtaButton subject="Hello Reserve" label="Get in touch" />
      </Section>

      <Footer />
    </Page>
  );
}
