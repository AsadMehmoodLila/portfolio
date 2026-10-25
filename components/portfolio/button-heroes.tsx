"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";

// Original creator's CC0 sheets, already held locally. Source: design/COMBAT-ASSETS.md.
const heroes = [
  { id: "hero-knight", frames: 7 },
  { id: "martial-hero-3", frames: 7 },
  { id: "huntress", frames: 5 },
  { id: "wizard-pack", frames: 8 },
  { id: "martial-hero", frames: 6 },
  { id: "martial-hero-2", frames: 4 },
  { id: "medieval-warrior-pack", frames: 4 },
] as const;
const targets = "a.button,a.link-action,button:not(.character-canvas):not([disabled]),summary";
type Cameo = { id: string; frames: number; x: number; y: number; quiet: boolean; serial: number };

export function ButtonHeroes() {
  const [cameo, setCameo] = useState<Cameo | null>(null);
  const [shown, setShown] = useState(false);
  const sequence = useRef(0);
  const path = usePathname();

  useEffect(() => {
    setCameo(null);
    setShown(false);
    let current: HTMLElement | null = null;
    let exit: ReturnType<typeof setTimeout> | undefined;
    let pointerType = "mouse";
    const hover = matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const hide = () => {
      current = null;
      sequence.current++;
      setShown(false);
      clearTimeout(exit);
      exit = setTimeout(() => setCameo(null), 130);
    };
    const show = async (element: HTMLElement, keyboard: boolean) => {
      if (current === element) return;
      if (element.matches(":disabled,[aria-disabled='true']")) return;
      current = element;
      const serial = ++sequence.current;
      clearTimeout(exit);
      setShown(false);
      const label = element.textContent?.trim() || element.getAttribute("aria-label") || "";
      const hash = [...label].reduce((sum, c) => sum * 31 + c.charCodeAt(0) >>> 0, 0);
      const hero = heroes[hash % heroes.length];
      const image = new Image();
      image.src = `/media/fighters/${hero.id}-attack1.webp`;
      try { await image.decode(); } catch { return; }
      if (sequence.current !== serial || current !== element) return;
      const box = element.getBoundingClientRect();
      const size = 112;
      const x = Math.max(4, Math.min(innerWidth - size - 4, box.right - size + 12));
      const y = box.top >= size + 8 ? box.top - size + 12 : box.bottom - 10;
      setCameo({ ...hero, x, y, quiet: keyboard || reduced.matches, serial });
      requestAnimationFrame(() => {
        if (sequence.current === serial) setShown(true);
      });
    };
    const over = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !hover.matches) return;
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>(targets) : null;
      if (target) void show(target, false);
    };
    const out = (event: PointerEvent) => {
      if (current && !(event.relatedTarget instanceof Node && current.contains(event.relatedTarget))) hide();
    };
    const focus = (event: FocusEvent) => {
      const target = event.target instanceof HTMLElement ? event.target : null;
      if (target?.matches(targets) && target.matches(":focus-visible") && pointerType !== "touch") void show(target, true);
    };
    const down = (event: PointerEvent) => { pointerType = event.pointerType; hide(); };
    const keys = () => { pointerType = "keyboard"; };
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);
    document.addEventListener("pointerdown", down);
    document.addEventListener("keydown", keys);
    document.addEventListener("focusin", focus);
    document.addEventListener("focusout", hide);
    document.addEventListener("visibilitychange", hide);
    window.addEventListener("scroll", hide, { passive: true });
    window.addEventListener("resize", hide);
    return () => {
      sequence.current++;
      clearTimeout(exit);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("keydown", keys);
      document.removeEventListener("focusin", focus);
      document.removeEventListener("focusout", hide);
      document.removeEventListener("visibilitychange", hide);
      window.removeEventListener("scroll", hide);
      window.removeEventListener("resize", hide);
    };
  }, [path]);

  if (!cameo) return null;
  return (
    <span
      className="button-hero"
      aria-hidden="true"
      data-shown={shown}
      data-quiet={cameo.quiet}
      data-hero={cameo.id}
      style={{ left: cameo.x, top: cameo.y }}
    >
      <span className="button-hero-window" key={cameo.serial}>
        <img
          src={`/media/fighters/${cameo.id}-attack1.webp`}
          width={112 * cameo.frames}
          height={112}
          alt=""
          style={{ width: 112 * cameo.frames, "--hero-frames": cameo.frames, "--hero-end": `-${112 * cameo.frames}px` } as CSSProperties}
        />
      </span>
    </span>
  );
}
