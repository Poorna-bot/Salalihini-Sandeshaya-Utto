"use client";

import { usePathname } from "next/navigation";
import { getVerse, SECTIONS, TOTAL_VERSES } from "@/data";
import type { Silhouette, ThemeId } from "@/data/types";

export interface JourneyState {
  verseNumber: number | null;
  themeId: ThemeId;
  silhouette: Silhouette;
  progress: number;
  isVersePage: boolean;
  isMapPage: boolean;
}

export function useJourney(): JourneyState {
  const pathname = usePathname() || "/";

  if (pathname === "/map") {
    return {
      verseNumber: null,
      themeId: "road",
      silhouette: "none",
      progress: 0.5,
      isVersePage: false,
      isMapPage: true
    };
  }

  if (pathname === "/journey") {
    return {
      verseNumber: null,
      themeId: "dusk",
      silhouette: "city",
      progress: 0.25,
      isVersePage: false,
      isMapPage: false
    };
  }

  if (pathname === "/about") {
    return {
      verseNumber: null,
      themeId: "moonlit",
      silhouette: "stupa",
      progress: 0.85,
      isVersePage: false,
      isMapPage: false
    };
  }

  if (pathname === "/developer") {
    return {
      verseNumber: null,
      themeId: "morning",
      silhouette: "palms",
      progress: 0.4,
      isVersePage: false,
      isMapPage: false
    };
  }

  let verseNumber = 1;
  if (pathname.startsWith("/verse/")) {
    const raw = pathname.slice("/verse/".length).split("/")[0];
    const parsed = Number(raw);
    if (Number.isInteger(parsed) && parsed >= 1 && parsed <= TOTAL_VERSES) {
      verseNumber = parsed;
    }
  }

  const verse = getVerse(verseNumber) ?? getVerse(1)!;
  const section = verse.section ?? SECTIONS[0];

  return {
    verseNumber,
    themeId: section.theme,
    silhouette: section.silhouette,
    progress: (verseNumber - 1) / (TOTAL_VERSES - 1),
    isVersePage: pathname === "/" || pathname.startsWith("/verse/"),
    isMapPage: false
  };
}
