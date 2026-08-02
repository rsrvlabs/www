import Image from "next/image";
import Link from "next/link";
import { AppleNav, Page, Section, CtaButton, Footer, apple } from "@/components/apple/kit";
import m from "../mock.module.css";

/** MOCK B v2 — 主張先行 (the stance), revised after founder review 2026-08-02.
 *  Changes from v1: Limere is unmistakably the flagship (its own section with
 *  the product still); Reserve Finance is in internal testing so it drops to the
 *  same weight as Glow and both sit under one Labs line; and the copy was taken
 *  through a de-AI pass — the parallel triads, the em-dash appositives and the
 *  six identically-shaped imperative headings were the tell.
 *  Founder review only; not in nav or sitemap. */

export const metadata = {
  title: "Reserve — mock B",
  robots: { index: false, follow: false },
};

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

const REST: Array<{ name: string; body: string; meta: string; href: string }> = [
  {
    name: "Labs",
    body: "Reserve Finance and Glow. Both in testing, both quiet for now — we'll say more when they are ready to be used.",
    meta: "In testing",
    href: "/labs",
  },
  {
    name: "Frontiers",
    body: "Senior engineers embedded in a client's team, shipping AI systems into production. This is the work that pays for the rest.",
    meta: "Open",
    href: "/frontiers",
  },
];

export default function MockB() {
  return (
    <Page>
      <AppleNav />

      <Section center>
        <p className={m.tag}>Reserve · an AI-native studio in Taipei</p>
        <h1 className={apple.display}>We build our own products. The first is Limere.</h1>
        <p className={apple.sub}>
          A dating app that only counts if you meet in person: you see the people
          whose paths actually crossed yours, one room at a time. Two more are in
          testing under Labs, and a few embedded engineering teams pay for all of
          it.
        </p>
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
        <p className={m.tag}>The flagship</p>
        <h2 className={apple.h2}>Limere</h2>
        <p className={m.ledeCenter}>
          You see the people whose paths actually crossed yours, one room and one
          evening at a time. Everything else in the app exists to get you to the
          part that happens off the screen. In testing now.
        </p>
        <div className={apple.linkRow}>
          <a className={apple.link} href="/limere">
            See how it works &rsaquo;
          </a>
        </div>
        <div className={m.still}>
          <Image
            src="/limere/nearby-en.png"
            alt="Limere on iPhone — the people you actually crossed paths with"
            width={780}
            height={1696}
            priority
          />
        </div>
      </Section>

      <Section tinted>
        <h2 className={apple.h2}>The rest of the bench.</h2>
        <div className={m.index}>
          {REST.map((w) => (
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
        <h2 className={apple.h2}>Write to us.</h2>
        <p className={m.ledeCenter}>
          Early access to Limere, an embedded team, or an argument about any of
          the six. One address, and we answer everything.
        </p>
        <CtaButton subject="Hello Reserve" label="Get in touch" />
      </Section>

      <Footer />
    </Page>
  );
}
