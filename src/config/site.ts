import type { 
  SocialLink, 
  Stat, 
  Testimonial, 
  Project, 
  Skill, 
  TerminalLine, 
  CodeLine,
  Experience,
  OpenSourcePackage
} from "@/types";

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                           SITE CONFIGURATION                                  ║
// ║  All content organized in the order it appears on the website                ║
// ║  Updated as per Vikas Kumar Full Stack Resume & DevCodeHub99 Profile         ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

// ============================================
// 1. SITE METADATA & BASIC INFO
// ============================================
export const siteConfig = {
  // Personal Info
  name: "Vikas Kumar",
  title: "Full Stack Developer",
  email: "dev.codehub99@gmail.com",
  location: "New Delhi, India",

  // URLs
  url: "https://devcodehub99.tech",
  resumeUrl: "/resume.pdf",
  resumeDownloadName: "Vikas_Kumar_full_stack_resume.pdf",
  ogImage: "/og-image.webp",
  scheduleCallUrl: "", // Optional: Set Cal.com or Calendly link (e.g. "https://cal.com/devcodehub99")

  // Integrations
  formspreeUrl: "https://formspree.io/f/xreeeyvl",
  devToUsername: "devcodehub99",

  // SEO
  description: "Full Stack Developer building and deploying business applications, web platforms, and reusable software packages with React.js, Next.js, TypeScript, Node.js, and MongoDB.",
  keywords: [
    "Vikas Kumar",
    "DevCodeHub99",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Frontend Developer",
    "Backend Developer",
    "Software Engineer New Delhi"
  ],
} as const;

// ============================================
// 2. NAVIGATION (Top of Page)
// ============================================
export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
] as const;

// ============================================
// 3. HERO SECTION (First Section)
// ============================================
export const heroContent = {
  // Main Content
  badge: "Available for Full-time Roles & Projects",
  headline: "Building digital",
  headlineHighlight: "experiences",
  headlineSuffix: "that matter.",
  subheadline: "Full Stack Developer specializing in React.js, Next.js, TypeScript, Node.js, and MongoDB. Hands-on experience building production web platforms, secure REST APIs, and high-impact open-source packages.",

  // Code Block Content
  codeLines: [
    { text: "const engineer = {", color: "text-primary" },
    { text: '  name: "Vikas Kumar",', color: "text-accent" },
    { text: '  role: "Full Stack Developer",', color: "text-foreground" },
    { text: '  stack: ["React.js", "Next.js", "TypeScript", "Node.js", "MongoDB"],', color: "text-secondary" },
    { text: '  openSource: ["@custom-auth/core", "@event-overlay/core"],', color: "text-muted-foreground" },
    { text: '  deliverables: "Secure, reliable production systems",', color: "text-foreground" },
    { text: '  location: "New Delhi, India",', color: "text-muted-foreground" },
    { text: "  openToWork: true", color: "text-accent" },
    { text: "};", color: "text-primary" },
  ] as CodeLine[],

  // Terminal Sequence
  terminalSequence: [
    { type: "command" as const, text: "git checkout -b feature/production-release" },
    { type: "output" as const, text: "Switched to branch 'feature/production-release'", delay: 600 },
    { type: "command" as const, text: "npm test && npm run build" },
    { type: "loading" as const, text: "running type-check & test suite", delay: 1200 },
    { type: "success" as const, text: "✓ All tests passed (0 vulnerabilities)" },
  ] as TerminalLine[],

  // Code Block Header
  codeBlockHeader: {
    title: "~/vikas/workspace",
    colors: {
      red: "#ff5f57",
      yellow: "#ffbd2e",
      green: "#28ca41",
    },
  },
} as const;

// ============================================
// 4. ABOUT SECTION (Second Section)
// ============================================
export const aboutContent = {
  title: "Designer by eye, Developer by code.",
  subtitle: "About Me",
  paragraphs: [
    "I am a Full Stack Developer based in New Delhi, India, passionate about building reliable web platforms, business applications, and modular developer tooling. I focus on clean architecture, secure authentication, and practical solutions that deliver real-world business value.",

    "My core stack revolves around React.js, Next.js, TypeScript, Node.js, Express, and MongoDB. I handle development end-to-end: architecting data models and aggregation pipelines, designing secure REST APIs with JWT and HTTP-only cookies, and creating responsive, accessible user interfaces with Tailwind CSS.",

    "Beyond commercial projects, I actively contribute to the open-source ecosystem. I authored and published @custom-auth and @event-overlay on npm (accumulating over 3.8K+ downloads) and write technical walkthroughs and developer cheat sheets on DEV Community (dev.to/devcodehub99)."
  ],
} as const;

