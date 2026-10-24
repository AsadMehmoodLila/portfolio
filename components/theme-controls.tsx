"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import { Moon, Sun } from "@phosphor-icons/react";
import { SunCinematic } from "@/components/portfolio/sun-cinematic";

const ThemeContext = createContext({
  night: true,
  toggle: (_animate = true) => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [night, setNight] = useState(true);
  const [strike, setStrike] = useState(0);
  const [quietStrike, setQuietStrike] = useState(false);
  const [dayPhase, setDayPhase] = useState<"cool" | "warm">("warm");
  const [sequence, setSequence] = useState(0);
  const warmPage = useCallback(() => setDayPhase("warm"), []);
  useEffect(() => {
    if (night || !sequence) return;
    // Fetch the artwork during the white interval, before its first visible frame.
    for (const src of [
      "/media/vfx/solar-orb.webp",
      "/media/vfx/screen-tear.webp",
    ]) {
      const asset = new Image();
      asset.src = src;
    }
    const arrival = setTimeout(() => setStrike(sequence), 4000);
    const finish = setTimeout(() => setStrike(0), 9200);
    return () => {
      clearTimeout(arrival);
      clearTimeout(finish);
    };
  }, [sequence, night]);
  useEffect(() => {
    document.documentElement.dataset.theme = night ? "night" : "day";
    document.documentElement.dataset.dayPhase = night ? "warm" : dayPhase;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute(
        "content",
        night ? "#0c1018" : dayPhase === "cool" ? "#eef2f8" : "#eee2c9",
      );
  }, [night, dayPhase]);
  // Kept in memory: this preference adds no cookies or browser storage.
  return (
    <ThemeContext.Provider
      value={{
        night,
        toggle: (animate = true) => {
          if (night) {
            setQuietStrike(
              !animate ||
                matchMedia("(prefers-reduced-motion: reduce)").matches,
            );
            setDayPhase("cool");
            setStrike(0);
            setSequence((value) => value + 1);
          } else setStrike(0);
          setNight((value) => !value);
        },
      }}
    >
      {children}
      {strike > 0 && !night && (
        <SunCinematic key={strike} quiet={quietStrike} onWarm={warmPage} />
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
      onClick={(event) => toggle(event.detail !== 0)}
      aria-pressed={night}
      aria-label={night ? "Switch to day mode" : "Switch to night mode"}
    >
      {night ? <Sun aria-hidden /> : <Moon aria-hidden />}
      <span>{night ? "Day" : "Night"}</span>
    </button>
  );
}
