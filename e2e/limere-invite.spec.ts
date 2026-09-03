import { expect, test, type Page } from "playwright/test";

function collectPageErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console.error: ${message.text()}`);
  });
  return errors;
}

test.describe("Limere activity invite handoff", () => {
  test("keeps the invite in the fragment and offers explicit handoff actions", async ({ page }) => {
    const errors = collectPageErrors(page);
    await page.goto("/limere/invite#AB12CD");

    await expect(page.getByRole("heading", { name: "一起去這場活動" })).toBeVisible();
    await expect(page.getByTestId("invite-code")).toContainText("AB12CD");
    await expect(page.getByTestId("open-limere")).toHaveAttribute(
      "href",
      "limere://session/AB12CD",
    );
    await expect(page.getByTestId("download-limere")).toHaveAttribute(
      "href",
      "https://testflight.apple.com/join/UuC5Yk26",
    );
    await expect(page).toHaveURL(/\/limere\/invite#AB12CD$/);
    expect(errors, errors.join("\n")).toHaveLength(0);
  });

  test("publishes Limere-only metadata without indexing a tokenless utility page", async ({
    page,
  }) => {
    await page.goto("/limere/invite#AB12CD");

    await expect(page).toHaveTitle("Limere 活動邀請");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://www.rsrvlabs.com/limere/invite",
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });

  test("normalizes an encoded lower-case fragment", async ({ page }) => {
    await page.goto("/limere/invite#%20ab12cd%20");

    await expect(page.getByTestId("invite-code")).toContainText("AB12CD");
    await expect(page.getByTestId("open-limere")).toHaveAttribute(
      "href",
      "limere://session/AB12CD",
    );
  });

  test("revalidates a changed fragment and safely handles malformed encoding", async ({ page }) => {
    await page.goto("/limere/invite#AB12CD");
    await expect(page.getByTestId("open-limere")).toHaveAttribute(
      "href",
      "limere://session/AB12CD",
    );

    await page.evaluate(() => {
      window.location.hash = "%E0%A4%A";
    });

    await expect(page.getByText("這個邀請連結不完整。請回到原本的 QR Code 再掃一次。"))
      .toBeVisible();
    await expect(page.locator('a[href^="limere://"]')).toHaveCount(0);

    await page.evaluate(() => {
      window.location.hash = "EF34GH";
    });
    await expect(page.getByTestId("invite-code")).toContainText("EF34GH");
    await expect(page.getByTestId("open-limere")).toHaveAttribute(
      "href",
      "limere://session/EF34GH",
    );
  });

  test("rejects missing or invalid fragments and ignores query data", async ({ page }) => {
    await page.goto("/limere/invite?code=AB12CD#NOT-A-CODE");

    await expect(page.getByText("這個邀請連結不完整。請回到原本的 QR Code 再掃一次。"))
      .toBeVisible();
    await expect(page.getByText("AB12CD", { exact: true })).toHaveCount(0);
    await expect(page.locator('a[href^="limere://"]')).toHaveCount(0);
    await expect(page.getByRole("button", { name: /開啟 Limere/ })).toBeDisabled();
  });

  test("keeps mobile controls tappable without horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/limere/invite#AB12CD");

    for (const control of [page.getByTestId("open-limere"), page.getByTestId("download-limere")]) {
      const box = await control.boundingBox();
      expect(box?.height).toBeGreaterThanOrEqual(44);
    }

    const widths = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(widths.content).toBe(widths.viewport);
  });

  test("is safe before hydration and when the fragment is missing", async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/limere/invite");

    await expect(page.locator('a[href^="limere://"]')).toHaveCount(0);
    await expect(page.getByRole("button", { name: /開啟 Limere/ })).toBeDisabled();
    await expect(page.getByTestId("invite-code")).toContainText("------");
    await context.close();
  });

  test("supports keyboard focus and reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/limere/invite#AB12CD");

    // The server-safe initial state renders a disabled button until hydration
    // reads the URL fragment. Wait for the real link before exercising Tab;
    // otherwise a slower CI machine can tab past the pre-hydration button.
    await expect(page.getByTestId("open-limere")).toHaveAttribute(
      "href",
      "limere://session/AB12CD",
    );
    await page.keyboard.press("Tab");
    await expect(page.getByTestId("open-limere")).toBeFocused();
    await expect(page.getByTestId("open-limere")).toHaveCSS("outline-style", "solid");
    await page.keyboard.press("Tab");
    await expect(page.getByTestId("download-limere")).toBeFocused();

    await expect(page.locator("header")).toHaveCSS("animation-name", "none");
    await expect(page.getByRole("heading", { name: "一起去這場活動" }).locator(".."))
      .toHaveCSS("animation-name", "none");
  });

  test("keeps the invite after a TestFlight round trip", async ({ page }) => {
    await page.route("https://testflight.apple.com/join/UuC5Yk26", (route) =>
      route.fulfill({ status: 200, contentType: "text/html", body: "<h1>TestFlight</h1>" }),
    );
    await page.goto("/limere/invite#AB12CD");
    await page.getByTestId("download-limere").click();
    await expect(page.getByRole("heading", { name: "TestFlight" })).toBeVisible();

    await page.goBack();
    await expect(page).toHaveURL(/\/limere\/invite#AB12CD$/);
    await expect(page.getByTestId("open-limere")).toHaveAttribute(
      "href",
      "limere://session/AB12CD",
    );
  });
});
