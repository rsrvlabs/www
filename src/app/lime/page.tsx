import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppleNav, Section } from "@/components/apple/kit";
import s from "@/components/apple/apple.module.css";

export const metadata: Metadata = {
  title: "Lime — date people you've actually crossed paths with",
  description:
    "Lime (short for limerence) is Reserve's flagship: a dating app with a physical signature. Phones recognize each other over Bluetooth when you truly cross paths — the people you were genuinely near stay findable, and a room you join scopes the app to the people in it.",
};

const CONTACT = "hello@rsrvlabs.com";

/* Each flow section: a real capture beside its story (Ryvn 2026-07-24). */
type Feature = {
  id: string;
  eyebrow: string;
  title: string;
  paras: string[];
  media: { kind: "video" | "image"; src: string; alt: string };
  flip?: boolean;
};

const FEATURES: Feature[] = [
  {
    id: "nearby",
    eyebrow: "Crossed paths",
    title: "The room breathes.",
    paras: [
      "Phones recognize each other directly over Bluetooth — no GPS guess, no radius rumor. People surface as they actually arrive, the list keeps itself ordered by how near they are, and when someone leaves, they leave.",
      "After the night ends, everyone you genuinely crossed paths with is still there — under Crossed paths, timestamped, findable. The moment passes; the person doesn't have to.",
    ],
    media: {
      kind: "video",
      src: "/lime/lime-flow-nearby-reconnect.mp4",
      alt: "Lime Nearby — people appearing as they arrive, then Crossed paths after the event",
    },
  },
  {
    id: "rooms",
    eyebrow: "Rooms",
    title: "Join the room you're in.",
    paras: [
      "Anyone can open an activity at a venue, a party, an expo — public, or gated behind a code and a QR at the door. While you're in one, Lime shows only the people who are actually there with you.",
      "Thirty people at one bar beat a million-user feed. Density is a room-sized problem, and rooms are exactly what we scope to.",
    ],
    media: {
      kind: "image",
      src: "/lime/venue-en.png",
      alt: "Lime Venues — public activities you can join right now",
    },
    flip: true,
  },
  {
    id: "profiles",
    eyebrow: "Other profiles",
    title: "One face, two rooms.",
    paras: [
      "A founders meetup at nine, a club at midnight — same person, different disclosure. Lime lets you keep more than one profile and asks which one to bring every time you join a room. Pick, confirm, walk in.",
      "Who each room meets is a choice, not a default. That's privacy as a product feature, not a settings page.",
    ],
    media: {
      kind: "video",
      src: "/lime/lime-flow-dual-profile.mp4",
      alt: "Lime dual profiles — joining a morning meetup and a night venue as two different identities",
    },
  },
  {
    id: "match",
    eyebrow: "Match",
    title: "From matched to mid-conversation.",
    paras: [
      "A like back lands in realtime — the locked chat button springs open the moment it happens. No refresh, no wondering.",
      "The empty thread isn't empty: Lime suggests an opener built from what they chose to share, one tap to use. You start from something real, because you were actually in the same room.",
    ],
    media: {
      kind: "video",
      src: "/lime/lime-flow-match-chat.mp4",
      alt: "Lime match and chat — realtime match, suggested opener, first exchange",
    },
    flip: true,
  },
  {
    id: "consent",
    eyebrow: "Consent",
    title: "Seen only as you choose.",
    paras: [
      "Nothing identifying ever goes on the air — the radio carries a rotating ephemeral ID only our server can resolve. Age, country, music, every field: disclosed per-item, by choice.",
      "A block removes you everywhere at once — nearby, matches, messages — because consent has to be an architecture, not a policy.",
    ],
    media: {
      kind: "image",
      src: "/lime/detail-en.png",
      alt: "Lime activity detail — who's here shown as a softly blurred presence pile",
    },
  },
];

function FeatureMedia({ media }: { media: Feature["media"] }) {
  return (
    <div className={s.splitMedia}>
      <div className={s.device}>
        {media.kind === "video" ? (
          <video src={media.src} autoPlay loop muted playsInline width={780} height={1696} />
        ) : (
          <Image src={media.src} alt={media.alt} width={780} height={1696} />
        )}
      </div>
    </div>
  );
}

export default function LimePage() {
  return (
    <main className={s.page}>
      <AppleNav />

      {/* Hero — one huge line, one quiet line, then the front door itself */}
      <Section center>
          <h1 className={s.hero}>Lime</h1>
          <p className={s.sub}>Date people you&rsquo;ve actually crossed paths with.</p>
          <div className={s.linkRow}>
            <a className={s.link} href={`mailto:${CONTACT}?subject=${encodeURIComponent("Lime early access")}`}>
              Request early access &rsaquo;
            </a>
            <a className={s.link} href="#nearby">
              See it move &rsaquo;
            </a>
          </div>

          <div className={s.heroDevice}>
            {/* palindrome loop — forward, reversed, forever */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/lime/lime-login-loop.gif" alt="Lime sign-up screen, ambient looping hero" />
          </div>
          <p className={s.caption}>The front door — a real capture of the shipped build</p>
      </Section>

      <hr className={s.rule} />

      {/* Thesis */}
      <Section center tinted>
          <p className={s.eyebrow}>The thesis</p>
          <h2 className={s.h2}>The physical world has no undo.</h2>
          <p className={s.bodyCenter}>
            Every day you stand near people you will never see again — the one across the
            train car, the face at the opening, the stranger who made the room feel
            different. Software mapped everyone you have never met and forgot the ones you
            actually did.
          </p>
          <p className={s.bodyCenter}>
            Lime builds the other graph: the people you were genuinely near, kept findable
            after the moment has passed. Not a wider net — a truer one.
          </p>
      </Section>

      {/* One flow per section — the capture beside its story */}
      {FEATURES.map((f) => (
        <Section id={f.id} key={f.id}>
          <div className={f.flip ? `${s.split} ${s.splitAlt}` : s.split}>
            <FeatureMedia media={f.media} />
            <div>
              <p className={s.eyebrow}>{f.eyebrow}</p>
              <h2 className={s.splitTitle}>{f.title}</h2>
              {f.paras.map((p) => (
                <p className={s.splitText} key={p.slice(0, 24)}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Section>
      ))}

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
                A radius is a rumor. Only phones actually hearing each other makes
                &ldquo;we crossed paths&rdquo; worth acting on.
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
                The creep factor is an architecture problem, not a policy problem — which is
                why consent is built into the radio itself.
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
            wearable program that shipped over ten million units — consumer Bluetooth at a
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
