import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";

import type { Lang, Project } from "@/shared/data/projects";
import { PROJECTS } from "@/shared/data/projects";

import { ProjectGallery } from "@/features/projects/ProjectGallery";
import { ProjectDetails } from "@/features/projects/ProjectDetails";
import { RelatedProjects } from "@/features/projects/RelatedProjects";
import { ProjectDemo } from "@/features/projects/ProjectDemo";
import { ContactCta } from "@/features/layout/ContactCta";
import { Contact } from "@/features/home/Contact";

const SUPPORTED_LANGS = ["es", "en"] as const;

function safeLang(lang: string): Lang {
  return lang === "en" ? "en" : "es";
}

function readGalleryFromPublic(galleryDir?: string) {
  if (!galleryDir) return [];

  const absolute = path.join(process.cwd(), "public", galleryDir);

  try {
    const files = fs.readdirSync(absolute);

    const imgs = files
      .filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f))
      .filter((f) => !/^cover\./i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    return imgs.map((f) => `${galleryDir}/${f}`);
  } catch {
    return [];
  }
}

function pickRelated(all: Project[], currentSlug: string, take = 3) {
  const pool = all.filter((p) => p.slug !== currentSlug && p.coverSrc);
  // simple “semi-random” estable: orden por title y corta
  // (si luego quieres random real, lo hacemos con seed)
  return pool.slice(0, take);
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  if (!SUPPORTED_LANGS.includes(lang as any)) notFound();

  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const L = safeLang(lang);
  const galleryImages = readGalleryFromPublic(project.galleryDir);
  const related = pickRelated(PROJECTS, project.slug, 3);

  return (
    <main className="relative w-full">
      {/* Intro global + back */}
      <section className="mx-auto w-full max-w-6xl px-6 md:px-10 pt-10 md:pt-12">
        <Link
          href={`/${L}/projects`}
          className="
            inline-flex items-center gap-2
            rounded-full border border-border/60 bg-background/25 backdrop-blur
            px-4 py-2 text-sm text-foreground/75
            transition hover:bg-background/35 hover:-translate-y-0.5 hover:shadow-sm
          "
        >
          ← {L === "es" ? "Volver a proyectos" : "Back to projects"}
        </Link>

        <div className="mt-6">
          <p className="text-sm font-medium text-foreground/60">
            {L === "es"
              ? "Detalle del producto"
              : "Product detail"}
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">
            {L === "es"
              ? "Diseño, arquitectura y decisiones con intención."
              : "Intentional design, architecture and decisions."}
          </h2>
          <p className="mt-2 max-w-2xl text-sm md:text-base text-foreground/65 leading-relaxed">
            {L === "es"
              ? "Cada proyecto se presenta como un producto: contexto, enfoque técnico y evidencia visual (capturas o demo)."
              : "Each project is presented like a product: context, technical focus, and visual proof (screens or demo)."}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto w-full max-w-6xl px-6 md:px-10 py-10 md:py-12">
        {/* ✅ Mobile: Details arriba, Gallery abajo */}
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="order-2 lg:order-1 min-w-0">
            <ProjectGallery
              title={project.title}
              coverSrc={project.coverSrc}
              images={galleryImages}
            />
          </div>

          <div className="order-1 lg:order-2 min-w-0 lg:sticky lg:top-24 lg:self-start">
            <ProjectDetails project={project} lang={L} />
          </div>
        </div>
      </section>

      {/* Demo (si existe) */}
      {project.demo?.youtubeId ? (
        <ProjectDemo
          lang={L}
          youtubeId={project.demo.youtubeId}
          title={project.demo.label}
        />
      ) : null}
      <ContactCta lang={L} href="#contact" />
      {/* Related */}
      <RelatedProjects lang={L} items={related} />

      {/* Contact */}
      <Contact lang={L} />
    </main>
  );
}
