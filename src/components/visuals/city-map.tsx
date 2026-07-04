"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import maplibregl, { type Map as MLMap, type LngLatLike } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { TripsLayer } from "@deck.gl/geo-layers";
import { PathLayer } from "@deck.gl/layers";

export interface CityView {
  center: [number, number];
  zoom: number;
  pitch: number;
  bearing: number;
}

export interface CityMapHandle {
  flyTo: (v: CityView) => void;
  jumpTo: (v: CityView) => void;
  reseedTrips: () => void;
}

interface Props {
  initial: CityView;
  className?: string;
  /** Fires once the map has settled AND tiles at the new viewport are loaded. */
  onLanded?: () => void;
  /** Fires the moment a flyTo / jumpTo starts. */
  onDeparting?: () => void;
  /** Pairs of [lng,lat] endpoints; each pair becomes one great-circle arc. */
  arcPairs?: Array<[[number, number], [number, number]]>;
  /** When true, arcs render as soft sun-gold paths over the globe. */
  showArcs?: boolean;
  /**
   * Views to silently sequence through on map load — primes the real
   * MapLibre SourceCache with parsed tiles at each city's landing zoom,
   * so later flyTo requests render instantly (no fetch, no parse, no
   * blank). Cancelled on any user-initiated flyTo / jumpTo.
   */
  preWarmViews?: CityView[];
  /** Fires after the pre-warm sequence finishes (or was cancelled). */
  onPreWarmed?: () => void;
}

// Warm Reserve palette — every value pulled from globals.css OKLCH tokens
// (converted to hex for MapLibre). Any new color added here should trace
// back to a token.
const PAPER = "#f4ecd8";          // --color-paper
const INK = "#2b2417";            // --color-ink        (warm dark)
const INK_SOFT = "#635445";       // --color-ink-soft   (muted warm mid)
const INK_FAINT = "#948871";      // --color-ink-faint  (lifted warm)
const NIGHT = "#2a2014";          // --color-night
const NIGHT_DEEP = "#1a140c";     // darker than night, shadow baseline
const DUSK = "#a55c33";           // --color-dusk
const SUN = "#e8b55f";            // --color-sun
const MOSS = "#4e6e48";           // --color-moss dark side
const WATER = "#1b130a";          // deep warm ink for water — still nearly
                                  // black but kept on-palette with the
                                  // rest of the site's warm tokens.
// Sandstone extrapolations from the warm palette — the lit faces of
// buildings. Not yet design tokens; promote to globals.css if these
// values prove out across all eight cities.
const SAND = "#b8a37d";
const SAND_LIT = "#d4bd8c";

// Trips layer colors — sun for ordinary streets, dusk for major arteries
const TRIP_COLOR_SUN: [number, number, number] = [232, 181, 95];
const TRIP_COLOR_DUSK: [number, number, number] = [165, 92, 51];

const STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";

type Trip = {
  path: [number, number][];
  timestamps: number[];
  color: [number, number, number];
};

const TRIPS_LOOP_MS = 6000;   // one lap around the animation clock
const TRIP_TRAIL_MS = 1400;   // how long a trail lingers
const MAX_TRIPS = 8000;       // target per city — dense, city-scale traffic

