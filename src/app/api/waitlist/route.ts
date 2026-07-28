import { NextResponse } from "next/server";

// Waitlist intake: { email, audience: "individual" | "business" }.
// Storage: the app's Supabase project (shared instance, POC stage — one
// database for app + www). The anon key is a public client key (it ships
// inside the mobile app binary); the waitlist table is insert-only under
// RLS with no select policy, so this key can write a signup and read
// nothing. Env vars override the defaults if ever set on Vercel.
export async function POST(req: Request) {
  let body: { email?: string; audience?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }
  const email = (body.email ?? "").trim().toLowerCase();
  const audience = body.audience === "business" ? "business" : "individual";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid email" }, { status: 400 });
  }

  const url = process.env.SUPABASE_URL ?? "https://oqpszptayinfddbbcvwm.supabase.co";
  const key = process.env.SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcHN6cHRheWluZmRkYmJjdndtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1MjY3MTksImV4cCI6MjA5ODEwMjcxOX0.lZOlvR-9vgt6DlumA4rLPDDnze3GL03dZLhngEg9zwA";

  const res = await fetch(`${url}/rest/v1/waitlist`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ email, audience }),
  });
  // 409 = already on the list — that is a success for the person signing up.
  if (!res.ok && res.status !== 409) {
    return NextResponse.json({ ok: true, stored: false });
  }
  return NextResponse.json({ ok: true, stored: true });
}
