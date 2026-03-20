import type { PresetMeta, DesignTokens } from "./types";
import {
  DEFAULT_SPACING,
  DEFAULT_ANIMATION,
  DEFAULT_SHADOWS,
  DEFAULT_RADIUS,
  DEFAULT_TYPOGRAPHY_SCALE,
  DEFAULT_WEIGHTS,
} from "./defaults";

// Helper to build a full DesignTokens from partial overrides
function makeTokens(
  partial: Partial<DesignTokens> & Pick<DesignTokens, "meta" | "colors" | "semantic" | "typography">
): DesignTokens {
  return {
    spacing: DEFAULT_SPACING,
    animation: DEFAULT_ANIMATION,
    shadows: partial.shadows ?? DEFAULT_SHADOWS,
    borderRadius: partial.borderRadius ?? DEFAULT_RADIUS,
    ...partial,
  };
}

// ─── 1. Midnight SaaS ───────────────────────────────────────────────
const midnightSaas: PresetMeta = {
  id: "midnight-saas",
  name: "Midnight SaaS",
  description: "Dark, professional, electric blue accents",
  accent: "#3b82f6",
  fonts: [
    { family: "Inter", weights: [400, 500, 600, 700], url: "" },
  ],
  tokens: makeTokens({
    meta: { name: "Midnight SaaS", description: "Dark professional theme with electric blue accents", mood: ["modern", "technical", "professional"], industry: "Technology" },
    colors: {
      primary:   { 50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a", 950: "#172554" },
      secondary: { 50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1", 400: "#94a3b8", 500: "#64748b", 600: "#475569", 700: "#334155", 800: "#1e293b", 900: "#0f172a", 950: "#020617" },
      accent:    { 50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80", 500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534", 900: "#14532d", 950: "#052e16" },
      neutral:   { 50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1", 400: "#94a3b8", 500: "#64748b", 600: "#475569", 700: "#334155", 800: "#1e293b", 900: "#0f172a", 950: "#020617" },
      success:   { 50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80", 500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534", 900: "#14532d", 950: "#052e16" },
      warning:   { 50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d", 400: "#fbbf24", 500: "#f59e0b", 600: "#d97706", 700: "#b45309", 800: "#92400e", 900: "#78350f", 950: "#451a03" },
      error:     { 50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5", 400: "#f87171", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c", 800: "#991b1b", 900: "#7f1d1d", 950: "#450a0a" },
      info:      { 50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a", 950: "#172554" },
    },
    semantic: {
      background: "#0f172a", foreground: "#f1f5f9",
      card: "#1e293b", cardForeground: "#f1f5f9",
      popover: "#1e293b", popoverForeground: "#f1f5f9",
      primary: "#3b82f6", primaryForeground: "#ffffff",
      secondary: "#334155", secondaryForeground: "#f1f5f9",
      muted: "#334155", mutedForeground: "#94a3b8",
      accent: "#1e293b", accentForeground: "#f1f5f9",
      destructive: "#ef4444", destructiveForeground: "#ffffff",
      border: "#334155", input: "#334155", ring: "#3b82f6",
    },
    typography: {
      headingFamily: "'Inter', sans-serif",
      bodyFamily: "'Inter', sans-serif",
      monoFamily: "'JetBrains Mono', monospace",
      scale: DEFAULT_TYPOGRAPHY_SCALE,
      weights: DEFAULT_WEIGHTS,
    },
  }),
};

// ─── 2. Warm Studio ─────────────────────────────────────────────────
const warmStudio: PresetMeta = {
  id: "warm-studio",
  name: "Warm Studio",
  description: "Cream background, terracotta tones, serif headings",
  accent: "#c2410c",
  fonts: [
    { family: "Playfair Display", weights: [400, 500, 600, 700], url: "" },
    { family: "Source Sans 3", weights: [400, 500, 600], url: "" },
  ],
  tokens: makeTokens({
    meta: { name: "Warm Studio", description: "Warm, elegant theme with cream and terracotta", mood: ["warm", "elegant", "creative"], industry: "Creative" },
    colors: {
      primary:   { 50: "#fff7ed", 100: "#ffedd5", 200: "#fed7aa", 300: "#fdba74", 400: "#fb923c", 500: "#f97316", 600: "#ea580c", 700: "#c2410c", 800: "#9a3412", 900: "#7c2d12", 950: "#431407" },
      secondary: { 50: "#faf5f0", 100: "#f5ebe0", 200: "#eddcd2", 300: "#e3c8b5", 400: "#d4a98b", 500: "#c08b6b", 600: "#a67351", 700: "#8a5e42", 800: "#6e4a35", 900: "#5a3d2c", 950: "#2f1f17" },
      accent:    { 50: "#fefce8", 100: "#fef9c3", 200: "#fef08a", 300: "#fde047", 400: "#facc15", 500: "#eab308", 600: "#ca8a04", 700: "#a16207", 800: "#854d0e", 900: "#713f12", 950: "#422006" },
      neutral:   { 50: "#fafaf9", 100: "#f5f5f4", 200: "#e7e5e4", 300: "#d6d3d1", 400: "#a8a29e", 500: "#78716c", 600: "#57534e", 700: "#44403c", 800: "#292524", 900: "#1c1917", 950: "#0c0a09" },
      success:   { 50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80", 500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534", 900: "#14532d", 950: "#052e16" },
      warning:   { 50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d", 400: "#fbbf24", 500: "#f59e0b", 600: "#d97706", 700: "#b45309", 800: "#92400e", 900: "#78350f", 950: "#451a03" },
      error:     { 50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5", 400: "#f87171", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c", 800: "#991b1b", 900: "#7f1d1d", 950: "#450a0a" },
      info:      { 50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a", 950: "#172554" },
    },
    semantic: {
      background: "#faf5f0", foreground: "#1c1917",
      card: "#ffffff", cardForeground: "#1c1917",
      popover: "#ffffff", popoverForeground: "#1c1917",
      primary: "#c2410c", primaryForeground: "#ffffff",
      secondary: "#f5ebe0", secondaryForeground: "#44403c",
      muted: "#f5f5f4", mutedForeground: "#78716c",
      accent: "#fff7ed", accentForeground: "#9a3412",
      destructive: "#ef4444", destructiveForeground: "#ffffff",
      border: "#e7e5e4", input: "#e7e5e4", ring: "#c2410c",
    },
    typography: {
      headingFamily: "'Playfair Display', serif",
      bodyFamily: "'Source Sans 3', sans-serif",
      monoFamily: "'JetBrains Mono', monospace",
      scale: DEFAULT_TYPOGRAPHY_SCALE,
      weights: DEFAULT_WEIGHTS,
    },
    borderRadius: { none: "0px", sm: "0.375rem", md: "0.5rem", lg: "0.75rem", xl: "1rem", "2xl": "1.5rem", full: "9999px" },
  }),
};

// ─── 3. Neon Startup ────────────────────────────────────────────────
const neonStartup: PresetMeta = {
  id: "neon-startup",
  name: "Neon Startup",
  description: "Near-black, lime green CTA, geometric fonts",
  accent: "#84cc16",
  fonts: [
    { family: "Space Grotesk", weights: [400, 500, 600, 700], url: "" },
  ],
  tokens: makeTokens({
    meta: { name: "Neon Startup", description: "Bold dark theme with neon lime accents", mood: ["bold", "modern", "startup"], industry: "Technology" },
    colors: {
      primary:   { 50: "#f7fee7", 100: "#ecfccb", 200: "#d9f99d", 300: "#bef264", 400: "#a3e635", 500: "#84cc16", 600: "#65a30d", 700: "#4d7c0f", 800: "#3f6212", 900: "#365314", 950: "#1a2e05" },
      secondary: { 50: "#fafafa", 100: "#f5f5f5", 200: "#e5e5e5", 300: "#d4d4d4", 400: "#a3a3a3", 500: "#737373", 600: "#525252", 700: "#404040", 800: "#262626", 900: "#171717", 950: "#0a0a0a" },
      accent:    { 50: "#fdf4ff", 100: "#fae8ff", 200: "#f5d0fe", 300: "#f0abfc", 400: "#e879f9", 500: "#d946ef", 600: "#c026d3", 700: "#a21caf", 800: "#86198f", 900: "#701a75", 950: "#4a044e" },
      neutral:   { 50: "#fafafa", 100: "#f5f5f5", 200: "#e5e5e5", 300: "#d4d4d4", 400: "#a3a3a3", 500: "#737373", 600: "#525252", 700: "#404040", 800: "#262626", 900: "#171717", 950: "#0a0a0a" },
      success:   { 50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80", 500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534", 900: "#14532d", 950: "#052e16" },
      warning:   { 50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d", 400: "#fbbf24", 500: "#f59e0b", 600: "#d97706", 700: "#b45309", 800: "#92400e", 900: "#78350f", 950: "#451a03" },
      error:     { 50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5", 400: "#f87171", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c", 800: "#991b1b", 900: "#7f1d1d", 950: "#450a0a" },
      info:      { 50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a", 950: "#172554" },
    },
    semantic: {
      background: "#0a0a0a", foreground: "#fafafa",
      card: "#171717", cardForeground: "#fafafa",
      popover: "#171717", popoverForeground: "#fafafa",
      primary: "#84cc16", primaryForeground: "#0a0a0a",
      secondary: "#262626", secondaryForeground: "#fafafa",
      muted: "#262626", mutedForeground: "#a3a3a3",
      accent: "#262626", accentForeground: "#84cc16",
      destructive: "#ef4444", destructiveForeground: "#ffffff",
      border: "#262626", input: "#262626", ring: "#84cc16",
    },
    typography: {
      headingFamily: "'Space Grotesk', sans-serif",
      bodyFamily: "'Space Grotesk', sans-serif",
      monoFamily: "'JetBrains Mono', monospace",
      scale: DEFAULT_TYPOGRAPHY_SCALE,
      weights: DEFAULT_WEIGHTS,
    },
    borderRadius: { none: "0px", sm: "0.25rem", md: "0.375rem", lg: "0.5rem", xl: "0.75rem", "2xl": "1rem", full: "9999px" },
  }),
};

// ─── 4. Corporate Trust ─────────────────────────────────────────────
const corporateTrust: PresetMeta = {
  id: "corporate-trust",
  name: "Corporate Trust",
  description: "Navy + white, conservative radius, system fonts",
  accent: "#1e3a5f",
  fonts: [],
  tokens: makeTokens({
    meta: { name: "Corporate Trust", description: "Professional, trustworthy theme with navy tones", mood: ["corporate", "professional", "trustworthy"], industry: "Finance" },
    colors: {
      primary:   { 50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa", 500: "#1e3a5f", 600: "#1a3456", 700: "#162d4a", 800: "#12263e", 900: "#0e1f32", 950: "#0a1526" },
      secondary: { 50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1", 400: "#94a3b8", 500: "#64748b", 600: "#475569", 700: "#334155", 800: "#1e293b", 900: "#0f172a", 950: "#020617" },
      accent:    { 50: "#ecfeff", 100: "#cffafe", 200: "#a5f3fc", 300: "#67e8f9", 400: "#22d3ee", 500: "#06b6d4", 600: "#0891b2", 700: "#0e7490", 800: "#155e75", 900: "#164e63", 950: "#083344" },
      neutral:   { 50: "#f9fafb", 100: "#f3f4f6", 200: "#e5e7eb", 300: "#d1d5db", 400: "#9ca3af", 500: "#6b7280", 600: "#4b5563", 700: "#374151", 800: "#1f2937", 900: "#111827", 950: "#030712" },
      success:   { 50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80", 500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534", 900: "#14532d", 950: "#052e16" },
      warning:   { 50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d", 400: "#fbbf24", 500: "#f59e0b", 600: "#d97706", 700: "#b45309", 800: "#92400e", 900: "#78350f", 950: "#451a03" },
      error:     { 50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5", 400: "#f87171", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c", 800: "#991b1b", 900: "#7f1d1d", 950: "#450a0a" },
      info:      { 50: "#ecfeff", 100: "#cffafe", 200: "#a5f3fc", 300: "#67e8f9", 400: "#22d3ee", 500: "#06b6d4", 600: "#0891b2", 700: "#0e7490", 800: "#155e75", 900: "#164e63", 950: "#083344" },
    },
    semantic: {
      background: "#ffffff", foreground: "#111827",
      card: "#ffffff", cardForeground: "#111827",
      popover: "#ffffff", popoverForeground: "#111827",
      primary: "#1e3a5f", primaryForeground: "#ffffff",
      secondary: "#f3f4f6", secondaryForeground: "#374151",
      muted: "#f3f4f6", mutedForeground: "#6b7280",
      accent: "#eff6ff", accentForeground: "#1e3a5f",
      destructive: "#dc2626", destructiveForeground: "#ffffff",
      border: "#e5e7eb", input: "#e5e7eb", ring: "#1e3a5f",
    },
    typography: {
      headingFamily: "system-ui, -apple-system, sans-serif",
      bodyFamily: "system-ui, -apple-system, sans-serif",
      monoFamily: "'SFMono-Regular', Consolas, monospace",
      scale: DEFAULT_TYPOGRAPHY_SCALE,
      weights: DEFAULT_WEIGHTS,
    },
    borderRadius: { none: "0px", sm: "0.125rem", md: "0.25rem", lg: "0.375rem", xl: "0.5rem", "2xl": "0.75rem", full: "9999px" },
  }),
};

// ─── 5. Playful Brand ───────────────────────────────────────────────
const playfulBrand: PresetMeta = {
  id: "playful-brand",
  name: "Playful Brand",
  description: "Coral + teal, rounded corners, friendly fonts",
  accent: "#f472b6",
  fonts: [
    { family: "Nunito", weights: [400, 500, 600, 700, 800], url: "" },
  ],
  tokens: makeTokens({
    meta: { name: "Playful Brand", description: "Friendly, colorful theme with rounded elements", mood: ["playful", "friendly", "colorful"], industry: "Consumer" },
    colors: {
      primary:   { 50: "#fdf2f8", 100: "#fce7f3", 200: "#fbcfe8", 300: "#f9a8d4", 400: "#f472b6", 500: "#ec4899", 600: "#db2777", 700: "#be185d", 800: "#9d174d", 900: "#831843", 950: "#500724" },
      secondary: { 50: "#f0fdfa", 100: "#ccfbf1", 200: "#99f6e4", 300: "#5eead4", 400: "#2dd4bf", 500: "#14b8a6", 600: "#0d9488", 700: "#0f766e", 800: "#115e59", 900: "#134e4a", 950: "#042f2e" },
      accent:    { 50: "#fefce8", 100: "#fef9c3", 200: "#fef08a", 300: "#fde047", 400: "#facc15", 500: "#eab308", 600: "#ca8a04", 700: "#a16207", 800: "#854d0e", 900: "#713f12", 950: "#422006" },
      neutral:   { 50: "#fafafa", 100: "#f5f5f5", 200: "#e5e5e5", 300: "#d4d4d4", 400: "#a3a3a3", 500: "#737373", 600: "#525252", 700: "#404040", 800: "#262626", 900: "#171717", 950: "#0a0a0a" },
      success:   { 50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80", 500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534", 900: "#14532d", 950: "#052e16" },
      warning:   { 50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d", 400: "#fbbf24", 500: "#f59e0b", 600: "#d97706", 700: "#b45309", 800: "#92400e", 900: "#78350f", 950: "#451a03" },
      error:     { 50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5", 400: "#f87171", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c", 800: "#991b1b", 900: "#7f1d1d", 950: "#450a0a" },
      info:      { 50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a", 950: "#172554" },
    },
    semantic: {
      background: "#ffffff", foreground: "#171717",
      card: "#ffffff", cardForeground: "#171717",
      popover: "#ffffff", popoverForeground: "#171717",
      primary: "#ec4899", primaryForeground: "#ffffff",
      secondary: "#f0fdfa", secondaryForeground: "#0f766e",
      muted: "#f5f5f5", mutedForeground: "#737373",
      accent: "#fefce8", accentForeground: "#854d0e",
      destructive: "#ef4444", destructiveForeground: "#ffffff",
      border: "#e5e5e5", input: "#e5e5e5", ring: "#ec4899",
    },
    typography: {
      headingFamily: "'Nunito', sans-serif",
      bodyFamily: "'Nunito', sans-serif",
      monoFamily: "'JetBrains Mono', monospace",
      scale: DEFAULT_TYPOGRAPHY_SCALE,
      weights: { normal: 400, medium: 600, semibold: 700, bold: 800 },
    },
    borderRadius: { none: "0px", sm: "0.5rem", md: "0.75rem", lg: "1rem", xl: "1.25rem", "2xl": "1.5rem", full: "9999px" },
  }),
};

// ─── 6. Minimal Swiss ───────────────────────────────────────────────
const minimalSwiss: PresetMeta = {
  id: "minimal-swiss",
  name: "Minimal Swiss",
  description: "Black/white, red accent, sharp geometry",
  accent: "#dc2626",
  fonts: [
    { family: "Inter", weights: [400, 500, 600, 700], url: "" },
  ],
  tokens: makeTokens({
    meta: { name: "Minimal Swiss", description: "Stark, typographic, Swiss design inspired", mood: ["minimal", "clean", "typographic"], industry: "Design" },
    colors: {
      primary:   { 50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5", 400: "#f87171", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c", 800: "#991b1b", 900: "#7f1d1d", 950: "#450a0a" },
      secondary: { 50: "#fafafa", 100: "#f5f5f5", 200: "#e5e5e5", 300: "#d4d4d4", 400: "#a3a3a3", 500: "#737373", 600: "#525252", 700: "#404040", 800: "#262626", 900: "#171717", 950: "#0a0a0a" },
      accent:    { 50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5", 400: "#f87171", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c", 800: "#991b1b", 900: "#7f1d1d", 950: "#450a0a" },
      neutral:   { 50: "#fafafa", 100: "#f5f5f5", 200: "#e5e5e5", 300: "#d4d4d4", 400: "#a3a3a3", 500: "#737373", 600: "#525252", 700: "#404040", 800: "#262626", 900: "#171717", 950: "#0a0a0a" },
      success:   { 50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80", 500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534", 900: "#14532d", 950: "#052e16" },
      warning:   { 50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d", 400: "#fbbf24", 500: "#f59e0b", 600: "#d97706", 700: "#b45309", 800: "#92400e", 900: "#78350f", 950: "#451a03" },
      error:     { 50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5", 400: "#f87171", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c", 800: "#991b1b", 900: "#7f1d1d", 950: "#450a0a" },
      info:      { 50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a", 950: "#172554" },
    },
    semantic: {
      background: "#ffffff", foreground: "#0a0a0a",
      card: "#ffffff", cardForeground: "#0a0a0a",
      popover: "#ffffff", popoverForeground: "#0a0a0a",
      primary: "#0a0a0a", primaryForeground: "#ffffff",
      secondary: "#f5f5f5", secondaryForeground: "#171717",
      muted: "#f5f5f5", mutedForeground: "#737373",
      accent: "#fef2f2", accentForeground: "#dc2626",
      destructive: "#dc2626", destructiveForeground: "#ffffff",
      border: "#e5e5e5", input: "#e5e5e5", ring: "#0a0a0a",
    },
    typography: {
      headingFamily: "'Inter', sans-serif",
      bodyFamily: "'Inter', sans-serif",
      monoFamily: "'JetBrains Mono', monospace",
      scale: DEFAULT_TYPOGRAPHY_SCALE,
      weights: DEFAULT_WEIGHTS,
    },
    borderRadius: { none: "0px", sm: "0px", md: "0px", lg: "0px", xl: "0px", "2xl": "0px", full: "9999px" },
  }),
};

// ─── 7. Nature Organic ──────────────────────────────────────────────
const natureOrganic: PresetMeta = {
  id: "nature-organic",
  name: "Nature Organic",
  description: "Forest green, warm neutrals, elegant serif",
  accent: "#16a34a",
  fonts: [
    { family: "DM Serif Display", weights: [400], url: "" },
    { family: "DM Sans", weights: [400, 500, 600, 700], url: "" },
  ],
  tokens: makeTokens({
    meta: { name: "Nature Organic", description: "Natural, grounded theme with forest tones", mood: ["natural", "warm", "organic"], industry: "Health" },
    colors: {
      primary:   { 50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80", 500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534", 900: "#14532d", 950: "#052e16" },
      secondary: { 50: "#faf5f0", 100: "#f5ebe0", 200: "#eddcd2", 300: "#e3c8b5", 400: "#d4a98b", 500: "#c08b6b", 600: "#a67351", 700: "#8a5e42", 800: "#6e4a35", 900: "#5a3d2c", 950: "#2f1f17" },
      accent:    { 50: "#fefce8", 100: "#fef9c3", 200: "#fef08a", 300: "#fde047", 400: "#facc15", 500: "#eab308", 600: "#ca8a04", 700: "#a16207", 800: "#854d0e", 900: "#713f12", 950: "#422006" },
      neutral:   { 50: "#fafaf9", 100: "#f5f5f4", 200: "#e7e5e4", 300: "#d6d3d1", 400: "#a8a29e", 500: "#78716c", 600: "#57534e", 700: "#44403c", 800: "#292524", 900: "#1c1917", 950: "#0c0a09" },
      success:   { 50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80", 500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534", 900: "#14532d", 950: "#052e16" },
      warning:   { 50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d", 400: "#fbbf24", 500: "#f59e0b", 600: "#d97706", 700: "#b45309", 800: "#92400e", 900: "#78350f", 950: "#451a03" },
      error:     { 50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5", 400: "#f87171", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c", 800: "#991b1b", 900: "#7f1d1d", 950: "#450a0a" },
      info:      { 50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a", 950: "#172554" },
    },
    semantic: {
      background: "#fafaf9", foreground: "#1c1917",
      card: "#ffffff", cardForeground: "#1c1917",
      popover: "#ffffff", popoverForeground: "#1c1917",
      primary: "#16a34a", primaryForeground: "#ffffff",
      secondary: "#f5ebe0", secondaryForeground: "#44403c",
      muted: "#f5f5f4", mutedForeground: "#78716c",
      accent: "#f0fdf4", accentForeground: "#15803d",
      destructive: "#ef4444", destructiveForeground: "#ffffff",
      border: "#e7e5e4", input: "#e7e5e4", ring: "#16a34a",
    },
    typography: {
      headingFamily: "'DM Serif Display', serif",
      bodyFamily: "'DM Sans', sans-serif",
      monoFamily: "'JetBrains Mono', monospace",
      scale: DEFAULT_TYPOGRAPHY_SCALE,
      weights: DEFAULT_WEIGHTS,
    },
  }),
};

// ─── 8. Brutalist ───────────────────────────────────────────────────
const brutalist: PresetMeta = {
  id: "brutalist",
  name: "Brutalist",
  description: "High contrast, sharp corners, bold mono",
  accent: "#000000",
  fonts: [
    { family: "Space Mono", weights: [400, 700], url: "" },
  ],
  tokens: makeTokens({
    meta: { name: "Brutalist", description: "Raw, high-contrast, anti-design aesthetic", mood: ["bold", "raw", "brutalist"], industry: "Creative" },
    colors: {
      primary:   { 50: "#fafafa", 100: "#f5f5f5", 200: "#e5e5e5", 300: "#d4d4d4", 400: "#a3a3a3", 500: "#737373", 600: "#525252", 700: "#404040", 800: "#262626", 900: "#171717", 950: "#000000" },
      secondary: { 50: "#fefce8", 100: "#fef9c3", 200: "#fef08a", 300: "#fde047", 400: "#facc15", 500: "#eab308", 600: "#ca8a04", 700: "#a16207", 800: "#854d0e", 900: "#713f12", 950: "#422006" },
      accent:    { 50: "#fefce8", 100: "#fef9c3", 200: "#fef08a", 300: "#fde047", 400: "#facc15", 500: "#eab308", 600: "#ca8a04", 700: "#a16207", 800: "#854d0e", 900: "#713f12", 950: "#422006" },
      neutral:   { 50: "#fafafa", 100: "#f5f5f5", 200: "#e5e5e5", 300: "#d4d4d4", 400: "#a3a3a3", 500: "#737373", 600: "#525252", 700: "#404040", 800: "#262626", 900: "#171717", 950: "#0a0a0a" },
      success:   { 50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80", 500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534", 900: "#14532d", 950: "#052e16" },
      warning:   { 50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d", 400: "#fbbf24", 500: "#f59e0b", 600: "#d97706", 700: "#b45309", 800: "#92400e", 900: "#78350f", 950: "#451a03" },
      error:     { 50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5", 400: "#f87171", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c", 800: "#991b1b", 900: "#7f1d1d", 950: "#450a0a" },
      info:      { 50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a", 950: "#172554" },
    },
    semantic: {
      background: "#ffffff", foreground: "#000000",
      card: "#fef9c3", cardForeground: "#000000",
      popover: "#ffffff", popoverForeground: "#000000",
      primary: "#000000", primaryForeground: "#ffffff",
      secondary: "#fef9c3", secondaryForeground: "#000000",
      muted: "#f5f5f5", mutedForeground: "#525252",
      accent: "#fef9c3", accentForeground: "#000000",
      destructive: "#dc2626", destructiveForeground: "#ffffff",
      border: "#000000", input: "#000000", ring: "#000000",
    },
    typography: {
      headingFamily: "'Space Mono', monospace",
      bodyFamily: "'Space Mono', monospace",
      monoFamily: "'Space Mono', monospace",
      scale: DEFAULT_TYPOGRAPHY_SCALE,
      weights: { normal: 400, medium: 400, semibold: 700, bold: 700 },
    },
    borderRadius: { none: "0px", sm: "0px", md: "0px", lg: "0px", xl: "0px", "2xl": "0px", full: "0px" },
    shadows: { none: "none", sm: "2px 2px 0 #000", md: "4px 4px 0 #000", lg: "6px 6px 0 #000", xl: "8px 8px 0 #000", "2xl": "12px 12px 0 #000", inner: "inset 2px 2px 0 #000" },
  }),
};

// ─── Export all presets ─────────────────────────────────────────────

export const PRESETS: PresetMeta[] = [
  midnightSaas,
  warmStudio,
  neonStartup,
  corporateTrust,
  playfulBrand,
  minimalSwiss,
  natureOrganic,
  brutalist,
];

export const DEFAULT_PRESET = midnightSaas;
