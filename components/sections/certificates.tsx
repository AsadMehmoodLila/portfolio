"use client";
import { useEffect, useRef, useState } from "react";
import { certificates } from "@/data/site";
export function Certificates() {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (selected !== null) {
      dialog.current?.showModal();
    } else if (dialog.current?.open) {
      dialog.current.close();
    }
  }, [selected]);
  return (
    <section
      id="certificates"
      className="certificate-section shell"
      aria-labelledby="certificate-title"
    >
      <div className="section-heading">
        <h2 id="certificate-title">Certificates</h2>
        <p className="section-intro">
          Participation and professional development. Open a certificate to read
          the details.
        </p>
      </div>
      <noscript>
        <p>
          JavaScript is disabled.{" "}
          {certificates.map((c) => (
            <a key={c.title} href={c.image}>
              {c.title} certificate image ·{" "}
            </a>
          ))}
        </p>
      </noscript>
      <div className="certificate-list">
        {certificates.map((c, i) => (
          <button
            type="button"
            className="certificate-card"
            key={c.title}
            onClick={(e) => {
              trigger.current = e.currentTarget;
              setSelected(i);
            }}
            aria-haspopup="dialog"
            aria-label={`View ${c.title} certificate`}
          >
            <div className="certificate-image-wrap">
              <img
                src={c.image}
                alt={`${c.title}, awarded to Asad Mehmood by ${c.issuer}`}
                width="1000"
                height="700"
                loading="lazy"
              />
              <span>View certificate</span>
            </div>
            <div className="certificate-meta">
              <div>
                <h3>{c.title}</h3>
                <span>{c.issuer}</span>
                <small>{c.type}</small>
                <p>{c.note}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="certificate-dialog"
        aria-labelledby="certificate-dialog-title"
        onCancel={() => setSelected(null)}
        onClose={() => {
          setSelected(null);
          trigger.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            const rect = e.currentTarget.getBoundingClientRect();
            if (
              e.clientX < rect.left ||
              e.clientX > rect.right ||
              e.clientY < rect.top ||
              e.clientY > rect.bottom
            )
              setSelected(null);
          }
        }}
      >
        {selected !== null && (
          <>
            <button
              type="button"
              className="dialog-close"
              onClick={() => setSelected(null)}
              autoFocus
            >
              Close certificate
            </button>
            <h2 id="certificate-dialog-title">
              {certificates[selected].title}
            </h2>
            <img
              src={certificates[selected].image}
              alt={`${certificates[selected].title} issued to Asad Mehmood by ${certificates[selected].issuer}`}
            />
            <p>
              {certificates[selected].issuer} · {certificates[selected].type}
            </p>
            <p>{certificates[selected].note}</p>
          </>
        )}
      </dialog>
    </section>
  );
}
