"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, Heart } from "lucide-react";
import Image from "next/image";

interface FooterProps {
  settings?: {
    email?: string;
    github?: string;
    linkedin?: string;
    whatsapp?: string;
  };
}

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[var(--bg-secondary)] border-t border-[var(--glass-border)]">
      {/* Accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-cyan)] to-transparent" />

      <div className="container mx-auto px-6" style={{ paddingTop: '3rem', paddingBottom: '1.5rem' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src="/g_logo.png"
                alt="Logo"
                width={48}
                height={48}
                className="w-12 h-12"
              />
            </motion.div>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              Building scalable web systems with clean architecture, modern UI,
              and security-aware implementation.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 pt-2">
              {settings?.github && (
                <motion.a
                  href={`https://github.com/${settings.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan-dim)] transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github size={18} />
                </motion.a>
              )}
              {settings?.linkedin && (
                <motion.a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan-dim)] transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin size={18} />
                </motion.a>
              )}
              {settings?.email && (
                <motion.a
                  href={`mailto:${settings.email}`}
                  className="p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan-dim)] transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Mail size={18} />
                </motion.a>
              )}
              {settings?.whatsapp && (
                <motion.a
                  href={`https://wa.me/${settings.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan-dim)] transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Phone size={18} />
                </motion.a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[var(--text-primary)]">
              Quick Links
            </h4>
            <nav className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
                  whileHover={{ x: 4 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[var(--text-primary)]">
              Get In Touch
            </h4>
            <div className="space-y-3">
              {settings?.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
                >
                  <Mail size={16} />
                  {settings.email}
                </a>
              )}
              {settings?.whatsapp && (
                <a
                  href={`https://wa.me/62${settings.whatsapp.slice(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
                >
                  <Phone size={16} />
                  +62 {settings.whatsapp.slice(1, 4)}-{settings.whatsapp.slice(4, 8)}-{settings.whatsapp.slice(8)}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-[var(--glass-border)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--text-muted)] flex items-center gap-1">
              © {currentYear} Gilang Happy Dwinugroho. Made with
              <Heart size={14} className="text-red-500" fill="currentColor" />
            </p>
            <p className="text-sm text-[var(--text-muted)]">
              Informatics • Universitas Jenderal Soedirman
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
