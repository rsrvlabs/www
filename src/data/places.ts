import type { CityView } from "@/components/visuals/city-map";

export type City = {
  slug: string;
  name: string;
  coords: string;
  caption: string;
  view: CityView;
};

// Each city has a tuned camera: center over an iconic pocket (not the
// centroid), bearing chosen so buildings read well, pitch near 55-60°.
export const cities: City[] = [
  {
    slug: "taipei",
    name: "Taipei",
    coords: "25.03° N · 121.56° E",
    caption: "After a drizzle, stone warmed by a single lantern.",
    view: { center: [121.5645, 25.034], zoom: 15.3, pitch: 58, bearing: -24 },
  },
  {
    slug: "tokyo",
    name: "Tokyo",
    coords: "35.68° N · 139.65° E",
    caption: "One vending machine paints the alley amber.",
    view: { center: [139.7004, 35.6595], zoom: 15.8, pitch: 60, bearing: 42 },
  },
  {
    slug: "hongkong",
    name: "Hong Kong",
    coords: "22.28° N · 114.17° E",
    caption: "Laundry, a single shaft of late-afternoon gold.",
    view: { center: [114.1694, 22.2793], zoom: 15.4, pitch: 60, bearing: -18 },
  },
  {
    slug: "bangkok",
    name: "Bangkok",
    coords: "13.76° N · 100.50° E",
    caption: "River, floating flowers, a moored wooden boat.",
    view: { center: [100.493, 13.746], zoom: 15.2, pitch: 55, bearing: 12 },
  },
  {
    slug: "singapore",
    name: "Singapore",
    coords: "1.29° N · 103.85° E",
    caption: "Monsoon ground; a tree older than the country.",
    view: { center: [103.852, 1.2834], zoom: 15.2, pitch: 55, bearing: -30 },
  },
  {
    slug: "abudhabi",
    name: "Abu Dhabi",
    coords: "24.47° N · 54.37° E",
    caption: "Bone, pale gold, heat shimmering on the horizon.",
    view: { center: [54.3773, 24.466], zoom: 15.0, pitch: 55, bearing: 28 },
  },
  {
    slug: "london",
    name: "London",
    coords: "51.51° N · 0.13° W",
    caption: "Wet cobblestones; one yellow window, two stories up.",
    view: { center: [-0.1276, 51.5074], zoom: 15.4, pitch: 58, bearing: -12 },
  },
  {
    slug: "newyork",
    name: "New York",
    coords: "40.71° N · 74.01° W",
    caption: "Fire-escape silhouette; a white curtain caught in the wind.",
    view: { center: [-74.011, 40.7061], zoom: 15.3, pitch: 60, bearing: 24 },
  },
];

// First-screen globe view — Asia slightly left of centre so the studio's
// home hemisphere reads first.
export const GLOBE_VIEW: CityView = {
  center: [60, 25],
  zoom: 1.4,
  pitch: 0,
  bearing: 0,
};
