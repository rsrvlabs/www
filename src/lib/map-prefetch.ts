// Standalone tile prefetcher for the Places map.
//
// Why this exists separate from city-map.tsx:
// The MapLibre instance is only created when the user scrolls to Places
// (dynamic import). If we wait until then to start warming tiles, the
// corridor cache is empty for the user's first flight. Running this from
// the homepage's top-level on idle means tiles are already warm in the
// browser's HTTP cache by the time the Map mounts.
//
// Dedupes via a module-level flag — multiple callers (homepage mount +
// city-map idle) all converge on one execution.

const STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";

let started = false;

type ResolvedSource = {
  type: "vector" | "raster";
  tiles: string[];
  minzoom: number;
  maxzoom: number;
};

type StyleSpec = {
  sources?: Record<
    string,
    {
      type?: string;
      url?: string;
      tiles?: string[];
      minzoom?: number;
      maxzoom?: number;
    }
  >;
};

type TileJSON = {
  tiles?: string[];
  minzoom?: number;
  maxzoom?: number;
};

async function resolveSources(): Promise<ResolvedSource[]> {
  const styleRes = await fetch(STYLE_URL, { credentials: "omit" });
  if (!styleRes.ok) return [];
  const style: StyleSpec = await styleRes.json();
  const entries = Object.entries(style.sources ?? {});
  const resolved = await Promise.all(
    entries.map(async ([, spec]): Promise<ResolvedSource | null> => {
      const type = spec.type;
      if (type !== "vector" && type !== "raster") return null;
      if (Array.isArray(spec.tiles) && spec.tiles.length) {
        return {
          type,
          tiles: [spec.tiles[0]],
          minzoom: spec.minzoom ?? 0,
          maxzoom: spec.maxzoom ?? 22,
        };
      }
      if (typeof spec.url === "string") {
        try {
          const tj: TileJSON = await fetch(spec.url, { credentials: "omit" }).then(
            (r) => r.json(),
          );
          if (Array.isArray(tj.tiles) && tj.tiles.length) {
            return {
              type,
              tiles: [tj.tiles[0]],
              minzoom: tj.minzoom ?? 0,
              maxzoom: tj.maxzoom ?? 22,
            };
          }
        } catch {
          /* tilejson fetch failed — skip this source */
        }
      }
      return null;
    }),
  );
  return resolved.filter((s): s is ResolvedSource => s !== null);
}

function templatesAt(sources: ResolvedSource[], z: number): string[] {
  const out: string[] = [];
  for (const s of sources) {
    if (z >= s.minzoom && z <= s.maxzoom) out.push(...s.tiles);
  }
  return out;
}

function formatTileUrl(tmpl: string, z: number, x: number, y: number): string {
  return tmpl
    .replace("{z}", String(z))
    .replace("{x}", String(x))
    .replace("{y}", String(y));
}

function worldTileUrls(templates: string[], z: number): string[] {
  const n = 2 ** z;
  const urls: string[] = [];
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      for (const tmpl of templates) {
        urls.push(formatTileUrl(tmpl, z, x, y));
      }
    }
  }
  return urls;
}

