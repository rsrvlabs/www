import Image from "next/image";
import Link from "next/link";
import { AppleNav, Page, Section, CtaButton, Footer, apple } from "@/components/apple/kit";
import m from "../mock.module.css";

/** MOCK A — 作品先行 (the atelier index).
 *  The house never explains itself; the works do. Hero states what Reserve is
 *  in one line that names the products, then the page becomes an index: one
 *  numbered row per work, with its own status. Reference: Pentagram / Teenage
 *  Engineering / Margiela — the maison is invisible, the output is the identity.
 *  Not linked from nav or sitemap: this route exists for founder review only. */

export const metadata = {
  title: "Reserve — mock A",
  robots: { index: false, follow: false },
};

const WORKS: Array<{ n: string; name: string; body: string; meta: string; href: string }> = [
  {
    n: "01",
    name: "Limere",
    body: "A dating app you finish in person. You only meet the people you actually crossed paths with — one room, one evening at a time.",
    meta: "Flagship · shipping",
    href: "/limere",
  },
  {
    n: "02",
    name: "Reserve Finance",
    body: "A US-equities desk that reasons in public. It scores the market before the open, publishes the brief, and answers for the call afterwards.",
    meta: "Labs · publishing daily",
    href: "/labs",
  },
  {
    n: "03",
    name: "Glow",
    body: "Beauty tech. On the bench, not yet in anyone's hands.",
    meta: "Labs · in the making",
    href: "/labs",
  },
  {
    n: "04",
    name: "Forward deployment",
    body: "Senior engineers embedded inside a client's team, shipping AI systems into production. The frontier work feeds the products.",
    meta: "Frontiers · open",
    href: "/frontiers",
  },
];

export default function MockA() {
  return (
    <Page>
      <AppleNav />

      <Section center>
        <p className={m.tag}>An AI-native studio · Taipei</p>
        <h1 className={apple.display}>We make four things.</h1>
        <p className={apple.sub}>
          A dating app you finish in person. A finance desk that publishes its
          own reasoning. Beauty tech in the making. And a few engineering teams
          we join from the inside.
        </p>
      </Section>

      <Section>
        <div className={m.index}>
          {WORKS.map((w) => (
            <Link key={w.n} href={w.href} className={m.row}>
              <span className={m.num}>{w.n}</span>
              <span>
                <h2 className={m.rowName}>{w.name}</h2>
                <p className={m.rowBody}>{w.body}</p>
              </span>
              <span className={m.rowMeta}>{w.meta}</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tinted center>
        <h2 className={apple.h2}>The one in people&rsquo;s hands.</h2>
        <div className={m.still}>
          <Image
            src="/limere/nearby-en.png"
            alt="Limere on iPhone — the people you actually crossed paths with"
            width={780}
            height={1696}
            priority
          />
        </div>
      </Section>

      <Section center>
        <h2 className={apple.h2}>Come in.</h2>
        <p className={m.ledeCenter}>
          Early access to Limere, an embedded team, or the journal. One address —
          we answer everything.
        </p>
        <CtaButton subject="Hello Reserve" label="Get in touch" />
      </Section>

      <Footer />
    </Page>
  );
}
