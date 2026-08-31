import { expect, test } from "playwright/test";

test.describe("Limere activity invite handoff", () => {
  test("keeps the invite in the fragment and offers explicit handoff actions", async ({ page }) => {
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
});
