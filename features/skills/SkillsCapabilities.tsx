import { CAPABILITIES } from "@/shared/data/skills";

export function SkillsCapabilities({ lang }: { lang: "es" | "en" }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {CAPABILITIES.map((c) => (
        <div
          key={c.key}
          className="
            rounded-2xl
            border border-border/45
            bg-background/20
            backdrop-blur-md
            p-5 md:p-6
          "
        >
          <h3 className="text-base md:text-lg font-semibold">
            {c.title[lang]}
          </h3>
          <p className="mt-2 text-sm opacity-80 leading-relaxed">
            {c.desc[lang]}
          </p>
        </div>
      ))}
    </div>
  );
}
