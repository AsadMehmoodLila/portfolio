"use client";
import { useEffect, useState } from "react";
import { StarFour } from "@phosphor-icons/react";
import { FighterSprite } from "./fighter-sprite";

// The licensed Twemoji sun and Phosphor star share one cancellable CSS timeline.
export function SunCinematic({ quiet: initialQuiet }: { quiet: boolean }) {
  const [reduced, setReduced] = useState(false);
  const quiet = initialQuiet || reduced;
  const [phase, setPhase] = useState("arrival");
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const cues = [
      setTimeout(() => setPhase("impact"), 1600),
      setTimeout(() => setPhase("consuming"), 3300),
      setTimeout(() => setPhase("closing"), 4400),
    ];
    return () => cues.forEach(clearTimeout);
  }, []);
  return (
    <div
      className="solar-cinematic"
      data-motion={quiet ? "reduced" : "full"}
      data-phase={phase}
      aria-hidden="true"
    >
      <div className="solar-beam">
        <div />
      </div>
      <img
        className="solar-sun"
        src="/media/sun.svg"
        alt=""
        width={180}
        height={180}
      />
      <div className="solar-target">
        <div className="solar-impact-ring" />
        <div className="solar-portal">
          <div className="solar-portal-halo" />
          <div className="solar-portal-disk" />
          <div className="solar-portal-core" />
        </div>
        <div className="solar-projectile">
          <StarFour className="solar-shuriken" size={160} weight="fill" />
          <div className="solar-quote">
            <span>Sun style · Flashbang breaker</span>
            <strong>
              Destroyed that
              <br />
              flashbang
            </strong>
            <small>Warm mode unlocked</small>
          </div>
        </div>
        <div className="solar-witness">
          <FighterSprite
            fighter={1}
            action={quiet ? "portrait" : "attack2"}
            size={160}
            moving={!quiet}
          />
        </div>
      </div>
    </div>
  );
}
