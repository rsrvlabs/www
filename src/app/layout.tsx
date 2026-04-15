import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";

export const metadata: Metadata = {
  title: "Reserve — A studio between software and the objects you hold.",
  description:
    "Reserve is a small studio working with companies that have outgrown being impressed by technology.",
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
          href="https://api.fontshare.com/v2/css?f[]=gambarino@400&f[]=supreme@300,400,500&display=swap"
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
      <body className="min-h-full flex flex-col bg-paper text-ink selection:bg-ink selection:text-paper">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
