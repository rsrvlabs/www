import type { Metadata } from "next";
import { Subpage, Entry } from "@/components/site/subpage";

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
    </Subpage>
  );
}
