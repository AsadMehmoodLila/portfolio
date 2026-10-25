"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, GithubIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { links, studyBuddySteps } from "@/data/site";

function Step({
  step,
  index,
  setActive,
}: {
  step: (typeof studyBuddySteps)[number];
  index: number;
  setActive: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-38% 0px -38% 0px" });

  useEffect(() => {
    if (inView) setActive(index);
  }, [inView, index, setActive]);

  return (
    <div ref={ref} className="workflow-copy-step">
      <span>{step.index}</span>
      <h3>{step.title}</h3>
      <p>{step.body}</p>
      <small>{step.signal}</small>
    </div>
  );
}

function StudyBuddyPreview({ active }: { active: number }) {
  const step = studyBuddySteps[active];
  const reduce = useReducedMotion();
  return (
    <div className="product-window study-window">
      <div className="window-bar">
        <div><i /><i /><i /></div>
        <span>study_buddy / workspace</span>
        <b>AI study system</b>
      </div>
      <div className="study-sidebar">
        {studyBuddySteps.map((item, index) => (
          <span key={item.index} className={index === active ? "active" : ""}>{item.index}</span>
        ))}
      </div>
      <motion.div
        className="study-stage"
        key={step.index}
        initial={reduce ? false : { opacity: 1, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        <p>{step.signal}</p>
        <h4>{step.title}</h4>
        {active === 0 && (
          <div className="upload-board">
            <span>lecture-06.pdf</span><span>operating-systems.pptx</span><span>notes.md</span>
          </div>
        )}
        {active === 1 && (
          <div className="context-board">
            <i style={{ width: "92%" }} /><i style={{ width: "74%" }} /><i style={{ width: "84%" }} />
            <div>Answer grounded in uploaded material</div>
          </div>
        )}
        {active === 2 && (
          <div className="tool-board">
            <span>Study notes</span><span>24 flashcards</span><span>10-question quiz</span>
          </div>
        )}
        {active === 3 && (
          <div className="roadmap-board">
            {["Foundations", "Core concepts", "Practice", "Review"].map((item, index) => (
              <div key={item}><b>0{index + 1}</b><span>{item}</span></div>
            ))}
          </div>
        )}
        {active === 4 && (
          <div className="analytics-board">
            <div><strong>78%</strong><span>Example quiz score</span></div>
            <div><strong>6</strong><span>Example sessions</span></div>
            <div className="mini-chart"><i /><i /><i /><i /><i /><i /></div>
          </div>
        )}
      </motion.div>
      <div className="asset-note">Concept interface · Illustrative study data, not measured user outcomes.</div>
    </div>
  );
}

export function StudyBuddyStory() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section className="project-story study-story" aria-labelledby="study-title">
      <div className="shell">
<div className="project-hero-copy split-title">
          <Reveal>
            <h2 id="study-title">Study Buddy</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p>Static course files become a grounded study workflow: understand, practise, focus, and measure progress.</p>
          </Reveal>
        </div>

        <div className="project-kicker-row">

          <Reveal delay={0.05}><p className="project-index">Team project · Streamlit / Python</p></Reveal>
        </div>

        <Reveal>
          <div className="team-note">
            <span>Built with</span>
            <strong>Abdul Rehman · Adeel Mughal · Asad Mehmood</strong>
            <small>CreateX AI App Development project</small>
          </div>
        </Reveal>

        <div className="workflow-layout">
          <div className="workflow-visual">
            <div className="sticky-visual"><StudyBuddyPreview active={active} /></div>
          </div>
          <div className="workflow-copy">
            {studyBuddySteps.map((step, index) => (
              <Step key={step.index} step={step} index={index} setActive={setActive} />
            ))}
          </div>
        </div>

        <motion.a
          className="project-cta"
          href={links.studyBuddyRepo}
          target="_blank"
          rel="noreferrer"
          whileHover={reduce ? undefined : { x: 4 }}
        >
          <GithubIcon /> View the repository <ArrowUpRight />
        </motion.a>
      </div>
    </section>
  );
}
