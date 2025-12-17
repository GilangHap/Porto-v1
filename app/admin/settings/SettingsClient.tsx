"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Save, CheckCircle } from "lucide-react";

interface Settings {
  id: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  email: string;
  github: string;
  linkedin: string;
  whatsapp: string;
}

interface SettingsClientProps {
  settings: Settings | null;
}

export default function SettingsClient({ settings }: SettingsClientProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    heroTitle: settings?.heroTitle || "",
    heroSubtitle: settings?.heroSubtitle || "",
    heroDescription: settings?.heroDescription || "",
    email: settings?.email || "",
    github: settings?.github || "",
    linkedin: settings?.linkedin || "",
    whatsapp: settings?.whatsapp || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
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
        {/* Header */}
        <header className="glass border-b border-[var(--glass-border)]">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan-dim)] transition-colors"
              >
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-xl font-bold text-[var(--text-primary)]">
                Site Settings
              </h1>
            </div>
          </div>
        </header>

        {/* Form */}
        <main className="max-w-4xl mx-auto px-6 py-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Hero Section */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6">
                Hero Section
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Title (Your Name)
                  </label>
                  <input
                    type="text"
                    value={formData.heroTitle}
                    onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                    className="input-field"
                    placeholder="Gilang Happy Dwinugroho"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.heroSubtitle}
                    onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                    className="input-field"
                    placeholder="Web Developer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.heroDescription}
                    onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
                    rows={3}
                    className="input-field resize-none"
                    placeholder="A short description of what you do..."
                  />
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    GitHub Username
                  </label>
                  <input
                    type="text"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="input-field"
                    placeholder="GilangHap"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="input-field"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="input-field"
                    placeholder="082328380837"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isSaving}
              className="btn-primary flex items-center gap-2"
              whileHover={{ scale: isSaving ? 1 : 1.02 }}
              whileTap={{ scale: isSaving ? 1 : 0.98 }}
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : saved ? (
                <>
                  <CheckCircle size={18} />
                  Saved!
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Settings
                </>
              )}
            </motion.button>
          </form>
        </main>
      </div>
    </div>
  );
}
