"use client";
import { createContext, useContext, useEffect, useState } from "react";

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
    try {
      sessionStorage.removeItem("scriptlilla-effects-choice");
    } catch {}
    const changed = () => update(!media.matches && !saver);
    changed();
    setReady(true);
    media.addEventListener("change", changed);
    return () => media.removeEventListener("change", changed);
  }, []);
  return (
    <EffectsContext.Provider value={{ enabled, ready, setEnabled: update }}>
      {children}
    </EffectsContext.Provider>
  );
}
export const useEffects = () => useContext(EffectsContext);
