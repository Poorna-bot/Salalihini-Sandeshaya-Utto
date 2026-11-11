export type ThemeId =
  | "dawn"
  | "court"
  | "dusk"
  | "night"
  | "morning"
  | "road"
  | "river"
  | "sunset"
  | "lamplight"
  | "sacred"
  | "devale"
  | "divine"
  | "moonlit";

export type Silhouette =
  | "none"
  | "city"
  | "stupa"
  | "kovil"
  | "mountain"
  | "palms"
  | "temple";

export interface RawVerse {
  n: number;
  lines: string[];
}

export interface Meaning {
  n: number;
  si: string;
  en: string;
  note?: string;
}

export interface Section {
  id: string;
  from: number;
  to: number;
  si: string;
  en: string;
  theme: ThemeId;
  silhouette: Silhouette;
  descSi: string;
  descEn: string;
}

export interface Verse extends RawVerse {
  si: string;
  en: string;
  note?: string;
  approximate: boolean;
  section: Section;
}
