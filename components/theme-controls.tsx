"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Moon, Sun } from "@phosphor-icons/react";
import { FighterSprite } from "@/components/portfolio/fighter-sprite";

const ThemeContext = createContext({ night: true, toggle: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [night, setNight] = useState(true);
  const [strike, setStrike] = useState(0);
  useEffect(() => {
    if (!strike) return;
    const timer = setTimeout(() => setStrike(0), 1700);
    return () => clearTimeout(timer);
  }, [strike]);
  useEffect(() => {
    document.documentElement.dataset.theme = night ? "night" : "day";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", night ? "#0c1018" : "#eee2c9");
  }, [night]);
  // Kept in memory: this preference adds no cookies or browser storage.
  return (
    <ThemeContext.Provider
      value={{
        night,
        toggle: () => {
          if (night && !matchMedia("(prefers-reduced-motion: reduce)").matches)
            setStrike((value) => value + 1);
          else setStrike(0);
          setNight((value) => !value);
        },
      }}
    >
      {children}
      {strike > 0 && !night && (
        <div key={strike} className="sun-strike" aria-hidden="true">
          <div className="sun-strike-beam" />
          <img
            className="sun-strike-sun"
            src="/media/sun.svg"
            alt=""
            width={130}
            height={130}
          />
          <div className="sun-strike-message">
            <FighterSprite fighter={1} action="attack2" size={170} />
            <div>
              <span>Solar strike</span>
              <strong>
                Destroyed that
                <br />
                flashbang
              </strong>
              <small>Warm mode unlocked</small>
            </div>
          </div>
        </div>
      )}
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
