import type { Metadata } from "next";
import Link from "next/link";
import { SubpageHeader, MetaBar, CtaBand } from "@/components/site/subpage";
import { PunchSurface } from "@/components/site/punch-card";
import { SpecRow } from "@/components/site/spec-row";

export const metadata: Metadata = {
  title: "Reserve Research — notes on running an AI-native company",
  description:
    "Field notes from a studio run on an AI-native operating system — one shared brain, agents with jobs, humans making the calls.",
};

/**
 * Blog INDEX — the scrunch editorial blueprint adapted to night grammar
 * (design-refs/scrunch.md): wide featured entry → narrower list rows with
 * a mono tag column, dashed dividers, decimal-leading-zero markers.
 * Honest by construction: one published essay, the rest declared in
 * progress (they were already announced in this page's copy).
 */

const essays: Array<{
  n: string;
  title: string;
  status: string;
  href?: string;
}> = [
  {
    n: "01",
    title: "The AI-native company",
    status: "PUBLISHED",
    href: "/research/ai-native-company",
  },
  {
    n: "02",
    title: "Does an AI-native company still need departments?",
    status: "PUBLISHED",
    href: "/research/departments",
  },
  {
    n: "03",
    title: "We went looking for someone already doing this.",
    status: "PUBLISHED",
    href: "/research/prior-art",
  },
  {
    n: "04",
    title: "Don't let the agent grade itself.",
    status: "PUBLISHED",
    href: "/research/agent-self-evaluation",
  },
  {
    n: "05",
    title: "The harness has an expiration date. Ours mostly doesn't.",
    status: "PUBLISHED",
    href: "/research/harness-that-compounds",
  },
  {
    n: "06",
    title: "Build the floor, not the ceiling.",
    status: "PUBLISHED",
    href: "/research/build-the-floor",
  },
  {
    n: "07",
    title: "What replaces the meeting?",
    status: "IN PROGRESS",
  },
];

export default function ResearchPage() {
  return (
    <main className="lab-ground relative min-h-[100svh] w-full overflow-x-clip">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[52svh] grid-paper-night"
      />
      <SubpageHeader index="Q" label="Research" current="/research" />
      <div className="relative mx-auto w-full max-w-[68rem] px-6 pb-[16svh] pt-[22svh] md:px-10">
        {/* Label-scale hero (DESIGN.md title register): informational, well
            under the landing 7.4rem display concept. */}
        <h1 className="font-display text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.05] tracking-[-0.015em] text-paper">
          One studio. One brain. Agents with jobs.
        </h1>
        <MetaBar items={["Q — Research", "Reserve", "EST. MMXXIV"]} />
        <p className="mt-10 max-w-[52ch] font-sans text-[0.95rem] leading-[1.8] text-paper/70">
          We run this company on an operating system we built: one shared brain,
          agents with jobs, humans making the calls. These notes document the
          experiment in public.
        </p>

        {/* Featured — the series, wide */}
        <div className="hairline-dashed-night mt-14 pt-10">
          <PunchSurface className="-mx-5 p-5">
            <Link href="/research/ai-native-company" className="flex flex-col">
              <span className="kicker text-paper/50">
                Series 01 · First essay published
              </span>
              {/* Lead card title (DESIGN.md title register): a notch below the
                  page hero, clearly above the specimen entries. */}
              <span className="mt-4 block font-display text-[clamp(1.75rem,3.2vw,2.6rem)] leading-[1.1] tracking-[-0.015em] text-paper">
                <span className="link-underline">The AI-native company</span>
              </span>
              <span className="mt-4 block max-w-[58ch] font-sans text-[0.92rem] leading-[1.75] text-paper/70">
                Does an AI-native company still need departments? What replaces
                the meeting? Essays from inside the experiment — written as we
                learn, not after we&apos;ve won.
              </span>
              {/* Le Labo spec row (design-refs/lelabo §4): honest series facts
                  LEFT, still utility link RIGHT — same recipe as the doors
                  flagship, so landing + research read as one system. */}
              <SpecRow
                spec="series 01 · 6 published · 1 in progress"
                action="read the first essay →"
              />
            </Link>
          </PunchSurface>
        </div>

        {/* All notes — narrower list rows, mono tag column, dashed dividers */}
        <div className="mt-[10svh] max-w-[56rem]">
          <h2 className="kicker text-paper/45">All notes</h2>
          <div className="hairline-dashed-night mt-6 divide-y divide-dashed divide-paper/15">
            {essays.map((e) => (
              <article
                key={e.n}
                className="grid grid-cols-[7rem_1fr] items-baseline gap-4 py-6 md:grid-cols-[7.5rem_1fr_auto]"
              >
                <span className="kicker text-paper/45">{e.n} · S01</span>
                <h3 className="font-display text-[clamp(1.25rem,2.2vw,1.8rem)] leading-[1.2] text-paper">
                  {e.href ? (
                    <Link href={e.href}>
                      <span className="link-underline">{e.title}</span>
                    </Link>
                  ) : (
                    <span className="text-paper/60">{e.title}</span>
                  )}
                </h3>
                <span className="kicker col-start-2 text-[0.6rem] text-paper/40 md:col-start-3">
                  {e.status}
                </span>
              </article>
            ))}
          </div>
        </div>

        <CtaBand
          line="New essays land as we learn."
          label="Get pinged when they do"
          subject="Research pings"
        />

        <div className="hairline-dashed-night mt-20 pt-8">
          <Link href="/" className="label-mono link-underline text-paper/60">
            ← back to the studio
          </Link>
        </div>
      </div>
    </main>
  );
}
