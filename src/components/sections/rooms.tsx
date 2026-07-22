// The exhibition wing of the homepage: each work shown as a specimen room.
// Copy is factual (no invented product claims); specimens are concept
// placeholders (option c) until real 素材 lands.
import { ExhibitionRoom, type Room } from "@/components/site/exhibition";

const ROOMS: Room[] = [
  {
    index: "01",
    kicker: "N° 01 · FLAGSHIP",
    title: "Lime",
    cn: "擦肩交友",
    blurb: "Short for limerence — a dating app with a physical signature. You only meet the people you actually crossed paths with, one room at a time.",
    specimen: "ring",
    spec: [
      ["CLASS", "FLAGSHIP"],
      ["CATEGORY", "PROXIMITY SOCIAL"],
      ["FORMULA", "BLE · CO-PRESENCE · ROOMS"],
      ["STATUS", "IN FIELD TESTING"],
    ],
    href: "/sw",
  },
  {
    index: "02",
    kicker: "N° 02 · DESK",
    title: "Reserve\nFinance",
    cn: "金融桌",
    blurb: "A US-equities desk that reasons in public — it scores the market, publishes its brief, and answers for the call.",
    specimen: "ledger",
    spec: [
      ["CLASS", "FINTECH"],
      ["CATEGORY", "MARKET RESEARCH"],
      ["FORMULA", "SCORE · PUBLISH · ACCOUNT"],
      ["STATUS", "LIVE"],
    ],
    href: "/labs",
  },
  {
    index: "03",
    kicker: "N° 03 · FORMULA",
    title: "Glow",
    cn: "美妝科技",
    blurb: "Beauty tech, in the making — the third work on the bench.",
    specimen: "bloom",
    spec: [
      ["CLASS", "BEAUTYTECH"],
      ["CATEGORY", "—"],
      ["FORMULA", "IN FORMULATION"],
      ["STATUS", "ON THE BENCH"],
    ],
    href: "/labs",
  },
  {
    index: "04",
    kicker: "N° 04 · APPARATUS",
    title: "The\nOperating\nSystem",
    cn: "公司作業系統",
    blurb: "The machine the company runs on — a file-based brain where agents hold jobs and the work compounds.",
    specimen: "lattice",
    spec: [
      ["CLASS", "INFRASTRUCTURE"],
      ["CATEGORY", "AI-NATIVE OS"],
      ["FORMULA", "BRAIN · AGENTS · TICKETS"],
      ["STATUS", "OPERATING"],
    ],
    href: "/frontiers",
  },
];

export function Rooms() {
  return (
    <section className="relative lab-columns">
      <div className="px-6 pb-6 pt-24 md:px-10">
        <span className="kicker text-paper/55">N° 03 · THE WORKS</span>
        <h2 className="mt-5 max-w-[18ch] font-display text-[clamp(1.9rem,3.4vw,3rem)] font-semibold uppercase leading-[0.98] tracking-tight">
          Four works on the bench
        </h2>
        <p className="mt-4 max-w-[46ch] text-[0.95rem] leading-relaxed text-paper/60">
          The studio exhibits what it is building. Each room is one work — a specimen and its record.
        </p>
      </div>
      {ROOMS.map((room) => (
        <ExhibitionRoom key={room.index} room={room} total={ROOMS.length} />
      ))}
    </section>
  );
}
