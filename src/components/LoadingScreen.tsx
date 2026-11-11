"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { markAllLoaded, markReady, useLoadingState } from "@/lib/loading";

export function LoadingScreen() {
  const pathname = usePathname() || "/";
  const loading = useLoadingState();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready
        .then(() => markReady("fonts"))
        .catch(() => markReady("fonts"));
    } else {
      markReady("fonts");
    }

    // Safety fallback so the loading screen can never stay stuck
    const timer = window.setTimeout(() => {
      markAllLoaded();
    }, 1500);

    return () => window.clearTimeout(timer);
  }, []);

  const isMap = pathname === "/map";
  const readyCount = isMap
    ? Number(loading.fonts) + Number(loading.map) * 2
    : Number(loading.fonts) + Number(loading.scene) + Number(loading.bird);
  const progress = loading.loaded ? 100 : Math.min(100, Math.round((readyCount / 3) * 100));

  useEffect(() => {
    const routeReady = isMap
      ? loading.fonts && loading.map
      : loading.fonts && loading.scene && loading.bird;

    if (routeReady && !loading.loaded) {
      const t = window.setTimeout(() => {
        markAllLoaded();
      }, 150);
      return () => window.clearTimeout(t);
    }
  }, [isMap, loading.fonts, loading.scene, loading.bird, loading.map, loading.loaded]);

  useEffect(() => {
    if (loading.loaded) {
      const t = window.setTimeout(() => {
        setVisible(false);
      }, 450);
      return () => window.clearTimeout(t);
    }
  }, [loading.loaded]);

  if (!visible && loading.loaded) return null;

  return (
    <div
      aria-live="polite"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#03091e] px-6 transition-opacity duration-500 ${
        loading.loaded ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
        <span className="loader-star absolute left-2 top-3 h-1.5 w-1.5 rounded-full bg-gold/80" />
        <span className="loader-star absolute right-3 top-5 h-1 w-1 rounded-full bg-white/70" style={{ animationDelay: "0.4s" }} />
        <span className="loader-star absolute bottom-3 left-5 h-1 w-1 rounded-full bg-gold/70" style={{ animationDelay: "0.8s" }} />
        <svg
          viewBox="0 0 64 64"
          className="loader-bird h-16 w-16 text-gold"
          aria-hidden="true"
        >
          <g className="loader-wing">
            <path d="M18 32L29 14L38 28Z" fill="#64dfdf" fillOpacity="0.9" />
          </g>
          <path
            d="M12 36L28 29L48 26L39 38L22 42L12 36Z"
            fill="#38e8ff"
          />
          <path d="M48 26L55 24.5L50 29Z" fill="#90e0ef" />
        </svg>
      </div>

      <p lang="si" className="font-elu text-xl sm:text-2xl text-ink tracking-wide mb-1">
        සැළලිහිණි සංදේශය
      </p>
      <p className="font-display italic text-lg text-ink-soft mb-6">
        The Starling&apos;s Message
      </p>

      <div className="h-0.5 w-44 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full bg-gold transition-all duration-300"
          style={{ width: `${Math.max(18, progress)}%` }}
        />
      </div>
    </div>
  );
}
