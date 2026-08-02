import Link from "next/link";
import type { ReactNode } from "react";
import s from "./apple.module.css";

export const CONTACT = "hello@rsrvlabs.com";

export { AppleNav } from "./nav";
import { Reveal } from "./reveal";
export { Reveal };

export function Page({ children }: { children: ReactNode }) {
  return <main className={s.page}>{children}</main>;
}

export function Section({
  children,
  tinted = false,
  center = false,
  id,
}: {
  children: ReactNode;
  tinted?: boolean;
  center?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={[s.section, tinted ? s.tinted : "", center ? s.center : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={s.inner}>
        <Reveal>{children}</Reveal>
      </div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className={s.eyebrow}>{children}</p>;
}

export function H2({ children }: { children: ReactNode }) {
  return <h2 className={s.h2}>{children}</h2>;
}

export function Body({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return <p className={center ? s.bodyCenter : s.body}>{children}</p>;
}

export function Rule() {
  return <hr className={s.rule} />;
}

/** One byline for everything published under /research. It lives here, once, so
 *  that changing how the studio signs its writing is a single edit rather than
 *  a sweep across every essay and lab note. */
export const BYLINE = "Reserve — an AI-native studio.";

/** The meta line under an article title. Callers pass the part that differs —
 *  the series/essay numbering, or "Lab note", plus the real publication date —
 *  and the byline is appended from the shared constant above. */
export function ArticleMeta({ children }: { children: ReactNode }) {
  return (
    <p className={s.articleMeta}>
      {children} · {BYLINE}
    </p>
  );
}

/** A big rounded product tile — the landing's "shop the line-up" surface. */
export function Tile({
  kicker,
  title,
  body,
  href,
  cta = "Learn more",
}: {
  kicker: string;
  title: string;
  body: string;
  href: string;
  cta?: string;
}) {
  return (
    <Link href={href} className={s.tile}>
      <p className={s.tileKicker}>{kicker}</p>
      <h3 className={s.tileTitle}>{title}</h3>
      <p className={s.tileBody}>{body}</p>
      <span className={s.tileLink}>{cta} &rsaquo;</span>
    </Link>
  );
}

/** One arm of the house, set like a line on a menu: the name and its standing
 *  share a baseline with a leader between them, and one short line sits under.
 *  The homepage index is built from these; /labs and /frontiers can use the
 *  same row rather than inventing a second list style. */
export function IndexRow({
  name,
  body,
  meta,
  href,
}: {
  name: string;
  body: string;
  meta: string;
  href: string;
}) {
  return (
    <Link href={href} className={s.menuRow}>
      <span className={s.menuHead}>
        <h2 className={s.menuName}>{name}</h2>
        <span className={s.menuLeader} aria-hidden="true" />
        <span className={s.menuMeta}>{meta}</span>
      </span>
      <p className={s.menuBody}>{body}</p>
    </Link>
  );
}

/** A centred italic section label with a short rule under it — the menu's way
 *  of naming a course. Replaces the eyebrow on pages that use the menu set. */
export function MenuLabel({ children }: { children: ReactNode }) {
  return <p className={s.menuLabel}>{children}</p>;
}

/** A numbered position. Six of these are the spine of the homepage — the part
 *  that says how the house works rather than what it sells. */
export function StanceItem({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) {
  return (
    <div className={s.stanceItem}>
      <p className={s.stanceNum}>{n}</p>
      <h2 className={s.stanceTitle}>{title}</h2>
      <p className={s.stanceBody}>{body}</p>
    </div>
  );
}

export function Card({
  title,
  body,
  kicker,
  spec,
}: {
  title: string;
  body: ReactNode;
  kicker?: string;
  spec?: string;
}) {
  return (
    <div className={s.card}>
      {kicker && <p className={s.tileKicker}>{kicker}</p>}
      <h3 className={s.cardTitle}>{title}</h3>
      <p className={s.cardBody}>{body}</p>
      {spec && <p className={s.tileKicker}>{spec}</p>}
    </div>
  );
}

/** mailto: is the site's only conversion path, and it silently does nothing for
 *  anyone on webmail without a registered protocol handler — a large share of
 *  the corporate desktop visitors this site is written for. Print the address
 *  underneath so a click that goes nowhere still leaves something to copy. */
export function CtaButton({ subject, label }: { subject: string; label: string }) {
  return (
    <>
      <a className={s.cta} href={`mailto:${CONTACT}?subject=${encodeURIComponent(subject)}`}>
        {label}
      </a>
      <p className={s.ctaFallback}>
        or write to <a href={`mailto:${CONTACT}?subject=${encodeURIComponent(subject)}`}>{CONTACT}</a>
      </p>
    </>
  );
}

export function Footer() {
  return (
    <footer className={`${s.footer} ${s.center}`}>
      <Link href="/" style={{ color: "inherit" }}>
        Reserve
      </Link>{" "}
      · {CONTACT}
    </footer>
  );
}

export { s as apple };
