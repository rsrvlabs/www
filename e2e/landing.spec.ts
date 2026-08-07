import { test, expect, type Page } from "playwright/test";

/**
 * Smoke suite for the landing page.
 * Resilient by design: asserts structure + console health, not map pixels
 * (tiles are network-dependent and the arrival veil gates first paint).
 */

function collectPageErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    // WebKit-only noise (the "mobile" project runs the iPhone 14 preset,
    // which Playwright pairs with WebKit): the native <video> control
    // overlay (AirPlay/PiP placards) fails to load its own macOS system
    // icon inside this sandboxed test environment. That's Safari's chrome
    // failing to draw itself, not app code, and it fires on every page with
    // a <video> regardless of whether the page actually works — filtered by
    // name rather than dropping the console-error check altogether.
    if (/layoutTraits = \[MacOSLayoutTraits/.test(text)) return;
    errors.push(`console.error: ${text}`);
  });
  return errors;
}

test("landing renders: hero + the house index mount", async ({ page }) => {
  const errors = collectPageErrors(page);
  await page.goto("/");

  // Hero headline.
  await expect(page.locator("h1").first()).toBeVisible({ timeout: 30_000 });

  // The house index — the three arms of the company, each a real link.
  // (Found stale during the 2026-08 E2E ticket: the 2026-08-02 house-page
  // redesign dropped the old #doors/#weather/#places/#invitation section
  // ids this test used to check. The page has no section ids to anchor on
  // today, so these hrefs are the stable structural check instead.)
  for (const href of ["/frontiers", "/limere", "/labs"]) {
    await expect(page.locator(`a[href="${href}"]`).first()).toBeAttached();
  }

  // Wordmark accessibility handle.
  await expect(page.getByRole("link", { name: "Reserve" }).first()).toBeAttached();

  // No hard client errors on first load.
  expect(errors, errors.join("\n")).toHaveLength(0);
});

test("scroll traverses to the footer without errors", async ({ page }) => {
  const errors = collectPageErrors(page);
  await page.goto("/");
  await expect(page.locator("h1").first()).toBeVisible({ timeout: 30_000 });

  // The footer, not a section id (see note above) — always present regardless
  // of how the homepage's own sections are reshuffled.
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect(page.locator("footer")).toBeInViewport({ ratio: 0.1 });

  expect(errors, errors.join("\n")).toHaveLength(0);
});
