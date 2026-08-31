"use client";

import { useEffect, useState } from "react";
import styles from "./invite.module.css";

const TESTFLIGHT_URL = "https://testflight.apple.com/join/UuC5Yk26";
const INVITE_CODE_PATTERN = /^[0-9A-HJ-NP-Z]{6}$/;

type InviteState =
  | { status: "loading" }
  | { status: "valid"; code: string }
  | { status: "invalid" };

export function inviteCodeFromHash(hash: string): string | null {
  const encoded = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!encoded) return null;

  try {
    const code = decodeURIComponent(encoded).trim().toUpperCase();
    return INVITE_CODE_PATTERN.test(code) ? code : null;
  } catch {
    return null;
  }
}

export function InviteHandoff() {
  const [invite, setInvite] = useState<InviteState>({ status: "loading" });

  useEffect(() => {
    const readInvite = () => {
      const code = inviteCodeFromHash(window.location.hash);
      setInvite(code ? { status: "valid", code } : { status: "invalid" });
    };

    readInvite();
    window.addEventListener("hashchange", readInvite);
    return () => window.removeEventListener("hashchange", readInvite);
  }, []);

  const code = invite.status === "valid" ? invite.code : "------";
  const deepLink = invite.status === "valid" ? `limere://session/${invite.code}` : null;

  return (
    <main className={styles.page} lang="zh-Hant">
      <div className={styles.ambient} aria-hidden="true" />

      <section className={styles.shell} aria-labelledby="invite-title">
        <header className={styles.brand} aria-label="Limere">
          <span className={styles.wordmark}>Limere</span>
          <span className={styles.brandNote}>meet in real life</span>
        </header>

        <div className={styles.inviteCard}>
          <p className={styles.eyebrow}>Activity invite</p>
          <h1 id="invite-title">一起去這場活動</h1>
          <p className={styles.intro}>
            已安裝 Limere 就直接開啟；還沒有的話，先下載 Beta，安裝後再回到這一頁。
          </p>

          <div className={styles.codeBlock} aria-live="polite" data-testid="invite-code">
            <span>活動邀請碼</span>
            <strong>{code}</strong>
          </div>

          {invite.status === "invalid" ? (
            <p className={styles.error} role="alert">
              這個邀請連結不完整。請回到原本的 QR Code 再掃一次。
            </p>
          ) : null}

          <div className={styles.actions}>
            {deepLink ? (
              <a className={styles.openButton} href={deepLink} data-testid="open-limere">
                開啟 Limere
                <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <button className={styles.openButton} type="button" disabled>
                開啟 Limere
                <span aria-hidden="true">↗</span>
              </button>
            )}

            <a className={styles.downloadButton} href={TESTFLIGHT_URL} data-testid="download-limere">
              下載 Limere Beta
            </a>
          </div>

          <p className={styles.assurance}>
            開啟後會先看到活動詳情，不會自動替你報名或加入。
          </p>
        </div>

        <p className={styles.returnHint}>
          <span aria-hidden="true">01</span>
          TestFlight 安裝完成後，回到這個網頁按一次「開啟 Limere」。
        </p>
      </section>
    </main>
  );
}
