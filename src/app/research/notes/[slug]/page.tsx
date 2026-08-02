import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppleNav, Footer, Page, Section, apple } from "@/components/apple/kit";
import { NOTES } from "../notes";

/**
 * Lab note detail — same article grammar as the research essays, with a
 * "Lab note" meta line instead of the Series/Essay numbering.
 */

export function generateStaticParams() {
  return NOTES.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = NOTES.find((n) => n.slug === slug);
  if (!note) return {};
  return {
    title: `${note.title} — Reserve Research lab notes`,
    description: note.hook,
  };
}

export default async function LabNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = NOTES.find((n) => n.slug === slug);
  if (!note) notFound();

  return (
    <Page>
      <AppleNav />

      <Section center>
        <h1 className={apple.hero}>{note.title}</h1>
        <p className={apple.articleMeta}>
          Lab note · {note.date} · Reserve — an AI-native studio.
        </p>
      </Section>

      <Section>
        <div className={apple.article}>
          {note.body}
          <Link href="/research/notes" className={apple.backLink}>
            ← All lab notes
          </Link>
        </div>
      </Section>

      <Footer />
    </Page>
  );
}