export const CityMap = forwardRef<CityMapHandle, Props>(function CityMap(
  { initial, className, onLanded, onDeparting, arcPairs, showArcs, preWarmViews, onPreWarmed },
  ref,
) {
  const onLandedRef = useRef(onLanded);
  const onDepartingRef = useRef(onDeparting);
  const onPreWarmedRef = useRef(onPreWarmed);
  const showArcsRef = useRef(!!showArcs);
  const preWarmViewsRef = useRef(preWarmViews);
  useEffect(() => { onLandedRef.current = onLanded; }, [onLanded]);
  useEffect(() => { onDepartingRef.current = onDeparting; }, [onDeparting]);
  useEffect(() => { onPreWarmedRef.current = onPreWarmed; }, [onPreWarmed]);
  useEffect(() => { showArcsRef.current = !!showArcs; }, [showArcs]);
  useEffect(() => { preWarmViewsRef.current = preWarmViews; }, [preWarmViews]);
  // Precompute great-circle paths once per arcPairs identity.
  const arcPathsRef = useRef<Array<{ path: [number, number][] }>>([]);
  useEffect(() => {
    arcPathsRef.current = (arcPairs ?? []).map((p) => ({
      path: greatCirclePath(p[0], p[1], 64),
    }));
  }, [arcPairs]);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MLMap | null>(null);
  const overlayRef = useRef<MapboxOverlay | null>(null);
  const tripsRef = useRef<Trip[]>([]);
  const rafRef = useRef<number | null>(null);
  const tripsReseedTokenRef = useRef(0);
  // Bumped on any user-initiated flyTo / jumpTo. The pre-warm loop
  // reads this before each iteration and aborts if it's changed.
  const preWarmTokenRef = useRef(0);
  // While true, the map's idle listener suppresses onLanded + trip
  // reseeding — those are only meaningful for user-initiated flights.
  const preWarmActiveRef = useRef(false);
  // Collected once after the palette applies. Used to fade buildings
  // out during flight and fade them back in on landing, so a flyTo
  // passes through clean base map (no fill-extrusion cost mid-transition)
  // and buildings resolve only once the city is settled.
  const buildingLayerIdsRef = useRef<string[]>([]);

  // Fade the building extrusion layers to the given opacity. Uses the
  // `-transition` installed in style.load so 0/1 transitions smoothly.
  const setBuildingsOpacity = (map: MLMap, opacity: number) => {
    for (const id of buildingLayerIdsRef.current) {
      try {
        map.setPaintProperty(id, "fill-extrusion-opacity", opacity);
      } catch {
        /* layer may have been removed */
      }
    }
  };

  useImperativeHandle(ref, () => ({
    flyTo: (v) => {
      const m = mapRef.current;
      if (!m) return;
      // User-initiated navigation — abort any in-progress pre-warm.
      preWarmTokenRef.current++;
      // Hide buildings for the duration of flight. They'll fade back
      // in on idle. Progressive render: map → buildings → trips.
      setBuildingsOpacity(m, 0);
      onDepartingRef.current?.();
      // Compute explicit duration + curve from great-circle distance.
      //
      // duration: Using `speed` + `maxDuration` causes MapLibre to silently
      //   jumpTo when the natural duration would exceed maxDuration — the
      //   exact failure that made intercontinental hops look teleported.
      //
      // curve: lower curve = flatter arc = less zoom-out at the midpoint.
      //   Short hops (near cities) get a very flat arc that stays at higher
      //   zoom so prefetched city tiles cover the whole flight. Long hops
      //   get a taller arc so the camera still shows the planet.
      const from = m.getCenter();
      const distKm = haversineKm(from.lng, from.lat, v.center[0], v.center[1]);
      const duration = Math.max(3200, Math.min(6000, 2400 + distKm * 0.22));
      // Every flight peaks at z=2 — uniform "zoom out to globe, fly,
      // zoom back in" trajectory. MapLibre `minZoom` option overrides
      // the natural curve and guarantees the midpoint zoom. Mid-flight
      // tiles always land on the world z=2/z=3 cache; approach/ramp
      // tiles are covered by the pre-warm ladder below.
      m.flyTo({
        center: v.center as LngLatLike,
        zoom: v.zoom,
        pitch: v.pitch,
        bearing: v.bearing,
        duration,
        minZoom: 2,
        essential: true,
      });
    },
    jumpTo: (v) => {
      const m = mapRef.current;
      if (!m) return;
      preWarmTokenRef.current++;
      setBuildingsOpacity(m, 0);
      onDepartingRef.current?.();
      m.jumpTo({
        center: v.center as LngLatLike,
        zoom: v.zoom,
        pitch: v.pitch,
        bearing: v.bearing,
      });
    },
    reseedTrips: () => {
      scheduleReseed();
    },
  }));

  // Progressive reseed — key UX rule: typography must appear the instant
  // the map lands. Building 8k trips synchronously blocks the main thread
  // for 200-500ms and visibly jitters the fade-in. Instead we:
  //   1. Clear trips immediately so the first frame after landing is
  //      clean (no leftover trips from the previous city).
  //   2. Let the landing UI animate for ~500ms untouched.
  //   3. Extract candidates (cheap — just collect features).
  //   4. Push trips in batches: a tiny first batch of 100 so users see
  //      motion right away, then 500 every ~150ms until MAX_TRIPS.
  // Each batch is a NEW array reference, so deck.gl only re-uploads once
  // per batch — not every frame.
  const scheduleReseed = () => {
    const token = ++tripsReseedTokenRef.current;
    const map = mapRef.current;
    if (!map) return;
    tripsRef.current = []; // clean slate on arrival
    const run = () => {
      if (token !== tripsReseedTokenRef.current) return;
      if (!map.loaded() || map.isMoving()) {
        window.setTimeout(run, 200);
        return;
      }
      const candidates = extractTripCandidates(map);
      if (candidates.length === 0) return;
      const firstBatch = 100;
      const stepBatch = 500;
      const stepMs = 150;
      let built = 0;
      const buildNext = (targetCount: number) => {
        if (token !== tripsReseedTokenRef.current) return;
        const end = Math.min(targetCount, MAX_TRIPS);
        const batch = buildTripsFromCandidates(candidates, built, end);
        // New array reference so deck.gl re-uploads this batch once.
        tripsRef.current = tripsRef.current.concat(batch);
        built = end;
        if (built < MAX_TRIPS) {
          window.setTimeout(() => buildNext(built + stepBatch), stepMs);
        }
      };
      // 500ms after idle: typography fade-in is ~60% through, first trips
      // appear as motion settles — feels like traffic catching up, not a
      // hard pop.
      window.setTimeout(() => buildNext(firstBatch), 500);
    };
    window.setTimeout(run, 150);
  };

  // Wait for one `idle` event on the map, or bail after `timeoutMs`.
  // Used during pre-warm — MapLibre fires idle after every tile in the
  // current viewport has painted.
  const waitForIdle = (map: MLMap, timeoutMs: number): Promise<void> =>
    new Promise<void>((res) => {
      let resolved = false;
      const done = () => {
        if (resolved) return;
        resolved = true;
        map.off("idle", done);
        window.clearTimeout(timer);
        res();
      };
      const timer = window.setTimeout(done, timeoutMs);
      map.on("idle", done);
    });

  // Pre-warm (real map): visit each city at its real landing view so
  // MapLibre parses + caches z=14/z=15 tiles in its own SourceCache.
  // This is the visible phase — we hold opacity 0 over the map until
  // it finishes and the globe is restored. The longer ramp (z=6-13
  // per city) is handled separately at the HTTP layer by
  // `warmPlacesMapCache`, which runs from the arrival veil and doesn't
  // move the camera.
  const runPreWarm = async (map: MLMap) => {
    const views = preWarmViewsRef.current;
    if (!views?.length) {
      onPreWarmedRef.current?.();
      return;
    }
    const token = ++preWarmTokenRef.current;
    preWarmActiveRef.current = true;

    for (const v of views) {
      if (token !== preWarmTokenRef.current) break;
      map.jumpTo({
        center: v.center as LngLatLike,
        zoom: v.zoom,
        pitch: v.pitch,
        bearing: v.bearing,
      });
      await waitForIdle(map, 3000);
    }

    // Restore globe so the first thing the user sees is the composed
    // globe, not the last pre-warmed city.
    if (token === preWarmTokenRef.current) {
      map.jumpTo({
        center: initial.center as LngLatLike,
        zoom: initial.zoom,
        pitch: initial.pitch,
        bearing: initial.bearing,
      });
      await waitForIdle(map, 1000);
    }
    preWarmActiveRef.current = false;
    onPreWarmedRef.current?.();
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current) return;

    // Doubled worker pool so PBF + building-extrusion parses during
    // zoom-in don't queue-stall. Default 4 → 8. One-time, module-level.
    try {
      maplibregl.setWorkerCount(8);
    } catch {
      /* older maplibre without setWorkerCount */
    }

    const map = new maplibregl.Map({
      container,
      style: STYLE_URL,
      center: initial.center as LngLatLike,
      zoom: initial.zoom,
      pitch: initial.pitch,
      bearing: initial.bearing,
      attributionControl: false,
      interactive: false,
      renderWorldCopies: false,
      // Snap new tiles in instead of fading — stops the "half-blank /
      // half-grey" look mid-flight at the cost of a minor pop.
      fadeDuration: 0,
      // Default cache is 500 tiles; 8 cities × many zooms fills past
      // that and we risk LRU evicting pre-warmed tiles. 2000 is ~50MB
      // in practice, worth it for never re-parsing a warm tile.
      maxTileCacheSize: 2000,
    });

    // Globe projection — gives the flyTo a real planetary arc at low zoom.
    map.on("style.load", () => {
      try {
        map.setProjection({ type: "globe" });
      } catch {
        // older maplibre fallback: no-op
      }
      applyReservePalette(map);
      // Collect fill-extrusion building layer ids + install the opacity
      // transition once. Individual opacity changes (0 on flyTo, 1 on
      // land) then animate rather than snap.
      const style = map.getStyle();
      if (style?.layers) {
        const ids = style.layers
          .filter((l) => l.type === "fill-extrusion" && /^building/i.test(l.id))
          .map((l) => l.id);
        buildingLayerIdsRef.current = ids;
        for (const id of ids) {
          map.setPaintProperty(id, "fill-extrusion-opacity-transition", {
            duration: 450,
            delay: 0,
          });
        }
      }
      // Real-map pre-warm: silently jumpTo each city at its landing
      // viewport so MapLibre parses and caches those tiles in its own
      // SourceCache. Subsequent user flyTo requests then render from
      // parsed tiles — no fetch, no parse, no blank.
      void runPreWarm(map);
    });

    // Low-zoom HTTP prefetch (world z=0..3) is fired from the homepage's
    // arrival veil. Real z=12-15 tiles are warmed by runPreWarm above.

    // deck.gl overlay — TripsLayer rides on top of MapLibre
    const overlay = new MapboxOverlay({ interleaved: false, layers: [] });
    map.addControl(overlay as unknown as maplibregl.IControl);
    overlayRef.current = overlay;

    // `idle` fires repeatedly: after moveend, after every background
    // tile settles, after a style re-paint. If we reseed trips on every
    // fire the animation visibly resets every few seconds. Dedupe by
    // a view-key (rounded center + zoom) so reseed only runs when the
    // camera actually moved to a new place.
    let lastViewKey = "";
    map.on("idle", () => {
      if (preWarmActiveRef.current) return;
      const c = map.getCenter();
      const z = map.getZoom();
      const key = `${c.lng.toFixed(3)}|${c.lat.toFixed(3)}|${z.toFixed(2)}`;
      if (key === lastViewKey) return;
      lastViewKey = key;
      // Progressive reveal: map tiles are already painted (idle fired);
      // now fade buildings in. Trips follow ~500 ms later via reseed.
      setBuildingsOpacity(map, 1);
      scheduleReseed();
      onLandedRef.current?.();
    });

    mapRef.current = map;
    // Expose for runtime inspection during dev only
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __reserveMap?: MLMap }).__reserveMap = map;
    }

    // Animation loop: update TripsLayer currentTime + (optionally) arcs.
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = elapsed % TRIPS_LOOP_MS;
      const ov = overlayRef.current;
      if (ov) {
        const layers: Array<PathLayer<{ path: [number, number][] }> | TripsLayer<Trip>> = [];
        if (showArcsRef.current && arcPathsRef.current.length) {
          layers.push(
            new PathLayer<{ path: [number, number][] }>({
              id: "city-arcs",
              data: arcPathsRef.current,
              getPath: (d) => d.path,
              getColor: [232, 181, 95, 95], // SUN, low alpha — weather, not signal
              widthUnits: "pixels",
              getWidth: 1,
              widthMinPixels: 0.8,
              jointRounded: true,
              capRounded: true,
            }),
          );
        }
        if (tripsRef.current.length) {
          layers.push(
            new TripsLayer<Trip>({
              id: "city-trips",
              data: tripsRef.current,
              getPath: (d) => d.path,
              getTimestamps: (d) => d.timestamps,
              getColor: (d) => d.color,
              opacity: 0.9,
              widthMinPixels: 1.4,
              jointRounded: true,
              capRounded: true,
              trailLength: TRIP_TRAIL_MS,
              currentTime: t,
            }),
          );
        }
        if (layers.length) ov.setProps({ layers });
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      map.remove();
      mapRef.current = null;
      overlayRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div aria-hidden role="presentation" className={className}>
      {/* Inner wrapper guarantees MapLibre's container is non-static,
          regardless of how the outer className positions us. */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundColor: NIGHT,
        }}
      />
    </div>
  );
});

