"use client";
import { createContext, useContext, useEffect, useState } from "react";

const EffectsContext = createContext({
  enabled: false,
  ready: false,
  heroesEnabled: false,
  quietHeroes: true,
});

export function EffectsProvider({ children }: { children: React.ReactNode }) {
  const [enabled, update] = useState(false);
  const [ready, setReady] = useState(false);
  const [quietHeroes, setQuietHeroes] = useState(true);
  useEffect(() => {
    document.documentElement.dataset.effects = enabled ? "on" : "off";
  }, [enabled]);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const saver = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;
    try {
      sessionStorage.removeItem("scriptlilla-effects-choice");
    } catch {}
    const changed = () => {
      const quiet = !!(media.matches || saver);
      setQuietHeroes(quiet);
      update(!quiet);
    };
    changed();
    setReady(true);
    media.addEventListener("change", changed);
    return () => media.removeEventListener("change", changed);
  }, []);
  return (
    <EffectsContext.Provider
      value={{ enabled, ready, heroesEnabled: ready, quietHeroes }}
    >
      {children}
    </EffectsContext.Provider>
  );
}
export const useEffects = () => useContext(EffectsContext);
