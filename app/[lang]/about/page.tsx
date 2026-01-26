import AboutIntroScroll from "@/features/about/AboutIntroScroll";
import { AboutPrinciples } from "@/features/about/AboutPrinciples";
import { AboutStory } from "@/features/about/AboutStory";
import { AboutMusic } from "@/features/about/AboutMusic";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: "es" | "en" }>;
}) {
  const { lang } = await params;

  return (
    <main className="relative pt-24">
      <AboutIntroScroll lang={lang} />
      <AboutStory lang={lang} />
      <AboutMusic lang={lang} />

     
    </main>
  );
}
