/** R2359: old printed participant invites continue to the Web fallback after Apple's cache refresh.
 * Host-page intents keep their existing native route. Explicit 0 restores native-first activity links.
 * Match the Limere site's NEXT_PUBLIC_INVITE_IOS_WEB_FALLBACK build setting on rollback.
 */
const webValue = process.env.NEXT_PUBLIC_INVITE_IOS_WEB_FALLBACK;
const webEnabled = webValue === undefined || webValue === "1";
const APPLE_APP_SITE_ASSOCIATION = {
  applinks: {
    details: [{
      appIDs: ["VAW9648J9J.com.rsrvlabs.limere"],
      components: ["/limere/invite", "/limere/invite/*"].flatMap(path => webEnabled ? [
        { "/": path, "?": { host: "1" }, comment: "Host-page intent retains native handoff." },
        { "/": path, exclude: true, comment: "Participant activity invite continues in the browser." },
      ] : [
        { "/": path, comment: "Explicit rollback: native activity handoff." },
      ]),
    }],
  },
};

export const dynamic = "force-static";

export function GET() {
  return Response.json(APPLE_APP_SITE_ASSOCIATION);
}
