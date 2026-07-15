import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";

export const metadata: Metadata = {
  title: "Reserve — the AI-native studio. The company itself is one.",
  description:
    "A studio run with one machine. A dating app with a physical signature, a finance desk that publishes itself daily, beauty tech in the making — all on an AI-native operating system, where agents hold jobs.",
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
