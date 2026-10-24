"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme-controls";
import { useEffects } from "./effects-provider";
import { FighterSprite } from "./fighter-sprite";
import { fighters } from "@/data/fighters";

// v1 could advance before React committed the sprite. Only started appearances count now.
const KEY = "scriptlilla-hero-session-v2";
type Progress = { seen: number; nextAt: number };
const routes = ["right", "left", "down", "up", "right", "left", "down"];
const lanes = [24, 56, 72, 28, 40, 25, 18];

export function HeroFlybys() {
  const path = usePathname();
  const { night } = useTheme();
  const { heroesEnabled, quietHeroes } = useEffects();
  const sprite = useRef<HTMLDivElement>(null);
  const progress = useRef<Progress>({ seen: 0, nextAt: 0 });
  const live = useRef({ path, night, heroesEnabled, quietHeroes });
  live.current = { path, night, heroesEnabled, quietHeroes };
  const controls = useRef<{
    schedule: () => void;
    start: (index: number, element: HTMLDivElement) => void;
  } | null>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    controls.current?.schedule();
  }, [path, night, heroesEnabled, quietHeroes]);
  // This runs only after React has attached the actual sprite element.
  useEffect(() => {
    if (active !== null && sprite.current)
      controls.current?.start(active, sprite.current);
  }, [active]);
  useEffect(() => {
    let disposed = false,
      timer = 0,
      preparing = false,
      motion: Animation | null = null,
      motionQuiet = true;
    try {
      sessionStorage.removeItem("scriptlilla-hero-session-v1");
      const saved = JSON.parse(sessionStorage.getItem(KEY) || "null");
      if (
        saved &&
        Number.isInteger(saved.seen) &&
        saved.seen >= 0 &&
        saved.seen <= 7 &&
        Number.isFinite(saved.nextAt)
      )
        progress.current = { seen: saved.seen, nextAt: saved.nextAt };
    } catch {}
    const save = () => {
      try {
        sessionStorage.setItem(KEY, JSON.stringify(progress.current));
      } catch {}
    };
    const eligible = () =>
      !disposed &&
      live.current.heroesEnabled &&
      live.current.night &&
      !document.hidden &&
      live.current.path === "/";
    const end = () => {
      motion?.cancel();
      motion = null;
      preparing = false;
      setActive(null);
    };
    function schedule() {
      clearTimeout(timer);
      if (!eligible()) {
        end();
        return;
      }
      if (motion && motionQuiet !== live.current.quietHeroes) end();
      if (progress.current.seen >= 7 || motion || preparing) return;
      timer = window.setTimeout(
        launch,
        Math.max(0, progress.current.nextAt - Date.now()),
      );
    }
    async function launch() {
      if (!eligible() || progress.current.seen >= 7 || preparing || motion)
        return;
      preparing = true;
      const index = progress.current.seen;
      const image = new Image();
      image.src = `/media/fighters/${fighters[index].id}-${live.current.quietHeroes ? "portrait" : "run"}.webp`;
      try {
        await image.decode();
      } catch {
        preparing = false;
        progress.current.seen++;
        progress.current.nextAt = Date.now() + 15000;
        save();
        schedule();
        return;
      }
      if (!eligible()) {
        preparing = false;
        return;
      }
      setActive(index);
    }
    function start(index: number, element: HTMLDivElement) {
      if (!eligible() || index !== progress.current.seen || motion) {
        preparing = false;
        return;
      }
      preparing = false;
      const quiet = live.current.quietHeroes;
      motionQuiet = quiet;
      const horizontal = routes[index] === "right" || routes[index] === "left";
      const forward = routes[index] === "right" || routes[index] === "down";
      const distance = horizontal ? innerWidth + 300 : innerHeight + 260;
      const from = horizontal
        ? `translateX(${forward ? -280 : innerWidth + 20}px)`
        : `translateY(${forward ? -260 : innerHeight + 20}px)`;
      const to = horizontal
        ? `translateX(${forward ? -280 + distance : innerWidth + 20 - distance}px)`
        : `translateY(${forward ? -260 + distance : innerHeight + 20 - distance}px)`;
      motion = element.animate(
        quiet
          ? [
              { opacity: 0 },
              { opacity: 1, offset: 0.12 },
              { opacity: 1, offset: 0.88 },
              { opacity: 0 },
            ]
          : [
              { transform: from, opacity: 0 },
              { transform: from, opacity: 1, offset: 0.06 },
              { transform: to, opacity: 1, offset: 0.94 },
              { transform: to, opacity: 0 },
            ],
        {
          duration: quiet
            ? 3200
            : index === 0
              ? 3400
              : horizontal
                ? 2400
                : 2200,
          easing: "linear",
        },
      );
      progress.current.seen = index + 1;
      progress.current.nextAt = Date.now() + 15000;
      save();
      motion.onfinish = () => {
        motion = null;
        setActive(null);
        schedule();
      };
    }
    controls.current = { schedule, start };
    document.addEventListener("visibilitychange", schedule);
    schedule();
    return () => {
      disposed = true;
      clearTimeout(timer);
      motion?.cancel();
      controls.current = null;
      document.removeEventListener("visibilitychange", schedule);
    };
  }, []);

  return (
    <div
      className="hero-flyby-layer"
      data-enabled={heroesEnabled}
      aria-hidden="true"
    >
      {active !== null && (
        <div
          key={active}
          ref={sprite}
          className={`hero-flyby ${quietHeroes ? "flyby-still" : `flyby-${routes[active]}`}`}
          data-hero={active + 1}
          data-motion={quietHeroes ? "quiet" : "full"}
          style={
            quietHeroes
              ? { right: "4%", bottom: "8%" }
              : routes[active] === "right" || routes[active] === "left"
                ? { top: `${lanes[active]}%` }
                : { left: `${lanes[active]}%` }
          }
        >
          <div className="hero-flyby-trail" />
          <FighterSprite
            fighter={active}
            action={quietHeroes ? "portrait" : "run"}
            moving={!quietHeroes}
            size={170}
          />
        </div>
      )}
    </div>
  );
}
