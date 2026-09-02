"use client";

import { motion } from "framer-motion";
import { MessageSquare, Sparkles, Download } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Describe Your Brand",
    description:
      "Answer guided questions, paste a website URL, or upload your logo. Combine any inputs for the best results.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "AI Generates Tokens",
    description:
      "Claude analyzes your input and creates a WCAG-aware token set with full color scales.",
  },
  {
    number: "03",
    icon: Download,
    title: "Export & Ship",
    description:
      "Download production-ready files in CSS, Tailwind v4, DTCG JSON, or flat JSON. Drop into your project.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p
            className="text-xs uppercase tracking-[0.2em] font-medium mb-3"
            style={{ color: "var(--muted-foreground)" }}
          >
            Three steps
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.02em]"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-heading)" }}
          >
            How It Works
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: i * 0.15,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative rounded-xl border p-8 group"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                borderRadius: "var(--radius-xl)",
              }}
            >
              {/* Step number */}
              <span
                className="text-6xl font-bold opacity-[0.07] absolute top-4 right-6 select-none"
                style={{ color: "var(--foreground)", fontFamily: "var(--font-heading)" }}
              >
                {step.number}
              </span>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                style={{
                  backgroundColor: "var(--accent)",
                  borderRadius: "var(--radius)",
                }}
              >
                <step.icon
                  className="w-5 h-5"
                  style={{ color: "var(--accent-foreground)" }}
                />
              </div>

              {/* Content */}
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--foreground)", fontFamily: "var(--font-heading)" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--muted-foreground)" }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
