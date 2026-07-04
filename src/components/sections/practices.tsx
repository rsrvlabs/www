"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const practices = [
  {
    n: "01",
    label: "Product · social",
    headline: "A dating app with a physical signature.\nYou only match with people you’ve actually crossed paths with.",
    body: "Bluetooth turns real co-presence into a signature — no endless swiping through strangers, no missed connections walking out the door. The phone app is in two-device testing now; a wearable comes after. We’re also validating heart-rate signals as the next layer: your body notices before you do.",
    notes: ["Phone-to-phone POC in testing", "BLE physical signature", "Wearable next", "Biosignal layer — in validation"],
    align: "left" as const,
    image: "/materials/practice-integration.jpg",
    imageAlt: "Two streams meeting in a moss-lined basin — a painted study.",
  },
  {
    n: "02",
    label: "Studio · applied AI",
    headline: "Forward-deployed AI engineering\nfor teams that need it shipped, not slide-decked.",
    body: "Senior engineers embedded inside client teams — travel tech, sports computer vision, health wearables, legal tech. Real systems in production, not advice. This work funds the products and feeds them domain knowledge.",
    notes: ["Embedded senior engineering", "AI systems in production", "Travel · sports CV · health · legal", "Funds the products"],
    align: "right" as const,
    image: "/materials/practice-objects.jpg",
    imageAlt: "A titanium ring resting on an unglazed ceramic dish.",
  },
];

export function Practices() {
  return (
    <section
      id="practices"
      className="relative bg-paper-soft py-[16svh]"
    >
      <div className="mx-auto w-full max-w-[88rem] px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="kicker mb-[12svh] text-ink/45"
        >
          03 · What we’re building
        </motion.h2>

        <div className="space-y-[18svh]">
          {practices.map((p, i) => (
            <Practice key={p.n} {...p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Practice({
  n,
  label,
  headline,
  body,
  notes,
  align,
  image,
  imageAlt,
  index,
}: (typeof practices)[number] & { index: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25%" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const target = parseInt(n, 10);
    let frame: number;
    let start: number | null = null;
    const dur = 900;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setCount(Math.round(eased * target));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, n]);

  const isRight = align === "right";

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
      className={`grid grid-cols-12 items-start gap-6 md:gap-10 ${isRight ? "md:[&>div:first-child]:order-2" : ""}`}
    >
      <div
        className={`col-span-12 md:col-span-5 ${isRight ? "md:text-right" : ""}`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.6, ease: [0.19, 1, 0.22, 1] }}
          className={`relative aspect-[4/5] w-full max-w-[22rem] overflow-hidden ${
            isRight ? "md:ml-auto" : ""
          }`}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 768px) 30vw, 90vw"
            className="object-cover"
          />
          {/* warm paper edge tint */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              boxShadow: "inset 0 0 60px oklch(0.965 0.012 78 / 0.35)",
            }}
          />
        </motion.div>
        <div
          className="mt-6 font-display text-[clamp(3rem,7vw,6rem)] leading-none text-ink/20 tabular-nums"
          aria-hidden
        >
          {String(count).padStart(2, "0")}
        </div>
        <div className="kicker mt-2 text-moss">
          {label}
        </div>
      </div>

      <div className="col-span-12 md:col-span-7">
        <h3 className="font-display text-[clamp(1.75rem,3.6vw,3.4rem)] leading-[1.1] tracking-[-0.015em] text-ink whitespace-pre-line">
          {headline}
        </h3>
        <p className="mt-8 max-w-[58ch] font-sans text-[0.95rem] leading-[1.85] text-ink-soft">
          {body}
        </p>
        <ul className="mt-10 grid gap-y-3 gap-x-8 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink/65 md:grid-cols-2">
          {notes.map((note) => (
            <li key={note} className="flex items-baseline gap-3">
              <span className="text-sun" aria-hidden>
                ·
              </span>
              {note}
            </li>
          ))}
        </ul>
      </div>

      {/* hairline divider between practices */}
      {index === 0 && (
        <div className="col-span-12 mt-[14svh]">
          <div className="mx-auto h-px w-24 bg-ink/15" />
        </div>
      )}
    </motion.article>
  );
}