// Stats (Part of About Section)
export const stats: Stat[] = [
  { value: "2+", label: "Years Experience", colorClass: "text-primary" },
  { value: "15+", label: "Projects Shipped", colorClass: "text-secondary" },
  { value: "3.8K+", label: "NPM Downloads", colorClass: "text-foreground" },
  { value: "30+", label: "APIs & Services", colorClass: "text-primary/80" }
];

// ============================================
// 5. PROFESSIONAL EXPERIENCE SECTION
// ============================================
export const experiences: Experience[] = [
  {
    id: 1,
    role: "Full Stack Engineer",
    company: "Zyklabs",
    companyUrl: "https://zyklabs.in/",
    location: "Remote",
    period: "Jan 2026 – Present",
    current: true,
    description: [
      "Build and deploy business applications, delivering frontend interfaces, backend integrations, data models, and production releases.",
      "Develop reusable modules, REST APIs, authentication workflows, database integrations, and third-party services; manage Git workflows, debugging, and feature delivery.",
      "Architected and deployed GST-compliant billing and invoice management platform (SNDT InvoiceDesk) on production infrastructure with user-level data isolation."
    ],
    skills: ["Next.js", "React.js", "TypeScript", "Node.js", "MongoDB", "Zustand", "REST APIs", "Tailwind CSS"],
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "AdmitWise Consultancy",
    location: "New Delhi, India",
    period: "May 2025 – Dec 2025",
    current: false,
    description: [
      "Developed responsive interfaces and reusable components, integrating forms with backend APIs and implementing validation, asynchronous requests, and error handling.",
      "Streamlined client workflows and eliminated form validation drop-offs by introducing schema-driven inputs and accessible interactive feedback."
    ],
    skills: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "HTML5", "CSS3", "REST APIs", "Zod"],
  },
  {
    id: 3,
    role: "Desktop Support Engineer",
    company: "Nityo Infotech",
    location: "Delhi NCR, India",
    period: "Apr 2024 – Oct 2024",
    current: false,
    description: [
      "Resolved hardware, software, network, and operating system issues in an enterprise IT support environment.",
      "Maintained system uptime, assisted enterprise employees with critical diagnostics, and configured workstation network environments."
    ],
    skills: ["Enterprise IT Support", "Operating Systems", "Networking", "Hardware/Software Diagnostics", "Troubleshooting"],
  },
];

// ============================================
// 6. OPEN SOURCE PACKAGES
// ============================================
export const openSourcePackages: OpenSourcePackage[] = [
  {
    id: 1,
    name: "@custom-auth/core",
    npmUrl: "https://www.npmjs.com/package/@custom-auth/core",
    githubUrl: "https://github.com/DevCodeHub99",
    description: "Published modular TypeScript authentication library with framework integrations, session management, and database adapters.",
    downloads: "2.4K npm downloads",
    highlight: "Auth SDK",
  },
  {
    id: 2,
    name: "@event-overlay/core",
    npmUrl: "https://www.npmjs.com/package/@event-overlay/core",
    githubUrl: "https://github.com/DevCodeHub99",
    description: "Zero-dependency Canvas 2D animation framework with React integrations, TypeScript declarations, accessible controls, and background-tab pausing.",
    downloads: "1.4K npm downloads",
    highlight: "Canvas 2D Engine",
  },
];

// ============================================
// 7. SKILLS SECTION
// ============================================
export const skillCategories = {
  frontend: "Frontend Development",
  backend: "Backend & Databases",
  security: "Security & Authentication",
  tools: "Tools & DevOps",
} as const;

