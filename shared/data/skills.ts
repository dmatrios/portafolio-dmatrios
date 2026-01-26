// shared/data/skills.ts
import type { ComponentType } from "react";
import type { SVGProps } from "react";

import {
  SiNextdotjs,
  SiReact,
  SiAngular,
  SiVuedotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss, // ✅ era SiCss3
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

type SimpleIcon = ComponentType<SVGProps<SVGSVGElement> & { title?: string }>;

export type TechLogo = {
  Icon: SimpleIcon;
  name: string;
  featured?: boolean;
};

export const TECH_LOGOS: TechLogo[] = [
  { Icon: SiNextdotjs, name: "Next.js", featured: true },
  { Icon: SiReact, name: "React", featured: true },
  { Icon: SiAngular, name: "Angular", featured: true },
  { Icon: SiVuedotjs, name: "Vue", featured: true },

  { Icon: SiTypescript, name: "TypeScript", featured: true },
  { Icon: SiJavascript, name: "JavaScript", featured: true },

  { Icon: SiTailwindcss, name: "Tailwind", featured: true },
  { Icon: SiHtml5, name: "HTML" },
  { Icon: SiCss, name: "CSS" },

  { Icon: SiSpringboot, name: "Spring Boot", featured: true },
  { Icon: SiNodedotjs, name: "Node.js", featured: true },

  { Icon: SiMysql, name: "MySQL", featured: true },
  { Icon: SiPostgresql, name: "PostgreSQL" },

  { Icon: SiDocker, name: "Docker", featured: true },

  { Icon: SiVercel, name: "Vercel" },
  { Icon: SiRailway, name: "Railway" },
  { Icon: SiCloudflare, name: "Cloudflare" },


  { Icon: SiGit, name: "Git", featured: true },
  { Icon: SiGithub, name: "GitHub", featured: true },

  { Icon: SiPostman, name: "Postman" },
  { Icon: SiSwagger, name: "Swagger" },
  { Icon: SiJsonwebtokens, name: "JWT" },
] as const;

export const SOFT_PILLARS = [
  {
    titleEs: "Claridad",
    titleEn: "Clarity",
    descEs: "Arquitectura simple, decisiones explícitas, código legible.",
    descEn: "Simple architecture, explicit decisions, readable code.",
    featured: true,
  },
  {
    titleEs: "Performance",
    titleEn: "Performance",
    descEs: "Cargas rápidas, transiciones suaves, cero fricción.",
    descEn: "Fast loads, smooth transitions, zero friction.",
    featured: true,
  },
  {
    titleEs: "Criterio",
    titleEn: "Taste",
    descEs: "Menos ruido, más intención. UI premium sin saturar.",
    descEn: "Less noise, more intent. Premium UI without overload.",
    featured: true,
  },
  {
    titleEs: "Ownership",
    titleEn: "Ownership",
    descEs: "De la idea al deploy. Debug, trade-offs y entrega real.",
    descEn: "From idea to deploy. Debug, trade-offs, real shipping.",
    featured: true,
  },
  {
    titleEs: "Comunicación",
    titleEn: "Communication",
    descEs: "Prioridades claras, feedback accionable, ritmo constante.",
    descEn: "Clear priorities, actionable feedback, steady pace.",
  },
  {
    titleEs: "Detalle",
    titleEn: "Detail",
    descEs: "Pulido visual, micro-interacciones y consistencia.",
    descEn: "Visual polish, micro-interactions, consistency.",
  },
] as const;
