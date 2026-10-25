"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function SunCinematic({
  quiet: initialQuiet,
  onWarm,
  onComplete,
}: {
  quiet: boolean;
  onWarm: () => void;
  onComplete: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [phase, setPhase] = useState("arrival");
  const [started, setStarted] = useState(false);
  const quiet = initialQuiet || reduced;
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => {
      media.removeEventListener("change", update);
    };
  }, []);
  useEffect(() => {
    let alive = true;
    Promise.all(
      ["/media/vfx/solar-orb.webp", "/media/vfx/screen-tear.webp"].map(
        (src) => {
          const image = new Image();
          image.src = src;
          return image.decode();
        },
      ),
    )
      .then(() => {
        if (alive) setStarted(true);
      })
      .catch(() => {
        if (alive) {
          onWarm();
          onComplete();
        }
      });
    return () => {
      alive = false;
    };
  }, [onWarm, onComplete]);
  useEffect(() => {
    if (!started) return;
    const cues = [
      setTimeout(() => setPhase("beams"), 450),
      setTimeout(() => setPhase("impact"), 700),
      setTimeout(onWarm, 1300),
      setTimeout(() => setPhase("consuming"), 1650),
      setTimeout(() => setPhase("closing"), 2200),
      setTimeout(onComplete, 2700),
    ];
    return () => cues.forEach(clearTimeout);
  }, [started, onWarm, onComplete]);
  useLayoutEffect(() => {
    const place = () => {
      if (!root.current) return;
      const hero = document.querySelector(".hero")?.getBoundingClientRect();
      const visual = document
        .querySelector(".hero-visual")
        ?.getBoundingClientRect();
      const dock = document
        .querySelector(".system-dock")
        ?.getBoundingClientRect();
      const mobile = innerWidth <= 700;
      const diameter = mobile ? 150 : Math.min(200, innerWidth * 0.15);
      const clamp = (n: number, min: number, max: number) =>
        Math.min(max, Math.max(min, n));
      // The impact belongs to the empty lower-left area, never the avatar stage.
      const x = mobile
        ? 85
        : hero
          ? hero.left + hero.width * 0.49
          : innerWidth * 0.35;
      const y = clamp(
        mobile
          ? innerHeight - 95
          : hero
            ? hero.bottom - 105
            : innerHeight * 0.67,
        210,
        Math.min(
          innerHeight - diameter * 0.56,
          !mobile && dock ? dock.top - diameter / 2 - 14 : Infinity,
        ),
      );
      const safeX =
        visual && !mobile ? Math.min(x, visual.left - diameter * 0.55) : x;
      const sunX = mobile
        ? 65
        : hero
          ? hero.left + hero.width * 0.12
          : innerWidth * 0.15;
      const sunY = mobile ? 125 : Math.max(130, hero ? hero.top + 45 : 150);
      const angle = (Math.atan2(y - sunY, safeX - sunX) * 180) / Math.PI;
      const styles = root.current.style;
      for (const [key, value] of Object.entries({
        "--impact-x": `${safeX}px`,
        "--impact-y": `${y}px`,
        "--hole-size": `${diameter}px`,
        "--sun-x": `${sunX}px`,
        "--sun-y": `${sunY}px`,
        "--beam-length": `${Math.hypot(safeX - sunX, y - sunY)}px`,
        "--beam-angle": `${angle}deg`,
      }))
        styles.setProperty(key, value);
      const ends = [
        [-0.05, 0.9],
        [0.18, 1.1],
        [0.48, 1.1],
        [0.82, 1.1],
        [1.08, 0.9],
        [1.08, 0.57],
        [1.08, 0.24],
      ];
      root.current
        .querySelectorAll<HTMLElement>(".solar-ray")
        .forEach((ray, index) => {
          const [rx, ry] = ends[index];
          const dx = innerWidth * rx - sunX,
            dy = innerHeight * ry - sunY;
          ray.style.setProperty(
            "--ray-angle",
            `${(Math.atan2(dy, dx) * 180) / Math.PI}deg`,
          );
          ray.style.setProperty("--ray-length", `${Math.hypot(dx, dy)}px`);
          ray.style.setProperty("--ray-delay", `${index * 15}ms`);
        });
      root.current.dataset.placed = "true";
    };
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, { passive: true });
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place);
    };
  }, []);
  return (
    <div
      ref={root}
      className="solar-cinematic"
      data-motion={quiet ? "reduced" : "full"}
      data-phase={phase}
      data-started={started}
      aria-hidden="true"
    >
      <div className="solar-warmth" />
      <div className="solar-ray-field">
        {Array.from({ length: 7 }, (_, index) => (
          <div key={index} className="solar-ray">
            <span />
          </div>
        ))}
      </div>
      <div className="solar-beam">
        <div className="solar-beam-core" />
      </div>
      <div className="solar-sun-position">
        <img
          className="solar-sun"
          src="/media/vfx/solar-orb.webp"
          alt=""
          width={320}
          height={320}
        />
      </div>
      <div className="solar-target">
        <div className="solar-impact-ring" />
        <div className="solar-portal">
          <img
            src="/media/vfx/screen-tear.webp"
            alt=""
            width={640}
            height={640}
          />
        </div>
        <div className="solar-projectile">
          <div className="solar-quote">
            <strong>
              Destroyed that
              <br />
              <span>flashbang</span>
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
