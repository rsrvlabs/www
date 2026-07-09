import type { Metadata } from "next";
import { Subpage, Entry, Movement } from "@/components/site/subpage";

export const metadata: Metadata = {
  title: "Reserve — the flagship: a dating app with a physical signature",
  description:
    "You only match with people you've actually crossed paths with. Presence becomes a signature; the one who made your heart skip doesn't get lost in the crowd.",
};

export default function SWPage() {
  return (
    <Subpage
      index="F"
      label="Flagship"
      current="/sw"
      title="The one in the crowd, found again."
      intro="You noticed someone. The crowd pulled you apart; the city swallowed them. Our flagship ends that story differently — real co-presence becomes a physical signature, and the people you actually crossed paths with stay findable."
      cta={{
        line: "The crowd is big. The list is short.",
        label: "Request early access",
        subject: "SW early access",
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
          Reserve builds the other graph: the people you were genuinely near,
          kept findable after the moment has passed. Not a wider net — a truer
          one.
        </p>
      </Movement>

      <Entry
        tag="SIGNATURE"
        title="Cross paths, then find each other"
        blurb="Bluetooth turns being in the same place at the same time into a signature only the two of you share. Walk out of the venue; the connection walks out with you."
        spec="signature · bluetooth · co-presence"
      />
      <Entry
        tag="WEARABLE"
        title="Presence without the phone"
        blurb="The destination is a wearable — no app to open, no screen between you and the world. Your presence does the talking."
        spec="wearable · no app · no screen"
      />
      <Entry
        tag="BIOSIGNAL"
        title="Your body knows first"
        blurb="Heart-rate as a matching signal: the moment something sparks, before you've found the words for it. The most honest swipe is a heartbeat."
        spec="biosignal · heart-rate · matching signal"
      />

      <Movement kicker="WHAT THE ROOM TAUGHT US" title="Presence is personal.">
        <p>
          We sat with the people who would want this, and they disagreed —
          usefully. One wants it in a club; another at an expo. The scene is
          not universal; the <em>purpose</em> is. So the signature is
          scene-agnostic: it works wherever you already had a reason to be.
        </p>
        <p>
          And the most consistent thing we heard was not excitement. It was:
          don&rsquo;t make me feel tracked. So the profile is yours to reveal,
          never the room&rsquo;s to take — disclosure is a control, not a
          default.
        </p>
      </Movement>

      <Movement
        kicker="THE BET"
        title="Proximity social is a graveyard. We know."
      >
        <p>
          People have tried to make &ldquo;someone is near you&rdquo; matter
          for fifteen years, and the field is littered. The failures share a
          cause: loose location, no reason to be real, nothing left the morning
          after.
        </p>
        <p>
          Our bet is narrower and harder to fake — not a radius but genuine
          co-presence, meters and seconds; not a mass feed but curated rooms
          where being there already meant something. We would rather win one
          real scene than fake a crowd.
        </p>
      </Movement>
    </Subpage>
  );
}
