import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SECTIONS } from "@/data";
import { THEMES } from "@/lib/themes";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "The Journey",
  description:
    "Follow all 20 sections of Salalihini Sandeshaya from King Parakramabahu VI's court at Kotte to God Vibhishana's shrine at Kelaniya."
};

export default function JourneyPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-10">
        <Reveal className="text-center space-y-3">
          <p lang="si" className="font-elu text-lg text-gold">
            ගමන් මඟ · කෝට්ටේ සිට කැලණියට
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-ink">
            The Journey
          </h1>
          <p className="font-display italic text-xl text-ink-soft">
            From Kotte to Kelaniya
          </p>
          <p className="text-sm sm:text-base text-ink-soft max-w-2xl mx-auto leading-relaxed">
            The 111 verses unfold across twenty traditional sections—beginning with a dawn blessing in the water-ringed capital of Jayawardhanapura, pausing overnight at a Hindu kovil, crossing groves and the Kelani River, and arriving by lamplight at the temple and shrine of Kelaniya.
          </p>
        </Reveal>

        <div className="relative pl-6 sm:pl-10">
          {/* Vertical gold hairline timeline */}
          <div
            aria-hidden="true"
            className="absolute left-2.5 sm:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-gold/70 via-gold/35 to-transparent"
          />

          <div className="space-y-5">
            {SECTIONS.map((sec, idx) => {
              const theme = THEMES[sec.theme] ?? THEMES.dawn;
              const href = sec.from === 1 ? "/" : `/verse/${sec.from}`;
              const rangeLabel =
                sec.from === sec.to
                  ? `Verse ${sec.from}`
                  : `Verses ${sec.from}–${sec.to}`;

              return (
                <Reveal key={sec.id} delay={Math.min(idx * 0.03, 0.25)}>
                  <div className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-6 sm:-left-10 top-6 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-[#03091e] border border-gold text-[10px] sm:text-xs font-mono text-gold"
                    >
                      {idx + 1}
                    </span>

                    <Link
                      href={href}
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${theme.top}cc 0%, ${theme.mid}88 55%, ${theme.bottom}44 100%)`
                      }}
                      className="block glass rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:border-gold/60 hover:shadow-[0_0_28px_rgba(56,232,255,0.28)] focus-visible:outline-2 focus-visible:outline-gold"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div>
                          <h2 lang="si" className="font-elu text-xl sm:text-2xl text-ink">
                            {sec.si}
                          </h2>
                          <p className="font-display italic text-lg text-gold">
                            {sec.en}
                          </p>
                        </div>
                        <span className="rounded-full bg-black/35 border border-line px-3 py-1 text-xs font-mono text-ink">
                          {rangeLabel}
                        </span>
                      </div>

                      <p lang="si" className="font-sinhala text-xs sm:text-sm text-ink-soft mb-1.5 leading-relaxed">
                        {sec.descSi}
                      </p>
                      <p className="text-xs sm:text-sm text-ink leading-relaxed">
                        {sec.descEn}
                      </p>
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