// ---------------------------------------------------------------------------
// Trip extraction, split into two phases so we can schedule work around
// the landing animation:
//   1. extractTripCandidates — query source features, classify, shuffle.
//      Runs once per landing; ~20-50ms for 10k features.
//   2. buildTripsFromCandidates — slice a range and build TripsLayer-shaped
//      records with timestamps. Called repeatedly in small batches as the
//      progressive reseed streams trips onto the map.
// ---------------------------------------------------------------------------

type TripCandidate = { coords: [number, number][]; classId: number };

function extractTripCandidates(map: MLMap): TripCandidate[] {
  const style = map.getStyle();
  if (!style?.layers || !style?.sources) return [];

  // Prefer querySourceFeatures: returns EVERY feature currently loaded in
  // the source tiles (thousands per city), not just what's rendered at the
  // current viewport/zoom.
  type RoadFeature = { geometry: GeoJSON.Geometry; properties: Record<string, unknown> | null };
  let features: RoadFeature[] = [];
  const transportSourceLayers = ["transportation", "transportation_name"];
  for (const sid of Object.keys(style.sources)) {
    for (const sourceLayer of transportSourceLayers) {
      try {
        const got = map.querySourceFeatures(sid, { sourceLayer });
        if (got.length) features.push(...(got as unknown as RoadFeature[]));
      } catch {
        /* source may not have this sourceLayer */
      }
    }
  }

  // Fallback for styles without OpenMapTiles naming — rendered features only.
  if (features.length === 0) {
    const roadLayerIds = style.layers
      .filter(
        (l) =>
          l.type === "line" &&
          /road|highway|street|transport|motorway|primary|secondary/i.test(l.id),
      )
      .map((l) => l.id);
    if (roadLayerIds.length === 0) return [];
    try {
      features = map.queryRenderedFeatures(undefined, { layers: roadLayerIds }) as unknown as RoadFeature[];
    } catch {
      return [];
    }
  }

  const candidates: Array<TripCandidate & { length: number }> = [];
  for (const f of features) {
    const geom = f.geometry;
    if (!geom) continue;
    if (geom.type === "LineString") {
      const coords = geom.coordinates as [number, number][];
      if (coords.length >= 4) {
        candidates.push({
          coords,
          length: lineLength(coords),
          classId: classify(f.properties ?? {}),
        });
      }
    } else if (geom.type === "MultiLineString") {
      for (const line of geom.coordinates) {
        const coords = line as [number, number][];
        if (coords.length >= 4) {
          candidates.push({
            coords,
            length: lineLength(coords),
            classId: classify(f.properties ?? {}),
          });
        }
      }
    }
  }

  // Keep a generous top-N by length, then shuffle so each batch mixes
  // long and short trips.
  candidates.sort((a, b) => b.length - a.length);
  const pool = candidates.slice(0, Math.max(MAX_TRIPS * 2, 1000));
  shuffle(pool);
  return pool.map((c) => ({ coords: c.coords, classId: c.classId }));
}

