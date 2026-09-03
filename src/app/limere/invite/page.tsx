import type { Metadata } from "next";
import { InviteHandoff } from "./InviteHandoff";

export const metadata: Metadata = {
  title: { absolute: "Limere 活動邀請" },
  description: "透過 Limere 活動邀請碼開啟活動詳情。",
  alternates: { canonical: "/limere/invite" },
  robots: { index: false, follow: false },
};

export default function LimereInvitePage() {
  return <InviteHandoff />;
}
