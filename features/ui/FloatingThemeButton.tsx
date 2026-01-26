"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function FloatingThemeButton() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const current = theme === "system" ? systemTheme : theme;
  const isDark = current === "dark";

  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="
        fixed bottom-6 right-6 z-50
        inline-flex items-center
        h-12 w-[86px]
        rounded-full
        border border-border/60
        bg-background/70 backdrop-blur
        shadow-[0_18px_60px_-40px_rgba(0,0,0,0.55)]
        transition
        hover:-translate-y-0.5 hover:bg-background/85 hover:shadow-[0_22px_70px_-40px_rgba(0,0,0,0.65)]
        active:scale-[0.98]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20
      "
    >
      {/* Track icons */}
      <span className="absolute left-2 grid h-8 w-8 place-items-center text-foreground/65">
        <Sun className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="absolute right-2 grid h-8 w-8 place-items-center text-foreground/65">
        <Moon className="h-4 w-4" aria-hidden="true" />
      </span>

      {/* Knob */}
      <span
        aria-hidden="true"
        className={[
          "absolute top-1/2 -translate-y-1/2",
          "h-9 w-9 rounded-full",
          "border border-border/60",
          "bg-background",
          "shadow-sm",
          "transition-transform duration-200",
          isDark ? "translate-x-[44px]" : "translate-x-[6px]",
        ].join(" ")}
      >
        <span className="grid h-full w-full place-items-center text-foreground/85">
          {isDark ? (
            <Moon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Sun className="h-4 w-4" aria-hidden="true" />
          )}
        </span>
      </span>
    </button>
  );
}