function buildTripsFromCandidates(
  pool: TripCandidate[],
  from: number,
  to: number,
): Trip[] {
  if (pool.length === 0 || to <= from) return [];
  const out: Trip[] = [];
  for (let i = from; i < to; i++) {
    // Wrap-around: if target count exceeds pool size, restage existing
    // paths with fresh timing so total count can always reach MAX_TRIPS.
    const c = pool[i % pool.length];
    const duration = 2200 + Math.random() * 2600; // 2.2–4.8s per trip
    const startOffset = Math.random() * TRIPS_LOOP_MS;
    const color = c.classId > 1 ? TRIP_COLOR_DUSK : TRIP_COLOR_SUN;
    out.push({
      path: c.coords,
      timestamps: buildTimestamps(c.coords, startOffset, duration),
      color,
    });
  }
  return out;
}

function classify(props: Record<string, unknown>): number {
  const cls = String(props.class ?? props.type ?? props.highway ?? "");
  if (/motorway|trunk|primary/i.test(cls)) return 2;
  if (/secondary|tertiary/i.test(cls)) return 1;
  return 0;
}

function lineLength(coords: [number, number][]): number {
  let s = 0;
  for (let i = 1; i < coords.length; i++) {
    const [ax, ay] = coords[i - 1];
    const [bx, by] = coords[i];
    s += Math.hypot(bx - ax, by - ay);
  }
  return s;
}

