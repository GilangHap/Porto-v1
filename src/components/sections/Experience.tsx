  "use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface Experience {
  id: string;
  title: string;
  company: string;
  description: string;
  startDate: string | Date;
  endDate?: string | Date | null;
  isCurrent?: boolean;
}

interface ExperienceProps {
  experiences?: Experience[];
}

const defaultExperiences: Experience[] = [
  {
    id: "1",
    title: "Industrial Internship",
    company: "PT Dirgantara Indonesia",
    description: "Enterprise software development at Indonesia's aerospace company. Building real-world systems.",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    isCurrent: false,
  },
  {
    id: "2",
    title: "Community Service",
    company: "Universitas Jenderal Soedirman",
    description: "Digital empowerment for UMKM. Teaching locals to thrive in the digital age.",
    startDate: "2024-01-01",
    endDate: "2024-02-28",
    isCurrent: false,
  },
  {
    id: "3",
    title: "Informatics Student",
    company: "UNSOED",
    description: "Studying the art of code. Building projects. Breaking things. Learning fast.",
    startDate: "2021-08-01",
    endDate: null,
    isCurrent: true,
  },
];

export default function Experience({ experiences }: ExperienceProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const expData = experiences && experiences.length > 0 ? experiences : defaultExperiences;

  return (
    <section id="experience" className="section relative overflow-hidden bg-[var(--bg-primary)]">
      {/* Animated Background Lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/20 to-transparent"
            style={{ top: `${20 + i * 15}%` }}
            animate={{ x: [-1000, 1000] }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Header - Bento Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-[var(--accent-cyan)]" />
            <span className="text-sm text-[var(--accent-cyan)] font-mono tracking-wider">JOURNEY</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
            Experience<span className="text-[var(--accent-purple)]">.</span>
          </h2>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {expData.map((exp, index) => {
            const isHovered = hoveredId === exp.id;
            const isFirst = index === 0;
            const isLast = index === expData.length - 1;
            
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(exp.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative group cursor-pointer ${
                  isFirst 
                    ? "md:col-span-7 md:row-span-2" 
                    : isLast 
                    ? "md:col-span-5" 
                    : "md:col-span-5"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`relative h-full rounded-3xl overflow-hidden ${
                    isFirst 
                      ? "min-h-[300px] md:min-h-[400px]" 
                      : "min-h-[180px]"
                  }`}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 ${
                    isFirst 
                      ? "bg-gradient-to-br from-[var(--accent-cyan)]/20 via-transparent to-[var(--accent-purple)]/20" 
                      : index === 1
                      ? "bg-gradient-to-br from-[var(--accent-purple)]/15 to-transparent"
                      : "bg-gradient-to-br from-[var(--accent-cyan)]/10 to-transparent"
                  }`} />
                  
                  {/* Glass Effect */}
                  <div className="absolute inset-0 bg-[var(--bg-secondary)]/60 backdrop-blur-sm border border-[var(--glass-border)] rounded-3xl group-hover:border-[var(--accent-cyan)]/40 transition-colors duration-500" />

                  {/* Content */}
                  <div className={`relative z-10 h-full flex flex-col ${isFirst ? "p-8" : "p-6"}`}>
                    {/* Top Row */}
                    <div className="flex items-start justify-between mb-auto">
                      {/* Year Badge */}
                      <div className="flex flex-col">
                        <span className={`font-mono font-bold text-[var(--text-muted)] ${isFirst ? "text-6xl md:text-8xl" : "text-4xl"}`}>
                          {new Date(exp.startDate).getFullYear().toString().slice(-2)}
                        </span>
                        <span className="text-xs text-[var(--text-muted)] font-mono mt-1">
                          /{new Date(exp.startDate).getFullYear()}
                        </span>
                      </div>

                      {/* Status / Arrow */}
                      <div className="flex items-center gap-2">
                        {exp.isCurrent && (
                          <motion.div
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30"
                          >
                            <span className="text-xs font-medium text-green-400">ACTIVE</span>
                          </motion.div>
                        )}
                        <motion.div
                          animate={isHovered ? { x: 2, y: -2 } : { x: 0, y: 0 }}
                          className="w-10 h-10 rounded-xl bg-[var(--bg-tertiary)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ArrowUpRight className="w-5 h-5 text-[var(--accent-cyan)]" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Bottom Content */}
                    <div className="mt-auto">
                      {/* Company Tag */}
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/20 mb-3">
                        {exp.company}
                      </span>

                      {/* Title */}
                      <h3 className={`font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-cyan)] transition-colors ${
                        isFirst ? "text-2xl md:text-3xl" : "text-xl"
                      }`}>
                        {exp.title}
                      </h3>

                      {/* Description - Only show on first or hover */}
                      <motion.p
                        initial={false}
                        animate={{ 
                          opacity: isFirst || isHovered ? 1 : 0,
                          height: isFirst || isHovered ? "auto" : 0 
                        }}
                        className="text-sm text-[var(--text-secondary)] leading-relaxed overflow-hidden"
                      >
                        {exp.description}
                      </motion.p>
                    </div>
                  </div>

                  {/* Hover Glow */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-[var(--accent-cyan)]/10 to-transparent pointer-events-none"
                  />
                </motion.div>
              </motion.div>
            );
          })}

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-7"
          >
            <div className="h-full rounded-3xl bg-[var(--bg-secondary)]/40 border border-[var(--glass-border)] p-6 flex items-center justify-around">
              {[
                { value: "3+", label: "Years" },
                { value: "5+", label: "Projects" },
                { value: "1", label: "Internship" },
                { value: "∞", label: "Passion" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-4xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-[var(--text-muted)] mt-1 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
