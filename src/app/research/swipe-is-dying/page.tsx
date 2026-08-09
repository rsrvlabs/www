import type { Metadata } from "next";
import { AppleNav, ArticleMeta, Footer, Page, Section, apple } from "@/components/apple/kit";

export const metadata: Metadata = {
  title: "The swipe is dying. Even Tinder knows it. — Reserve Research",
  description:
    "Series 01, essay 12: Tinder and Bumble are both bolting real-world rooms onto the swipe deck, on their own earnings calls. That is not a new feature. It is a concession — and the honest reading of their own data says discovery should have started with the room, not the deck.",
  keywords: [
    "Tinder Events",
    "swipe fatigue",
    "Bumble swipe-free",
    "Match Group earnings",
    "proximity dating apps",
    "Limere",
  ],
};

export default function SwipeIsDyingEssay() {
  return (
    <Page>
      <AppleNav />

      <Section center>
        <h1 className={apple.hero}>The swipe is dying. Even Tinder knows it.</h1>
        <p className={apple.sub}>
          Tinder and Bumble are both building the room they spent a decade
          trying to make unnecessary, in public, on their own earnings calls.
          That is not a new feature. It is a confession.
        </p>
        <ArticleMeta>Series 01 · Essay 12 · Published 10 August 2026</ArticleMeta>
      </Section>

      <Section>
        <div className={apple.article}>
          <p>
            On August 5, Tinder confirmed{" "}
            <a
              href="https://techcrunch.com/2026/08/05/as-gen-z-reconsiders-dating-apps-tinders-irl-events-expand-to-dozens-more-cities/"
              target="_blank"
              rel="noreferrer"
            >
              a plan to reach seventy-five cities by the end of the year
            </a>{" "}
            with Events, the in-person meetup tab it piloted in Los Angeles
            back in March. The rollout had already reached{" "}
            <a
              href="https://www.bloomberg.com/news/articles/2026-07-23/tinder-brings-in-person-dating-events-to-more-cities-in-the-us-europe"
              target="_blank"
              rel="noreferrer"
            >
              nine more cities across the United States and Europe
            </a>{" "}
            by July 23, twenty-six live by September, and Kansas City joined
            on July 29. The rooms themselves are bowling nights, pottery
            classes, speakeasies, raves — people who spent a decade opting
            into a deck of photos are now being asked to opt into an actual
            room. Match Group&rsquo;s own chief executive, Spencer Rascoff,
            said the quiet part out loud when the numbers went out: nearly
            half of singles between eighteen and twenty-nine, he said, want to
            build closer connections in person, not through the app.
          </p>
          <p>
            Read that rollout as a confession, not a feature. A company does
            not staff, fund and expand a live-events business inside a
            product whose entire twelve-year architecture is a stack of
            photos you flick through, unless the stack itself has stopped
            doing the job. Tinder is not adding events on top of a system
            that works. It is admitting swiping was never the thing that got
            two people to like each other. It was the thing you did while
            waiting for something else to happen, and lately, not enough
            people are willing to wait.
          </p>
          <p>
            The swipe deck was always a supply-side invention. It solved the
            platform&rsquo;s problem: how do you show an infinite, appealing
            catalog of strangers to someone holding a phone with zero context
            about any of them. It solved that brilliantly enough to define an
            industry for a decade. What it never solved, because it was never
            built to, is the demand-side problem — two people deciding, on
            almost no information, whether a stranger is worth an evening.
            Infinite choice and zero context is a combination that produces
            fatigue and distrust at a rate the earnings calls can no longer
            absorb quietly.
          </p>
          <p>
            Bumble got there first, and with numbers attached. The company
            that built its whole differentiation on who gets to swipe first
            is now, by its own chief executive&rsquo;s account,{" "}
            <a
              href="https://techcrunch.com/2026/08/06/bumble-teases-a-swipe-free-future-as-it-doubles-down-on-irl-meetups/"
              target="_blank"
              rel="noreferrer"
            >
              moving away from optimizing for swipe speed
            </a>{" "}
            toward what Whitney Wolfe Herd called &ldquo;more intentional,
            fewer, better, more considered signals&rdquo; — a new group-meetup
            app called Plans, and a swipe-free interaction model still to
            come, with a stated aim of retiring the deck in select markets by
            the fourth quarter of 2026. The driver is on the balance sheet,
            not in a design workshop: paying users down 21.1 percent year
            over year, revenue down 14.1 percent, by the company&rsquo;s own
            first-quarter filings. Nobody deletes a core mechanic that is
            working.
          </p>
          <p>
            Match Group&rsquo;s second-quarter print, released August 4, tells
            the same story from the other side of the parent company&rsquo;s
            ledger: revenue down 1 percent to $853 million, the stock down 11
            percent on the day. What is propping the group up is not Tinder.
            It is Hinge, built from the start around a smaller number of
            intentional matches rather than an infinite deck, and the read
            across the coverage was blunt — Hinge&rsquo;s growth is offsetting
            Tinder&rsquo;s softness, not the reverse.
          </p>
          <p>
            So look at the shape of the fix, because it tells you what the
            company believes actually broke. Events sits as a tab next to the
            deck, not instead of it. Double Date turns swiping into a group
            activity instead of removing it. A three-minute video
            speed-dating pilot in Los Angeles compresses a real conversation
            into a format the deck can still schedule around. A new
            partnership with the events company We Met In Real Life, whose
            first joint event ran in New York this month, outsources the one
            job the app was never built to do — get a room full of strangers
            to actually show up. New users now clear a mandatory Face Check
            before they can swipe on anyone: an identity gate stitched onto a
            system designed, on purpose, not to need one. Every piece of it
            is a real-world patch grafted onto a screen-native core.
          </p>
          <p>
            Read that whole list and the conclusion the company&rsquo;s own
            roadmap is pointing at is not subtle: discovery should have been
            grounded in physical co-presence from the beginning, and
            everything shipped since March has been retrofitting a room onto
            a deck built specifically to avoid needing one. The alternative
            is already working at a fraction of the scale, with no deck to
            retrofit at all. Timeleft, which seats strangers at dinner and
            skips swiping entirely, has reportedly reached roughly &euro;18
            million in annual revenue after twenty months on 150,000 monthly
            users, and raised a $7 million Series A — by third-party
            trackers&rsquo; estimates, since the company does not publish
            audited figures. The pull toward the room is not particular to
            dating.{" "}
            <a
              href="https://www.forbes.com/sites/oliviashalhoup/2026/07/29/community-as-the-new-currency-inside-2026s-third-space-boom/"
              target="_blank"
              rel="noreferrer"
            >
              Sixty-seven percent of adults report loneliness they trace to a
              lack of group involvement
            </a>
            , Forbes reported on July 29, citing a 2024 Harvard survey, and
            run clubs are up 59 percent by Strava&rsquo;s own count. People are
            going looking for each other in rooms again, in every category at
            once.
          </p>
          <p>
            Our own flagship, Limere, is built the other way around: presence
            first, no deck at all. You see who is actually in the room with
            you tonight, and what you keep afterward is only the people your
            paths genuinely crossed. It is a narrower bet than a global
            events calendar bolted onto an app with tens of millions of
            users already on it, and we would not claim otherwise. It just
            does not have to retrofit its way out of a deck it never built in
            the first place.
          </p>
          <p>
            Tinder and Bumble are not wrong that the room is where this has
            to end up. They are only proving it the expensive way: a decade
            spent teaching people to expect the deck first, and a 2026 spent
            building, tab by tab, city by city, the thing that should have
            been the front door. The swipe was never the product. It was the
            waiting room. Even the companies that built it are now paying to
            walk people out of it.
          </p>

          <a className={apple.backLink} href="/research">
            &lsaquo; Research
          </a>
        </div>
      </Section>

      <Footer />
    </Page>
  );
}
