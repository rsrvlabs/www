import { Wordmark } from "@/components/wordmark";
import { Arrival } from "@/components/sections/arrival";
import { Note } from "@/components/sections/note";
import { Practices } from "@/components/sections/practices";
import { Weather } from "@/components/sections/weather";
import { Places } from "@/components/sections/places";
import { Invitation } from "@/components/sections/invitation";
import { ArrivalVeil } from "@/components/arrival-veil";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden">
      {/* Arrival veil: holds the page behind a cream overlay on first
          load while we preload the Places chunk + warm the tile cache. */}
      <ArrivalVeil />
      <Wordmark />
      <Arrival />
      <Note />
      <Practices />
      <Weather />
      <Places />
      <Invitation />
    </main>
  );
}
