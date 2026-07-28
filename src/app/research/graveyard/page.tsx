import type { Metadata } from "next";
import { AppleNav, Footer, Page, Section, apple } from "@/components/apple/kit";

export const metadata: Metadata = {
  title: "Apps for meeting nearby keep dying — Reserve Research",
  description:
    "Series 01, essay 11: the proximity graveyard is the most useful document in the category. Read separately, the autopsies show three doors: trust, density, consent. None of them is locked. Why our flagship is built to walk past all three, and what would still have to go wrong.",
  keywords: [
    "proximity social apps",
    "Color Labs",
    "Highlight app",
    "Yik Yak",
    "crossed paths",
    "meet people nearby",
    "Limere",
  ],
};

export default function GraveyardEssay() {
  return (
    <Page>
      <AppleNav />

      <Section center>
        <h1 className={apple.hero}>Apps for meeting nearby keep dying.</h1>
        <p className={apple.sub}>
          We read the autopsies before we built. They all died at the same
          three doors, and none of the doors is locked.
        </p>
        <p className={apple.articleMeta}>
          Series 01 · Essay 11 · Published 07.2026 · Reserve — curators, one brain.
        </p>
      </Section>

      <Section>
        <div className={apple.article}>
          <p>
            Every few years somebody builds the app that helps you meet the
            people physically around you, raises a spectacular round, and
            dies. Color raised $41 million before launch in 2011 and was gone
            within two years. Highlight was the app of SXSW 2012, faded as
            soon as the conference crowds went home, and was eventually
            acqui-hired by Pinterest. Yik Yak owned American campuses, was
            valued around $400 million, and shut down in 2017. Foursquare
            retreated from consumer discovery and rebuilt itself as a
            location-data company. The pattern is consistent enough that
            investors gave the category a name: a tarpit. Smart people keep
            walking in because the idea seems obviously good, and the tar
            keeps winning.
          </p>
          <p>
            Our flagship product is an app for meeting the people physically
            around you. So the graveyard is not an awkward subject for us. It
            is the most useful document in the category, and we read it before
            we wrote a line of code. What we found is that the standard
            conclusion, proximity social does not work, is a misreading. A
            verdict on the category lets every company die of the same vague
            cause, and nobody has to say which door each one actually died
            at. Read separately, the autopsies show three doors.
          </p>
          <p>
            The first door is trust. Every app in the graveyard ran on a
            radius: GPS said a stranger was somewhere within a few hundred
            meters of you, and the product asked you to treat that as a
            social fact. But a radius is a rumor. Nothing happened between
            you and that person. You never saw them, they never saw you, and
            the map cannot tell the difference between someone at the next
            table and someone three buildings away. Acting on a rumor feels
            random at best and unsafe at worst, so people mostly did not act,
            and a discovery app where nobody acts is a list of strangers. The
            fix is not a better radius. It is replacing the guess with a
            fact: you appear only where you actually are, to people who were
            actually there, and the moment two people cross paths becomes a
            record both of them can act on later. Verified presence turns
            who was near me from a rumor into a reason.
          </p>
          <p>
            The second door is density. A city-scoped feed needs something
            like a million users before it feels alive, and no consumer app
            survives the years of empty screens it takes to get there. This
            is the door most of the graveyard actually died at: not because
            nearby was wrong, but because nearby was scoped to a city. Scope
            it to a room instead and the arithmetic flips. A bar needs thirty
            people in it tonight. A conference needs one hall. Density and
            intent arrive together the moment you walk in, because everyone
            in the room chose to be there, and the product is useful at a
            scale a two-person team can actually bootstrap, one venue at a
            time.
          </p>
          <p>
            The third door is consent. The graveyard apps broadcast people to
            strangers by default, and users felt it immediately: the product
            read as surveillance with a social skin. The industry treated
            that as a messaging problem and wrote reassuring policies. It is
            an architecture problem. Either the system is built so that
            nothing identifying is ever broadcast, every field of a profile
            is disclosed by the owner&rsquo;s choice, and blocking someone
            removes you from their world completely, or it is not. No policy
            page rescues an architecture that creeps people out. Consent is
            the difference between a room that feels like a party and a room
            that feels like a lineup.
          </p>
          <p>
            Three doors, three decisions. But there is a deeper reason the
            graveyard generation could not have won even with better
            decisions, and it is the reason the timing is different now.
            Everything those apps showed you was self-report rearranged:
            profiles, check-ins, statuses. The signal that actually decides
            whether two people connect never entered their systems, because
            it could not be measured outside a laboratory. That changed
            recently. In 2022, researchers ran real blind dates at real
            events and measured everything; visible behavior predicted
            nothing, and what predicted attraction was two bodies
            physiologically in sync. And the instruments that can read that
            signal have quietly gone mainstream: nearly one in three American
            adults already wears a sensor. The graveyard was built before the
            honest signal was reachable. We get to build after. That is not
            cleverness. It is a date of birth.
          </p>
          <p>
            None of this makes us safe. The category punishes vagueness, and
            a list of the old failure modes is not immunity to new ones. We
            could get the room mechanics right and still misjudge how often
            people want a room at all. We could win nights and lose
            mornings. What the graveyard gives us is narrower and more
            useful than safety: it tells us exactly which mistakes are
            already spent. If we die, it will have to be at a new door, and
            we have written the three old ones on the wall where everyone,
            including you, can hold us to them. The full argument, with the
            studies and the numbers, lives at{" "}
            <a href="/limere/why">the case for our flagship</a>. The doors
            are open. That was the easy part. Now we have to get people to
            walk through.
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
