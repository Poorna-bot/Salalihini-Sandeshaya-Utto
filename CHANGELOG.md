# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Community review of verses currently marked as "General sense" in `src/data/index.ts`.

## [0.1.0] - 2026-11-10

### Added

- All 111 Elu Sinhala verses of *Salalihini Sandeshaya* from [Sinhala Wikibooks](https://si.wikibooks.org/wiki/%E0%B7%83%E0%B7%90%E0%B7%85%E0%B6%BD%E0%B7%92%E0%B7%84%E0%B7%92%E0%B6%AB%E0%B7%92_%E0%B7%83%E0%B6%B1%E0%B7%8A%E0%B6%AF%E0%B7%9A%E0%B7%81%E0%B6%BA) (`src/data/poem.json`).
- Fresh plain-language modern Sinhala and English explanations and historical notes for all 111 verses (`src/data/meanings-1.ts` to `src/data/meanings-4.ts`), plus `APPROXIMATE` badge indicators for dense verses.
- Persistent procedural 3D valley, smooth dithered sky across 13 section themes, water shader with shallow shore fade, and faceted low-poly starling overlay (`SceneRoot`, `BirdOverlay`, `kit.ts`, `models.ts`, `myna.ts`).
- Full-screen 3D route map at `/map` (`MapExperience`, `geo.ts`) with 11 landmarks from Kotte to Kelaniya, verse scrubber (1–111), and *Overview*, *Follow*, and *Free* camera modes.
- Section timeline at `/journey`, background essay and source notes at `/about`, and interactive cursor-tracking engineer character at `/developer`.
- Calm mode, "fly with the starling" auto-advance, keyboard/touch swipe navigation, and open-source governance documentation.
