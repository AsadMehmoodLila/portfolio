"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, PlayIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { links, robloxTimeline } from "@/data/site";

export function RobloxStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [imageFailed, setImageFailed] = useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -50]);

  return (
    <section id="work" ref={sectionRef} className="project-story roblox-story">
      <div className="shell">
        <div className="project-kicker-row">
          <Reveal><p className="eyebrow">01 · Published game</p></Reveal>
          <Reveal delay={0.05}><p className="project-index">Roblox / Lua / Live</p></Reveal>
        </div>

        <div className="project-hero-copy">
          <Reveal>
            <h2>Escape Tsunami<br />with Dragons</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p>A survival experience built around one clear pressure: keep moving, earn rewards, and survive the wave.</p>
          </Reveal>
        </div>

        <motion.div className="roblox-media" style={{ y: mediaY }}>
          {!imageFailed ? (
            <img
              src="https://www.roblox.com/asset-thumbnail/image?assetId=79706056547341&width=768&height=432&format=png"
              alt="Escape Tsunami with Dragons Roblox experience thumbnail"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="media-fallback" role="img" aria-label="Gameplay media placeholder">
              <div className="wave-lines" />
              <span>Gameplay visual</span>
              <strong>Escape Tsunami with Dragons</strong>
              <small>Replace with a 1920×1080 screenshot or MP4 in public/media.</small>
            </div>
          )}
          <div className="media-vignette" />
          <div className="media-stat"><strong>30K+</strong><span>visits</span></div>
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
          <Reveal><p className="eyebrow">Development timeline</p></Reveal>
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
