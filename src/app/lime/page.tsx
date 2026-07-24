import type { Metadata } from "next";
import Link from "next/link";
import { AppleNav, Section } from "@/components/apple/kit";
import s from "@/components/apple/apple.module.css";

export const metadata: Metadata = {
  title: "Lime — your IRL social AI navigator",
  description:
    "Lime (short for limerence) is Reserve's flagship: an app that assists real-world socializing. Online apps map strangers and miss the chemistry that only happens in person; Lime is the bridge for meeting in real life — cross paths, know who's open to chat, and let AI help you read the room.",
};

const CONTACT = "hello@rsrvlabs.com";

/* One flow per section: the capture beside its story. Public copy stays at
   the outcome level by design — no protocols, no sensor names. */
type Feature = {
  id: string;
  eyebrow: string;
  title: string;
  paras: string[];
  media?: { src: string; alt: string };
  flip?: boolean;
};

const FEATURES: Feature[] = [
  {
    id: "crossed",
    eyebrow: "No time",
    title: "Too busy to meet anyone? You already did.",
    paras: [
      "You cross paths with interesting people every day — you just don't have the time to do anything about it in the moment. Lime notices genuine co-presence, keeps the room ordered by who's actually near, and remembers everyone after the night ends.",
      "Crossed paths turns your existing day into a social surface. The moment passes; the person doesn't have to.",
    ],
    media: {
      src: "/lime/lime-flow-nearby-reconnect.mp4",
      alt: "Lime Nearby — people appearing as they arrive, then Crossed paths after the event",
    },
  },
  {
    id: "open",
    eyebrow: "No nerve",
    title: "Know who's open to chat — before you walk over.",
    paras: [
      "The hardest part of a room is not knowing who wants to be approached. Join the room you're in — a venue, a party, an expo — and Lime shows only the people who are there with you, and open to it.",
      "And you decide who each room meets: keep more than one profile, pick which one to bring, confirm, walk in. A founders meetup at nine, a club at midnight — same person, different disclosure.",
    ],
    media: {
      src: "/lime/lime-flow-dual-profile.mp4",
      alt: "Lime rooms and profiles — joining a morning meetup and a night venue as two different identities",
    },
    flip: true,
  },
  {
    id: "start",
    eyebrow: "No script",
    title: "Never sure how to start? Start from something real.",
    paras: [
      "A like back lands in realtime — the locked chat springs open the moment it happens. And the empty thread isn't empty: Lime suggests an opener built from what they chose to share, one tap to use.",
      "You met in the same room. The first message should sound like it.",
    ],
    media: {
      src: "/lime/lime-flow-match-chat.mp4",
      alt: "Lime match and chat — realtime match, suggested opener, first exchange",
    },
    flip: false,
  },
];

