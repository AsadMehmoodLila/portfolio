"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "@/components/ui/icons";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { site } from "@/data/site";

const lines = ["AI.", "Games.", "Software."];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="hero shell" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-copy">
          <motion.p
            className="eyebrow hero-eyebrow"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            {site.degree} · Roblox developer
          </motion.p>

          <h1 id="hero-title" className="hero-title" aria-label="AI. Games. Software. Built with purpose.">
            {lines.map((line, index) => (
              <span className="hero-line-mask" key={line}>
                <motion.span
                  className={line === "Games." ? "hero-line accent" : "hero-line"}
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.16 + index * 0.11, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="hero-line-mask purpose-mask">
              <motion.span
                className="hero-purpose"
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.53, ease: [0.22, 1, 0.36, 1] }}
              >
                Built with purpose.
              </motion.span>
            </span>
          </h1>

          <motion.div
            className="hero-bottom"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>{site.intro}</p>
            <div className="hero-actions">
              <MagneticLink href="#work" className="button button-primary">
                Explore selected work
                <ArrowUpRight />
              </MagneticLink>
              <a href={site.github} className="text-link" target="_blank" rel="noreferrer">
                View GitHub <ArrowUpRight />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.aside
          className="hero-profile"
          initial={reduce ? false : { opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.82, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Profile overview"
        >
          <div className="availability"><span />{site.availability}</div>
          <dl>
            <div><dt>Name</dt><dd>{site.name}</dd></div>
            <div><dt>Based in</dt><dd>{site.location}</dd></div>
            <div><dt>Degree</dt><dd>{site.degree}</dd></div>
            <div><dt>University</dt><dd>UMT · 2023–2027</dd></div>
          </dl>
          <div className="profile-line" />
          <p className="profile-note">Focused on useful AI products, shipped game systems, and clean software execution.</p>
        </motion.aside>
      </div>
      <motion.div
        className="hero-scroll-hint"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span>Scroll to see the work</span>
        <i />
      </motion.div>
    </section>
  );
}
