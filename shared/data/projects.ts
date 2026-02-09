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
  live?: string; // demo en vivo
  repo?: {
    backend?: string;
    frontend?: string;
  };
  postman?: string; // colección / docs
};

export type ProjectMeta = {
  year?: string;
  duration?: { es: string; en: string }; // "3 semanas", "2 months", etc.
  role?: { es: string; en: string }; // "Full-stack", "Frontend", etc.
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

// =========================
// Data de los proyectos
// =========================
// Objetivo de copy:
// - Alinear CV ↔ portafolio: backend sólido (capas, DTOs, validación, JWT/roles, MySQL, Docker, deploy).
// - Evitar fricciones de stack (ej: tags que dicen React pero tech dice Vue).
// - Mantener tono profesional (enterprise/product), sin inflar ni mentir.
export const PROJECTS: Project[] = [
  {
    key: "groomer",
    slug: "groomerapp",
    title: "Groomer App",
    description: {
      es: "Sistema web full-stack para gestión operativa de una peluquería canina. Reemplaza Excel con un backend orientado a negocio y un frontend diseñado para uso diario por usuarios no técnicos. Demo desplegada.",
      en: "Full-stack web system for day-to-day operations of a dog grooming business. Replaces Excel with a business-oriented backend and a frontend designed for daily use by non-technical users. Deployed demo.",
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
    tags: ["Sistema real", "Full-Stack", "Backend Java", "Spring Boot"],
    accent: "cyan",
    featured: true,

    links: {
      // live: "https://groomer-front.vercel.app/",
      repo: {
        backend: "https://github.com/dmatrios/groomer-api",
        frontend: "https://github.com/dmatrios/groomer-front",
      },
      // postman: "https://documenter.getpostman.com/view/XXXX/groomer-api-v5"
    },

    meta: {
      year: "2026",
      duration: {
        es: "1 mes",
        en: "1 month",
      },
      role: {
        es: "Full-Stack (enfoque backend)",
        en: "Full-Stack (backend-focused)",
      },
      architecture: {
        es: "Backend Java 21 + Spring Boot con arquitectura Package by Feature y capas Controller/Service/Repository, DTOs, Bean Validation, manejo centralizado de errores, JWT con roles y auditoría. Frontend Next.js App Router con arquitectura por feature, HTTP client centralizado y guards por rol.",
        en: "Java 21 + Spring Boot backend using Package-by-Feature architecture and Controller/Service/Repository layers, DTOs, Bean Validation, centralized error handling, JWT with roles and auditing. Next.js App Router frontend with feature-based architecture, centralized HTTP client and role-based guards.",
      },
    },

    highlights: {
      es: [
        "Reemplazo de Excel por un sistema centralizado orientado a operación diaria.",
        "Gestión de clientes y mascotas (1 cliente → N mascotas) con historial completo.",
        "Agenda con detección de solapamientos y confirmación manual de conflictos.",
        "Registro de atenciones reales con múltiples servicios y control de pagos.",
        "Estados de pago: pendiente, parcial y pagado, con trazabilidad.",
        "Búsqueda global por cliente, mascota, teléfono, zona o código.",
        "Autenticación JWT con roles (ADMIN / USER) y auditoría de acciones.",
        "Deploy real: backend en Railway, frontend en Vercel (Docker).",
      ],
      en: [
        "Excel replacement with a centralized system for daily operations.",
        "Clients and pets management (1 client → N pets) with full history.",
        "Scheduling with overlap detection and manual conflict confirmation.",
        "Real visit records with multiple services and payment tracking.",
        "Payment states: pending, partial and paid, with traceability.",
        "Global search by client, pet, phone, zone or code.",
        "JWT authentication with roles (ADMIN / USER) and action auditing.",
        "Real deployment: backend on Railway, frontend on Vercel (Docker).",
      ],
    },
  },

  {
    key: "ahorrape",
    slug: "ahorrape",
    title: "AhorraPE",
    description: {
      es: "Proyecto full-stack de finanzas personales enfocado en lógica de negocio y persistencia de datos. Control de presupuestos y movimientos con enfoque backend-first.",
      en: "Full-stack personal finance project focused on business logic and data persistence. Budgets and transactions tracking with a backend-first approach.",
    },
    status: "local",
    tech: ["vue", "ts", "spring", "mysql", "github"],
    coverSrc: "/projects/AhorraPE/cover.jpg",
    galleryDir: "/projects/AhorraPE",
    // ✅ Alinear tags con tech real (si tech usa Vue, evita poner React aquí)
    tags: ["Spring Boot", "MySQL", "Vue"],
    accent: "violet",
    featured: true,

    links: {
      repo: {
        backend: "https://github.com/dmatrios/ahorrape-api",
        frontend: "https://github.com/dmatrios/ahorrape-front",
      },
    },

    meta: {
      year: "2026",
      duration: { es: "3–4 semanas (aprox.)", en: "3–4 weeks (approx.)" },
      role: { es: "Full-Stack (enfoque backend)", en: "Full-Stack (backend-first)" },
      architecture: {
        es: "API REST organizada por features, DTOs y validación, con persistencia relacional en MySQL. El frontend actúa como cliente de la API.",
        en: "Feature-based REST API with DTOs and validation, backed by relational MySQL persistence. Frontend acts as an API consumer.",
      },
    },

    highlights: {
      es: [
        "Modelo base para presupuestos, categorías y movimientos.",
        "Dashboard con resumen mensual e indicadores claros.",
        "Gestión de categorías y movimientos con filtros.",
        "Estructura pensada para escalar a multi-usuario / multi-cuenta.",
      ],
      en: [
        "Core model for budgets, categories and transactions.",
        "Dashboard with monthly summary and clear KPIs.",
        "Categories and transactions management with filters.",
        "Scalable foundation for multi-user / multi-account.",
      ],
    },

    demo: {
      youtubeId: "7U5n5Y2ydK8",
      label: { es: "Ver demo en video", en: "Watch demo video" },
    },
  },

  {
    key: "soelec",
    slug: "soelec",
    title: "SOELEC SAC",
    description: {
      es: "Landing premium para empresa de estructuras metálicas. Enfocada en conversión, optimizada para SEO y performance, con un diseño de alto impacto orientado a negocio.",
      en: "Premium landing for a metal structures company. Conversion-focused, SEO and performance optimized, with a business-oriented high-impact design.",
    },
    status: "deployed",
    tech: ["next", "ts", "vercel", "github"],
    coverSrc: "/projects/SOELEC/cover.jpg",
    galleryDir: "/projects/SOELEC",
    tags: ["Next.js", "Tailwind", "SEO", "Performance"],
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
      role: { es: "Frontend", en: "Frontend" },
      architecture: {
        es: "Next.js 14 con SSG/SSR, Tailwind CSS avanzado, animaciones, meta tags y sitemap para SEO.",
        en: "Next.js 14 with SSG/SSR, advanced Tailwind CSS, animations, meta tags and sitemap for SEO.",
      },
    },

    highlights: {
      es: [
        "Diseño premium con jerarquía visual y CTAs claros orientados a conversión.",
        "Optimización de Core Web Vitals: 90+ en Lighthouse.",
        "SEO on-page completo: meta tags, Open Graph y schema.org estructurado.",
        "Secciones listas para negocio: servicios, proyectos, prueba social y contacto.",
      ],
      en: [
        "Premium design with strong visual hierarchy and conversion-focused CTAs.",
        "Core Web Vitals optimization: 90+ Lighthouse score.",
        "Complete on-page SEO: meta tags, Open Graph and structured schema.org.",
        "Business-ready sections: services, projects, social proof and contact.",
      ],
    },
  },

  {
    key: "notes",
    slug: "notes",
    title: "Notes API",
    description: {
      es: "API REST backend con autenticación JWT, persistencia en MySQL y contenerización con Docker. Desplegada en Railway para demo técnica.",
      en: "Backend REST API with JWT authentication, MySQL persistence and Docker containerization. Deployed on Railway for technical demo.",
    },
    status: "deployed",
    tech: ["spring", "mysql", "jwt", "docker", "railway", "github"],
    coverSrc: "/projects/Notes/cover.jpg",
    galleryDir: "/projects/Notes",
    tags: ["Backend", "Spring Boot", "JWT", "Railway"],
    accent: "violet",
    featured: false,

    links: {
      // live: "https://TU-URL-DE-RAILWAY",
      repo: {
        backend: "https://github.com/dmatrios/notes-api",
      },
    },

    meta: {
      year: "2026",
      // ✅ Evitar "práctica" (suena a tutorial). Mantén honestidad sin restar peso.
      duration: { es: "1 semana", en: "1 week" },
      role: { es: "Backend", en: "Backend" },
      architecture: {
        es: "API REST con arquitectura por capas, DTOs, validación y JWT. Persistencia relacional en MySQL, contenerizada con Docker y desplegada en Railway.",
        en: "Layered REST API with DTOs, validation and JWT. Relational MySQL persistence, Dockerized and deployed on Railway.",
      },
    },

    highlights: {
      es: [
        "Login + JWT con endpoints protegidos.",
        "MySQL + persistencia y estructura escalable.",
        "Deploy en Railway para validación técnica rápida.",
      ],
      en: [
        "Login + JWT with protected endpoints.",
        "MySQL persistence with a scalable structure.",
        "Railway deployment for quick technical validation.",
      ],
    },
  },

  {
    key: "bufys",
    slug: "bufys",
    title: "Bufys Grooming Landing",
    description: {
      es: "Landing orientada a conversión para servicios de grooming (baño, corte y paquetes). UI clara, CTAs visibles y enfoque mobile-first.",
      en: "Conversion-focused landing for grooming services (bath, haircut and packages). Clear UI, visible CTAs and mobile-first approach.",
    },
    status: "deployed",
    tech: ["next", "ts", "vercel", "github"],
    coverSrc: "/projects/Bufys/cover.jpg",
    galleryDir: "/projects/Bufys",
    tags: ["Landing", "Conversión", "UI/UX"],
    accent: "cyan",
    featured: false,

    links: {
      live: "https://tiny-pony-9c83e9.netlify.app/",
      repo: {
        frontend: "https://github.com/dmatrios/bufys-landing",
      },
    },

    meta: {
      year: "2025",
      duration: { es: "1–2 semanas", en: "1–2 weeks" },
      role: { es: "Frontend", en: "Frontend" },
      architecture: {
        es: "Landing por secciones (servicios, paquetes, testimonios y CTA) con micro-interacciones y foco en performance.",
        en: "Section-based landing (services, packages, testimonials and CTA) with micro-interactions and performance focus.",
      },
    },

    highlights: {
      es: [
        "Secciones pensadas para conversión (CTA claro y repetido).",
        "Tarjetas de servicios con jerarquía visual y diseño premium.",
        "Optimizada para mobile con navegación fluida.",
      ],
      en: [
        "Conversion-first sections (clear repeated CTAs).",
        "Service cards with strong visual hierarchy and premium design.",
        "Mobile-optimized with smooth navigation.",
      ],
    },
  },

  {
    key: "github-issues-triage",
    slug: "github-issues-triage",
    title: "GitHub Issues Triage Dashboard",
    description: {
      es: "Mini backoffice en Angular para revisar y triagear issues de repos públicos. UI tipo producto con estado en URL, paginación real y detalle con comentarios.",
      en: "Angular mini backoffice to review and triage issues from public repos. Product-style UI with URL state, real pagination, and issue detail with comments.",
    },
    status: "deployed",
    tech: ["angular", "ts", "github", "vercel"],
    coverSrc: "/projects/GitHubIssuesTriage/cover.jpg",
    galleryDir: "/projects/GitHubIssuesTriage",
    tags: ["Angular 20", "Tailwind v4", "RxJS", "GitHub API"],
    accent: "amber",
    featured: true,

    links: {
      live: "https://github-issues-triage-dashboard.vercel.app/repo",
      repo: {
        frontend: "https://github.com/dmatrios/github-issues-triage-dashboard",
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
        "Arquitectura por features: repo / issues / shared (mantenible y escalable).",
        "Estado en URL (query params): links compartibles, refresh sin perder filtros y back sin resets.",
        "Paginación real con GitHub REST API y estados UI completos (loading/error/empty).",
        "Issue detail con comentarios + navegación cuidada (contexto preservado).",
        "UI tipo producto con micro-interacciones (sin botones negros).",
        "Soporte de token solo local: en producción se usa API pública con rate limits documentados.",
      ],
      en: [
        "Feature-based architecture: repo / issues / shared (maintainable and scalable).",
        "URL state (query params): shareable links, refresh-safe, and back navigation without resets.",
        "Real pagination via GitHub REST API with full UI states (loading/error/empty).",
        "Issue detail with comments + polished navigation (context preserved).",
        "Product-style UI with micro-interactions (no black buttons).",
        "Local-only token support: production uses public API with documented rate limits.",
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
