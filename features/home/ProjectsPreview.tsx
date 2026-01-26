"use client";

import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { CORE_PREVIEW } from "@/shared/data/projects";
import { ProjectCard } from "@/features/projects/ProjectCard";

export function ProjectsPreview({ lang }: { lang: "es" | "en" }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const projects = useMemo(() => CORE_PREVIEW, []);

  // progreso del scroll solo dentro de esta sección
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Movimiento horizontal del track (0% -> -66% aprox para 3 cards)
  const x = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "-66%"]);

  // “Entrada” al iniciar (desde abajo/derecha)
  const enterY = useTransform(scrollYProgress, [0.0, 0.18], [40, 0]);
  const enterOpacity = useTransform(scrollYProgress, [0.0, 0.18], [0, 1]);

  return (
    <section ref={sectionRef} id="projects" className="relative w-full">
      {/* Altura extra para que haya recorrido */}
      <div className="h-[160svh]">
        <div className="sticky top-0 h-[90svh] flex items-center overflow-hidden">
          <div className="w-full px-6 md:px-10">
            <div className="max-w-6xl mx-auto">
              <div className="mb-6">
                <p className="text-sm opacity-70">
                  {lang === "es" ? "Proyectos (preview)" : "Projects (preview)"}
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                  {lang === "es"
                    ? "Lo más importante, en 3 slides"
                    : "The highlights, in 3 slides"}
                </h2>
              </div>

              <motion.div
                style={{ opacity: enterOpacity, y: enterY }}
                className="relative"
              >
                {/* Perspectiva para 3D sutil */}
                <div className="[perspective:1200px]">
                  <motion.div
                    style={{ x }}
                    className="flex gap-6 will-change-transform"
                  >
                    {projects.map((p, idx) => {
                      // “3D sutil” por card: las laterales un poquito rotadas
                      const rotate = idx === 0 ? 6 : idx === 2 ? -6 : 0;
                      const z = idx === 1 ? 0 : -40;

                      return (
                        <motion.div
                          key={p.key}
                          style={{
                            transform: `translateZ(${z}px) rotateY(${rotate}deg)`,
                          }}
                          className="shrink-0 w-[min(560px,85vw)]"
                        >
                         <ProjectCard project={p} lang={lang} ctaAs="none" />
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
