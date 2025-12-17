"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  GripVertical,
  X,
  Save,
  Upload,
  ImageIcon,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  overview: string;
  role: string;
  features: string[];
  techStack: string[];
  screenshots: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  order: number;
  isVisible: boolean;
}

interface ProjectsClientProps {
  projects: Project[];
}

export default function ProjectsClient({ projects: initialProjects }: ProjectsClientProps) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    overview: "",
    role: "",
    features: "",
    techStack: "",
    screenshots: [] as string[],
    githubUrl: "",
    liveUrl: "",
  });

  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        shortDescription: project.shortDescription,
        overview: project.overview,
        role: project.role,
        features: project.features.join("\n"),
        techStack: project.techStack.join(", "),
        screenshots: project.screenshots || [],
        githubUrl: project.githubUrl || "",
        liveUrl: project.liveUrl || "",
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        shortDescription: "",
        overview: "",
        role: "",
        features: "",
        techStack: "",
        screenshots: [],
        githubUrl: "",
        liveUrl: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const formDataObj = new FormData();
      formDataObj.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formDataObj,
        });

        if (res.ok) {
          const data = await res.json();
          uploadedUrls.push(data.url);
        }
      } catch (error) {
        console.error("Upload error:", error);
      }
    }

    setFormData((prev) => ({
      ...prev,
      screenshots: [...prev.screenshots, ...uploadedUrls],
    }));
    setIsUploading(false);
  };

  const removeScreenshot = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      features: formData.features.split("\n").filter(Boolean),
      techStack: formData.techStack.split(",").map((s) => s.trim()).filter(Boolean),
    };

    const url = editingProject
      ? `/api/projects/${editingProject.id}`
      : "/api/projects";
    const method = editingProject ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setIsModalOpen(false);
      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    }
  };

  const toggleVisibility = async (project: Project) => {
    const res = await fetch(`/api/projects/${project.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isVisible: !project.isVisible }),
    });

    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 bg-[var(--bg-primary)]" />
      <div className="fixed inset-0 grid-bg opacity-30" />

      <div className="relative z-10">
        {/* Header */}
        <header className="glass border-b border-[var(--glass-border)]">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/admin"
                  className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan-dim)] transition-colors"
                >
                  <ArrowLeft size={20} />
                </Link>
                <h1 className="text-xl font-bold text-[var(--text-primary)]">
                  Manage Projects
                </h1>
              </div>
              <motion.button
                onClick={() => openModal()}
                className="btn-primary flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus size={18} />
                Add Project
              </motion.button>
            </div>
          </div>
        </header>

        {/* Projects List */}
        <main className="max-w-6xl mx-auto px-6 py-8">
          <div className="space-y-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`glass-card p-5 ${!project.isVisible ? "opacity-60" : ""}`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-[var(--text-muted)] cursor-grab">
                    <GripVertical size={20} />
                  </div>
                  
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-[var(--bg-tertiary)] flex-shrink-0">
                    {project.screenshots && project.screenshots.length > 0 ? (
                      <Image
                        src={project.screenshots[0]}
                        alt={project.title}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon size={24} className="text-[var(--text-muted)]" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-[var(--text-primary)]">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-1">
                      {project.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.techStack.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-xs bg-[var(--bg-tertiary)] text-[var(--text-muted)]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.screenshots.length > 0 && (
                        <span className="px-2 py-0.5 rounded text-xs bg-green-500/20 text-green-400">
                          {project.screenshots.length} image{project.screenshots.length > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => toggleVisibility(project)}
                      className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title={project.isVisible ? "Hide" : "Show"}
                    >
                      {project.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                    </motion.button>
                    <motion.button
                      onClick={() => openModal(project)}
                      className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan-dim)] transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Pencil size={18} />
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}

            {projects.length === 0 && (
              <div className="text-center py-12 text-[var(--text-muted)]">
                No projects yet. Click &quot;Add Project&quot; to create one.
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between p-6 glass border-b border-[var(--glass-border)]">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">
                  {editingProject ? "Edit Project" : "Add Project"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="input-field"
                    placeholder="Project title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Short Description
                  </label>
                  <input
                    type="text"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    required
                    className="input-field"
                    placeholder="Brief description for card preview"
                  />
                </div>

                {/* Screenshots Upload */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Screenshots
                  </label>
                  
                  {/* Preview Grid */}
                  {formData.screenshots.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      {formData.screenshots.map((url, index) => (
                        <div key={index} className="relative group aspect-video rounded-lg overflow-hidden bg-[var(--bg-tertiary)]">
                          <Image
                            src={url}
                            alt={`Screenshot ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeScreenshot(index)}
                            className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={14} />
                          </button>
                          {index === 0 && (
                            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-xs bg-[var(--accent-cyan)] text-white">
                              Cover
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload Button */}
                  <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-[var(--glass-border)] rounded-xl cursor-pointer hover:border-[var(--accent-cyan)]/50 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                    {isUploading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[var(--accent-cyan)]/30 border-t-[var(--accent-cyan)] rounded-full animate-spin" />
                        <span className="text-sm text-[var(--text-muted)]">Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload size={20} className="text-[var(--text-muted)]" />
                        <span className="text-sm text-[var(--text-muted)]">Click to upload images</span>
                      </>
                    )}
                  </label>
                  <p className="text-xs text-[var(--text-muted)] mt-2">
                    First image will be used as cover. Max 5MB per file.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Overview
                  </label>
                  <textarea
                    value={formData.overview}
                    onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                    required
                    rows={3}
                    className="input-field resize-none"
                    placeholder="Detailed project overview"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    My Role
                  </label>
                  <textarea
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                    rows={2}
                    className="input-field resize-none"
                    placeholder="Your role and responsibilities"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Features (one per line)
                  </label>
                  <textarea
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Feature 1
Feature 2
Feature 3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Tech Stack (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    className="input-field"
                    placeholder="React, Node.js, PostgreSQL"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      className="input-field"
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      Live URL
                    </label>
                    <input
                      type="url"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                      className="input-field"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2">
                    <Save size={18} />
                    {editingProject ? "Save Changes" : "Create Project"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
