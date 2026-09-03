// 中文版服務條款 v2 —— 完稿，待兩位創辦人過目。NOT PUBLISHED, NOT MERGED.
//
// Ticket: [Feat] 隱私權條款繁中 v2 (Notion 3c9dae10-8b25-81ec-afc0-d18546b2d25b).
// Companion to /zh/legal/privacy — read that file's header comment first; it
// carries the shared context (the 2026-09-03 removal of the lawyer gate, the
// per-sentence re-verification against sw-app origin/main, and the version
// numbering).
//
// Draft-of-record: sw-app docs/legal/terms-zh-tw-v2-draft.md (2026-08-23.v2).
// Section order follows it so counsel can diff page against draft. Departures,
// all checked against origin/main (34f5ad1):
//
//   1. §6 — the 48-hour report-review commitment is kept from the published v1
//      page. It is a real public commitment (store/app-store-metadata.md and
//      docs/app-review-notes.md both state it), so dropping it while porting
//      would quietly retract a promise. NOTE: this number is unrelated to the
//      48-hour retention window in the privacy policy; they only look alike.
//   2. §7 — discloses the automatic restriction that the draft omits: repeated
//      reports from distinct reporters restrict the account's discovery surface
//      (R96, report_auto_restriction.sql). Automated action against a user
//      belongs in the terms they agree to. The threshold and window are stated
//      qualitatively, not numerically — per the 2026-09-03 founder brief, the
//      public document must not freeze an internal parameter.
//   3. §8 — adds the host rule (R161): an account cannot be deleted while it
//      still has an activity it created that has not ended. Server-enforced.
//      The 30-day recovery window is described as 「合理期間」 to match the
//      privacy policy's retention posture.
//   4. §6 — blocking is stated as permanent, matching the in-app confirm copy
//      and the absence of any unblock entry point. See the privacy page §6 note.
//
// FOUNDER RULING, 2026-09-03 (Ryvn): §13 governing language — Traditional
// Chinese governs during the Taiwan launch; where the versions differ before the
// EN page is updated, the Chinese text wins. Same sentence as privacy §11, per
// the instruction that both pages must answer alike. Draft banner and marker
// removed, version v2 / effective 2026-09-03 stamped, draft-note.* deleted.
import type { Metadata } from "next";
import Link from "next/link";
import { AppleNav, ArticleMeta, Footer, Page, Section, apple } from "@/components/apple/kit";

export const metadata: Metadata = {
  title: "服務條款",
  description: "使用 Limere 與 Reserve 網站的服務條款。",
};

