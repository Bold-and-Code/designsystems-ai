"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="py-24 sm:py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto text-center rounded-2xl px-8 py-16 sm:px-16 sm:py-20 relative overflow-hidden"
        style={{
          backgroundColor: "var(--primary)",
          borderRadius: "var(--radius-xl)",
        }}
      >
        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15), transparent 60%)",
          }}
        />

        <div className="relative z-10">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.02em] mb-4"
            style={{
              color: "var(--primary-foreground)",
              fontFamily: "var(--font-heading)",
            }}
          >
            Ready to generate your
            <br />
            design system?
          </h2>

          <p
            className="text-base sm:text-lg mb-10 opacity-80"
            style={{ color: "var(--primary-foreground)" }}
          >
            From brand identity to production-ready tokens in minutes.
          </p>

          <Link
            href="/generator"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-sm font-semibold transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: "var(--primary-foreground)",
              color: "var(--primary)",
              borderRadius: "var(--radius)",
            }}
          >
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </Link>

          <p
            className="mt-4 text-xs opacity-60"
            style={{ color: "var(--primary-foreground)" }}
          >
            Public beta. No account required.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
