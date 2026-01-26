"use client";

import { useMemo } from "react";
import { motion } from "motion/react";

import {
  SiNextdotjs,
  SiReact,
  SiAngular,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiSpringboot,
  SiNodedotjs,
  SiMysql,
  SiPostgresql,
  SiDocker,
  SiVercel,
  SiRailway,
  SiCloudflare,
  SiGit,
  SiGithub,
  SiPostman,
  SiSwagger,
  SiJsonwebtokens,
} from "@icons-pack/react-simple-icons";

import {
  Rocket,
  ShieldCheck,
  Users,
  Sparkles,
  MessageSquare,
  Briefcase,
} from "lucide-react";

type TechItem = {
  name: string;
  Icon: any;
  color: string;
};

type SoftTagKey = "delivery" | "quality" | "team" | "craft" | "comms" | "context";

type SoftItem = {
  titleEs: string;
  descEs: string;
  titleEn: string;
  descEn: string;
  tags: { Icon: any; key: SoftTagKey }[];
};

export function SkillsToolkit({ lang }: { lang: "es" | "en" }) {
  const isEs = lang === "es";

  const copy = useMemo(() => {
    if (isEs) {
      return {
        kicker: "TOOLKIT",
        title: "Tecnologías que domino y uso para crear soluciones.",
        subtitle:
          "De la arquitectura al deploy: soluciones estables, performance medible y decisiones con criterio.",
        softKicker: "HABILIDADES BLANDAS",
        softTitle: "Cómo trabajo.",
        softLine: "Habilidades que no se ven, pero que también me representan.",
        softSubtitle:
          "Más allá del código: criterio, comunicación y ejecución consistente.",
        tagLabel: {
          delivery: "Entrega",
          quality: "Calidad",
          team: "Equipo",
          craft: "Detalle",
          comms: "Comunicación",
          context: "Contexto",
        } as const,
      };
    }

    return {
      kicker: "TOOLKIT",
      title: "Technologies I master and use to build solutions.",
      subtitle:
        "From architecture to deploy: stable solutions, measurable performance, and judgment-led decisions.",
      softKicker: "SOFT SKILLS",
      softTitle: "How I work.",
      softLine: "Skills you don’t see, but that also define how I work.",
      softSubtitle:
        "Beyond code: judgment, communication, and consistent execution.",
      tagLabel: {
        delivery: "Delivery",
        quality: "Quality",
        team: "Team",
        craft: "Craft",
        comms: "Communication",
        context: "Context",
      } as const,
    };
  }, [isEs]);

  const tech: TechItem[] = useMemo(
    () => [
      { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "Angular", Icon: SiAngular, color: "#DD0031" },

      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
      { name: "HTML", Icon: SiHtml5, color: "#E34F26" },

      { name: "Spring Boot", Icon: SiSpringboot, color: "#6DB33F" },
      { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },

      { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },

      { name: "Docker", Icon: SiDocker, color: "#2496ED" },
      { name: "Vercel", Icon: SiVercel, color: "#FFFFFF" },
      { name: "Railway", Icon: SiRailway, color: "#8B5CF6" },
      { name: "Cloudflare", Icon: SiCloudflare, color: "#F38020" },

      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "GitHub", Icon: SiGithub, color: "#FFFFFF" },

      { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
      { name: "Swagger", Icon: SiSwagger, color: "#85EA2D" },
      { name: "JWT", Icon: SiJsonwebtokens, color: "#D63AFF" },
    ],
    []
  );

  const soft: SoftItem[] = useMemo(
    () => [
      {
        titleEs: "Proactividad con criterio",
        descEs:
          "Identifico fricción, propongo mejoras y ejecuto con responsabilidad. Foco en impacto real.",
        titleEn: "Proactive with judgment",
        descEn:
          "I identify friction, propose improvements, and execute responsibly. Focused on real impact.",
        tags: [
          { Icon: Rocket, key: "delivery" },
          { Icon: Sparkles, key: "craft" },
        ],
      },
      {
        titleEs: "Resolución de problemas",
        descEs:
          "Trabajo con hipótesis, valido rápido y priorizo decisiones que protegen el producto y la calidad.",
        titleEn: "Problem solving",
        descEn:
          "I work with hypotheses, validate quickly, and prioritize decisions that protect product and quality.",
        tags: [
          { Icon: ShieldCheck, key: "quality" },
          { Icon: Users, key: "team" },
        ],
      },
      {
        titleEs: "Ownership real",
        descEs:
          "Asumo el ciclo completo: implementación, deploy y seguimiento. Entrega estable y controlada.",
        titleEn: "True ownership",
        descEn:
          "I own the full cycle: implementation, deploy, and follow-up. Stable and controlled delivery.",
        tags: [
          { Icon: Rocket, key: "delivery" },
          { Icon: ShieldCheck, key: "quality" },
        ],
      },
      {
        titleEs: "Pensamiento crítico",
        descEs:
          "Cuestiono con respeto, reduzco complejidad y sostengo decisiones con argumentos claros.",
        titleEn: "Critical thinking",
        descEn:
          "I challenge respectfully, reduce complexity, and back decisions with clear reasoning.",
        tags: [
          { Icon: Users, key: "team" },
          { Icon: Sparkles, key: "craft" },
        ],
      },
      {
        titleEs: "Comunicación clara",
        descEs:
          "Contexto justo, decisiones explícitas y mensajes directos. Alineación sin ruido.",
        titleEn: "Clear communication",
        descEn:
          "Just enough context, explicit decisions, and direct messages. Alignment without noise.",
        tags: [
          { Icon: MessageSquare, key: "comms" },
          { Icon: Briefcase, key: "context" },
        ],
      },
      {
        titleEs: "Adaptabilidad con estándares",
        descEs:
          "Me adapto a equipos y procesos manteniendo consistencia, calidad y ritmo.",
        titleEn: "Adaptable with standards",
        descEn:
          "I adapt to teams and processes while keeping consistency, quality, and pace.",
        tags: [
          { Icon: Users, key: "team" },
          { Icon: ShieldCheck, key: "quality" },
        ],
      },
    ],
    []
  );

  const labelMap = copy.tagLabel;

  return (
    <section aria-label="Skills toolkit" className="relative">
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-8 lg:px-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="py-16"
        >
          <p className="text-[11px] tracking-[0.34em] uppercase text-[rgba(var(--muted-foreground),0.9)]">
            {copy.kicker}
          </p>

          <h3 className="mt-4 max-w-[30ch] text-[30px] md:text-[52px] font-[750] leading-[1.02] text-[rgb(var(--foreground))] [text-wrap:balance]">
            {copy.title}
          </h3>

          <p className="mt-5 max-w-[86ch] text-[14px] md:text-[15px] leading-relaxed text-[rgba(var(--muted-foreground),0.96)]">
            {copy.subtitle}
          </p>
        </motion.div>

        {/* Tech grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {tech.map(({ name, Icon, color }) => (
              <div
                key={name}
                className="group relative overflow-hidden rounded-2xl border border-[rgba(var(--border),0.78)] bg-[rgba(var(--background),0.08)] backdrop-blur-xl px-4 py-4 transition hover:-translate-y-0.5 hover:shadow-[0_28px_90px_rgba(0,0,0,0.16)]"
              >
                <div className="relative flex items-center gap-3">
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(var(--border),0.65)] bg-[rgba(var(--background),0.16)] backdrop-blur-xl">
                    <Icon title={name} color={color} className="h-6 w-6" />
                  </div>
                  <p className="text-[14px] md:text-[15px] font-[750] text-[rgba(var(--foreground),0.94)]">
                    {name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="my-16 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(var(--border),0.9),transparent)]" />

        {/* Soft skills */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pb-20 md:pb-24"
        >
          <p className="text-[11px] tracking-[0.34em] uppercase text-[rgba(var(--muted-foreground),0.9)]">
            {copy.softKicker}
          </p>

          <h4 className="mt-3 text-[24px] md:text-[36px] font-[750] leading-[1.05] text-[rgb(var(--foreground))]">
            {copy.softTitle}
          </h4>

          <p className="mt-3 text-[13px md:text-[14px]] text-[rgba(var(--muted-foreground),0.92)] max-w-[72ch]">
            {copy.softLine}
          </p>

          <p className="mt-2 text-[13px md:text-[14px]] text-[rgba(var(--muted-foreground),0.92)] max-w-[72ch]">
            {copy.softSubtitle}
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {soft.map((s) => {
              const title = isEs ? s.titleEs : s.titleEn;
              const desc = isEs ? s.descEs : s.descEn;

              return (
                <div key={title}>
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-[18px] md:text-[20px] font-[800] text-[rgb(var(--foreground))]">
                      {title}
                    </p>
                    <div className="flex items-center gap-2">
                      {s.tags.map(({ Icon, key }) => (
                        <span
                          key={key}
                          title={labelMap[key]}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(var(--border),0.75)] bg-[rgba(var(--background),0.06)] px-2.5 py-1 text-[11px] font-[700]"
                        >
                          <Icon className="h-3.5 w-3.5" />
                          <span className="hidden md:inline">
                            {labelMap[key]}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="mt-2 text-[14px] leading-relaxed text-[rgba(var(--muted-foreground),0.96)]">
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
