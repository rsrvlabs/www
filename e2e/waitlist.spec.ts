import { test, expect, type Page } from "playwright/test";

/**
 * /limere's waitlist form (src/app/limere/WaitlistForm.tsx + the
 * src/app/api/waitlist/route.ts route handler). The route writes to the
 * app's shared Supabase project — this suite never touches that: every
 * test intercepts POST /api/waitlist so CI stays hermetic and doesn't
 * spend real waitlist rows on test runs.
 */

function collectPageErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    // WebKit-only noise — see the identical filter in landing.spec.ts.
    if (/layoutTraits = \[MacOSLayoutTraits/.test(text)) return;
    errors.push(`console.error: ${text}`);
  });
  return errors;
}

test("the form renders on /limere with an email field and both CTAs", async ({ page }) => {
  const errors = collectPageErrors(page);
  await page.goto("/limere");
  await expect(page.getByLabel("Email address")).toBeVisible();
  await expect(page.getByRole("button", { name: "Get early access" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Partner with Limere" })).toBeVisible();
  expect(errors, errors.join("\n")).toHaveLength(0);
});

test("a stored signup shows the success state", async ({ page }) => {
  const errors = collectPageErrors(page);
  let posted: unknown;
  await page.route("**/api/waitlist", async (route) => {
    posted = route.request().postDataJSON();
    await route.fulfill({ json: { ok: true, stored: true } });
  });

  await page.goto("/limere");
  await page.getByLabel("Email address").fill("qa@rsrvlabs.com");
  await page.getByRole("button", { name: "Get early access" }).click();

  await expect(page.getByText("on the list")).toBeVisible();
  expect(posted).toMatchObject({ email: "qa@rsrvlabs.com", audience: "individual" });
  expect(errors, errors.join("\n")).toHaveLength(0);
});

test("the business CTA tags the signup as business audience", async ({ page }) => {
  let posted: unknown;
  await page.route("**/api/waitlist", async (route) => {
    posted = route.request().postDataJSON();
    await route.fulfill({ json: { ok: true, stored: true } });
  });

  await page.goto("/limere");
  await page.getByLabel("Email address").fill("venue@rsrvlabs.com");
  await page.getByRole("button", { name: "Partner with Limere" }).click();

  await expect(page.getByText("on the list")).toBeVisible();
  expect(posted).toMatchObject({ email: "venue@rsrvlabs.com", audience: "business" });
});

test("a duplicate (already-on-the-list) response still resolves to success, not an error", async ({
  page,
}) => {
  // Mirrors what the real route does for a Postgres 409 on the email primary
  // key: it reports { ok: true, stored: true } because re-signing-up is a
  // success for the person doing it, not a failure — see the comment above
  // POST() in src/app/api/waitlist/route.ts.
  const errors = collectPageErrors(page);
  await page.route("**/api/waitlist", async (route) => {
    await route.fulfill({ json: { ok: true, stored: true } });
  });

  await page.goto("/limere");
  await page.getByLabel("Email address").fill("already@rsrvlabs.com");
  await page.getByRole("button", { name: "Get early access" }).click();

  await expect(page.getByText("on the list")).toBeVisible();
  expect(errors, errors.join("\n")).toHaveLength(0);
});

test("a storage failure degrades gracefully instead of showing a broken form", async ({ page }) => {
  // stored: false is the route's signal that the Supabase write didn't land
  // (outage, RLS drift, etc). The client's fallback is a mailto handoff so
  // the signup isn't lost — but the visible state must still read as
  // success, never a dead-end error.
  const errors = collectPageErrors(page);
  await page.route("**/api/waitlist", async (route) => {
    await route.fulfill({ json: { ok: true, stored: false } });
  });

  await page.goto("/limere");
  await page.getByLabel("Email address").fill("fallback@rsrvlabs.com");
  await page.getByRole("button", { name: "Get early access" }).click();

  await expect(page.getByText("on the list")).toBeVisible();
  expect(errors, errors.join("\n")).toHaveLength(0);
});

test("an invalid email is rejected client-side without calling the API", async ({ page }) => {
  let called = false;
  await page.route("**/api/waitlist", async (route) => {
    called = true;
    await route.fulfill({ json: { ok: true, stored: true } });
  });

  await page.goto("/limere");
  await page.getByLabel("Email address").fill("not-an-email");
  await page.getByRole("button", { name: "Get early access" }).click();

  // Stays on the form — no success state, no request fired.
  await expect(page.getByLabel("Email address")).toBeVisible();
  expect(called).toBe(false);
});
