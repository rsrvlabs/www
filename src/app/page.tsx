import {
  AppleNav,
  Page,
  Section,
  IndexRow,
  MenuLabel,
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
 *  about. Limere keeps the flagship label at product scale, and Reserve
 *  Finance stays with the small group using it, sharing one quiet Labs line
 *  with Glow.
 *
 *  Set like a menu, at the founder's direction: air around everything, a
 *  centred italic label per course, the name and its standing on one baseline
 *  with a leader between them, and ONE short line under each — a menu never
 *  explains a dish in a paragraph. Every section here is held to that.
 *
 *  Copy rules, learned the hard way on this page: no studio site anywhere
 *  talks about which arm pays the bills; the subject is "we", never "the same
 *  people" or "the founders"; status words are plain English, not build-server
 *  English; and no city — the client list is not local. */

const HOUSE: Array<{ name: string; body: string; meta: string; href: string }> = [
  {
    name: "Frontiers",
    body: "Engineers inside your team, shipping to production. Travel, sports vision, health, legal.",
    meta: "Taking projects",
    href: "/frontiers",
  },
  {
    name: "Limere",
    body: "A dating app that only counts if you meet in person.",
    meta: "Flagship · early access",
    href: "/limere",
  },
  {
    name: "Labs",
    body: "Reserve Finance and Glow, with a small circle of people for now.",
    meta: "On the bench",
    href: "/labs",
  },
];

const STANCE: Array<[string, string, string]> = [
  ["01", "Products first.", "Client work makes the products sharper. Neither is a detour."],
  ["02", "Something leaves every week.", "A build, an essay, or a note on what broke."],
  ["03", "Show the workings.", "If a number can't be traced, we don't publish it."],
  [
    "04",
    "AI-native, and specific about it.",
    "Agents hold standing jobs here. A human signs anything that reaches you.",
  ],
  ["05", "It has to end in the real world.", "Limere isn't done until you're both in the room."],
  ["06", "We write down what didn't work.", "The journal carries the failures too."],
];

export default function Home() {
  return (
    <Page>
      <AppleNav />

      {/* Arrival — both arms, in the first sentence */}
      <Section center>
        <p className={apple.tag}>Reserve · an AI-native studio</p>
        <h1 className={apple.display}>We build AI products. Ours, and yours.</h1>
        <p className={apple.sub}>
          We join your team and build until it runs in production. And we build
          Limere, an app for meeting the people you crossed paths with.
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

      {/* The house, set as the menu */}
      <Section>
        <div className={apple.menuSection}>
          <MenuLabel>The house</MenuLabel>
          {HOUSE.map((w) => (
            <IndexRow key={w.name} {...w} />
          ))}
        </div>
      </Section>

      {/* The arm people write in about */}
      <Section tinted center>
        <MenuLabel>Working with us</MenuLabel>
        <h2 className={apple.h2}>We consult by building.</h2>
        <p className={apple.ledeCenter}>
          We sit with your team and stay until it is live. The opinion and the
          implementation arrive together.
        </p>
        <div className={apple.linkRow}>
          <a className={apple.link} href="/frontiers">
            How we work with teams &rsaquo;
          </a>
        </div>
      </Section>

      {/* The flagship, at product scale */}
      <Section center>
        <MenuLabel>The flagship</MenuLabel>
        <h2 className={apple.h2}>Limere</h2>
        <p className={apple.ledeCenter}>
          Everything in the app exists to get you to the part that happens off
          the screen.
        </p>
        <div className={apple.still}>
          {/* The sign-up loop as MP4 rather than the 4.2 MB GIF /limere serves —
              same frames, a tenth of the weight, and this is the page every
              first-time visitor lands on. */}
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
        <div className={apple.menuSection}>
          <MenuLabel>How we work</MenuLabel>
          <div className={apple.stance}>
            {STANCE.map(([n, title, body]) => (
              <StanceItem key={n} n={n} title={title} body={body} />
            ))}
          </div>
        </div>
      </Section>

      {/* The door */}
      <Section center>
        <h2 className={apple.h2}>Let&rsquo;s talk.</h2>
        <p className={apple.ledeCenter}>
          A project, early access to Limere, or an argument about any of the six.
        </p>
        <CtaButton subject="Working with Reserve" label="Get in touch" />
      </Section>

      <Footer />
    </Page>
  );
}
