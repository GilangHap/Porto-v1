"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { GraduationCap, Building2, Target, Code2, Rocket, Coffee, MapPin, Calendar } from "lucide-react";

interface AboutProps {
  about?: {
    summary?: string;
    education?: string;
    focusAreas?: string[];
    internship?: string;
  };
}

// Animated Counter Component
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.round(easeOut * value));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  );
}

// 3D Tilt Card
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About({ about }: AboutProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const defaultAbout = {
    summary:
      "I am a dedicated Informatics undergraduate with a passion for building robust, scalable web applications. My approach combines clean architecture principles with modern development practices, ensuring systems that are maintainable, secure, and performant.",
    education: "Informatics – Universitas Jenderal Soedirman",
    focusAreas: [
      "Full-stack Web Development",
      "Backend Architecture & API Design",
      "Database Design & Optimization",
      "Real-time Systems & WebSocket",
      "Authentication & Security",
    ],
    internship:
      "Completed industrial internship at PT Dirgantara Indonesia, gaining hands-on experience in enterprise-level system development.",
  };

  const data = about || defaultAbout;

  const stats = [
    { value: 3, suffix: "+", label: "Years Coding" },
    { value: 40, suffix: "+", label: "Projects Built" },
    { value: 20, suffix: "+", label: "Technologies" },
    { value: 1000, suffix: "+", label: "Cups of Coffee" },
  ];

  return (
    <section id="about" className="section relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <motion.div
          className="absolute top-1/3 -left-32 w-64 h-64 rounded-full bg-[var(--accent-cyan)]/10 blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 -right-32 w-80 h-80 rounded-full bg-[var(--accent-purple)]/10 blur-3xl"
          animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className="w-3 h-3 rounded-full bg-[var(--accent-cyan)]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-mono text-[var(--accent-cyan)] tracking-widest">ABOUT_ME</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-[var(--text-primary)]">Get to know </span>
            <span className="gradient-text">me better</span>
          </h2>
        </motion.div>

        {/* Main Content - Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bio Card - Large */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="md:col-span-7"
          >
            <TiltCard className="h-full">
              <div className="h-full p-8 rounded-3xl bg-[var(--bg-secondary)]/80 border border-[var(--glass-border)] backdrop-blur-sm hover:border-[var(--accent-cyan)]/40 transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-purple)] flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">Who I Am</h3>
                    <p className="text-sm text-[var(--text-muted)]">Developer & Problem Solver</p>
                  </div>
                </div>
                <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
                  {data.summary}
                </p>
                
                {/* Quick Info Tags */}
                <div className="flex flex-wrap gap-3 mt-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] text-sm">
                    <MapPin size={14} />
                    Indonesia
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-purple)]/10 text-[var(--accent-purple)] text-sm">
                    <Calendar size={14} />
                    Final Year Student
                  </span>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="md:col-span-5"
          >
            <TiltCard className="h-full">
              <div className="h-full p-6 rounded-3xl bg-gradient-to-br from-[var(--accent-purple)]/20 to-transparent border border-[var(--accent-purple)]/20 backdrop-blur-sm hover:border-[var(--accent-purple)]/40 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-purple)]/20 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-[var(--accent-purple)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">Education</h3>
                </div>
                <p className="text-[var(--accent-cyan)] font-semibold text-lg mb-2">
                  Universitas Jenderal Soedirman
                </p>
                <p className="text-[var(--text-secondary)]">
                  Bachelor of Informatics
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <motion.span
                    className="w-2 h-2 rounded-full bg-green-400"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-sm text-green-400">Currently Studying</span>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="md:col-span-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 rounded-2xl bg-[var(--bg-secondary)]/60 border border-[var(--glass-border)] backdrop-blur-sm text-center hover:border-[var(--accent-cyan)]/40 transition-all cursor-default"
                >
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="md:col-span-5"
          >
            <TiltCard className="h-full">
              <div className="h-full p-6 rounded-3xl bg-gradient-to-br from-[var(--accent-cyan)]/20 to-transparent border border-[var(--accent-cyan)]/20 backdrop-blur-sm hover:border-[var(--accent-cyan)]/40 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-cyan)]/20 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-[var(--accent-cyan)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">Industry Experience</h3>
                </div>
                <p className="text-[var(--accent-purple)] font-semibold mb-2">
                  PT Dirgantara Indonesia
                </p>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {data.internship}
                </p>
              </div>
            </TiltCard>
          </motion.div>

          {/* Focus Areas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="md:col-span-7"
          >
            <div className="h-full p-6 rounded-3xl bg-[var(--bg-secondary)]/60 border border-[var(--glass-border)] backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-cyan)]/20 to-[var(--accent-purple)]/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-[var(--accent-cyan)]" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">What I Do</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {data.focusAreas?.map((area, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2.5 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-sm font-medium border border-[var(--glass-border)] hover:border-[var(--accent-cyan)]/40 hover:text-[var(--accent-cyan)] transition-all cursor-default"
                  >
                    {area}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Fun Fact Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="md:col-span-12"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-6 rounded-3xl bg-gradient-to-r from-[var(--accent-cyan)]/10 via-[var(--accent-purple)]/10 to-[var(--accent-cyan)]/10 border border-[var(--glass-border)] flex items-center gap-6 flex-wrap md:flex-nowrap"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-purple)] flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[var(--text-primary)]">Currently Building</h4>
                  <p className="text-[var(--text-secondary)]">
                    Exploring AI integration, real-time systems, and crafting premium user experiences
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-muted)] ml-auto">
                <Coffee size={18} />
                <span className="text-sm">Fueled by coffee & curiosity</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
