"use client";

import type { TechKey } from "@/shared/data/projects";
import { TECH_ICON } from "@/shared/ui/tech-icons"; // ajusta ruta

export function TechStack({ tech }: { tech: TechKey[] }) {
  if (!tech?.length) return null;

  return (
    <div className="mt-5 flex flex-wrap items-center gap-2">
      {tech.map((k) => {
        const item = TECH_ICON[k];
        if (!item) return null;
        const Icon = item.Icon;

        return (
          <span key={k} className="relative group">
            <span
              className="
                inline-flex items-center justify-center
                h-10 w-10 rounded-full
                border border-border/55 bg-background/25 backdrop-blur
                shadow-[0_16px_45px_-32px_rgba(0,0,0,.6)]
                transition
                hover:-translate-y-0.5 hover:border-border/80 hover:bg-background/35
                focus-within:ring-2 focus-within:ring-white/20
              "
              aria-label={item.name}
              title={item.name}
            >
              <Icon className="h-[18px] w-[18px] opacity-90 transition group-hover:opacity-100" />
            </span>

            {/* tooltip */}
            <span
              className="
                pointer-events-none absolute left-1/2 top-full z-10 mt-2
                -translate-x-1/2 whitespace-nowrap
                rounded-full border border-white/10 bg-black/70 px-3 py-1
                text-[11px] text-white/85 backdrop-blur
                opacity-0 translate-y-1 transition
                group-hover:opacity-100 group-hover:translate-y-0
              "
            >
              {item.name}
            </span>
          </span>
        );
      })}
    </div>
  );
}
