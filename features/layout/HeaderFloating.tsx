"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Magnetic } from "@/features/ui/Magnetic";

export function HeaderFloating({ lang }: { lang: "es" | "en" }) {
  const [visible, setVisible] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (y < 24) {
        setVisible(false);
        lastY.current = y;
        return;
      }

      if (Math.abs(delta) > 2) setVisible(delta > 0);
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const t = {
    about: lang === "es" ? "Sobre mí" : "About",
    projects: lang === "es" ? "Proyectos" : "Projects",
    skills: lang === "es" ? "Habilidades" : "Skills",
    contact: lang === "es" ? "Contacto" : "Contact",
    viewAll: lang === "es" ? "Ver todos" : "View all",
  };

  return (
    <header
      className={[
        "fixed top-4 left-1/2 z-[70] -translate-x-1/2",
        "transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none",
      ].join(" ")}
    >
      <nav
        className={[
          "hidden md:flex items-center gap-2",
          "rounded-full px-3 py-2",
          "border border-[rgba(var(--border),0.75)]",
          "bg-[rgba(var(--background),0.55)] backdrop-blur-xl",
          "shadow-[0_18px_70px_rgba(0,0,0,0.18)]",
        ].join(" ")}
        aria-label="Primary"
      >
        <GlowLink href={`/${lang}`} label="Dmatrios" />
        <div className="h-5 w-px bg-[rgba(var(--border),0.9)] mx-1" />
        <GlowLink href={`/${lang}#about`} label={t.about} />
        <GlowLink href={`/${lang}/projects`} label={t.projects} />
        <GlowLink href={`/${lang}#skills`} label={t.skills} />
        <GlowLink href={`/${lang}/contact`} label={t.contact} />
        <div className="h-5 w-px bg-[rgba(var(--border),0.9)] mx-1" />
        <GlowLink href={`/${lang}/projects`} label={t.viewAll} tone="cta" />
      </nav>
    </header>
  );
}

function GlowLink({
  href,
  label,
  tone = "default",
}: {
  href: string;
  label: string;
  tone?: "default" | "cta";
}) {
  return (
    <Magnetic strength={12}>
      <Link
        href={href}
        className={[
          "group relative inline-flex items-center rounded-full px-3 py-2",
          "text-[13px] font-[750]",
          "text-[rgba(var(--foreground),0.92)] hover:text-[rgba(var(--foreground),1)]",
          "transition will-change-transform select-none",
          "hover:-translate-y-[1px] hover:shadow-[0_12px_36px_rgba(0,0,0,0.22)]",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--foreground),0.22)]",
          "overflow-hidden",
          tone === "cta"
            ? "bg-[rgba(var(--foreground),0.08)] hover:bg-[rgba(var(--foreground),0.12)] border border-[rgba(var(--foreground),0.12)]"
            : "hover:bg-[rgba(var(--foreground),0.06)]",
        ].join(" ")}
      >
        <span
          className={[
            "pointer-events-none absolute inset-[-18px] rounded-full opacity-0 blur-2xl",
            "bg-[radial-gradient(circle_at_50%_50%,rgba(var(--foreground),0.18),transparent_60%)]",
            "transition-opacity duration-200",
            "group-hover:opacity-100",
          ].join(" ")}
        />
        <span
          className={[
            "pointer-events-none absolute inset-0 rounded-full opacity-0",
            "border border-[rgba(var(--foreground),0.14)]",
            "transition-opacity duration-200",
            "group-hover:opacity-100",
          ].join(" ")}
        />
        <span className="relative">{label}</span>
      </Link>
    </Magnetic>
  );
}