export default function TermsZhPage() {
  return (
    <Page>
      <AppleNav />

      <Section center>
        <h1 className={apple.hero}>服務條款</h1>
        <p className={apple.sub}>使用 Limere 與 Reserve 網站所適用的條款。</p>
        <ArticleMeta>版本：v2　·　生效日期：2026 年 9 月 3 日</ArticleMeta>
      </Section>

      <Section>
        <div className={apple.article} lang="zh-Hant">
          <p>
            <Link href="/legal/terms">English version →</Link>
          </p>

          <h2>1. 接受條款</h2>
          <p>
            本服務條款（以下稱「本條款」）規範你對 Limere（以下稱「App」）與 rsrvlabs.com
            網站（合稱「本服務」）的使用。本服務由 AI-native 工作室 Reserve（以下稱
            「Reserve」、「我們」）營運。
          </p>
          <p>
            你在登入或建立帳號之前，可以開啟本條款與
            <Link href="/zh/legal/privacy">隱私權政策</Link>閱讀。
            當你完成登入、建立帳號，或繼續使用 Limere，
            即表示你接受當時有效的本條款與隱私權政策。
            <strong>登入按鈕是唯一的主要動作，App 不另設第二個「同意」勾選框、開關或確認彈窗。</strong>
            若你不同意，請不要登入或使用本服務。
          </p>
          <p>
            Limere 目前僅在台灣推出，而且是仍在持續開發的早期產品：
            功能會變動、有些地方會壞掉，本文件也會隨著產品與公司的成熟而修訂。
          </p>

          <h2>2. 年齡與使用資格</h2>
          <p>
            Limere 僅供年滿 18 歲者使用。你必須提供真實資料，不得冒用他人身分，
            也不得替他人建立帳號。若我們合理認為某個帳號屬於未成年人，
            或違反適用法律，可以限制或終止其服務。
          </p>

          <h2>3. 帳號責任</h2>
          <p>
            你應妥善保管登入資訊，並對帳號下的操作負責。
            若你懷疑帳號遭到未授權使用，請立即聯絡{" "}
            <a href="mailto:hello@rsrvlabs.com">hello@rsrvlabs.com</a>。
            不得出售、出租或轉讓帳號，也不得利用自動化手段大量建立帳號。
          </p>

          <h2>4. 服務內容與限制</h2>
          <p>
            Limere 協助你在真實的活動或場所中，發現曾經與你擦肩而過的人，
            查看依隱私設定可見的個人資料，並在符合產品關係規則時互動。
          </p>
          <p>
            藍牙、定位、網路、作業系統的背景限制，或對方自己的設定，都可能影響結果。
            <strong>我們不保證你一定找得到某個特定對象、一定會配對，或一定會建立關係。</strong>
            這一點值得說得更直白：Limere 呈現的是你曾與誰擦肩而過，
            接下來會發生什麼，是你與對方之間的事。
          </p>

          <h2>5. 使用者內容</h2>
          <p>
            你保有個人檔案、照片、訊息與其他內容的權利。
            你授權 Reserve 在提供、保護及改善 Limere 所必需的範圍內，
            儲存、處理、顯示與傳送這些內容 —— 例如把你的個人檔案顯示給與你擦肩而過的人，
            或把訊息送達你指定的對象。我們不會販售你的內容。
          </p>
          <p>
            你要為自己張貼與傳送的內容負責。不得上傳你無權使用、違法、
            侵害他人權利，或未經當事人同意入鏡的內容。
          </p>

          <h2>6. 安全與禁止行為</h2>
          <p>
            Limere 存在的目的是幫助人們在現實中見面。把它用在相反的用途是不被允許的。你同意不會：
          </p>
          <ul>
            <li>騷擾、威脅、跟蹤、仇恨攻擊或虐待他人。</li>
            <li>冒充他人，或不實陳述自己的年齡、身分或意圖。</li>
            <li>詐騙、勒索，或利用 Limere 索取金錢、販售商品或服務。</li>
            <li>散布私密影像，或未經他人同意把他人的照片、訊息或身分帶出 App 公開散布。</li>
            <li>規避封鎖或檢舉機制。</li>
            <li>爬取、逆向工程、攻擊或干擾本服務及其背後的系統。</li>
            <li>在當地法律禁止你使用這類服務時使用本服務，或在我們已因安全違規將你停權後繼續使用。</li>
          </ul>
          <p>
            實際見面時請選擇公開場所、告訴信任的人你要去哪裡，並自行判斷風險。
            <strong>我們不會對使用者做背景調查</strong>，
            除了他們自己選擇告訴我們的之外，我們無法查證任何人的身分或意圖。
            請相信你自己的判斷勝過相信這個 App。
          </p>
          <p>
            我們自己看不到的部分，仰賴使用者的檢舉。如果有人讓你感到不舒服，
            請直接在 App 內封鎖並檢舉他。
            <strong>封鎖是永久的</strong>：封鎖之後雙方無法再傳訊息、
            現有的配對立即解除，而且你之後無法在 Limere 內解除封鎖此人。
          </p>
          <p>
            <strong>我們會在 48 小時內審視每一則檢舉。</strong>
            檢舉成立時我們會移除該內容；對於重複或嚴重違規的帳號，我們會停權或終止。
            我們是一個小團隊，與其承諾一個聽起來漂亮卻守不住的即時處理，
            不如承諾一個真的做得到的時限。
          </p>

          <h2>7. 檢舉、限制與終止</h2>
          <p>
            我們可以依檢舉證據、服務安全與違規的嚴重程度，移除內容、限制功能、
            暫停或終止帳號。處置不保證即時，也不代表對任何人做出法律上的判斷。
          </p>
          <p>
            <strong>有一項限制是自動的，我們寧可先講：</strong>
            如果同一個帳號在一段期間內被多位不同的使用者檢舉，
            系統會自動限制該帳號在探索與附近功能中的曝光。
            這項自動限制可以在人工審視後解除。
          </p>
          <p>
            為了保護檢舉者並維持案件的完整性，安全與稽核資料可能依
            <Link href="/zh/legal/privacy">隱私權政策</Link>保留，
            且不因被檢舉者刪除帳號而消失。
          </p>

          <h2>8. 你自行停止使用與刪除帳號</h2>
          <p>
            你隨時可以停止使用，或直接在 App 內刪除帳號。
            刪除之後，帳號立即停用，其他使用者也看不到你；
            其餘資料我們會在合理期間內清除，
            但依<Link href="/zh/legal/privacy">隱私權政策</Link>
            必須繼續保存的部分除外。
          </p>
          <p>
            <strong>如果你正在主持一場還沒結束的活動（包含還沒開始的），
            你必須先結束或離開那場活動，才能刪除帳號。</strong>
            這是為了避免活動突然沒有主持人，讓參加的人卡在沒有人能結束的活動裡。
            只是參加別人的活動不受影響。
          </p>
          <p>
            已經送達對方的訊息，可能以「已刪除的使用者」的形式保留；
            檢舉與必要的安全證據也可能依法或依正當的安全目的保留。
            細節以<Link href="/zh/legal/privacy">隱私權政策</Link>為準。
          </p>

          <h2>9. 服務變更與可用性</h2>
          <p>
            Limere 是持續開發中的 MVP。我們可以修改、暫停或終止部分功能，
            並會對重大的政策變更提供合理通知。
            本服務按現況提供；在法律允許的範圍內，我們不保證服務不中斷、
            完全沒有錯誤，或符合特定個人的期待。
          </p>

          <h2>10. 責任限制</h2>
          <p>
            在適用法律允許的範圍內，Reserve 不對間接、偶發或衍生的損害負責，
            也不為其他使用者在線上或線下的行為背書。
            本條不排除依法不得限制的責任或消費者權利。
          </p>

          <h2>11. 條款變更與版本</h2>
          <p>
            版本號、生效日與變更摘要會公布於本頁，舊版本保存在可以公開讀取的歷史版本位置。
            重大變更生效後，你繼續登入或使用，表示接受更新後的條款。
            若變更依法需要其他形式的同意，我們會依法律要求處理。
          </p>

          <h2>12. 準據法與聯絡方式</h2>
          <p>
            本條款以中華民國（臺灣）法律為準據法，
            但不影響依法不得排除的消費者權利。
            問題或申訴請寄到{" "}
            <a href="mailto:hello@rsrvlabs.com">hello@rsrvlabs.com</a>。
          </p>

          <h2>13. 語言版本</h2>
          <p>
            本頁是繁體中文版。
            <Link href="/legal/terms">英文版</Link>目前仍停在 2026 年 8 月 7 日那一版，
            尚未同步到本版本。
          </p>
          <p>
            <strong>
              台灣推出期間，本條款以繁體中文版為準；英文版更新前，
              兩版歧異以中文版為準。
            </strong>
          </p>

          <Link className={apple.backLink} href="/zh/legal/privacy">
            隱私權政策 &rsaquo;
          </Link>
        </div>
      </Section>

      <Footer />
    </Page>
  );
}
