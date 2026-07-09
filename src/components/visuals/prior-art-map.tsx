"use client";

import { useState } from "react";

/**
 * PriorArtMap — the interactive figure for the prior-art survey essay.
 * Two axes: horizontal = "a tool you run" → "a company that runs itself";
 * vertical = "a demo or framework" → "operating real work". We plotted the
 * projects the arch-scan actually surfaced (real GitHub star counts, 2026-07)
 * and the top-right quadrant — runs-a-whole-company AND operating — came back
 * nearly empty. Reserve sits there with a question mark, which is a warning as
 * much as a claim. Night/mono grammar, one sun accent, no WebGL; tap or hover
 * a point to read it (default selects Reserve). Mirrors the schedule figure's
 * detail-line pattern so it works on a phone.
 */

type Point = {
  id: string;
  label: string;
  x: number; // 0 tool … 100 whole company
  y: number; // 0 demo/framework … 100 operating real work
  stars: string;
  what: string;
  us?: boolean;
};

// x,y are semantic placements, not measurements — the honest caption says so.
const POINTS: Point[] = [
  { id: "mem0", label: "Mem0", x: 14, y: 42, stars: "60k★", what: "A memory layer for agents. A component you add — not an operator." },
  { id: "letta", label: "Letta", x: 20, y: 40, stars: "24k★", what: "Self-editing agent memory framework. Powerful primitive, still a library." },
  { id: "mattpocock", label: "skills", x: 16, y: 30, stars: "162k★", what: "Composable agent skills, model-agnostic. A toolbox, single-user." },
  { id: "memcompiler", label: "memory-compiler", x: 18, y: 52, stars: "1.2k★", what: "Turns your sessions into a markdown knowledge base. Closest kin to our brain — but a personal tool." },
  { id: "metagpt", label: "MetaGPT", x: 46, y: 26, stars: "69k★", what: "Agents role-play a software company to one-shot code. Org-shaped, but a demo of the shape — it doesn't keep running one." },
  { id: "ecc", label: "ECC", x: 30, y: 46, stars: "228k★", what: "A vast skill/command library + a dev harness. Enormous, and still a harness you drive." },
  { id: "openclaw", label: "OpenClaw", x: 40, y: 58, stars: "382k★", what: "A always-on personal-assistant runtime with a heartbeat. Operates tasks — for one person, not a company." },
  { id: "agency", label: "agency writeup", x: 66, y: 66, stars: "no repo", what: "The one public account of agency ops on a Claude-Code second brain. Notify-first, earning write access over time. The nearest neighbor — and it's a blog post, not a codebase." },
  { id: "reserve", label: "Reserve", x: 84, y: 78, stars: "us", what: "A studio's whole operations — digest, research, tickets, GTM watch — run by one brain on a schedule, with humans on the calls. We looked for this to copy. We didn't find it. That is less flattering than it sounds: the empty quadrant is empty for reasons we're still learning.", us: true },
];

export function PriorArtMap() {
  const [active, setActive] = useState("reserve");
  const sel = POINTS.find((p) => p.id === active) ?? POINTS[POINTS.length - 1];

  return (
    <figure className="my-4 w-full">
      <div className="hairline-dashed-night rounded-sm border border-paper/12 p-5 md:p-7">
        <div className="mb-5 flex items-baseline justify-between">
          <span className="kicker text-[0.6rem] tracking-[0.26em] text-paper/45">
            Who is already doing this?
          </span>
          <span className="kicker text-[0.55rem] tracking-[0.22em] text-paper/35">
            ~40 scanned · 2026-07
          </span>
        </div>

        <div className="relative w-full" style={{ aspectRatio: "16 / 10" }}>
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            {/* quadrant crosshair */}
            <line x1="50" y1="4" x2="50" y2="96" stroke="currentColor" strokeWidth="0.2" className="text-paper/15" strokeDasharray="1 1.5" />
            <line x1="4" y1="50" x2="96" y2="50" stroke="currentColor" strokeWidth="0.2" className="text-paper/15" strokeDasharray="1 1.5" />
            {/* empty-quadrant wash (top-right) */}
            <rect x="50" y="4" width="46" height="46" className="fill-sun/5" />
          </svg>

          {/* points — HTML overlay so hit-targets + labels stay crisp */}
          {POINTS.map((p) => {
            const isActive = p.id === active;
            return (
              <button
                key={p.id}
                type="button"
                onMouseEnter={() => setActive(p.id)}
                onFocus={() => setActive(p.id)}
                onClick={() => setActive(p.id)}
                aria-pressed={isActive}
                className="group absolute -translate-x-1/2 translate-y-1/2 focus-visible:outline-none"
                style={{ left: `${p.x}%`, bottom: `${p.y}%` }}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    p.us
                      ? "h-3 w-3 border border-sun bg-sun/30 group-focus-visible:ring-2 group-focus-visible:ring-sun/60"
                      : isActive
                        ? "h-2.5 w-2.5 bg-sun"
                        : "h-2 w-2 bg-paper/40 group-hover:bg-paper/70"
                  }`}
                />
                <span
                  className={`kicker absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap text-[0.5rem] tracking-[0.14em] transition-colors duration-200 ${
                    p.us
                      ? "text-sun/80"
                      : isActive
                        ? "text-paper/80"
                        : "text-paper/30 group-hover:text-paper/60"
                  }`}
                >
                  {p.label}
                </span>
              </button>
            );
          })}

          {/* axis labels — x at the foot, y rotated up the left edge (single
              inline transform so nothing fights the rotation) */}
          <span className="kicker absolute -bottom-1 left-0 text-[0.5rem] text-paper/30">a tool you run</span>
          <span className="kicker absolute -bottom-1 right-0 text-[0.5rem] text-paper/30">a company that runs itself</span>
          <span
            className="kicker absolute whitespace-nowrap text-[0.5rem] tracking-[0.14em] text-paper/30"
            style={{
              left: "-0.4rem",
              top: "50%",
              transform: "translateY(-50%) rotate(-90deg)",
              transformOrigin: "left center",
            }}
          >
            demo → operating
          </span>
        </div>

        {/* detail line */}
        <div className="hairline-dashed-night mt-6 grid grid-cols-[8.5rem_1fr] gap-x-2 pt-4">
          <span className={`kicker text-[0.6rem] ${sel.us ? "text-sun/70" : "text-paper/45"}`}>
            {sel.label} · {sel.stars}
          </span>
          <p className="font-sans text-[0.82rem] leading-[1.65] text-paper/70">
            {sel.what}
          </p>
        </div>
      </div>
      <figcaption className="mt-3 font-mono text-[0.6rem] tracking-[0.14em] text-paper/35">
        Fig. — placements are a judgement, not a measurement; stars are real (GitHub, 2026-07). Tap a project.
      </figcaption>
    </figure>
  );
}
