import poemData from "./poem.json";
import { MEANINGS_1 } from "./meanings-1";
import { MEANINGS_2 } from "./meanings-2";
import { MEANINGS_3 } from "./meanings-3";
import { MEANINGS_4 } from "./meanings-4";
import { SECTIONS } from "./sections";
import type { Meaning, RawVerse, Section, Verse } from "./types";

export * from "./types";
export { SECTIONS } from "./sections";

/**
 * Verses whose Elu phrasing uses dense multi-layered wordplay (slesha),
 * compressed mythological allusions, or disputed archaic vocabulary where
 * a short learner's explanation captures the general sense rather than every pun.
 */
export const APPROXIMATE = new Set<number>([
  5, 14, 26, 38, 42, 54, 57, 69, 79, 81, 83, 87
]);

export const TOTAL_VERSES = 111;

const RAW_VERSES = poemData as RawVerse[];
const ALL_MEANINGS: Meaning[] = [
  ...MEANINGS_1,
  ...MEANINGS_2,
  ...MEANINGS_3,
  ...MEANINGS_4
];

const meaningMap = new Map<number, Meaning>(
  ALL_MEANINGS.map((m) => [m.n, m])
);

export function getSectionForVerse(n: number): Section {
  return (
    SECTIONS.find((s) => n >= s.from && n <= s.to) ?? SECTIONS[0]
  );
}

export const ALL_VERSES: Verse[] = RAW_VERSES.map((raw) => {
  const m = meaningMap.get(raw.n);
  const section = getSectionForVerse(raw.n);
  return {
    n: raw.n,
    lines: raw.lines,
    si: m?.si ?? "",
    en: m?.en ?? "",
    note: m?.note,
    approximate: APPROXIMATE.has(raw.n),
    section
  };
});

export function getVerse(n: number): Verse | undefined {
  if (!Number.isInteger(n) || n < 1 || n > TOTAL_VERSES) return undefined;
  return ALL_VERSES[n - 1];
}

export function parseVerseNumber(raw: string | undefined | null): number | null {
  if (!raw || !/^[0-9]+$/.test(raw)) return null;
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 1 || n > TOTAL_VERSES) return null;
  return n;
}
