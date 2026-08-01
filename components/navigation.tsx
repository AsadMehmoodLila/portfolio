"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { ArrowUpRight, CloseIcon, MenuIcon } from "@/components/ui/icons";
import { site } from "@/data/site";

const items = [
  { id: "work", label: "Work" },
  { id: "certificates", label: "Certificates" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
] as const;

export function Navigation() {
  const [active, setActive] = useState("work");
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -58% 0px", threshold: [0.08, 0.2, 0.45] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-nav-wrap">
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Asad Mehmood, back to top">
          <span className="brand-mark">AM</span>
          <span className="brand-name">{site.name}</span>
        </a>

        <div className="nav-links" aria-label="Page sections">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? "nav-link active" : "nav-link"}
            >
              {item.label}
            </a>
          ))}
        </div>

        <MagneticLink className="nav-cta" href={site.github} target="_blank" rel="noreferrer">
          GitHub
          <ArrowUpRight />
        </MagneticLink>

        <button
          type="button"
          className="menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="mobile-nav"
            initial={reduce ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {items.map((item, index) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * index }}
              >
                <span>0{index + 1}</span>
                {item.label}
              </motion.a>
            ))}
            <a className="mobile-github" href={site.github} target="_blank" rel="noreferrer">
              GitHub profile <ArrowUpRight />
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
