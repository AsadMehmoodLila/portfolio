"use client";

import { useEffect, useId, useRef, useState } from "react";

/** Owner-supplied character clip, served locally without its original audio track. */
export function CharacterStage() {
  const host = useRef<HTMLButtonElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const requested = useRef(false);
  const visible = useRef(false);
  const started = useRef(false);
  const help = useId();

  const start = () => {
    const element = video.current;
    if (!element || !requested.current || !visible.current || document.hidden) return;
    element.play().catch(() => {
      // Autoplay can be blocked; the poster and native activation remain usable.
      setPlaying(false);
    });
  };

  useEffect(() => {
    if (source) start();
  }, [source]);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const pauseForPreference = () => {
      if (reduced.matches || connection?.saveData) {
        requested.current = false;
        video.current?.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      if (!entry.isIntersecting) video.current?.pause();
      else {
        if (!started.current) {
          started.current = true;
          if (!reduced.matches && !connection?.saveData) {
            requested.current = true;
            setSource(innerWidth <= 600 ? "/media/scriptlilla-character-mobile.mp4" : "/media/scriptlilla-character.mp4");
          }
        }
        start();
      }
    }, { threshold: 0.12 });
    observer.observe(element);
    const visibility = () => {
      if (document.hidden) video.current?.pause();
      else start();
    };
    document.addEventListener("visibilitychange", visibility);
    reduced.addEventListener("change", pauseForPreference);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", pauseForPreference);
    };
  }, []);

  const toggle = () => {
    if (video.current && !video.current.paused) {
      requested.current = false;
      video.current?.pause();
    } else {
      requested.current = true;
      if (!source) setSource(innerWidth <= 600 ? "/media/scriptlilla-character-mobile.mp4" : "/media/scriptlilla-character.mp4");
      else start();
    }
  };

  return (
    <div className="character-stage character-film" data-playing={playing}>
      <div className="character-world">
        <button
          type="button"
          ref={host}
          className="character-canvas"
          onClick={toggle}
          aria-label={playing ? "Pause character animation" : "Play character animation"}
          aria-pressed={playing}
          aria-describedby={help}
          disabled={failed}
        >
          <img className="character-film-poster" src="/media/scriptlilla-character-poster.webp" width={480} height={854} alt="" fetchPriority="high" />
          {source && !failed && (
            <video
              ref={video}
              src={source}
              width={480}
              height={854}
              muted
              playsInline
              loop
              preload="none"
              poster="/media/scriptlilla-character-poster.webp"
              aria-hidden="true"
              tabIndex={-1}
              onCanPlay={start}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onError={() => { requested.current = false; setPlaying(false); setFailed(true); }}
            />
          )}
        </button>
        <noscript>
          <img className="character-static" src="/media/scriptlilla-character-poster.webp" width={480} height={854} alt="ScriptLilla's anime character wearing a green plaid cap and black outfit" />
        </noscript>
      </div>
      <p id={help} className="sr-only">
        Silent character animation. Click or press Enter or Space to pause or play.
        {failed && " Playback is unavailable; the still preview is shown."}
      </p>
    </div>
  );
}
