"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, Linkedin, Phone, Send, CheckCircle, AlertCircle } from "lucide-react";

interface ContactProps {
  settings?: {
    email?: string;
    github?: string;
    linkedin?: string;
    whatsapp?: string;
  };
}

export default function Contact({ settings }: ContactProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

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

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: data.email,
      href: `mailto:${data.email}`,
      color: "cyan",
    },
    {
      icon: Github,
      label: "GitHub",
      value: `@${data.github}`,
      href: `https://github.com/${data.github}`,
      color: "purple",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Connect with me",
      href: data.linkedin,
      color: "cyan",
    },
    {
      icon: Phone,
      label: "WhatsApp",
      value: formatPhoneNumber(data.whatsapp),
      href: `https://wa.me/62${data.whatsapp?.slice(1)}`,
      color: "green",
    },
  ];

  function formatPhoneNumber(phone?: string) {
    if (!phone) return "";
    // Format: 082328380837 -> +62 823-2838-0837
    const cleaned = phone.startsWith("0") ? phone.slice(1) : phone;
    return `+62 ${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
  }

  return (
    <section id="contact" className="section relative">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="section-title gradient-text mx-auto">Get In Touch</h2>
          <p className="text-[var(--text-secondary)] mt-6 max-w-2xl mx-auto">
            Open for internship opportunities, collaboration, and freelance projects.
            Let&apos;s build something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
              Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href || "#"}
                  target={method.href?.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="glass-card p-5 flex items-start gap-4 hover:border-[var(--accent-cyan)]/50 transition-all group"
                >
                  <div className={`p-3 rounded-xl ${
                    method.color === "cyan" 
                      ? "bg-[var(--accent-cyan-dim)]" 
                      : method.color === "purple"
                      ? "bg-[var(--accent-purple-dim)]"
                      : "bg-green-500/10"
                  }`}>
                    <method.icon className={`w-5 h-5 ${
                      method.color === "cyan"
                        ? "text-[var(--accent-cyan)]"
                        : method.color === "purple"
                        ? "text-[var(--accent-purple)]"
                        : "text-green-400"
                    }`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-[var(--text-muted)]">{method.label}</p>
                    <p className="text-[var(--text-primary)] font-medium group-hover:text-[var(--accent-cyan)] transition-colors truncate text-sm">
                      {method.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Availability Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="glass-card p-5 border-[var(--accent-cyan)]/30"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-400 font-medium text-sm">Currently Available</span>
                </span>
              </div>
              <p className="text-[var(--text-secondary)] text-sm mt-2">
                Response time: Usually within 24 hours
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                  className="input-field"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  required
                  className="input-field"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  required
                  className="input-field resize-none"
                  placeholder="Your message..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
                whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
              >
                {status === "sending" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle size={18} />
                    Message Sent!
                  </>
                ) : status === "error" ? (
                  <>
                    <AlertCircle size={18} />
                    Failed to Send
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
