"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Building2, Target, Sparkles } from "lucide-react";

interface AboutProps {
  about?: {
    summary?: string;
    education?: string;
    focusAreas?: string[];
    internship?: string;
  };
}

export default function About({ about }: AboutProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const defaultAbout = {
    summary:
      "I am a dedicated Informatics undergraduate with a passion for building robust, scalable web applications. My approach combines clean architecture principles with modern development practices, ensuring systems that are maintainable, secure, and performant.",
    education: "Informatics – Universitas Jenderal Soedirman",
    focusAreas: [
      "Full-stack Web Development",
      "Backend Architecture & API Design",
      "Database Design & Optimization",
      "Real-time Systems & WebSocket",
      "Authentication & Security",
    ],
    internship:
      "Completed industrial internship at PT Dirgantara Indonesia, gaining hands-on experience in enterprise-level system development and professional software engineering practices.",
  };

  const data = about || defaultAbout;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="section relative">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="section-title gradient-text">About Me</h2>
          <p className="text-[var(--text-secondary)] mt-6 max-w-2xl">
            Get to know more about my background, skills, and what drives me as
            a developer.
          </p>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Left Column - Summary & Education */}
          <div className="space-y-8">
            {/* Summary Card */}
            <motion.div
              variants={itemVariants}
              className="glass-card p-6 hover:border-[var(--accent-cyan)]/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-[var(--accent-cyan-dim)]">
                  <Sparkles className="w-5 h-5 text-[var(--accent-cyan)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  Who I Am
                </h3>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {data.summary}
              </p>
            </motion.div>

            {/* Education Card */}
            <motion.div
              variants={itemVariants}
              className="glass-card p-6 hover:border-[var(--accent-cyan)]/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-[var(--accent-purple-dim)]">
                  <GraduationCap className="w-5 h-5 text-[var(--accent-purple)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  Education
                </h3>
              </div>
              <p className="text-[var(--accent-cyan)] font-medium">
                {data.education}
              </p>
              <p className="text-[var(--text-muted)] text-sm mt-1">
                Bachelor&apos;s Degree in Progress
              </p>
            </motion.div>

            {/* Internship Card */}
            <motion.div
              variants={itemVariants}
              className="glass-card p-6 hover:border-[var(--accent-cyan)]/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-[var(--accent-cyan-dim)]">
                  <Building2 className="w-5 h-5 text-[var(--accent-cyan)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  Industry Experience
                </h3>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {data.internship}
              </p>
            </motion.div>
          </div>

          {/* Right Column - Focus Areas */}
          <motion.div variants={itemVariants}>
            <div className="glass-card p-6 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-[var(--accent-purple-dim)]">
                  <Target className="w-5 h-5 text-[var(--accent-purple)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  Focus Areas
                </h3>
              </div>
              <div className="space-y-4">
                {data.focusAreas?.map((area, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--accent-cyan-dim)] transition-colors group"
                  >
                    <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--accent-cyan-dim)] text-[var(--accent-cyan)] font-bold text-sm group-hover:scale-110 transition-transform">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                      {area}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
