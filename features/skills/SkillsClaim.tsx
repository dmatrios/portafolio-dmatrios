"use client";

import { useMemo, useRef } from "react";
import { motion, useScroll } from "motion/react";
import ScrollVelocity from "@/components/ScrollVelocity";
import { ScrollRevealLine } from "@/features/skills/ScrollRevealLine";

export function SkillsClaim({ lang }: { lang: "es" | "en" }) {
  const isEs = lang === "es";
  const trackRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end start"],
  });

  const velocityTexts = useMemo(
    () =>
      isEs
        ? [
            "Estrategia · UI/UX · Frontend · Backend · Deploy · Comunicación · Performance ·",
            "Estrategia · UI/UX · Frontend · Backend · Deploy · Comunicación · Performance ·",
          ]
        : [
            "Strategy · UI/UX · Frontend · Backend · Deploy · Communication · Performance ·",
            "Strategy · UI/UX · Frontend · Backend · Deploy · Communication · Performance ·",
          ],
    [isEs]
  );

  const copy = useMemo(() => {
    if (isEs) {
      return {
        kicker: "HABILIDADES, CON CRITERIO",
        first: "Las habilidades que buscas,",
        second: "las encuentras aquí.",
        sub: "No es una lista: es una forma de construir. De la idea al deploy, con foco en claridad, performance y detalles premium.",
      };
    }
    return {
      kicker: "SKILLS, WITH TASTE",
      first: "The skills you’re looking for,",
      second: "you’ll find them here.",
      sub: "Not a checklist: a way of building. From idea to deploy, with clarity, performance, and premium-level detail.",
    };
  }, [isEs]);

  return (
    <section aria-label={isEs ? "Claim de habilidades" : "Skills claim"} className="relative">
      {/* A) ScrollVelocity full width */}
      <div className="relative overflow-x-hidden">
        <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" />
        <div className="relative py-8 md:py-10">
          <ScrollVelocity
            texts={velocityTexts}
            velocity={28}
            className="text-[12px] md:text-[13px] tracking-[0.28em] uppercase opacity-80"
          />
        </div>
      </div>

      {/* B) Desktop: track + sticky reveal “Apple” */}
      <section ref={trackRef} className="hidden md:block relative">
        <div className="relative min-h-[200vh]">
          <div className="sticky top-24">
            <div className="mx-auto w-full max-w-[1400px] px-8 lg:px-14">
              <div className="relative py-12 lg:py-16">
                {/* Glow sutil (sin overflow hacks raros) */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -top-28 left-1/2 h-72 w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(var(--foreground),0.12),transparent_60%)] blur-2xl" />
                  <div className="absolute -bottom-28 right-[-140px] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(var(--foreground),0.10),transparent_62%)] blur-2xl" />
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 6, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="relative text-[12px] lg:text-[13px] tracking-[0.34em] uppercase text-[rgba(var(--muted-foreground),0.95)]"
                >
                  {copy.kicker}
                </motion.p>

                {/* Golpe 1 */}
                <ScrollRevealLine
                  progress={scrollYProgress}
                  range={[0.18, 0.28]}
                  className="relative mt-8"
                  blurFrom={18}
                  yFrom={18}
                >
                  <h2
                    className="font-[650] text-[rgb(var(--foreground))] hyphens-none [text-wrap:balance]
                               text-[64px] leading-[1.02]
                               lg:text-[86px] lg:leading-[1.02]
                               max-w-[22ch]"
                  >
                    {copy.first}
                  </h2>
                </ScrollRevealLine>

                {/* Golpe 2 */}
                <ScrollRevealLine
                  progress={scrollYProgress}
                  range={[0.30, 0.40]}
                  className="relative mt-2"
                  blurFrom={18}
                  yFrom={18}
                >
                  <h2
                    className="font-[650] text-[rgb(var(--foreground))] hyphens-none [text-wrap:balance]
                               text-[64px] leading-[1.02]
                               lg:text-[86px] lg:leading-[1.02]
                               max-w-[22ch]"
                  >
                    {copy.second}
                  </h2>
                </ScrollRevealLine>

                {/* Subcopy */}
                <ScrollRevealLine
                  progress={scrollYProgress}
                  range={[0.42, 0.54]}
                  className="relative mt-10"
                  blurFrom={12}
                  yFrom={12}
                >
                  <p className="text-[16px] leading-relaxed text-[rgba(var(--muted-foreground),0.96)] max-w-[78ch]">
                    {copy.sub}
                  </p>
                </ScrollRevealLine>

                <div className="relative mt-14 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(var(--border),0.9),transparent)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* C) Mobile: entrada simple */}
      <div className="md:hidden">
        <div className="mx-auto w-full max-w-[720px] px-5 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative py-8"
          >
            <p className="text-[11px] tracking-[0.34em] uppercase text-[rgba(var(--muted-foreground),0.95)]">
              {copy.kicker}
            </p>

            <h2 className="mt-5 text-[36px] leading-[1.05] font-[650] text-[rgb(var(--foreground))] hyphens-none [text-wrap:balance] max-w-[22ch]">
              {copy.first} {copy.second}
            </h2>

            <p className="mt-4 text-[14px] leading-relaxed text-[rgba(var(--muted-foreground),0.96)]">
              {copy.sub}
            </p>

            <div className="mt-10 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(var(--border),0.9),transparent)]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
