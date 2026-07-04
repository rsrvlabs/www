"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { warmPlacesMapCache } from "@/lib/map-prefetch";
import { BrailleLoader } from "@/components/visuals/braille-loader";
import { cities } from "@/data/places";

// Arrival veil: full-viewport cream overlay shown on first page load.
// While it sits over the hero, we:
//   1. Eagerly import the Places chunk + the MapLibre module.
//   2. Fire the tile-prefetch queue so the Places corridor starts
//      warming in the browser HTTP cache.
// It dismisses when BOTH the minimum display time has elapsed AND
// those background jobs have resolved — capped at MAX_MS so no one
// waits on a slow network forever.
//
// The visual ties to the section metaphor: "arrival" is the hero. The
// veil is a one-beat ritual before the site appears, not a spinner.

// Veil doubles as the prefetch gate. warmPlacesMapCache now awaits its
// critical batch (~660 tile fetches: world z=0-3 + per-city odd-zoom
// ramp), so the real dismiss time depends on network. MIN is a floor
// so users always see a composed arrival moment; MAX caps worst-case
// so slow networks don't trap them.
const MIN_MS = 3000;
const MAX_MS = 9000;

export function ArrivalVeil() {
  // Server render + first client render both show the veil — prevents
  // hydration mismatch. The sessionStorage check happens in useEffect
  // and can dismiss immediately on return visits.
  const [visible, setVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Previously skipped the veil on return visits via sessionStorage.
    // Removed: reloads were dismissing the veil in <1 s and the tile
    // prefetch had no window to run. The veil is the warm-up gate now.

    const start = performance.now();
    const centers = cities.map((c) => c.view.center);

    // Kick off all background work in parallel.
    const warm = warmPlacesMapCache(centers);
    const placesChunk = import("@/components/sections/places");
    const mapChunk = import("@/components/visuals/city-map");

    const dismiss = () => setVisible(false);

    const settle = async () => {
      try {
        await Promise.all([warm, placesChunk, mapChunk]);
      } catch {
        /* a chunk failing shouldn't keep the veil up */
      }
      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN_MS - elapsed);
      window.setTimeout(dismiss, wait);
    };

    void settle();
    const maxTimer = window.setTimeout(dismiss, MAX_MS);
    return () => window.clearTimeout(maxTimer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="arrival-veil"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
          transition={{ duration: 0.95, ease: [0.19, 1, 0.22, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-night"
          aria-hidden
        >
          <div className="flex flex-col items-center gap-7">
            <BrailleLoader />
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: reducedMotion ? 120 : [0, 140, 120],
                opacity: 1,
              }}
              transition={{
                duration: reducedMotion ? 0.4 : 1.6,
                ease: [0.19, 1, 0.22, 1],
                times: reducedMotion ? undefined : [0, 0.55, 1],
              }}
              className="h-px bg-paper"
            />
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: reducedMotion ? 0 : 0.5,
                ease: [0.19, 1, 0.22, 1],
              }}
              className="font-sans text-[0.65rem] uppercase tracking-[0.4em] text-paper/55"
            >
              Arriving
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