export default function LimePage() {
  return (
    <main className={s.page}>
      <AppleNav />

      {/* Hero */}
      <Section center>
          <h1 className={s.hero}>Lime</h1>
          <p className={s.sub}>Your IRL social AI navigator.</p>
          <div className={s.linkRow}>
            <a className={s.link} href={`mailto:${CONTACT}?subject=${encodeURIComponent("Lime early access")}`}>
              Request early access &rsaquo;
            </a>
            <a className={s.link} href="#crossed">
              See it move &rsaquo;
            </a>
          </div>

          <div className={s.heroDevice}>
            {/* palindrome loop — forward, reversed, forever */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/lime/lime-login-loop.gif" alt="Lime sign-up screen, ambient looping hero" />
          </div>
          <p className={s.caption}>A real capture of the shipped build</p>
      </Section>

      <hr className={s.rule} />

      {/* Thesis — a different channel, not a better feed */}
      <Section center tinted>
          <p className={s.eyebrow}>The thesis</p>
          <h2 className={s.h2}>Online dating is a different channel.<br />We&rsquo;re building the other one.</h2>
          <p className={s.bodyCenter}>
            Swiping apps compete online. Lime assists the real world. The research is
            unambiguous: a whole class of signals that decide attraction — the ones people
            call chemistry — simply doesn&rsquo;t travel through screens. It only exists in
            person.
          </p>
          <p className={s.bodyCenter}>
            But meeting in person has its own failure modes: no time, no nerve, no idea
            who&rsquo;s open to it, no read on what the moment is telling you. Lime is the
            bridge — an assistant for socializing where it actually works.
          </p>
      </Section>

      {/* One shortfall per section — the capture beside its answer */}
      {FEATURES.map((f) => (
        <Section id={f.id} key={f.id}>
          <div className={f.flip ? `${s.split} ${s.splitAlt}` : s.split}>
            <div className={s.splitMedia}>
              <div className={s.device}>
                <video src={f.media!.src} autoPlay loop muted playsInline width={780} height={1696} />
              </div>
            </div>
            <div>
              <p className={s.eyebrow}>{f.eyebrow}</p>
              <h2 className={s.splitTitle}>{f.title}</h2>
              {f.paras.map((para) => (
                <p className={s.splitText} key={para.slice(0, 24)}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </Section>
      ))}

      {/* Read the body — the hardware ladder stays abstract on purpose */}
      <Section center tinted id="body">
          <p className={s.eyebrow}>Read the body</p>
          <h2 className={s.h2}>Chemistry is physical.<br />So is our roadmap.</h2>
          <p className={s.bodyCenter}>
            Attraction happens in the body — in signals people can&rsquo;t type and apps
            can&rsquo;t render. Lime is built to read the room at three levels: the
            environment you&rsquo;re in, the interaction between two people, and what your
            own body is telling you.
          </p>
          <p className={s.bodyCenter}>
            It starts with the phone in your pocket. A ring, a watch, a pair of glasses —
            each device you choose to wear adds a layer only it can see, and each layer
            deepens the read. Not another feed: an assistant that helps you unleash your
            social potential in person.
          </p>
      </Section>

      {/* The bet */}
      <Section tinted>
          <div className={s.center}>
            <p className={s.eyebrow}>The bet</p>
            <h2 className={s.h2}>
              Proximity social is a graveyard.
              <br />
              We read the autopsies.
            </h2>
          </div>
          <div className={s.statements}>
            <div className={s.statement}>
              <h3 className={s.statementTitle}>Trust</h3>
              <p className={s.statementBody}>
                A radius is a rumor. Verified co-presence — actually being there — is the
                only version of &ldquo;we crossed paths&rdquo; worth acting on.
              </p>
            </div>
            <div className={s.statement}>
              <h3 className={s.statementTitle}>Density</h3>
              <p className={s.statementBody}>
                A city-scoped feed needs a million users to feel alive. A room needs thirty
                people at one bar, tonight.
              </p>
            </div>
            <div className={s.statement}>
              <h3 className={s.statementTitle}>Consent</h3>
              <p className={s.statementBody}>
                Nothing identifying is ever broadcast, every field is disclosed by choice,
                and a block removes you everywhere at once. Consent is architecture, not
                policy.
              </p>
            </div>
          </div>
      </Section>

      {/* Why us */}
      <Section center>
          <p className={s.eyebrow}>Why us</p>
          <h2 className={s.h2}>Two backgrounds, two halves of the product.</h2>
          <p className={s.bodyCenter}>
            One founder trained in psychophysiology — the science of what attraction
            actually does in the body, in person, in seconds. The other led AI R&amp;D on a
            wearable program that shipped over ten million units — consumer hardware at a
            scale where the hard problems stop being theoretical. A product that runs from
            verified co-presence to on-body signals needs exactly this pair.
          </p>
      </Section>

      <hr className={s.rule} />

      {/* Close */}
      <Section center>
          <h2 className={s.h2}>The crowd is big. The list is short.</h2>
          <a
            className={s.cta}
            href={`mailto:${CONTACT}?subject=${encodeURIComponent("Lime early access")}`}
          >
            Request early access
          </a>
      </Section>

      <footer className={`${s.footer} ${s.center}`}>
        <Link href="/" style={{ color: "inherit" }}>
          Reserve
        </Link>{" "}
        · Screens are simulator captures of the current build, 2026.
      </footer>
    </main>
  );
}
