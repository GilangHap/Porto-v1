"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  overview: string;
  role: string;
  features: string[];
  techStack: string[];
  screenshots: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!project) return null;

  const hasScreenshots = project.screenshots && project.screenshots.length > 0;

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project.screenshots.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.screenshots.length - 1 : prev - 1
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card p-0"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 glass p-6 border-b border-[var(--glass-border)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                    {project.title}
                  </h2>
                  <p className="text-[var(--text-secondary)] mt-1">
                    {project.shortDescription}
                  </p>
                </div>
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Screenshot Carousel */}
              {hasScreenshots && (
                <div className="relative rounded-xl overflow-hidden bg-[var(--bg-tertiary)]">
                  <div className="aspect-video relative">
                    <img
                      src={project.screenshots[currentImageIndex]}
                      alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {project.screenshots.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                        >
                          <ChevronRight size={24} />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {project.screenshots.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-colors ${
                                index === currentImageIndex
                                  ? "bg-[var(--accent-cyan)]"
                                  : "bg-white/50"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Overview */}
              <div>
                <h3 className="text-lg font-semibold text-[var(--accent-cyan)] mb-3">
                  Overview
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {project.overview}
                </p>
              </div>

              {/* Role */}
              <div>
                <h3 className="text-lg font-semibold text-[var(--accent-cyan)] mb-3">
                  My Role
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {project.role}
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-[var(--accent-cyan)] mb-3">
                  Key Features
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-3 text-[var(--text-secondary)]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] mt-2 flex-shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="text-lg font-semibold text-[var(--accent-cyan)] mb-3">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="px-4 py-2 rounded-lg bg-[var(--accent-cyan-dim)] text-[var(--accent-cyan)] text-sm font-medium border border-[var(--accent-cyan)]/20"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Links */}
              {(project.githubUrl || project.liveUrl) && (
                <div className="flex gap-4 pt-4 border-t border-[var(--glass-border)]">
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github size={18} />
                      View Code
                    </motion.a>
                  )}
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </motion.a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