function buildTimestamps(
  coords: [number, number][],
  startMs: number,
  durationMs: number,
): number[] {
  const cumulative: number[] = [0];
  for (let i = 1; i < coords.length; i++) {
    const [ax, ay] = coords[i - 1];
    const [bx, by] = coords[i];
    cumulative.push(cumulative[i - 1] + Math.hypot(bx - ax, by - ay));
  }
  const total = cumulative[cumulative.length - 1] || 1;
  return cumulative.map((d) => startMs + (d / total) * durationMs);
}

function shuffle<T>(a: T[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}

// ---------------------------------------------------------------------------
// Palette override: strip labels/borders, recolor water/land/roads, add 3D
// building extrusions in warm ink.
// ---------------------------------------------------------------------------
function applyReservePalette(map: MLMap) {
  const style = map.getStyle();
  if (!style?.layers) return;

  // Warm afternoon light — gives fill-extrusion buildings a clear lit
  // face + shadowed face, which is what reads as "3D" to the eye.
  try {
    map.setLight({
      anchor: "viewport",
      color: "#f3d9a6",
      intensity: 0.5,
      position: [1.5, 210, 30],
    });
  } catch {
    /* older maplibre may not support this; ignore */
  }

  // Warm atmospheric fog — gives the globe midpoint of flights a visible
  // horizon instead of a flat dark void, and softens the mercator→globe
  // morph around z≈6.
  try {
    (map as unknown as { setSky?: (sky: Record<string, unknown>) => void }).setSky?.({
      "sky-color": NIGHT,
      "sky-horizon-blend": 0.6,
      "horizon-color": INK_SOFT,
      "horizon-fog-blend": 0.5,
      "fog-color": NIGHT_DEEP,
      "fog-ground-blend": 0.5,
      "atmosphere-blend": [
        "interpolate", ["linear"], ["zoom"],
        0, 0.9,
        6, 0.5,
        10, 0,
      ],
    });
  } catch {
    /* sky api varies across versions */
  }

  for (const layer of style.layers) {
    const id = layer.id;
    const type = layer.type;

    if (type === "symbol") {
      // Machine layer on the planet: keep ONLY city + major-country names,
      // restyled to the site's kicker grammar (uppercase, tracked-out,
      // paper on a night halo, latin-only). Everything else — POIs, road
      // names, shields, transit — is noise and stays hidden.
      if (/^label_(city(_capital)?|country_[12])$/.test(id)) {
        const isCountry = /country/.test(id);
        map.setLayoutProperty(id, "visibility", "visible");
        map.setLayoutProperty(id, "text-field", [
          "coalesce",
          ["get", "name:latin"],
          ["get", "name_en"],
          ["get", "name"],
        ]);
        map.setLayoutProperty(id, "text-transform", "uppercase");
        map.setLayoutProperty(id, "text-letter-spacing", 0.14);
        if (!isCountry) {
          // Liberty pins a black circle sprite to city labels below z9 —
          // invisible-to-ugly on the night ground.
          map.setLayoutProperty(id, "icon-image", "");
        }
        map.setPaintProperty(id, "text-color", PAPER);
        map.setPaintProperty(id, "text-opacity", isCountry ? 0.5 : 0.82);
        map.setPaintProperty(id, "text-halo-color", NIGHT_DEEP);
        map.setPaintProperty(id, "text-halo-width", 1.2);
        map.setPaintProperty(id, "text-halo-blur", 0.6);
      } else {
        map.setLayoutProperty(id, "visibility", "none");
      }
      continue;
    }
    // Casing layers double every road with a wide pale underlay — the main
    // reason streets read daylight-grey. The night city keeps fills only.
    if (/_casing$/.test(id)) {
      map.setLayoutProperty(id, "visibility", "none");
      continue;
    }
    // Pattern fills (wetland hatch, pedestrian-area dots) can't be
    // recolored via paint — they render as bright sprite stripes at night.
    if (
      type === "fill" &&
      (layer.paint as Record<string, unknown> | undefined)?.["fill-pattern"]
    ) {
      map.setLayoutProperty(id, "visibility", "none");
      continue;
    }
    // Admin boundaries: keep country-level (boundary_2 in OpenMapTiles,
    // plus disputed) as faint warm hairlines so continents read during
    // the low-zoom midpoint of flights. Hide sub-national detail.
    if (/boundary|admin/i.test(id)) {
      if (/boundary_2|boundary_disputed|admin.*level.*1|admin.*0/i.test(id)) {
        if (layer.type === "line") {
          map.setLayoutProperty(id, "visibility", "visible");
          map.setPaintProperty(id, "line-color", DUSK);
          map.setPaintProperty(id, "line-opacity", 0.5);
          map.setPaintProperty(id, "line-width", 0.7);
        }
      } else {
        map.setLayoutProperty(id, "visibility", "none");
      }
      continue;
    }
    if (/hillshade|contour|terrain/i.test(id)) {
      map.setLayoutProperty(id, "visibility", "none");
      continue;
    }
    if (type === "background") {
      map.setPaintProperty(id, "background-color", NIGHT);
      continue;
    }
    // Natural-earth shaded relief raster — the globe's landmasses.
    // Near-total desaturation kills NE2's daylight greens (partial desat
    // left a grey-green "overcast" planet; hue-rotation turned the Sahara
    // lavender — both tried, both worse). Moon-stone relief on near-black
    // ocean; the warmth comes from the night ground + vignette around it.
    if (type === "raster" && /natural_earth|ne2|shaded|hillshade/i.test(id)) {
      map.setPaintProperty(id, "raster-brightness-min", 0.05);
      map.setPaintProperty(id, "raster-brightness-max", 0.42);
      map.setPaintProperty(id, "raster-saturation", -0.85);
      map.setPaintProperty(id, "raster-contrast", 0.4);
      // Slight transparency lets the warm night ground bleed through the
      // grey — and softens the pre-water-fill loading transient.
      map.setPaintProperty(id, "raster-opacity", 0.92);
      continue;
    }
    // Waterway LINES (rivers, canals) keep liberty's daylight blue unless
    // recolored — the fill rule below only catches polygons.
    if (type === "line" && /waterway|water|river|canal/i.test(id)) {
      map.setPaintProperty(id, "line-color", WATER);
      map.setPaintProperty(id, "line-opacity", 0.9);
      continue;
    }
    // Airports: pale grey aprons/runways in liberty — sink them into ink.
    if (/aeroway/i.test(id)) {
      if (type === "fill") {
        map.setPaintProperty(id, "fill-color", INK);
        map.setPaintProperty(id, "fill-opacity", 0.6);
      } else if (type === "line") {
        map.setPaintProperty(id, "line-color", INK_SOFT);
        map.setPaintProperty(id, "line-opacity", 0.35);
      }
      continue;
    }
    if (/water|ocean|lake|river/i.test(id) && type === "fill") {
      map.setPaintProperty(id, "fill-color", WATER);
      map.setPaintProperty(id, "fill-opacity", 1);
      continue;
    }
    if (/landuse|landcover|earth|park/i.test(id) && type === "fill") {
      // Parks / wooded landcover lean moss; generic landuse stays warm dark.
      // Green target is LOW (0.3): park + wood + grass fills STACK on the
      // same ground — at 0.55 each they compounded into daylight sage.
      const isGreen = /park|wood|grass/i.test(id);
      map.setPaintProperty(id, "fill-color", isGreen ? MOSS : INK);
      // At low zoom, fade landuse so the natural_earth raster shows through
      // and the flight midpoint has visible land/sea texture. Opaque by z=11.
      map.setPaintProperty(id, "fill-opacity", [
        "interpolate", ["linear"], ["zoom"],
        0, 0,
        8, 0,
        11, isGreen ? 0.3 : 1,
      ]);
      continue;
    }
    if (/^building/i.test(id)) {
      if (type === "fill") {
        map.setLayoutProperty(id, "visibility", "none");
      } else if (type === "fill-extrusion") {
        // Start extrusion at z=13 (was z=12). Pushes the big
        // geometry-upload moment out of the fast zoom-in window, so
        // the last second of landing doesn't thrash the GPU with
        // thousands of newly-visible building meshes. Buildings at
        // z=12 were barely discernible anyway.
        map.setLayerZoomRange(id, 13, 22);
        // Token-driven height gradient: ink (shadow base) → ink-soft (mid
        // mass) → ink-faint (lifted tops that catch the afternoon light).
        map.setPaintProperty(id, "fill-extrusion-color", [
          "interpolate",
          ["linear"],
          [
            "coalesce",
            ["get", "render_height"],
            ["get", "height"],
            10,
          ],
          0, INK_SOFT,
          30, INK_FAINT,
          120, SAND,
          260, SAND_LIT,
        ]);
        map.setPaintProperty(id, "fill-extrusion-opacity", 1.0);
        // Keep the vertical gradient ON — this is what gives buildings
        // their 3D lift (lighter tops, darker bases).
        map.setPaintProperty(id, "fill-extrusion-vertical-gradient", true);
      }
      continue;
    }
    if (type === "line" && /road|highway|street|bridge|tunnel|transport/i.test(id)) {
      if (/motorway|trunk|highway/i.test(id)) {
        map.setPaintProperty(id, "line-color", INK_SOFT);
        map.setPaintProperty(id, "line-opacity", 0.55);
      } else if (/primary|secondary/i.test(id)) {
        map.setPaintProperty(id, "line-color", INK_SOFT);
        map.setPaintProperty(id, "line-opacity", 0.4);
      } else {
        map.setPaintProperty(id, "line-color", INK);
        map.setPaintProperty(id, "line-opacity", 0.5);
      }
      continue;
    }
    if (type === "line" && /rail|train|transit/i.test(id)) {
      map.setPaintProperty(id, "line-color", NIGHT_DEEP);
      map.setPaintProperty(id, "line-opacity", 0.3);
      continue;
    }
  }

  void SUN;
}

// Prefetch logic has moved to src/lib/map-prefetch.ts. It's fired from the
// homepage's <ArrivalVeil /> on mount — starts seconds before this Map
// even mounts.

function haversineKm(lng1: number, lat1: number, lng2: number, lat2: number): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));
}

