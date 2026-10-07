"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, GithubIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { emotionSteps, links } from "@/data/site";

export function EmotionStory() {
  const reduce = useReducedMotion();

  return (
    <section className="project-story emotion-story" aria-labelledby="emotion-title">
      <div className="shell">
<div className="project-hero-copy split-title">
          <Reveal><h2 id="emotion-title">MindfulMirror</h2></Reveal>
          <Reveal delay={0.08}>
            <p>An educational experiment in facial-expression classification, local history, and optional AI-assisted reflection.</p>
          </Reveal>
        </div>

        <div className="project-kicker-row">

          <Reveal delay={0.05}><p className="project-index">FastAPI / Keras / SQLite</p></Reveal>
        </div>

        <div className="mindful-browser" role="group" aria-label="Illustrative MindfulMirror interface with sample data; not a live webcam or measured model result">
          <div className="window-bar">
            <div><i /><i /><i /></div>
            <span>127.0.0.1:8000</span>
            <b>Local-first</b>
          </div>
          <div className="mindful-grid">
            <div className="camera-panel">
              <div className="camera-frame">
                <div className="face-outline"><i /><i /><span /></div>
                <em>Webcam processed locally</em>
              </div>
              <div className="detected-emotion"><span>Detected</span><strong>Focused</strong><b>Sample</b></div>
            </div>
            <div className="history-panel">
              <span>Last 7 entries</span>
              <div className="mood-chart">
                {[46, 72, 54, 86, 64, 78, 91].map((height, index) => (
                  <motion.i
                    key={index}
                    initial={reduce ? false : { height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.06 }}
                  />
                ))}
              </div>
              <div className="mood-legend"><i />Calm <i />Focused <i />Low</div>
            </div>
            <div className="reflection-panel">
              <span>Reflection</span>
              <p>What changed before your mood improved today?</p>
              <div><i /><i /><i /></div>
            </div>
            <div className="chat-panel">
              <span>Wellness assistant</span>
              <p>Let’s break the next step into something manageable.</p>
              <small>OpenRouter · key stored locally</small>
            </div>
          </div>
          <div className="asset-note">Concept interface · Sample data, not a live app or accuracy benchmark.</div>
        </div>

        <div className="flow-rail">
          {emotionSteps.map((step, index) => (
            <Reveal key={step.index} delay={index * 0.04}>
              <article>
                <span>{step.index}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="privacy-strip">
          <Reveal>
            <p><strong>An educational prototype, not clinical advice.</strong> The local backend handles camera frames and history. Optional Gemini and OpenRouter features communicate with external AI providers; review their data handling before use.</p>
          </Reveal>
          <a className="project-cta" href={links.emotionRepo} target="_blank" rel="noreferrer">
            <GithubIcon /> Explore MindfulMirror <ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  );
}
