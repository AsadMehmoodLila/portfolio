"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { CloseIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { certificates } from "@/data/site";

export function Certificates() {
  const [selected, setSelected] = useState<number | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setSelected(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected === null ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <section id="certificates" className="certificates-section shell" aria-labelledby="certificate-title">
      <SectionHeading
        eyebrow="Proof of participation"
        title="Certificates that support the work — not replace it."
        body="A small, relevant set: technical participation and professional development. Click any certificate to inspect it fullscreen."
      />

      <div className="certificate-list">
        {certificates.map((certificate, index) => (
          <motion.button
            type="button"
            className="certificate-card"
            key={certificate.title}
            onClick={() => setSelected(index)}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduce ? undefined : { y: -6 }}
          >
            <div className="certificate-image-wrap">
              <img src={certificate.image} alt={`${certificate.title} certificate preview`} />
              <span>Open fullscreen</span>
            </div>
            <div className="certificate-meta">
              <p>{String(index + 1).padStart(2, "0")}</p>
              <div>
                <h3>{certificate.title}</h3>
                <span>{certificate.issuer}</span>
                <small>{certificate.type}</small>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null ? (
          <motion.div
            className="certificate-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${certificates[selected].title} certificate`}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelected(null);
            }}
          >
            <motion.div
              className="certificate-modal-content"
              initial={reduce ? false : { opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <button type="button" onClick={() => setSelected(null)} aria-label="Close certificate preview"><CloseIcon /></button>
              <img src={certificates[selected].image} alt={`${certificates[selected].title} full certificate`} />
              <div>
                <h3>{certificates[selected].title}</h3>
                <p>{certificates[selected].note}</p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
