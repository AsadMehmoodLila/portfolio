"use client";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type CSSProperties,
} from "react";
import SpotlightCard from "@/components/vendor/react-bits/SpotlightCard";
import { FighterSprite } from "./fighter-sprite";
import { useEffects } from "./effects-provider";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Check,
  CodeBlock,
  Crosshair,
  UserCircle,
} from "@phosphor-icons/react";

const cards = [
  {
    topic: "The player",
    title: "Asad, a.k.a. ScriptLilla",
    icon: UserCircle,
    body: "I script Roblox gameplay and connect UI to the systems behind it. Your idea is the starting point.",
    tags: ["Gameplay scripting", "UI integration"],
  },
  {
    topic: "The build",
    title: "Think in game systems",
    icon: CodeBlock,
    body: "What can the player do? What should the server check? I break the mechanic into clear actions, states and connections.",
    tags: ["Player actions", "Server checks"],
  },
  {
    topic: "The background",
    title: "Logic, learning, debugging",
    icon: Brain,
    body: "I study Artificial Intelligence at UMT. That background feeds my interest in logic, debugging and how game systems fit together.",
    tags: ["AI student at UMT", "Logic & debugging"],
  },
  {
    topic: "Your game",
    title: "One clear mission",
    icon: Crosshair,
    body: "We agree on your game's needs, the scope and the handover. The work stays focused on those deliverables.",
    tags: ["Clear scope", "Source handover"],
  },
];

export function ProfileCards() {
  const { enabled } = useEffects();
  const [index, setIndex] = useState(0);
  const [visited, setVisited] = useState([0]);
  const panel = useRef<HTMLDivElement>(null);
  const direction = useRef(1);
  const keyboard = useRef(false);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (
      keyboard.current ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const motion = panel.current?.animate(
      [
        { opacity: 0.2, transform: `translateX(${direction.current * 36}px)` },
        { opacity: 1, transform: "translateX(0)" },
      ],
      {
        duration: 220,
        easing: getComputedStyle(document.documentElement)
          .getPropertyValue("--ease")
          .trim(),
      },
    );
    return () => motion?.cancel();
  }, [index]);
  function choose(next: number, fromKeyboard = false) {
    if (next === index || next < 0 || next >= cards.length) return;
    direction.current = next > index ? 1 : -1;
    keyboard.current = fromKeyboard;
    setIndex(next);
    setVisited((previous) =>
      previous.includes(next) ? previous : [...previous, next],
    );
  }
  function keys(event: KeyboardEvent<HTMLDivElement>) {
    const next =
      event.key === "ArrowRight"
        ? index + 1
        : event.key === "ArrowLeft"
          ? index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? cards.length - 1
              : null;
    if (next !== null) {
      event.preventDefault();
      choose(next, true);
    }
  }
  const card = cards[index];
  const Icon = card.icon;
  return (
    <SpotlightCard
      className="profile-story"
      onKeyDown={keys}
      enabled={enabled}
      spotlightColor="var(--accent)"
      intensity={0.1}
      spotlightSize={360}
      borderGlow={0.5}
      proximity={0}
      style={
        {
          "--spotlight-card-surface": "var(--surface)",
          "--spotlight-card-border": "var(--line)",
          "--spotlight-card-shadow": "none",
        } as CSSProperties
      }
    >
      <div
        className="profile-topics"
        role="group"
        aria-label="Choose a short introduction card"
      >
        {cards.map((item, position) => (
          <button
            key={item.topic}
            type="button"
            className="profile-topic"
            aria-pressed={index === position}
            aria-controls="profile-story-panel"
            onClick={(event) => choose(position, event.detail === 0)}
          >
            {visited.includes(position) && position !== index ? (
              <Check size={13} aria-hidden />
            ) : (
              <span aria-hidden>{position + 1}</span>
            )}
            <span className="profile-topic-name">{item.topic}</span>
          </button>
        ))}
      </div>
      <div className="profile-card-viewport">
        <div
          ref={panel}
          id="profile-story-panel"
          className="profile-story-panel"
          role="group"
          aria-label={`Introduction ${index + 1} of ${cards.length}`}
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="profile-card-heading">
            <span className="profile-chapter">
              <Icon size={18} weight="duotone" aria-hidden /> {card.topic}
            </span>
            <span>{String(index + 1).padStart(2, "0")} / 04</span>
          </div>
          <div className="profile-card-content">
            <div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <div className="profile-tags">
                {card.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="profile-card-art" aria-hidden>
              <span className="profile-art-grid" />
              <FighterSprite
                fighter={[0, 3, 5, 4][index]}
                action="portrait"
                size={140}
                moving={enabled}
              />
              <span className="profile-art-number">0{index + 1}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-story-controls">
        <span>
          {visited.length === cards.length
            ? "You’ve met the scripter"
            : `${visited.length} of 4 explored`}
        </span>
        <div>
          <button
            type="button"
            className="icon-button"
            aria-label="Previous introduction card"
            disabled={index === 0}
            onClick={(event) => choose(index - 1, event.detail === 0)}
          >
            <ArrowLeft size={18} aria-hidden />
          </button>
          <button
            type="button"
            className="profile-next"
            disabled={index === cards.length - 1}
            onClick={(event) => choose(index + 1, event.detail === 0)}
          >
            {index === cards.length - 1 ? "All explored" : "Next card"}
            {index === cards.length - 1 ? (
              <Check size={16} aria-hidden />
            ) : (
              <ArrowRight size={16} aria-hidden />
            )}
          </button>
        </div>
      </div>
      <div className="profile-progress" aria-hidden>
        {cards.map((_, position) => (
          <span
            key={position}
            data-visited={visited.includes(position)}
            data-current={position === index}
          />
        ))}
      </div>
      <noscript>
        <div className="profile-nojs">
          {cards.slice(1).map((item) => (
            <p key={item.topic}>
              <strong>{item.title}</strong> {item.body}
            </p>
          ))}
        </div>
      </noscript>
    </SpotlightCard>
  );
}
