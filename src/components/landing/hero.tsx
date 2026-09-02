"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Pause } from "lucide-react";
import { useThemeTokens } from "@/providers/theme-token-provider";
import { cn } from "@/lib/utils";

function MiniShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mt-16 w-full max-w-3xl mx-auto"
    >
      <p
        className="text-xs uppercase tracking-[0.2em] font-medium mb-4 text-center"
        style={{ color: "var(--muted-foreground)" }}
      >
        Live preview — changes with every theme
      </p>
      <div
        className="rounded-xl border p-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        {/* Card 1 */}
        <div
          className="rounded-lg p-4 space-y-2"
          style={{ backgroundColor: "var(--accent)" }}
        >
          <div
            className="w-8 h-8 rounded-md"
            style={{ backgroundColor: "var(--primary)" }}
          />
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--accent-foreground)", fontFamily: "var(--font-heading)" }}
          >
            Token System
          </p>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            Colors, typography, spacing, shadows
          </p>
        </div>

        {/* Card 2 */}
        <div
          className="rounded-lg p-4 space-y-2"
          style={{ backgroundColor: "var(--secondary)" }}
        >
          <div
            className="w-8 h-8 rounded-full"
            style={{ backgroundColor: "var(--primary)", opacity: 0.8 }}
          />
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--secondary-foreground)", fontFamily: "var(--font-heading)" }}
          >
            Components
          </p>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            Buttons, cards, inputs, badges
          </p>
        </div>

        {/* Card 3 */}
        <div
          className="rounded-lg p-4 space-y-2"
          style={{ backgroundColor: "var(--muted)" }}
        >
          <div
            className="w-8 h-1.5 rounded-full"
            style={{ backgroundColor: "var(--primary)" }}
          />
          <div
            className="w-12 h-1.5 rounded-full"
            style={{ backgroundColor: "var(--primary)", opacity: 0.5 }}
          />
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-heading)" }}
          >
            Export Ready
          </p>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            CSS, Tailwind, DTCG, JSON
          </p>
        </div>
      </div>

      {/* Mini buttons row */}
      <div className="flex items-center justify-center gap-3 mt-4">
        <span
          className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
            borderRadius: "var(--radius)",
          }}
        >
          Primary
        </span>
        <span
          className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium border"
          style={{
            backgroundColor: "var(--secondary)",
            color: "var(--secondary-foreground)",
            borderColor: "var(--border)",
            borderRadius: "var(--radius)",
          }}
        >
          Secondary
        </span>
        <span
          className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium"
          style={{
            backgroundColor: "var(--destructive)",
            color: "var(--destructive-foreground)",
            borderRadius: "var(--radius)",
          }}
        >
          Destructive
        </span>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const { presets, setPreset, activePresetId } = useThemeTokens();
  const [cycling, setCycling] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycling = useCallback(() => {
    let idx = presets.findIndex((p) => p.id === activePresetId);
    intervalRef.current = setInterval(() => {
      idx = (idx + 1) % presets.length;
      setPreset(presets[idx].id);
    }, 2000);
  }, [presets, activePresetId, setPreset]);

  const toggleCycling = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const idx = presets.findIndex((p) => p.id === activePresetId);
      setPreset(presets[(idx + 1) % presets.length].id);
      return;
    }
    if (cycling) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      setCycling(false);
    } else {
      setCycling(true);
      startCycling();
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Background grain */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Tagline chip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-[0.15em] border"
            style={{
              color: "var(--muted-foreground)",
              borderColor: "var(--border)",
              backgroundColor: "var(--card)",
            }}
          >
            AI design tokens · public beta
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.05]"
          style={{ color: "var(--foreground)", fontFamily: "var(--font-heading)" }}
        >
          Your Brand.
          <br />
          <span style={{ color: "var(--primary)" }}>Your Design System.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          AI generates complete, production-ready design tokens from your brand
          identity. Export to CSS, Tailwind, DTCG, and more.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/generator"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              borderRadius: "var(--radius)",
            }}
          >
            Generate Now
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            type="button"
            onClick={toggleCycling}
            className={cn(
              "inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold border transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            )}
            style={{
              borderColor: "var(--border)",
              color: "var(--foreground)",
              backgroundColor: "transparent",
              borderRadius: "var(--radius)",
            }}
          >
            {cycling ? (
              <>
                <Pause className="w-4 h-4" />
                Stop
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Watch It Change
              </>
            )}
          </button>
        </motion.div>
      </div>

      {/* Mini component showcase */}
      <MiniShowcase />
    </section>
  );
}
