import { test } from "playwright/test";

/**
 * Visual capture for design review — NOT an assertion suite.
 * Runs only when SHOTS_DIR is set (absolute path); each key beat of the page
 * is captured there. Images land outside git by policy (playwright imagery
 * never enters the repo).
 *
 *   SHOTS_DIR=/tmp/shots npx playwright test e2e/screens.spec.ts --project=desktop
 */
const SHOTS_DIR = process.env.SHOTS_DIR;

test.skip(!SHOTS_DIR, "SHOTS_DIR not set — visual capture disabled");

test("capture landing beats", async ({ page }) => {
  test.setTimeout(180_000);
  await page.goto("/");
  await page.locator("h1").first().waitFor({ state: "visible", timeout: 30_000 });
  // The arrival veil OCCLUDES the page while preloading (h1 counts as "visible"
  // behind it) — wait until its ARRIVING label is actually gone.
  await page
    .getByText("arriving", { exact: false })
    .waitFor({ state: "hidden", timeout: 60_000 })
    .catch(() => {}); // veil may already be gone on warm reloads
  await page.waitForTimeout(1600); // let entrance motion settle
  await page.screenshot({ path: `${SHOTS_DIR}/01-arrival.png` });

  const beats: Array<[string, string]> = [
    ["02-note", "text=What we do"],
    ["03-doors", "#doors"],
    ["04-weather", "#weather"],
    ["05-places", "#places"],
    ["06-invitation", "#invitation"],
  ];
  for (const [name, sel] of beats) {
    const target = page.locator(sel).first();
    await target.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500); // reveal animations + lazy chunks
    await page.screenshot({ path: `${SHOTS_DIR}/${name}.png` });
  }
});
