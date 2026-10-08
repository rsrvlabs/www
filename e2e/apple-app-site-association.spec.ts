import { expect, test } from "playwright/test";

/**
 * Apple fetches the universal-links file from exactly this path and does not follow redirects
 * (R694): it must answer 200 JSON here. The document is spelled out, not imported, so a change
 * to the app ID or the invite paths must change this test too.
 */
test("/.well-known/apple-app-site-association answers 200 JSON for the Limere invite paths only", async ({ request }) => {
  const res = await request.get("/.well-known/apple-app-site-association", { maxRedirects: 0 });
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toMatch(/^application\/json\b/);
  expect(await res.json()).toEqual({
    applinks: {
      details: [
        {
          appIDs: ["VAW9648J9J.com.rsrvlabs.limere"],
          components: [
            { "/": "/limere/invite", comment: expect.any(String) },
            { "/": "/limere/invite/*", comment: expect.any(String) },
          ],
        },
      ],
    },
  });
});
