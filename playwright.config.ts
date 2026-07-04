import { defineConfig, devices } from "playwright/test";

/**
 * E2E config for the Reserve landing page.
 * `pnpm test:e2e` boots the dev server automatically (reuses one if running).
 * Keep tests deterministic: the arrival veil + map tiles are network-dependent,
 * so specs should assert on resilient signals (sections mounted, no console
 * errors), not tile pixels.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  timeout: 60_000,
  use: {
    // Dedicated port: localhost:3000 is often occupied by ANOTHER project's
    // dev server on dev machines (observed: Arrivl on :3000) — reusing it
    // would silently test the wrong site.
    baseURL: "http://localhost:3947",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["iPhone 14"] } },
  ],
  webServer: {
    command: "pnpm dev -p 3947",
    url: "http://localhost:3947",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
