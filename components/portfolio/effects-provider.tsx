"use client";
import { createContext, useContext, useEffect, useState } from "react";

const KEY = "scriptlilla-effects-choice";
const EffectsContext = createContext({
  enabled: false,
  ready: false,
  setEnabled: (_value: boolean) => {},
});

export function EffectsProvider({ children }: { children: React.ReactNode }) {
  const [enabled, update] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.effects = enabled ? "on" : "off";
  }, [enabled]);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const saver = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;
    let choice: string | null = null;
    let legacyOff = false;
    try {
      choice = sessionStorage.getItem(KEY);
      legacyOff =
        JSON.parse(
          sessionStorage.getItem("scriptlilla-hero-session-v1") || "null",
        )?.off === true;
    } catch {}
    update(
      choice === "on" ||
        (choice !== "off" && !legacyOff && !media.matches && !saver),
    );
    setReady(true);
    // A changed system preference takes effect immediately; visitors can opt in again.
    const changed = () => {
      if (media.matches) update(false);
    };
    media.addEventListener("change", changed);
    return () => media.removeEventListener("change", changed);
  }, []);
  function setEnabled(value: boolean) {
    update(value);
    try {
      sessionStorage.setItem(KEY, value ? "on" : "off");
    } catch {}
  }
  return (
    <EffectsContext.Provider value={{ enabled, ready, setEnabled }}>
      {children}
    </EffectsContext.Provider>
  );
}
export const useEffects = () => useContext(EffectsContext);
