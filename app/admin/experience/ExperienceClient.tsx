"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Plus, Pencil, Trash2, X, Save, Calendar } from "lucide-react";

interface Experience {
  id: string;
  title: string;
  company: string;
  description: string;
  startDate: Date;
  endDate: Date | null;
  isCurrent: boolean;
  order: number;
}

interface ExperienceClientProps {
  experiences: Experience[];
}

export default function ExperienceClient({ experiences: initialExp }: ExperienceClientProps) {
  const router = useRouter();
  const [experiences] = useState(initialExp);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [formData, setFormData] = useState({
    title: "", company: "", description: "", startDate: "", endDate: "", isCurrent: false,
  });

  const openModal = (exp?: Experience) => {
    if (exp) {
      setEditing(exp);
      setFormData({
        title: exp.title, company: exp.company, description: exp.description,
        startDate: new Date(exp.startDate).toISOString().split("T")[0],
        endDate: exp.endDate ? new Date(exp.endDate).toISOString().split("T")[0] : "",
        isCurrent: exp.isCurrent,
      });
    } else {
      setEditing(null);
      setFormData({ title: "", company: "", description: "", startDate: "", endDate: "", isCurrent: false });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editing ? `/api/experience/${editing.id}` : "/api/experience";
    const res = await fetch(url, {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) { setIsModalOpen(false); router.refresh(); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this experience?")) return;
    await fetch(`/api/experience/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 bg-[var(--bg-primary)]" />
      <div className="fixed inset-0 grid-bg opacity-30" />
      <div className="relative z-10">
        <header className="glass border-b border-[var(--glass-border)]">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]"><ArrowLeft size={20} /></Link>
              <h1 className="text-xl font-bold">Manage Experience</h1>
            </div>
            <motion.button onClick={() => openModal()} className="btn-primary flex items-center gap-2" whileHover={{ scale: 1.02 }}><Plus size={18} /> Add</motion.button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-8 space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="glass-card p-5 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">{exp.title}</h3>
                <p className="text-sm text-[var(--accent-cyan)]">{exp.company}</p>
                <p className="text-xs text-[var(--text-muted)] flex items-center gap-1 mt-1">
                  <Calendar size={12} />
                  {new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} — {exp.isCurrent ? "Present" : exp.endDate ? new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : ""}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openModal(exp)} className="p-2 text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]"><Pencil size={16} /></button>
                <button onClick={() => handleDelete(exp.id)} className="p-2 text-[var(--text-secondary)] hover:text-red-400"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </main>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" onClick={() => setIsModalOpen(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="glass-card w-full max-w-md">
              <div className="flex items-center justify-between p-6 border-b border-[var(--glass-border)]">
                <h2 className="text-xl font-bold">{editing ? "Edit" : "Add"} Experience</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2"><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div><label className="block text-sm font-medium mb-2">Title</label><input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="input-field" /></div>
                <div><label className="block text-sm font-medium mb-2">Company</label><input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} required className="input-field" /></div>
                <div><label className="block text-sm font-medium mb-2">Description</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} required className="input-field resize-none" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium mb-2">Start Date</label><input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} required className="input-field" /></div>
                  <div><label className="block text-sm font-medium mb-2">End Date</label><input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} disabled={formData.isCurrent} className="input-field disabled:opacity-50" /></div>
                </div>
                <label className="flex items-center gap-2"><input type="checkbox" checked={formData.isCurrent} onChange={(e) => setFormData({ ...formData, isCurrent: e.target.checked, endDate: "" })} className="rounded" /><span className="text-sm">Currently working here</span></label>
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
