"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Building2, Circle } from "lucide-react";

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
    title: "Industrial Internship (Kerja Praktik)",
    company: "PT Dirgantara Indonesia",
    description: "Completed industrial internship focusing on enterprise software development. Gained hands-on experience in professional development workflows and enterprise-level system architecture.",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    isCurrent: false,
  },
  {
    id: "2",
    title: "Community Service Program (KKN)",
    company: "Universitas Jenderal Soedirman",
    description: "Led digital empowerment initiatives for local UMKM businesses. Developed websites and provided training on digital marketing.",
    startDate: "2024-01-01",
    endDate: "2024-02-28",
    isCurrent: false,
  },
  {
    id: "3",
    title: "Informatics Student",
    company: "Universitas Jenderal Soedirman",
    description: "Pursuing Bachelor's degree in Informatics with focus on software engineering, database systems, and web development.",
    startDate: "2021-08-01",
    endDate: null,
    isCurrent: true,
  },
];

function formatDate(dateStr: string | Date): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function Experience({ experiences }: ExperienceProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const expData = experiences && experiences.length > 0 ? experiences : defaultExperiences;

  return (
    <section id="experience" className="section relative bg-[var(--bg-secondary)]">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-[var(--accent-cyan)]/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="section-title gradient-text mx-auto">Experience</h2>
          <p className="text-[var(--text-secondary)] mt-6 max-w-2xl mx-auto">
            My journey through education, internship, and project development.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--accent-cyan)] via-[var(--accent-purple)] to-[var(--accent-cyan)]" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {expData.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 mt-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.15, type: "spring" }}
                    className="timeline-dot"
                  />
                </div>

                {/* Content Card */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-40px)] ${index % 2 === 0 ? "md:ml-8" : "md:mr-8 md:text-right"}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="glass-card p-6 hover:border-[var(--accent-cyan)]/50 transition-all"
                  >
                    {/* Date Badge */}
                    <div className={`flex items-center gap-2 mb-3 text-sm text-[var(--accent-cyan)] ${index % 2 === 0 ? "" : "md:justify-end"}`}>
                      <Calendar size={14} />
                      <span>
                        {formatDate(exp.startDate)} — {exp.isCurrent ? "Present" : exp.endDate ? formatDate(exp.endDate) : ""}
                      </span>
                      {exp.isCurrent && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">
                          <Circle size={8} fill="currentColor" />
                          Current
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                      {exp.title}
                    </h3>

                    {/* Company */}
                    <div className={`flex items-center gap-2 text-sm text-[var(--text-muted)] mb-3 ${index % 2 === 0 ? "" : "md:justify-end"}`}>
                      <Building2 size={14} />
                      <span>{exp.company}</span>
                    </div>

                    {/* Description */}
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </motion.div>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block md:w-[calc(50%-40px)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
