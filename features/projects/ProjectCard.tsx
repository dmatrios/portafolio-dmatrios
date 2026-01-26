"use client";

import Image from "next/image";
import type { Lang, Project, ProjectPreview, ProjectStatus } from "@/shared/data/projects";
import { TECH_ICON } from "@/shared/ui/tech-icons";

type CardProject = Project | ProjectPreview;

function statusLabel(status: ProjectStatus, lang: Lang) {
  if (status === "deployed") return lang === "es" ? "DEPLOY" : "LIVE";
  if (status === "paused") return lang === "es" ? "PAUSADO" : "PAUSED";
  return lang === "es" ? "LOCAL" : "LOCAL";
}

function isFullProject(p: CardProject): p is Project {
  return typeof (p as any).description === "object";
}

export function ProjectCard({
  project,
  lang,
  ctaAs = "span", // "span" si lo envuelves con <Link>, "none" si no quieres CTA
}: {
  project: CardProject;
  lang: Lang;
  ctaAs?: "span" | "none";
}) {
  const L = lang;

  const description = isFullProject(project) ? project.description[L] : project.description;
  const coverSrc = isFullProject(project) ? project.coverSrc : undefined;
  const slug = isFullProject(project) ? project.slug : undefined;

  return (
    <div
      className="
        relative h-full w-full
        rounded-3xl border border-border/50
        bg-background/45 dark:bg-background/25
        backdrop-blur-xl
        shadow-lg
        overflow-hidden
      "
    >
      <div className="relative h-52 md:h-64 bg-background/20 overflow-hidden">
        {coverSrc ? (
          <>
            <Image
              src={coverSrc}
              alt={`${project.title} cover`}
              fill
              className="object-cover object-center"
              sizes="(min-width: 768px) 640px, 88vw"
              priority={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-90" />
          </>
        ) : (
          <div className="absolute inset-0 grid place-items-center text-xs text-foreground/55">
            No preview
          </div>
        )}
      </div>

      <div className="p-6 md:p-7 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight truncate">
              {project.title}
            </h3>
            <p className="mt-2 text-sm md:text-base opacity-80 max-w-[58ch] line-clamp-2">
              {description}
            </p>
          </div>

          <span className="shrink-0 rounded-full border border-border/40 px-4 py-2 text-xs md:text-sm opacity-80 bg-background/20 backdrop-blur">
            {statusLabel(project.status, L)}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          {project.tech.map((k) => {
            const { Icon, name } = TECH_ICON[k];
            return (
              <span
                key={k}
                className="
                  inline-flex items-center justify-center
                  rounded-full border border-border/40
                  bg-background/20 backdrop-blur
                  p-2.5
                "
                aria-label={name}
                title={name}
              >
                <Icon className="h-5 w-5" />
              </span>
            );
          })}
        </div>

        {ctaAs === "span" ? (
          <div className="pt-2">
            <span
              className="
                inline-flex items-center justify-center
                rounded-full px-6 py-3 text-sm md:text-base font-medium
                bg-background/55 backdrop-blur-md
                border border-border/50
                shadow-sm transition
                group-hover:shadow-md group-hover:-translate-y-0.5
              "
            >
              {L === "es" ? (slug ? "Ver detalle" : "Ver") : (slug ? "View details" : "View")}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
