import { test, expect, type Page } from "playwright/test";

/**
 * Site-wide route smoke suite (2026-08 legal-pages + CI ticket).
 * landing.spec.ts owns the homepage's own beats (veil, scroll); this file
 * covers the rest of the site's real routes, the redirects of the legal
 * pages (moved to limere.app), nav behavior (desktop links + the mobile
 * sheet), and link health — resilient by design: structure + console
 * health + HTTP status, not pixels.
 */

function collectPageErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    // WebKit-only noise — see the identical filter in landing.spec.ts for
    // why: Safari's native <video> control chrome failing to load its own
    // icon inside the test sandbox, unrelated to app correctness.
    if (/layoutTraits = \[MacOSLayoutTraits/.test(text)) return;
    errors.push(`console.error: ${text}`);
  });
  return errors;
}

/** Every route this suite treats as "real" — extend this list as new
 *  top-level pages ship, per DESIGN.md's "no stale refs" rule. */
const ROUTES = [
  "/",
  "/limere",
  "/labs",
  "/frontiers",
  "/research",
  "/research/ai-native-company",
];

for (const route of ROUTES) {
  test(`${route} renders with an h1 and no console errors`, async ({ page }) => {
    const errors = collectPageErrors(page);
    await page.goto(route);
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 30_000 });
    expect(errors, errors.join("\n")).toHaveLength(0);
  });
}

/** Limere's legal and support pages moved to limere.app (2026-10-08). */
const LIMERE = "https://www.limere.app";

test("the old English legal and support URLs redirect 308 to limere.app", async ({ request }) => {
  // App Store Connect and older links point here; each must land on the English page.
  const cases: Array<[string, string]> = [
    ["/legal/terms", `${LIMERE}/en/legal/terms/`],
    ["/legal/privacy", `${LIMERE}/en/legal/privacy/`],
    ["/support", `${LIMERE}/en/support/`],
  ];
  for (const [path, location] of cases) {
    const res = await request.get(path, { maxRedirects: 0 });
    expect(res.status(), `${path} status`).toBe(308);
    expect(res.headers()["location"], `${path} location`).toBe(location);
  }
});

test("the zh URLs the shipped app opens redirect 307 by Accept-Language", async ({ request }) => {
  // Build 48 opens rsrvlabs.com/zh/legal/{terms,privacy} for every app language, in Taiwan,
  // the US and Thailand: each reader lands on their own language's page, and caches are told
  // the answer varies by language.
  const languages: Array<[string | undefined, "th" | "en" | "zh"]> = [
    ["th-TH,th;q=0.9", "th"],
    ["en-US", "en"],
    ["en-US,th;q=0.8,zh;q=0.5", "en"],
    ["zh-TW", "zh"],
    ["zh-Hant-TW,zh;q=0.9,en;q=0.8", "zh"],
    [undefined, "en"],
  ];
  const paths: Array<[string, string]> = [
    ["/zh/legal/terms", "/legal/terms/"],
    ["/zh/legal/privacy", "/legal/privacy/"],
    ["/zh/support", "/support/"],
  ];
  for (const [path, page] of paths) {
    for (const [language, lang] of languages) {
      const prefix = lang === "zh" ? "" : `/${lang}`;
      const res = await request.get(path, {
        maxRedirects: 0,
        headers: language ? { "accept-language": language } : {},
      });
      const label = `${path} [${language ?? "no Accept-Language"}]`;
      expect(res.status(), `${label} status`).toBe(307);
      expect(res.headers()["location"], `${label} location`).toBe(`${LIMERE}${prefix}${page}`);
      expect(res.headers()["vary"] ?? "", `${label} vary`).toMatch(/accept-language/i);
    }
  }
});

test.describe("desktop nav", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("top nav links navigate to each section", async ({ page }) => {
    const items: Array<[string, string]> = [
      ["Limere", "/limere"],
      ["Labs", "/labs"],
      ["Frontiers", "/frontiers"],
      ["Research", "/research"],
    ];
    for (const [label, href] of items) {
      await page.goto("/");
      await expect(page.locator("h1").first()).toBeVisible({ timeout: 30_000 });
      await page.locator("nav").first().getByRole("link", { name: label, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${href}$`));
      await expect(page.locator("h1").first()).toBeVisible({ timeout: 30_000 });
    }
  });
});

test.describe("mobile nav sheet", () => {
  // Forced narrow viewport so this test means the same thing regardless of
  // which Playwright project runs it — the sheet's own breakpoint is 620px
  // (apple.module.css), not tied to any device preset.
  test.use({ viewport: { width: 390, height: 844 } });

  test("opens under 620px and exposes every link", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 30_000 });

    const toggle = page.getByRole("button", { name: "Open menu" });
    await expect(toggle).toBeVisible();
    await toggle.click();

    const sheet = page.locator("#site-menu");
    await expect(sheet).toBeVisible();
    for (const label of ["Limere", "Labs", "Frontiers", "Research"]) {
      await expect(sheet.getByRole("link", { name: label, exact: true })).toBeVisible();
    }

    await page.keyboard.press("Escape");
    await expect(sheet).toBeHidden();
  });
});

/** Same-origin, non-anchor hrefs on the page right now — mailto/tel/hash and
 *  external links are out of scope (this suite doesn't own third-party
 *  uptime), de-duped and stripped of any in-page #fragment. */
async function internalLinks(page: Page): Promise<string[]> {
  const hrefs = await page
    .locator("a[href]")
    .evaluateAll((as) => as.map((a) => a.getAttribute("href") ?? ""));
  const out = new Set<string>();
  for (const href of hrefs) {
    if (!href || href.startsWith("#")) continue;
    if (href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    if (/^https?:\/\//.test(href)) continue;
    out.add(href.split("#")[0]);
  }
  return [...out];
}

test("no broken internal links on the pages we visit", async ({ page }) => {
  const checked = new Set<string>();
  for (const route of ROUTES) {
    await page.goto(route);
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 30_000 });

    for (const href of await internalLinks(page)) {
      if (checked.has(href)) continue;
      checked.add(href);
      const res = await page.request.get(href);
      expect(res.status(), `${href} (linked from ${route}) should not 404`).toBeLessThan(400);
    }
  }
});
