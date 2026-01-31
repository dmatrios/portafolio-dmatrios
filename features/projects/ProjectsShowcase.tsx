"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Lang, Project } from "@/shared/data/projects";
import { PROJECTS } from "@/shared/data/projects";
import { ProjectCard } from "@/features/projects/ProjectCard";

type FilterKey = "all" | "fullstack" | "backend" | "landing" ;

function getCategory(p: Project): Exclude<FilterKey, "all"> {
  const hasSpring = p.tech.includes("spring");
  const hasDb = p.tech.includes("mysql");
  const hasFrontend =
    p.tech.includes("react") || p.tech.includes("next") || p.tech.includes("angular") || p.tech.includes("vue");

  // Landing: sin backend, orientado a marketing (cualquier frontend sin Spring)
  if (!hasSpring && hasFrontend) {
    return "landing";
  }

  // Full-stack
  if (hasSpring && hasDb && hasFrontend) return "fullstack";

  // Backend
  if (hasSpring && !hasFrontend) return "backend";

  return "backend";
}

export function ProjectsShowcase({ lang }: { lang: Lang }) {
  const L = lang;

  const copy = useMemo(() => {
    if (L === "es") {
      return {
        title: "Explora proyectos como productos",
        subtitle:
          "Cada card es una landing: preview real, stack, estado y acceso al detalle con galería + demo.",
        ctas: {
          all: "Todos",
          fullstack: "Full-Stack",
          backend: "Backend",
          landing: "Frontend",
        },
      };
    }
    return {
      title: "Explore projects like products",
      subtitle:
        "Each card is a product page: real preview, stack, status and access to detail with gallery + demo.",
      ctas: {
        all: "All",
        fullstack: "Full-Stack",
        backend: "Backend",
        landing: "Frontend",
      },
    };
  }, [L]);

  const items = useMemo(() => {
    // Solo los que tienen cover para que se vea premium
    return PROJECTS.filter((p) => !!p.coverSrc) as Project[];
  }, []);

  const [filter, setFilter] = useState<FilterKey>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((p) => getCategory(p) === filter);
  }, [items, filter]);

  const FilterButton = ({ k, label }: { k: FilterKey; label: string }) => {
    const active = filter === k;

    return (
      <button
        type="button"
        onClick={() => setFilter(k)}
        aria-pressed={active}
        className={[
          "relative inline-flex shrink-0 items-center justify-center rounded-full px-4 py-2 text-sm font-medium",
          "border backdrop-blur-xl transition",
          "hover:-translate-y-0.5 hover:shadow-[0_18px_70px_rgba(0,0,0,0.14)]",
          "active:scale-[0.98]",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20",
          active
            ? "border-border/80 bg-background/60 text-foreground shadow-[0_18px_60px_rgba(0,0,0,0.16)]"
            : "border-border/45 bg-background/25 text-foreground/80 hover:bg-background/35",
        ].join(" ")}
      >
        {/* glow sutil cuando está activo */}
        {active ? (
          <span
            aria-hidden="true"
            className="
              pointer-events-none absolute -inset-6 -z-10
              rounded-full blur-2xl
              bg-[radial-gradient(circle,rgba(255,255,255,0.10),transparent_60%)]
            "
          />
        ) : null}

        {label}
      </button>
    );
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-6 md:px-10 pb-16">
      {/* Header */}
      <div className="pt-10 md:pt-14">
        <p className="text-sm font-medium text-foreground/60">
          {L === "es" ? "Catálogo" : "Catalog"}
        </p>

        <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.05]">
              {copy.title}
            </h2>
            <p className="mt-2 text-sm md:text-base text-foreground/65 max-w-[70ch] leading-relaxed">
              {copy.subtitle}
            </p>

            {/* contador (opcional, queda pro) */}
            <p className="mt-3 text-xs text-foreground/55">
              {L === "es"
                ? `${filtered.length} resultado${filtered.length === 1 ? "" : "s"}`
                : `${filtered.length} result${filtered.length === 1 ? "" : "s"}`}
            </p>
          </div>

          {/* Filters */}
          <div
            className="
              -mx-6 px-6 md:mx-0 md:px-0
              mt-2 md:mt-0
              flex gap-2 md:gap-2
              overflow-x-auto md:overflow-visible
              no-scrollbar
              overscroll-x-contain
            "
          >
            <FilterButton k="all" label={copy.ctas.all} />
            <FilterButton k="fullstack" label={copy.ctas.fullstack} />
            <FilterButton k="backend" label={copy.ctas.backend} />
            <FilterButton k="landing" label={copy.ctas.landing} />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-5 grid-cols-1 md:grid-cols-2">
        {filtered.map((p) => (
          <Link
            key={p.slug}
            href={`/${L}/projects/${p.slug}`}
            className="
              group block
              transition
              hover:-translate-y-1
              focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20
            "
          >
            {/* Tu ProjectCard ya muestra cover + tech */}
            <ProjectCard project={p} lang={L} ctaAs="span" />

            {/* Glow extra por fuera */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                -mt-6
                h-6
                opacity-0
                transition-opacity
                group-hover:opacity-100
              "
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