export const skills: Skill[] = [
  // Frontend
  { id: 1, name: "React.js", category: "frontend", icon: "FaReact", color: "#61DAFB" },
  { id: 2, name: "Next.js", category: "frontend", icon: "SiNextdotjs", color: "#000000" },
  { id: 3, name: "TypeScript", category: "frontend", icon: "SiTypescript", color: "#3178C6" },
  { id: 4, name: "JavaScript (ES6+)", category: "frontend", icon: "SiJavascript", color: "#F7DF1E" },
  { id: 5, name: "Tailwind CSS", category: "frontend", icon: "SiTailwindcss", color: "#06B6D4" },
  { id: 6, name: "Zustand State Management", category: "frontend", icon: "FaLayerGroup", color: "#8B5CF6" },

  // Backend & Databases
  { id: 7, name: "Node.js", category: "backend", icon: "FaNodeJs", color: "#339933" },
  { id: 8, name: "Express.js", category: "backend", icon: "SiExpress", color: "#000000" },
  { id: 9, name: "REST APIs & Middleware", category: "backend", icon: "FaServer", color: "#6366F1" },
  { id: 10, name: "MongoDB & Mongoose", category: "backend", icon: "SiMongodb", color: "#47A248" },
  { id: 11, name: "PostgreSQL (Basic)", category: "backend", icon: "SiPostgresql", color: "#4169E1" },
  { id: 12, name: "Schema Design & Aggregations", category: "backend", icon: "FaDatabase", color: "#059669" },

  // Security & Authentication
  { id: 13, name: "JWT & Refresh Tokens", category: "tools", icon: "FaUserLock", color: "#EF4444" },
  { id: 14, name: "OAuth & HTTP-only Cookies", category: "tools", icon: "FaUserLock", color: "#F59E0B" },
  { id: 15, name: "RBAC & Data Isolation", category: "tools", icon: "FaUserLock", color: "#8B5CF6" },
  { id: 16, name: "Input Validation (Zod/bcrypt)", category: "tools", icon: "FaBug", color: "#10B981" },

  // Tools & DevOps
  { id: 17, name: "Git & GitHub Workflows", category: "engineering", icon: "FaGitAlt", color: "#F05032" },
  { id: 18, name: "npm Package Publishing", category: "engineering", icon: "FaTerminal", color: "#CB3837" },
  { id: 19, name: "Vercel & Netlify CI/CD", category: "engineering", icon: "FaServer", color: "#000000" },
  { id: 20, name: "Performance Optimization", category: "engineering", icon: "FaTachometerAlt", color: "#059669" },
];

// ============================================
// 8. PROJECTS SECTION
// ============================================
export const techConfig: Record<string, { color: string; icon: string }> = {
  "React": { color: "#61DAFB", icon: "React" },
  "Node.js": { color: "#339933", icon: "NodeJS" },
  "PostgreSQL": { color: "#4169E1", icon: "PostgreSQL" },
  "Next.js": { color: "#000000", icon: "NextJS" },
  "TypeScript": { color: "#3178C6", icon: "TypeScript" },
  "MongoDB": { color: "#47A248", icon: "MongoDB" },
  "Mongoose": { color: "#880000", icon: "Database" },
  "Tailwind CSS": { color: "#06B6D4", icon: "TailwindCSS" },
  "Zustand": { color: "#443E38", icon: "Database" },
  "Cloudinary": { color: "#3448C5", icon: "Server" },
  "Google Gemini": { color: "#4285F4", icon: "Lightbulb" },
  "OpenRouter": { color: "#6366F1", icon: "Network" },
  "Vite": { color: "#646CFF", icon: "Code" },
  "HTML5": { color: "#E34F26", icon: "Code" },
  "CSS3": { color: "#1572B6", icon: "Code" },
  "JavaScript": { color: "#F7DF1E", icon: "Code" },
  "PWA": { color: "#5A0FC8", icon: "Layout" },
  "npm": { color: "#CB3837", icon: "Terminal" },
} as const;

