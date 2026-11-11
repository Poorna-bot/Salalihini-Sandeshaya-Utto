# Contributing to Salalihini Sandeshaya

Thank you for helping improve **සැළලිහිණි සංදේශය · The Starling's Message**!

**You don't need to write code to contribute.** If you are a student, teacher, or reader of Sinhala literature and notice a verse explanation that could be clearer, more accurate, or better contextualised, you can suggest a change directly through GitHub's web interface.

## Fixing or improving a verse explanation

1. Read [`docs/content-style-guide.md`](./docs/content-style-guide.md) for our voice and honesty rules (plain modern language, never copy copyrighted commentary, and use the `APPROXIMATE` list when a verse's wordplay is only paraphrased in its general sense).
2. Find the verse in `src/data/`:
   - `src/data/meanings-1.ts` — Verses 1 to 28
   - `src/data/meanings-2.ts` — Verses 29 to 56
   - `src/data/meanings-3.ts` — Verses 57 to 84
   - `src/data/meanings-4.ts` — Verses 85 to 111
   - `src/data/poem.json` — Original Elu Sinhala lines
3. Either open a [Content Correction issue](https://github.com/Poorna-bot/salalihini-sandeshaya/issues/new?template=content_correction.yml) with the verse number and your suggested wording, or edit the file on GitHub and open a pull request.

## Local development setup

1. Install **Node.js 20.9+** (Node 22 recommended; see `.nvmrc`).
2. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/Poorna-bot/salalihini-sandeshaya.git
   cd salalihini-sandeshaya
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000`. Note that if you change Next.js route structure or `src/app/` params, read `AGENTS.md` and the Next.js docs in `node_modules/next/dist/docs/`.

## Branch and pull request flow

1. Create a descriptive branch from `main` (for example `content/verse-42-note` or `fix/map-label-fade`).
2. Keep pull requests focused—separate content corrections from 3D/UI code changes whenever possible.
3. Run all verification checks locally before opening your PR:
   ```bash
   npm run lint
   npm run typecheck
   npm run build
   ```
4. Fill out the appropriate checklist (Content or Code) in the pull request template.
