"use client";

import { useState, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail, Github, Linkedin, Phone, Send, CheckCircle, AlertCircle, Sparkles, ArrowRight, Copy, Check } from "lucide-react";
import emailjs from "@emailjs/browser";

interface ContactProps {
  settings?: {
    email?: string;
    github?: string;
    linkedin?: string;
    whatsapp?: string;
  };
}

// 3D Card Component
function Card3D({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Contact({ settings }: ContactProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeContact, setActiveContact] = useState<number | null>(null);

  const defaultSettings = {
    email: "gilanghappy123@gmail.com",
    github: "GilangHap",
    linkedin: "https://www.linkedin.com/in/gilanghappy/",
    whatsapp: "082328380837",
  };

  const data = settings || defaultSettings;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        {
          from_name: formState.name,
          from_email: formState.email,
          message: formState.message,
          to_name: "Gilang",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
      );

      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(data.email || "");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  function formatPhoneNumber(phone?: string) {
    if (!phone) return "";
    const cleaned = phone.startsWith("0") ? phone.slice(1) : phone;
    return `+62 ${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
  }

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: data.email,
      href: `mailto:${data.email}`,
      gradient: "from-cyan-500 to-blue-500",
      bgGlow: "bg-cyan-500/20",
    },
    {
      icon: Github,
      label: "GitHub",
      value: `@${data.github}`,
      href: `https://github.com/${data.github}`,
      gradient: "from-purple-500 to-pink-500",
      bgGlow: "bg-purple-500/20",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Let's Connect",
      href: data.linkedin,
      gradient: "from-blue-500 to-cyan-500",
      bgGlow: "bg-blue-500/20",
    },
    {
      icon: Phone,
      label: "WhatsApp",
      value: formatPhoneNumber(data.whatsapp),
      href: `https://wa.me/62${data.whatsapp?.slice(1)}`,
      gradient: "from-green-500 to-emerald-500",
      bgGlow: "bg-green-500/20",
    },
  ];

  return (
    <section id="contact" className="section relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[var(--accent-cyan)]/5 blur-3xl"
          animate={{ y: [0, 50, 0], x: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[var(--accent-purple)]/5 blur-3xl"
          animate={{ y: [0, -50, 0], x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/20 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Sparkles size={16} className="text-[var(--accent-cyan)]" />
            <span className="text-sm text-[var(--accent-cyan)]">Let&apos;s work together</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-[var(--text-primary)]">Get In </span>
            <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-lg">
            Have a project in mind? Let&apos;s create something extraordinary together.
          </p>
        </motion.div>

        {/* Main Content - Terminal-like Design */}
        <div className="max-w-6xl mx-auto">
          {/* Quick Email Copy - Featured */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <Card3D>
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)] border border-[var(--glass-border)] overflow-hidden">
                {/* Decorative */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--accent-cyan)]/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <p className="text-[var(--text-muted)] text-sm mb-2">Quickest way to reach me</p>
                    <p className="text-2xl md:text-3xl font-mono font-bold text-[var(--text-primary)]">
                      {data.email}
                    </p>
                  </div>
                  <motion.button
                    onClick={copyEmail}
                    className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] text-white font-semibold shadow-lg shadow-[var(--accent-cyan)]/20"
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(34, 211, 238, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {copiedEmail ? (
                      <>
                        <Check size={20} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={20} />
                        Copy Email
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </Card3D>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Cards - Left Side */}
            <div className="lg:col-span-2 space-y-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href || "#"}
                  target={method.href?.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  onMouseEnter={() => setActiveContact(index)}
                  onMouseLeave={() => setActiveContact(null)}
                  className="block relative"
                >
                  <motion.div
                    className={`relative p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--glass-border)] overflow-hidden transition-all duration-300 ${
                      activeContact === index ? "border-transparent" : ""
                    }`}
                    whileHover={{ x: 10 }}
                  >
                    {/* Animated Border Gradient */}
                    {activeContact === index && (
                      <motion.div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${method.gradient} opacity-20`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                      />
                    )}
                    
                    <div className="relative flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${method.bgGlow} flex items-center justify-center`}>
                        <method.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[var(--text-muted)]">{method.label}</p>
                        <p className="text-[var(--text-primary)] font-medium truncate">{method.value}</p>
                      </div>
                      <motion.div
                        animate={{ x: activeContact === index ? 5 : 0 }}
                        className="text-[var(--text-muted)]"
                      >
                        <ArrowRight size={20} />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.a>
              ))}

              {/* Availability Status */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8 }}
                className="p-5 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
              >
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                  </span>
                  <div>
                    <p className="text-green-400 font-medium">Currently Available</p>
                    <p className="text-[var(--text-muted)] text-sm">Response within 24 hours</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="lg:col-span-3"
            >
              <Card3D className="h-full">
                <div className="h-full p-8 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--glass-border)] relative overflow-hidden">
                  {/* Terminal Header */}
                  <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[var(--glass-border)]">
                    <div className="flex gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-[var(--text-muted)] text-sm font-mono ml-4">send_message.sh</span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                          <span className="text-[var(--accent-cyan)]">$</span> name
                        </label>
                        <input
                          type="text"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--glass-border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-cyan)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)]/20 transition-all font-mono"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                          <span className="text-[var(--accent-cyan)]">$</span> email
                        </label>
                        <input
                          type="email"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--glass-border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-cyan)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)]/20 transition-all font-mono"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                        <span className="text-[var(--accent-cyan)]">$</span> message
                      </label>
                      <textarea
                        rows={5}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--glass-border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-cyan)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)]/20 transition-all resize-none font-mono"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all ${
                        status === "success"
                          ? "bg-green-500 text-white"
                          : status === "error"
                          ? "bg-red-500 text-white"
                          : "bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] text-white shadow-lg shadow-[var(--accent-cyan)]/20"
                      }`}
                      whileHover={status === "idle" ? { scale: 1.02, boxShadow: "0 20px 40px -10px rgba(34, 211, 238, 0.3)" } : {}}
                      whileTap={status === "idle" ? { scale: 0.98 } : {}}
                    >
                      {status === "sending" ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Sending...
                        </>
                      ) : status === "success" ? (
                        <>
                          <CheckCircle size={20} />
                          Message Sent Successfully!
                        </>
                      ) : status === "error" ? (
                        <>
                          <AlertCircle size={20} />
                          Failed to Send - Try Again
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>

                  {/* Decorative Code Lines */}
                  <div className="absolute bottom-4 right-4 text-[var(--text-muted)]/20 font-mono text-xs hidden md:block">
                    <div>{'// Ready to collaborate'}</div>
                    <div>{'// Let\'s build something amazing'}</div>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
