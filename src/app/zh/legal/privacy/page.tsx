// 中文版隱私權政策 v2 —— 完稿，待兩位創辦人過目。NOT PUBLISHED, NOT MERGED.
//
// Ticket: [Feat] 隱私權條款繁中 v2 (Notion 3c9dae10-8b25-81ec-afc0-d18546b2d25b).
//
// DRAFTING BRIEF (founders, 2026-09-03) — this rewrite follows it, not the
// earlier one:
//   「法律條款可以寫模糊 主旨是不要傷到我們可以利用用戶資訊的權利 當然要讓審查過…
//     對外文書 要記不違法 但在此範圍下不要把自己綁死…不要一直強調技術…
//     說故事的對象是使用者…我們的深層是要盈利」
// Ryvn also removed the lawyer gate the same day (「隱私條款我們自己寫就好 實務上
// 先不找律師」), so the flow is: we write it → both founders read it → publish.
//
// FIVE RULES THIS PAGE IS WRITTEN UNDER
// -------------------------------------
//   1. BROAD, NOT BINDING. Purposes are enumerated widely and lawfully
//      (operate + improve, build new features, personalise and recommend,
//      safety and anti-abuse, research and analytics incl. de-identified and
//      aggregated use, marketing and commercial use, legal obligations).
//      Retention is 「為達成目的所必要之期間」, never a number. Deletion is
//      「合理期間內處理」. Concrete internal intervals (48h / 7d / 30d / 2mo /
//      90d) are IMPLEMENTATION and are deliberately NOT in this document —
//      writing them here would freeze them.
//   2. NO TECHNOLOGY LESSONS. No BLE, no rotating-identifier explainer, no
//      architecture. The mechanism is an asset; it does not belong in a public
//      legal document. Data categories are named in the user's language.
//   3. APP REVIEW IS A HARD REQUIREMENT. Apple needs: the categories collected,
//      what they are used for, the third-party processors by name, a contact
//      address, and the age rating. All present — all in broad language.
//   4. THE ONE RED LINE: NOTHING FALSE. Broad is fine; false is not. So this
//      page makes NO falsifiable promise of the 「不保存任何位置歷史」 shape. Note
//      the fix is not a more precise version of that promise — it is not making
//      the promise at all. Statements of what we DO are checked against the
//      product; statements of what we MAY do are permissions, and are drawn
//      wide on purpose.
//   5. Plain zh-TW, readable. But this is a commercial document, not a
//      confessional.
//
// WHY 「不保存任何位置歷史」 CAN NEVER APPEAR HERE (紅隊 2026-09-03, brain
// reviews/2026-09-03-redteam-privacy-round-1): the time-based purge covers four
// tables and neither sessions nor session_members is one of them, so venue
// coordinates × membership × arrival state persist. Any sentence of that shape
// is falsifiable from the schema. This page therefore describes location
// processing in purpose terms and commits to no absolute.
//
// FACTUAL CHECKS BEHIND THE FEW CONCRETE CLAIMS THAT REMAIN (sw-app origin/main
// f919eae9c2336314e837cbc181a0e556fa884c18, 2026-09-03):
//   * Processor list is exactly Supabase / Google Firebase (Analytics +
//     Crashlytics) / Apple. NO Sentry — R156 replaced it and
//     tool/crashlytics_release_readiness.py:120-126 fails the release if the
//     word returns. No ads, attribution or third-party analytics SDK exists.
//   * There is no in-app analytics switch: me_screen.dart:567-568 —「隱私選擇」與
//     整頁依 R187 移除 (ledger R171, Tony 2026-08-27). So the page does not offer
//     one. app-review-notes.md already matches.
//   * Blocking is permanent with no in-app undo (app_en.arb blkActConfirmBody);
//     the v1 page's 「解除封鎖會恢復配對」 was false and stays corrected.
//   * Signup stores the birth YEAR only (onboarding_screen.dart:276-291;
//     20260708000007_profile_fields.sql:7). 18+ per store/app-store-metadata.md:
//     125,128.
//   * The four self-report fields that read as sensitive are hidden until the
//     user discloses them (profile_fields.dart:152-158, :206-221, :222-228;
//     20260708000006_profile_visibility.sql:9,15) — stated here as a user
//     choice, not as a guarantee about defaults.
//
// STILL OPEN — two <FounderCall /> markers:
//   * §3 — the marketing / commercial-use language versus the App Store privacy
//     declaration, which currently says there is no advertising, remarketing or
//     cross-app tracking. Scoped to first-party + de-identified use so the two
//     do not contradict. Widening it further means changing the App Store
//     answers in the same move.
//   * §11 — which language version governs.
//
// Before publishing: fill version + effective date, then delete
// src/components/legal/draft-note.{tsx,module.css} and every DraftBanner /
// FounderCall usage on this page and on terms.
//
// NOTE ON STAKES: the app's login screen links to THIS page —
// auth_screen.dart:24-25 are rsrvlabs.com/zh/legal/{terms,privacy}, not the EN
// ones. Merging changes the text every new user consents to at signup.
import type { Metadata } from "next";
import Link from "next/link";
import { AppleNav, ArticleMeta, Footer, Page, Section, apple } from "@/components/apple/kit";
import { DraftBanner, FounderCall } from "@/components/legal/draft-note";

