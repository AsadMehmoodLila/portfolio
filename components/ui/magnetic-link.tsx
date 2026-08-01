"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";

import type { MouseEvent } from "react";

type MagneticLinkProps = HTMLMotionProps<"a"> & {
  strength?: number;
};

export function MagneticLink({
  strength = 0.18,
  onMouseMove,
  onMouseLeave,
  style,
  ...props
}: MagneticLinkProps) {
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 280,
    damping: 24,
    mass: 0.45,
  });

  const springY = useSpring(y, {
    stiffness: 280,
    damping: 24,
    mass: 0.45,
  });

  function handleMouseMove(event: MouseEvent<HTMLAnchorElement>) {
    onMouseMove?.(event);

    if (reduceMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    x.set(
      (event.clientX - rect.left - rect.width / 2) * strength
    );

    y.set(
      (event.clientY - rect.top - rect.height / 2) * strength
    );
  }

  function handleMouseLeave(event: MouseEvent<HTMLAnchorElement>) {
    onMouseLeave?.(event);

    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      {...props}
      style={{
        ...style,
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
}
