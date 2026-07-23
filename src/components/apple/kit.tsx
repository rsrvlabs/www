import Link from "next/link";
import type { ReactNode } from "react";
import s from "./apple.module.css";

export const CONTACT = "hello@rsrvlabs.com";

export { AppleNav } from "./nav";

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
      <div className={s.inner}>{children}</div>
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

export function CtaButton({ subject, label }: { subject: string; label: string }) {
  return (
    <a className={s.cta} href={`mailto:${CONTACT}?subject=${encodeURIComponent(subject)}`}>
      {label}
    </a>
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
