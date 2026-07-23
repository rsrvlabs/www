import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const TITLE = "Reserve — the AI-native studio. Our first product is the studio.";
const DESCRIPTION =
  "A studio run with one machine. A dating app with a physical signature, a finance desk that publishes itself daily, beauty tech in the making — all on an operating system we built, where agents hold jobs.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Reserve",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "AI-native company",
    "AI-native studio",
    "autonomous agents",
    "Lime dating app",
    "limerence",
    "AI finance research",
    "Reserve",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&f[]=erode@400,500,600&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#1d1d1f] selection:bg-[#0071e3] selection:text-white">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
