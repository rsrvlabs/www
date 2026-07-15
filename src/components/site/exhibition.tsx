// Exhibition kit — the Le Labo (brutalist laboratory) × Byredo (big-image
// exhibition) language, applied for real. A ROOM = one work, shown as a framed
// specimen + a clinical spec plate. Specimens are concept placeholders (option
// c, 2026-07-15): swap `image` in ROOMS for real 素材 and the frame renders it.

import Image from "next/image";

type Spec = [string, string];

export type Room = {
  index: string; // "01"
  kicker: string; // "N° 01 · FLAGSHIP"
  title: string; // "Social\nWearable"
  cn: string; // "社交穿戴"
  blurb: string;
  specimen: "ring" | "ledger" | "bloom" | "lattice";
  spec: Spec[];
  href: string;
  image?: string; // when real 素材 lands, this fills the frame
};

// ── clinical plate strip (top/bottom of a room or the page) ─────────────────
export function Plate({ left, mid, right }: { left: string; mid?: string; right: string }) {
  return (
    <div className="flex items-center justify-between px-6 py-5 md:px-10">
      <span className="kicker text-paper/55">{left}</span>
      {mid && <span className="kicker hidden text-paper/35 md:inline">{mid}</span>}
      <span className="kicker text-paper/55">{right}</span>
    </div>
  );
}

// ── concept-placeholder specimens (geometry, until real 素材) ────────────────
function Specimen({ kind }: { kind: Room["specimen"] }) {
  const stroke = "var(--color-paper)";
  if (kind === "ring") {
    return (
      <div
        className="rounded-full"
        style={{
          width: "clamp(150px, 22vw, 300px)",
          height: "clamp(150px, 22vw, 300px)",
          border: `1.5px solid ${stroke}`,
          boxShadow: "inset 0 0 130px oklch(0.985 0 0 / 0.05), 0 40px 120px oklch(0 0 0 / 0.5)",
        }}
      />
    );
  }
  if (kind === "ledger") {
    // finance: a bare candlestick readout
    const bars = [0.5, 0.8, 0.35, 0.95, 0.62, 0.78, 0.45];
    return (
      <div className="flex h-[46%] items-end gap-3 md:gap-4">
        {bars.map((h, i) => (
          <div key={i} className="flex flex-col items-center" style={{ height: "100%" }}>
            <div style={{ flex: `${1 - h} 1 0%`, width: 1, background: "oklch(0.985 0 0 / 0.3)" }} />
            <div
              style={{
                flex: `${h} 1 0%`,
                width: "clamp(10px,1.6vw,20px)",
                border: `1px solid ${stroke}`,
                background: i === 3 ? "var(--color-sun)" : "transparent",
              }}
            />
          </div>
        ))}
      </div>
    );
  }
  if (kind === "bloom") {
    // beautytech: a soft luminous orb
    return (
      <div
        className="rounded-full"
        style={{
          width: "clamp(150px, 22vw, 300px)",
          height: "clamp(150px, 22vw, 300px)",
          background: "radial-gradient(circle at 42% 38%, oklch(0.985 0 0 / 0.22), oklch(0.985 0 0 / 0.02) 62%, transparent 72%)",
          border: "1px solid oklch(0.985 0 0 / 0.25)",
        }}
      />
    );
  }
  // lattice (the OS): a node graph
  return (
    <svg viewBox="0 0 200 200" className="h-[62%] w-auto" fill="none" stroke={stroke} strokeWidth={0.75}>
      {[40, 100, 160].map((x) =>
        [40, 100, 160].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r={3} fill={stroke} stroke="none" />)
      )}
      <path d="M40 40 L160 40 L160 160 L40 160 Z M40 100 L160 100 M100 40 L100 160 M40 40 L160 160 M160 40 L40 160" strokeOpacity={0.5} />
    </svg>
  );
}

// ── one exhibition room ─────────────────────────────────────────────────────
export function ExhibitionRoom({ room, total }: { room: Room; total: number }) {
  return (
    <article className="relative">
      <div className="mx-6 md:mx-10">
        <div className="hairline-dashed-night" />
      </div>
      <Plate
        left={`SPECIMEN ${room.index} / ${String(total).padStart(2, "0")}`}
        mid={room.kicker}
        right={`RESERVE / LAB`}
      />

      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr]">
        {/* the framed specimen (the big exhibit) */}
        <div className="relative px-6 pb-14 pt-4 md:border-r md:px-10" style={{ borderColor: "oklch(0.985 0 0 / 0.1)" }}>
          <div className="label-mono mb-5 text-paper/45">fig. {room.index} — {room.specimen} · concept placeholder</div>
          <div
            className="reg-frame flex items-center justify-center border"
            style={{
              minHeight: "clamp(320px, 46vh, 560px)",
              borderColor: "oklch(0.985 0 0 / 0.16)",
              background: "radial-gradient(76% 76% at 50% 42%, oklch(0.985 0 0 / 0.04), transparent 72%)",
            }}
          >
            {/* bottom registration ticks */}
            <span aria-hidden className="absolute bottom-[10px] left-[10px] h-[14px] w-[14px] border-b border-l" style={{ borderColor: "oklch(0.985 0 0 / 0.45)" }} />
            <span aria-hidden className="absolute bottom-[10px] right-[10px] h-[14px] w-[14px] border-b border-r" style={{ borderColor: "oklch(0.985 0 0 / 0.45)" }} />
            {room.image ? (
              <Image src={room.image} alt={room.title.replace("\n", " ")} fill className="object-cover" />
            ) : (
              <Specimen kind={room.specimen} />
            )}
            <span className="label-mono absolute bottom-4 left-4 text-paper/50">specimen · {room.href.replace("/", "")}-{room.index}</span>
            <span className="label-mono absolute bottom-4 right-4 text-paper/50">scale 1:1</span>
          </div>
        </div>

        {/* the clinical spec plate */}
        <div className="relative flex flex-col justify-center px-6 pb-14 pt-2 md:px-10">
          <span className="kicker mb-4 text-paper/55">{room.kicker}</span>
          <h3 className="font-display text-[clamp(2rem,3.8vw,3.4rem)] font-semibold uppercase leading-[0.92] tracking-tight whitespace-pre-line">
            {room.title}
          </h3>
          <span className="label-mono mt-3 text-paper/60">{room.cn}</span>

          <div className="my-6 hairline-dashed-night" />

          <dl className="space-y-2.5">
            {room.spec.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 font-mono text-[0.68rem] uppercase tracking-[0.14em]">
                <dt className="text-paper/40">{k}</dt>
                <dd className="text-right text-paper/80">{v}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-7 max-w-[38ch] text-[0.95rem] leading-relaxed text-paper/70">{room.blurb}</p>

          <a href={room.href} className="label-mono link-underline mt-7 w-fit text-paper/80">
            enter the room →
          </a>
        </div>
      </div>
    </article>
  );
}
