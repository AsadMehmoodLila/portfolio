"use client";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
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
  },
  {
    topic: "The build",
    title: "Think in game systems",
    icon: CodeBlock,
    body: "What can the player do? What should the server check? I break the mechanic into clear actions, states and connections.",
  },
  {
    topic: "The background",
    title: "Logic, learning, debugging",
    icon: Brain,
    body: "I study Artificial Intelligence at UMT. That background feeds my interest in logic, debugging and how game systems fit together.",
  },
  {
    topic: "Your game",
    title: "One clear mission",
    icon: Crosshair,
    body: "We agree on your game's needs, the scope and the handover. The work stays focused on those deliverables.",
  },
];

export function ProfileCards() {
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
    <div className="profile-story" onKeyDown={keys}>
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
            {item.topic}
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
            <Icon size={30} weight="duotone" aria-hidden />
            <span>{String(index + 1).padStart(2, "0")} / 04</span>
          </div>
          <h3>{card.title}</h3>
          <p>{card.body}</p>
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
      <noscript>
        <div className="profile-nojs">
          {cards.slice(1).map((item) => (
            <p key={item.topic}>
              <strong>{item.title}</strong> {item.body}
            </p>
          ))}
        </div>
      </noscript>
    </div>
  );
}
