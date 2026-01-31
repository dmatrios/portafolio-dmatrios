export type Lang = "es" | "en";

export type ProjectStatus = "deployed" | "paused" | "local";

export type TechKey =
  | "next"
  | "react"
  | "vue"
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
  | "portfolio"
  | "github-issues-triage";



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
      es: "Sistema web interno para peluquería canina. Reemplaza Excel con gestión de clientes, mascotas, agenda, atenciones reales, pagos y reportes. Diseñado para uso diario por usuarios no técnicos. Demo desplegada.",
      en: "Internal web system for a dog grooming business. Replaces Excel with clients, pets, scheduling, real visits, payments and reports. Designed for daily use by non-technical users. Deployed demo.",
    },
    status: "deployed",
    tech: [
      "next",
      "ts",
      "spring",
      "mysql",
      "docker",
      "jwt",
      "vercel",
      "railway",
      "github",
    ],
    coverSrc: "/projects/GroomerApp/cover.jpg",
    galleryDir: "/projects/GroomerApp",
    tags: ["Sistema real", "Full-Stack", "Spring Boot", "Next.js"],
    accent: "cyan",
    featured: true,

    links: {
      live: "https://groomer-front.vercel.app/",
      repo: {
        backend: "https://github.com/dmatrios/groomer-api",
        frontend: "https://github.com/dmatrios/groomer-front",
      },
      // postman: "https://documenter.getpostman.com/view/XXXX/groomer-api-v5"
    },

    meta: {
      year: "2026",
      duration: {
        es: "1 mes (MVP completo)",
        en: "1 month (complete MVP)",
      },
      role: {
        es: "Full-Stack",
        en: "Full-Stack",
      },
      architecture: {
        es: "Backend Java 21 + Spring Boot con arquitectura Package by Feature, DTOs, validación, JWT, roles y auditoría. Frontend Next.js App Router con arquitectura por feature, HTTP client centralizado y guards por rol.",
        en: "Java 21 + Spring Boot backend using Package-by-Feature architecture, DTOs, validation, JWT, roles and auditing. Next.js App Router frontend with feature-based architecture, centralized HTTP client and role-based guards.",
      },
    },

    highlights: {
      es: [
        "Reemplazo total de Excel por un sistema web centralizado.",
        "Gestión completa de clientes y mascotas (1 cliente → N mascotas).",
        "Agenda con detección de cruces de horario y confirmación manual.",
        "Registro de atenciones reales con múltiples servicios y pagos.",
        "Historial completo por mascota con filtros y agrupación por día.",
        "Control de pagos: pendiente, parcial y pagado.",
        "Búsqueda global por cliente, mascota, teléfono, zona o código.",
        "Autenticación JWT con roles (ADMIN / USER) y auditoría de acciones.",
        "Deploy real: backend en Railway, frontend en Vercel.",
      ],
      en: [
        "Full replacement of Excel with a centralized web system.",
        "Complete clients and pets management (1 client → N pets).",
        "Scheduling with overlap detection and manual confirmation.",
        "Real visit records with multiple services and payments.",
        "Full pet history with filters and day grouping.",
        "Payment control: pending, partial and paid.",
        "Global search by client, pet, phone, zone or code.",
        "JWT authentication with roles (ADMIN / USER) and action auditing.",
        "Real deployment: backend on Railway, frontend on Vercel.",
      ],
    },


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
    tech: ["vue", "ts", "spring", "mysql", "github"],
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
      year: "2025",
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
  {
    key: "github-issues-triage",
    slug: "github-issues-triage",
    title: "GitHub Issues Triage Dashboard",
    description: {
      es: "Mini backoffice para revisar y triagear issues de repos públicos. UI tipo producto con estado en URL, paginación real y detalle con comentarios.",
      en: "Mini backoffice to review and triage issues from public repos. Product-style UI with URL state, real pagination, and issue detail with comments.",
    },
    status: "deployed",
    tech: ["angular", "ts", "github", "vercel"], // si tu tech keys tienen "tailwind" o "gsap", los agregamos
    coverSrc: "/projects/GitHubIssuesTriage/cover.jpg",
    galleryDir: "/projects/GitHubIssuesTriage",
    tags: ["Angular 20", "Tailwind v4", "RxJS", "GitHub API"],
    accent: "amber",
    featured: true,

    links: {
      live: "https://github-issues-triage-dashboard.vercel.app/repo", // <-- pega tu deploy
      repo: {
        frontend: "https://github.com/dmatrios/github-issues-triage-dashboard", // <-- ajusta si tu repo se llama distinto
      },
    },

    meta: {
      year: "2026",
      duration: { es: "2–4 días (MVP)", en: "2–4 days (MVP)" },
      role: { es: "Frontend", en: "Frontend" },
      architecture: {
        es: "Angular 20 con arquitectura por features (repo/issues/shared). Estado persistido en query params, ViewState (loading/error/empty/ready) y consumo tipado de GitHub REST API.",
        en: "Angular 20 with feature-based architecture (repo/issues/shared). URL state via query params, ViewState (loading/error/empty/ready), and strongly typed GitHub REST API consumption.",
      },
    },

    highlights: {
      es: [
        "Arquitectura por features: repo / issues / shared (más mantenible y escalable).",
        "Estado en URL (query params): compartir links, refresh sin perder filtros y back sin resets.",
        "Paginación real con GitHub REST API y estados UI completos (loading/error/empty).",
        "Issue detail con comentarios + navegación cuidada (contexto preservado).",
        "UI premium tipo iOS glass (micro-interacciones suaves, botones no negros).",
        "Soporte de token solo local (seguridad): en producción se usa API pública con rate limits documentados.",
      ],
      en: [
        "Feature-based architecture: repo / issues / shared (maintainable and scalable).",
        "URL state (query params): shareable links, refresh-safe, and back navigation without resets.",
        "Real pagination via GitHub REST API with full UI states (loading/error/empty).",
        "Issue detail with comments + polished navigation (context preserved).",
        "Premium iOS-glass UI (smooth micro-interactions, no black buttons).",
        "Local-only token support (security): production uses public API with documented rate limits.",
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