function lngLatToTile(lng: number, lat: number, z: number): { x: number; y: number } {
  const n = 2 ** z;
  const x = Math.floor(((lng + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n,
  );
  return { x, y };
}

function cityTileWindowUrls(
  templates: string[],
  center: [number, number],
  z: number,
  radius: number,
): string[] {
  const [lng, lat] = center;
  const { x: cx, y: cy } = lngLatToTile(lng, lat, z);
  const n = 2 ** z;
  const urls: string[] = [];
  for (let dx = -radius; dx <= radius; dx++) {
    for (let dy = -radius; dy <= radius; dy++) {
      const x = cx + dx;
      const y = cy + dy;
      if (x < 0 || y < 0 || x >= n || y >= n) continue;
      for (const tmpl of templates) {
        urls.push(formatTileUrl(tmpl, z, x, y));
      }
    }
  }
  return urls;
}

async function runFetchQueue(urls: string[], concurrency: number): Promise<void> {
  let i = 0;
  const worker = async () => {
    while (i < urls.length) {
      const my = i++;
      try {
        await fetch(urls[my], { mode: "cors", credentials: "omit" });
      } catch {
        /* prefetch failures are non-fatal */
      }
    }
  };
  const workers: Promise<void>[] = [];
  for (let k = 0; k < concurrency; k++) workers.push(worker());
  await Promise.all(workers);
}

/**
 * Two-layer HTTP prefetch:
 *   1. World z=0..3 — the midpoint layer for every z=2 fly (covers
 *      the planet at z=2/3 with 100 tiles total).
 *   2. Per-city tile windows covering the ramp zooms (z=13, z=12,
 *      z=10, z=8, z=6) that the camera passes through during zoom-out
 *      / zoom-in. The real-map pre-warm handles z=14/z=15 separately
 *      at the parsed-tile layer; HTTP covers everything below that.
 *
 * With every cache layer filled, MapLibre's overzoom fallback is at
 * most 1 zoom level away from a cached parent — no heavy pixelation,
 * no live fetch during flight.
 *
 * Idempotent via module-level `started` flag.
 */
export async function warmPlacesMapCache(
  centers: Array<[number, number]>,
): Promise<void> {
  if (started) return;
  started = true;

  const sources = await resolveSources();
  if (sources.length === 0) {
    started = false; // allow retry if resolution failed
    return;
  }

  const critical: string[] = [];
  const deferred: string[] = [];
  const seen = new Set<string>();
  const enqueue = (urls: string[], q: string[]) => {
    for (const u of urls) {
      if (!seen.has(u)) {
        seen.add(u);
        q.push(u);
      }
    }
  };

  // Mobile budget (below-md viewport): the full ramp is ~860 tiles — real
  // data on a phone plan, all fetched behind the arrival veil, for a
  // maybe-one-city visit. The lite ramp keeps the world layer + a thin
  // per-city spine (~330 tiles); landing-zoom tiles (z12-15) stream live
  // during the first flight instead.
  const lite = window.matchMedia("(max-width: 767px)").matches;

  // World z=0..3 — midpoint pan layer for every z=2 flight.
  for (let z = 0; z <= 3; z++) {
    enqueue(worldTileUrls(templatesAt(sources, z), z), critical);
  }

  // Per-city ramp — critical covers every zoom the camera visits
  // during flight with enough radius to cover the pitched trapezoid:
  //
  //   z=14 r=2 (25 tiles) — landing edge tiles that Tier-1 pre-warm
  //                         may miss due to its fixed pitch/bearing
  //   z=13 r=2 (25)       — approach
  //   z=12 r=2 (25)       — deep approach; buildings start rendering
  //   z=11 r=1 (9)
  //   z=9  r=1 (9)
  //   z=7  r=0 (1)
  //   z=5  r=0 (1)
  //
  // Total per city: 25+25+25+9+9+1+1 = 95 tiles × 8 cities = 760 tiles.
  // Combined with world z=0-3 (100), critical ≈ 860 tiles × sources.
  // Lite (mobile) drops z=14/z=12 and thins z=13 to r=1 → 29 per city.
  for (const c of centers) {
    if (!lite) {
      enqueue(cityTileWindowUrls(templatesAt(sources, 14), c, 14, 2), critical);
    }
    enqueue(cityTileWindowUrls(templatesAt(sources, 13), c, 13, lite ? 1 : 2), critical);
    if (!lite) {
      enqueue(cityTileWindowUrls(templatesAt(sources, 12), c, 12, 2), critical);
    }
    enqueue(cityTileWindowUrls(templatesAt(sources, 11), c, 11, 1), critical);
    enqueue(cityTileWindowUrls(templatesAt(sources, 9), c, 9, 1), critical);
    enqueue(cityTileWindowUrls(templatesAt(sources, 7), c, 7, 0), critical);
    enqueue(cityTileWindowUrls(templatesAt(sources, 5), c, 5, 0), critical);
  }

  // Deferred — wider radii at key ramp zooms for smoother pan post-land.
  // Skipped entirely on mobile: don't spend background data on radii the
  // user may never pan to.
  if (!lite) {
    for (const c of centers) {
      enqueue(cityTileWindowUrls(templatesAt(sources, 14), c, 14, 3), deferred);
      enqueue(cityTileWindowUrls(templatesAt(sources, 11), c, 11, 2), deferred);
      enqueue(cityTileWindowUrls(templatesAt(sources, 9), c, 9, 2), deferred);
    }
  }

  // CRITICAL: await. The arrival veil consumes this promise so it only
  // dismisses once the ramp is actually in HTTP cache.
  await runFetchQueue(critical, 16);

  // Deferred runs after; do not await.
  const ric = (
    window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void;
    }
  ).requestIdleCallback;
  const runDeferred = () => {
    void runFetchQueue(deferred, 6);
  };
  if (typeof ric === "function") ric(runDeferred, { timeout: 2000 });
  else setTimeout(runDeferred, 1200);
}
