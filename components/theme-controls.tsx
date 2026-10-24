"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Moon, Sun } from "@phosphor-icons/react";

const ThemeContext = createContext({ night: true, toggle: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [night, setNight] = useState(true);
  useEffect(() => {
    document.documentElement.dataset.theme = night ? "night" : "day";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", night ? "#0c1018" : "#eef2f8");
  }, [night]);
  // Kept in memory: this preference adds no cookies or browser storage.
  return (
    <ThemeContext.Provider
      value={{ night, toggle: () => setNight((value) => !value) }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

export function ThemeToggle() {
  const { night, toggle } = useTheme();
  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggle}
      aria-pressed={night}
      aria-label={night ? "Switch to day mode" : "Switch to night mode"}
    >
      {night ? <Sun aria-hidden /> : <Moon aria-hidden />}
      <span>{night ? "Day" : "Night"}</span>
    </button>
  );
}
