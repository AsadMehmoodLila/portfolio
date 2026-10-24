"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { FighterSprite } from "./fighter-sprite";
import { useEffects } from "./effects-provider";

const RotatingText = dynamic(
  () => import("@/components/vendor/react-bits/RotatingText"),
  { ssr: false, loading: () => <span>Roblox scripter</span> },
);

const roles = [
  "Roblox scripter",
  "Combat & abilities",
  "Player data",
  "Game loops",
  "UI integration",
];
const snippets = [
  [
    "local Combo = {}",
    "function Combo:Attack()",
    "  self:PlayAnimation()",
    "end",
  ],
  [
    "local inventory = {}",
    "table.insert(inventory, item)",
    "for _, item in inventory do",
    "  equip(item)",
    "end",
  ],
  [
    "local Round = {}",
    "function Round:Start()",
    "  self:SpawnPlayers()",
    "  self:BeginCountdown()",
    "end",
  ],
];

export function StageSignals() {
  const { enabled } = useEffects();
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [snippet, setSnippet] = useState(0);
  const [phase, setPhase] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (root.current) observer.observe(root.current);
    const visibility = () =>
      setVisible(
        !document.hidden &&
          !!root.current &&
          root.current.getBoundingClientRect().bottom > 0 &&
          root.current.getBoundingClientRect().top < innerHeight,
      );
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  const moving = enabled && visible;
  useEffect(() => {
    if (!moving) return;
    const timer = setInterval(() => {
      setPhase((value) => value + 1);
    }, 1800);
    const code = setInterval(
      () => setSnippet((value) => (value + 1) % snippets.length),
      5400,
    );
    return () => {
      clearInterval(timer);
      clearInterval(code);
    };
  }, [moving]);
  return (
    <div ref={root} className="stage-signals" data-moving={moving}>
      <div className="world-id">
        <span>PLAYER CLASS</span>
        <strong>
          {moving ? (
            <RotatingText
              texts={roles}
              auto={moving}
              onNext={setRoleIndex}
              rotationInterval={3600}
              splitBy="lines"
              staggerDuration={0}
              initial={{ transform: "translateY(100%)", opacity: 0 }}
              animate={{ transform: "translateY(0)", opacity: 1 }}
              exit={{ transform: "translateY(-100%)", opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            />
          ) : (
            <span>{roles[roleIndex]}</span>
          )}
        </strong>
      </div>
      <div className="stage-code" aria-hidden="true">
        <div>
          <span>Luau</span>
          <span>{"</>"}</span>
        </div>
        <pre key={snippet}>
          {snippets[snippet].map((line, index) => (
            <span key={index}>
              <i>{String(index + 1).padStart(2, "0")}</i>
              {line}
            </span>
          ))}
        </pre>
      </div>
      <div
        className="stage-combat"
        role="img"
        aria-label="Decorative pixel-art sword fighters sparring"
      >
        <div className="combat-caption">
          <span>COMBAT LOOP</span>
          <span aria-hidden>{"↗"}</span>
        </div>
        <div className="combat-floor" aria-hidden>
          <div
            className="combat-fighter combat-fighter-a"
            data-striking={phase % 2 === 0}
          >
            <FighterSprite
              fighter={0}
              action={phase % 2 === 0 ? "attack1" : "idle"}
              size={100}
              moving={moving}
            />
          </div>
          <div
            className="combat-fighter combat-fighter-b"
            data-striking={phase % 2 !== 0}
          >
            <FighterSprite
              fighter={3}
              action={phase % 2 !== 0 ? "attack2" : "idle"}
              size={100}
              moving={moving}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
