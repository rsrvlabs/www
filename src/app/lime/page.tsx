import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import s from "@/components/apple/apple.module.css";

export const metadata: Metadata = {
  title: "Lime — date people you've actually crossed paths with",
  description:
    "Lime (short for limerence) is Reserve's flagship: a dating app with a physical signature. Phones recognize each other over Bluetooth when you truly cross paths — the people you were genuinely near stay findable, and a room you join scopes the app to the people in it.",
};

const CONTACT = "hello@rsrvlabs.com";

const SHOTS = [
  { src: "/lime/nearby-en.png", alt: "Lime Nearby — the people you actually crossed paths with", caption: "Nearby" },
  { src: "/lime/venue-en.png", alt: "Lime Venues — public activities you can join", caption: "Rooms" },
  { src: "/lime/detail-en.png", alt: "Lime activity — who's here, shown as a softly blurred presence pile", caption: "Who’s here" },
];

const FEATURES = [
  {
    title: "Cross paths, then find each other",
    body: "Phones recognize each other directly over Bluetooth — being in the same place at the same time becomes a signature only the two of you share. Not a GPS guess; proof of presence.",
  },
  {
    title: "Join the room you're in",
    body: "Anyone can open an activity at a venue, a party, an expo — public, or gated behind a code and a QR at the door. While you're in one, Lime shows only the people who are there with you.",
  },
  {
    title: "Seen only as you choose",
    body: "Nothing identifying goes on the air — the radio carries a rotating ephemeral ID only our server can resolve. Every field is disclosed by choice; a block removes you everywhere at once.",
  },
];

export default function LimePage() {
  return (
    <main className={s.page}>
      <nav className={s.nav}>
        <Link href="/" className={s.navBrand}>
          Reserve
        </Link>
        <Link href="/lime">Lime</Link>
        <Link href="/labs">Labs</Link>
        <Link href="/frontiers">Frontiers</Link>
        <Link href="/research">Research</Link>
      </nav>

      {/* Hero — Apple's opening move: one huge line, one quiet line, the product */}
      <section className={`${s.section} ${s.center}`}>
        <div className={s.inner}>
          <h1 className={s.hero}>Lime</h1>
          <p className={s.sub}>Date people you&rsquo;ve actually crossed paths with.</p>
          <div className={s.linkRow}>
            <a className={s.link} href={`mailto:${CONTACT}?subject=${encodeURIComponent("Lime early access")}`}>
              Request early access &rsaquo;
            </a>
            <a className={s.link} href="#how">
              See how it works &rsaquo;
            </a>
          </div>

          <div className={s.devices}>
            {SHOTS.map((shot) => (
              <figure key={shot.src} style={{ margin: 0 }}>
                <div className={s.device}>
                  <Image src={shot.src} alt={shot.alt} width={780} height={1696} priority />
                </div>
                <figcaption className={s.caption}>{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <hr className={s.rule} />

      {/* Thesis */}
      <section className={`${s.section} ${s.center} ${s.tinted}`}>
        <div className={s.inner}>
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
        </div>
      </section>

      {/* Features */}
      <section className={s.section} id="how">
        <div className={s.inner}>
          <div className={s.center}>
            <p className={s.eyebrow}>How it works</p>
            <h2 className={s.h2}>Presence, verified.</h2>
          </div>
          <div className={s.grid}>
            {FEATURES.map((f) => (
              <div className={s.card} key={f.title}>
                <h3 className={s.cardTitle}>{f.title}</h3>
                <p className={s.cardBody}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The bet */}
      <section className={`${s.section} ${s.tinted}`}>
        <div className={s.inner}>
          <div className={s.center}>
            <p className={s.eyebrow}>The bet</p>
            <h2 className={s.h2}>
              Proximity social is a graveyard.
              <br />
              We read the autopsies.
            </h2>
          </div>
          <div className={s.grid}>
            <div className={s.card}>
              <h3 className={s.cardTitle}>Trust</h3>
              <p className={s.cardBody}>
                A radius is a rumor. Only phones actually hearing each other makes
                &ldquo;we crossed paths&rdquo; worth acting on.
              </p>
            </div>
            <div className={s.card}>
              <h3 className={s.cardTitle}>Density</h3>
              <p className={s.cardBody}>
                A city-scoped feed needs a million users to feel alive. A room needs thirty
                people at one bar, tonight.
              </p>
            </div>
            <div className={s.card}>
              <h3 className={s.cardTitle}>Consent</h3>
              <p className={s.cardBody}>
                The creep factor is an architecture problem, not a policy problem — which is
                why consent is built into the radio itself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className={`${s.section} ${s.center}`}>
        <div className={s.inner}>
          <p className={s.eyebrow}>Why us</p>
          <h2 className={s.h2}>Two backgrounds, two halves of the product.</h2>
          <p className={s.bodyCenter}>
            One founder trained in psychophysiology — the science of what attraction
            actually does in the body, in person, in seconds. The other led AI R&amp;D on a
            wearable program that shipped over ten million units — consumer Bluetooth at a
            scale where the hard problems stop being theoretical. A product that runs from
            verified co-presence to on-body signals needs exactly this pair.
          </p>
        </div>
      </section>

      <hr className={s.rule} />

      {/* Close */}
      <section className={`${s.section} ${s.center}`}>
        <div className={s.inner}>
          <h2 className={s.h2}>The crowd is big. The list is short.</h2>
          <a
            className={s.cta}
            href={`mailto:${CONTACT}?subject=${encodeURIComponent("Lime early access")}`}
          >
            Request early access
          </a>
        </div>
      </section>

      <footer className={`${s.footer} ${s.center}`}>
        <Link href="/" style={{ color: "inherit" }}>
          Reserve
        </Link>{" "}
        · Screens are simulator captures of the current build, 2026.
      </footer>
    </main>
  );
}
