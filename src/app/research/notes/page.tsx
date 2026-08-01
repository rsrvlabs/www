import type { Metadata } from "next";
import Link from "next/link";
import {
  AppleNav,
  Body,
  CtaButton,
  Footer,
  H2,
  Page,
  Section,
  apple,
} from "@/components/apple/kit";
import { NOTES } from "./notes";

export const metadata: Metadata = {
  title: "Lab notes — Reserve Research",
  description:
    "The daily tier of Reserve Research: one mechanism per note, written the day it bit us. Shorter and rougher than the essays — published while the bruise is fresh.",
};

/**
 * Lab notes INDEX — the daily tier under /research (essays are the weekly
 * tier). Same Apple grammar as the rest of the site; the list reuses the
 * homepage timeline row (.trow) so dates + entries read as one system.
 */
export default function LabNotesPage() {
  return (
    <Page>
      <AppleNav />

      <Section center>
        <h1 className={apple.hero}>Lab notes.</h1>
        <p className={apple.sub}>
          One mechanism a day, written the day it bit us. Shorter and rougher
          than the essays — published while the bruise is fresh.
        </p>
        <Body center>
          These are the daily tier of our research: small, honest write-ups of
          what running a company on an AI operating system actually breaks and
          teaches. Each one is a single generalizable mechanism, not a diary
          entry.
        </Body>
      </Section>

      <Section>
        <div className={apple.article}>
          <div className={apple.timeline}>
            {NOTES.map((n) => (
              <div key={n.slug} className={apple.trow}>
                <span className={apple.ttime}>
                  {n.date.slice(5).replace("-", ".")}
                </span>
                <span className={apple.ttext}>
                  <Link href={`/research/notes/${n.slug}`}>{n.title}</Link>
                  {" — "}
                  {n.hook}
                </span>
              </div>
            ))}
          </div>
          <p className={apple.articleMeta}>
            Dates are 2026. New notes land most days; the weekly essays live at{" "}
            <Link href="/research">Research</Link>.
          </p>
        </div>
      </Section>

      <Section center>
        <H2>One note a day, while we learn.</H2>
        <CtaButton subject="Lab notes" label="Get pinged when they land" />
      </Section>

      <Footer />
    </Page>
  );
}
