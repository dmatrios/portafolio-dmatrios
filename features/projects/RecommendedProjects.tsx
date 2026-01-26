import Link from "next/link";
import type { Lang, Project } from "@/shared/data/projects";

function hashString(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pickRecommended(all: Project[], currentSlug: string, n: number) {
  const pool = all.filter((p) => p.slug !== currentSlug);
  if (pool.length <= n) return pool;

  const seed = hashString(currentSlug);
  const scored = pool.map((p) => ({
    p,
    score: hashString(p.slug + ":" + seed),
  }));

  scored.sort((a, b) => a.score - b.score);
  return scored.slice(0, n).map((x) => x.p);
}

export function RecommendedProjects({
  lang,
  currentSlug,
  projects,
}: {
  lang: Lang;
  currentSlug: string;
  projects: Project[];
}) {
  const rec = pickRecommended(projects, currentSlug, 3);

  return (
    <section className="mt-14 md:mt-18">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-sm font-medium text-foreground/60">
            {lang === "es" ? "Siguiente paso" : "Next"}
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">
            {lang === "es" ? "También te puede interesar" : "You may also like"}
          </h2>
          <p className="mt-3 text-foreground/72">
            {lang === "es"
              ? "Otros proyectos con enfoques distintos: producto, performance y UI."
              : "Other projects with different angles: product, performance and UI."}
          </p>
        </div>

        <Link
          href={`/${lang}/projects`}
          className="hidden md:inline-flex rounded-full border border-border/60 bg-background/30 px-4 py-2 text-sm text-foreground/80 backdrop-blur transition hover:bg-background/40"
        >
          {lang === "es" ? "Ver todos" : "View all"}
        </Link>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {rec.map((p) => (
          <Link
            key={p.slug}
            href={`/${lang}/projects/${p.slug}`}
            className="group rounded-3xl border border-border/50 bg-background/10 p-5 backdrop-blur transition hover:-translate-y-1 hover:bg-background/12 hover:shadow-md"
          >
            <p className="text-sm font-semibold">{p.title}</p>
            <p className="mt-2 text-sm text-foreground/72 line-clamp-3">
              {p.description[lang]}
            </p>

            {p.tags?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border/60 bg-background/20 px-3 py-1 text-[11px] text-foreground/75"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}

            <span className="mt-4 inline-flex text-xs text-foreground/55">
              {lang === "es" ? "Abrir proyecto →" : "Open project →"}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-6 md:hidden">
        <Link
          href={`/${lang}/projects`}
          className="inline-flex rounded-full border border-border/60 bg-background/30 px-4 py-2 text-sm text-foreground/80 backdrop-blur transition hover:bg-background/40"
        >
          {lang === "es" ? "Ver todos" : "View all"}
        </Link>
      </div>
    </section>
  );
}
