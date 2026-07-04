"use client";

import type { ReactNode } from "react";
import { useCardTilt } from "@/lib/use-card-tilt";

/**
 * Shared punch-card hover surface (ploy grammar, restrained for French
 * minimal): four corner dots that warm to sun on group-hover, a night-soft
 * surface rise, and a subtle card tilt. Extracted from the landing's
 * DoorCard so subpage entries carry the exact same hover craft.
 * Tilt bails under prefers-reduced-motion (inside useCardTilt).
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
  const { ref, onMouseMove, onMouseLeave } = useCardTilt();
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
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
