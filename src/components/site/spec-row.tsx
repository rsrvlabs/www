import type { ReactNode } from "react";

/**
 * Le Labo specimen spec row (design-refs/lelabo §4 card anatomy) — the machine
 * "care label" that closes every specimen block: a collapsed solid `night-line`
 * hairline, then honest machine facts in the lowercase label voice (`.label-mono`,
 * status · register · quantity). Mirrors the recipe doors.tsx already proves so
 * the landing lattice + the subpage inventory read as ONE system:
 *
 *   - spec-only  → `mt-auto pt-8` wrapper + `border-t night-line pt-4` rule
 *                  (doors 2×2 cell recipe; `mt-auto` floor-pins the row so the
 *                   inventory aligns if the entries are ever gridded).
 *   - + action   → the flagship combined row: facts LEFT, one lowercase utility
 *                  link (`enter →`) RIGHT — HOVER-STILL (lelabo motion census:
 *                  the only hover response is the underline; nothing travels).
 *
 * Facts only — never persuasion (copy law rule 3: the care label never sells).
 */
export function SpecRow({ spec, action }: { spec: string; action?: ReactNode }) {
  if (action) {
    return (
      <span className="label-mono mt-auto flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-night-line pt-8 text-paper/45">
        <span>{spec}</span>
        <span aria-hidden>{action}</span>
      </span>
    );
  }
  return (
    <span className="label-mono mt-auto block pt-8">
      <span className="block border-t border-night-line pt-4 text-paper/45">
        {spec}
      </span>
    </span>
  );
}
