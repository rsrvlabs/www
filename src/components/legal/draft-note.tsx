// DRAFT-ONLY components. They exist so that an unpublished legal draft cannot be
// mistaken for a live policy, and so that the questions only a founder may
// answer are impossible to scroll past.
//
// The lawyer gate was removed by Ryvn on 2026-09-03 (「隱私條款我們自己寫就好
// 實務上先不找律師」). The review step is now: we finish the text ourselves →
// both founders read it → publish. So the markers below name FOUNDERS, not
// counsel.
//
// BEFORE PUBLISHING: delete this file, delete draft-note.module.css, and remove
// every import and usage of DraftBanner / FounderCall from the legal pages. If
// either of them still renders, the page is not ready to be published.
import type { ReactNode } from "react";
import s from "./draft-note.module.css";

/** Page-top banner marking the whole document as finished-but-unpublished. */
export function DraftBanner({ children }: { children: ReactNode }) {
  return (
    <aside className={s.banner} role="note" aria-label="草稿說明">
      <p className={s.bannerTitle}>完稿待審 —— 尚未生效，待兩位創辦人過目後發布</p>
      {children}
    </aside>
  );
}

/** Inline marker for a sentence the drafter would not decide alone. */
export function FounderCall() {
  return <span className={s.lawyer}>待創辦人裁示</span>;
}
