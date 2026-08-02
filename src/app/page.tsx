import {
  AppleNav,
  Page,
  Section,
  IndexRow,
  StanceItem,
  CtaButton,
  Footer,
  apple,
  CONTACT,
} from "@/components/apple/kit";

/** The house page (Ryvn 2026-08-02, chosen from three directions).
 *
 *  It is not a Limere landing page and it is not a product tour. A visitor
 *  who asks "what does this company do" has to have the answer before they
 *  scroll: the two arms in the headline, the three parts of the house in an
 *  index right underneath, and only then how we work.
 *
 *  Frontiers leads the index because it is the arm people actually write in
 *  about — the previous homepage buried it in the fourth tile. Limere keeps the
 *  flagship label at product scale, and Reserve Finance stays with the small
 *  group using it, sharing one quiet Labs line with Glow.
 *
 *  Copy rules learned the hard way, on this page more than anywhere: no studio
 *  site anywhere talks about which arm pays the bills (ustwo, Metalab and
 *  thoughtbot all describe the practice instead); the subject is "we", never
 *  "the same people" or "the founders"; and status words are plain English, not
 *  build-server English. */

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

export default function Home() {
  return (
    <Page>
      <AppleNav />

      {/* Arrival — both arms, in the first sentence */}
      <Section center>
        <p className={apple.tag}>Reserve · an AI-native studio in Taipei</p>
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

      {/* The shape of the house, in the order a visitor cares about it */}
      <Section>
        <div className={apple.index}>
          {HOUSE.map((w) => (
            <IndexRow key={w.name} {...w} />
          ))}
        </div>
      </Section>

      {/* The arm people write in about */}
      <Section tinted center>
        <p className={apple.tag}>Working with us</p>
        <h2 className={apple.h2}>We consult by building.</h2>
        <p className={apple.ledeCenter}>
          We sit with your team, write in your codebase, and stay until the thing
          is live and someone on your side can run it. The opinion and the
          implementation arrive together. We take the domains other people call
          too messy.
        </p>
        <div className={apple.linkRow}>
          <a className={apple.link} href="/frontiers">
            How we work with teams &rsaquo;
          </a>
        </div>
      </Section>

      {/* The flagship, at product scale */}
      <Section center>
        <p className={apple.tag}>The flagship</p>
        <h2 className={apple.h2}>Limere</h2>
        <p className={apple.ledeCenter}>
          Everything in the app exists to get you to the part that happens off
          the screen. Open to a first group of people now.
        </p>
        <div className={apple.still}>
          {/* The sign-up loop, as MP4 rather than the 4.2 MB GIF /limere still
              serves — same frames, a tenth of the weight, and this one is on
              the page every first-time visitor lands on. */}
          <video
            src="/limere/limere-login-loop.mp4"
            autoPlay
            loop
            muted
            playsInline
            width={340}
            height={740}
            aria-label="Limere sign-up screen, ambient looping hero"
          />
        </div>
      </Section>

      {/* How the house works */}
      <Section tinted>
        <p className={apple.tag}>How we work</p>
        <div className={apple.stance}>
          {STANCE.map(([n, title, body]) => (
            <StanceItem key={n} n={n} title={title} body={body} />
          ))}
        </div>
      </Section>

      {/* The door */}
      <Section center>
        <h2 className={apple.h2}>Let&rsquo;s talk.</h2>
        <p className={apple.ledeCenter}>
          A project you want built, early access to Limere, or an argument about
          any of the six. One address, and we answer everything.
        </p>
        <CtaButton subject="Working with Reserve" label="Get in touch" />
      </Section>

      <Footer />
    </Page>
  );
}
