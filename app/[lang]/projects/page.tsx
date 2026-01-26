import { notFound } from "next/navigation";
import { ProjectsWelcomeSwap } from "@/features/projects/ProjectsWelcomeSwap";
import { TechMarquee } from "@/features/home/TechMarquee";
import { ProjectsShowcase } from "@/features/projects/ProjectsShowcase";

const SUPPORTED_LANGS = ["es", "en"] as const;

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!SUPPORTED_LANGS.includes(lang as (typeof SUPPORTED_LANGS)[number])) {
    notFound();
  }

  const safeLang = (lang === "en" ? "en" : "es") as "es" | "en";

  return (
    <main className="w-full">
      <ProjectsWelcomeSwap lang={safeLang} />
      <TechMarquee />
      <ProjectsShowcase lang={safeLang} />
    </main>
  );
}
