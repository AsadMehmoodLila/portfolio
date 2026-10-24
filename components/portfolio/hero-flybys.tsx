"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Sparkle } from "@phosphor-icons/react";

const KEY = "scriptlilla-hero-session-v1";
type Progress = { seen: number; nextAt: number; off: boolean };
const routes = ["right", "left", "down", "up", "right", "left", "down"];
const lanes = [21, 56, 72, 28, 40, 25, 18];

export function HeroFlybys() {
  const path = usePathname();
  const route = useRef(path);
  const sprite = useRef<HTMLDivElement>(null);
  const progress = useRef<Progress>({ seen: 0, nextAt: 0, off: false });
  const controls = useRef<{ schedule: () => void; toggle: () => void } | null>(
    null,
  );
  const [active, setActive] = useState<number | null>(null);
  const [enabled, setEnabled] = useState(true);
  const [available, setAvailable] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    route.current = path;
    controls.current?.schedule();
  }, [path]);
  useEffect(() => {
    let disposed = false,
      timer = 0,
      motion: Animation | null = null,
      preparing = false;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const saver = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;
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
    setEnabled(!progress.current.off);
    setAvailable(true);
    setReduced(preference.matches);
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
      !progress.current.off &&
      progress.current.seen < 7 &&
      !preference.matches &&
      !saver &&
      !document.hidden &&
      route.current === "/";
    function schedule() {
      clearTimeout(timer);
      if (!eligible()) {
        if (
          document.hidden ||
          route.current !== "/" ||
          preference.matches ||
          progress.current.off
        )
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
      image.src = `/media/flybys/hero-${index + 1}.webp`;
      try {
        await image.decode();
      } catch {
        progress.current.seen++;
        progress.current.nextAt = Date.now() + 15000;
        save();
        preparing = false;
        schedule();
        return;
      }
      preparing = false;
      if (!eligible()) return;
      progress.current.seen++;
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
        !progress.current.off &&
        !document.hidden &&
        !preference.matches &&
        route.current === "/"
      );
    }
    const preferenceChanged = () => {
      setReduced(preference.matches);
      schedule();
    };
    const visible = () => schedule();
    controls.current = {
      schedule,
      toggle: () => {
        progress.current.off = !progress.current.off;
        setEnabled(!progress.current.off);
        save();
        schedule();
      },
    };
    preference.addEventListener("change", preferenceChanged);
    document.addEventListener("visibilitychange", visible);
    schedule();
    return () => {
      disposed = true;
      clearTimeout(timer);
      motion?.cancel();
      controls.current = null;
      preference.removeEventListener("change", preferenceChanged);
      document.removeEventListener("visibilitychange", visible);
    };
  }, []);
  return (
    <>
      <div className="hero-flyby-layer" aria-hidden="true">
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
            <img
              src={`/media/flybys/hero-${active + 1}.webp`}
              width={240}
              height={240}
              alt=""
            />
          </div>
        )}
      </div>
      {available && path === "/" && (
        <button
          type="button"
          className="hero-effects-toggle"
          onClick={() => controls.current?.toggle()}
          aria-pressed={enabled && !reduced}
          disabled={reduced}
          aria-label={
            reduced
              ? "Hero effects disabled for reduced motion"
              : enabled
                ? "Turn hero fly-by effects off"
                : "Turn hero fly-by effects on"
          }
          title={
            reduced
              ? "Reduced motion is enabled"
              : "Seven brief fly-bys, once per tab"
          }
        >
          <Sparkle
            size={15}
            weight={enabled && !reduced ? "fill" : "regular"}
            aria-hidden
          />
          <span>Effects {enabled && !reduced ? "on" : "off"}</span>
        </button>
      )}
    </>
  );
}
