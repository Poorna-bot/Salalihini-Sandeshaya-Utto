"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import type { Verse } from "@/data/types";
import { TOTAL_VERSES } from "@/data";
import { useCalm, type LangMode } from "./CalmContext";
import { useLoadingState } from "@/lib/loading";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";
import { JourneyRail } from "./JourneyRail";

function hrefForVerse(n: number): string {
  return n <= 1 ? "/" : `/verse/${n}`;
}

export function VerseReader({ verse }: { verse: Verse }) {
  const router = useRouter();
  const { playing, setPlaying, langMode, setLangMode } = useCalm();
  const { loaded } = useLoadingState();
  const touchStartX = useRef<number | null>(null);

  const prevN = verse.n > 1 ? verse.n - 1 : null;
  const nextN = verse.n < TOTAL_VERSES ? verse.n + 1 : null;

  // Keyboard arrow navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft" && prevN) {
        router.push(hrefForVerse(prevN));
      } else if (e.key === "ArrowRight" && nextN) {
        router.push(hrefForVerse(nextN));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prevN, nextN, router]);

  // "Fly with the starling" auto-advance every ~14s
  useEffect(() => {
    if (!playing) return;
    if (!nextN) {
      setPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => {
      router.push(hrefForVerse(nextN));
    }, 14000);
    return () => window.clearTimeout(timer);
  }, [playing, nextN, router, setPlaying]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 56) {
      if (dx > 0 && prevN) router.push(hrefForVerse(prevN));
      if (dx < 0 && nextN) router.push(hrefForVerse(nextN));
    }
  };

  const animKey = `${verse.n}-${loaded ? "ready" : "init"}`;

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative min-h-screen flex flex-col justify-between pt-20 pb-28 px-4 sm:px-6"
    >
      <div className="mx-auto w-full max-w-3xl my-auto space-y-5">
        {/* Section header above card */}
        <motion.div
          key={`sec-${animKey}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-center space-y-1"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-line px-3.5 py-1 text-xs text-gold">
            <span lang="si" className="font-sinhala">{verse.section.si}</span>
            <span className="text-ink-faint">·</span>
            <span>{verse.section.en}</span>
          </div>
          <p className="text-xs sm:text-sm text-ink-soft max-w-xl mx-auto">
            {verse.section.descEn}
          </p>
        </motion.div>

        {/* Centred glassy verse card */}
        <div className="glass rounded-3xl p-6 sm:p-9 relative">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-5 pb-3 border-b border-line">
            <div className="flex items-center gap-2.5">
              <span className="font-display text-lg sm:text-xl text-gold">
                Verse {verse.n}
              </span>
              {verse.approximate && (
                <span
                  title="This verse contains dense Elu wordplay; the explanation gives its general sense."
                  className="inline-flex items-center gap-1 rounded-full bg-gold/15 border border-gold/40 px-2.5 py-0.5 text-[11px] text-gold"
                >
                  General sense · දළ අදහස
                </span>
              )}
            </div>

            {/* Language switch */}
            <div
              role="group"
              aria-label="Explanation language"
              className="inline-flex rounded-full bg-black/30 p-0.5 border border-line text-xs"
            >
              {(
                [
                  { id: "both", label: "Both" },
                  { id: "si", label: "සිංහල" },
                  { id: "en", label: "English" }
                ] as { id: LangMode; label: string }[]
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setLangMode(opt.id)}
                  aria-pressed={langMode === opt.id}
                  className={`rounded-full px-2.5 py-1 transition-colors focus-visible:outline-2 focus-visible:outline-gold ${
                    langMode === opt.id
                      ? "bg-gold text-[#140e28] font-medium"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Original Elu Sinhala verse lines */}
          <div
            key={`lines-${animKey}`}
            lang="si"
            className="font-elu text-xl sm:text-2xl md:text-[26px] leading-[1.95] text-ink space-y-2.5 py-2 text-center sm:text-left"
          >
            {verse.lines.map((line, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: idx * 0.11 }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {verse.approximate && (
            <p className="mt-4 text-xs text-ink-soft bg-white/5 rounded-xl px-3.5 py-2 border border-line">
              <strong className="text-gold font-medium">General sense:</strong>{" "}
              The Elu wording in this stanza packs layered metaphors or puns, so the explanations below offer the overall meaning rather than a word-for-word certainty.
            </p>
          )}

          {/* Previous / Next controls */}
          <div className="mt-6 pt-4 border-t border-line flex items-center justify-between gap-4">
            {prevN ? (
              <Link
                href={hrefForVerse(prevN)}
                aria-label={`Previous verse (Verse ${prevN})`}
                className="inline-flex items-center gap-2 rounded-full bg-white/5 hover:bg-white/15 border border-line px-4 py-2 text-xs sm:text-sm text-ink transition-colors focus-visible:outline-2 focus-visible:outline-gold"
              >
                <ChevronLeftIcon className="w-4 h-4 text-gold" />
                <span>Verse {prevN}</span>
              </Link>
            ) : (
              <span className="text-xs text-ink-faint px-2">Beginning of poem</span>
            )}

            {nextN ? (
              <Link
                href={hrefForVerse(nextN)}
                aria-label={`Next verse (Verse ${nextN})`}
                className="inline-flex items-center gap-2 rounded-full bg-gold hover:bg-gold/90 px-5 py-2 text-xs sm:text-sm font-medium text-[#140e28] transition-colors focus-visible:outline-2 focus-visible:outline-gold"
              >
                <span>Verse {nextN}</span>
                <ChevronRightIcon className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href="/journey"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2 text-xs sm:text-sm font-medium text-[#140e28]"
              >
                <span>Explore Journey</span>
                <ChevronRightIcon className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Modern Sinhala & English explanation cards */}
        <div
          className={`grid gap-4 ${
            langMode === "both" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
          }`}
        >
          {(langMode === "both" || langMode === "si") && (
            <motion.section
              key={`si-${animKey}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              aria-label="Modern Sinhala explanation"
              className="glass rounded-2xl p-5 sm:p-6 space-y-2"
            >
              <h2 className="text-xs uppercase tracking-wider text-gold font-medium">
                සරල සිංහල තේරුම · Modern Sinhala
              </h2>
              <p lang="si" className="font-sinhala text-sm sm:text-base leading-relaxed text-ink">
                {verse.si}
              </p>
            </motion.section>
          )}

          {(langMode === "both" || langMode === "en") && (
            <motion.section
              key={`en-${animKey}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.28 }}
              aria-label="English explanation"
              className="glass rounded-2xl p-5 sm:p-6 space-y-2"
            >
              <h2 className="text-xs uppercase tracking-wider text-gold font-medium">
                Plain English Explanation
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-ink">
                {verse.en}
              </p>
            </motion.section>
          )}
        </div>

        {verse.note && (
          <div className="glass rounded-2xl px-5 py-3.5 text-xs sm:text-sm text-ink-soft flex items-start gap-2.5">
            <span className="text-gold font-medium shrink-0">Context:</span>
            <span>{verse.note}</span>
          </div>
        )}
      </div>

      <JourneyRail currentVerse={verse.n} />
    </div>
  );
}
