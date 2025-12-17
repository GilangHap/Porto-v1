"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

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
      setCurrentImageIndex(0);
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
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[var(--bg-secondary)] border border-[var(--glass-border)]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[var(--bg-primary)]/80 border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent-cyan)]/50 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Screenshot */}
            {hasScreenshots && (
              <div className="relative aspect-video bg-[var(--bg-tertiary)]">
                <img
                  src={project.screenshots[currentImageIndex]}
                  alt={`${project.title} screenshot`}
                  className="w-full h-full object-cover"
                />
                {project.screenshots.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {project.screenshots.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex
                              ? "bg-[var(--accent-cyan)]"
                              : "bg-white/40 hover:bg-white/60"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Title & Description */}
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2">
                {project.title}
              </h2>
              <p className="text-[var(--text-secondary)] mb-4">
                {project.shortDescription}
              </p>

              {/* Role Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)]" />
                <span className="text-sm font-medium text-[var(--accent-cyan)]">{project.role}</span>
              </div>

              {/* Overview */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[var(--accent-cyan)] mb-2">Overview</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {project.overview}
                </p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[var(--accent-cyan)] mb-3">Key Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {project.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-[var(--text-secondary)]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] mt-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[var(--accent-cyan)] mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 rounded-lg bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] text-sm font-medium border border-[var(--accent-cyan)]/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              {(project.githubUrl || project.liveUrl) && (
                <div className="flex gap-4 pt-4 border-t border-[var(--glass-border)]">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--glass-border)] text-[var(--text-primary)] font-medium hover:border-[var(--accent-cyan)]/50 hover:text-[var(--accent-cyan)] transition-colors"
                    >
                      <Github size={18} />
                      View Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] text-white font-medium hover:opacity-90 transition-opacity"
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </a>
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
