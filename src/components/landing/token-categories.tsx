"use client";

import { motion } from "framer-motion";
import {
  Palette,
  Type,
  Space,
  Circle,
  Layers,
  Paintbrush,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { useThemeTokens } from "@/providers/theme-token-provider";

const SHADES = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"] as const;

function ColorsPreview() {
  const { tokens } = useThemeTokens();
  return (
    <div className="space-y-2">
      <div className="flex gap-0.5">
        {SHADES.map((shade) => (
          <div
            key={shade}
            className="flex-1 aspect-square rounded-sm min-w-0"
            style={{ backgroundColor: tokens.colors.primary[shade] }}
          />
        ))}
      </div>
      <p className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>
        11 shades per scale, 8 scales total
      </p>
    </div>
  );
}

function TypographyPreview() {
  const { tokens } = useThemeTokens();
  const headingClean = tokens.typography.headingFamily.replace(/'/g, "").split(",")[0];
  const bodyClean = tokens.typography.bodyFamily.replace(/'/g, "").split(",")[0];
  return (
    <div className="space-y-1">
      <p
        className="text-3xl font-bold leading-none"
        style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
      >
        Aa
      </p>
      <p className="text-xs" style={{ fontFamily: "var(--font-body)", color: "var(--muted-foreground)" }}>
        The quick brown fox jumps over the lazy dog
      </p>
      <div className="flex gap-3 pt-1">
        <span
          className="text-[10px] px-1.5 py-0.5 rounded"
          style={{ backgroundColor: "var(--accent)", color: "var(--accent-foreground)" }}
        >
          {headingClean}
        </span>
        <span
          className="text-[10px] px-1.5 py-0.5 rounded"
          style={{ backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)" }}
        >
          {bodyClean}
        </span>
      </div>
    </div>
  );
}

function SpacingPreview() {
  const widths = [16, 32, 64, 96, 128];
  const labels = ["4", "8", "16", "24", "32"];
  return (
    <div className="space-y-1.5">
      {widths.map((w, i) => (
        <div key={w} className="flex items-center gap-2">
          <div
            className="h-2 rounded-sm shrink-0"
            style={{
              width: `${w}px`,
              backgroundColor: "var(--primary)",
              opacity: 1 - i * 0.15,
            }}
          />
          <span className="text-[10px] tabular-nums" style={{ color: "var(--muted-foreground)" }}>
            {labels[i]}px
          </span>
        </div>
      ))}
    </div>
  );
}

function RadiusPreview() {
  return (
    <div className="flex gap-3 items-end">
      {[
        { label: "sm", css: "var(--radius-sm)" },
        { label: "md", css: "var(--radius)" },
        { label: "lg", css: "var(--radius-lg)" },
      ].map((r) => (
        <div key={r.label} className="flex flex-col items-center gap-1">
          <div
            className="w-10 h-10 border-2"
            style={{
              borderColor: "var(--border)",
              borderRadius: r.css,
              backgroundColor: "var(--accent)",
            }}
          />
          <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>
            {r.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function ShadowsPreview() {
  return (
    <div className="relative h-20 flex items-center justify-center">
      {[
        { shadow: "var(--shadow-lg)", offset: -12, z: 1 },
        { shadow: "var(--shadow-md)", offset: 0, z: 2 },
        { shadow: "var(--shadow-sm)", offset: 12, z: 3 },
      ].map((s, i) => (
        <div
          key={i}
          className="absolute w-16 h-12 rounded-md"
          style={{
            backgroundColor: "var(--card)",
            boxShadow: s.shadow,
            transform: `translateX(${s.offset}px)`,
            zIndex: s.z,
            border: "1px solid var(--border)",
          }}
        />
      ))}
    </div>
  );
}

function SemanticPreview() {
  const items = [
    { label: "bg", css: "var(--background)", border: true },
    { label: "pri", css: "var(--primary)", border: false },
    { label: "sec", css: "var(--secondary)", border: true },
    { label: "acc", css: "var(--accent)", border: true },
    { label: "err", css: "var(--destructive)", border: false },
    { label: "mut", css: "var(--muted)", border: true },
  ];
  return (
    <div className="flex gap-2">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col items-center gap-1">
          <div
            className="w-6 h-6 rounded-full"
            style={{
              backgroundColor: item.css,
              border: item.border ? "1px solid var(--border)" : "none",
            }}
          />
          <span className="text-[9px]" style={{ color: "var(--muted-foreground)" }}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function AnimationPreview() {
  return (
    <div className="space-y-2">
      <div
        className="relative h-4 rounded-full overflow-hidden"
        style={{ backgroundColor: "var(--muted)" }}
      >
        <motion.div
          className="absolute top-0.5 w-3 h-3 rounded-full"
          style={{ backgroundColor: "var(--primary)" }}
          animate={{ x: [0, 100, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      <p className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>
        Duration & easing tokens
      </p>
    </div>
  );
}

function AccessibilityPreview() {
  return (
    <div className="flex gap-2">
      {[
        { bg: "var(--primary)", fg: "var(--primary-foreground)", label: "Primary" },
        { bg: "var(--card)", fg: "var(--card-foreground)", label: "Card" },
      ].map((pair) => (
        <div
          key={pair.label}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium"
          style={{ backgroundColor: pair.bg, color: pair.fg }}
        >
          Aa
          <ShieldCheck className="w-3 h-3 text-green-500" />
        </div>
      ))}
    </div>
  );
}

const CATEGORIES = [
  { icon: Palette, title: "Colors", Preview: ColorsPreview },
  { icon: Type, title: "Typography", Preview: TypographyPreview },
  { icon: Space, title: "Spacing", Preview: SpacingPreview },
  { icon: Circle, title: "Border Radius", Preview: RadiusPreview },
  { icon: Layers, title: "Shadows", Preview: ShadowsPreview },
  { icon: Paintbrush, title: "Semantic Colors", Preview: SemanticPreview },
  { icon: Zap, title: "Animation", Preview: AnimationPreview },
  { icon: ShieldCheck, title: "Accessibility", Preview: AccessibilityPreview },
];

export function TokenCategories() {
  return (
    <section className="py-24 sm:py-32 px-6">
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
            Complete token system
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.02em]"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-heading)" }}
          >
            What We Generate
          </h2>
          <p
            className="mt-4 text-base sm:text-lg max-w-xl mx-auto"
            style={{ color: "var(--muted-foreground)" }}
          >
            Every token category a production design system needs, generated and validated automatically.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: i * 0.07,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border rounded-xl p-5 flex flex-col gap-4"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                borderRadius: "var(--radius-xl)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <cat.icon
                  className="w-4 h-4 shrink-0"
                  style={{ color: "var(--primary)" }}
                />
                <h3
                  className="text-sm font-semibold"
                  style={{ color: "var(--foreground)", fontFamily: "var(--font-heading)" }}
                >
                  {cat.title}
                </h3>
              </div>
              <div className="min-h-[60px] flex items-end">
                <cat.Preview />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
