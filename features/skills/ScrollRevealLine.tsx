"use client";

import { motion, useMotionTemplate, useTransform, MotionValue } from "motion/react";

export function ScrollRevealLine({
  progress,
  range,
  children,
  className = "",
  blurFrom = 18,
  yFrom = 18,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: React.ReactNode;
  className?: string;
  blurFrom?: number;
  yFrom?: number;
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [yFrom, 0]);
  const blur = useTransform(progress, range, [blurFrom, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.div style={{ opacity, y, filter }} className={className}>
      {children}
    </motion.div>
  );
}
