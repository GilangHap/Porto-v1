"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
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
    <section id="projects" className="section relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[var(--text-primary)]">Featured </span>
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Production-ready systems built with modern technologies
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, index) => {
              const hasImage = project.screenshots && project.screenshots.length > 0;
              
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => openProject(project)}
                  className="group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="h-full rounded-2xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--glass-border)] hover:border-[var(--accent-cyan)]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--accent-cyan)]/10"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[var(--accent-cyan)]/10 to-[var(--accent-purple)]/10">
                      {hasImage ? (
                        <Image
                          src={project.screenshots[0]}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-6xl font-bold text-[var(--text-muted)]/20 group-hover:text-[var(--accent-cyan)]/30 transition-colors">
                            {project.title.charAt(0)}
                          </span>
                        </div>
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent opacity-80" />
                      
                      {/* Quick Links */}
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-9 h-9 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[var(--accent-cyan)] transition-colors"
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
                            className="w-9 h-9 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[var(--accent-cyan)] transition-colors"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.techStack.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md text-xs font-medium bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)]"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-[var(--bg-tertiary)] text-[var(--text-muted)]">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-cyan)] transition-colors">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4">
                        {project.shortDescription}
                      </p>

                      {/* View Details */}
                      <div className="flex items-center gap-2 text-sm font-medium text-[var(--accent-cyan)] opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>View Details</span>
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Show More/Less Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--bg-secondary)] border border-[var(--glass-border)] text-[var(--text-primary)] font-medium hover:border-[var(--accent-cyan)]/50 hover:text-[var(--accent-cyan)] transition-all"
            >
              {showAll ? (
                <>
                  <span>Show Less</span>
                  <ChevronUp size={18} />
                </>
              ) : (
                <>
                  <span>View All ({projectData.length - INITIAL_DISPLAY_COUNT} more)</span>
                  <ChevronDown size={18} />
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
