"use client";

import React from "react";
import Link from "next/link";
import { SECTIONS, TOTAL_VERSES } from "@/data";
import { THEMES } from "@/lib/themes";
import { BirdMark } from "./Icons";

export function JourneyRail({ currentVerse }: { currentVerse: number }) {
  const activeSection =
    SECTIONS.find((s) => currentVerse >= s.from && currentVerse <= s.to) ?? SECTIONS[0];
  const pct = ((currentVerse - 1) / (TOTAL_VERSES - 1)) * 100;

  return (
    <aside
      aria-label="Poem journey progress"
      className="fixed bottom-3 inset-x-0 z-30 flex justify-center px-3 sm:px-6 pointer-events-none"
    >
      <div className="glass pointer-events-auto w-full max-w-4xl rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3">
        <div className="flex items-center justify-between text-xs text-ink-soft mb-2 gap-2">
          <div className="flex items-center gap-2 truncate">
            <span lang="si" className="font-sinhala text-ink font-medium">
              {activeSection.si}
            </span>
            <span className="text-ink-faint">·</span>
            <span className="truncate">{activeSection.en}</span>
          </div>
          <span className="font-mono text-xs text-gold shrink-0">
            {String(currentVerse).padStart(2, "0")} / {TOTAL_VERSES}
          </span>
        </div>

        <div className="relative pt-2 pb-1">
          {/* Tiny gliding starling mark */}
          <div
            aria-hidden="true"
            className="absolute -top-1.5 -translate-x-1/2 text-gold transition-all duration-500 pointer-events-none"
            style={{ left: `${pct}%` }}
          >
            <BirdMark className="w-4 h-4" />
          </div>

          <div className="flex items-center gap-1">
            {SECTIONS.map((sec) => {
              const span = sec.to - sec.from + 1;
              const passed = currentVerse >= sec.from;
              const isCurrent = currentVerse >= sec.from && currentVerse <= sec.to;
              const accent = THEMES[sec.theme]?.accent ?? "#f2c46d";
              const href = sec.from === 1 ? "/" : `/verse/${sec.from}`;

              return (
                <Link
                  key={sec.id}
                  href={href}
                  style={{
                    flexGrow: span,
                    backgroundColor: passed ? accent : "rgba(255,255,255,0.14)",
                    opacity: isCurrent ? 1 : passed ? 0.65 : 0.35
                  }}
                  aria-label={`${sec.en} (${sec.si}) — Verse ${sec.from}`}
                  title={`${sec.si} · ${sec.en} (Verse ${sec.from})`}
                  className="h-2 rounded-full transition-all hover:opacity-100 focus-visible:outline-2 focus-visible:outline-gold"
                />
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
