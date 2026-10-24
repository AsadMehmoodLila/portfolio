"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowCounterClockwise, Sparkle } from "@phosphor-icons/react";
import { useEffects } from "./effects-provider";
import { FighterSprite } from "./fighter-sprite";
import { fighters } from "@/data/fighters";

const KEY = "scriptlilla-hero-session-v1";
type Progress = { seen: number; nextAt: number; off: boolean };
const routes = ["right", "left", "down", "up", "right", "left", "down"];
const lanes = [21, 56, 72, 28, 40, 25, 18];

export function HeroFlybys() {
  const path = usePathname();
  const route = useRef(path);
  const sprite = useRef<HTMLDivElement>(null);
  const progress = useRef<Progress>({ seen: 0, nextAt: 0, off: false });
  const controls = useRef<{ schedule: () => void; replay: () => void } | null>(
    null,
  );
  const [active, setActive] = useState<number | null>(null);
  const { enabled, ready, setEnabled } = useEffects();
  const [complete, setComplete] = useState(false);
  const enabledRef = useRef(enabled);
  useEffect(() => {
    enabledRef.current = enabled;
    if (progress.current.seen > 0) {
      progress.current.off = !enabled;
      try {
        sessionStorage.setItem(KEY, JSON.stringify(progress.current));
      } catch {}
    }
    if (enabled) progress.current.nextAt = 0;
    controls.current?.schedule();
  }, [enabled]);
  useEffect(() => {
    route.current = path;
    controls.current?.schedule();
  }, [path]);
  useEffect(() => {
    let disposed = false,
      timer = 0,
      motion: Animation | null = null,
      preparing = false;
    try {
      const saved = JSON.parse(sessionStorage.getItem(KEY) || "null");
      if (
        saved &&
        Number.isInteger(saved.seen) &&
        saved.seen >= 0 &&
        saved.seen <= 7 &&
        typeof saved.off === "boolean" &&
        Number.isFinite(saved.nextAt)
      )
        progress.current = saved;
    } catch {
      /* Storage-blocking browsers retain the sequence in page memory. */
    }
    setComplete(progress.current.seen === 7);
    const save = () => {
      try {
        sessionStorage.setItem(KEY, JSON.stringify(progress.current));
      } catch {}
    };
    const end = () => {
      motion?.cancel();
      motion = null;
      setActive(null);
    };
    const eligible = () =>
      !disposed &&
      enabledRef.current &&
      progress.current.seen < 7 &&
      !document.hidden &&
      route.current === "/";
    function schedule() {
      clearTimeout(timer);
      if (!eligible()) {
        if (document.hidden || route.current !== "/" || !enabledRef.current)
          end();
        return;
      }
      if (motion || preparing) return;
      timer = window.setTimeout(
        launch,
        Math.max(0, progress.current.nextAt - Date.now()),
      );
    }
    async function launch() {
      if (!eligible()) return;
      preparing = true;
      const index = progress.current.seen;
      const image = new Image();
      image.src = `/media/fighters/${fighters[index].id}-run.webp`;
      try {
        await image.decode();
      } catch {
        progress.current.seen++;
        setComplete(progress.current.seen === 7);
        progress.current.nextAt = Date.now() + 15000;
        save();
        preparing = false;
        schedule();
        return;
      }
      preparing = false;
      if (!eligible()) return;
      progress.current.seen++;
      setComplete(progress.current.seen === 7);
      progress.current.nextAt = Date.now() + 15000;
      save();
      setActive(index);
      requestAnimationFrame(() => {
        if (!eligibleForCurrent() || !sprite.current) {
          setActive(null);
          schedule();
          return;
        }
        const horizontal =
          routes[index] === "right" || routes[index] === "left";
        const forward = routes[index] === "right" || routes[index] === "down";
        const distance = horizontal ? innerWidth + 300 : innerHeight + 260;
        const from = horizontal
          ? `translateX(${forward ? -280 : innerWidth + 20}px)`
          : `translateY(${forward ? -260 : innerHeight + 20}px)`;
        const to = horizontal
          ? `translateX(${forward ? -280 + distance : innerWidth + 20 - distance}px)`
          : `translateY(${forward ? -260 + distance : innerHeight + 20 - distance}px)`;
        motion = sprite.current.animate(
          [
            { transform: from, opacity: 0 },
            { transform: from, opacity: 1, offset: 0.06 },
            { transform: to, opacity: 1, offset: 0.94 },
            { transform: to, opacity: 0 },
          ],
          { duration: horizontal ? 1550 : 1450, easing: "linear" },
        );
        motion.onfinish = () => {
          motion = null;
          setActive(null);
          schedule();
        };
      });
    }
    function eligibleForCurrent() {
      return (
        !disposed &&
        enabledRef.current &&
        !document.hidden &&
        route.current === "/"
      );
    }
    const visible = () => schedule();
    controls.current = {
      schedule,
      replay: () => {
        end();
        progress.current = { seen: 0, nextAt: 0, off: false };
        setComplete(false);
        enabledRef.current = true;
        setEnabled(true);
        save();
        schedule();
      },
    };
    document.addEventListener("visibilitychange", visible);
    schedule();
    return () => {
      disposed = true;
      clearTimeout(timer);
      motion?.cancel();
      controls.current = null;
      document.removeEventListener("visibilitychange", visible);
    };
  }, []);
  return (
    <>
      <div
        className="hero-flyby-layer"
        data-enabled={enabled}
        aria-hidden="true"
      >
        {active !== null && (
          <div
            key={active}
            ref={sprite}
            className={`hero-flyby flyby-${routes[active]}`}
            data-hero={active + 1}
            style={
              routes[active] === "right" || routes[active] === "left"
                ? { top: `${lanes[active]}%` }
                : { left: `${lanes[active]}%` }
            }
          >
            <div className="hero-flyby-trail" />
            <FighterSprite fighter={active} size={170} />
          </div>
        )}
      </div>
      {ready && path === "/" && (
        <div className="hero-effects-controls">
          {complete && (
            <button
              type="button"
              className="hero-effects-replay"
              aria-label="Replay seven hero appearances"
              title="Replay the seven appearances"
              onClick={() => controls.current?.replay()}
            >
              <ArrowCounterClockwise size={17} aria-hidden />
            </button>
          )}
          <button
            type="button"
            className="hero-effects-toggle"
            onClick={() => setEnabled(!enabled)}
            aria-pressed={enabled}
            aria-label={
              enabled ? "Turn visual effects off" : "Turn visual effects on"
            }
            title={"Control combat, code and character effects"}
          >
            <Sparkle
              size={15}
              weight={enabled ? "fill" : "regular"}
              aria-hidden
            />
            <span>Effects {enabled ? "on" : "off"}</span>
          </button>
        </div>
      )}
    </>
  );
}
