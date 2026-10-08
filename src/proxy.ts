import { NextResponse, type NextRequest } from "next/server";

/**
 * The shipped Limere app (build 48) opens `rsrvlabs.com/zh/legal/{terms,privacy}` (and the
 * support link `/zh/support`) for every app language, and is live in Taiwan, the US and Thailand.
 * Each reader lands on their own language's page on limere.app, by the browser's first
 * Accept-Language tag: zh* → zh-TW (unprefixed), th → `THAI_PREFIX`, anything else (or none)
 * → English. "en-US,th;q=0.8" is English: only the first tag counts.
 *
 * Here and not in next.config.ts `redirects()`: a config redirect drops every header that
 * `headers()` adds (Next's router answers it with `resHeaders: null`), so it could not say
 * `Vary: Accept-Language`. 307, not 308: browsers cache a 308 per URL and would pin the first
 * language they saw. The old English URLs (`/legal/…`, `/support`) stay plain 308s in
 * next.config.ts.
 */

const LIMERE = "https://www.limere.app";

/**
 * Where a Thai reader lands: the Thai legal pages (`/th/legal/…`), and the English support page
 * until a Thai one ships (then set support to "/th", one line).
 */
const THAI_PREFIX = { legal: "/th", support: "/en" } as const satisfies Record<string, "/en" | "/th">;

const PAGE = /^\/zh\/(legal\/(?:privacy|terms)|support)\/?$/;

/** The language of the first Accept-Language tag, lower-case: "th-TH,th;q=0.9" → "th". */
function primaryLanguage(header: string | null): string {
  return (header ?? "").split(",")[0].split(";")[0].trim().split(/[-_]/)[0].toLowerCase();
}

export function proxy(request: NextRequest) {
  const page = PAGE.exec(request.nextUrl.pathname)?.[1];
  if (!page) return NextResponse.next();
  const lang = primaryLanguage(request.headers.get("accept-language"));
  const thai = page === "support" ? THAI_PREFIX.support : THAI_PREFIX.legal;
  const prefix = lang === "zh" ? "" : lang === "th" ? thai : "/en";
  const res = NextResponse.redirect(`${LIMERE}${prefix}/${page}/`, 307);
  res.headers.set("Vary", "Accept-Language");
  return res;
}

export const config = {
  matcher: ["/zh/legal/:doc(privacy|terms)", "/zh/support"],
};
