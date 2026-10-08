/**
 * Apple's universal-links file for www.rsrvlabs.com (R694, 2026-10-08): on an iPhone with Limere
 * installed, an activity invite QR (`https://www.rsrvlabs.com/limere/invite#CODE`, what the app
 * still mints until most installs read limere.app, R692/R190) opens in the app with the code
 * filled in, instead of on src/app/limere/invite. The app side is the
 * `applinks:www.rsrvlabs.com` Associated Domains entitlement in sw-app.
 *
 * Apple fetches this from exactly this path and does not follow redirects, so it must answer
 * 200 JSON here; src/proxy.ts does not match it. Bare `rsrvlabs.com` 308s to www, so the app
 * lists only www. Only the invite paths open the app; every other page stays in the browser.
 */
const APPLE_APP_SITE_ASSOCIATION = {
  applinks: {
    details: [
      {
        appIDs: ["VAW9648J9J.com.rsrvlabs.limere"],
        components: [
          { "/": "/limere/invite", comment: "Limere activity invite; the code rides in the #fragment." },
          { "/": "/limere/invite/*", comment: "Limere activity invite with a trailing path." },
        ],
      },
    ],
  },
};

export const dynamic = "force-static";

export function GET() {
  return Response.json(APPLE_APP_SITE_ASSOCIATION);
}