export const metadata: Metadata = {
  title: "隱私權政策",
  description: "Reserve 如何在 Limere 與本網站收集、使用與保護你的資訊。",
};

export default function PrivacyZhPage() {
  return (
    <Page>
      <AppleNav />

      <Section center>
        <h1 className={apple.hero}>隱私權政策</h1>
        <p className={apple.sub}>
          Reserve 如何在 Limere 與本網站收集、使用與保護你的資訊。
        </p>
        {/* Version + effective date stay blank until publish (ticket instruction). */}
        <ArticleMeta>版本：＿＿＿＿＿＿　·　生效日期：＿＿＿＿＿＿</ArticleMeta>
      </Section>

      <Section>
        <div className={apple.article} lang="zh-Hant">
          <DraftBanner>
            <p>
              這份文件已經寫完，但還沒有生效，也還不是 rsrvlabs.com 目前對外的隱私權政策
              —— 目前對外的仍是 2026 年 8 月 7 日那一版。
              上方的版本與生效日期刻意留白，由發布的人在發布當下填入。
            </p>
            <p>
              兩個標著「待創辦人裁示」的地方，是起草時不願意自己決定的句子。
              請兩位過目後告訴我要怎麼寫，或直接改掉。
            </p>
          </DraftBanner>

          <p>
            <Link href="/legal/privacy">English version →</Link>
          </p>

          <h2>1. 這份政策適用於誰，以及你怎麼同意</h2>
          <p>
            本政策說明 AI-native 工作室 Reserve（以下稱「Reserve」、「我們」）如何透過
            Limere（以下稱「App」）與 rsrvlabs.com 網站（合稱「本服務」）
            蒐集、處理、利用、保存與分享你的資料。Limere 目前在台灣推出。
          </p>
          <p>
            你在登入或建立帳號之前，可以先點開本政策與
            <Link href="/zh/legal/terms">服務條款</Link>讀完。
            當你完成登入、建立帳號，或繼續使用本服務，
            即表示你接受當時有效的這兩份文件。
            <strong>App 不另設第二個同意勾選框或確認彈窗。</strong>
            如果你不接受，請不要登入。
          </p>

          <h2>2. 我們蒐集哪些資料</h2>
          <p>為了讓 Limere 運作、變得更好，並保護使用它的人，我們會蒐集以下幾類資料。</p>
          <ul>
            <li>
              <strong>你的帳號資料。</strong>電子郵件、登入與驗證狀態，
              以及我們用來辨識你的帳號代號。
            </li>
            <li>
              <strong>你的年齡。</strong>註冊時我們會請你填出生日期，
              用來確認你年滿 18 歲；我們保存的是出生年份。
            </li>
            <li>
              <strong>你的個人檔案與照片。</strong>顯示名稱、大頭照、一句話介紹，
              以及你自己選填的各種欄位。你也可以在同一個帳號下建立不只一個身分，
              每個身分有自己的名字、照片與內容。
            </li>
            <li>
              <strong>你參加的活動。</strong>你建立或參加了哪些活動、
              活動的時間與地點，以及你在活動中的參與狀態。
            </li>
            <li>
              <strong>你與其他使用者的互動紀錄。</strong>
              你在現場遇到了誰、喜歡與配對、聊天內容、
              封鎖與檢舉，以及與這些內容有關的操作事件。
            </li>
            <li>
              <strong>位置資訊。</strong>當你建立有地點的活動、確認你人在活動現場，
              或使用與地點有關的功能時，我們會處理你的位置資訊。
            </li>
            <li>
              <strong>裝置與使用資訊。</strong>你使用的裝置與作業系統、App 版本、
              推播所需的裝置識別、權限的授予狀況，
              以及你在 App 裡做了哪些操作、哪些畫面被打開、什麼時候發生錯誤或當機。
            </li>
          </ul>
          <p>
            你自己選填的欄位中，有一些在某些法域可能被視為較敏感的類別。
            <strong>填不填、要不要讓別人看到，都是你自己決定的</strong>；
            你可以全部留白。
          </p>

          <h2>3. 我們拿這些資料做什麼</h2>
          <p>我們在下列目的範圍內蒐集、處理與利用你的資料：</p>
          <ul>
            <li>建立與維護你的帳號，提供本服務的各項功能。</li>
            <li>維持服務的穩定與品質，找出問題、修復錯誤與當機。</li>
            <li>了解本服務被使用的情形，據以改善現有功能並開發新功能與新服務。</li>
            <li>依你的資料與使用情形，為你個人化內容、推薦與配對結果。</li>
            <li>維護安全：驗證身分與年齡、處理檢舉、防止詐騙、騷擾、濫用與其他違規行為。</li>
            <li>
              進行研究、統計與商業分析。
              <strong>我們可能以去識別化或彙整的方式使用資料</strong>；
              這類無法識別特定個人的資料，我們得為任何合法目的使用，不受本政策限制。
            </li>
            <li>
              <FounderCall />
              向你傳達與本服務有關的通知、產品資訊與行銷內容，
              並為我們自己的產品與服務進行推廣與商業利用。
            </li>
            <li>遵循法律規定，或依主管機關、司法機關的要求處理。</li>
          </ul>
          <p>
            我們<strong>不會出售你的個人資料</strong>。
          </p>

          <h2>4. 我們與誰分享</h2>
          <p>
            我們會在提供本服務所必要的範圍內，將資料交由受我們委託、
            並受契約與安全要求拘束的服務提供者處理：
          </p>
          <ul>
            <li><strong>Supabase</strong> —— 帳號、資料庫與檔案儲存。</li>
            <li>
              <strong>Google Firebase</strong> ——
              產品使用分析（Firebase Analytics）與當機診斷（Firebase Crashlytics）。
            </li>
            <li><strong>Apple</strong> —— App 發布、推播與必要的平台服務。</li>
          </ul>
          <p>
            這些服務可能在台灣以外的地方處理資料（包含美國或其基礎設施所在地），
            構成跨境傳輸。我們會以契約、存取控制、傳輸加密與最小權限等方式降低風險。
          </p>
          <p>
            此外，在下列情形我們也可能揭露或移轉資料：
            依法令或政府機關要求；為保護本服務、使用者或第三人的權利、財產與安全；
            以及在<strong>合併、收購、重組、投資或資產移轉</strong>等交易發生時，
            將資料一併移轉給受讓人，並由其在本政策的範圍內繼續處理。
          </p>

          <h2>5. 誰在 App 裡看得到你的資料</h2>
          <p>
            你的名字、照片與一句話介紹，會被與你擦肩而過或配對的人看到。
            其餘欄位遵循一條簡單的規則：
            <strong>你自己填了某個欄位，才解鎖看見別人的同一個欄位</strong>；
            你留白的欄位，你也不會在別人的檔案上看到。
            對話只有對話中的兩個人看得到。
          </p>
          <p>
            進入一場活動時，你可以選擇這一次要公開現身，還是以幽靈身分進場。
            這是進場當下的選擇。
          </p>
          <p>
            <strong>封鎖是永久的。</strong>封鎖之後，對方不會出現在你的附近名單、
            雙方無法再傳訊息，現有的配對會解除，
            而且<strong>你之後無法在 Limere 內解除封鎖此人</strong>。
            如果你檢舉某人，我們會看到這則檢舉，對方不會被告知是誰提出的。
          </p>

          <h2>6. 我們保存多久</h2>
          <p>
            我們在<strong>達成本政策所述目的所必要的期間內</strong>保存你的資料，
            並依資料的性質、風險與我們的營運需要，設定不同的保存與清理方式。
            部分內容（例如你在服務中留下的短期互動紀錄）會在較短的期間內清除，
            這些期間可能隨產品調整。
          </p>
          <p>
            由第三方服務提供者處理的資料（例如使用分析與當機診斷），
            依其各自的政策保存一段期間後刪除。
          </p>
          <p>
            <strong>安全相關的資料會保存得比較久。</strong>
            檢舉、限制與必要的證據，會依安全、申訴、稽核與法律義務的需要保存，
            <strong>不會因為被檢舉的人刪除帳號而消失</strong>。
          </p>
          <p>
            另外要說明的是：已經送達對方的訊息，可能以「已刪除的使用者」的形式留在對話中；
            備份或服務提供者的系統也可能需要合理時間才完成輪替刪除。
          </p>

          <h2>7. 刪除帳號與你的權利</h2>
          <p>
            你隨時可以在 App 中移除個別照片，
            <strong>也可以直接在 App 內刪除整個帳號</strong> —— 入口在「我」頁。
            刪除之後，你的帳號會立即停用、無法再登入，
            也不會再出現在其他使用者的 App 裡。
            我們會在<strong>合理期間內</strong>刪除其餘資料，
            但依本政策第 6 節必須繼續保存的部分除外。
          </p>
          <p>
            如果你是誤刪，請儘快寄信到{" "}
            <a href="mailto:hello@rsrvlabs.com">hello@rsrvlabs.com</a>，
            我們會視資料是否仍存在協助你處理。
          </p>
          <p>
            <strong>一個你會先撞到的限制：</strong>
            如果你建立的活動還沒結束（包含還沒開始的），
            你必須先結束或離開那場活動，才能刪除帳號 ——
            這是為了避免一場活動突然沒有主持人。
            只是參加別人的活動不受影響。
          </p>
          <p>
            依個人資料保護法，你可以就你的個人資料向我們請求
            <strong>查詢或請求閱覽、請求製給複製本、請求補充或更正、
            請求停止蒐集、處理或利用、請求刪除</strong>。
            請寄到 <a href="mailto:hello@rsrvlabs.com">hello@rsrvlabs.com</a>，
            我們會在合理期間內回覆；
            我們可能在回應之前以合理方式驗證你的身分。
            依法令規定或為維護服務安全所必要而不能配合的部分，我們會向你說明。
          </p>
          <p>
            你也可以直接在 App 內調整每個欄位要不要揭露、選擇以幽靈身分進入活動、
            退出活動、封鎖或檢舉任何人，以及刪除帳號。
            使用本服務即表示同意本政策所述的資料蒐集，
            <strong>App 內沒有另外的關閉開關</strong>。
          </p>

          <h2>8. 我們怎麼保護資料</h2>
          <p>
            我們以傳輸加密、資料庫層級的存取控制、私有的媒體儲存空間、
            最小權限與稽核紀錄等方式保護資料。
            沒有任何方法能保證絕對安全；若發生依法需要通知的事件，我們會依規定處理。
          </p>

          <h2>9. 未成年人</h2>
          <p>
            Limere 僅供年滿 18 歲者使用，App Store 的分級也是 18+。
            我們不會在知情的情況下蒐集未滿 18 歲者的個人資料。
            若我們得知某個帳號屬於未滿 18 歲者，將關閉該帳號並依適用程序處理其資料。
            如果你認為未成年人向我們提供了資料，請聯絡{" "}
            <a href="mailto:hello@rsrvlabs.com">hello@rsrvlabs.com</a>。
          </p>

          <h2>10. 本政策的變更</h2>
          <p>
            本頁會顯示版本號與生效日期，舊版本保存在可以公開讀取的位置。
            我們可能因應產品、法令或營運需要修訂本政策；
            重大變更會以合理方式通知，並自公告的生效日起適用。
            變更生效後你繼續使用本服務，即表示接受修訂後的內容。
          </p>

          <h2>11. 聯絡方式與語言版本</h2>
          <p>
            資料權利、隱私或申訴，請寄到{" "}
            <a href="mailto:hello@rsrvlabs.com">hello@rsrvlabs.com</a>。
            我們是一個小團隊，信會有人讀。
          </p>
          <p>
            本頁是繁體中文版，也是 App 登入畫面連過來的版本。
            <Link href="/legal/privacy">英文版</Link>目前仍停在
            2026 年 8 月 7 日那一版，尚未同步<strong>（en 待同步）</strong>。
          </p>
          <p>
            <FounderCall />
            <em>
              給兩位：舊版寫著「若中文版與英文版有歧異，以英文版為準」。
              這一版的內容在英文版裡還不存在，
              原封不動留著那句話，等於宣告以一份較舊的文本為準。
              我的建議是<strong>台灣推出期間以中文版為準</strong>
              （Limere 在台灣推出，App 連過來的也是這一頁），英文版之後再補齊。
              要照這個寫，我就把那句加進來；要維持英文優先，
              就得先把英文版同步完再發布。
            </em>
          </p>

          <Link className={apple.backLink} href="/zh/legal/terms">
            服務條款 &rsaquo;
          </Link>
        </div>
      </Section>

      <Footer />
    </Page>
  );
}
