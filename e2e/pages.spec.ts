import { test, expect, type Page } from "playwright/test";

/**
 * Site-wide route smoke suite (2026-08 legal-pages + CI ticket).
 * landing.spec.ts owns the homepage's own beats (veil, scroll); this file
 * covers the rest of the site's real routes plus the two NEW legal pages,
 * nav behavior (desktop links + the mobile sheet), and link health —
 * resilient by design: structure + console health + HTTP status, not pixels.
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
  "/legal/terms",
  "/legal/privacy",
];

for (const route of ROUTES) {
  test(`${route} renders with an h1 and no console errors`, async ({ page }) => {
    const errors = collectPageErrors(page);
    await page.goto(route);
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 30_000 });
    expect(errors, errors.join("\n")).toHaveLength(0);
  });
}

test("the legal pages the app links to resolve 200, not 404", async ({ page }) => {
  // This is the regression that would have caught the original ticket: the
  // Limere iOS signup gate links to /legal/terms and /legal/privacy, and
  // both 404'd until those routes existed. Checked directly over HTTP so a
  // future rename/removal fails CI instead of shipping quietly.
  for (const path of ["/legal/terms", "/legal/privacy"]) {
    const res = await page.request.get(path);
    expect(res.status(), `${path} should resolve 200`).toBe(200);
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
