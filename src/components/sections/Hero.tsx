"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, Briefcase } from "lucide-react";

interface HeroProps {
  settings?: {
    heroTitle?: string;
    heroSubtitle?: string;
    heroDescription?: string;
  };
}

export default function Hero({ settings }: HeroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const title = settings?.heroTitle || "Gilang Happy Dwinugroho";
  const subtitle =
    settings?.heroSubtitle ||
    "Informatics Undergraduate • Web Developer • System Builder";
  const description =
    settings?.heroDescription ||
    "I build scalable web systems with clean architecture, modern UI, and security-aware implementation.";

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-bg" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-primary)]/50 to-[var(--bg-primary)]" />

      {/* Floating Orbs */}
      {mounted && (
        <>
          <motion.div
            className="absolute w-72 h-72 rounded-full bg-[var(--accent-cyan)]/10 blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ top: "20%", right: "15%" }}
          />
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-[var(--accent-purple)]/10 blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ bottom: "10%", left: "10%" }}
          />
        </>
      )}

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-[var(--text-secondary)]">
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="text-[var(--text-primary)]">Hi, I&apos;m </span>
          <span className="gradient-text text-glow-cyan">{title.split(" ")[0]}</span>
        </motion.h1>

        {/* Role */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-[var(--accent-cyan)] font-medium mb-4"
        >
          {subtitle}
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => scrollToSection("#projects")}
            className="btn-primary flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Briefcase size={18} />
            View Projects
          </motion.button>
          <motion.a
            href="/cv.pdf"
            download
            className="btn-secondary flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={18} />
            Download CV
          </motion.a>
          <motion.button
            onClick={() => scrollToSection("#contact")}
            className="btn-secondary flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={18} />
            Contact Me
          </motion.button>
        </motion.div>

        {/* Tech Stack Badges */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-wrap items-center justify-center gap-3"
        >
          {["Next.js", "Laravel", "React", "TypeScript", "PostgreSQL"].map(
            (tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--glass-border)]"
              >
                {tech}
              </motion.span>
            )
          )}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.button
          onClick={() => scrollToSection("#about")}
          className="flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown size={20} />
        </motion.button>
      </motion.div>
    </section>
  );
}
