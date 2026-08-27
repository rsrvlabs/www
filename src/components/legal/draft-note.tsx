// DRAFT-ONLY components. They exist so that an unreviewed legal draft cannot be
// mistaken for a published policy, and so that the questions only a lawyer or a
// founder may answer are impossible to scroll past.
//
// BEFORE PUBLISHING: delete this file, delete draft-note.module.css, and remove
// every import and usage of DraftBanner / LawyerFlag / OpenChoice from the legal
// pages. If any of them still render, the page is not ready to be published.
import type { ReactNode } from "react";
import s from "./draft-note.module.css";

/** Page-top banner marking the whole document as an unreviewed draft. */
export function DraftBanner({ children }: { children: ReactNode }) {
  return (
    <aside className={s.banner} role="note" aria-label="草稿說明">
      <p className={s.bannerTitle}>草稿 —— 尚未生效、尚未經律師審閱</p>
      {children}
    </aside>
  );
}

/** Inline marker for a passage a Taiwanese lawyer must rule on. */
export function LawyerFlag() {
  return <span className={s.lawyer}>律師必看</span>;
}

/**
 * A question the drafter deliberately did NOT answer: two drafted alternatives,
 * side by side, neither of them chosen. The founders and counsel pick one and
 * delete the other.
 */
export function OpenChoice({
  title,
  optionA,
  optionB,
  labelA,
  labelB,
  footnote,
}: {
  title: string;
  labelA: string;
  labelB: string;
  optionA: ReactNode;
  optionB: ReactNode;
  footnote: ReactNode;
}) {
  return (
    <aside className={s.choice} role="note" aria-label={title}>
      <p className={s.choiceTitle}>{title}</p>
      <div className={s.option}>
        <p className={s.optionLabel}>{labelA}</p>
        <div className={s.optionBody}>{optionA}</div>
      </div>
      <div className={s.option}>
        <p className={s.optionLabel}>{labelB}</p>
        <div className={s.optionBody}>{optionB}</div>
      </div>
      <div className={s.choiceFoot}>{footnote}</div>
    </aside>
  );
}
