"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

import { HeaderFloating } from "@/features/layout/HeaderFloating";
import {
  StaggeredMenu,
  type MenuItem,
  type SocialItem,
} from "@/features/layout/StaggeredMenu";

export default function Header({ lang }: { lang: "es" | "en" }) {
  const isEs = lang === "es";
  const [open, setOpen] = useState(false);

  const items: MenuItem[] = useMemo(
    () => [
      { label: isEs ? "Sobre mí" : "About", href: `/${lang}#about` },
      { label: isEs ? "Proyectos" : "Projects", href: `/${lang}#projects` },
      { label: "Skills", href: `/${lang}#skills` },
      { label: isEs ? "Contacto" : "Contact", href: `/${lang}/contact` },
      { label: isEs ? "Ver todos" : "View all", href: `/${lang}/projects` },
    ],
    [isEs, lang]
  );

  const socials: SocialItem[] = useMemo(
    () => [
      { label: "GitHub", href: "https://github.com/dmatrios", icon: "github" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/daniel-maturrano/", icon: "linkedin" },
      { label: "Email", href: "mailto:ddmatrios@gmail.com", icon: "mail" },
    ],
    []
  );

  return (
    <>
      {/* Desktop floating pill */}
      <HeaderFloating lang={lang} />

      {/* Mobile button: keep FIXED wrapper clean, style inside */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="group fixed md:hidden top-4 right-4 z-[99999] h-12 w-12"
      >
        <span
          className={[
            "relative grid h-full w-full place-items-center rounded-full",
            "backdrop-blur-xl bg-white/10 dark:bg-white/5",
            "border border-white/15 dark:border-white/10",
            "shadow-[0_8px_30px_rgba(0,0,0,0.18)]",
            "transition active:scale-[0.98]",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
            "overflow-hidden",
            // halo premium
            "after:absolute after:inset-[-16px] after:rounded-full after:opacity-0 after:blur-2xl",
            "after:bg-[radial-gradient(circle,rgba(255,255,255,0.35),transparent_60%)]",
            "group-hover:after:opacity-100",
            "group-hover:shadow-[0_14px_42px_rgba(0,0,0,0.22)]",
          ].join(" ")}
        >
          <span className="relative grid place-items-center">
            <AnimatePresence initial={false} mode="popLayout">
              {!open ? (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: -15, scale: 0.9 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 15, scale: 0.9 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -15, scale: 0.9 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 15, scale: 0.9 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                >
                  <X className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </span>
      </button>

      {/* Mobile menu panel */}
      <StaggeredMenu
        open={open}
        onClose={() => setOpen(false)}
        items={items}
        socials={socials}
      />
    </>
  );
}
