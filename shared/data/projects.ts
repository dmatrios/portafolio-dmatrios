export type Lang = "es" | "en";

export type ProjectStatus = "deployed" | "paused" | "local";

export type TechKey =
  | "next"
  | "react"
  | "angular"
  | "ts"
  | "spring"
  | "mysql"
  | "docker"
  | "railway"
  | "vercel"
  | "jwt"
  | "github";

export type ProjectSlug =
  | "groomerapp"
  | "ahorrape"
  | "soelec"
  | "notes"
  | "bufys"
  | "petshop"
  | "portfolio";



export type ProjectLinks = {
  live?: string;    // demo en vivo
  repo?: {
    backend?: string;
    frontend?: string;
  };
  postman?: string; // colección / docs
};



export type ProjectMeta = {
  year?: string;
  duration?: { es: string; en: string }; // "3 semanas", "2 months", etc.
  role?: { es: string; en: string };     // "Full-stack", "Frontend", etc.
  architecture?: { es: string; en: string };
};



export type Project = {
  key: string;
  slug: ProjectSlug;

  title: string;
  description: { es: string; en: string };
  status: ProjectStatus;
  tech: TechKey[];

  coverSrc?: string;
  galleryDir?: string;

  tags?: string[];
  accent?: "violet" | "cyan" | "amber";
  featured?: boolean;

  // ✅ nuevos
  links?: ProjectLinks;
  meta?: ProjectMeta;

  highlights?: { es: string[]; en: string[] }; // bullets (features / outcomes)
  demo?: {
    youtubeId?: string; // ejemplo: "7U5n5Y2ydK8"
    label?: { es: string; en: string };
  };
};

