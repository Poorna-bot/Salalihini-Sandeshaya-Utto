import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SECTIONS } from "@/data";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About the Poem",
  description:
    "The story, poet, fifteenth-century Kotte setting, Elu Sinhala craft, and open-source text notes for Salalihini Sandeshaya."
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <Reveal className="glass rounded-3xl p-6 sm:p-9 space-y-4">
          <p lang="si" className="font-elu text-lg text-gold">
            සැළලිහිණි සංදේශය · කාව්‍ය ප්‍රවෘත්තිය
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-ink">
            The Starling&apos;s Message
          </h1>
          <p className="text-sm sm:text-base text-ink leading-relaxed">
            Around 1450, in the royal city of Jayawardhanapura Kotte, the Buddhist monk-poet{" "}
            <a
              href="https://en.wikipedia.org/wiki/Thotagamuwe_Sri_Rahula_Thera"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold underline decoration-gold/40 hover:decoration-gold"
            >
              Thotagamuwe Sri Rahula
            </a>{" "}
            wrote a prayer for a princess and gave it wings. The poem is a letter carried by a talking hill myna or starling (<em>salalihiniya</em>): a one-day flight from the king&apos;s palace to a river, a temple, and a god, told in 111 quatrains.
          </p>
          <p lang="si" className="font-sinhala text-sm text-ink-soft leading-relaxed">
            පසළොස්වන සියවසේ කෝට්ටේ රාජධානියේ දී තොටගමුවේ ශ්‍රී රාහුල හිමියන් විසින් රචිත මෙම සංදේශ කාව්‍යය, සැළලිහිණි කුරුලු දූතියක් ලවා කැලණි විභීෂණ දෙවියන්ට යවන ලද පණිවුඩයකි.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2 text-xs sm:text-sm font-medium text-[#140e28] hover:bg-gold/90 transition-colors"
            >
              Begin reading at Verse 1 →
            </Link>
          </div>
        </Reveal>

        <Reveal className="glass rounded-3xl p-6 sm:p-8 space-y-3">
          <h2 className="font-display text-2xl sm:text-3xl text-gold">
            The Story &amp; the Setting
          </h2>
          <p className="text-sm sm:text-base text-ink leading-relaxed">
            The poem is addressed to God Vibhishana, guardian deity of Kelaniya, asking him to grant a noble son to Princess Ulakudaya Devi, daughter of King Parakramabahu VI (reigned 1412–1467) of the{" "}
            <a
              href="https://en.wikipedia.org/wiki/Kingdom_of_Kotte"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold underline decoration-gold/40 hover:decoration-gold"
            >
              Kingdom of Kotte
            </a>
            , and her consort Minister Nannurutunaya. Along the route, the poet paints fifteenth-century Sri Lanka in living detail: the water-ringed ramparts of Kotte, the three-storeyed Tooth Relic temple, Tamil hymns rising at night from a Hindu kovil of Siva, Prince Sapumal riding back in triumph from Jaffna (verse 29), naga maidens singing to the veena by the Kelani River, and the sacred shrines of Kelaniya.
          </p>
        </Reveal>

        <Reveal className="glass rounded-3xl p-6 sm:p-8 space-y-3">
          <h2 className="font-display text-2xl sm:text-3xl text-gold">
            The Poet &amp; How to Read an Elu Verse
          </h2>
          <p className="text-sm sm:text-base text-ink leading-relaxed">
            Thotagamuwe Sri Rahula Thera (c. 1408–1491), head of the Vijayabahu Pirivena at Totagamuwa, was honoured as <em>Shadbhasha Parameshwara</em> (&ldquo;master of six languages&rdquo;). He composed the poem in <strong>Elu</strong>, an older, musical literary form of Sinhala that avoids heavy Sanskrit consonant clusters in favour of liquid vowels, internal assonance, and strict end-rhyme. Most verses follow the <em>samudraghosa</em> (&ldquo;sound of the ocean&rdquo;) metre, rising and falling in four rhythmic lines.
          </p>
        </Reveal>

        <Reveal className="glass rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="font-display text-2xl sm:text-3xl text-gold">
            The 20 Sections
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
            {SECTIONS.map((s, i) => (
              <Link
                key={s.id}
                href={s.from === 1 ? "/" : `/verse/${s.from}`}
                className="flex items-center justify-between rounded-xl bg-white/5 hover:bg-white/10 border border-line px-3.5 py-2 transition-colors"
              >
                <span className="truncate">
                  <span className="font-mono text-gold mr-2">{String(i + 1).padStart(2, "0")}.</span>
                  <span lang="si" className="font-sinhala text-ink">{s.si}</span>{" "}
                  <span className="text-ink-soft">· {s.en}</span>
                </span>
                <span className="font-mono text-xs text-ink-faint ml-2 shrink-0">
                  {s.from === s.to ? s.from : `${s.from}–${s.to}`}
                </span>
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal className="glass rounded-3xl p-6 sm:p-8 space-y-3">
          <h2 className="font-display text-2xl sm:text-3xl text-gold">
            Honest Notes on the Text &amp; Explanations
          </h2>
          <p className="text-sm sm:text-base text-ink leading-relaxed">
            The Elu Sinhala text comes from an open digital edition on{" "}
            <a
              href="https://si.wikibooks.org/wiki/%E0%B7%83%E0%B7%90%E0%B7%85%E0%B6%BD%E0%B7%92%E0%B7%84%E0%B7%92%E0%B6%AB%E0%B7%92_%E0%B7%83%E0%B6%B1%E0%B7%8A%E0%B6%AF%E0%B7%9A%E0%B7%81%E0%B6%BA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold underline decoration-gold/40 hover:decoration-gold"
            >
              Sinhala Wikibooks
            </a>{" "}
            (originally transcribed by e-Pothgula); verse 1 preserves two lines in that source. The modern Sinhala and English explanations on this site were written fresh in plain words as learner&apos;s aids to help students and general readers follow each stanza. Where a verse uses dense wordplay (<em>slesha</em>) or disputed archaic terms, we display a <strong>General sense · දළ අදහස</strong> badge rather than pretending certainty.
          </p>
        </Reveal>

        <Reveal className="glass rounded-3xl p-6 sm:p-8 space-y-3">
          <h2 className="font-display text-2xl sm:text-3xl text-gold">
            Sources &amp; Credits
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-ink-soft">
            <li>
              •{" "}
              <a
                href="https://si.wikibooks.org/wiki/%E0%B7%83%E0%B7%90%E0%B7%85%E0%B6%BD%E0%B7%92%E0%B7%84%E0%B7%92%E0%B6%AB%E0%B7%92_%E0%B7%83%E0%B6%B1%E0%B7%8A%E0%B6%AF%E0%B7%9A%E0%B7%81%E0%B6%BA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline"
              >
                Sinhala Wikibooks: සැළලිහිණි සන්දේශය
              </a>{" "}
              — Elu verse text (from e-Pothgula, licensed under{" "}
              <a
                href="https://creativecommons.org/licenses/by-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline"
              >
                CC BY-SA 4.0
              </a>
              ).
            </li>
            <li>
              •{" "}
              <a
                href="https://shc.stanford.edu/arcade/publications/dibur/curated/translating-worlds-through-words-bird-view-selalihini-sandeshaya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline"
              >
                Translating Worlds through Words: The Bird-View of the Selalihini Sandeshaya
              </a>{" "}
              — Stanford Humanities Center (DIBUR), for literary background and route context.
            </li>
            <li>
              •{" "}
              <a
                href="https://gwfh.mranftl.com/fonts/noto-sans-sinhala?subsets=latin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline"
              >
                Noto Serif Sinhala &amp; Noto Sans Sinhala
              </a>
              ,{" "}
              <a
                href="https://gwfh.mranftl.com/fonts/cormorant-garamond?subsets=latin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline"
              >
                Cormorant Garamond
              </a>
              , and Geist (SIL Open Font License 1.1).
            </li>
          </ul>
        </Reveal>
      </div>
    </div>
  );
}
