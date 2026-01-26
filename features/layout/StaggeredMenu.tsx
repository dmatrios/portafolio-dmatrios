"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Github, Linkedin, Mail } from "lucide-react";

export type MenuItem = { label: string; href: string };
export type SocialIconKey = "github" | "linkedin" | "mail";
export type SocialItem = { label: string; href: string; icon: SocialIconKey };

type Props = {
  open: boolean;
  onClose: () => void;
  items: MenuItem[];
  socials?: SocialItem[];
};

const iconMap: Record<SocialIconKey, React.ReactNode> = {
  github: <Github className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  mail: <Mail className="h-4 w-4" />,
};

export function StaggeredMenu({ open, onClose, items, socials = [] }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-0 z-[75] bg-black/55 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.aside
            key="panel"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={[
              "fixed left-0 right-0 top-0 z-[79]",
              "mx-4 mt-20 rounded-2xl overflow-hidden",
              "bg-white/10 dark:bg-white/5 backdrop-blur-xl",
              "border border-white/15 dark:border-white/10",
              "shadow-[0_18px_70px_rgba(0,0,0,0.32)]",
            ].join(" ")}
            role="dialog"
            aria-modal="true"
          >
            <div className="p-4">
              <motion.ul
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.06, delayChildren: 0.03 } },
                }}
                className="space-y-2"
              >
                {items.map((it) => (
                  <motion.li
                    key={it.href}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      show: { opacity: 1, y: 0 },
                    }}
                  >
                    <Link
                      href={it.href}
                      onClick={onClose}
                      className="flex items-center justify-between rounded-xl px-4 py-4 text-base text-white/90 bg-white/6 hover:bg-white/10 border border-white/10 transition"
                    >
                      <span>{it.label}</span>
                      <span className="text-white/55">↗</span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              {socials.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 flex-wrap">
                    {socials.map((s) => (
                      <a
                        key={s.href}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm bg-white/6 hover:bg-white/10 border border-white/10 text-white/85 hover:text-white transition"
                      >
                        {iconMap[s.icon]}
                        <span>{s.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
