"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BirdMark,
  GlobeIcon,
  MapIcon,
  BookIcon,
  SmileIcon,
  WindIcon,
  PlayIcon,
  PauseIcon
} from "./Icons";
import { useCalm } from "./CalmContext";
import { useJourney } from "@/lib/useJourney";

export function Header() {
  const pathname = usePathname() || "/";
  const { isVersePage } = useJourney();
  const { calmMode, setCalmMode, playing, setPlaying } = useCalm();

  const navItems = [
    { href: "/map", label: "3D Map", icon: GlobeIcon, hideBelowLg: false },
    { href: "/journey", label: "Journey", icon: MapIcon, hideBelowLg: false },
    { href: "/about", label: "About", icon: BookIcon, hideBelowLg: false },
    { href: "/developer", label: "Developer", icon: SmileIcon, hideBelowLg: true }
  ];

  return (
    <header className="fixed top-3 inset-x-0 z-30 flex justify-center px-3 sm:px-6 pointer-events-none">
      <nav
        aria-label="Primary navigation"
        className="glass pointer-events-auto flex items-center justify-between gap-2 sm:gap-4 rounded-full px-3.5 py-2 sm:px-5 sm:py-2.5 max-w-5xl w-full"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 text-ink hover:text-gold transition-colors focus-visible:outline-2 focus-visible:outline-gold rounded-full pr-1"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 text-gold">
            <BirdMark className="w-5 h-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span lang="si" className="font-elu text-xs sm:text-sm font-medium text-ink">
              සැළලිහිණි සංදේශය
            </span>
            <span className="font-display italic text-[11px] sm:text-xs text-ink-soft hidden sm:inline">
              The Starling&apos;s Message
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs sm:text-sm transition-colors focus-visible:outline-2 focus-visible:outline-gold ${
                  active
                    ? "bg-gold/20 text-gold font-medium"
                    : "text-ink-soft hover:text-ink hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className={item.hideBelowLg ? "hidden lg:inline" : "hidden sm:inline"}>
                  {item.label}
                </span>
              </Link>
            );
          })}

          {isVersePage && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-pressed={playing}
              aria-label={playing ? "Pause auto-advance (Fly with the starling)" : "Play auto-advance (Fly with the starling)"}
              title="Fly with the starling (auto-advance every 14s)"
              className={`flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-gold ${
                playing
                  ? "bg-gold text-[#140e28] font-medium"
                  : "text-ink-soft hover:text-ink hover:bg-white/5"
              }`}
            >
              {playing ? <PauseIcon className="w-3.5 h-3.5" /> : <PlayIcon className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">{playing ? "Flying" : "Fly"}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setCalmMode((c) => !c)}
            aria-pressed={calmMode}
            aria-label={calmMode ? "Disable calm mode" : "Enable calm mode"}
            title="Calm mode (slow motion & stillness)"
            className={`flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-gold ${
              calmMode
                ? "bg-gold/25 text-gold font-medium"
                : "text-ink-soft hover:text-ink hover:bg-white/5"
            }`}
          >
            <WindIcon className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Calm</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
