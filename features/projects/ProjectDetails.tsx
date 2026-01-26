import Link from "next/link";
import {
  ExternalLink,
  Github,
  Calendar,
  Timer,
  Layers,
  CheckCircle2,
  User,
} from "lucide-react";
import type { Lang, Project } from "@/shared/data/projects";
import { TechStack } from "@/features/projects/TechStack";

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border/50 bg-background/25 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-foreground/65" />
        <span className="text-xs text-foreground/55">{label}</span>
      </div>
      <div className="mt-1 text-sm text-foreground/80 leading-snug">{value}</div>
    </div>
  );
}

export function ProjectDetails({ project, lang }: { project: Project; lang: Lang }) {
  const L = lang;

  const hasYear = Boolean(project.meta?.year);
  const hasDuration = Boolean(project.meta?.duration?.[L]);
  const hasRole = Boolean(project.meta?.role?.[L]);
  const hasArchitecture = Boolean(project.meta?.architecture?.[L]);
  const hasHighlights = Boolean(project.highlights?.[L]?.length);

  return (
    <aside className="min-w-0 lg:pt-1">
      <p className="text-sm font-medium text-foreground/55">
        {L === "es" ? "Proyecto" : "Project"}
      </p>

      {/* Layout interno: 1 col en mobile, 2 cols en desktop */}
      <div className="mt-2 grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        {/* LEFT: contenido principal */}
        <div className="min-w-0">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.06]">
            {project.title}
          </h1>

          <p className="mt-3 text-base md:text-lg text-foreground/72 leading-relaxed lg:line-clamp-2">
            {project.description[L]}
          </p>

          {/* Tech icons */}
          <TechStack tech={project.tech} />

          {/* CTAs más cerca del contenido (conversión) */}
          {(project.links?.live || project.links?.repo?.backend || project.links?.repo?.frontend) ? (
            <div className="mt-5 flex flex-wrap gap-3">
              {project.links?.live ? (
                <Link
                  href={project.links.live}
                  target="_blank"
                  className="
                    inline-flex items-center gap-2
                    rounded-full px-5 py-2.5 text-sm font-medium
                    border border-border/60 bg-background/45 backdrop-blur
                    shadow-[0_18px_55px_-40px_rgba(0,0,0,.75)]
                    transition
                    hover:-translate-y-0.5 hover:bg-background/60
                  "
                >
                  <ExternalLink className="h-4 w-4" />
                  {L === "es" ? "Ver demo" : "Live demo"}
                </Link>
              ) : null}

              {project.links?.repo?.backend ? (
                <Link
                  href={project.links.repo.backend}
                  target="_blank"
                  className="
                    inline-flex items-center gap-2
                    rounded-full px-5 py-2.5 text-sm font-medium
                    border border-border/60 bg-background/25 backdrop-blur
                    shadow-[0_18px_50px_-40px_rgba(0,0,0,.6)]
                    transition
                    hover:-translate-y-0.5 hover:bg-background/35
                  "
                >
                  <Github className="h-4 w-4" />
                  {L === "es" ? "Backend" : "Backend"}
                </Link>
              ) : null}

              {project.links?.repo?.frontend ? (
                <Link
                  href={project.links.repo.frontend}
                  target="_blank"
                  className="
                    inline-flex items-center gap-2
                    rounded-full px-5 py-2.5 text-sm font-medium
                    border border-border/60 bg-background/25 backdrop-blur
                    shadow-[0_18px_50px_-40px_rgba(0,0,0,.6)]
                    transition
                    hover:-translate-y-0.5 hover:bg-background/35
                  "
                >
                  <Github className="h-4 w-4" />
                  {L === "es" ? "Frontend" : "Frontend"}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* RIGHT: info rápida (compacta, no “lista”) */}
        <div className="min-w-0">
          {(hasYear || hasDuration || hasRole) ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {hasYear ? (
                <StatCard
                  icon={Calendar}
                  label={L === "es" ? "Año" : "Year"}
                  value={project.meta!.year!}
                />
              ) : null}

              {hasDuration ? (
                <StatCard
                  icon={Timer}
                  label={L === "es" ? "Duración" : "Duration"}
                  value={project.meta!.duration![L]}
                />
              ) : null}

              {hasRole ? (
                <StatCard
                  icon={User}
                  label={L === "es" ? "Rol" : "Role"}
                  value={project.meta!.role![L]}
                />
              ) : null}
            </div>
          ) : null}

          {hasArchitecture ? (
            <div className="mt-4 rounded-3xl border border-border/50 bg-background/20 p-5 backdrop-blur">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-foreground/65" />
                <h3 className="text-sm font-semibold text-foreground/85">
                  {L === "es" ? "Arquitectura" : "Architecture"}
                </h3>
              </div>
              <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
                {project.meta!.architecture![L]}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      {/* Highlights abajo como bloque final (se siente “sección”, no lista infinita) */}
      {hasHighlights ? (
        <div className="mt-6 rounded-3xl border border-border/50 bg-background/20 p-5 backdrop-blur">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-foreground/65" />
            <h3 className="text-sm font-semibold text-foreground/85">
              {L === "es" ? "Puntos clave" : "Highlights"}
            </h3>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {project.highlights![L].slice(0, 4).map((x) => (
              <div
                key={x}
                className="
                  rounded-2xl border border-border/45 bg-background/15 px-4 py-3
                  text-sm text-foreground/72 leading-relaxed
                  backdrop-blur
                "
              >
                {x}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </aside>
  );
}
