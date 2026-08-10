// 中文版支援頁 — App Store Connect 支援網址的中文對應(Ryvn 2026-08-10
// 拍板「都需要」:中英各一)。內容與 /support 逐題對齊,答案同樣以 app 實況
// 為準(空狀態文案、•••選單、刪除帳號現況);兩頁互連。EN 頁改動時同步本頁。
import type { Metadata } from "next";
import Link from "next/link";
import { AppleNav, Footer, Page, Section, apple } from "@/components/apple/kit";

export const metadata: Metadata = {
  title: "支援",
  description: "Limere 常見問題與聯絡方式。",
};

export default function SupportZhPage() {
  return (
    <Page>
      <AppleNav />

      <Section center>
        <h1 className={apple.hero}>支援</h1>
        <p className={apple.sub}>Limere 使用上的協助。</p>
      </Section>

      <Section>
        <div className={apple.article} lang="zh-Hant">
          <p>
            <Link href="/support">English version →</Link>
          </p>

          <h2>常見問題</h2>

          <h3>Limere 是什麼?</h3>
          <p>
            Limere 幫你重新連上那些真的和你擦肩而過的人 —— 在你去的活動和場地。
            它不是拿來滑陌生人的:你只會看到真的和你出現在同一個地方的人,
            接下來想跟誰說話,由你決定。
          </p>

          <h3>為什麼「附近」看不到人?</h3>
          <p>
            附近頁空著,通常只代表你身邊現在沒有其他人開著 Limere ——
            在活動之外這是正常的。到「活動」分頁加入一場活動:
            同一場活動裡開著 Limere 的人,會在你們擦肩而過時陸續出現。
          </p>

          <h3>配對和訊息怎麼運作?</h3>
          <p>
            按讚本身不會開啟對話。只有你們互相按讚、把擦肩變成配對之後,
            才能傳訊息。沒有你回讚的人,無法傳訊息給你。
          </p>

          <h3>如何檢舉或封鎖某人?</h3>
          <p>
            打開對方的檔案,或你們的對話,點右上角的 ••• 選單,
            即可選擇「檢舉這個人」或「封鎖這個人」。
          </p>

          <h3>如何刪除帳號?</h3>
          <p>
            目前 app 內還不能自助刪除帳號。請寄信到 hello@rsrvlabs.com,
            主旨寫「刪除我的帳號」,我們會在 30 天內刪除你的帳號與個人資料。
          </p>

          <h2>聯絡我們</h2>
          <p>
            找不到你要的答案?來信{" "}
            <a href="mailto:hello@rsrvlabs.com">hello@rsrvlabs.com</a>
            ,我們會盡快回覆。
          </p>
          <p>
            另請參閱<Link href="/legal/terms">服務條款</Link>與
            <Link href="/legal/privacy">隱私權政策</Link>(英文)。
          </p>
        </div>
      </Section>

      <Footer />
    </Page>
  );
}
