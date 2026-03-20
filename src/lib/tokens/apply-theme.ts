import type { DesignTokens } from "./types";

/**
 * Applies a DesignTokens set to the document root as CSS custom properties.
 * This is the engine that powers the live theme-swap demo.
 * Every shadcn/ui component picks up the new values instantly.
 */
export function applyTheme(tokens: DesignTokens): void {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const set = (key: string, value: string) =>
    root.style.setProperty(key, value);

  // --- Semantic colors (shadcn naming convention) ---
  set("--background", tokens.semantic.background);
  set("--foreground", tokens.semantic.foreground);
  set("--card", tokens.semantic.card);
  set("--card-foreground", tokens.semantic.cardForeground);
  set("--popover", tokens.semantic.popover);
  set("--popover-foreground", tokens.semantic.popoverForeground);
  set("--primary", tokens.semantic.primary);
  set("--primary-foreground", tokens.semantic.primaryForeground);
  set("--secondary", tokens.semantic.secondary);
  set("--secondary-foreground", tokens.semantic.secondaryForeground);
  set("--muted", tokens.semantic.muted);
  set("--muted-foreground", tokens.semantic.mutedForeground);
  set("--accent", tokens.semantic.accent);
  set("--accent-foreground", tokens.semantic.accentForeground);
  set("--destructive", tokens.semantic.destructive);
  set("--destructive-foreground", tokens.semantic.destructiveForeground);
  set("--border", tokens.semantic.border);
  set("--input", tokens.semantic.input);
  set("--ring", tokens.semantic.ring);

  // --- Color scales (for token display, not component theming) ---
  const scaleNames = [
    "primary",
    "secondary",
    "accent",
    "neutral",
    "success",
    "warning",
    "error",
    "info",
  ] as const;
  const shades = [
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "950",
  ] as const;

  for (const name of scaleNames) {
    const scale = tokens.colors[name];
    if (!scale) continue;
    for (const shade of shades) {
      set(`--color-${name}-${shade}`, scale[shade]);
    }
  }

  // --- Typography ---
  set("--font-heading", tokens.typography.headingFamily);
  set("--font-body", tokens.typography.bodyFamily);
  set("--font-mono", tokens.typography.monoFamily);

  // --- Border radius ---
  set("--radius-sm", tokens.borderRadius.sm);
  set("--radius-md", tokens.borderRadius.md);
  set("--radius-lg", tokens.borderRadius.lg);
  set("--radius-xl", tokens.borderRadius.xl);
  set("--radius", tokens.borderRadius.md); // shadcn default

  // --- Shadows ---
  set("--shadow-sm", tokens.shadows.sm);
  set("--shadow-md", tokens.shadows.md);
  set("--shadow-lg", tokens.shadows.lg);
  set("--shadow-xl", tokens.shadows.xl);

  // --- Animation ---
  set("--duration-fast", tokens.animation.duration.fast);
  set("--duration-normal", tokens.animation.duration.normal);
  set("--duration-slow", tokens.animation.duration.slow);
  set("--ease-in", tokens.animation.easing.easeIn);
  set("--ease-out", tokens.animation.easing.easeOut);
  set("--ease-in-out", tokens.animation.easing.easeInOut);
}

/**
 * Loads Google Fonts dynamically by injecting a <link> tag.
 * Avoids duplicate loads by checking for existing links.
 */
export function loadGoogleFonts(fonts: Array<{ family: string; weights: number[] }>): void {
  if (typeof document === "undefined") return;

  for (const font of fonts) {
    const id = `gf-${font.family.replace(/\s+/g, "-").toLowerCase()}`;
    if (document.getElementById(id)) continue;

    const weights = font.weights.join(";");
    const family = font.family.replace(/\s+/g, "+");
    const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weights}&display=swap`;

    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
  }
}
