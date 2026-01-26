import { Hero } from "@/features/home/Hero";
import { About } from "@/features/home/About";
import { Contact } from "@/features/home/Contact";
import { TechMarquee } from "@/features/home/TechMarquee";
import { ProjectsPreview } from "@/features/home/ProjectsPreview";
import { ProjectsDeck } from "@/features/home/ProjectsDeck";
import { SkillsSection } from "@/features/skills/SkillsSection";


export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const safeLang = lang === "en" ? "en" : "es";

  return (
    <main>
      <Hero lang={safeLang} />
      <TechMarquee />

      <ProjectsDeck lang={safeLang} />
      <SkillsSection lang={safeLang} />
      <About lang={safeLang} />
      <Contact lang={safeLang} />


  
    </main>
  );
}