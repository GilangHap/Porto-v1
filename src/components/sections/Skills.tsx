"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
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
  { id: "1", name: "Next.js", category: "Frontend", description: "React framework" },
  { id: "2", name: "React", category: "Frontend", description: "UI library" },
  { id: "3", name: "Tailwind CSS", category: "Frontend", description: "Utility CSS" },
  { id: "4", name: "TypeScript", category: "Frontend", description: "Type-safe JS" },
  { id: "5", name: "JavaScript", category: "Frontend", description: "Web language" },
  { id: "6", name: "Laravel", category: "Backend", description: "PHP framework" },
  { id: "7", name: "CodeIgniter", category: "Backend", description: "Light PHP" },
  { id: "8", name: "PHP", category: "Backend", description: "Server-side" },
  { id: "9", name: "Node.js", category: "Backend", description: "JS runtime" },
  { id: "10", name: "REST API", category: "Backend", description: "API design" },
  { id: "11", name: "PostgreSQL", category: "Database", description: "SQL database" },
  { id: "12", name: "MySQL", category: "Database", description: "SQL database" },
  { id: "13", name: "Prisma", category: "Database", description: "Modern ORM" },
  { id: "14", name: "Firebase", category: "Database", description: "Cloud DB" },
  { id: "15", name: "Supabase", category: "Database", description: "Open Firebase" },
  { id: "16", name: "Docker", category: "Tools", description: "Containers" },
  { id: "17", name: "Git", category: "Tools", description: "Version control" },
  { id: "18", name: "Flutter", category: "Mobile", description: "Cross-platform" },
  { id: "19", name: "Dart", category: "Mobile", description: "Flutter lang" },
  { id: "20", name: "Kotlin", category: "Mobile", description: "Android native" },
];

// 3D Tilt Card Component
function SkillCard({ skill, index, isInView }: { skill: Skill; index: number; isInView: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 50 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const iconData = skillIcons[skill.name];
  const Icon = iconData?.Icon;
  const color = iconData?.color || "#00D4FF";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.03,
        type: "spring",
        stiffness: 100,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className="group relative cursor-pointer"
    >
      {/* Card */}
      <div
        className="relative p-5 rounded-2xl border border-[var(--glass-border)] transition-all duration-500"
        style={{
          background: isHovered
            ? `linear-gradient(135deg, ${color}15 0%, transparent 50%)`
            : "rgba(17, 17, 27, 0.6)",
          boxShadow: isHovered
            ? `0 20px 40px -20px ${color}40, 0 0 30px -5px ${color}20`
            : "none",
          borderColor: isHovered ? `${color}50` : undefined,
        }}
      >
        {/* Floating Particles on Hover */}
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ backgroundColor: color }}
                initial={{ opacity: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: -30,
                  x: (i - 1) * 15,
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              />
            ))}
          </>
        )}

        {/* Icon Container */}
        <motion.div
          className="relative w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${color}20 0%, ${color}05 100%)`,
            transform: "translateZ(30px)",
          }}
          animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {Icon ? (
            <Icon
              className="w-8 h-8 transition-all duration-300"
              style={{
                color: color,
                filter: isHovered ? `drop-shadow(0 0 15px ${color})` : "none",
              }}
            />
          ) : (
            <span className="text-2xl font-bold" style={{ color }}>
              {skill.name.charAt(0)}
            </span>
          )}
        </motion.div>

        {/* Name */}
        <motion.p
          className="text-sm font-medium text-center transition-colors"
          style={{
            color: isHovered ? color : "var(--text-primary)",
            transform: "translateZ(20px)",
          }}
        >
          {skill.name}
        </motion.p>

        {/* Glow Ring on Hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${color}10 0%, transparent 70%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills({ skills }: SkillsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const skillData = skills && skills.length > 0 ? skills : defaultSkills;

  // Get unique categories
  const categories = [...new Set(skillData.map((s) => s.category))];

  // Filter skills
  const filteredSkills = activeCategory
    ? skillData.filter((s) => s.category === activeCategory)
    : skillData;

  return (
    <section id="skills" className="section relative overflow-hidden bg-[var(--bg-primary)]">
      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-40" />
        {/* Scanning Line Animation */}
        <motion.div
          className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[var(--accent-cyan)]/10 to-transparent pointer-events-none"
          animate={{ y: ["-100%", "calc(100vh + 100%)"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[var(--accent-purple)]/10 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[var(--accent-cyan)]/10 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className="w-3 h-3 rounded-full bg-[var(--accent-cyan)]"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-mono text-[var(--accent-cyan)] tracking-widest">TECH_STACK</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold">
            <span className="text-[var(--text-primary)]">Skills</span>
            <span className="text-[var(--accent-purple)]"> & </span>
            <span className="gradient-text">Technologies</span>
          </h2>
        </motion.div>

        {/* Category Filter - Pill Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          <motion.button
            onClick={() => setActiveCategory(null)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeCategory === null
                ? "bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] text-white shadow-lg shadow-[var(--accent-cyan)]/30"
                : "bg-[var(--bg-secondary)] border border-[var(--glass-border)] text-[var(--text-secondary)] hover:border-[var(--accent-cyan)]/50"
            }`}
          >
            All ({skillData.length})
          </motion.button>
          {categories.map((cat) => {
            const count = skillData.filter((s) => s.category === cat).length;
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] text-white shadow-lg shadow-[var(--accent-cyan)]/30"
                    : "bg-[var(--bg-secondary)] border border-[var(--glass-border)] text-[var(--text-secondary)] hover:border-[var(--accent-cyan)]/50"
                }`}
              >
                {cat} ({count})
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills Masonry Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
        >
          {filteredSkills.map((skill, index) => (
            <SkillCard key={skill.id} skill={skill} index={index} isInView={isInView} />
          ))}
        </motion.div>

        {/* Animated Counter Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-20 flex justify-center"
        >
          <div className="inline-flex items-center gap-8 md:gap-16 px-8 py-6 rounded-2xl bg-[var(--bg-secondary)]/50 border border-[var(--glass-border)] backdrop-blur-sm">
            {[
              { value: filteredSkills.length, label: "SKILLS", suffix: "" },
              { value: categories.length, label: "CATEGORIES", suffix: "" },
              { value: 3, label: "YEARS", suffix: "+" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <motion.div
                  className="text-3xl md:text-4xl font-bold font-mono gradient-text"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  {stat.value}{stat.suffix}
                </motion.div>
                <div className="text-xs text-[var(--text-muted)] mt-1 tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
