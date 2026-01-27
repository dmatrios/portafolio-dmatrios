"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

export function Footer({ lang }: { lang: "es" | "en" }) {
  const isEs = lang === "es";

  const copy = isEs
    ? {
        kicker: "CONTACTO",
        title: "¿Construimos algo juntos?",
        sub: "Si tienes una idea, una propuesta o un proyecto en marcha, escríbeme. Respondo rápido.",
        emailLabel: "Correo",
        phoneLabel: "WhatsApp",
        navLabel: "Navegación",
        socialLabel: "Social",
        infoLabel: "Info",
        ctaMail: "Escribirme",
        ctaWsp: "WhatsApp",
        bottom: "Diseñado y construido por Daniel Maturrano en agradecimiento a Dayanne Chirinos ♡ .",
        links: {
          about: "Sobre mí",
          projects: "Proyectos",
          skills: "Habilidades",
          contact: "Contacto",
        },
        info:
          "Monocromo, fluido y directo. Pensado para demostrar ejecución, criterio y detalle.",
        more: "Ver más sobre mí",
      }
    : {
        kicker: "CONTACT",
        title: "Want to build something together?",
        sub: "If you have an idea, a proposal, or a project in motion—send me a message. I reply fast.",
        emailLabel: "Email",
        phoneLabel: "WhatsApp",
        navLabel: "Navigation",
        socialLabel: "Social",
        infoLabel: "Info",
        ctaMail: "Email me",
        ctaWsp: "WhatsApp",
        bottom: "Designed and built by Daniel Maturrano in a grateful way to Dayanne Chirinos ♡.",
        links: {
          about: "About",
          projects: "Projects",
          skills: "Skills",
          contact: "Contact",
        },
        info:
          "Monochrome, fluid, and direct. Built to showcase execution, taste, and detail.",
        more: "More about me",
      };

  const EMAIL = "ddmatrios@gmail.com";

  // ✅ WhatsApp real
  const WHATSAPP_NUMBER_RAW = "979385477";
  const WHATSAPP_NUMBER_INTL = "51" + WHATSAPP_NUMBER_RAW;

  const WHATSAPP_TEXT = isEs
    ? "Hola Daniel, vi tu portafolio y quiero conversar."
    : "Hi Daniel, I saw your portfolio and I'd like to chat.";

  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(
    isEs ? "Contacto desde tu portafolio" : "Portfolio contact"
  )}`;

  const wspHref = `https://wa.me/${WHATSAPP_NUMBER_INTL}?text=${encodeURIComponent(
    WHATSAPP_TEXT
  )}`;

  // ✅ Pon tus links reales cuando los tengas
  const GITHUB = "https://github.com/dmatrios";
  const LINKEDIN = "https://www.linkedin.com/in/daniel-maturrano/";

  return (
    <footer aria-label="Footer" className="relative overflow-hidden">
      {/* Top divider */}
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-8 lg:px-14">
        <div className="h-px w-full bg-[linear-gradient(to_right,transparent,rgba(var(--border),0.85),transparent)]" />
      </div>

      {/* Subtle glows (no card) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-1/2 h-80 w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(var(--foreground),0.10),transparent_60%)] blur-3xl" />
        <div className="absolute -bottom-32 right-[-180px] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(var(--foreground),0.08),transparent_62%)] blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-5 py-14 md:px-8 md:py-16 lg:px-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left: Contact + CTAs */}
          <div className="lg:col-span-6">
            <p className="text-[11px] tracking-[0.34em] uppercase text-[rgba(var(--muted-foreground),0.88)]">
              {copy.kicker}
            </p>

            <h3 className="mt-5 text-[34px] leading-[1.05] font-[720] text-[rgb(var(--foreground))] [text-wrap:balance]
                           md:text-[46px] md:leading-[1.05] max-w-[22ch]">
              {copy.title}
            </h3>

            <p className="mt-4 text-[14px] leading-relaxed text-[rgba(var(--muted-foreground),0.94)] max-w-[70ch] md:text-[15px]">
              {copy.sub}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={mailHref}
                className="group inline-flex items-center justify-center gap-2 rounded-full border
                           border-[rgba(var(--border),0.78)]
                           bg-[rgba(var(--foreground),0.05)]
                           px-5 py-3 text-[14px] font-[600]
                           text-[rgb(var(--foreground))]
                           transition
                           hover:-translate-y-[1px]
                           hover:bg-[rgba(var(--foreground),0.09)]
                           hover:shadow-[0_14px_34px_rgba(0,0,0,0.28)]
                           active:translate-y-0"
              >
                <Mail className="h-4 w-4 opacity-80" />
                {copy.ctaMail}
              </a>

              <a
                href={wspHref}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full border
                           border-[rgba(var(--border),0.78)]
                           bg-[rgba(var(--foreground),0.05)]
                           px-5 py-3 text-[14px] font-[600]
                           text-[rgb(var(--foreground))]
                           transition
                           hover:-translate-y-[1px]
                           hover:bg-[rgba(var(--foreground),0.09)]
                           hover:shadow-[0_14px_34px_rgba(0,0,0,0.28)]
                           active:translate-y-0"
              >
                <Phone className="h-4 w-4 opacity-80" />
                {copy.ctaWsp}
              </a>
            </div>

            {/* Contact lines */}
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(var(--border),0.72)] bg-[rgba(var(--foreground),0.04)]">
                  <Mail className="h-4 w-4 opacity-80" />
                </span>
                <div className="min-w-0">
                  <div className="text-[11px] tracking-[0.26em] uppercase text-[rgba(var(--muted-foreground),0.75)]">
                    {copy.emailLabel}
                  </div>
                  <div className="truncate text-[14px] text-[rgba(var(--foreground),0.94)]">
                    {EMAIL}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(var(--border),0.72)] bg-[rgba(var(--foreground),0.04)]">
                  <Phone className="h-4 w-4 opacity-80" />
                </span>
                <div className="min-w-0">
                  <div className="text-[11px] tracking-[0.26em] uppercase text-[rgba(var(--muted-foreground),0.75)]">
                    {copy.phoneLabel}
                  </div>
                  <div className="truncate text-[14px] text-[rgba(var(--foreground),0.94)]">
                    +51 {WHATSAPP_NUMBER_RAW}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Columns */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
              <div>
                <div className="text-[11px] tracking-[0.30em] uppercase text-[rgba(var(--muted-foreground),0.78)]">
                  {copy.navLabel}
                </div>
                <ul className="mt-5 space-y-3 text-[14px]">
                  <li>
                    <a
                      className="text-[rgba(var(--foreground),0.90)] hover:text-[rgb(var(--foreground))] transition"
                      href="#about"
                    >
                      {copy.links.about}
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-[rgba(var(--foreground),0.90)] hover:text-[rgb(var(--foreground))] transition"
                      href="#projects"
                    >
                      {copy.links.projects}
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-[rgba(var(--foreground),0.90)] hover:text-[rgb(var(--foreground))] transition"
                      href="#skills"
                    >
                      {copy.links.skills}
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-[rgba(var(--foreground),0.90)] hover:text-[rgb(var(--foreground))] transition"
                      href="#contact"
                    >
                      {copy.links.contact}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <div className="text-[11px] tracking-[0.30em] uppercase text-[rgba(var(--muted-foreground),0.78)]">
                  {copy.socialLabel}
                </div>

                <div className="mt-5 flex flex-col gap-3">
                  <a
                    href={GITHUB}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[rgba(var(--border),0.78)]
                               bg-[rgba(var(--foreground),0.04)] px-4 py-2 text-[13px]
                               text-[rgba(var(--foreground),0.92)] transition
                               hover:-translate-y-[1px] hover:bg-[rgba(var(--foreground),0.08)]
                               hover:shadow-[0_12px_28px_rgba(0,0,0,0.24)]"
                  >
                    <Github className="h-4 w-4 opacity-80" />
                    GitHub
                  </a>

                  <a
                    href={LINKEDIN}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[rgba(var(--border),0.78)]
                               bg-[rgba(var(--foreground),0.04)] px-4 py-2 text-[13px]
                               text-[rgba(var(--foreground),0.92)] transition
                               hover:-translate-y-[1px] hover:bg-[rgba(var(--foreground),0.08)]
                               hover:shadow-[0_12px_28px_rgba(0,0,0,0.24)]"
                  >
                    <Linkedin className="h-4 w-4 opacity-80" />
                    LinkedIn
                  </a>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="text-[11px] tracking-[0.30em] uppercase text-[rgba(var(--muted-foreground),0.78)]">
                  {copy.infoLabel}
                </div>

                <p className="mt-5 text-[13px] leading-relaxed text-[rgba(var(--muted-foreground),0.92)] max-w-[34ch]">
                  {copy.info}
                </p>

                <div className="mt-5">
                  <Link
                    href={`/${lang}/about`}
                    className="inline-flex items-center gap-2 text-[13px]
                               text-[rgba(var(--foreground),0.92)]
                               hover:text-[rgb(var(--foreground))] transition"
                  >
                    {copy.more}
                    <span className="opacity-70">→</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-12 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(var(--border),0.9),transparent)]" />

            <div className="mt-6 flex flex-col gap-2 text-[12px] text-[rgba(var(--muted-foreground),0.78)] md:flex-row md:items-center md:justify-between">
              <span>{copy.bottom}</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