export const projects: Project[] = [
  {
    id: 1,
    title: "InvoiceDesk — GST-Compliant Invoicing & Billing Platform",
    description: "Production B2B billing platform built for small-to-mid businesses, featuring automated multi-tier GST compliance (CGST, SGST, IGST), HSN/SAC cataloging, dynamic UPI payment QR codes, and client-side PDF invoice export. Engineered with strict user-level data isolation, JWT authentication with secure HTTP-only cookies, and reactive state management via Zustand.",
    imageUrl: "/projects/invoicedesk.png",
    githubUrl: "https://github.com/DevCodeHub99/sndt-invoice-desk",
    demoUrl: "https://shrinavdurgatrade.zyklabs.in/",
    techStack: ["Next.js", "React", "TypeScript", "MongoDB", "Mongoose", "Zustand", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "VisionVoice — AI Multilingual Accessibility Visual Aid",
    description: "AI-powered assistive web application that captures camera input to deliver real-time scene descriptions and OCR text extraction for visually impaired users. Built with Google Gemini and OpenRouter for multilingual speech across 8 languages, client-side Bring-Your-Own-Key (BYOK) privacy, and text-to-speech via the browser-native Web Speech API.",
    imageUrl: "/projects/visionvoice.png",
    githubUrl: "https://github.com/DevCodeHub99/VisionVoice-Multilingual-Visual-Aid-for-the-Visually-Impaired",
    demoUrl: "https://visionvoice-1073180550844.us-west1.run.app",
    techStack: ["React", "TypeScript", "Vite", "Google Gemini", "OpenRouter", "Tailwind CSS"],
  },
  {
    id: 3,
    title: "ShopEase — Full-Stack E-Commerce & Admin Platform",
    description: "Full-stack e-commerce platform with instant search, faceted category filtering, cart, order tracking, wishlist, and customer reviews. Features an end-to-end merchant admin dashboard for inventory tracking, order lifecycle management, analytics, secure JWT/OTP authentication with optional 2FA, and Cloudinary media optimization.",
    imageUrl: "/projects/shopease.png",
    githubUrl: "https://github.com/DevCodeHub99/shopease-ecommerce/",
    demoUrl: "https://shopease-ecommerce-mu.vercel.app",
    techStack: ["Next.js", "React", "TypeScript", "MongoDB", "Cloudinary", "Tailwind CSS"],
  },
  {
    id: 4,
    title: "custom-auth — Modular TypeScript Auth SDK (2.4K+ Downloads)",
    description: "Published open-source authentication library on npm with over 2,400+ downloads. Provides modular authentication workflows, session lifecycle management, secure JWT access and refresh token rotation, and pluggable database adapters with zero external dependencies and 100% type safety.",
    imageUrl: "/projects/custom-auth.png",
    githubUrl: "https://github.com/DevCodeHub99",
    demoUrl: "https://www.npmjs.com/package/@custom-auth/core",
    techStack: ["TypeScript", "Node.js", "npm"],
  },
  {
    id: 5,
    title: "event-overlay — Canvas 2D Visual Animation Framework",
    description: "Zero-dependency Canvas 2D visual overlay and celebration animation framework (1.4K+ npm downloads) with first-class React components. Built with hardware-accelerated animations, automatic requestAnimationFrame pausing on inactive browser tabs, and accessible reduced-motion controls.",
    imageUrl: "/projects/event-overlay.png",
    githubUrl: "https://github.com/DevCodeHub99",
    demoUrl: "https://www.npmjs.com/package/@event-overlay/core",
    techStack: ["TypeScript", "React", "HTML5", "npm"],
  },
  {
    id: 6,
    title: "Quick Tools — Offline Developer Productivity Suite (PWA)",
    description: "Privacy-first offline developer utility suite featuring UUID generator, JSON formatter & validator, hash/password generators, regex tester, and developer calculators. Built for sub-second execution with 100% in-browser processing, service-worker caching, and unit-tested with Vitest.",
    imageUrl: "/projects/quick-tools.png",
    githubUrl: "https://github.com/DevCodeHub99/quick-tools",
    demoUrl: "https://quick-tools-947.netlify.app",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PWA"],
  },
];

// ============================================
// 9. BLOG SECTION
// ============================================
export const blogContent = {
  title: "Latest Technical Articles",
  subtitle: "Articles & Guides",
  description: "Practical engineering guides, JavaScript & React cheat sheets, and architectural project walkthroughs published on DEV Community.",
} as const;

// ============================================
// 10. TESTIMONIALS SECTION
// ============================================
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Arjun Mehta",
    role: "Tech Lead",
    company: "Fintech Platform",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    content: "Collaborated on invoice and checkout workflows. Clean code, delivered ahead of schedule, and understood the tax calculation subtleties without roundtrips. Solid engineer.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Founder",
    company: "E-Commerce Startup",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80",
    content: "Built our e-commerce platform with product catalog, cart, and admin dashboard. Handled everything from frontend to database and deployment with strong reliability.",
  },
  {
    id: 3,
    name: "Vikram Desai",
    role: "Engineering Manager",
    company: "SaaS Systems",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    content: "Vikas gets things built and shipped. Pragmatic approach to engineering, clear communication, and quick turnaround on bugs and production updates.",
  },
];

// ============================================
// 11. CONTACT SECTION
// ============================================
export const contactContent = {
  title: "Let's build something",
  subtitle: "Get in Touch",
  heading: "Have an opportunity or project?",
  description: "I'm actively open to Full Stack Developer, Frontend Developer, and Backend Developer roles, as well as freelance contract projects. Feel free to reach out directly.",
} as const;

// ============================================
// 12. FOOTER SECTION
// ============================================
export const footerContent = {
  copyright: "Designed & built by Vikas Kumar (DevCodeHub99).",
  tagline: "Focused on clean code, production reliability, and practical software engineering.",
  formspreeCredit: "Contact requests are routed directly to dev.codehub99@gmail.com.",
  devHumor: "Crafted with React, Next.js, TypeScript, and clean modular architecture.",
} as const;

// ============================================
// 13. SOCIAL LINKS
// ============================================
export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/DevCodeHub99",
    icon: "Github",
    ariaLabel: "Visit Vikas Kumar's GitHub profile",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/devcodehub99",
    icon: "Linkedin",
    ariaLabel: "Visit Vikas Kumar's LinkedIn profile",
  },
  {
    name: "DEV Community",
    url: "https://dev.to/devcodehub99",
    icon: "Dev",
    ariaLabel: "Read Vikas Kumar's articles on DEV Community",
  },
  {
    name: "X",
    url: "https://x.com/DevCodeHub99",
    icon: "Twitter",
    ariaLabel: "Follow Vikas Kumar on X",
  },
];
