"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, PlayIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { links, robloxTimeline } from "@/data/site";

export function RobloxStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -50]);

  return (
    <section id="work" ref={sectionRef} className="project-story roblox-story">
      <div className="shell">
<div className="project-hero-copy">
          <Reveal>
            <h2>Escape Tsunami<br />with Dragons</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p>A survival experience built around one clear pressure: keep moving, earn rewards, and survive the wave.</p>
          </Reveal>
        </div>

        <div className="project-kicker-row">

          <Reveal delay={0.05}><p className="project-index">Roblox / Lua / Live</p></Reveal>
        </div>

        <motion.div className="roblox-media" style={{ y: mediaY }}>
          <div className="media-fallback" role="img" aria-label="Abstract wave artwork illustrating the survival game, not a gameplay screenshot">
            <div className="wave-lines" aria-hidden="true" />
            <span>Published Roblox experience</span><strong>Keep moving.<br />Survive the wave.</strong>
            <small>Concept artwork · Open Roblox to see the game.</small>
          </div>
          <a className="media-play" href={links.robloxGame} target="_blank" rel="noreferrer">
            <PlayIcon /> Play on Roblox
          </a>
        </motion.div>

        <div className="project-facts">
          <Reveal>
            <article>
              <span>What shipped</span>
              <p>Tsunami rounds, lucky-block rewards, collectible dragons, music, tools, announcements, and progression systems.</p>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article>
              <span>The hard part</span>
              <p>Making a large moving hazard feel smooth while protecting server performance and validating player actions.</p>
            </article>
          </Reveal>
          <Reveal delay={0.16}>
            <article>
              <span>What it taught me</span>
              <p>Shipping matters. Performance, security, player behaviour, and iteration become real only after people play.</p>
            </article>
          </Reveal>
        </div>

        <div className="timeline-wrap">

          <ol className="project-timeline">
            {robloxTimeline.map((item, index) => (
              <motion.li
                key={item.label}
                initial={reduce ? false : { opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{item.label}</h3><p>{item.body}</p></div>
              </motion.li>
            ))}
          </ol>
        </div>

        <Reveal>
          <a className="project-cta" href={links.robloxGame} target="_blank" rel="noreferrer">
            Open the live experience <ArrowUpRight />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
