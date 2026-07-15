import { Wordmark } from "@/components/wordmark";
import { Arrival } from "@/components/sections/arrival";
import { Note } from "@/components/sections/note";
import { Rooms } from "@/components/sections/rooms";
import { Weather } from "@/components/sections/weather";
import { Places } from "@/components/sections/places";
import { Invitation } from "@/components/sections/invitation";
import { ArrivalVeil } from "@/components/arrival-veil";

export default function Home() {
  return (
    <main className="lab-ground relative w-full overflow-x-hidden">
      {/* Arrival veil: holds the page behind a cream overlay on first
          load while we preload the Places chunk + warm the tile cache. */}
      <ArrivalVeil />
      <Wordmark />
      <Arrival />
      <Note />
      {/* The works, shown as specimen rooms (replaces the old "five doors" index). */}
      <Rooms />
      <Weather />
      <Places />
      <Invitation />
    </main>
  );
}
