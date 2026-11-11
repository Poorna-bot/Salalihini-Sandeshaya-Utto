# Content Style Guide

This guide explains how the Sinhala (`si`) and English (`en`) explanations in `src/data/meanings-1.ts` through `src/data/meanings-4.ts` are written and maintained.

## 1. Who we are writing for

Write for a curious secondary-school student, a heritage learner, or a first-time reader who wants to follow what the poet is saying in each stanza without getting lost in archaic grammar.

- **Modern Sinhala (`si`):** Use natural, clear modern Sinhala prose. Unpack compressed Elu compound words so the reader can see how the image fits together, while keeping the sentence warm and dignified.
- **English (`en`):** Write plain, vivid English prose (one or two sentences per quatrain). Avoid stiff nineteenth-century archaisms ("thou", "hath", "unto") and avoid academic jargon.
- **Context note (`note`):** Optional one-line note when a verse names a historical person (such as King Parakramabahu VI, Prince Sapumal, or Minister Nannurutunaya), a real place (such as Kontagantota or Kaikavala), or a literary convention (such as why gods do not blink).

## 2. Never overclaim

- Never describe these explanations as "scholarly", "authoritative", or "definitive".
- They are learner's aids—plain paraphrases designed to help someone enjoy the poem line by line.
- **Never copy copyrighted commentary or published translations.** Work directly from the Elu verse text and public historical facts.

## 3. Handling dense verses (`APPROXIMATE` / "General sense")

Fifteenth-century Elu poetry uses *slesha* (double-meaning wordplay), compressed mythological allusions, and rare vocabulary that even printed commentaries debate.

- When a verse is so dense that a short explanation can only give its broad drift, add its verse number to `APPROXIMATE` in `src/data/index.ts`.
- The reader UI automatically displays a **"General sense · දළ අදහස"** badge on any verse in `APPROXIMATE` so readers know the explanation is an honest approximation rather than a word-for-word certainty.
- If a scholar or experienced reader contributes a clearer explanation that resolves the ambiguity, explain the resolution in the pull request before removing the verse number from `APPROXIMATE`.

## 4. Preserving the Elu text (`src/data/poem.json`)

- Never "modernise" or rewrite the Elu spelling in `src/data/poem.json` to make it look like modern Sinhala.
- Only fix clear digital transcription typos when verified against standard printed editions of the *Salalihini Sandeshaya* text.
