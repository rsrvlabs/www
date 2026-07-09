"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { CityMapHandle, CityView } from "@/components/visuals/city-map";
import { cities, GLOBE_VIEW } from "@/data/places";

const CityMap = dynamic(
  () => import("@/components/visuals/city-map").then((m) => m.CityMap),
  { ssr: false },
);

export function Places() {
  // Three-state model:
  //   committed = null, landed = null  → globe (first screen, arcs visible)
  //   committed = N,    landed = null  → flying to N (pips disabled)
  //   committed = N,    landed = N     → landed on N (pips enabled)
  const [committed, setCommitted] = useState<number | null>(null);
  const [landed, setLanded] = useState<number | null>(null);
  // Hidden until the map pre-warms each city's z=14/15 landing tiles
  // (Tier 1 only; ramp zooms are handled at HTTP level). That takes
  // ~4-5 s. Fallback reveal at 8 s so the user isn't stuck on the
  // placeholder if a tile load stalls.
  const [preWarmed, setPreWarmed] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setPreWarmed(true), 8000);
    return () => window.clearTimeout(t);
  }, []);

  // Mobile (below md): skip the 8-city pre-warm sequence — parsing eight
  // cities of z≈15 vector tiles is heavy on phone CPU + data for a maybe-
  // one-city visit. Empty views → onPreWarmed fires immediately, so the
  // globe reveals as soon as it paints; a first flight streams its tiles
  // during the approach instead of landing pre-composed.
  const preWarmViews = useMemo(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return [];
    return cities.map((c) => c.view);
  }, []);

  // Mobile: the z=1.4 globe is wider than a phone viewport (the sphere's
  // pixel size is fixed per zoom) — drop to z=1 so the whole planet
  // composes inside the narrow first screen instead of being cropped.
  const initialView = useMemo<CityView>(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return { ...GLOBE_VIEW, zoom: 1 };
    }
    return GLOBE_VIEW;
  }, []);

  const mapRef = useRef<CityMapHandle | null>(null);
  const committedRef = useRef<number | null>(null);
  const landedRef = useRef<number | null>(null);
  const isFlyingRef = useRef(false);
  const reducedMotion = useReducedMotion();

  // Every city is a hub — full mesh between all eight. 28 arcs.
  const arcPairs = useMemo<Array<[[number, number], [number, number]]>>(() => {
    const pairs: Array<[[number, number], [number, number]]> = [];
    for (let i = 0; i < cities.length; i++) {
      for (let j = i + 1; j < cities.length; j++) {
        pairs.push([cities[i].view.center, cities[j].view.center]);
      }
    }
    return pairs;
  }, []);

  const fly = (idx: number) => {
    const map = mapRef.current;
    if (!map) return;
    const view = cities[idx].view;
    if (reducedMotion) {
      map.jumpTo(view);
      return;
    }
    map.flyTo(view);
  };

  const tryCommit = (idx: number) => {
    // Hard gate: during a flight the pips are disabled. This guard is a
    // belt-and-braces — the button also carries `disabled`.
    if (isFlyingRef.current) return;
    if (idx === committedRef.current && idx === landedRef.current) return;
    committedRef.current = idx;
    setCommitted(idx);
    fly(idx);
  };

  const handleDeparting = () => {
    isFlyingRef.current = true;
    landedRef.current = null;
    setLanded(null);
  };
  const handleLanded = () => {
    isFlyingRef.current = false;
    landedRef.current = committedRef.current;
    setLanded(committedRef.current);
  };

  const landedCity = landed !== null ? cities[landed] : null;
  const onGlobe = committed === null && landed === null;
  const inFlight = committed !== null && landed !== committed;
  // Arcs only on the first-screen globe. Once the user picks a city they
  // never see arcs again — keeps subsequent flights uncluttered.
  const showArcs = onGlobe;

  return (
    <section
      id="places"
      className="relative min-h-[100svh] overflow-hidden bg-night"
    >
      <div className="relative h-[100svh] w-full overflow-hidden">
        <div
          className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
            preWarmed ? "opacity-100" : "opacity-0"
          }`}
        >
          <CityMap
            ref={mapRef}
            initial={initialView}
            arcPairs={arcPairs}
            showArcs={showArcs}
            preWarmViews={preWarmViews}
            onPreWarmed={() => setPreWarmed(true)}
            className="absolute inset-0 h-full w-full"
            onDeparting={handleDeparting}
            onLanded={handleLanded}
          />
        </div>

        {/* Placeholder while the map silently warms each city. Fades out
            as the globe fades in, so the transition reads as one beat. */}
        <AnimatePresence>
          {!preWarmed && (
            <motion.div
              key="pre-warm-placeholder"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <span className="kicker text-[0.62rem] tracking-[0.34em] text-paper/45">
                Charting eight cities
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Neutral night vignette so map edges soften into the section bg */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 50%, transparent 40%, oklch(0.145 0 0 / 0.55) 85%, oklch(0.145 0 0) 100%)",
          }}
        />

        {/* Eyebrow + counter */}
        <div className="absolute left-0 right-0 top-[8svh] z-20 mx-auto w-full max-w-[88rem] px-6 md:px-10">
          <div className="kicker flex items-baseline justify-between gap-6 text-paper/55">
            <span>N° 05 · Places — where crossed paths should count</span>
            {/* Counter never wraps: on phones the long label breaks into two
                lines and used to squeeze the counter into a broken stack. */}
            <span className="shrink-0 whitespace-nowrap tabular-nums">
              {landed !== null ? String(landed + 1).padStart(2, "0") : "——"} / {String(cities.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Left block: globe intro OR per-city typography.
            During flight this block is empty — no text misaligns with the map. */}
        <div className="absolute bottom-[12svh] left-0 right-0 z-20 mx-auto w-full max-w-[88rem] px-6 md:px-10">
          {/* Mobile city nav: compact pip row IN the text stack, directly
              above the caption — flow positioning, so it can never collide
              with the typography below it (the old absolute row hung off a
              hard-coded 13rem offset). Disabled during flight, like desktop. */}
          <nav
            aria-label="Cities"
            className="mb-8 flex w-full items-center gap-2 md:hidden"
          >
            {cities.map((c, i) => {
              const isLanded = i === landed;
              const isCommitted = i === committed && !isLanded;
              return (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => tryCommit(i)}
                  disabled={inFlight}
                  aria-current={isLanded ? "true" : undefined}
                  aria-label={c.name}
                  className="flex-1 rounded-sm py-3 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-sun/70 disabled:opacity-60"
                >
                  <span
                    className={`block h-px w-full transition-all duration-500 ${
                      isLanded
                        ? "bg-sun"
                        : isCommitted
                          ? "bg-sun/70"
                          : "bg-paper/30"
                    }`}
                  />
                </button>
              );
            })}
          </nav>
          <AnimatePresence mode="wait">
            {onGlobe && (
              <motion.div
                key="globe-intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[44ch]"
              >
                <h3 className="font-display text-paper text-[clamp(3.5rem,9vw,8rem)] leading-[0.95] tracking-[-0.02em]">
                  Eight weathers.
                </h3>
                <p className="mt-8 font-display italic text-paper/85 text-[clamp(1.1rem,1.8vw,1.5rem)] leading-[1.55]">
                  A studio in each.
                </p>
              </motion.div>
            )}
            {landedCity && (
              <motion.div
                key={landedCity.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[44ch]"
              >
                <h3 className="font-display text-paper text-[clamp(3.5rem,10vw,9rem)] leading-[0.95] tracking-[-0.02em]">
                  {landedCity.name}
                </h3>
                <div className="kicker mt-4 text-paper/55">
                  {landedCity.coords}
                </div>
                <p className="mt-8 font-display italic text-paper/85 text-[clamp(1.1rem,1.8vw,1.5rem)] leading-[1.55]">
                  {landedCity.caption}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating city postcard — only after arrival on a city (not globe).
            Pinned at a slight constant tilt: a hand-placed read against the
            engineered map, deliberately off perfect balance (restrained —
            one idiosyncratic detail for this section, not a motif). */}
        <div className="pointer-events-none absolute right-6 top-[14svh] z-20 md:right-14 md:top-[16svh]">
          <AnimatePresence mode="wait">
            {landedCity && (
              <motion.figure
                key={landedCity.slug}
                initial={{ opacity: 0, y: 14, scale: 0.96, rotate: -1.8 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: -1.8 }}
                exit={{ opacity: 0, y: -6, scale: 0.98, rotate: -1.8 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-square w-[26vw] max-w-[15rem] min-w-[9rem] overflow-hidden"
                style={{
                  // Interim neutral treatment (the weather-JPEG approach):
                  // the painted studies carry a heavy amber cast that
                  // re-warms the zero-chroma section — grayscale + dim
                  // until the materials re-shoot lands.
                  filter: "grayscale(1) brightness(0.85) contrast(1.06)",
                  boxShadow:
                    "0 18px 40px -18px oklch(0.1 0 0 / 0.85), 0 2px 6px oklch(0.1 0 0 / 0.4)",
                }}
              >
                <Image
                  src={`/materials/place-${landedCity.slug}.jpg`}
                  alt={`A painted study of ${landedCity.name}.`}
                  fill
                  sizes="15rem"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    boxShadow:
                      "inset 0 0 1px 1px oklch(0.28 0 0 / 0.6), inset 0 0 30px oklch(0.12 0 0 / 0.55)",
                  }}
                />
              </motion.figure>
            )}
          </AnimatePresence>
        </div>

        {/* Right-edge city nav — clickable pips (desktop). Anchored
            bottom-right so it clears the postcard above it.
            Disabled during flight so users can't queue mid-arc changes. */}
        <nav
          aria-label="Cities"
          className="absolute bottom-[12svh] right-6 z-30 hidden flex-col gap-3 md:flex"
        >
          {cities.map((c, i) => {
            const isLanded = i === landed;
            const isCommitted = i === committed && !isLanded;
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => tryCommit(i)}
                disabled={inFlight}
                aria-current={isLanded ? "true" : undefined}
                aria-label={c.name}
                className="group flex items-center justify-end gap-3 rounded-sm px-1 py-1 text-paper/60 transition-colors hover:text-paper focus-visible:text-paper focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-sun/70 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="font-sans text-[0.65rem] uppercase tracking-[0.28em] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {c.name}
                </span>
                <span
                  className={`block h-px transition-all duration-500 ${
                    isLanded
                      ? "w-10 bg-sun"
                      : isCommitted
                        ? "w-6 bg-sun/70"
                        : "w-3 bg-paper/30"
                  }`}
                />
              </button>
            );
          })}
        </nav>

      </div>
    </section>
  );
}
