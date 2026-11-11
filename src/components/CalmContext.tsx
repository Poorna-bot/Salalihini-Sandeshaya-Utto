"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { MotionConfig } from "motion/react";

export type LangMode = "both" | "si" | "en";

interface AppPreferencesContextValue {
  calmMode: boolean;
  setCalmMode: React.Dispatch<React.SetStateAction<boolean>>;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  langMode: LangMode;
  setLangMode: (mode: LangMode) => void;
}

const AppPreferencesContext = createContext<AppPreferencesContextValue>({
  calmMode: false,
  setCalmMode: () => {},
  playing: false,
  setPlaying: () => {},
  langMode: "both",
  setLangMode: () => {}
});

export function CalmProvider({ children }: { children: React.ReactNode }) {
  // Default calmMode strictly to false; never derive from OS prefers-reduced-motion
  const [calmMode, setCalmMode] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [langMode, setLangModeState] = useState<LangMode>("both");

  useEffect(() => {
    try {
      const savedLang = window.localStorage.getItem("salalihini-lang");
      if (savedLang === "both" || savedLang === "si" || savedLang === "en") {
        setLangModeState(savedLang);
      }
      const savedCalm = window.localStorage.getItem("salalihini-calm");
      if (savedCalm === "1") {
        setCalmMode(true);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.calm = calmMode ? "true" : "false";
    try {
      window.localStorage.setItem("salalihini-calm", calmMode ? "1" : "0");
    } catch {
      // ignore
    }
  }, [calmMode]);

  const setLangMode = (mode: LangMode) => {
    setLangModeState(mode);
    try {
      window.localStorage.setItem("salalihini-lang", mode);
    } catch {
      // ignore
    }
  };

  return (
    <AppPreferencesContext.Provider
      value={{ calmMode, setCalmMode, playing, setPlaying, langMode, setLangMode }}
    >
      <MotionConfig reducedMotion={calmMode ? "always" : "never"}>
        {children}
      </MotionConfig>
    </AppPreferencesContext.Provider>
  );
}

export function useCalm() {
  return useContext(AppPreferencesContext);
}
