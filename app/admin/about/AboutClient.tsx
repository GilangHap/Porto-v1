"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Save, CheckCircle } from "lucide-react";

interface About {
  id: string;
  summary: string;
  education: string;
  focusAreas: string[];
  internship: string;
}

interface AboutClientProps {
  about: About | null;
}

export default function AboutClient({ about }: AboutClientProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    summary: about?.summary || "",
    education: about?.education || "",
    focusAreas: about?.focusAreas?.join("\n") || "",
    internship: about?.internship || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const res = await fetch("/api/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        focusAreas: formData.focusAreas.split("\n").filter(Boolean),
      }),
    });

    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      router.refresh();
    }
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 bg-[var(--bg-primary)]" />
      <div className="fixed inset-0 grid-bg opacity-30" />

      <div className="relative z-10">
        <header className="glass border-b border-[var(--glass-border)]">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]"><ArrowLeft size={20} /></Link>
              <h1 className="text-xl font-bold">Edit About Section</h1>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="glass-card p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Professional Summary</label>
                <textarea value={formData.summary} onChange={(e) => setFormData({ ...formData, summary: e.target.value })} rows={4} className="input-field resize-none" placeholder="A brief description about yourself..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Education</label>
                <input type="text" value={formData.education} onChange={(e) => setFormData({ ...formData, education: e.target.value })} className="input-field" placeholder="Informatics – Universitas Jenderal Soedirman" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Focus Areas (one per line)</label>
                <textarea value={formData.focusAreas} onChange={(e) => setFormData({ ...formData, focusAreas: e.target.value })} rows={5} className="input-field resize-none" placeholder="Web Development
Backend Architecture
Database Design" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Internship Experience</label>
                <textarea value={formData.internship} onChange={(e) => setFormData({ ...formData, internship: e.target.value })} rows={3} className="input-field resize-none" placeholder="Describe your internship experience..." />
              </div>
            </div>

            <motion.button type="submit" disabled={isSaving} className="btn-primary flex items-center gap-2" whileHover={{ scale: 1.02 }}>
              {isSaving ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</> : saved ? <><CheckCircle size={18} /> Saved!</> : <><Save size={18} /> Save Changes</>}
            </motion.button>
          </form>
        </main>
      </div>
    </div>
  );
}
