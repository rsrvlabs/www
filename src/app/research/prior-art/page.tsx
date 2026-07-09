import type { Metadata } from "next";
import Link from "next/link";
import { SubpageHeader, MetaBar, CtaBand } from "@/components/site/subpage";
import { PriorArtMap } from "@/components/visuals/prior-art-map";

export const metadata: Metadata = {
  title: "We went looking for someone already doing this — Reserve Research",
  description:
    "Series 01, essay 03: we scanned the field for a company already run by one agentic brain, hoping to copy it. What we found was a lot of tools, a few demos, and one empty quadrant.",
};

/**
 * Post page — same scrunch night blueprint as essays 01/02. Carries the
 * PriorArtMap interactive figure (the arch-scan landscape as a positioning
 * quadrant). Written in the humble survey register — this is a field report
 * on prior art, not a victory lap; the empty quadrant is framed as a warning.
 */
export default function PriorArtEssay() {
  return (
    <main className="relative min-h-[100svh] w-full overflow-x-clip bg-night">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[40svh] grid-paper-night"
      />
      <SubpageHeader index="Q" label="Research" current="/research" />
      <article className="relative mx-auto w-full max-w-[68rem] px-6 pb-[16svh] pt-[22svh] md:px-10">
        <MetaBar items={["Series 01 · Essay 03", "Reserve", "Published 07.2026"]} />
        <h1 className="mt-8 max-w-[20ch] font-display text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.08] tracking-[-0.015em] text-paper">
          We went looking for someone already doing this.
        </h1>

        <div className="mx-auto mt-14 max-w-[850px]">
          <div className="hairline-dashed-night space-y-7 pt-12 font-display text-[19px] leading-[1.7] text-paper/85">
            <p className="first-letter:float-left first-letter:mr-3 first-letter:mt-2 first-letter:font-display first-letter:text-[5rem] first-letter:leading-[0.75] first-letter:text-paper">
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

            <PriorArtMap />

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
            <blockquote className="mx-auto max-w-[26ch] py-6 text-center font-display italic text-[clamp(1.5rem,2.6vw,1.95rem)] leading-[1.3] text-paper">
              The quadrant we live in came back empty. That is a strange place
              to be proud of, and a good place to be nervous.
            </blockquote>
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
          </div>

          <footer className="hairline-dashed-night mt-16 grid grid-cols-1 gap-4 pt-8 md:grid-cols-[220px_1fr]">
            <span className="kicker text-paper/50">Author</span>
            <div>
              <p className="font-display text-xl leading-snug text-paper">
                Reserve — curators, one brain.
              </p>
              <Link
                href="/research"
                className="label-mono link-underline mt-5 inline-block text-paper/60"
              >
                ← all research
              </Link>
            </div>
          </footer>

          <CtaBand
            line="New essays land as we learn."
            label="Get pinged when they do"
            subject="Research pings"
          />
        </div>
      </article>
    </main>
  );
}
