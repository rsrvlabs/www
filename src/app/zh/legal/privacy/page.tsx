// 中文版隱私權政策 v2 —— DRAFT, NOT PUBLISHED, NOT MERGED.
//
// Ticket: [Feat] 隱私權條款繁中 v2 — Analytics 與 Crashlytics 的資料搜集要白紙黑字
// (Notion 3c9dae10-8b25-81ec-afc0-d18546b2d25b).
//
// WHAT THIS PAGE IS
// -----------------
// The site's published policy is the 2026-08-07 v1 text, written before Firebase
// existed. sw-app already carries the drafts-of-record for the replacement:
//   sw-app docs/legal/privacy-zh-tw-v3-draft.md  (version 2026-08-24.v3)
//   sw-app docs/legal/terms-zh-tw-v2-draft.md    (version 2026-08-23.v2)
// and its docs/legal/README.md names the publish step as "Ryvn 將核准文字發布至
// /zh/legal/terms、/zh/legal/privacy". This page IS that step, prepared for
// review. It follows the v3 draft's section order deliberately, so counsel can
// diff page against draft section by section; the prose is the site's plainer
// register, and no section adds or drops a disclosure relative to v3 except
// where noted below.
//
// NOTE ON VERSION NUMBERING: the ticket says "繁中 v2" (the site's page is on its
// second version); the drafts-of-record say v3 (privacy) and v2 (terms). Same
// document, two counters. Whoever publishes should stamp the REGISTRY version,
// not the ticket's.
//
// WHERE THIS PAGE DEPARTS FROM THE v3 DRAFT, AND WHY
// --------------------------------------------------
// Every disclosure here must point at a real code behaviour. Four places where
// the v3 draft did not, checked against origin/main (34f5ad1):
//
//   1. §2 — v3 lists "性傾向" as a collected profile field. THE APP HAS NO SUCH
//      FIELD. A sweep of lib/models/profile_fields.dart, profile_options.dart and
//      the profile migrations finds no orientation, gender, or interested-in
//      column anywhere. The special-category-adjacent fields Limere actually
//      collects are ethnicity / religion / politics / cannabis. §2 now lists what
//      exists; the sexual-orientation question survives in the lawyer note, where
//      it belongs (the Grindr theory is about App membership itself, not a field).
//   2. §7 — v3 says "「曾經」相遇記錄：rolling 48 小時" but says nothing about
//      profile-view footprints. Added as §7 per Tony 2026-08-27, folding in the
//      in-app 「瀏覽足跡怎麼運作」 sheet that is being removed.
//   3. Expiring photos — v3 says they "依原期限失效". Also disclosed here: opening
//      is what starts the 10s window, and SCREENSHOTS OF THEM ARE RECORDED
//      (expiring_photo_screenshot_events). An undisclosed collection is exactly
//      the kind of gap this ticket exists to close.
//   4. Blocking — v1 told users that unblocking restores the match. It does not:
//      the confirm copy says 「封鎖是永久的…你之後無法在 Limere 內解除封鎖此人」
//      and there is NO unblock call site under lib/screens or lib/ui. (Service
//      methods survive as unreachable legacy; server-side restore is operator
//      territory, not a user right.) Corrected here.
//
// STILL OPEN — deliberately not publishable as-is:
//   * version + effective date blank, by instruction; filled at publish time
//   * §4 carries an A/B choice (R152 opt-out vs R171 use-implies-consent). The
//     drafter did not choose. Choosing B means editing sw-app app-review-notes.md
//     in the same change — see the note in that block.
//   * every <LawyerFlag /> marks a legal position this draft refuses to invent
//   * the EN page is still v1 — see §14
// Before publishing: delete src/components/legal/draft-note.{tsx,module.css} and
// every DraftBanner / LawyerFlag / OpenChoice usage on this page and on terms.
//
// WARNING to anyone diffing against sw-app locally: a stale working tree may hold
// the pre-Firebase app-review-notes.md, whose Data section still claims "No
// third-party analytics or advertising SDKs" — the opposite of today. Read it
// from origin/main.
//
// TODO(legal-review): not reviewed by a Taiwanese lawyer.
import type { Metadata } from "next";
import Link from "next/link";
import { AppleNav, ArticleMeta, Footer, Page, Section, apple } from "@/components/apple/kit";
import { DraftBanner, LawyerFlag, OpenChoice } from "@/components/legal/draft-note";

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
              這份文件是草稿。它還沒有生效、還沒有經過台灣律師審閱，也還不是 rsrvlabs.com
              目前對外的隱私權政策 —— 目前對外的仍是 2026 年 8 月 7 日那一版。
              上方的版本與生效日期刻意留白，由發布的人在發布當下填入。
            </p>
            <p>
              對照用：本頁逐節對應 sw-app 的 <code>docs/legal/privacy-zh-tw-v3-draft.md</code>
              （版本 <code>2026-08-24.v3</code>）。四處與該草稿不同的地方寫在本檔頂端的註解裡，
              每一處都附了程式碼上的理由。
            </p>
            <p>
              標著「律師必看」的段落，是起草時刻意沒有自行決定的法律問題。
              藍色方框裡的 A、B 兩案請創辦人與律師擇一，並把沒有選中的那一案整段刪掉。
            </p>
          </DraftBanner>

          <p>
            <Link href="/legal/privacy">English version →</Link>
          </p>

          <h2>1. 適用範圍與接受方式</h2>
          <p>
            本政策說明 AI-native 工作室 Reserve（以下稱「Reserve」、「我們」）如何透過
            Limere（以下稱「App」）與 rsrvlabs.com 網站（合稱「本服務」）蒐集、處理、利用、
            保存與分享資料。Limere 目前僅在台灣推出。
          </p>
          <p>
            你在登入或建立帳號之前，可以點擊按鈕旁的連結先讀完本政策與
            <Link href="/zh/legal/terms">服務條款</Link>。當你完成登入、建立帳號，
            或繼續使用 Limere，即表示你接受當時有效的這兩份文件。
            <strong>App 不另設第二個同意勾選框、開關或確認彈窗。</strong>
          </p>
          <p>
            <LawyerFlag />
            <em>
              給創辦人與律師：這種「登入即接受」的形式是否有效，特別是它能否涵蓋第 2 節末段所列的
              敏感欄位，尚未確認。R152 拍板時已經把這一題留給台灣律師，本頁不代為決定。
            </em>
          </p>

          <h2>2. 我們處理的資料類別</h2>
          <p>
            <strong>帳號與安全資料。</strong>電子郵件、驗證與登入狀態、帳號識別碼，
            以及安全與稽核紀錄。
          </p>
          <p>
            <strong>年齡與個人檔案。</strong>註冊時我們請你填出生日期以確認你年滿 18 歲，
            但只保存其中的<strong>年份</strong>。個人檔案包含顯示名稱、照片、一句話介紹，
            以及以下全部為選填的欄位：身高、學歷、職業、語言、抽菸、喝酒、大麻、運動習慣、
            交往意圖、有無小孩、生養規劃、星座、信仰、政治傾向、國家、族裔、興趣。
            你可以把任何一個留白。
          </p>
          <p>
            <strong>社交與內容資料。</strong>配對、封鎖、檢舉、活動成員關係、聊天文字、
            一般照片與限時照片，以及限時照片的截圖事件（見第 8 節）。
          </p>
          <p>
            <strong>相遇與在場資料。</strong>短效的臨時識別碼、概略的藍牙遠近、
            活動與場地的關聯，以及「未知」、「在現場」、「已離開」這三種在場狀態。
            細節見第 3 節。
          </p>
          <p>
            <strong>產品使用分析。</strong>Firebase Analytics 的封閉事件名稱、成功或失敗的結果、
            布林值與分桶後的數量。細節見第 4 節。
          </p>
          <p>
            <strong>當機診斷。</strong>Firebase Crashlytics 的 Release 版本嚴重當機堆疊、
            例外類型、App 版本與建置編號，以及 Crashlytics 與 Firebase 的安裝識別碼。
            不包含原始例外文字，也不包含帳號識別。細節見第 4 節。
          </p>
          <p>
            <strong>裝置與權限狀態。</strong>Firebase app-instance ID、
            推播 token（在你啟用推播後）、作業系統與 App 版本，以及各項權限的授予結果。
          </p>

          <h3>其中可能屬於敏感類別的欄位</h3>
          <p>
            <LawyerFlag />
            上列選填欄位裡，<strong>族裔、信仰、政治傾向、大麻</strong>
            這四項在部分法域屬於受特別保護的類別。我們蒐集它們的目的只有一個：
            讓你在配對與活動裡遇到談得來的人。它們不會被提供給廣告商，
            不會用於廣告或跨 App 追蹤，也不會出現在第 4 節所述的分析事件裡。
            你可以全部留白，留白的欄位別人不會看到，你也不會看到別人的同一欄。
          </p>
          <p>
            <em>
              給創辦人與律師，這一段需要你們回答三題，本頁刻意沒有自己選答案：
            </em>
          </p>
          <ul>
            <li>
              <em>
                （一）看板上「性傾向＝特種個資」那張卡的前提要更正：
                <strong>Limere 目前沒有性傾向欄位，也沒有性別或「想認識的性別」欄位</strong>
                （已對 origin/main 全庫掃過）。真正落在敏感類別的是上面那四項。
                卡上的結論請依這個事實重新確認。
              </em>
            </li>
            <li>
              <em>
                （二）真正的性傾向風險不在欄位，而在挪威資保機關 2021 年裁罰 Grindr 的那條推論：
                「揭露某人是某個交友 App 的使用者」本身就指向性傾向。
                這條推論在台灣個資法下是否成立，決定本節要不要往外擴寫到
                「你是 Limere 使用者」這件事本身。
              </em>
            </li>
            <li>
              <em>
                （三）族裔與信仰目前是<strong>第一次填入就同時對外揭露</strong>；
                只有大麻與政治傾向預設不揭露，要另外手動打開。
                如果四項都該用同一種較嚴格的處理，這是程式要改，不是文字改得掉的。
              </em>
            </li>
          </ul>

          <h2>3. 相遇、藍牙與位置</h2>
          <p>
            Limere 的核心功能，是呈現真的與你擦肩而過的人。當你參加中的活動有效時，
            你的手機和另一位 Limere 使用者的手機可以自動辨識出彼此就在附近。
            這件事只發生在雙方都裝了 App、都在同一場有效活動裡的情況，
            對沒有使用 Limere 的人完全不作用。
          </p>
          <p>
            <strong>藍牙廣播裡沒有你。</strong>你的手機廣播出去的內容，
            只有一個固定的服務識別碼 —— 那個識別碼在每一支 Limere 上都一模一樣，
            本身不能用來指認你。真正代表你的是一組每 15 分鐘就更換一次的臨時識別碼，
            而且那組識別碼與你的對應關係<strong>只有我們的伺服器解得開</strong>，
            連你自己的 App 也讀不到那張對照表。所以在 App 之外的人看來，
            它不是一個可以拿來持續追蹤你的固定編號。
          </p>
          <p>
            <strong>位置只用來判斷在不在現場。</strong>
            <strong>App 送到伺服器的只有「未知」、「在現場」、「已離開」這三種狀態</strong>，
            不記錄你的路線，也不記錄連續座標 —— 這也是 App 內那句
            「只判斷活動場地，不記錄路線」的實際意思。
            你也可以另外為某一場活動開啟離場提醒，此時 iOS 只會在背景監看那一場活動的
            單一圓形場地範圍。沒有綁定場地的活動不會啟動任何位置監測。
          </p>
          <p>
            一個例外要講明白：<strong>如果你是活動的發起人</strong>，
            你建立綁定場地的活動時所選的場地座標與範圍，會存在該活動的資料裡，
            因為那是判斷所有參加者在不在現場的依據。這是活動的資料，不是對你個人的位置追蹤。
          </p>

          <h2>4. 產品分析與當機診斷</h2>
          <p>
            先講三件對整節都成立的事：
            <strong>我們沒有廣告，沒有再行銷，也沒有跨 App 追蹤</strong>。
            我們不出售個人資料，不使用 Google Signals 或廣告個人化，
            也不把這一節的任何資料用於廣告目的。
          </p>

          <h3>產品分析（Firebase Analytics）</h3>
          <p>
            我們使用 Google 的 Firebase Analytics 了解 App 的哪些部分真的被用到。
            送出的事件只使用<strong>封閉的結果與計數類別</strong> ——
            某個動作成功或失敗、某個畫面被打開過，而數量會先分桶
            （例如「零次」、「一次」、「二到五次」）再送出，避免用數字把人認出來。
            使用者層級與事件資料保存 2 個月。
          </p>

          <OpenChoice
            title="待決：第 4 節「你能不能關掉產品分析」有 A、B 兩案，請擇一"
            labelA="A 案 —— 目前程式碼的實際行為（R152）"
            optionA={
              <>
                <p>
                  你登入之後，產品分析會預設開啟。你可以隨時到「我的 → 隱私選擇」把它關掉，
                  關掉之後仍可正常使用 Limere。
                  關閉會<strong>立即停止收集，並重設這個 App 的分析資料</strong>；
                  這個選擇會被記住，之後再次登入不會把它打開。
                </p>
              </>
            }
            labelB="B 案 —— Tony 2026-08-27 的新指示（R171）"
            optionB={
              <>
                <p>
                  使用 Limere 即表示你同意我們收集本節所述的產品分析資料，
                  App 內不另外提供關閉的開關。
                </p>
                <p>
                  <LawyerFlag />
                  B 案下，使用者要「停止蒐集」的替代路徑是什麼？
                  如果答案是刪除帳號，這份政策必須把話講明白，
                  而且要由律師確認它在個資法下站得住腳 —— 第 10 節列的權利裡，
                  「停止蒐集、處理、利用」不能只剩下一封信。
                </p>
              </>
            }
            footnote={
              <p>
                A 案是目前程式碼的實際行為，也是我們送 Apple 審查時寫進說明的內容。
                <strong>
                  若選 B 案，同一次改動必須一併修掉 sw-app docs/app-review-notes.md
                  Data 段的「Users may turn analytics off in Privacy choices」那一句，
                  移除隱私選擇頁，並重新檢查 App Store 的隱私標籤
                </strong>
                ，否則送審說明會與實物不符。起草者不替你們選。
              </p>
            }
          />

          <h3>當機診斷（Firebase Crashlytics）</h3>
          <p>
            對外發行的 Release 版本預設會把嚴重當機的診斷資料送到 Firebase Crashlytics，
            內容是例外的型別、堆疊，以及 App 的版本與建置編號。
            <strong>例外訊息裡的自由文字，在離開你的裝置之前就會被替換掉</strong>，
            只留下型別本身用來分組。我們也不會為 Crashlytics 設定任何使用者識別碼或自訂鍵值。
            Google 保存這些資料 90 天，之後開始刪除。開發與測試用的版本不送這些資料。
          </p>
          <p>
            當產品分析是開啟的狀態時，當機報告可能會一併附上前述那些封閉、
            不含識別碼的分析事件，作為當機前的操作軌跡。
          </p>
          <p>
            兩者都<strong>禁止</strong>上傳帳號識別碼、身分（Persona）識別碼、對象識別碼、
            臨時識別碼、姓名、電子郵件、個人檔案欄位值、聊天文字、檢舉文字、照片、精確位置、
            訊號強度、原始錯誤字串，或任何其他自由文字。
            如果日後實作要加入新的內容，必須先更新程式裡的允許清單、App Store 揭露與本政策。
          </p>

          <h3>留在你裝置上的診斷</h3>
          <p>
            App 也會使用 Apple 的 MetricKit 取得效能資料。
            <strong>這份資料留在你的裝置上，不會上傳給我們。</strong>
          </p>
          <p>本網站不使用分析或廣告 cookie。</p>

          <h2>5. 接收者、處理者與跨境傳輸</h2>
          <p>
            我們只在提供服務所需的範圍內使用受約束的處理者：
            Supabase（帳號、資料庫、即時連線與檔案儲存）、
            Google Firebase（產品分析與當機診斷）、
            Apple（iOS 發布、系統權限與必要的平台服務）。
          </p>
          <p>
            這些服務可能在台灣以外處理資料（包含美國或其基礎設施所在地），構成跨境傳輸。
            我們以服務條款、存取控制、傳輸加密、最小權限與供應商的安全措施降低風險。
            我們不出售個人資料。
          </p>

          <h2>6. 誰可以看見資料</h2>
          <p>
            你的名字、照片與一句話介紹，會被與你擦肩而過或配對的人看到。
            其餘欄位遵循一條簡單的規則：
            <strong>你自己填了某個欄位，才解鎖看見別人的同一個欄位</strong>。
            如果你把某個欄位留白，你也不會在別人的檔案上看到它。
            這條規則是在伺服器上執行的，不是只把畫面藏起來。
          </p>
          <p>對話只有對話中的兩個人看得到。</p>
          <p>
            <strong>封鎖是永久的。</strong>封鎖之後，對方不會出現在你的附近名單、
            雙方都無法再傳訊息，現有的互相喜歡與配對會立即解除，
            而且<strong>你之後無法在 Limere 內解除封鎖此人</strong>。
            如果你檢舉某人，我們會看到這則檢舉，對方不會被告知是誰提出的。
          </p>
          <p>
            <em>
              給創辦人：上一版政策寫著「如果你解除封鎖一位先前配對過的人，該配對與紀錄會恢復」——
              這句話對使用者是錯的。App 的封鎖確認頁明白寫著封鎖無法復原，
              而 lib/screens 與 lib/ui 底下沒有任何解除封鎖的入口。
              （伺服器端仍留有復原能力，但那是營運手段，不是使用者的權利，
              所以不寫進政策。）本頁已依實作更正。
            </em>
          </p>
          <p>
            供應商僅依服務需要處理資料，不會取得超出其目的的產品權限。
            檢舉信與管理資料只供授權管理者判案。
          </p>

          <h2>7. 瀏覽紀錄怎麼運作</h2>
          <p>
            <strong>瀏覽是雙向的。</strong>你看得到誰打開過你的檔案，
            對方也看得到你打開過他的 —— 這是一個對等的交換，沒有單向的例外，
            也沒有可以只看不被看見的付費選項。
          </p>
          <p>只有以下情況會留下一筆足跡，其餘都不會：</p>
          <ul>
            <li>足跡只在有人<strong>打開你的完整檔案</strong>時產生。在名單或格狀清單裡看到你，不算。</li>
            <li>看自己的檔案不算。</li>
            <li>互相封鎖的人之間，看了也不會出現。</li>
            <li>同一個人在很短的時間內（約 30 秒內）重複打開，只算一次。</li>
          </ul>
          <p>
            <strong>足跡只保留 48 小時。</strong>48 小時之後，
            這些紀錄會被實際刪除，不只是不再顯示給你看。
            我們沒有替任何人保存一份可以往回翻的完整瀏覽歷史。
            「曾經」擦肩而過的紀錄同樣保留 48 小時。
          </p>
          <p>
            <strong>你在「誰看過我」裡看到的內容，一樣受第 6 節的欄位規則限制</strong> ——
            你只會看到你自己也填過的欄位。
          </p>
          <p>
            <strong>以幽靈身分進場的活動，不留瀏覽足跡。</strong>
            進入一場活動時，你要選擇這一次要公開現身還是幽靈進場。選了幽靈，
            你在那一場活動期間瀏覽別人的檔案不會留下足跡，你也不會出現在活動名單或附近。
          </p>
          <p>
            幽靈是<strong>進場當下的一次性選擇，不是一個可以隨時開關的模式</strong>。
            用 App 內的說法就是「每次進場都重新選」：進場之後不能改，
            想換就得離開活動、重新進場。有兩個邊界要講清楚 ——
            你自己發起的活動不能以幽靈身分出現，因為參加的人需要看得到是誰揪的；
            以及幽靈送出喜歡時，只有收到的那個人會看到你這次進場選的身分，其他人仍然看不到你。
          </p>
          <p>
            幽靈只在你身處一場進行中的活動時才存在。不在任何活動裡的時候，
            一般的瀏覽都會留下足跡。
          </p>

          <h2>8. 保存期限與刪除</h2>
          <p>
            在你的帳號存續期間，我們會保存你的帳號與檔案資訊，以便提供本服務。
            以下幾項有明確的期限：
          </p>
          <ul>
            <li>
              <strong>「誰看過我」的瀏覽足跡、「曾經」相遇紀錄：</strong>48 小時，之後刪除。
            </li>
            <li>
              <strong>Firebase Analytics：</strong>使用者層級與事件資料保存 2 個月。
            </li>
            <li>
              <strong>Firebase Crashlytics：</strong>由 Google 保存 90 天後開始刪除。
            </li>
            <li>
              <strong>帳號與檔案：</strong>帳號有效期間；提出刪除後見第 9 節。
            </li>
            <li>
              <strong>檢舉、限制與必要證據：</strong>依安全、申訴、法律義務與可稽核的需求保存，
              不因被檢舉的人刪除帳號而消失。
            </li>
          </ul>
          <p>
            <strong>聊天中的限時照片。</strong>以這種方式傳送的照片只能開啟一次。
            <strong>10 秒的倒數是從照片真的顯示在螢幕上那一刻開始算</strong>，
            不是從你按下去那一刻 —— 所以一次沒載成功的點擊不會白白用掉它。
            時間到了之後就無法再開啟，我們也會刪除該檔案。
            誠實說明一件事：這個清理是在後續操作時才觸發的，
            所以底層檔案有可能晚一點才真正消失，但在那之前任何人都已經無法透過 App 取得它。
          </p>
          <p>
            <strong>我們無法阻止對方在到期前留存副本，例如截圖。</strong>
            但如果對方對一張限時照片截圖，
            <strong>我們會記錄這件事</strong>，讓被截圖的人知道。
          </p>
          <p>
            一般訊息保存到你收回為止（收回會永久清除文字內容），或直到帳號被刪除。
            備份或供應商系統可能需要合理時間完成輪替刪除，
            我們不會用備份把已經刪掉的東西恢復成一般可見。
          </p>

          <h2>9. 刪除你的帳號</h2>
          <p>
            你隨時可以在 App 中移除個別照片，
            <strong>也可以直接在 App 內刪除整個帳號</strong> —— 入口在「我」頁，
            並且會要求你先輸入確認字。
          </p>
          <p>
            <strong>刪除當下就會發生的事：</strong>你的帳號立即停用，
            所有已登入的工作階段與憑證全部撤銷，你無法再用這個帳號登入，
            也不會再出現在其他人的 App 裡。
            你的推播裝置紀錄與短效臨時識別碼會立刻永久刪除；
            你在聊天室裡留下的訊息會就地切斷與你的關聯，
            對方可能仍看得到內容，但只會顯示為來自一個已刪除的使用者。
          </p>
          <p>
            <strong>接下來的 30 天：</strong>其餘資料還沒有被清除，
            我們保留一個 30 天的復原窗口。第 31 天起，依資料生命週期清除，
            包含照片與聊天媒體檔案（作為檢舉證據鎖定的除外）。
          </p>
          <p>
            <LawyerFlag />
            <em>
              給創辦人與律師：這個 30 天窗口在程式裡是真的
              （R72，delete_own_account 寫下 recoverable_until ＝ 刪除時間 ＋ 30 天），
              但它<strong>只有營運人員能執行復原，使用者沒有自助路徑</strong>，
              而且復原不會救回聊天身分、主持過的活動或成員關係。
              所以這一段要嘛寫明「怎麼申請、能救回什麼、救不回什麼」，
              要嘛寫明它只是內部的補救餘裕 —— 不能像現在這樣停在「保留 30 天」讓人自己想像。
              兩者擇一，本頁沒有代選。
            </em>
          </p>
          <p>
            <strong>一個你會先撞到的限制：</strong>
            如果你建立的活動還沒結束（包含還沒開始的），
            你必須先結束或離開那場活動，才能刪除帳號。
            這是為了避免一場活動突然沒有主持人，讓參加的人卡在沒有人能結束的活動裡。
            只是參加別人的活動不受影響。
          </p>
          <p>
            關於你的資料的任何要求，請寄到{" "}
            <a href="mailto:hello@rsrvlabs.com">hello@rsrvlabs.com</a>，我們會在 30 天內回覆。
          </p>

          <h2>10. 你的權利與選擇</h2>
          <p>
            你可以要求
            <strong>查詢、閱覽、製給複本、更正、補充、刪除、停止蒐集、處理或利用</strong>
            你的個人資料。請寄到{" "}
            <a href="mailto:hello@rsrvlabs.com">hello@rsrvlabs.com</a>；
            我們可能在回應之前以合理方式驗證你的身分。
            法令允許的例外（例如安全證據或法律義務）我們會明確說明。
          </p>
          <p>
            你也可以直接在 App 內：調整每個欄位要不要揭露、選擇以幽靈身分進入某場活動、
            退出活動、封鎖或檢舉任何人，以及刪除帳號。
            {/* 產品分析的開關取決於第 4 節 A/B 案的結果，故此處只指過去，避免兩處說法打架。 */}
            產品分析是否可以自行關閉，見第 4 節。
          </p>

          <h2>11. 未成年人</h2>
          <p>
            Limere 僅供年滿 18 歲者使用。註冊時我們會請你填出生日期以確認這一點。
            若我們得知某個帳號屬於未滿 18 歲者，將限制服務並依適用程序處理其資料。
          </p>

          <h2>12. 版本與變更</h2>
          <p>
            本頁會顯示版本號、生效日與變更摘要，舊版本保存在可以公開讀取的歷史版本位置。
            重大變更我們會以合理方式通知。
            若法律要求其他形式的同意，我們會採取該形式，而不是只依賴你繼續登入。
          </p>

          <h2>13. 聯絡方式</h2>
          <p>
            資料權利、隱私或申訴，請寄到{" "}
            <a href="mailto:hello@rsrvlabs.com">hello@rsrvlabs.com</a>。
          </p>

          <h2>14. 語言版本</h2>
          <p>
            本頁是繁體中文版。
            <Link href="/legal/privacy">英文版</Link>目前仍停在 2026 年 8 月 7 日那一版，
            尚未同步到這一版<strong>（en 待同步）</strong>。
          </p>
          <p>
            <LawyerFlag />
            <em>
              給創辦人與律師：舊版寫著「若中文版與英文版有歧異，以英文版為準」。
              這一版新增的第 3、4、5、7、9 節在英文版裡還不存在，
              所以那句話如果原封不動留著，等於宣告以一份揭露較少的文本為準，
              對使用者與對主管機關都說不通。目前 Limere 僅在台灣推出，使用者讀的是中文版。
              請擇一：（A）先把英文版同步到同一版本，再維持英文優先；
              （B）台灣推出期間改以中文版為準。
              這份草稿沒有替你們選，所以本節目前刻意沒有寫出任何一句「以某某版本為準」。
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
