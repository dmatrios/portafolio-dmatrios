"use client";

import React, { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { gsap } from "gsap";

import type { Lang, Project } from "@/shared/data/projects";
import { PROJECTS } from "@/shared/data/projects";
import { ProjectCard } from "@/features/projects/ProjectCard";

export function ProjectsDeck({ lang }: { lang: Lang }) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const projects = useMemo<Project[]>(() => {
    const pick = ["groomer", "ahorrape", "soelec"];
    return PROJECTS.filter((p) => pick.includes(p.key));
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={sectionRef} id="projects" className="relative w-full">
      {/* =========================
          MOBILE (NO sticky)
         ========================= */}
      <div className="md:hidden w-full px-6">
        <div className="mx-auto max-w-6xl py-16">
          <p className="text-sm opacity-70">
            {lang === "es" ? "Proyectos core" : "Core projects"}
          </p>

          <h2 className="mt-3 text-4xl font-semibold tracking-tight leading-[1.05]">
            {lang === "es" ? "Highlights" : "Highlights"}
          </h2>

          <p className="mt-4 text-sm opacity-80 max-w-[52ch]">
            {lang === "es"
              ? "Desliza para ver mis 3 proyectos principales o sigue bajando cuando quieras."
              : "Swipe through my 3 key projects or just keep scrolling."}
          </p>

          <div className="mt-6">
            <Link
              href={`/${lang}/projects`}
              className="
                inline-flex items-center justify-center
                rounded-full px-6 py-3 text-sm font-medium
                bg-background/35 backdrop-blur-md
                border border-border/45 shadow-sm transition
                hover:shadow-md hover:-translate-y-0.5
              "
            >
              {lang === "es" ? "Ver todos" : "View all"}
            </Link>
          </div>

          <div className="mt-8">
            <ProjectsMobileSlider lang={lang} projects={projects} />
          </div>
        </div>
      </div>

      {/* =========================
          DESKTOP (sticky + deck)
         ========================= */}
      <div className="hidden md:block">
        <div className="h-[220svh]">
          <div className="sticky top-0 h-[100svh] flex items-center overflow-hidden">
            <div className="w-full px-6 md:px-10">
              <div className="mx-auto max-w-6xl">
                <div className="grid items-center gap-10 md:grid-cols-2">
                  {/* LEFT */}
                  <div className="pt-10 md:pt-0">
                    <p className="text-sm opacity-70">
                      {lang === "es" ? "Proyectos core" : "Core projects"}
                    </p>

                    <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
                      {lang === "es"
                        ? "Una baraja de highlights"
                        : "A deck of highlights"}
                    </h2>

                    <p className="mt-4 text-sm md:text-base opacity-80 max-w-[52ch]">
                      {lang === "es"
                        ? "Scroll para explorar mis 3 proyectos más importantes. Stack, estado y propósito."
                        : "Scroll to explore my 3 key projects. Stack, status and purpose."}
                    </p>

                    <div className="mt-6">
                      <Link
                        href={`/${lang}/projects`}
                        className="
                          inline-flex items-center justify-center
                          rounded-full px-6 py-3 text-sm md:text-base font-medium
                          bg-background/35 backdrop-blur-md
                          border border-border/45 shadow-sm transition
                          hover:shadow-md hover:-translate-y-0.5
                        "
                      >
                        {lang === "es" ? "Ver todos" : "View all"}
                      </Link>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="relative">
                    <div className="[perspective:1400px] relative h-[72svh] flex justify-end pt-10">
                      <div className="relative w-full max-w-[860px] h-full">
                        <DeckCard
                          project={projects[2]}
                          lang={lang}
                          scrollYProgress={scrollYProgress}
                          stage="final"
                        />
                        <DeckCard
                          project={projects[1]}
                          lang={lang}
                          scrollYProgress={scrollYProgress}
                          stage="middle"
                        />
                        <DeckCard
                          project={projects[0]}
                          lang={lang}
                          scrollYProgress={scrollYProgress}
                          stage="top"
                        />
                      </div>
                    </div>
                  </div>
                  {/* end RIGHT */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================
   MOBILE: swipe + GSAP entrance
========================= */

function ProjectsMobileSlider({
  lang,
  projects,
}: {
  lang: Lang;
  projects: Project[];
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const nodes = wrap.querySelectorAll("[data-m-anim]");
    gsap.set(nodes, { opacity: 0, y: 18, x: 10, rotateZ: -1.25 });

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;

        gsap.to(nodes, {
          opacity: 1,
          y: 0,
          x: 0,
          rotateZ: 0,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.08,
        });

        io.disconnect();
      },
      { threshold: 0.25 }
    );

    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef}>
      <div data-m-anim className="mb-4 flex justify-start">
        <div
          className="
            inline-flex items-center gap-2
            rounded-full px-4 py-2 text-xs font-medium
            bg-background/35 backdrop-blur-md
            border border-border/45
            shadow-sm
          "
        >
          <span className="opacity-80">
            {lang === "es" ? "Desliza para ver más" : "Swipe to see more"}
          </span>
          <span className="opacity-70">→</span>
        </div>
      </div>

      <div data-m-anim>
        <MobileCardSlider projects={projects} lang={lang} />
      </div>
    </div>
  );
}

function MobileCardSlider({
  projects,
  lang,
}: {
  projects: Project[];
  lang: Lang;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    const setters = cards.map((card) => {
      return {
        t: gsap.quickSetter(card, "transform"),
        o: gsap.quickTo(card, "opacity", { duration: 0.35, ease: "power3.out" }),
        g: gsap.quickTo(card, "--glow", { duration: 0.35, ease: "power3.out" }),
      };
    });

    const update = () => {
      const scrollerRect = scroller.getBoundingClientRect();
      const centerX = scrollerRect.left + scrollerRect.width / 2;

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;

        const dist = Math.min(
          1,
          Math.abs(cardCenter - centerX) / (scrollerRect.width * 0.5)
        );

        const t = 1 - dist;
        const eased = t * t;

        const dir = cardCenter < centerX ? -1 : 1;
        const rotate = dir * (1 - eased) * 6;

        const scale = 0.95 + eased * 0.05;
        const opacity = 0.72 + eased * 0.28;

        const glow = eased;

        setters[i].t(
          `translate3d(0,0,0) rotate(${rotate}deg) scale(${scale})`
        );
        setters[i].o(opacity);
        setters[i].g(glow);
      });
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={scrollerRef}
      className="
        -mx-6 px-6
        overflow-x-auto
        scroll-smooth
        overscroll-x-contain
        snap-x snap-mandatory
        no-scrollbar ios-scroll
      "
    >
      <div className="flex gap-4 pr-6">
        {projects.map((p, i) => (
          <div
            key={p.key}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="
              snap-center shrink-0
              w-[88vw] max-w-[520px]
              relative
            "
            style={
              {
                ["--glow" as any]: 0,
              } as React.CSSProperties
            }
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute -inset-5
                rounded-[36px]
                blur-2xl
                opacity-[calc(var(--glow)*0.55)]
              "
              style={{
                background:
                  "radial-gradient(900px circle at 30% 20%, rgba(255,255,255,.10), transparent 60%), radial-gradient(900px circle at 70% 40%, rgba(255,255,255,.08), transparent 60%), radial-gradient(900px circle at 50% 85%, rgba(255,255,255,.06), transparent 65%)",
              }}
            />

            <ProjectCard project={p} lang={lang} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================
   DESKTOP deck cards
========================= */

function DeckCard({
  project,
  lang,
  scrollYProgress,
  stage,
}: {
  project: Project;
  lang: Lang;
  scrollYProgress: MotionValue<number>;
  stage: "top" | "middle" | "final";
}) {
  const baseY = stage === "top" ? 0 : stage === "middle" ? 14 : 28;
  const baseScale = stage === "top" ? 1 : stage === "middle" ? 0.975 : 0.95;

  const range =
    stage === "top"
      ? [0.08, 0.42]
      : stage === "middle"
      ? [0.42, 0.78]
      : null;

  const x =
    stage === "final" ? 0 : useTransform(scrollYProgress, range!, [0, 140]);

  const y =
    stage === "final"
      ? baseY
      : useTransform(scrollYProgress, range!, [baseY, baseY + 80]);

  const z =
    stage === "final" ? 0 : useTransform(scrollYProgress, range!, [0, -220]);

  const scale =
    stage === "final"
      ? baseScale
      : useTransform(scrollYProgress, range!, [baseScale, baseScale - 0.08]);

  const rotateZ =
    stage === "final" ? 0 : useTransform(scrollYProgress, range!, [0, 10]);
  const rotateY =
    stage === "final" ? 0 : useTransform(scrollYProgress, range!, [0, 14]);

  const opacity =
    stage === "final"
      ? 1
      : useTransform(
          scrollYProgress,
          [range![0], range![1] - 0.02, range![1]],
          [1, 1, 0]
        );

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        x,
        y,
        opacity,
        scale,
        rotateZ,
        rotateY,
        translateZ: z, // ✅ FIX: NO usar "z" (atributo inválido). Usar translateZ.
        transformStyle: "preserve-3d",
      }}
    >
      <ProjectCard project={project} lang={lang} />
    </motion.div>
  );
}
