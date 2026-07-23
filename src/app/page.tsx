import {
  AppleNav,
  Page,
  Section,
  Eyebrow,
  H2,
  Body,
  Tile,
  CtaButton,
  Footer,
  apple,
} from "@/components/apple/kit";

/** A day the company runs without anyone awake — the evidence strip.
 *  Copy carried over verbatim from the previous landing's Weather section. */
const DAY: Array<[string, string]> = [
  ["22:00", "The repair agent reads the day's bug tickets — and fixes them."],
  ["05:00", "New York closes. The finance desk starts its read of the day."],
  ["07:30", "Reserve Finance writes the morning brief. Every number, checked twice."],
  ["07:50", "The watchdog sweeps the pipeline; anything broken heals itself."],
  ["08:00", "The brief publishes. The curators are still asleep."],
];

const WORKS = [
  {
    kicker: "Flagship",
    title: "Lime",
    body: "Short for limerence — a dating app with a physical signature. You only meet the people you actually crossed paths with, one room at a time.",
    href: "/sw",
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
    body: "Senior engineers embedded inside a client's team, shipping AI systems into production. The frontier work feeds the products.",
    href: "/frontiers",
  },
];

export default function Home() {
  return (
    <Page>
      <AppleNav />

      {/* Arrival — the studio thesis, in Apple's one-line register */}
      <Section center>
        <h1 className={apple.display}>Our first product is the studio.</h1>
        <p className={apple.sub}>
          Reserve is a studio run with one machine. We ship a dating app with a
          physical signature, a finance desk that publishes itself, and beauty
          tech in the making — all on an operating system we built, where agents
          hold jobs.
        </p>
        <div className={apple.linkRow}>
          <a className={apple.link} href="/sw">
            Meet Lime &rsaquo;
          </a>
          <a className={apple.link} href="/research">
            Read the field notes &rsaquo;
          </a>
        </div>
      </Section>


      {/* What we do */}
      <Section tinted center>
        <Eyebrow>What we do</Eyebrow>
        <H2>Products first. Engagements pay for them.</H2>
        <Body center>
          We build our own products. A small number of embedded engagements pay
          for them. The company runs on an operating system we built — one
          shared brain, agents with jobs, humans making the calls.
        </Body>
      </Section>

      {/* The line-up */}
      <Section>
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

      {/* A day that runs itself */}
      <Section tinted>
        <div className={apple.center}>
          <Eyebrow>A day at the studio</Eyebrow>
          <H2>Most of it happens while we sleep.</H2>
        </div>
        <div className={apple.timeline}>
          {DAY.map(([time, text]) => (
            <div className={apple.trow} key={time}>
              <span className={apple.ttime}>{time}</span>
              <span className={apple.ttext}>{text}</span>
            </div>
          ))}
        </div>
      </Section>


      {/* Invitation */}
      <Section center>
        <H2>A studio run with one machine.</H2>
        <Body center>
          Early access. An embedded team. The notes. One email — we answer
          everything.
        </Body>
        <CtaButton subject="Hello Reserve" label="Get in touch" />
      </Section>

      <Footer />
    </Page>
  );
}
