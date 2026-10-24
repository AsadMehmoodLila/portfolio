"use client";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type CSSProperties,
} from "react";
import SpotlightCard from "@/components/vendor/react-bits/SpotlightCard";
import Link from "next/link";
import { FighterSprite } from "./fighter-sprite";
import { useEffects } from "./effects-provider";
import { ArrowLeft, ArrowRight, Check } from "@phosphor-icons/react";

const cards = [
  {
    topic: "Your idea",
    title: "The idea is only the start",
    body: "I’m Asad, a.k.a. ScriptLilla. I script Roblox gameplay and connect the UI to what happens in-game.",
    next: "Who decides what happens?",
    tags: ["Gameplay scripting", "UI integration"],
  },
  {
    topic: "The logic",
    title: "The server gets the final say",
    body: "A button press is just the beginning. I break the mechanic into player actions, states and server checks.",
    next: "What about when it breaks?",
    tags: ["Player actions", "Server checks"],
  },
  {
    topic: "The person",
    title: "The interesting part is what breaks",
    body: "I study Artificial Intelligence at UMT. Tracing bugs and untangling game logic is the part I enjoy.",
    next: "Where does my game fit?",
    tags: ["AI student at UMT", "Logic & debugging"],
  },
  {
    topic: "Your game",
    title: "Your game starts here",
    body: "Tell me what the player should do. We agree on the scope and source handover before work starts.",
    next: "Bring your idea",
    tags: ["Clear scope", "Source handover"],
  },
];

export function ProfileCards() {
  const { enabled } = useEffects();
  const [index, setIndex] = useState(0);
  const [visited, setVisited] = useState([0]);
  const [visible, setVisible] = useState(false);
  const [reacting, setReacting] = useState(false);
  const [reactionId, setReactionId] = useState(0);
  const reactionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const direction = useRef(1);
  const keyboard = useRef(false);
  const first = useRef(true);
  useEffect(() => {
    const node = panel.current;
    const update = () => {
      const rect = node?.getBoundingClientRect();
      setVisible(
        !!rect && !document.hidden && rect.bottom > 0 && rect.top < innerHeight,
      );
    };
    const observer = new IntersectionObserver(update, { threshold: 0.1 });
    if (node) observer.observe(node);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      if (reactionTimer.current) clearTimeout(reactionTimer.current);
    };
  }, []);
  function react() {
    if (reactionTimer.current) clearTimeout(reactionTimer.current);
    setReacting(true);
    setReactionId((value) => value + 1);
    reactionTimer.current = setTimeout(() => setReacting(false), 850);
  }
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
    if (next < 0 || next >= cards.length) return;
    react();
    if (next === index) return;
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
            <button
              type="button"
              className="profile-card-art"
              aria-label="Play this character’s sword move"
              onClick={react}
              data-reaction={reacting}
            >
              <FighterSprite
                key={`${index}-${reacting}-${reactionId}`}
                fighter={[0, 3, 5, 4][index]}
                action={reacting ? "attack1" : "portrait"}
                size={reacting ? 220 : 96}
                moving={visible && (enabled || reacting)}
              />
            </button>
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
          {index === cards.length - 1 ? (
            <Link href="/contact/" prefetch={false} className="profile-next">
              {card.next}
              <ArrowRight size={16} aria-hidden />
            </Link>
          ) : (
            <button
              type="button"
              className="profile-next"
              onClick={(event) => choose(index + 1, event.detail === 0)}
            >
              {card.next}
              <ArrowRight size={16} aria-hidden />
            </button>
          )}
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
    </SpotlightCard>
  );
}
