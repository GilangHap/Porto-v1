import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // ============================================
  // FRESH SEED - Delete all existing data first
  // ============================================
  console.log("🗑️  Clearing existing data...");
  await prisma.experience.deleteMany();
  await prisma.project.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.about.deleteMany();
  await prisma.siteSettings.deleteMany();
  console.log("✅ Existing data cleared");

  // ============================================
  // SITE SETTINGS
  // ============================================
  const settings = await prisma.siteSettings.upsert({
    where: { id: "main-settings" },
    update: {},
    create: {
      id: "main-settings",
      heroTitle: "Gilang Happy Dwinugroho",
      heroSubtitle:
        "Web Developer • System Builder",
      heroDescription:
        "I build scalable web systems with clean architecture, modern UI, and security-aware implementation.",
      email: "gilanghappy123@gmail.com",
      github: "GilangHap",
      linkedin: "https://www.linkedin.com/in/gilanghappy/",
      whatsapp: "082328380837",
    },
  });
  console.log("✅ Site settings created");

  // ============================================
  // ABOUT
  // ============================================
  const about = await prisma.about.upsert({
    where: { id: "main-about" },
    update: {},
    create: {
      id: "main-about",
      summary:
        "I am a dedicated Informatics undergraduate with a passion for building robust, scalable web applications. My approach combines clean architecture principles with modern development practices, ensuring systems that are maintainable, secure, and performant.",
      education: "Informatics – Universitas Jenderal Soedirman",
      focusAreas: JSON.stringify([
        "Full-stack Web Development",
        "Backend Architecture & API Design",
        "Database Design & Optimization",
        "Real-time Systems & WebSocket",
        "Authentication & Security",
      ]),
      internship:
        "Completed industrial internship at PT Dirgantara Indonesia, gaining hands-on experience in enterprise-level system development and professional software engineering practices.",
    },
  });
  console.log("✅ About section created");

  // ============================================
  // SKILLS
  // ============================================
  const skills = [
    // Frontend
    {
      name: "Next.js",
      category: "Frontend",
      description: "React framework for production-grade applications",
      icon: "Globe",
      order: 1,
    },
    {
      name: "React",
      category: "Frontend",
      description: "Component-based UI library",
      icon: "Atom",
      order: 2,
    },
    {
      name: "Tailwind CSS",
      category: "Frontend",
      description: "Utility-first CSS framework",
      icon: "Palette",
      order: 3,
    },
    {
      name: "TypeScript",
      category: "Frontend",
      description: "Type-safe JavaScript development",
      icon: "FileCode",
      order: 4,
    },
    {
      name: "JavaScript",
      category: "Frontend",
      description: "Dynamic web programming",
      icon: "Code",
      order: 5,
    },
    // Backend
    {
      name: "Laravel",
      category: "Backend",
      description: "PHP framework for web artisans",
      icon: "Server",
      order: 1,
    },
    {
      name: "CodeIgniter",
      category: "Backend",
      description: "Lightweight PHP framework",
      icon: "Code",
      order: 2,
    },
    {
      name: "PHP",
      category: "Backend",
      description: "Server-side scripting language",
      icon: "Code",
      order: 3,
    },
    {
      name: "Node.js",
      category: "Backend",
      description: "JavaScript runtime for server-side",
      icon: "Server",
      order: 4,
    },
    {
      name: "REST API",
      category: "Backend",
      description: "RESTful API design and implementation",
      icon: "Link",
      order: 5,
    },
    // Database
    {
      name: "PostgreSQL",
      category: "Database",
      description: "Advanced open-source relational database",
      icon: "Database",
      order: 1,
    },
    {
      name: "MySQL",
      category: "Database",
      description: "Popular relational database system",
      icon: "Database",
      order: 2,
    },
    {
      name: "Prisma",
      category: "Database",
      description: "Next-generation ORM for Node.js",
      icon: "Layers",
      order: 3,
    },
    {
      name: "Firebase",
      category: "Database",
      description: "Google cloud database & auth",
      icon: "Cloud",
      order: 4,
    },
    {
      name: "Supabase",
      category: "Database",
      description: "Open-source Firebase alternative",
      icon: "Database",
      order: 5,
    },
    // System & Tools
    {
      name: "Docker",
      category: "System & Tools",
      description: "Containerization and deployment",
      icon: "Container",
      order: 1,
    },
    {
      name: "Git",
      category: "System & Tools",
      description: "Version control and collaboration",
      icon: "GitBranch",
      order: 2,
    },
    // Mobile
    {
      name: "Flutter",
      category: "Mobile",
      description: "Cross-platform mobile development",
      icon: "Smartphone",
      order: 1,
    },
    {
      name: "Dart",
      category: "Mobile",
      description: "Flutter programming language",
      icon: "Code",
      order: 2,
    },
    {
      name: "Kotlin",
      category: "Mobile",
      description: "Android native development",
      icon: "Smartphone",
      order: 3,
    },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }
  console.log("✅ Skills created");

  // ============================================
  // PROJECTS
  // ============================================
  const projects = [
    {
      title: "Re-hire Management System",
      shortDescription:
        "Comprehensive internship and re-hire management platform for enterprise HR operations.",
      overview:
        "A full-featured system designed to streamline the process of managing internship applications, employee re-hire workflows, and HR documentation. The platform handles the complete lifecycle from application submission to final approval, with role-based access control ensuring proper authorization at each stage.",
      role: "Full-stack Developer - Responsible for system architecture design, database modeling, backend API development, frontend implementation, and real-time notification system integration.",
      features: JSON.stringify([
        "Multi-stage application workflow with approval chains",
        "Role-based access control (RBAC) for different user levels",
        "Document upload and management system",
        "Real-time notifications using WebSocket",
        "Comprehensive reporting and analytics dashboard",
        "Email notification integration",
      ]),
      techStack: JSON.stringify([
        "Laravel",
        "PostgreSQL",
        "Tailwind CSS",
        "Alpine.js",
        "Laravel Reverb",
        "Livewire",
      ]),
      screenshots: JSON.stringify([]),
      githubUrl: "https://github.com/GilangHap",
      order: 1,
    },
    {
      title: "Property Management System",
      shortDescription:
        "Modern property rental platform with tenant management and payment tracking.",
      overview:
        "A comprehensive property management solution built to handle the complexities of rental property operations. Features include property listings, tenant onboarding, lease management, maintenance request tracking, and automated rent collection reminders.",
      role: "Full-stack Developer - Designed and implemented the complete system from database schema to user interface, focusing on user experience and system reliability.",
      features: JSON.stringify([
        "Property listing with image galleries",
        "Tenant application and screening workflow",
        "Digital lease agreement management",
        "Maintenance request ticketing system",
        "Payment tracking and reminder automation",
        "Financial reporting for property owners",
      ]),
      techStack: JSON.stringify([
        "Flutter",
        "Laravel",
        "Supabase",
        "PostgreSQL",
        "GetX",
      ]),
      screenshots: JSON.stringify([]),
      githubUrl: "https://github.com/GilangHap",
      order: 2,
    },
    {
      title: "E-Library System",
      shortDescription:
        "Digital library management system with book borrowing and member management.",
      overview:
        "A modern digital library platform designed to manage book inventories, member registrations, borrowing transactions, and late fee calculations. The system provides both librarian and member interfaces with appropriate functionality for each role.",
      role: "Full-stack Developer - Built the entire application including catalog management, borrowing workflow, and administrative reporting features.",
      features: JSON.stringify([
        "Book catalog with advanced search and filtering",
        "QR code-based book identification",
        "Member registration and card generation",
        "Borrowing and return transaction management",
        "Automated late fee calculation",
        "Inventory and circulation reports",
      ]),
      techStack: JSON.stringify([
        "Laravel",
        "MySQL",
        "Bootstrap",
        "jQuery",
        "Chart.js",
      ]),
      screenshots: JSON.stringify([]),
      githubUrl: "https://github.com/GilangHap",
      order: 3,
    },
    {
      title: "Real-time Auction System",
      shortDescription:
        "Live bidding platform with real-time updates and automated winner determination.",
      overview:
        "A sophisticated e-auction platform designed for enterprise procurement processes. Features real-time bidding with WebSocket technology, ensuring all participants see updates instantly. The system supports multiple auction types and automated winner determination based on configurable criteria.",
      role: "Full-stack Developer - Implemented the real-time bidding engine, participant management, and comprehensive reporting module.",
      features: JSON.stringify([
        "Real-time bid updates using WebSocket",
        "Multiple auction format support",
        "Participant qualification and disqualification",
        "Automated winner determination",
        "Technical and price scoring system",
        "Comprehensive audit trail and reporting",
      ]),
      techStack: JSON.stringify([
        "Laravel",
        "PostgreSQL",
        "Laravel Reverb",
        "Alpine.js",
        "Tailwind CSS",
      ]),
      screenshots: JSON.stringify([]),
      githubUrl: "https://github.com/GilangHap",
      order: 4,
    },
    {
      title: "UMKM Website (KKN Project)",
      shortDescription:
        "Community service project creating digital presence for local small businesses.",
      overview:
        "A community development project (KKN) focused on digital empowerment of local small and medium enterprises (UMKM). The project involved creating professional websites for local businesses, training entrepreneurs in digital marketing, and establishing sustainable online presence.",
      role: "Project Lead & Developer - Led the team in requirements gathering, design, development, and training delivery to business owners.",
      features: JSON.stringify([
        "Responsive business profile website",
        "Product catalog with categories",
        "Contact form and WhatsApp integration",
        "Google Maps integration",
        "SEO optimization for local search",
        "Social media integration",
      ]),
      techStack: JSON.stringify([
        "Next.js",
        "Tailwind CSS",
        "Vercel",
        "Google Analytics",
      ]),
      screenshots: JSON.stringify([]),
      githubUrl: "https://github.com/GilangHap",
      order: 5,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
  console.log("✅ Projects created");

  // ============================================
  // EXPERIENCE
  // ============================================
  const experiences = [
    {
      title: "Industrial Internship (Kerja Praktik)",
      company: "PT Dirgantara Indonesia",
      description:
        "Completed industrial internship focusing on enterprise software development. Gained hands-on experience in professional development workflows, code review practices, and enterprise-level system architecture. Contributed to internal tools development and documentation.",
      startDate: new Date("2024-06-01"),
      endDate: new Date("2024-08-31"),
      isCurrent: false,
      order: 1,
    },
    {
      title: "Community Service Program (KKN)",
      company: "Universitas Jenderal Soedirman",
      description:
        "Led digital empowerment initiatives for local UMKM businesses. Developed websites and provided training on digital marketing and online business management to local entrepreneurs.",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-02-28"),
      isCurrent: false,
      order: 2,
    },
    {
      title: "Informatics Student",
      company: "Universitas Jenderal Soedirman",
      description:
        "Pursuing Bachelor's degree in Informatics with focus on software engineering, database systems, and web development. Completed multiple academic and personal projects demonstrating full-stack development capabilities.",
      startDate: new Date("2021-08-01"),
      endDate: null,
      isCurrent: true,
      order: 3,
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }
  console.log("✅ Experiences created");

  console.log("🎉 Database seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
