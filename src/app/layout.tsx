import React, { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CalmProvider } from "@/components/CalmContext";
import { Backdrop } from "@/components/Backdrop";
import { SceneLoader } from "@/components/SceneLoader";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: {
    default: "සැළලිහිණි සංදේශය · Salalihini Sandeshaya",
    template: "%s · Salalihini Sandeshaya"
  },
  description:
    "Read all 111 verses of the fifteenth-century Sinhala classic Salalihini Sandeshaya (The Starling's Message) with explanations in Sinhala and English, as a starling flies from Kotte to Kelaniya.",
  openGraph: {
    title: "සැළලිහිණි සංදේශය · Salalihini Sandeshaya",
    description:
      "Read all 111 verses of the fifteenth-century Sinhala classic Salalihini Sandeshaya (The Starling's Message) with explanations in Sinhala and English, as a starling flies from Kotte to Kelaniya.",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#03091e"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400..700;1,400..700&family=Geist:wght@400..700&family=Noto+Sans+Sinhala:wght@400..700&family=Noto+Serif+Sinhala:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#031026]"
        >
          Skip to content
        </a>
        <CalmProvider>
          <Suspense fallback={null}>
            <Backdrop />
            <SceneLoader />
            <LoadingScreen />
            <Header />
          </Suspense>
          <main id="main">{children}</main>
        </CalmProvider>
      </body>
    </html>
  );
}
