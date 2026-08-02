import Link from "next/link";
import { AppleNav, Page, Section, CtaButton, Footer, apple, CONTACT } from "@/components/apple/kit";
import m from "../mock.module.css";

/** MOCK B v4 — the house, after the second founder review 2026-08-02.
 *  Three things changed. The hero no longer says out loud which arm pays the
 *  bills (no studio site anywhere talks about its till — checked ustwo, Metalab,
 *  thoughtbot; they all describe the practice instead). We consult, so the page
 *  says so, without ever printing the words "forward deployment". And "in
 *  testing" is gone as a status word — early access and on the bench say the
 *  same thing without sounding like a build server.
 *  Founder review only; not in nav or sitemap. */

export const metadata = {
  title: "Reserve — mock B",
  robots: { index: false, follow: false },
};

/** The shape of the house, in the order a visitor cares about it. */
const HOUSE: Array<{ name: string; body: string; meta: string; href: string }> = [
  {
    name: "Frontiers",
    body: "Senior engineers who join your team and build in your codebase. Travel, sports vision, health and legal systems are running in production now.",
    meta: "Taking projects",
    href: "/frontiers",
  },
  {
    name: "Limere",
    body: "A dating app that only counts if you meet in person. You see the people whose paths actually crossed yours, one room at a time.",
    meta: "Flagship · early access",
    href: "/limere",
  },
  {
    name: "Labs",
    body: "Reserve Finance and Glow. Both are with a small group of people we know, and we'll introduce them properly when they're ready.",
    meta: "On the bench",
    href: "/labs",
  },
];

const STANCE: Array<[string, string, string]> = [
  [
    "01",
    "Products first.",
    "We build our own products, and we take client work that makes them sharper. Neither one is a detour from the other.",
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
        <h1 className={apple.display}>We build AI products. Ours, and yours.</h1>
        <p className={apple.sub}>
          We join your team and work in your codebase until the system is
          running. We also build Limere, an app for meeting the people you
          actually crossed paths with.
        </p>
        <div className={apple.linkRow}>
          <a
            className={apple.link}
            href={`mailto:${CONTACT}?subject=${encodeURIComponent("Working with Reserve")}`}
          >
            Start a conversation &rsaquo;
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
        <p className={m.tag}>Working with us</p>
        <h2 className={apple.h2}>We consult by building.</h2>
        <p className={m.ledeCenter}>
          We sit with your team, write in your codebase, and stay until the
          thing is live and someone on your side can run it. The opinion and the
          implementation arrive together. We take the domains other people call
          too messy.
        </p>
        <div className={apple.linkRow}>
          <a className={apple.link} href="/frontiers">
            How we work with teams &rsaquo;
          </a>
        </div>
      </Section>

      <Section center>
        <p className={m.tag}>The flagship</p>
        <h2 className={apple.h2}>Limere</h2>
        <p className={m.ledeCenter}>
          Everything in the app exists to get you to the part that happens off
          the screen. Open to a first group of people now.
        </p>
        {/* The saved login loop, same asset and same plain-<img> treatment as
            /limere uses for its hero — next/image would strip the animation. */}
        <div className={m.still}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/limere/limere-login-loop.gif" alt="Limere sign-up screen, ambient looping hero" />
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
        <h2 className={apple.h2}>Let&rsquo;s talk.</h2>
        <p className={m.ledeCenter}>
          A project you want built, early access to Limere, or an argument about
          any of the six. One address, and we answer everything.
        </p>
        <CtaButton subject="Working with Reserve" label="Get in touch" />
      </Section>

      <Footer />
    </Page>
  );
}
