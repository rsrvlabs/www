import type { Metadata } from "next";
import { AppleNav, Footer, Page, Section, apple } from "@/components/apple/kit";

export const metadata: Metadata = {
  title: "We went looking for someone already doing this — Reserve Research",
  description:
    "Series 01, essay 03: we scanned the field for a company already run by one agentic brain, hoping to copy it. What we found was a lot of tools, a few demos, and one empty quadrant.",
};


export default function PriorArtEssay() {
  return (
    <Page>
      <AppleNav />

      <Section center>
        <h1 className={apple.hero}>We went looking for someone already doing this.</h1>
        <p className={apple.sub}>
          We scanned the field for a company already run by one agentic brain,
          hoping to copy it. What we found was a lot of tools, a few demos, and
          one empty quadrant.
        </p>
        <p className={apple.articleMeta}>
          Series 01 · Essay 03 · Published 07.2026 · Reserve — curators, one brain.
        </p>
      </Section>

      <Section>
        <div className={apple.article}>
          <p>
            The responsible way to build something strange is to find the
            people who already built it and copy their homework. So before we
            committed to running a studio on a single agentic brain, we did
            the survey: dozens of repositories and papers, the whole current
            wave of agent memory, agent operating systems, and
            &ldquo;company-in-a-box&rdquo; frameworks. We were not looking to
            be first. We were looking to be second.
          </p>
          <p>
            The field is enormous and much of it is excellent. There are
            memory layers with tens of thousands of stars, skill libraries
            the size of small operating systems, always-on assistant runtimes
            that genuinely operate tasks for a person. What there was not, in
            any of it, was the thing we actually wanted to copy: a real
            company whose day-to-day operations — the research, the tickets,
            the digests, the watch on the competition — are run by one brain
            on a schedule, with humans kept for the calls that matter.
          </p>


          <p>
            Plot what exists by two questions — is it a tool you run, or a
            thing that runs itself; is it a demo of an idea, or is it
            operating real work — and the projects cluster in the corners. The
            memory engines and skill kits sit low and to the left: components,
            brilliant ones, that you assemble. The framework demos sit
            org-shaped but idle, performing the shape of a company for a
            screenshot. The one genuine neighbor we found was a blog post — an
            agency running its operations on a Claude-Code second brain,
            earning its software more trust over time. Not a codebase we could
            read. An account we could nod at.
          </p>
          <p>
            <strong>
              The quadrant we live in came back empty. That is a strange place
              to be proud of, and a good place to be nervous.
            </strong>
          </p>
          <p>
            We want to be careful about what that emptiness means, because the
            flattering reading is almost certainly the wrong one. A quadrant
            stays empty for two kinds of reasons: nobody thought to stand
            there, or everybody who tried got carried out. We do not yet know
            our ratio. The field is littered with confident systems that did
            the wrong job at scale, memory that rotted the moment no one
            curated it, autonomy that reached one step too far. We have hit
            small versions of all three, some of them the same week we are
            writing this.
          </p>
          <p>
            So we are treating &ldquo;no one else publishes this&rdquo; as an
            obligation, not a trophy. If we are going to stand in the empty
            quadrant, the least we can do is leave notes for whoever stands
            here next — what the field actually offered, what we borrowed, and
            where the ground gave way. The other essays in this series are
            those notes. This one is just the map we drew before we started
            walking.
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
