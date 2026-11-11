"use client";

import React from "react";
import { useJourney } from "@/lib/useJourney";
import { THEMES } from "@/lib/themes";

export function Backdrop() {
  const { themeId } = useJourney();
  const theme = THEMES[themeId] ?? THEMES.dawn;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-20 pointer-events-none transition-colors duration-1000"
      style={{
        background: `linear-gradient(180deg, ${theme.top} 0%, ${theme.mid} 54%, ${theme.bottom} 100%)`
      }}
    />
  );
}
