import type { ReactNode } from "react";

/**
 * Shared punch-card hover surface (ploy corner-dot identity, held to the
 * lelabo stillness law): four corner dots that warm to sun on group-hover
 * and a night-soft surface rise — color/opacity only, nothing moves
 * (design-refs/lelabo motion census: hover changes NOTHING but underline;
 * the cursor tilt was removed 2026-07-05 with the hover-stillness audit).
 */

export function PunchDot({ pos }: { pos: string }) {
  return (
    <span
      aria-hidden
      className={`absolute ${pos} h-[3px] w-[3px] rounded-full bg-paper/25 transition-colors duration-300 group-hover:bg-sun`}
    />
  );
}

export function PunchSurface({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`group relative rounded-sm transition-colors duration-300 hover:bg-night-soft/60 ${className}`}
    >
      <PunchDot pos="left-1.5 top-1.5" />
      <PunchDot pos="right-1.5 top-1.5" />
      <PunchDot pos="bottom-1.5 left-1.5" />
      <PunchDot pos="bottom-1.5 right-1.5" />
      {children}
    </div>
  );
}
