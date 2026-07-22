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
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&f[]=supreme@300,400,500&display=swap"
        />
        {/* Warm the map tile CDN before the user scrolls to Places */}
        <link rel="preconnect" href="https://tiles.openfreemap.org" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="fetch"
          href="https://tiles.openfreemap.org/styles/liberty"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-night text-paper selection:bg-paper selection:text-night">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
