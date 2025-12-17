"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, Briefcase, Github, Linkedin, Sparkles } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  settings?: {
    heroTitle?: string;
    heroSubtitle?: string;
    heroDescription?: string;
    github?: string;
    linkedin?: string;
  };
}

// Typing animation component with delete and loop
function TypeWriter({ texts, delay = 0 }: { texts: string[]; delay?: number }) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    
    const currentText = texts[textIndex];
    const speed = isDeleting ? 30 : 50;
    const pauseTime = isDeleting ? 500 : 2000;

    if (!isDeleting && currentIndex === currentText.length) {
      // Finished typing, wait then start deleting
      const timer = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(timer);
    }

    if (isDeleting && currentIndex === 0) {
      // Finished deleting, move to next text
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timer = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(currentText.slice(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      } else {
        setDisplayText(currentText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentIndex, textIndex, isDeleting, texts, started]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-[3px] h-[1em] bg-[var(--accent-cyan)] ml-1 align-middle"
      />
    </span>
  );
}

// Floating particles component
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[var(--accent-cyan)]/30"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          }}
          animate={{
            y: [null, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero({ settings }: HeroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const title = settings?.heroTitle || "Gilang Happy Dwinugroho";
  const subtitle = settings?.heroSubtitle || "Full-stack Web Developer";
  const description =
    settings?.heroDescription ||
    "I build scalable web systems with clean architecture, modern UI, and security-aware implementation.";

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.5,
      },
    }),
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-24"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-bg" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-primary)]/50 to-[var(--bg-primary)]" />

      {/* Floating Particles */}
      {mounted && <FloatingParticles />}

      {/* Animated Lines */}
      {mounted && (
        <>
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-cyan)]/20 to-transparent"
            style={{ top: "30%" }}
            animate={{ x: [-1000, 1000] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-purple)]/20 to-transparent"
            style={{ top: "70%" }}
            animate={{ x: [1000, -1000] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        </>
      )}

      {/* Floating Orbs */}
      {mounted && (
        <>
          <motion.div
            className="absolute w-72 h-72 rounded-full bg-[var(--accent-cyan)]/10 blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
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
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ bottom: "10%", left: "10%" }}
          />
          <motion.div
            className="absolute w-48 h-48 rounded-full bg-[var(--accent-cyan)]/5 blur-3xl"
            animate={{
              x: [0, 20, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ top: "50%", left: "30%" }}
          />
        </>
      )}

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Greeting Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-green-500"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm text-[var(--text-secondary)]">
                Available for opportunities
              </span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={14} className="text-[var(--accent-cyan)]" />
              </motion.div>
            </motion.div>

            {/* Name */}
            <motion.p
              variants={itemVariants}
              className="text-[var(--text-secondary)] text-xl font-medium mb-3"
            >
              I am{" "}
              <motion.span
                className="text-[var(--accent-cyan)]"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {title.split(" ")[0]}
              </motion.span>
            </motion.p>

            {/* Title with letter animation */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight overflow-hidden"
            >
              {subtitle.split("").map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className={char === " " ? "inline" : "inline-block gradient-text"}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Description with typing effect */}
            <motion.p
              variants={itemVariants}
              className="text-[var(--text-secondary)] text-lg max-w-lg mb-8 leading-relaxed"
            >
              <TypeWriter 
                texts={[
                  description,
                  "Creating beautiful, responsive, and user-friendly web applications.",
                  "Turning ideas into scalable digital solutions.",
                  "Passionate about clean code and great user experience.",
                ]} 
                delay={1500} 
              />
            </motion.p>

            {/* CTA Buttons with staggered animation */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <motion.button
                onClick={() => scrollToSection("#projects")}
                className="btn-primary flex items-center gap-2 relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <Briefcase size={18} />
                View Projects
              </motion.button>
              <motion.a
                href="/cv.pdf"
                download
                className="btn-secondary flex items-center gap-2 relative overflow-hidden"
                whileHover={{ scale: 1.05, borderColor: "var(--accent-cyan)" }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Download size={18} />
                </motion.div>
                Download CV
              </motion.a>
            </motion.div>

            {/* Social Links with hover animations */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              {settings?.github && (
                <motion.a
                  href={`https://github.com/${settings.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]/50 transition-all"
                  whileHover={{ y: -5, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github size={20} />
                </motion.a>
              )}
              {settings?.linkedin && (
                <motion.a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]/50 transition-all"
                  whileHover={{ y: -5, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin size={20} />
                </motion.a>
              )}
              <motion.button
                onClick={() => scrollToSection("#contact")}
                className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]/50 transition-all"
                whileHover={{ y: -5, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail size={20} />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right - Photo Card */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotate: 10 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 50 }}
            className="relative hidden lg:flex justify-center"
          >
            <motion.div
              className="relative"
              style={{ transform: "rotate(3deg)" }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Animated Glow Effect */}
              <motion.div
                className="absolute -inset-2 rounded-2xl blur-lg"
                style={{
                  background: "linear-gradient(45deg, var(--accent-cyan), var(--accent-purple), var(--accent-cyan))",
                  backgroundSize: "200% 200%",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Photo Card */}
              <motion.div
                className="relative rounded-2xl overflow-hidden bg-[var(--bg-primary)] p-1"
                whileHover={{ scale: 1.05, rotate: -1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Inner Border Glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: "linear-gradient(45deg, var(--accent-cyan), transparent, var(--accent-purple))",
                  }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Image Container */}
                <div className="relative w-64 xl:w-72 aspect-square rounded-xl overflow-hidden">
                  <Image
                    src="/profile.png"
                    alt="Profile Photo" 
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  {/* Animated Gradient Overlay */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent, transparent)",
                    }}
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-10 h-10 rounded-lg bg-[var(--accent-cyan)]/20 border border-[var(--accent-cyan)]/40"
                animate={{ 
                  rotate: [0, 180, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-[var(--accent-purple)]/40 border border-[var(--accent-purple)]/50"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute top-1/2 -right-6 w-4 h-4 rounded-full bg-[var(--accent-cyan)]/30"
                animate={{ 
                  y: [-20, 20, -20],
                  x: [-5, 5, -5],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <motion.button
          onClick={() => scrollToSection("#about")}
          className="flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-colors"
        >
          <motion.span
            className="text-xs uppercase tracking-widest"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll
          </motion.span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={20} />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
}