//Data de los proyectos
export const PROJECTS: Project[] = [
  {
    key: "groomer",
    slug: "groomerapp",
    title: "Groomer App",
    description: {
      es: "Gestión de citas, clientes y mascotas con flujo de atención. Demo desplegada.",
      en: "Appointments, clients and pets management with service workflow. Deployed demo.",
    },
    status: "deployed",
    tech: ["next", "ts", "spring", "mysql", "docker", "vercel", "railway"],
    coverSrc: "/projects/GroomerApp/cover.jpg",
    galleryDir: "/projects/GroomerApp",
    tags: ["Next.js", "Spring Boot", "Deploy"],
    accent: "cyan",
    featured: true,
  },
  {
    key: "ahorrape",
    slug: "ahorrape",
    title: "AhorraPE",
    description: {
      es: "Finanzas personales: presupuestos, gastos y control. Enfocado en backend sólido.",
      en: "Personal finance: budgets, expenses and control. Strong backend-first approach.",
    },
    status: "local",
    tech: ["react", "ts", "spring", "mysql", "github"],
    coverSrc: "/projects/AhorraPE/cover.jpg",
    galleryDir: "/projects/AhorraPE",
    tags: ["Spring Boot", "MySQL", "React"],
    accent: "violet",
    featured: true,

    links: {
      repo: {
        backend: "https://github.com/dmatrios/ahorrape-api",
        frontend: "https://github.com/dmatrios/ahorrape-front"
      },
    },
    meta: {
      year: "2026",
      duration: { es: "3–4 semanas (aprox.)", en: "3–4 weeks (approx.)" },
      role: { es: "Full-Stack (enfoque backend)", en: "Full-Stack (backend-first)" },
      architecture: {
        es: "API REST por features + DTOs + validación + JWT (cuando aplique).",
        en: "Feature-based REST API + DTOs + validation + JWT (when applicable).",
      },
    },
    highlights: {
      es: [
        "Dashboard con resumen mensual e indicadores claros.",
        "Gestión de categorías y movimientos con filtros.",
        "Estructura pensada para escalar a multi-usuario / multi-cuenta.",
      ],
      en: [
        "Dashboard with monthly summary and clear KPIs.",
        "Categories and transactions with filters.",
        "Scalable structure for multi-user / multi-account.",
      ],
    },
    demo: {
      youtubeId: "7U5n5Y2ydK8",
      label: { es: "Ver demo en video", en: "Watch demo video" },
    },
  }, {
    key: "soelec",
    slug: "soelec",
    title: "SOELEC SAC",
    description: {
      es: "Plataforma web premium para líder en estructuras metálicas. Diseño de alto impacto, optimizado para SEO y performance.",
      en: "Premium web platform for metal structures leader. High-impact design, optimized for SEO and performance.",
    },
    status: "deployed",
    tech: ["next", "ts", "vercel", "github"],
    coverSrc: "/projects/SOELEC/cover.jpg",
    galleryDir: "/projects/SOELEC",
    tags: ["Next.js", "Tailwind", "UI Motion", "SEO"],
    accent: "amber",
    featured: true,

    links: {
      live: "https://soelecsac.vercel.app/",
      repo: {
        frontend: "https://github.com/dmatrios/soelec-landing",
      },
    },

    meta: {
      year: "2026",
      duration: { es: "3 semanas", en: "3 weeks" },
      role: { es: "Frontend / Full-Stack", en: "Frontend / Full-Stack" },
      architecture: {
        es: "Next.js 14 con SSG/SSR, Tailwind CSS avanzado, animaciones GSAP, meta tags dinámicos y sitemap.",
        en: "Next.js 14 with SSG/SSR, advanced Tailwind CSS, GSAP animations, dynamic meta tags and sitemap.",
      },
    },

    highlights: {
      es: [
        "Diseño premium con paleta de colores corporativos y tipografía profesional.",
        "Secciones de portfolio: proyectos destacados, capacidades técnicas y testimonios.",
        "Optimización Core Web Vitals: score 90+ en Lighthouse.",
        "SEO on-page completo: meta tags, Open Graph, schema.org estructurado.",
      ],
      en: [
        "Premium design with corporate color palette and professional typography.",
        "Portfolio sections: featured projects, technical capabilities and testimonials.",
        "Core Web Vitals optimization: 90+ Lighthouse score.",
        "Complete on-page SEO: meta tags, Open Graph, structured schema.org.",
      ],
    },
  },
  {
    key: "notes",
    slug: "notes",
    title: "Notes API",
    description: {
      es: "API REST con autenticación JWT. Deploy en Railway. Incluye Docker + MySQL.",
      en: "REST API with JWT authentication. Deployed on Railway. Includes Docker + MySQL.",
    },
    status: "deployed",
    tech: ["spring", "mysql", "jwt", "docker", "railway", "github"],
    coverSrc: "/projects/Notes/cover.jpg",
    galleryDir: "/projects/Notes",
    tags: ["Spring Boot", "JWT", "Docker", "Railway"],
    accent: "violet",
    featured: false,

    links: {
      //live: "https://TU-URL-DE-RAILWAY", // si tienes URL pública del API/docs
      repo: {
        backend: "https://github.com/dmatrios/notes-api",
      },
    },

    meta: {
      year: "2026",
      duration: { es: "1 semana (práctica)", en: "1 week (practice)" },
      role: { es: "Backend", en: "Backend" },
      architecture: {
        es: "API REST con capas + DTOs + validación + JWT. Contenerización con Docker y base MySQL.",
        en: "Layered REST API + DTOs + validation + JWT. Dockerized with MySQL.",
      },
    },

    highlights: {
      es: [
        "Login + JWT con endpoints protegidos.",
        "MySQL + persistencia y estructura escalable.",
        "Deploy en Railway para demo técnica.",
      ],
      en: [
        "Login + JWT with protected endpoints.",
        "MySQL persistence and scalable structure.",
        "Railway deployment for technical demo.",
      ],
    },
  },
  {
    key: "bufys",
    slug: "bufys",
    title: "Bufys Grooming Landing",
    description: {
      es: "Landing de servicios para grooming: baño, corte y paquetes. Enfocada en conversión.",
      en: "Service landing for grooming: bath, haircut and packages. Conversion-focused.",
    },
    status: "deployed", // si está live
    tech: ["next", "ts", "vercel", "github"], // ajusta si fue otro stack
    coverSrc: "/projects/Bufys/cover.jpg",
    galleryDir: "/projects/Bufys",
    tags: ["Landing", "Conversion", "UI"],
    accent: "cyan",
    featured: false,

    links: {
      live: "https://tiny-pony-9c83e9.netlify.app/", // si está en Netlify/Vercel
      repo: {
        frontend: "https://github.com/dmatrios/bufys-landing",
      },
    },

    meta: {
      year: "2026",
      duration: { es: "1–2 semanas", en: "1–2 weeks" },
      role: { es: "Frontend", en: "Frontend" },
      architecture: {
        es: "Landing por secciones: hero, servicios, paquetes, testimonios y CTA. Micro-interacciones y performance.",
        en: "Section-based landing: hero, services, packages, testimonials and CTA. Micro-interactions and performance.",
      },
    },

    highlights: {
      es: [
        "Secciones pensadas para conversión (CTA repetido y claro).",
        "Tarjetas de servicios con jerarquía visual y diseño premium.",
        "Optimizada para mobile con scroll fluido.",
      ],
      en: [
        "Conversion-first sections (clear repeated CTAs).",
        "Service cards with strong visual hierarchy and premium design.",
        "Mobile-optimized with smooth scrolling.",
      ],
    },
  },
];

/**
 * Mantiene tu export legacy (por si ya lo usas en Home).
 * Lo generamos desde PROJECTS para que no dupliques.
 */
export type ProjectPreview = {
  key: string;
  slug: ProjectSlug;
  title: string;
  description: string;
  status: ProjectStatus;
  tech: TechKey[];
  coverSrc?: string;
  tags?: string[];
};

export const CORE_PREVIEW: ProjectPreview[] = PROJECTS.filter((p) =>
  ["groomer", "ahorrape", "notes"].includes(p.key)
).map((p) => ({
  key: p.key,
  slug: p.slug,
  title: p.title,
  description: p.description.es,
  status: p.status,
  tech: p.tech,
  coverSrc: p.coverSrc,
  tags: p.tags,
}));

/**
 * Para CardSwap (portadas grandes) en /projects: solo featured + con cover.
 */
export const PROJECT_FEATURED_SWAP = PROJECTS.filter(
  (p) => p.featured && p.coverSrc
);
