import type { ThemeId } from "@/data/types";

export interface Theme {
  id: ThemeId;
  top: string;
  mid: string;
  bottom: string;
  accent: string;
  particleA: string;
  particleB: string;
  petal: 0 | 1;
  drift: number;
  sway: number;
  density: number;
  sun: [number, number, number, number];
  sunColor: string;
  moon: [number, number, number, number];
  stars: number;
  ground: string;
}

export const THEMES: Record<ThemeId, Theme> = {
  dawn: {
    id: "dawn",
    top: "#030b26",
    mid: "#0b3b75",
    bottom: "#00c8ff",
    accent: "#38e8ff",
    particleA: "#72f5ff",
    particleB: "#a5b4fc",
    petal: 1,
    drift: -0.12,
    sway: 0.9,
    density: 0.8,
    sun: [0.1, -0.35, 0.34, 0.95],
    sunColor: "#60efff",
    moon: [0, 0, 0, 0],
    stars: 0.35,
    ground: "#03091c"
  },
  court: {
    id: "court",
    top: "#050d2e",
    mid: "#173785",
    bottom: "#2ec4ff",
    accent: "#4cc9f0",
    particleA: "#72efdd",
    particleB: "#60a5fa",
    petal: 0,
    drift: 0.18,
    sway: 0.5,
    density: 1,
    sun: [-0.35, -0.2, 0.3, 0.8],
    sunColor: "#56cfe1",
    moon: [0, 0, 0, 0],
    stars: 0.25,
    ground: "#040a24"
  },
  dusk: {
    id: "dusk",
    top: "#040824",
    mid: "#1e2a78",
    bottom: "#3b82f6",
    accent: "#60a5fa",
    particleA: "#7dd3fc",
    particleB: "#c084fc",
    petal: 0,
    drift: 0.1,
    sway: 0.7,
    density: 0.85,
    sun: [0.35, -0.5, 0.28, 0.8],
    sunColor: "#38bdf8",
    moon: [-0.55, 0.55, 0.06, 0.5],
    stars: 0.5,
    ground: "#03071e"
  },
  night: {
    id: "night",
    top: "#010414",
    mid: "#06163d",
    bottom: "#0e3b7c",
    accent: "#38e8ff",
    particleA: "#90e0ef",
    particleB: "#64dfdf",
    petal: 0,
    drift: 0.05,
    sway: 0.4,
    density: 0.95,
    sun: [0, 0, 0, 0],
    sunColor: "#000000",
    moon: [0.45, 0.5, 0.11, 1],
    stars: 1,
    ground: "#01030f"
  },
  morning: {
    id: "morning",
    top: "#06183d",
    mid: "#005f99",
    bottom: "#48cae4",
    accent: "#72efdd",
    particleA: "#caf0f8",
    particleB: "#64dfdf",
    petal: 0,
    drift: 0.14,
    sway: 0.6,
    density: 0.8,
    sun: [0.3, -0.4, 0.42, 1],
    sunColor: "#90e0ef",
    moon: [0, 0, 0, 0],
    stars: 0.2,
    ground: "#041028"
  },
  road: {
    id: "road",
    top: "#041c3c",
    mid: "#0077b6",
    bottom: "#64dfdf",
    accent: "#56cfe1",
    particleA: "#e0fbfc",
    particleB: "#72efdd",
    petal: 1,
    drift: -0.05,
    sway: 1.2,
    density: 0.75,
    sun: [-0.45, 0.5, 0.16, 0.85],
    sunColor: "#ade8f4",
    moon: [0, 0, 0, 0],
    stars: 0.15,
    ground: "#03152c"
  },
  river: {
    id: "river",
    top: "#02162e",
    mid: "#006d8f",
    bottom: "#00f5d4",
    accent: "#00f5d4",
    particleA: "#9bf6ff",
    particleB: "#72efdd",
    petal: 0,
    drift: 0.08,
    sway: 1,
    density: 0.9,
    sun: [0.5, 0.3, 0.2, 0.65],
    sunColor: "#80ffdb",
    moon: [0, 0, 0, 0],
    stars: 0.2,
    ground: "#021022"
  },
  sunset: {
    id: "sunset",
    top: "#050a30",
    mid: "#233dff",
    bottom: "#00d4ff",
    accent: "#38e8ff",
    particleA: "#80ffdb",
    particleB: "#a5b4fc",
    petal: 0,
    drift: 0.06,
    sway: 0.8,
    density: 0.9,
    sun: [0, -0.62, 0.38, 1],
    sunColor: "#00e5ff",
    moon: [-0.6, 0.55, 0.05, 0.45],
    stars: 0.4,
    ground: "#030720"
  },
  lamplight: {
    id: "lamplight",
    top: "#030926",
    mid: "#0e296b",
    bottom: "#00b4d8",
    accent: "#48cae4",
    particleA: "#90e0ef",
    particleB: "#64dfdf",
    petal: 0,
    drift: 0.2,
    sway: 0.6,
    density: 1,
    sun: [0, 0, 0, 0],
    sunColor: "#000000",
    moon: [0.5, 0.55, 0.09, 0.95],
    stars: 0.8,
    ground: "#02061b"
  },
  sacred: {
    id: "sacred",
    top: "#041136",
    mid: "#11468f",
    bottom: "#38e8ff",
    accent: "#64dfdf",
    particleA: "#90e0ef",
    particleB: "#72efdd",
    petal: 1,
    drift: -0.08,
    sway: 0.8,
    density: 0.9,
    sun: [0, -0.1, 0.45, 0.65],
    sunColor: "#72efdd",
    moon: [0, 0, 0, 0],
    stars: 0.3,
    ground: "#030b24"
  },
  devale: {
    id: "devale",
    top: "#06092e",
    mid: "#2b2d8a",
    bottom: "#4cc9f0",
    accent: "#72efdd",
    particleA: "#80ffdb",
    particleB: "#a5b4fc",
    petal: 1,
    drift: -0.1,
    sway: 1.3,
    density: 1,
    sun: [0, 0, 0, 0],
    sunColor: "#000000",
    moon: [0.5, 0.5, 0.07, 0.7],
    stars: 0.55,
    ground: "#040620"
  },
  divine: {
    id: "divine",
    top: "#020824",
    mid: "#09358a",
    bottom: "#00e5ff",
    accent: "#38e8ff",
    particleA: "#9bf6ff",
    particleB: "#64dfdf",
    petal: 0,
    drift: 0.15,
    sway: 0.5,
    density: 1,
    sun: [0, -0.1, 0.5, 0.45],
    sunColor: "#38e8ff",
    moon: [0, 0, 0, 0],
    stars: 1,
    ground: "#010518"
  },
  moonlit: {
    id: "moonlit",
    top: "#030924",
    mid: "#12347a",
    bottom: "#56cfe1",
    accent: "#90e0ef",
    particleA: "#caf0f8",
    particleB: "#72efdd",
    petal: 0,
    drift: 0.1,
    sway: 0.7,
    density: 0.95,
    sun: [0, 0, 0, 0],
    sunColor: "#000000",
    moon: [-0.35, 0.45, 0.14, 1],
    stars: 0.95,
    ground: "#02061a"
  }
};

export function nightOf(theme: Theme): number {
  const v = theme.stars * 1.1 - theme.sun[3] * 0.6;
  return Math.max(0, Math.min(1, v));
}
