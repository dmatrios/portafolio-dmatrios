"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

export function Magnetic({
  children,
  strength = 10,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.2 });
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.2 });

  const rotateX = useTransform(y, [-strength, strength], [2, -2]);
  const rotateY = useTransform(x, [-strength, strength], [-2, 2]);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const px = e.clientX - (r.left + r.width / 2);
    const py = e.clientY - (r.top + r.height / 2);

    mx.set((px / (r.width / 2)) * strength);
    my.set((py / (r.height / 2)) * strength);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y, rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