// Slerp-interpolated great-circle path between two lng/lat points. Used by
// the PathLayer to draw the globe-view arcs — follows the planet's curve
// rather than a straight screen-space line.
function greatCirclePath(
  a: [number, number],
  b: [number, number],
  n: number,
): [number, number][] {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const toDeg = (r: number) => (r * 180) / Math.PI;
  const lng1 = toRad(a[0]);
  const lat1 = toRad(a[1]);
  const lng2 = toRad(b[0]);
  const lat2 = toRad(b[1]);
  const d =
    2 *
    Math.asin(
      Math.sqrt(
        Math.sin((lat2 - lat1) / 2) ** 2 +
          Math.cos(lat1) * Math.cos(lat2) * Math.sin((lng2 - lng1) / 2) ** 2,
      ),
    );
  if (d === 0) return [a, b];
  const out: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const f = i / n;
    const A = Math.sin((1 - f) * d) / Math.sin(d);
    const B = Math.sin(f * d) / Math.sin(d);
    const x = A * Math.cos(lat1) * Math.cos(lng1) + B * Math.cos(lat2) * Math.cos(lng2);
    const y = A * Math.cos(lat1) * Math.sin(lng1) + B * Math.cos(lat2) * Math.sin(lng2);
    const z = A * Math.sin(lat1) + B * Math.sin(lat2);
    const lat = Math.atan2(z, Math.sqrt(x * x + y * y));
    const lng = Math.atan2(y, x);
    out.push([toDeg(lng), toDeg(lat)]);
  }
  return out;
}

