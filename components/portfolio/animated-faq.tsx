"use client";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Plus } from "@phosphor-icons/react";

export function AnimatedFaq({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const details = useRef<HTMLDetailsElement>(null);
  const summary = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation | null>(null);
  const textAnimation = useRef<Animation | null>(null);
  const desired = useRef(false);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => {
      if (preference.matches) animation.current?.finish();
    };
    preference.addEventListener("change", finish);
    return () => {
      preference.removeEventListener("change", finish);
      animation.current?.cancel();
      textAnimation.current?.cancel();
    };
  }, []);
  function toggle(event: MouseEvent<HTMLElement>) {
    event.preventDefault();
    const element = details.current;
    if (!element || !summary.current || !content.current) return;
    const start = element.getBoundingClientRect().height;
    const next = !desired.current;
    desired.current = next;
    setExpanded(next);
    animation.current?.cancel();
    textAnimation.current?.cancel();
    if (
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      event.detail === 0
    ) {
      element.style.height = "";
      element.open = next;
      return;
    }
    element.open = true;
    element.style.height = "";
    const style = getComputedStyle(element);
    const chrome =
      parseFloat(style.paddingTop) +
      parseFloat(style.paddingBottom) +
      parseFloat(style.borderTopWidth) +
      parseFloat(style.borderBottomWidth);
    const end = next
      ? element.getBoundingClientRect().height
      : summary.current.getBoundingClientRect().height + chrome;
    element.style.height = `${start}px`;
    const easing = getComputedStyle(document.documentElement)
      .getPropertyValue("--ease")
      .trim();
    const running = element.animate(
      [{ height: `${start}px` }, { height: `${end}px` }],
      { duration: 220, easing },
    );
    animation.current = running;
    textAnimation.current = content.current.animate(
      next
        ? [
            { opacity: 0.2, transform: "translateY(-5px)" },
            { opacity: 1, transform: "translateY(0)" },
          ]
        : [{ opacity: 1 }, { opacity: 0 }],
      { duration: next ? 200 : 160, easing },
    );
    running.onfinish = () => {
      if (animation.current !== running) return;
      element.open = next;
      element.style.height = "";
      animation.current = null;
    };
  }
  return (
    <details className="animated-faq" ref={details} data-expanded={expanded}>
      <summary ref={summary} onClick={toggle}>
        {question}
        <Plus className="faq-symbol" size={18} aria-hidden />
      </summary>
      <div className="faq-answer" ref={content}>
        <p>{answer}</p>
      </div>
    </details>
  );
}
