"use client";

import { useMemo, useRef } from "react";
import { useRouter } from "next/navigation";

import type { Lang, Project } from "@/shared/data/projects";
import { PROJECT_FEATURED_SWAP } from "@/shared/data/projects";

import CardSwap, { Card } from "@/components/CardSwap";

const ACCENT: Record<NonNullable<Project["accent"]>, string> = {
  violet: "border-violet-500/20",
  cyan: "border-cyan-500/20",
  amber: "border-amber-500/20",
};

export function ProjectsWelcomeSwap({ lang }: { lang: Lang }) {
  const isEs = lang === "es";
  const router = useRouter();

  const projects = useMemo(() => PROJECT_FEATURED_SWAP, []);
  const orderRef = useRef<number[]>(
    Array.from({ length: projects.length }, (_, i) => i)
  );

  return (
    <section className="relative w-full overflow-x-clip">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10 py-14 md:py-18 md:min-h-[150svh]">
        {/* Sticky SOLO desktop */}
        <div className="md:sticky md:top-24">
          <div className="grid items-start gap-10 md:grid-cols-2 md:translate-y-20 lg:translate-y-28">
            {/* Copy */}
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground/60">
                {isEs ? "Selección destacada" : "Featured selection"}
              </p>

              <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.06]">
                {isEs ? "Proyectos" : "Projects"}
              </h1>

              <p className="mt-4 max-w-prose text-base md:text-lg text-foreground/72 leading-relaxed">
                {isEs
                  ? "Trabajo aplicado en productos reales: enfoque en arquitectura, UI con criterio y performance medible."
                  : "Applied work on real products: strong architecture, intentional UI, and measurable performance."}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {["Full-Stack", "UI Motion", "Performance", "Product"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border/50 bg-background/30 px-3 py-1 text-xs text-foreground/75 backdrop-blur"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <p className="mt-5 text-xs text-foreground/55">
                {isEs
                  ? "Tip: pasa el mouse para pausar. Click para abrir."
                  : "Tip: hover to pause. Click to open."}
              </p>
            </div>

            {/* Stage */}
            <div className="relative min-w-0">
              <div
                className="
                  relative
                  h-[420px] sm:h-[520px] md:h-[560px]
                  overflow-hidden rounded-[28px]
                  md:overflow-visible md:rounded-none
                "
              >
                {/* ✅ Desktop: cards centradas y sin subir */}
                <div
                  className="
  absolute inset-0
  origin-bottom
  scale-[0.78] sm:scale-[0.9]
  md:origin-center md:scale-100
  md:translate-y-20 lg:translate-y-1
"
                >

                  <CardSwap
                    width={560}
                    height={430}
                    cardDistance={56}
                    verticalDistance={62}
                    delay={5200}
                    pauseOnHover
                    easing="smooth"
                    onOrderChange={(order) => {
                      orderRef.current = order;
                    }}
                    onCardClick={() => {
                      const frontIndex = orderRef.current[0] ?? 0;
                      const p = projects[frontIndex];
                      if (!p) return;
                      router.push(`/${lang}/projects/${p.slug}`);
                    }}
                  >
                    {projects.map((p) => (
                      <Card
                        key={p.slug}
                        customClass={[
                          "overflow-hidden",
                          "rounded-[28px]",
                          "shadow-[0_18px_70px_rgba(0,0,0,0.30)]",
                          ACCENT[p.accent ?? "violet"],
                        ].join(" ")}
                        onClick={() => {
                          const frontIndex = orderRef.current[0] ?? 0;
                          const front = projects[frontIndex];
                          if (!front) return;
                          router.push(`/${lang}/projects/${front.slug}`);
                        }}
                      >
                        <div className="group relative h-full w-full">
                          {/* <img> para evitar glitch de next/image con transforms 3D */}
                          {p.coverSrc ? (
                            <img
                              src={p.coverSrc}
                              alt={`${p.title} cover`}
                              className="
                                absolute inset-0 h-full w-full object-cover
                                opacity-95 transition duration-500
                                group-hover:scale-[1.02]
                                saturate-[0.92] contrast-[1.06]
                              "
                              draggable={false}
                            />
                          ) : null}

                          {/* Treatment: contraste premium, menos oscuro en modo claro */}
                          <div className="absolute inset-0">
                            <div className="absolute inset-0 bg-black/16" />
                            <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,transparent_0%,rgba(0,0,0,0.38)_72%,rgba(0,0,0,0.52)_100%)]" />
                            <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black/72 via-black/28 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 h-[44%] backdrop-blur-[2px]" />
                          </div>

                          {/* Content */}
                          <div className="absolute inset-x-0 bottom-0 p-6">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-white">
                                {p.title}
                              </span>
                              <span className="h-1 w-1 rounded-full bg-white/35" />
                              <span className="text-xs text-white/70">
                                {isEs ? "Abrir proyecto" : "Open project"}
                              </span>
                            </div>

                            <p className="mt-2 text-sm text-white/82 leading-relaxed">
                              {p.description[lang]}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                              {(p.tags ?? []).map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full border border-white/12 bg-white/7 px-3 py-1 text-[11px] text-white/85"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="pointer-events-none absolute -inset-10 opacity-0 blur-2xl transition-opacity duration-200 group-hover:opacity-100 bg-[radial-gradient(circle,rgba(255,255,255,0.14),transparent_55%)]" />
                        </div>
                      </Card>
                    ))}
                  </CardSwap>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* aire solo desktop para sticky */}
        <div className="hidden md:block h-20" />
      </div>
    </section>
  );
}
