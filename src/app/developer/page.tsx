import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { DEVELOPER } from "@/data/developer";
import { Engineer } from "@/components/Engineer";
import { Reveal } from "@/components/Reveal";
import { HeartIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About the Developer",
  description:
    "Made By A/L Student — why this open-source edition of Salalihini Sandeshaya exists and how you can help."
};

export default function DeveloperPage() {
  const repo = DEVELOPER.repoUrl;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Two-column Hero with animated Engineer SVG */}
        <Reveal className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="glass rounded-3xl p-6 sm:p-8 md:col-span-7 space-y-4">
            <p lang="si" className="font-sinhala text-sm sm:text-base text-gold">
              උසස් පෙළ සිසුවෙකු විසින්, ප්‍රජාව වෙනුවෙන්.
            </p>
            <h1 className="font-display text-3xl sm:text-5xl text-ink leading-tight">
              Made By A/L Student
            </h1>
            {DEVELOPER.name && (
              <p className="text-sm text-gold font-medium">{DEVELOPER.name}</p>
            )}
            <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
              Built with care so students, teachers, and curious readers anywhere can experience a fifteenth-century Sinhala classic without paywalls, clutter, or noise.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-1">
              {DEVELOPER.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-line px-4 py-1.5 text-xs sm:text-sm text-ink transition-colors"
                >
                  {link.label} →
                </a>
              ))}
              {DEVELOPER.contactUrl && (
                <a
                  href={DEVELOPER.contactUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-line px-4 py-1.5 text-xs sm:text-sm text-ink transition-colors"
                >
                  {DEVELOPER.contactLabel}
                </a>
              )}
              {DEVELOPER.sponsorUrl && (
                <a
                  href={DEVELOPER.sponsorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#ea4aaa]/20 border border-[#ea4aaa]/50 px-4 py-1.5 text-xs sm:text-sm text-ink hover:bg-[#ea4aaa]/30 transition-colors"
                >
                  <span className="text-[#ea4aaa]">
                    <HeartIcon className="w-3.5 h-3.5" />
                  </span>
                  <span>Sponsor</span>
                </a>
              )}
            </div>
          </div>

          <div className="glass rounded-3xl p-4 sm:p-6 md:col-span-5 flex items-center justify-center">
            <Engineer />
          </div>
        </Reveal>

        {/* Why it exists + Three promise cards */}
        <Reveal className="glass rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl text-gold">
              Why it exists
            </h2>
            <p className="text-sm sm:text-base text-ink leading-relaxed">
              This website is a gift, not a product. Classical Sinhala poetry belongs to everyone, yet online copies are often hard to read or stripped of context. Pairing the original Elu stanzas with calm 3D scenery and plain bilingual explanations invites a new generation to keep reading to the next verse.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white/5 border border-line p-4 space-y-1.5">
              <h3 className="font-medium text-ink text-sm sm:text-base">Free to read</h3>
              <p lang="si" className="font-sinhala text-xs text-gold">කියවීමට සැමදා නොමිලේ</p>
              <p className="text-xs text-ink-soft leading-relaxed">
                Open to every student, classroom, and reader with no sign-up or paywall.
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-line p-4 space-y-1.5">
              <h3 className="font-medium text-ink text-sm sm:text-base">No ads, no tracking</h3>
              <p lang="si" className="font-sinhala text-xs text-gold">දැන්වීම් හෝ ලුහුබැඳීම් නැත</p>
              <p className="text-xs text-ink-soft leading-relaxed">
                Zero analytics scripts, zero cookies, and zero third-party trackers.
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-line p-4 space-y-1.5">
              <h3 className="font-medium text-ink text-sm sm:text-base">Honest about its limits</h3>
              <p lang="si" className="font-sinhala text-xs text-gold">සීමාවන් ගැන අවංකයි</p>
              <p className="text-xs text-ink-soft leading-relaxed">
                Where a verse is too dense to paraphrase with certainty, we mark it openly as &ldquo;General sense&rdquo;.
              </p>
            </div>
          </div>
        </Reveal>

        {/* How you can help */}
        <Reveal className="glass rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="font-display text-2xl sm:text-3xl text-gold">
            How you can help
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white/5 border border-line p-4 space-y-2">
              <span className="font-mono text-xs text-gold">01</span>
              <h3 className="font-medium text-ink text-sm sm:text-base">Check an explanation</h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                If a Sinhala or English explanation can be clearer or more faithful, suggest a revision—no coding needed.
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-line p-4 space-y-2">
              <span className="font-mono text-xs text-gold">02</span>
              <h3 className="font-medium text-ink text-sm sm:text-base">Share it with a student</h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Send the link to someone studying Sinhala literature or curious about Sri Lanka&apos;s heritage.
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-line p-4 space-y-2">
              <span className="font-mono text-xs text-gold">03</span>
              <h3 className="font-medium text-ink text-sm sm:text-base">Tell me what is broken</h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Report layout glitches, device issues, or typos on GitHub so we can fix them for everyone.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Open source & Built with */}
        <Reveal className="glass rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl text-gold">
              Open source
            </h2>
            <p className="text-sm text-ink-soft leading-relaxed">
              The code is MIT-licensed and the verse explanations are shared under CC BY-SA 4.0.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gold px-4 py-2 text-xs sm:text-sm font-medium text-[#140e28] hover:bg-gold/90 transition-colors"
            >
              View the source
            </a>
            <a
              href={`${repo}/blob/main/CONTRIBUTING.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/10 hover:bg-white/20 border border-line px-4 py-2 text-xs sm:text-sm text-ink transition-colors"
            >
              How to contribute
            </a>
            <a
              href={`${repo}/issues/new?template=content_correction.yml`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/10 hover:bg-white/20 border border-line px-4 py-2 text-xs sm:text-sm text-ink transition-colors"
            >
              Correct a verse
            </a>
          </div>

          <hr className="rule-gold" />

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-ink-faint">Built with</p>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "React", "three.js", "Tailwind CSS", "TypeScript"].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-white/5 border border-line px-3 py-1 text-xs text-ink-soft"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Closing line */}
        <Reveal className="text-center space-y-3 pt-2">
          <p lang="si" className="font-elu text-xl text-gold">
            සැළලිහිණිය යළිත් පියඹයි.
          </p>
          <p className="font-display italic text-lg text-ink-soft">
            The starling flies again.
          </p>
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-line px-5 py-2 text-xs sm:text-sm text-ink transition-colors"
            >
              ← Return to the poem
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
