"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import ProjectModal, { Project } from "../ProjectModal";

interface ProjectsProps {
  projects?: Project[];
}

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Re-hire Management System",
    shortDescription: "Enterprise HR platform for internship and re-hire management",
    overview: "A comprehensive system for managing internship applications and employee re-hire workflows.",
    role: "Full-stack Developer",
    features: ["Multi-stage workflow", "RBAC", "Real-time notifications", "Document management"],
    techStack: ["Laravel", "PostgreSQL", "Tailwind CSS", "Alpine.js"],
    screenshots: [],
    githubUrl: "https://github.com/GilangHap",
  },
  {
    id: "2",
    title: "Property Management System",
    shortDescription: "Modern rental platform with tenant and payment management",
    overview: "Complete property management solution with tenant onboarding and payment tracking.",
    role: "Full-stack Developer",
    features: ["Property listings", "Tenant management", "Payment tracking", "Maintenance requests"],
    techStack: ["Flutter", "Laravel", "Supabase", "PostgreSQL"],
    screenshots: [],
    githubUrl: "https://github.com/GilangHap",
  },
];

const INITIAL_DISPLAY_COUNT = 6;

export default function Projects({ projects }: ProjectsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const projectData = projects && projects.length > 0 ? projects : defaultProjects;
  const displayedProjects = showAll ? projectData : projectData.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMore = projectData.length > INITIAL_DISPLAY_COUNT;

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section id="projects" className="section relative">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="section-title gradient-text">Featured Projects</h2>
          <p className="text-[var(--text-secondary)] mt-6 max-w-2xl">
            A selection of projects that showcase my skills in building complete, production-ready systems.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => openProject(project)}
                className="project-card glass-card cursor-pointer group"
              >
                {/* Project Image/Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-[var(--accent-cyan-dim)] to-[var(--accent-purple-dim)] rounded-t-2xl overflow-hidden">
                  {project.screenshots && project.screenshots.length > 0 ? (
                    <img
                      src={project.screenshots[0]}
                      alt={project.title}
                      className="project-image w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl font-bold gradient-text opacity-30">
                        {project.title.charAt(0)}
                      </div>
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-60" />
                  
                  {/* Quick Links */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg bg-black/50 text-white hover:bg-[var(--accent-cyan)] transition-colors"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg bg-black/50 text-white hover:bg-[var(--accent-cyan)] transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                    {project.shortDescription}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-md text-xs font-medium bg-[var(--bg-tertiary)] text-[var(--text-muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-2 py-1 rounded-md text-xs font-medium bg-[var(--bg-tertiary)] text-[var(--text-muted)]">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  {/* View More */}
                  <div className="flex items-center gap-2 text-sm text-[var(--accent-cyan)] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View Details</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show More/Less Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--bg-tertiary)] border border-[var(--glass-border)] text-[var(--text-primary)] font-medium hover:border-[var(--accent-cyan)]/50 hover:text-[var(--accent-cyan)] transition-all group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {showAll ? (
                <>
                  <span>Lihat Lebih Sedikit</span>
                  <ChevronUp size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                </>
              ) : (
                <>
                  <span>Lihat Selengkapnya ({projectData.length - INITIAL_DISPLAY_COUNT} lainnya)</span>
                  <ChevronDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
}
