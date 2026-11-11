import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass max-w-md w-full rounded-3xl p-8 text-center space-y-4">
        <p lang="si" className="font-elu text-xl text-gold">
          මෙම කවිය හමු නොවීය
        </p>
        <h1 className="font-display text-3xl sm:text-4xl text-ink">
          This verse is out of reach
        </h1>
        <p className="text-sm text-ink-soft leading-relaxed">
          The starling&apos;s journey spans 111 verses from Jayawardhanapura Kotte to Kelaniya. The page or verse number you asked for lies beyond her route.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2 text-xs sm:text-sm font-medium text-[#140e28] hover:bg-gold/90 transition-colors"
          >
            Return to Verse 1 →
          </Link>
        </div>
      </div>
    </div>
  );
}
