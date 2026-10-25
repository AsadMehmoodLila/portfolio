"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

// Creator-sourced CC0 sheets already held locally. Source: design/COMBAT-ASSETS.md.
const heroes = [
  { id: "hero-knight", frames: 7 },
  { id: "martial-hero-3", frames: 7 },
  { id: "huntress", frames: 5 },
  { id: "wizard-pack", frames: 8 },
  { id: "martial-hero", frames: 6 },
  { id: "martial-hero-2", frames: 4 },
  { id: "medieval-warrior-pack", frames: 4 },
] as const;
const targets = "a.button,a.link-action,.mobile-navigation a,button:not(.character-canvas):not([disabled]),summary";
type Mode = "hover" | "drop" | "dash";
type Cameo = {
  id: string; frames: number; x: number; y: number; quiet: boolean;
  serial: number; mode: Mode; action: "run" | "attack1"; travel: number;
};

export function ButtonHeroes() {
  const [cameo, setCameo] = useState<Cameo | null>(null);
  const [shown, setShown] = useState(false);
  const sequence = useRef(0);

  useEffect(() => {
    let current: HTMLElement | null = null;
    let currentMode: Mode = "hover";
    let exit: ReturnType<typeof setTimeout> | undefined;
    let pointerType = "mouse";
    let taps = 0;
    let press: { x: number; y: number; target: HTMLElement } | null = null;
    let tapped: HTMLElement | null = null;
    const hover = matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const find = (target: EventTarget | null) =>
      target instanceof Element ? target.closest<HTMLElement>(targets) : null;
    const hide = () => {
      current = null;
      sequence.current++;
      setShown(false);
      clearTimeout(exit);
      exit = setTimeout(() => setCameo(null), 130);
    };
    const hideHover = () => { if (currentMode === "hover") hide(); };
    const show = async (element: HTMLElement, keyboard: boolean, touch = false) => {
      if (!touch && current === element) return;
      if (element.matches(":disabled,[aria-disabled='true']")) return;
      // Capture before a button changes the form or navigates away.
      const box = element.getBoundingClientRect();
      const serial = ++sequence.current;
      current = element;
      currentMode = touch ? (taps++ % 2 === 0 ? "drop" : "dash") : "hover";
      const mode = currentMode;
      clearTimeout(exit);
      setShown(false);
      const label = element.textContent?.trim() || element.getAttribute("aria-label") || "";
      const hash = [...label].reduce((sum, c) => sum * 31 + c.charCodeAt(0) >>> 0, 0);
      const hero = heroes[(hash + (touch ? taps : 0)) % heroes.length];
      const action = mode === "dash" ? "run" : "attack1";
      const frames = action === "run" ? 8 : hero.frames;
      const quiet = keyboard || reduced.matches;
      const image = new Image();
      image.src = `/media/fighters/${hero.id}-${action}.webp`;
      try { await image.decode(); } catch { return; }
      if (sequence.current !== serial || current !== element) return;
      const size = 112;
      const inset = mode === "drop" ? 20 : 4;
      const clamp = (n: number, max: number) => Math.max(inset, Math.min(max, n));
      const x = mode === "dash" && !quiet ? 4 : clamp(box.right - size + 12, innerWidth - size - inset);
      const y = clamp(box.top >= size + 8 ? box.top - size + 12 : box.bottom - 10, innerHeight - size - (mode === "drop" ? 48 : 4));
      setCameo({ id: hero.id, frames, x, y, quiet, serial, mode, action, travel: Math.min(280, innerWidth - size - 8) });
      requestAnimationFrame(() => { if (sequence.current === serial) setShown(true); });
      if (touch) {
        exit = setTimeout(() => {
          if (sequence.current !== serial) return;
          current = null;
          setShown(false);
          setCameo(null);
        }, quiet ? 550 : 850);
      }
    };
    const over = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !hover.matches) return;
      const target = find(event.target);
      if (target) void show(target, false);
    };
    const out = (event: PointerEvent) => {
      if (currentMode === "hover" && current && !(event.relatedTarget instanceof Node && current.contains(event.relatedTarget))) hide();
    };
    const focus = (event: FocusEvent) => {
      const target = event.target instanceof HTMLElement ? event.target : null;
      if (target?.matches(targets) && target.matches(":focus-visible") && pointerType !== "touch" && pointerType !== "pen") void show(target, true);
    };
    const down = (event: PointerEvent) => {
      pointerType = event.pointerType;
      tapped = null;
      const target = find(event.target);
      press = target && (pointerType === "touch" || pointerType === "pen") ? { x: event.clientX, y: event.clientY, target } : null;
      hide();
    };
    const up = (event: PointerEvent) => {
      if (press && find(event.target) === press.target && Math.hypot(event.clientX - press.x, event.clientY - press.y) < 12) tapped = press.target;
      press = null;
    };
    const cancel = () => { press = null; tapped = null; };
    const activate = (event: MouseEvent) => {
      const target = find(event.target);
      if (target && target === tapped && (pointerType === "touch" || pointerType === "pen")) {
        tapped = null;
        void show(target, false, true);
      }
    };
    const keys = () => { pointerType = "keyboard"; };
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);
    document.addEventListener("pointerdown", down, true);
    document.addEventListener("pointerup", up, true);
    document.addEventListener("pointercancel", cancel, true);
    document.addEventListener("click", activate, true);
    document.addEventListener("keydown", keys);
    document.addEventListener("focusin", focus);
    document.addEventListener("focusout", hideHover);
    document.addEventListener("visibilitychange", hide);
    window.addEventListener("scroll", hideHover, { passive: true });
    window.addEventListener("popstate", hideHover);
    window.addEventListener("resize", hide);
    return () => {
      sequence.current++;
      clearTimeout(exit);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
      document.removeEventListener("pointerdown", down, true);
      document.removeEventListener("pointerup", up, true);
      document.removeEventListener("pointercancel", cancel, true);
      document.removeEventListener("click", activate, true);
      document.removeEventListener("keydown", keys);
      document.removeEventListener("focusin", focus);
      document.removeEventListener("focusout", hideHover);
      document.removeEventListener("visibilitychange", hide);
      window.removeEventListener("scroll", hideHover);
      window.removeEventListener("popstate", hideHover);
      window.removeEventListener("resize", hide);
    };
  }, []);

  if (!cameo) return null;
  return (
    <span
      className="button-hero"
      aria-hidden="true"
      data-shown={shown}
      data-quiet={cameo.quiet}
      data-hero={cameo.id}
      data-mode={cameo.mode}
      style={{ left: cameo.x, top: cameo.y, "--hero-travel": `${cameo.travel}px` } as CSSProperties}
    >
      <span className="button-hero-flight" key={cameo.serial}>
        <span className="button-hero-window">
          <img
            src={`/media/fighters/${cameo.id}-${cameo.action}.webp`}
            width={112 * cameo.frames}
            height={112}
            alt=""
            style={{ width: 112 * cameo.frames, "--hero-frames": cameo.frames, "--hero-end": `-${112 * cameo.frames}px` } as CSSProperties}
          />
        </span>
      </span>
    </span>
  );
}
