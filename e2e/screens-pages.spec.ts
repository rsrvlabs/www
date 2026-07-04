import { test } from "playwright/test";

/** Visual capture of the top-level subpages (SHOTS_DIR-gated, like screens.spec). */
const SHOTS_DIR = process.env.SHOTS_DIR;
test.skip(!SHOTS_DIR, "SHOTS_DIR not set");

const routes = ["sw", "labs", "frontiers", "research", "effects"];
for (const route of routes) {
  test(`capture /${route}`, async ({ page }) => {
    await page.goto(`/${route}`);
    await page.locator("h1").first().waitFor({ state: "visible", timeout: 30_000 });
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${SHOTS_DIR}/page-${route}.png`, fullPage: true });
  });
}
