import { NextResponse } from "next/server";

// Waitlist intake: { email, audience: "individual" | "business" }.
// Storage is Supabase over plain REST, server-side only. Until the two env
// vars land on Vercel this returns { stored: false } and the client falls
// back to a prefilled mailto — the form never dead-ends.
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

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ ok: true, stored: false });
  }

  const res = await fetch(`${url}/rest/v1/waitlist`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify({ email, audience }),
  });
  if (!res.ok) {
    return NextResponse.json({ ok: true, stored: false });
  }
  return NextResponse.json({ ok: true, stored: true });
}
