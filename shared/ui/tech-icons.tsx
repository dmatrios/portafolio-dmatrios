import {
  SiNextdotjs,
  SiReact,
  SiVuedotjs,
  SiAngular,
  SiTypescript,
  SiSpringboot,
  SiMysql,
  SiDocker,
  SiRailway,
  SiVercel,
  SiJsonwebtokens,
  SiGithub,
} from "@icons-pack/react-simple-icons";

import type { TechKey } from "@/shared/data/projects";

export const TECH_ICON: Record<TechKey, { Icon: any; name: string }> = {
  next: { Icon: SiNextdotjs, name: "Next.js" },
  react: { Icon: SiReact, name: "React" },
  vue: { Icon: SiVuedotjs, name: "Vue 3" }, // ✅ agregado
  angular: { Icon: SiAngular, name: "Angular" },
  ts: { Icon: SiTypescript, name: "TypeScript" },
  spring: { Icon: SiSpringboot, name: "Spring Boot" },
  mysql: { Icon: SiMysql, name: "MySQL" },
  docker: { Icon: SiDocker, name: "Docker" },
  railway: { Icon: SiRailway, name: "Railway" },
  vercel: { Icon: SiVercel, name: "Vercel" },
  jwt: { Icon: SiJsonwebtokens, name: "JWT" },
  github: { Icon: SiGithub, name: "GitHub" },
};
