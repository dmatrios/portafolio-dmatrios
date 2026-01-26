"use client";

import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "motion/react";
import type { Lang } from "@/shared/data/projects";

export function ProjectDemo({
  lang,
  youtubeId,
  title,
  projectTitle,
}: {
  lang: Lang;
  youtubeId: string;
  title?: { es: string; en: string };
  projectTitle?: string; // opcional para el copy si quieres
}) {
  const isEs = lang === "es";
  const trackRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end start"],
  });

  // Timing similar a About: 2 golpes + body + media
  const firstOpacity = useTransform(scrollYProgress, [0.18, 0.30], [0, 1]);
  const firstY = useTransform(scrollYProgress, [0.18, 0.30], [18, 0]);
  const firstBlur = useTransform(scrollYProgress, [0.18, 0.30], [12, 0]);

  const secondOpacity = useTransform(scrollYProgress, [0.28, 0.42], [0, 1]);
  const secondY = useTransform(scrollYProgress, [0.28, 0.42], [18, 0]);
  const secondBlur = useTransform(scrollYProgress, [0.28, 0.42], [12, 0]);

  const bodyOpacity = useTransform(scrollYProgress, [0.44, 0.60], [0, 1]);
  const bodyY = useTransform(scrollYProgress, [0.44, 0.60], [10, 0]);
  const bodyBlur = useTransform(scrollYProgress, [0.44, 0.60], [10, 0]);

  const mediaOpacity = useTransform(scrollYProgress, [0.24, 0.44], [0, 1]);
  const mediaY = useTransform(scrollYProgress, [0.24, 0.44], [18, 0]);
  const mediaBlur = useTransform(scrollYProgress, [0.24, 0.44], [10, 0]);

  const firstFilter = useMotionTemplate`blur(${firstBlur}px)`;
  const secondFilter = useMotionTemplate`blur(${secondBlur}px)`;
  const bodyFilter = useMotionTemplate`blur(${bodyBlur}px)`;
  const mediaFilter = useMotionTemplate`blur(${mediaBlur}px)`;

  const copy = useMemo(() => {
    if (isEs) {
      return {
        kicker: "DEMO",
        first: "Mira el flujo",
        second: "como si fuera un producto real.",
        p1: "Un video corto mostrando pantallas, interacción y decisiones de UI/UX.",
        p2: "Ideal para entender el alcance, el enfoque técnico y la experiencia final.",
        iframeTitle: `Demo ${projectTitle ?? ""}`.trim(),
      };
    }
    return {
      kicker: "DEMO",
      first: "See the flow",
      second: "like a real product.",
      p1: "A short walkthrough showing screens, interaction and UI/UX decisions.",
      p2: "Perfect to understand scope, technical approach and final experience.",
      iframeTitle: `Demo ${projectTitle ?? ""}`.trim(),
    };
  }, [isEs, projectTitle]);

  const sectionTitle = title ? title[lang] : isEs ? "Demo en video" : "Video demo";

  return (
    <section aria-label={isEs ? "Demo del proyecto" : "Project demo"} className="relative">
      {/* Desktop: track alto + sticky */}
      <section ref={trackRef} className="hidden md:block relative">
        <div className="relative min-h-[175vh]">
          <div className="sticky top-24">
            <div className="relative overflow-hidden">
              <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
                <div className="relative py-16">
                  {/* glows recortados */}
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-28 left-1/2 h-64 w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(var(--foreground),0.10),transparent_60%)] blur-2xl" />
                    <div className="absolute -bottom-28 left-[-120px] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(var(--foreground),0.08),transparent_62%)] blur-2xl" />
                  </div>

                  <div className="relative grid grid-cols-12 gap-10 items-center">
                    {/* Texto izquierda */}
                    <div className="col-span-6">
                      <motion.p
                        initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.7 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-[12px] tracking-[0.34em] uppercase text-[rgba(var(--muted-foreground),0.95)]"
                      >
                        {copy.kicker}
                      </motion.p>

                      <motion.h2
                        style={{ opacity: firstOpacity, y: firstY, filter: firstFilter }}
                        className="mt-6 font-[850] text-[56px] lg:text-[62px] leading-[1.00] text-[rgb(var(--foreground))] [text-wrap:balance] max-w-[18ch]"
                      >
                        {copy.first}
                      </motion.h2>

                      <motion.h2
                        style={{ opacity: secondOpacity, y: secondY, filter: secondFilter }}
                        className="mt-2 font-[850] text-[56px] lg:text-[62px] leading-[1.00] text-[rgb(var(--foreground))] [text-wrap:balance] max-w-[24ch]"
                      >
                        {copy.second}
                      </motion.h2>

                      <motion.div style={{ opacity: bodyOpacity, y: bodyY, filter: bodyFilter }}>
                        <p className="mt-8 text-[15px] leading-relaxed text-[rgba(var(--muted-foreground),0.96)] max-w-[70ch]">
                          {copy.p1}
                        </p>
                        <p className="mt-4 text-[15px] leading-relaxed text-[rgba(var(--muted-foreground),0.96)] max-w-[70ch]">
                          {copy.p2}
                        </p>

                        <p className="mt-8 text-sm text-foreground/60">
                          {sectionTitle}
                        </p>
                      </motion.div>
                    </div>

                    {/* Iframe derecha */}
                    <motion.div
                      style={{ opacity: mediaOpacity, y: mediaY, filter: mediaFilter }}
                      className="col-span-6"
                    >
                      <div
                        className="
                          relative overflow-hidden
                          rounded-[26px]
                          border border-[rgba(var(--border),0.75)]
                          bg-[rgba(var(--background),0.10)]
                          backdrop-blur-xl
                          shadow-[0_22px_80px_rgba(0,0,0,0.18)]
                        "
                      >
                        {/* wrapper aspect video */}
                        <div className="relative aspect-video bg-black">
                          <iframe
                            className="absolute inset-0 h-full w-full"
                            src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                            title={copy.iframeTitle}
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        </div>

                        {/* glass highlight */}
                        <div className="pointer-events-none absolute inset-0">
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),transparent_48%)]" />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="mt-16 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(var(--border),0.9),transparent)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile: simple (texto arriba, video abajo) */}
      <div className="md:hidden overflow-x-hidden">
        <div className="mx-auto w-full max-w-[720px] px-5 py-14">
          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-[11px] tracking-[0.34em] uppercase text-[rgba(var(--muted-foreground),0.95)]">
              {copy.kicker}
            </p>

            <h2 className="mt-5 text-[30px] leading-[1.04] font-[850] text-[rgb(var(--foreground))] [text-wrap:balance]">
              {isEs ? "Lo que buscas" : "What you want"}
              <br />
              {isEs ? "de la mejor manera." : "in the best way."}
            </h2>

            <p className="mt-4 text-[14px] leading-relaxed text-[rgba(var(--muted-foreground),0.96)]">
              {copy.p1}
            </p>

            <div
              className="
                mt-6 relative overflow-hidden
                rounded-[22px]
                border border-[rgba(var(--border),0.75)]
                bg-[rgba(var(--background),0.10)]
                backdrop-blur-xl
                shadow-[0_22px_80px_rgba(0,0,0,0.16)]
              "
            >
              <div className="relative aspect-video bg-black">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                  title={copy.iframeTitle}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),transparent_48%)]" />
              </div>
            </div>

            <p className="mt-4 text-sm text-foreground/60">
              {sectionTitle}
            </p>

            <div className="mt-12 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(var(--border),0.9),transparent)]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
