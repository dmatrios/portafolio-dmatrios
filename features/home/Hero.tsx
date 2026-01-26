import Link from "next/link";
import { HeroTyped } from "@/features/home/HeroTyped";
import { HeroBackground } from "@/features/home/HeroBackground";
import { ScrollHint } from "@/features/home/ScrollHint";

export function Hero({ lang }: { lang: "es" | "en" }) {
  const isEs = lang === "es";

  return (
    <section id="hero" className="relative h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <HeroBackground />
      </div>

      {/* Overlay para contraste (sin matar el fondo) */}
      <div className="absolute inset-0 bg-background/35" />

      {/* ✅ Scroll hint (invita a bajar) */}
      <ScrollHint />

      <div className="relative z-10 h-full">
        <div className="mx-auto h-full w-full max-w-6xl px-6 md:px-10">
          <div className="flex h-full items-center">
            <div className="max-w-2xl space-y-5">
              <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] text-black dark:text-white">
                {isEs ? "Hola, soy Daniel Maturrano" : "Hi, I'm Daniel Maturrano"}
              </h1>

              <div className="text-xl md:text-2xl font-medium text-black dark:text-white">
                <span className="opacity-80">{isEs ? "y soy" : "and I'm"}</span>{" "}
                <HeroTyped lang={lang} />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Link
                  href="#projects"
                  className="
                    rounded-full px-6 py-3 text-sm md:text-base font-medium
                    bg-background/55 backdrop-blur-md
                    border border-border/60
                    shadow-sm transition
                    hover:shadow-md hover:-translate-y-0.5
                  "
                >
                  {isEs ? "Ver proyectos" : "See projects"}
                </Link>

                <Link
                  href="#contact"
                  className="
                    rounded-full px-6 py-3 text-sm md:text-base font-medium
                    bg-background/30 backdrop-blur-md
                    border border-border/50
                    shadow-sm transition
                    hover:shadow-md hover:-translate-y-0.5
                  "
                >
                  {isEs ? "Contáctame" : "Contact me"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
