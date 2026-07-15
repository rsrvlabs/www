"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * HeartbeatSchedule — the interactive figure for the "departments" essay.
 * A department is a standing promise to keep paying attention to a domain;
 * we replaced the org chart with a cadence the brain runs. This renders that
 * cadence: rows = the attention a company owes itself, columns = a week. A
 * slow "pulse" sweeps the week (the daily heartbeat); hover/focus a row to
 * read what that beat actually does. Night/mono/hairline grammar, one sun
 * accent, no WebGL — reduced-motion freezes the pulse.
 *
 * Every row is a REAL scheduled job (autonomy/schedule.md), curated to what
 * is fine to say in public — no internal channels, times, or thresholds
 * beyond the one that earns its place in the story (the customer-contact red
 * line, which is the whole point).
 */

type Job = {
  name: string;
  cadence: "daily" | "weekly" | "monthly";
  day?: number; // 0=Mon … 6=Sun, for weekly/monthly
  detail: string;
};

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

const JOBS: Job[] = [
  { name: "Morning digest", cadence: "daily", detail: "What shipped, what's stuck, who's needed — posted before anyone opens a laptop." },
  { name: "Ingest notes", cadence: "daily", detail: "New meeting notes and decisions distilled into the shared brain, with sources." },
  { name: "Competitor sweep", cadence: "weekly", day: 1, detail: "One product line a week: what the field shipped, and only the changes worth acting on." },
  { name: "Focus review", cadence: "weekly", day: 2, detail: "Where effort actually went, from commits and tickets. Red line: two weeks with zero real customer conversations files an alert. Code volume can't buy it back." },
  { name: "Board hygiene", cadence: "weekly", day: 3, detail: "Stale tickets, missing owners, too much in flight — flagged before the board rots." },
  { name: "Deadline radar", cadence: "weekly", day: 4, detail: "Accelerator, grant and pitch windows — the opportunities you only miss once." },
  { name: "Security review", cadence: "monthly", day: 0, detail: "Key rotation, secret scans, dependency risk. Monthly, whether or not anything feels wrong." },
];

export function HeartbeatSchedule() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  const fires = (job: Job, col: number) =>
    job.cadence === "daily" ? true : job.day === col;

  return (
    <figure className="my-4 w-full">
      <div className="hairline-dashed-night rounded-sm border border-paper/12 p-5 md:p-7">
        <div className="mb-6 flex items-baseline justify-between">
          <span className="kicker text-[0.6rem] tracking-[0.26em] text-paper/45">
            The org chart, redrawn as a week
          </span>
          <span className="kicker text-[0.55rem] tracking-[0.22em] text-paper/35">
            ↓ one heartbeat / day
          </span>
        </div>

        <div className="relative">
          {/* Day header */}
          <div className="grid grid-cols-[8.5rem_repeat(7,1fr)] items-center gap-x-1">
            <span />
            {DAYS.map((d, i) => (
              <span
                key={i}
                className="text-center font-mono text-[0.6rem] tracking-[0.2em] text-paper/35"
              >
                {d}
              </span>
            ))}
          </div>

          {/* Sweeping pulse — the daily heartbeat crossing the week */}
          {!reduce && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute top-6 bottom-0 w-px bg-paper/25"
              style={{ left: "8.5rem" }}
              initial={{ x: 0, opacity: 0 }}
              animate={{
                x: ["0%", "700%"],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 7,
                times: [0, 0.05, 0.95, 1],
                repeat: Infinity,
                ease: "linear",
              }}
            />
          )}

          {/* Job rows */}
          <div className="mt-2 divide-y divide-dashed divide-paper/10">
            {JOBS.map((job, r) => {
              const isActive = r === active;
              return (
                <button
                  key={job.name}
                  type="button"
                  onMouseEnter={() => setActive(r)}
                  onFocus={() => setActive(r)}
                  onClick={() => setActive(r)}
                  aria-pressed={isActive}
                  className="grid w-full grid-cols-[8.5rem_repeat(7,1fr)] items-center gap-x-1 py-3 text-left focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-paper/40"
                >
                  <span
                    className={`truncate pr-3 font-display text-[0.95rem] transition-colors duration-200 ${
                      isActive ? "text-paper" : "text-paper/60"
                    }`}
                  >
                    {job.name}
                  </span>
                  {DAYS.map((_, c) => {
                    const on = fires(job, c);
                    return (
                      <span key={c} className="flex items-center justify-center">
                        <span
                          className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                            on
                              ? isActive
                                ? "bg-paper"
                                : "bg-paper/55"
                              : "bg-paper/10"
                          }`}
                        />
                      </span>
                    );
                  })}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail line for the focused row */}
        <div className="hairline-dashed-night mt-5 grid grid-cols-[8.5rem_1fr] gap-x-1 pt-4">
          <span className="kicker text-[0.55rem] text-paper/40">
            {JOBS[active].cadence}
          </span>
          <p className="font-sans text-[0.82rem] leading-[1.65] text-paper/70">
            {JOBS[active].detail}
          </p>
        </div>
      </div>
      <figcaption className="mt-3 font-mono text-[0.6rem] tracking-[0.14em] text-paper/35">
        Fig. — a company&rsquo;s attention as a schedule, not a hierarchy. Hover a beat.
      </figcaption>
    </figure>
  );
}
