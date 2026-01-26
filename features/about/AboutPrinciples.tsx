"use client";

import { useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";

export function AboutPrinciples({ lang }: { lang: "es" | "en" }) {
  const isEs = lang === "es";
  const reduceMotion = useReducedMotion();

  const trackRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Escena visible solo dentro del track
  const sceneOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.9, 1],
    [0, 1, 1, 0]
  );

  // Principios (fade in → hold → fade out)
  const p1Opacity = useTransform(scrollYProgress, [0.05, 0.2, 0.35], [0, 1, 0]);
  const p2Opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.65], [0, 1, 0]);
  const p3Opacity = useTransform(scrollYProgress, [0.6, 0.8, 1], [0, 1, 1]);

  const p1Blur = useTransform(scrollYProgress, [0.05, 0.2, 0.35], [14, 0, 14]);
  const p2Blur = useTransform(scrollYProgress, [0.3, 0.5, 0.65], [14, 0, 14]);
  const p3Blur = useTransform(scrollYProgress, [0.6, 0.8, 1], [14, 0, 0]);

  const f1 = useMotionTemplate`blur(${p1Blur}px)`;
  const f2 = useMotionTemplate`blur(${p2Blur}px)`;
  const f3 = useMotionTemplate`blur(${p3Blur}px)`;

  const copy = useMemo(() => {
    return isEs
      ? {
          p1a: "No escribo código por escribirlo.",
          p1b: "Primero entiendo el problema.",
          p2a: "Arquitectura antes que framework.",
          p2b: "Las decisiones importan más que la moda.",
          p3a: "El detalle no es un extra.",
          p3b: "Es parte del trabajo.",
        }
      : {
          p1a: "I don’t write code just to write it.",
          p1b: "I start by understanding the problem.",
          p2a: "Architecture before frameworks.",
          p2b: "Decisions matter more than trends.",
          p3a: "Details are not an extra.",
          p3b: "They are part of the job.",
        };
  }, [isEs]);

  return (
    <section
      ref={trackRef}
      className="relative h-[260vh]"
      aria-label={isEs ? "Principios de trabajo" : "Work principles"}
    >
      {/* ESCENA FIJA */}
      <motion.div
        className="fixed inset-0 z-0 hidden md:flex items-center justify-center"
        style={{ opacity: sceneOpacity }}
      >
        {/* Fondo base */}
        <div className="absolute inset-0 bg-[rgb(var(--background))]" />

        {/* Stage */}
        <div className="relative w-full max-w-5xl px-6 text-center">
          <div className="relative mx-auto flex min-h-[6em] items-center justify-center">
            {/* PRINCIPIO 1 */}
            <motion.div
              className="absolute"
              style={!reduceMotion ? { opacity: p1Opacity, filter: f1 } : undefined}
            >
              <p className="text-4xl md:text-5xl font-semibold leading-tight">
                {copy.p1a}
              </p>
              <p className="mt-4 text-xl text-[rgba(var(--muted-foreground),0.95)]">
                {copy.p1b}
              </p>
            </motion.div>

            {/* PRINCIPIO 2 */}
            <motion.div
              className="absolute"
              style={!reduceMotion ? { opacity: p2Opacity, filter: f2 } : undefined}
            >
              <p className="text-4xl md:text-5xl font-semibold leading-tight">
                {copy.p2a}
              </p>
              <p className="mt-4 text-xl text-[rgba(var(--muted-foreground),0.95)]">
                {copy.p2b}
              </p>
            </motion.div>

            {/* PRINCIPIO 3 */}
            <motion.div
              className="absolute"
              style={!reduceMotion ? { opacity: p3Opacity, filter: f3 } : undefined}
            >
              <p className="text-4xl md:text-5xl font-semibold leading-tight">
                {copy.p3a}
              </p>
              <p className="mt-4 text-xl text-[rgba(var(--muted-foreground),0.95)]">
                {copy.p3b}
              </p>
            </motion.div>

            {/* Ghost */}
            <div className="invisible">
              <p className="text-4xl md:text-5xl font-semibold">{copy.p2a}</p>
              <p className="mt-4 text-xl">{copy.p2b}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
