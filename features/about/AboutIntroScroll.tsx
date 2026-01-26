"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";

export default function AboutIntroScroll({ lang }: { lang: "es" | "en" }) {
  const isEs = lang === "es";
  const reduceMotion = useReducedMotion();

  const trackRef = useRef<HTMLElement | null>(null);

  const [introVisible, setIntroVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setIntroVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // TEXTO 1 — aparece sin scroll, se va al empezar
  const phase1ScrollOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.12],
    [1, 0]
  );

  // TEXTO 2 — entra y sale
  const phase2Opacity = useTransform(
    scrollYProgress,
    [0.25, 0.4, 0.55],
    [0, 1, 0]
  );
  const blur2 = useTransform(
    scrollYProgress,
    [0.25, 0.4, 0.55],
    [16, 0, 16]
  );

  // TEXTO 3 — entra y se queda
  const phase3Opacity = useTransform(
    scrollYProgress,
    [0.6, 0.8, 1],
    [0, 1, 1]
  );
  const blur3 = useTransform(
    scrollYProgress,
    [0.6, 0.8, 1],
    [16, 0, 0]
  );

  const filter2 = useMotionTemplate`blur(${blur2}px)`;
  const filter3 = useMotionTemplate`blur(${blur3}px)`;

  const sceneOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.9, 1],
    [1, 1, 1, 0]
  );

  const copy = useMemo(() => {
    return isEs
      ? {
          l1: "¿Te gustó lo que viste?",
          l2: "Puedes conocer más sobre mí",
          l3: "aquí",
        }
      : {
          l1: "Did you like what you saw?",
          l2: "You can learn more about me",
          l3: "here",
        };
  }, [isEs]);

  return (
    <section ref={trackRef} className="relative md:h-[300vh]">
      {/* ================= DESKTOP ================= */}
      <motion.div
        className="fixed inset-0 z-0 hidden md:flex items-center justify-center"
        style={{ opacity: sceneOpacity }}
      >
        <div className="absolute inset-0 bg-[rgb(var(--background))]" />

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl dark:bg-white/5" />
        </div>

        <div className="relative w-full max-w-5xl text-center">
          <div className="relative mx-auto flex min-h-[2.6em] items-center justify-center">
            {/* TEXTO 1 */}
            <motion.p
              initial={{ opacity: 0, y: -18, filter: "blur(14px)" }}
              animate={
                introVisible && !reduceMotion
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : undefined
              }
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute text-6xl lg:text-7xl font-semibold tracking-tight"
              style={!reduceMotion ? { opacity: phase1ScrollOpacity } : undefined}
            >
              {copy.l1}
            </motion.p>

            {/* TEXTO 2 */}
            <motion.p
              className="absolute text-6xl lg:text-7xl font-semibold tracking-tight"
              style={
                !reduceMotion
                  ? { opacity: phase2Opacity, filter: filter2 }
                  : undefined
              }
            >
              {copy.l2}
            </motion.p>

            {/* TEXTO 3 */}
            <motion.p
              className="absolute text-6xl lg:text-7xl font-semibold tracking-tight"
              style={
                !reduceMotion
                  ? { opacity: phase3Opacity, filter: filter3 }
                  : undefined
              }
            >
              {copy.l3}
            </motion.p>

            {/* Ghost */}
            <p className="invisible text-6xl lg:text-7xl font-semibold">
              {copy.l2}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden px-6 pt-28 pb-24 text-center">
        <div className="relative mx-auto max-w-[520px]">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-white/10 blur-3xl dark:bg-white/5" />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[28px] font-semibold leading-tight"
          >
            {copy.l1}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="mt-5 text-[20px] text-[rgba(var(--muted-foreground),0.95)]"
          >
            {copy.l2}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="mt-4 text-[22px] font-semibold tracking-tight"
          >
            {copy.l3}
          </motion.p>

          <div className="mt-10 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(var(--border),0.9),transparent)]" />
        </div>
      </div>
    </section>
  );
}
