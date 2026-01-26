"use client";

import { SkillsClaim } from "@/features/skills/SkillsClaim";
import { SkillsToolkit } from "@/features/skills/SkillsToolkit";

export function SkillsSection({ lang }: { lang: "es" | "en" }) {
  return (
    <section
      id="skills"
      aria-label={lang === "es" ? "Habilidades" : "Skills"}
      className="relative"
    >
      {/* A) Claim */}
      <SkillsClaim lang={lang} />

      {/* B) Toolkit */}
      <SkillsToolkit lang={lang} />
    </section>
  );
}
