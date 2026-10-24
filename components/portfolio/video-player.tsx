"use client";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, Play, X } from "@phosphor-icons/react";
import Link from "next/link";
import { youtubeId, type Media } from "@/data/portfolio";

export function VideoPlayer({ media, title }: { media: Media; title: string }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const playButton = useRef<HTMLButtonElement>(null);
  const iframe = useRef<HTMLIFrameElement>(null);
  const noticeId = useId();
  const wasLoaded = useRef(false);
  const id = youtubeId(media.youtube);
  useEffect(() => {
    if (loaded) iframe.current?.focus();
    if (!loaded && wasLoaded.current) playButton.current?.focus();
    wasLoaded.current = loaded;
  }, [loaded]);
  if (media.video)
    return (
      <figure className="showcase-media">
        <div className="video-frame">
          <video
            controls
            playsInline
            preload="none"
            poster={media.poster ?? undefined}
            onError={() => setFailed(true)}
            aria-label={`${title} showcase`}
          >
            <source src={media.video} onError={() => setFailed(true)} />
            {media.captions && (
              <track
                kind="captions"
                src={media.captions}
                srcLang="en"
                label="English"
                default
              />
            )}
          </video>
        </div>
        {failed && (
          <p className="media-note" role="status">
            This video could not load.{" "}
            <a href={media.video}>
              Open the video directly <ArrowUpRight size={14} aria-hidden />
            </a>
          </p>
        )}
        {media.summary && <figcaption>{media.summary}</figcaption>}
      </figure>
    );
  if (!id)
    return media.poster ? (
      <figure className="showcase-media">
        <img
          src={media.poster}
          width={1280}
          height={720}
          alt={media.alt}
          className="work-poster"
        />
        {media.summary && <figcaption>{media.summary}</figcaption>}
      </figure>
    ) : null;
  return (
    <figure className="showcase-media">
      <div className="video-frame">
        {loaded ? (
          <iframe
            ref={iframe}
            title={`${title} showcase on YouTube`}
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            ref={playButton}
            className="video-facade"
            type="button"
            onClick={() => setLoaded(true)}
            aria-label={`Play ${title} showcase on YouTube`}
            aria-describedby={noticeId}
          >
            {media.poster && (
              <img
                src={media.poster}
                width={1280}
                height={720}
                alt={media.alt}
              />
            )}
            <span className="play-button">
              <Play weight="fill" size={27} aria-hidden />
            </span>
          </button>
        )}
      </div>
      <div className="video-actions">
        <p id={noticeId}>
          {loaded
            ? "YouTube video loaded"
            : "Play connects to YouTube and shares connection information with Google"}{" "}
          <Link href="/privacy/" prefetch={false}>
            Privacy
          </Link>
        </p>
        {loaded && (
          <button
            type="button"
            onClick={() => setLoaded(false)}
            className="text-button"
          >
            <X size={15} aria-hidden />
            Close video
          </button>
        )}
        <a
          href={`https://www.youtube.com/watch?v=${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open on YouTube <ArrowUpRight size={14} aria-hidden />
        </a>
      </div>
      {media.summary && <figcaption>{media.summary}</figcaption>}
      <noscript>
        <p>
          <a href={`https://www.youtube.com/watch?v=${id}`}>
            Watch the showcase on YouTube
          </a>
        </p>
      </noscript>
    </figure>
  );
}
