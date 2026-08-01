"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { AnchorHTMLAttributes, MouseEvent } from "react";

type MagneticLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  strength?: number;
};

export function MagneticLink({ strength = 0.18, onMouseMove, onMouseLeave, ...props }: MagneticLinkProps) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 24, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 280, damping: 24, mass: 0.45 });

  function handleMove(event: MouseEvent<HTMLAnchorElement>) {
    onMouseMove?.(event);
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  }

  function handleLeave(event: MouseEvent<HTMLAnchorElement>) {
    onMouseLeave?.(event);
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      {...props}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    />
  );
}
