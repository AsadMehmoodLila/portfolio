"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { MoonIcon, SunIcon } from "@/components/ui/icons";

const ThemeContext = createContext({ night: false, toggle: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [night, setNight] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.theme = night ? "night" : "day";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", night ? "#111414" : "#f5f5f2");
  }, [night]);
  // Kept in memory: this preference adds no cookies or browser storage.
  return <ThemeContext.Provider value={{ night, toggle: () => setNight(value => !value) }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);

export function ThemeToggle() {
  const { night, toggle } = useTheme();
  return <button className="theme-toggle" type="button" onClick={toggle} aria-pressed={night} aria-label={night ? "Switch to day mode" : "Switch to night mode"}>
    {night ? <SunIcon /> : <MoonIcon />}<span>{night ? "Day" : "Night"}</span>
  </button>;
}
