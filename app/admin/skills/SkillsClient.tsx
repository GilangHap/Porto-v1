"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Plus, Pencil, Trash2, X, Save } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  category: string;
  description: string | null;
  icon: string | null;
  order: number;
  isVisible: boolean;
}

interface SkillsClientProps {
  skills: Skill[];
}

const categories = ["Frontend", "Backend", "Database", "System & Tools"];

export default function SkillsClient({ skills: initialSkills }: SkillsClientProps) {
  const router = useRouter();
  const [skills] = useState(initialSkills);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Frontend",
    description: "",
    icon: "",
  });

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const openModal = (skill?: Skill) => {
    if (skill) {
      setEditingSkill(skill);
      setFormData({
        name: skill.name,
        category: skill.category,
        description: skill.description || "",
        icon: skill.icon || "",
      });
    } else {
      setEditingSkill(null);
      setFormData({ name: "", category: "Frontend", description: "", icon: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingSkill ? `/api/skills/${editingSkill.id}` : "/api/skills";
    const method = editingSkill ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setIsModalOpen(false);
      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  };

  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 bg-[var(--bg-primary)]" />
      <div className="fixed inset-0 grid-bg opacity-30" />

      <div className="relative z-10">
        <header className="glass border-b border-[var(--glass-border)]">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/admin" className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors">
                  <ArrowLeft size={20} />
                </Link>
                <h1 className="text-xl font-bold text-[var(--text-primary)]">Manage Skills</h1>
              </div>
              <motion.button onClick={() => openModal()} className="btn-primary flex items-center gap-2" whileHover={{ scale: 1.02 }}>
                <Plus size={18} /> Add Skill
              </motion.button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <div key={category} className="glass-card p-6">
                <h2 className="text-lg font-semibold text-[var(--accent-cyan)] mb-4">{category}</h2>
                <div className="space-y-3">
                  {(groupedSkills[category] || []).map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-tertiary)]">
                      <div>
                        <p className="font-medium text-[var(--text-primary)]">{skill.name}</p>
                        {skill.description && <p className="text-sm text-[var(--text-muted)]">{skill.description}</p>}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => openModal(skill)} className="p-2 text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDelete(skill.id)} className="p-2 text-[var(--text-secondary)] hover:text-red-400">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {(!groupedSkills[category] || groupedSkills[category].length === 0) && (
                    <p className="text-[var(--text-muted)] text-sm">No skills in this category</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" onClick={() => setIsModalOpen(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="glass-card w-full max-w-md">
              <div className="flex items-center justify-between p-6 border-b border-[var(--glass-border)]">
                <h2 className="text-xl font-bold">{editingSkill ? "Edit Skill" : "Add Skill"}</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2"><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="input-field" placeholder="Skill name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="input-field">
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <input type="text" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="input-field" placeholder="Brief description" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Icon (Lucide icon name)</label>
                  <input type="text" value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} className="input-field" placeholder="e.g., Code, Database, Globe" />
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary flex-1">Cancel</button>
                  <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2"><Save size={18} /> Save</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
