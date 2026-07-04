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
    if (msg.type() === "error") errors.push(`console.error: ${msg.text()}`);
  });
  return errors;
}

test("landing renders: veil resolves, hero + all sections mount", async ({ page }) => {
  const errors = collectPageErrors(page);
  await page.goto("/");

  // Hero headline (display serif h1) becomes visible once the veil lifts.
  await expect(page.locator("h1").first()).toBeVisible({ timeout: 30_000 });

  // Section anchors present (arrival/note render without ids — covered by h1/main).
  for (const id of ["practices", "weather", "places", "invitation"]) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }

  // Wordmark accessibility handle.
  await expect(page.getByLabel("Reserve").first()).toBeAttached();

  // No hard client errors on first load.
  expect(errors, errors.join("\n")).toHaveLength(0);
});

test("scroll traverses to the invitation section without errors", async ({ page }) => {
  const errors = collectPageErrors(page);
  await page.goto("/");
  await expect(page.locator("h1").first()).toBeVisible({ timeout: 30_000 });

  await page.locator("#invitation").scrollIntoViewIfNeeded();
  await expect(page.locator("#invitation")).toBeInViewport({ ratio: 0.1 });

  expect(errors, errors.join("\n")).toHaveLength(0);
});
