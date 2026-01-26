"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function FloatingLangSwitch() {
  const pathname = usePathname();

  const segments = (pathname ?? "/").split("/").filter(Boolean);
  const currentLang = segments[0] === "en" ? "en" : "es";
  const isEn = currentLang === "en";

  const nextLang = isEn ? "es" : "en";
  const nextPath =
    segments.length === 0
      ? `/${nextLang}`
      : `/${[nextLang, ...segments.slice(1)].join("/")}`;

  return (
    <Link
      href={nextPath}
      role="switch"
      aria-checked={isEn}
      aria-label={isEn ? "Cambiar a Español" : "Switch to English"}
      className="
        fixed bottom-20 right-5 z-50
        inline-flex items-center
        h-11 w-[84px]
        rounded-full
        border border-border/60
        bg-background/55 backdrop-blur-xl
        shadow-[0_18px_60px_-40px_rgba(0,0,0,0.55)]
        transition
        hover:-translate-y-0.5 hover:bg-background/70 hover:shadow-[0_22px_70px_-40px_rgba(0,0,0,0.6)]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20
        active:scale-[0.98]
      "
    >
      {/* Track labels */}
      <span className="absolute left-3 text-[11px] font-[750] tracking-wide text-foreground/70">
        ES
      </span>
      <span className="absolute right-3 text-[11px] font-[750] tracking-wide text-foreground/70">
        EN
      </span>

      {/* Knob */}
      <span
        aria-hidden="true"
        className={[
          "absolute top-1/2 -translate-y-1/2",
          "h-8 w-9 rounded-full",
          "border border-border/60",
          "bg-background",
          "shadow-sm",
          "transition-transform duration-200",
          isEn ? "translate-x-[42px]" : "translate-x-[6px]",
        ].join(" ")}
      >
        <span className="grid h-full w-full place-items-center text-[11px] font-[850] text-foreground/85">
          {isEn ? "EN" : "ES"}
        </span>
      </span>
    </Link>
  );
}
