"use client";

import Link from "next/link";
import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "motion/react";
import type { Lang } from "@/shared/data/projects";
import { ArrowRight, Mail } from "lucide-react";

export function ContactCta({
  lang,
  href,
}: {
  lang: Lang;
  href?: string; // por defecto: "#contact"
}) {
  const isEs = lang === "es";
  const trackRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end start"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0.18, 0.32], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.18, 0.32], [18, 0]);
  const titleBlur = useTransform(scrollYProgress, [0.18, 0.32], [12, 0]);

  const bodyOpacity = useTransform(scrollYProgress, [0.34, 0.52], [0, 1]);
  const bodyY = useTransform(scrollYProgress, [0.34, 0.52], [12, 0]);
  const bodyBlur = useTransform(scrollYProgress, [0.34, 0.52], [10, 0]);

  const cardOpacity = useTransform(scrollYProgress, [0.24, 0.44], [0, 1]);
  const cardY = useTransform(scrollYProgress, [0.24, 0.44], [18, 0]);
  const cardBlur = useTransform(scrollYProgress, [0.24, 0.44], [10, 0]);

  const titleFilter = useMotionTemplate`blur(${titleBlur}px)`;
  const bodyFilter = useMotionTemplate`blur(${bodyBlur}px)`;
  const cardFilter = useMotionTemplate`blur(${cardBlur}px)`;

  const copy = useMemo(() => {
    if (isEs) {
      return {
        kicker: "CONTACTO",
        h1: "¿Listo para llevarlo a producción?",
        h2: "Lo aterrizamos con claridad, velocidad y buen gusto.",
        p:
          "Si quieres una landing premium, un dashboard, una API sólida o una mejora de UX, conversemos. Te respondo con un plan claro y tiempos reales.",
        cta: "Hablemos",
        sub: "Respuesta rápida · Propuesta concreta · Enfoque en conversión",
      };
    }
    return {
      kicker: "CONTACT",
      h1: "Ready to take it to production?",
      h2: "Let’s ship it with clarity, speed and taste.",
      p:
        "If you need a premium landing, a dashboard, a solid API, or a UX upgrade, let’s talk. I’ll reply with a clear plan and realistic timelines.",
      cta: "Let’s talk",
      sub: "Fast reply · Concrete plan · Conversion-first",
    };
  }, [isEs]);

  const targetHref = href ?? "#contact";

  return (
    <section aria-label={isEs ? "CTA de contacto" : "Contact CTA"} className="relative">
      {/* Desktop: track alto + sticky */}
      <section ref={trackRef} className="hidden md:block relative">
        <div className="relative min-h-[130vh]">
          <div className="sticky top-24">
            <div className="relative overflow-hidden">
              <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
                <div className="relative py-14">
                  {/* Glows */}
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-28 left-1/2 h-64 w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(var(--foreground),0.10),transparent_60%)] blur-2xl" />
                    <div className="absolute -bottom-28 right-[-140px] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(var(--foreground),0.08),transparent_62%)] blur-2xl" />
                  </div>

                  <div className="relative grid grid-cols-12 gap-10 items-center">
                    {/* Texto izquierda */}
                    <div className="col-span-7">
                      <motion.p
                        initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.7 }}
                        transition={{ duration: 0.5 }}
                        className="text-[12px] tracking-[0.34em] uppercase text-[rgba(var(--muted-foreground),0.95)]"
                      >
                        {copy.kicker}
                      </motion.p>

                      <motion.h2
                        style={{ opacity: titleOpacity, y: titleY, filter: titleFilter }}
                        className="mt-6 font-[850] text-[56px] leading-[1.00] text-[rgb(var(--foreground))] [text-wrap:balance] max-w-[18ch]"
                      >
                        {copy.h1}
                      </motion.h2>

                      <motion.h3
                        style={{ opacity: bodyOpacity, y: bodyY, filter: bodyFilter }}
                        className="mt-2 font-[850] text-[56px] leading-[1.00] text-[rgb(var(--foreground))] [text-wrap:balance] max-w-[24ch]"
                      >
                        {copy.h2}
                      </motion.h3>

                      <motion.div style={{ opacity: bodyOpacity, y: bodyY, filter: bodyFilter }}>
                        <p className="mt-8 text-[15px] leading-relaxed text-[rgba(var(--muted-foreground),0.96)] max-w-[78ch]">
                          {copy.p}
                        </p>
                      </motion.div>
                    </div>

                    {/* Card derecha */}
                    <motion.div
                      style={{ opacity: cardOpacity, y: cardY, filter: cardFilter }}
                      className="col-span-5"
                    >
                      <div
                        className="
                          relative overflow-hidden
                          rounded-[26px]
                          border border-[rgba(var(--border),0.75)]
                          bg-[rgba(var(--background),0.10)]
                          backdrop-blur-xl
                          shadow-[0_22px_80px_rgba(0,0,0,0.18)]
                          p-6
                        "
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className="
                              inline-flex h-10 w-10 items-center justify-center
                              rounded-full border border-white/10 bg-black/20
                            "
                          >
                            <Mail className="h-5 w-5 text-foreground/80" />
                          </span>

                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-foreground/85">
                              {copy.cta}
                            </p>
                            <p className="mt-1 text-xs text-foreground/65 leading-relaxed">
                              {copy.sub}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6">
                          <Link
                            href={targetHref}
                            className="
                              inline-flex w-full items-center justify-center gap-2
                              rounded-full
                              border border-border/70
                              bg-background/35 backdrop-blur
                              px-5 py-3
                              text-[13px] font-[800] text-foreground
                              shadow-[0_18px_60px_rgba(0,0,0,0.14)]
                              transition
                              hover:-translate-y-0.5
                              hover:bg-background/50
                              hover:shadow-[0_28px_90px_rgba(0,0,0,0.18)]
                              focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20
                            "
                          >
                            {copy.cta}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>

                        <div className="pointer-events-none absolute inset-0">
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),transparent_48%)]" />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="mt-14 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(var(--border),0.9),transparent)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile: simple */}
      <div className="md:hidden overflow-x-hidden">
        <div className="mx-auto w-full max-w-[720px] px-5 py-14">
          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6 }}
            className="
              relative overflow-hidden
              rounded-[22px]
              border border-[rgba(var(--border),0.75)]
              bg-[rgba(var(--background),0.10)]
              backdrop-blur-xl
              shadow-[0_22px_80px_rgba(0,0,0,0.16)]
              p-6
            "
          >
            <p className="text-[11px] tracking-[0.34em] uppercase text-[rgba(var(--muted-foreground),0.95)]">
              {copy.kicker}
            </p>

            <h2 className="mt-4 text-[28px] leading-[1.05] font-[850] text-[rgb(var(--foreground))] [text-wrap:balance]">
              {copy.h1}
            </h2>

            <p className="mt-3 text-[14px] leading-relaxed text-[rgba(var(--muted-foreground),0.96)]">
              {copy.p}
            </p>

            <div className="mt-6">
              <Link
                href={targetHref}
                className="
                  inline-flex w-full items-center justify-center gap-2
                  rounded-full
                  border border-border/70
                  bg-background/35 backdrop-blur
                  px-5 py-3
                  text-[13px] font-[800] text-foreground
                  shadow-[0_18px_60px_rgba(0,0,0,0.14)]
                  transition
                  hover:-translate-y-0.5
                  hover:bg-background/50
                "
              >
                {copy.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),transparent_48%)]" />
            </div>
          </motion.div>

          <div className="mt-12 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(var(--border),0.9),transparent)]" />
        </div>
      </div>
    </section>
  );
}
