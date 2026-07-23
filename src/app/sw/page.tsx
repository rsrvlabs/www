import type { Metadata } from "next";
import Image from "next/image";
import { Subpage, Entry, Movement } from "@/components/site/subpage";

export const metadata: Metadata = {
  title: "Lime — date people you've actually crossed paths with",
  description:
    "Lime (short for limerence) is Reserve's flagship: a dating app with a physical signature. Phones recognize each other over Bluetooth when you truly cross paths — the people you were genuinely near stay findable, and a room you join scopes the app to the people in it.",
};

/** The three real screens, framed as specimens. Simulator captures of the
 *  actual build — labeled as such (honesty outranks register). */
function ScreenShelf() {
  const SHOTS = [
    {
      src: "/lime/nearby.png",
      alt: "Lime nearby screen — a photo grid of the people you actually crossed paths with",
      tag: "NEARBY · 附近的人",
    },
    {
      src: "/lime/venue.png",
      alt: "Lime rooms screen — public activities you can join at venues and events",
      tag: "ROOMS · 場域",
    },
    {
      src: "/lime/detail.png",
      alt: "Lime activity page — who's here, shown as a softly blurred presence pile until you meet in person",
      tag: "WHO'S HERE · 現場的人",
    },
  ];
  return (
    <section className="py-10">
      <span className="kicker text-[0.6rem] tracking-[0.26em] text-paper/45">
        THE BUILD — SIMULATOR CAPTURES, 2026-07
      </span>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {SHOTS.map(({ src, alt, tag }) => (
          <figure key={src} className="flex flex-col">
            <div className="overflow-hidden rounded-[1.4rem] border border-paper/15">
              <Image
                src={src}
                alt={alt}
                width={780}
                height={1696}
                className="h-auto w-full"
              />
            </div>
            <figcaption className="kicker mt-3 text-[0.6rem] text-paper/50">
              {tag}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default function LimePage() {
  return (
    <Subpage
      index="F"
      label="Lime"
      current="/sw"
      title="Lime — date people you've actually crossed paths with."
      intro="Lime is short for limerence — the involuntary state of being lit up by another person. You noticed someone; the crowd pulled you apart; the city swallowed them. Lime ends that story differently: your phone recognizes theirs the moment you genuinely cross paths, so the one who made the room feel different stays findable — instead of lost in a feed of strangers you'll never meet."
      cta={{
        line: "The crowd is big. The list is short.",
        label: "Request early access",
        subject: "Lime early access",
      }}
    >
      <Movement kicker="THE THESIS" title="The physical world has no undo.">
        <p>
          Every day you stand near people you will never see again — the one
          across the train car, the face at the opening, the stranger who made
          the room feel different. Software mapped everyone you have never met
          and forgot the ones you actually did.
        </p>
        <p>
          Lime builds the other graph: the people you were genuinely near, kept
          findable after the moment has passed. Not a wider net — a truer one.
        </p>
      </Movement>

      <ScreenShelf />

      <Entry
        tag="SIGNATURE"
        title="Cross paths, then find each other"
        blurb="Phones recognize each other directly over Bluetooth — being in the same place at the same time becomes a signature only the two of you share. Not a GPS guess; proof of presence. Walk out of the venue, and the connection walks out with you."
        spec="signature · bluetooth · co-presence"
      />
      <Entry
        tag="ROOMS"
        title="Join the room you're in"
        blurb="Anyone can open an activity at a venue, a party, an expo — public, or gated behind a code and a QR at the door. While you're in one, Lime shows only the people who are there with you: density and intent arrive together, one room at a time."
        spec="rooms · activities · one at a time"
      />
      <Entry
        tag="CONSENT"
        title="Seen only as you choose"
        blurb="Nothing identifying ever goes on the air — the radio carries a rotating ephemeral ID only our server can resolve. Every profile field is disclosed by choice; a block removes you from someone's world everywhere at once. The creep factor is a design problem, and we designed for it first."
        spec="ephemeral id · disclosure · server-truth"
      />

      <Movement kicker="WHAT THE ROOM TAUGHT US" title="Presence is personal.">
        <p>
          We sat with the people who would want this, and they disagreed —
          usefully. One wants it in a club; another at an expo. The scene is
          not universal; the <em>purpose</em> is. So the signature is
          scene-agnostic, and Lime scopes to rooms instead of betting on one
          kind of venue.
        </p>
        <p>
          And the most consistent thing we heard was not excitement. It was:
          don&rsquo;t make me feel tracked. So the profile is yours to reveal,
          never the room&rsquo;s to take — disclosure is a control, not a
          default.
        </p>
        <p>
          The app is built and running across real devices — discovery,
          matching, chat, rooms — now in field testing ahead of launch.
        </p>
      </Movement>

      <Movement
        kicker="THE BET"
        title="Proximity social is a graveyard. We read the autopsies."
      >
        <p>
          People have tried to make &ldquo;someone is near you&rdquo; matter
          for fifteen years, and the field is littered — the common reading is
          that the category doesn&rsquo;t work. We read it differently: the
          failures died of three specific, separable causes, and each one is a
          design decision, not a fate.
        </p>
        <p>
          Trust — a radius is a rumor; only phones actually hearing each other
          makes &ldquo;we crossed paths&rdquo; worth acting on. Density — a
          city-scoped feed needs a million users to feel alive; a room needs
          thirty people at one bar, tonight. And the creep factor — an
          architecture problem, not a policy problem, which is why consent is
          built into the radio itself. We would rather win one real room than
          fake a crowd.
        </p>
      </Movement>

      <Movement kicker="WHY US" title="Two backgrounds, two halves of the product.">
        <p>
          One founder trained in psychophysiology — the science of what
          attraction actually does in the body, in person, in seconds. The
          other led AI R&amp;D on a wearable program that shipped over ten
          million units — consumer Bluetooth at a scale where the hard problems
          stop being theoretical. A product that runs from verified co-presence
          to on-body signals needs exactly this pair.
        </p>
      </Movement>

      <Movement kicker="WHERE THIS GOES" title="Presence without the phone.">
        <p>
          The destination is a wearable — no app to open, no screen between you
          and the world. And beneath it, a question we are equipped to study
          rather than hype: what your body already knows in the moment
          something sparks. Heart-rate as self-insight, validated by a founder
          trained in psychophysiology — offered with consent, or not at all.
        </p>
      </Movement>
    </Subpage>
  );
}
