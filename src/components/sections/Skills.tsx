"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiLaravel,
  SiPhp,
  SiPostgresql,
  SiMysql,
  SiDocker,
  SiGit,
  SiJavascript,
  SiPrisma,
  SiNodedotjs,
  SiFlutter,
  SiDart,
  SiFirebase,
  SiCodeigniter,
  SiKotlin,
  SiSupabase,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { IconType } from "react-icons";

interface Skill {
  id: string;
  name: string;
  category: string;
  description?: string | null;
  icon?: string | null;
}

interface SkillsProps {
  skills?: Skill[];
}

// Skill icon mapping with brand colors
const skillIcons: Record<string, { Icon: IconType; color: string }> = {
  "Next.js": { Icon: SiNextdotjs, color: "#ffffff" },
  "React": { Icon: SiReact, color: "#61DAFB" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#06B6D4" },
  "TypeScript": { Icon: SiTypescript, color: "#3178C6" },
  "JavaScript": { Icon: SiJavascript, color: "#F7DF1E" },
  "Laravel": { Icon: SiLaravel, color: "#FF2D20" },
  "CodeIgniter": { Icon: SiCodeigniter, color: "#EF4223" },
  "PHP": { Icon: SiPhp, color: "#777BB4" },
  "PostgreSQL": { Icon: SiPostgresql, color: "#4169E1" },
  "MySQL": { Icon: SiMysql, color: "#4479A1" },
  "Docker": { Icon: SiDocker, color: "#2496ED" },
  "Git": { Icon: SiGit, color: "#F05032" },
  "Prisma": { Icon: SiPrisma, color: "#2D3748" },
  "Node.js": { Icon: SiNodedotjs, color: "#339933" },
  "REST API": { Icon: TbApi, color: "#00D4FF" },
  "Flutter": { Icon: SiFlutter, color: "#02569B" },
  "Dart": { Icon: SiDart, color: "#0175C2" },
  "Kotlin": { Icon: SiKotlin, color: "#7F52FF" },
  "Firebase": { Icon: SiFirebase, color: "#FFCA28" },
  "Supabase": { Icon: SiSupabase, color: "#3ECF8E" },
};

const defaultSkills: Skill[] = [
  { id: "1", name: "Next.js", category: "Frontend", description: "React framework for production" },
  { id: "2", name: "React", category: "Frontend", description: "UI component library" },
  { id: "3", name: "Tailwind CSS", category: "Frontend", description: "Utility-first CSS" },
  { id: "4", name: "TypeScript", category: "Frontend", description: "Type-safe JavaScript" },
  { id: "5", name: "JavaScript", category: "Frontend", description: "Dynamic web programming" },
  { id: "6", name: "Laravel", category: "Backend", description: "PHP web framework" },
  { id: "7", name: "CodeIgniter", category: "Backend", description: "Lightweight PHP framework" },
  { id: "8", name: "PHP", category: "Backend", description: "Server-side language" },
  { id: "9", name: "Node.js", category: "Backend", description: "JavaScript runtime" },
  { id: "10", name: "REST API", category: "Backend", description: "API development" },
  { id: "11", name: "PostgreSQL", category: "Database", description: "Advanced SQL database" },
  { id: "12", name: "MySQL", category: "Database", description: "Popular SQL database" },
  { id: "13", name: "Prisma", category: "Database", description: "Modern ORM" },
  { id: "14", name: "Firebase", category: "Database", description: "Cloud database & auth" },
  { id: "15", name: "Supabase", category: "Database", description: "Open-source Firebase alternative" },
  { id: "16", name: "Docker", category: "System & Tools", description: "Containerization" },
  { id: "17", name: "Git", category: "System & Tools", description: "Version control" },
  { id: "18", name: "Flutter", category: "Mobile", description: "Cross-platform mobile" },
  { id: "19", name: "Dart", category: "Mobile", description: "Flutter language" },
  { id: "20", name: "Kotlin", category: "Mobile", description: "Android native development" },
];

const categoryConfig: Record<string, { gradient: string; glow: string }> = {
  Frontend: {
    gradient: "from-cyan-500 to-blue-500",
    glow: "group-hover:shadow-cyan-500/30",
  },
  Backend: {
    gradient: "from-purple-500 to-pink-500",
    glow: "group-hover:shadow-purple-500/30",
  },
  Database: {
    gradient: "from-green-500 to-emerald-500",
    glow: "group-hover:shadow-green-500/30",
  },
  "System & Tools": {
    gradient: "from-orange-500 to-amber-500",
    glow: "group-hover:shadow-orange-500/30",
  },
  Mobile: {
    gradient: "from-blue-500 to-indigo-500",
    glow: "group-hover:shadow-blue-500/30",
  },
};

export default function Skills({ skills }: SkillsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillData = skills && skills.length > 0 ? skills : defaultSkills;

  // Group skills by category
  const groupedSkills = skillData.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categories = Object.keys(groupedSkills);

  return (
    <section id="skills" className="section relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/5 to-transparent rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6"
          >
            Tech Stack
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-[var(--text-primary)]">Skills & </span>
            <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
            A comprehensive toolkit of modern technologies I use to build scalable, performant applications.
          </p>
        </motion.div>

        {/* Skills Grid by Category */}
        <div className="space-y-16">
          {categories.map((category, categoryIndex) => {
            const categorySkills = groupedSkills[category] || [];
            const config = categoryConfig[category] || categoryConfig.Frontend;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: categoryIndex * 0.15 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${config.gradient}`} />
                  <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                    {category}
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-[var(--glass-border)] to-transparent" />
                </div>

                {/* Skills Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {categorySkills.map((skill, skillIndex) => {
                    const iconData = skillIcons[skill.name];
                    const Icon = iconData?.Icon;
                    const color = iconData?.color || "#00D4FF";

                    return (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          duration: 0.4,
                          delay: 0.2 + categoryIndex * 0.1 + skillIndex * 0.05,
                          type: "spring",
                          stiffness: 200,
                        }}
                        whileHover={{ 
                          y: -8, 
                          scale: 1.05,
                          transition: { duration: 0.2 }
                        }}
                        className={`group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-[var(--bg-tertiary)]/50 border border-[var(--glass-border)] backdrop-blur-sm cursor-pointer transition-all duration-300 hover:border-[var(--accent-cyan)]/50 hover:shadow-xl ${config.glow}`}
                      >
                        {/* Glow Effect on Hover */}
                        <div 
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: `radial-gradient(circle at center, ${color}10 0%, transparent 70%)`,
                          }}
                        />

                        {/* Icon */}
                        <div className="relative mb-4">
                          {Icon ? (
                            <Icon 
                              className="w-12 h-12 transition-all duration-300 group-hover:scale-110" 
                              style={{ 
                                color: color,
                                filter: `drop-shadow(0 0 8px ${color}40)`,
                              }}
                            />
                          ) : (
                            <div 
                              className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl"
                            >
                              {skill.name.charAt(0)}
                            </div>
                          )}
                        </div>

                        {/* Name */}
                        <span className="text-sm font-medium text-[var(--text-primary)] text-center group-hover:text-white transition-colors">
                          {skill.name}
                        </span>

                        {/* Description Tooltip on Hover */}
                        {skill.description && (
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
                            <div className="px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--glass-border)] shadow-xl whitespace-nowrap">
                              <span className="text-xs text-[var(--text-secondary)]">
                                {skill.description}
                              </span>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {[
            { label: "Technologies", value: skillData.length + "+" },
            { label: "Categories", value: categories.length },
            { label: "Years Learning", value: "3+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</span>
              <p className="text-[var(--text-muted)] text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
