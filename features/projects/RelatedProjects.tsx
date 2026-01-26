"use client";

import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import type { Lang, Project } from "@/shared/data/projects";

export function RelatedProjects({
  lang,
  items,
}: {
  lang: Lang;
  items: Project[];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.25, once: true });

  const L = lang;

  const title = L === "es" ? "También te puede interesar" : "You may also like";
  const subtitle =
    L === "es"
      ? "Otros proyectos con enfoque en producto, UI y arquitectura."
      : "More projects focused on product, UI and architecture.";

  return (
    <section ref={ref} className="mx-auto w-full max-w-6xl px-6 md:px-10 pb-16">
      <div className="pt-8 md:pt-12">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {title}
        </h2>
        <p className="mt-2 text-sm md:text-base text-foreground/65 max-w-prose">
          {subtitle}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((p, idx) => {
            const cover = p.coverSrc;

            return (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
                transition={{
                  duration: 0.55,
                  delay: 0.06 * idx,
                }}
              >
                <Link
                  href={`/${lang}/projects/${p.slug}`}
                  className="
                    group relative block overflow-hidden rounded-3xl
                    border border-border/50 bg-background/20 backdrop-blur
                    transition
                    hover:-translate-y-1 hover:border-border/70
                    hover:shadow-[0_20px_80px_rgba(0,0,0,0.22)]
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20
                  "
                >
                  {/* Cover */}
                  <div className="relative overflow-hidden">
                    <div className="relative aspect-[16/10] w-full bg-black/30">
                      {cover ? (
                        <img
                          src={cover}
                          alt={`${p.title} cover`}
                          className="
                            absolute inset-0 h-full w-full object-cover
                            transition duration-500
                            group-hover:scale-[1.03]
                          "
                          draggable={false}
                        />
                      ) : (
                        <div className="absolute inset-0 grid place-items-center">
                          <div className="text-xs text-foreground/55">No cover</div>
                        </div>
                      )}

                      {/* Overlay + shine */}
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.0),rgba(0,0,0,0.35))]" />
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <div className="absolute -top-16 left-1/2 h-40 w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.10),transparent_60%)] blur-2xl" />
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold truncate">
                          {p.title}
                        </div>
                        <div className="mt-1 text-xs text-foreground/65 line-clamp-2">
                          {p.description[lang]}
                        </div>
                      </div>

                      <span
                        className="
                          shrink-0 rounded-full border border-border/50
                          bg-background/25 px-3 py-1 text-[11px] text-foreground/70
                        "
                      >
                        {p.status === "deployed"
                          ? L === "es"
                            ? "Deploy"
                            : "Live"
                          : p.status === "paused"
                          ? L === "es"
                            ? "Pausado"
                            : "Paused"
                          : L === "es"
                          ? "Local"
                          : "Local"}
                      </span>
                    </div>

                    {(p.tags ?? []).length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {(p.tags ?? []).slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="
                              rounded-full border border-border/50
                              bg-background/25 px-3 py-1 text-[11px] text-foreground/70
                              transition
                              group-hover:border-border/70
                            "
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  {/* Glow */}
                  <div className="pointer-events-none absolute -inset-10 opacity-0 blur-2xl transition-opacity duration-200 group-hover:opacity-100 bg-[radial-gradient(circle,rgba(255,255,255,0.10),transparent_55%)]" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
