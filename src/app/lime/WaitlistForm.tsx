"use client";

import { useState } from "react";
import s from "@/components/apple/apple.module.css";

const CONTACT = "hello@rsrvlabs.com";

/* One field, two doors: consumers get early access, venues and hardware
   partners get a direct line. Same list, different flag. */
export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");

  async function submit(audience: "individual" | "business") {
    const clean = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) return;
    setState("busy");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: clean, audience }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (!data.ok || data.stored === false) {
        // storage not wired yet — hand off to email so nothing is lost
        const subject =
          audience === "business" ? "Partner with Lime" : "Lime early access";
        window.location.href = `mailto:${CONTACT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(clean)}`;
      }
      setState("done");
    } catch {
      setState("idle");
    }
  }

  if (state === "done") {
    return <p className={s.waitNote}>You&rsquo;re on the list. Talk soon.</p>;
  }

  return (
    <div>
      <div className={s.waitRow}>
        <input
          className={s.waitInput}
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
        />
      </div>
      <div className={s.waitBtns}>
        <button className={s.waitBtn} disabled={state === "busy"} onClick={() => submit("individual")}>
          Get early access
        </button>
        <button className={`${s.waitBtn} ${s.waitBtnGhost}`} disabled={state === "busy"} onClick={() => submit("business")}>
          Partner with Lime
        </button>
      </div>
      <p className={s.waitNote}>No spam. One email when your city opens.</p>
    </div>
  );
}
