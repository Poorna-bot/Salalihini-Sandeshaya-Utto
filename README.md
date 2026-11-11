<div align="center">

# සැළලිහිණි සංදේශය · The Starling's Message

**An interactive, bilingual companion to the fifteenth-century Sinhala messenger poem *Salalihini Sandeshaya*.**

[![Code License: MIT](https://img.shields.io/badge/Code-MIT-f2c46d.svg)](./LICENSE)
[![Content License: CC BY-SA 4.0](https://img.shields.io/badge/Content-CC%20BY--SA%204.0-9dffd8.svg)](./LICENSE-CONTENT.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-a8d8ff.svg)](./CONTRIBUTING.md)
[![Code of Conduct](https://img.shields.io/badge/Contributor%20Covenant-2.1-ffb3c7.svg)](./CODE_OF_CONDUCT.md)
[![Sponsor](https://img.shields.io/badge/Sponsor-%E2%99%A5-ea4aaa.svg)](https://github.com/sponsors/Poorna-bot)

[Read Verse 1](https://salalihini-sandeshaya.vercel.app/) · [Explore the 3D Map](https://salalihini-sandeshaya.vercel.app/map) · [The 20 Sections](https://salalihini-sandeshaya.vercel.app/journey) · [About the Poem](https://salalihini-sandeshaya.vercel.app/about) · [Correct a Verse](./CONTRIBUTING.md)

</div>

Around 1450 CE in the royal capital of [Jayawardhanapura Kotte](https://en.wikipedia.org/wiki/Kingdom_of_Kotte), the Buddhist monk-poet [Thotagamuwe Sri Rahula Thera](https://en.wikipedia.org/wiki/Thotagamuwe_Sri_Rahula_Thera) composed a prayer in 111 quatrains and entrusted it to a starling (*salalihiniya*). The bird flies from King Parakramabahu VI's palace across rivers, groves, and temples to the shrine of God Vibhishana at Kelaniya, asking him to grant a son to Princess Ulakudaya Devi. This website lets anyone read all 111 verses in the original Elu Sinhala alongside plain modern Sinhala and English explanations, set against a calm, procedural 3D world that shifts from dawn to moonlight as the story unfolds.

## Why this exists

*Salalihini Sandeshaya* is one of the best-loved works in Sinhala literature, yet its compressed fifteenth-century Elu vocabulary makes it difficult to read without a teacher or a printed *sannaya* (word-by-word gloss) beside you. Many editions online are either unsearchable scans or bare verse lists with no explanation. This project pairs every stanza with plain learner's explanations in both Sinhala and English, places each verse along the bird's real geographical route between Kotte and Kelaniya, and remains honest where archaic wordplay is too dense to paraphrase with certainty.

## Features

- **All 111 verses in Elu Sinhala** sourced from [Sinhala Wikibooks](https://si.wikibooks.org/wiki/%E0%B7%83%E0%B7%90%E0%B7%85%E0%B6%BD%E0%B7%92%E0%B7%84%E0%B7%92%E0%B6%AB%E0%B7%92_%E0%B7%83%E0%B6%B1%E0%B7%8A%E0%B6%AF%E0%B7%9A%E0%B7%81%E0%B6%BA), paired with plain modern Sinhala and English explanations and historical context notes.
- **Honest "General sense" markers** on verses where compressed Elu puns (*slesha*) or disputed readings mean our paraphrase captures only the broad meaning.
- **Persistent procedural 3D world** built entirely in code (no external `.glb` models, textures, or images): thirteen sky themes easing smoothly across dawn, court, night, river, sunset, sacred temple, and moonlight, with a low-poly faceted valley and an animated starling that glides across the viewport.
- **Interactive 3D route map (`/map`)** covering the ~68 × 48 km terrain between Kotte, the Kelani River, and Kelaniya, with eleven landmarks, a 1–111 verse scrubber, and *Overview*, *Follow*, and *Free* camera modes.
- **Calm mode & Fly with the starling**: opt-in calm mode slows 3D motion, disables grain flicker, and honours reduced motion; auto-advance ("fly with the starling") steps gently from verse to verse every ~14 seconds.
- **Zero tracking**: no analytics, no cookies, no ads, and no third-party runtime services.

## Quick start

Requires **Node.js 20.9+** (`.nvmrc` specifies Node 22). Note that `next/font/google` fetches [Noto Serif Sinhala](https://gwfh.mranftl.com/fonts/noto-sans-sinhala?subsets=latin), [Noto Sans Sinhala](https://gwfh.mranftl.com/fonts/noto-sans-sinhala?subsets=latin), [Cormorant Garamond](https://gwfh.mranftl.com/fonts/cormorant-garamond?subsets=latin), and Geist over the network on the first build.

```bash
npm install
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Starts the local development server with Turbopack at `http://localhost:3000`. |
| `npm run build` | Builds the production application and statically generates all 111 verse routes. |
| `npm run start` | Runs the compiled production server. |
| `npm run lint` | Runs ESLint 9 across `src/`. |
| `npm run typecheck` | Runs `next typegen && tsc --noEmit` to validate route and TypeScript types. |

## How it is built

- **Framework:** Next.js 16.4 (App Router, Cache Components, partial prefetching, TypeScript, Turbopack) and React 19.3
- **Styling:** Tailwind CSS 4 (`@tailwindcss/turbopack`) with custom dark jewel-toned CSS variables
- **3D & Animation:** `three` ^0.186, `@react-three/fiber` ^9, `@react-three/postprocessing` ^3, `postprocessing` ^6, and `motion` ^14

```text
src/
├── app/
│   ├── about/page.tsx        # Story, poet, genre, honest notes & sources
│   ├── developer/page.tsx    # Community note & cursor-following SVG engineer
│   ├── journey/page.tsx      # Vertical timeline of all 20 poem sections
│   ├── map/page.tsx          # Full-screen 3D route map (/map)
│   ├── verse/[n]/page.tsx    # Static routes for verses 2-111 (verse 1 redirects to /)
│   ├── apple-icon.tsx        # 180x180 ImageResponse icon
│   ├── icon.svg              # Faceted gold starling favicon
│   ├── globals.css           # Design tokens, glass surface, film grain
│   ├── layout.tsx            # Fonts, persistent 3D canvases, header, loader
│   ├── not-found.tsx         # Styled 404 page
│   └── page.tsx              # Verse 1 reader at site root /
├── components/
│   ├── Backdrop.tsx          # CSS sky gradient fallback underneath WebGL
│   ├── BirdOverlay.tsx       # Persistent foreground/midground starling canvas
│   ├── CalmContext.tsx       # Opt-in calm mode & auto-advance state
│   ├── Engineer.tsx          # Interactive cursor-tracking SVG character
│   ├── Header.tsx            # Translucent pill navigation bar
│   ├── Icons.tsx             # Inline SVG icons & BirdMark
│   ├── JourneyRail.tsx       # Bottom segmented progress rail across 20 sections
│   ├── LoadingScreen.tsx     # First-load overlay waiting on fonts + 3D frames
│   ├── MapExperience.tsx     # 3D terrain map, route curve, pins & camera modes
│   ├── Reveal.tsx            # Motion fade/rise wrapper
│   ├── SceneLoader.tsx       # Dynamic client loader & WebGL error boundaries
│   ├── SceneRoot.tsx         # Persistent sky, stars, particles, valley & post-FX
│   └── VerseReader.tsx       # Bilingual verse card, language switch & navigation
├── data/
│   ├── developer.ts          # Repository and developer links
│   ├── index.ts              # Merged ALL_VERSES, APPROXIMATE set & helpers
│   ├── meanings-1..4.ts      # Plain Sinhala & English explanations (1-111)
│   ├── poem.json             # Original Elu Sinhala verses from Wikibooks
│   ├── sections.ts           # The 20 traditional sections & themes
│   └── types.ts              # TypeScript interfaces
└── lib/
    ├── geo.ts                # Terrain heightfield, river, coastline & landmarks
    ├── kit.ts                # Shared flat-shaded materials & wind/night uniforms
    ├── loading.ts            # Readiness tracker for fonts, scene, bird & map
    ├── models.ts             # Procedural low-poly palace, stupa, kovil, temple, palms
    ├── myna.ts               # Procedural faceted starling geometry & wing rig
    ├── themes.ts             # 13 sky/mood themes and nightOf() calculation
    └── useJourney.ts         # Maps current route to active themeId and progress
```

### How the content works

All verse lines live in `src/data/poem.json` and are merged at build time with `src/data/meanings-1.ts` through `src/data/meanings-4.ts` and `src/data/sections.ts`. If you spot a transcription typo or want to make a Sinhala or English explanation clearer, you only need to edit a plain text string in one of the `meanings-*.ts` files—no 3D or React knowledge required. See [`docs/content-style-guide.md`](./docs/content-style-guide.md).

## Contributing

**You do not have to write code to contribute.** Improving a single Sinhala or English explanation, clarifying a historical note, or pointing out an Elu wordplay nuance is one of the highest-value contributions this project can receive. Read [`CONTRIBUTING.md`](./CONTRIBUTING.md) to get started, or open a [Content Correction issue](https://github.com/Poorna-bot/salalihini-sandeshaya/issues/new?template=content_correction.yml).

## Ideas for the future

- **Review by scholars and teachers** of classical Sinhala literature to refine the verses currently marked "General sense".
- **A human recitation of the verses:** this site intentionally has **no audio** today. Automated text-to-speech voices were tested and were not good enough for the rhythm and cadence of Elu verse (*samudraghosa* metre). A calm, unhurried recording by a human reader would be a wonderful addition.
- **Word-by-word glosses (*padagata sannaya*)** that let students tap an individual Elu word to see its modern Sinhala and English root.
- **Companion sites for the other sandesas** (*Mayura*, *Paravi*, *Gira*, *Hansa*, and *Kokila Sandeshaya*).
- **Automated visual regression tests and offline PWA caching** for classrooms with intermittent connectivity.

## Sponsor

This project is free to read, free of ads, and built as a gift for students and readers of Sinhala literature. If you would like to support its maintenance and hosting, visit the [GitHub Sponsors page](https://github.com/sponsors/Poorna-bot).

## Credits and licences

- **Code:** [MIT License](./LICENSE)
- **Verse text, explanations & copy:** [CC BY-SA 4.0](./LICENSE-CONTENT.md)
- Full attribution for the poem text ([Sinhala Wikibooks](https://si.wikibooks.org/wiki/%E0%B7%83%E0%B7%90%E0%B7%85%E0%B6%BD%E0%B7%92%E0%B7%84%E0%B7%92%E0%B6%AB%E0%B7%92_%E0%B7%83%E0%B6%B1%E0%B7%8A%E0%B6%AF%E0%B7%9A%E0%B7%81%E0%B6%BA) / e-Pothgula), historical references ([Stanford Humanities Center DIBUR](https://shc.stanford.edu/arcade/publications/dibur/curated/translating-worlds-through-words-bird-view-selalihini-sandeshaya)), and open fonts is listed in [`CREDITS.md`](./CREDITS.md).
