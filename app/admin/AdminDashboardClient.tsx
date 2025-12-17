"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  Code2,
  Briefcase,
  User,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";

const menuItems = [
  {
    title: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
    description: "Manage your portfolio projects",
  },
  {
    title: "Skills",
    href: "/admin/skills",
    icon: Code2,
    description: "Update technical skills",
  },
  {
    title: "Experience",
    href: "/admin/experience",
    icon: Briefcase,
    description: "Edit work experience timeline",
  },
  {
    title: "About",
    href: "/admin/about",
    icon: User,
    description: "Update about section",
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
    description: "Site settings & contact info",
  },
];

export default function AdminDashboardClient() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 bg-[var(--bg-primary)]" />
      <div className="fixed inset-0 grid-bg opacity-30" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="glass border-b border-[var(--glass-border)]">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[var(--accent-cyan-dim)]">
                  <LayoutDashboard className="w-6 h-6 text-[var(--accent-cyan)]" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[var(--text-primary)]">
                    Admin Dashboard
                  </h1>
                  <p className="text-sm text-[var(--text-muted)]">
                    Portfolio Content Management
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  target="_blank"
                  className="btn-secondary flex items-center gap-2 text-sm"
                >
                  <ExternalLink size={16} />
                  View Site
                </Link>
                <motion.button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut size={20} />
                </motion.button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-12">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
              Welcome back!
            </h2>
            <p className="text-[var(--text-secondary)]">
              Manage your portfolio content from here. Select an option below to get started.
            </p>
          </motion.div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={item.href}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="glass-card p-6 h-full cursor-pointer group hover:border-[var(--accent-cyan)]/50 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-[var(--accent-cyan-dim)] group-hover:bg-[var(--accent-cyan)]/20 transition-colors">
                        <item.icon className="w-6 h-6 text-[var(--accent-cyan)]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)] mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="glass-card p-4 text-center">
              <p className="text-2xl font-bold gradient-text">5</p>
              <p className="text-sm text-[var(--text-muted)]">Projects</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-2xl font-bold gradient-text">16</p>
              <p className="text-sm text-[var(--text-muted)]">Skills</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-2xl font-bold gradient-text">3</p>
              <p className="text-sm text-[var(--text-muted)]">Experiences</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-2xl font-bold gradient-text">4</p>
              <p className="text-sm text-[var(--text-muted)]">Categories</p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
