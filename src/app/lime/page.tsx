import type { Metadata } from "next";
import Link from "next/link";
import { AppleNav, Section } from "@/components/apple/kit";
import s from "@/components/apple/apple.module.css";
import { WaitlistForm } from "./WaitlistForm";

export const metadata: Metadata = {
  title: "Lime — your IRL social AI navigator",
  description:
    "Lime helps you meet the people you actually cross paths with. See who is open to meeting, reconnect after the moment passes, and start conversations that begin in real life.",
};

const CONTACT = "hello@rsrvlabs.com";

/* Copy rules (copy-editing + nature-polishing skills, 2026-07-24):
   plain words, 10–30-word sentences, one idea each, no em dashes,
   read-aloud natural. Public copy stays at the outcome level. */
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
    eyebrow: "1 · The moment",
    title: "You already met someone today.",
    paras: [
      "Think about your week. The person next to you at the meetup. The one who laughed at the same joke. You noticed them, and then life moved on.",
      "Lime noticed too. It keeps a private list of the people you actually crossed paths with, ordered by who was really near. One busy night no longer has to be the end of it.",
    ],
    media: {
      src: "/lime/lime-flow-nearby-reconnect.mp4",
      alt: "Lime Nearby, people appearing as they arrive, then Crossed paths after the event",
    },
  },
  {
    id: "open",
    eyebrow: "2 · The approach",
    title: "See who wants to be approached.",
    paras: [
      "Nobody makes the first move because nobody can tell who wants them to. Study after study finds the same thing. Everyone underestimates how much the other person wants to talk.",
      "Walk into a venue on Lime and the guessing stops. You see who is in the room and open to meeting people. You also pick which version of you the room gets: the work profile at nine, the weekend one at midnight.",
    ],
    media: {
      src: "/lime/lime-flow-dual-profile.mp4",
      alt: "Lime rooms and profiles, joining a morning meetup and a night venue as two different identities",
    },
    flip: true,
  },
  {
    id: "start",
    eyebrow: "3 · The opening",
    title: "Start with something real.",
    paras: [
      "When someone likes you back, you know right away. The chat unlocks in front of you. You never have to refresh a screen or guess.",
      "And you never stare at an empty text box. Lime suggests a first line based on what they chose to share. One tap, edit if you like, send.",
    ],
    media: {
      src: "/lime/lime-flow-match-chat.mp4",
      alt: "Lime match and chat, realtime match, suggested opener, first exchange",
    },
    flip: false,
  },
];

export default function LimePage() {
  return (
    <main className={s.page}>
      <AppleNav />

      {/* Hero: words left, the product right */}
      <Section>
          <div className={s.heroSplit}>
            <div className={s.heroLeft}>
              <h1 className={s.heroTitle}>Lime</h1>
              <p className={s.heroTag}>Your IRL social AI navigator.</p>
              <WaitlistForm />
            </div>
            <div className={s.heroMedia}>
              <div className={s.device}>
                {/* palindrome loop: forward, reversed, forever */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/lime/lime-login-loop.gif" alt="Lime sign-up screen, ambient looping hero" />
              </div>
            </div>
          </div>
      </Section>

      <hr className={s.rule} />

      {/* Thesis */}
      <Section center tinted>
          <p className={s.eyebrow}>Why Lime</p>
          <h2 className={s.h2}>Chemistry never made it online.</h2>
          <p className={s.bodyCenter}>
            A profile is self-report. A swipe is self-report. And self-report is noise.
            What actually decides attraction is chemistry, and chemistry only happens in
            person. Science has known this for decades.
          </p>
          <p className={s.bodyCenter}>
            But meeting people in person is hard for boring reasons. You are busy. You
            cannot tell who wants to talk. You never know how to start. Lime fixes all
            three.
          </p>
          <div className={s.linkRow}>
            <Link className={s.link} href="/lime/why">
              The full case, with data &rsaquo;
            </Link>
          </div>
      </Section>

      {/* One problem per section, the capture beside its answer */}
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

      {/* Read the body */}
      <Section center tinted id="body">
          <p className={s.eyebrow}>4 · The read</p>
          <h2 className={s.h2}>Chemistry is physical.<br />So is our roadmap.</h2>
          <p className={s.bodyCenter}>
            Attraction happens in the body, in signals nobody can type. Lime is learning
            to read three things: the room you are in, the moment between two people, and
            what your own body is telling you.
          </p>
          <p className={s.bodyCenter}>
            And this is not a weekend thing. Your days are full of rooms: the office, the
            gym, the queue, the party. Your body has an opinion in every one of them.
            Lime works the days, not just the nights.
          </p>
          <p className={s.bodyCenter}>
            It starts with your phone. A ring, a watch, a pair of glasses will each add a
            layer your phone cannot see. Until now, chemistry has only ever been measured
            in labs. Lime is how it gets measured in real life.
          </p>
      </Section>

      {/* The bet */}
      <Section>
          <div className={s.center}>
            <p className={s.eyebrow}>The bet</p>
            <h2 className={s.h2}>Apps for meeting nearby keep dying.<br />We studied why.</h2>
          </div>
          <div className={s.statements}>
            <div className={s.statement}>
              <h3 className={s.statementTitle}>Trust</h3>
              <p className={s.statementBody}>
                An app can guess you were close. Lime knows you were actually there.
                Only that is worth acting on.
              </p>
            </div>
            <div className={s.statement}>
              <h3 className={s.statementTitle}>Density</h3>
              <p className={s.statementBody}>
                A citywide feed needs a million users to feel alive. A bar only needs
                thirty people who are in it tonight.
              </p>
            </div>
            <div className={s.statement}>
              <h3 className={s.statementTitle}>Daily</h3>
              <p className={s.statementBody}>
                Meeting apps wait for the weekend. Crossed paths happen every day. A tool
                you open daily becomes a habit. A tool you open monthly becomes a chore.
              </p>
            </div>
            <div className={s.statement}>
              <h3 className={s.statementTitle}>Consent</h3>
              <p className={s.statementBody}>
                Your name is never broadcast. You choose what every room sees. Blocking
                someone removes you from their world completely. This is built into the
                product, not written in a policy.
              </p>
            </div>
          </div>
      </Section>

      {/* Why us */}
      <Section center tinted>
          <p className={s.eyebrow}>Why us</p>
          <h2 className={s.h2}>The science of the moment.<br />The hardware to read it.</h2>
          <p className={s.bodyCenter}>
            One founder studied psychophysiology, the science of what attraction does in
            the body. The other ran AI research for a wearable that shipped more than ten
            million units. This product needs exactly that pair.
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
