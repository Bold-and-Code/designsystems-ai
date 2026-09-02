// Zod schema for AI-generated design tokens (reduced set)
// Claude generates this, then we expand to full DesignTokens using the color engine

import { z } from "zod";

const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a hex color like #ff0000");

export const AIGenerationSchema = z.object({
  meta: z.object({
    name: z.string(),
    description: z.string(),
    mood: z.array(z.string()),
    industry: z.string(),
  }),

  colors: z.object({
    primary: hexColor,
    secondary: hexColor,
    accent: hexColor,
    neutral: hexColor,
    success: hexColor,
    warning: hexColor,
    error: hexColor,
    info: hexColor,
  }),

  semantic: z.object({
    background: hexColor,
    foreground: hexColor,
    card: hexColor,
    cardForeground: hexColor,
    popover: hexColor,
    popoverForeground: hexColor,
    primary: hexColor,
    primaryForeground: hexColor,
    secondary: hexColor,
    secondaryForeground: hexColor,
    muted: hexColor,
    mutedForeground: hexColor,
    accent: hexColor,
    accentForeground: hexColor,
    destructive: hexColor,
    destructiveForeground: hexColor,
    border: hexColor,
    input: hexColor,
    ring: hexColor,
  }),

  typography: z.object({
    headingFamily: z.string(),
    bodyFamily: z.string(),
    monoFamily: z.string(),
  }),

  borderRadius: z.object({
    sm: z.string(),
    md: z.string(),
    lg: z.string(),
    xl: z.string(),
  }),
});

export type AIGenerationOutput = z.infer<typeof AIGenerationSchema>;

// JSON Schema for Anthropic tool_use definition
export const TOOL_JSON_SCHEMA = {
  type: "object" as const,
  required: ["meta", "colors", "semantic", "typography", "borderRadius"],
  properties: {
    meta: {
      type: "object" as const,
      required: ["name", "description", "mood", "industry"],
      properties: {
        name: { type: "string" as const, description: "Creative name for the design system" },
        description: { type: "string" as const, description: "One-sentence description of its personality" },
        mood: { type: "array" as const, items: { type: "string" as const }, description: "2-4 mood keywords" },
        industry: { type: "string" as const, description: "Industry category" },
      },
    },
    colors: {
      type: "object" as const,
      required: ["primary", "secondary", "accent", "neutral", "success", "warning", "error", "info"],
      properties: {
        primary: { type: "string" as const, description: "Primary brand color hex (#rrggbb)" },
        secondary: { type: "string" as const, description: "Secondary color hex" },
        accent: { type: "string" as const, description: "Accent color hex" },
        neutral: { type: "string" as const, description: "Neutral gray family anchor hex" },
        success: { type: "string" as const, description: "Success state color hex" },
        warning: { type: "string" as const, description: "Warning state color hex" },
        error: { type: "string" as const, description: "Error/danger state color hex" },
        info: { type: "string" as const, description: "Info/notice state color hex" },
      },
    },
    semantic: {
      type: "object" as const,
      required: [
        "background", "foreground", "card", "cardForeground", "popover", "popoverForeground",
        "primary", "primaryForeground", "secondary", "secondaryForeground",
        "muted", "mutedForeground", "accent", "accentForeground",
        "destructive", "destructiveForeground", "border", "input", "ring",
      ],
      properties: {
        background: { type: "string" as const, description: "Page background hex" },
        foreground: { type: "string" as const, description: "Default text color hex" },
        card: { type: "string" as const, description: "Card surface hex" },
        cardForeground: { type: "string" as const, description: "Card text hex" },
        popover: { type: "string" as const, description: "Popover background hex" },
        popoverForeground: { type: "string" as const, description: "Popover text hex" },
        primary: { type: "string" as const, description: "Primary action hex" },
        primaryForeground: { type: "string" as const, description: "Text on primary hex" },
        secondary: { type: "string" as const, description: "Secondary action hex" },
        secondaryForeground: { type: "string" as const, description: "Text on secondary hex" },
        muted: { type: "string" as const, description: "Muted background hex" },
        mutedForeground: { type: "string" as const, description: "Muted text hex" },
        accent: { type: "string" as const, description: "Accent background hex" },
        accentForeground: { type: "string" as const, description: "Accent text hex" },
        destructive: { type: "string" as const, description: "Destructive action hex" },
        destructiveForeground: { type: "string" as const, description: "Text on destructive hex" },
        border: { type: "string" as const, description: "Border color hex" },
        input: { type: "string" as const, description: "Input border hex" },
        ring: { type: "string" as const, description: "Focus ring hex" },
      },
    },
    typography: {
      type: "object" as const,
      required: ["headingFamily", "bodyFamily", "monoFamily"],
      properties: {
        headingFamily: { type: "string" as const, description: "Google Font for headings" },
        bodyFamily: { type: "string" as const, description: "Google Font for body" },
        monoFamily: { type: "string" as const, description: "Monospace font for code" },
      },
    },
    borderRadius: {
      type: "object" as const,
      required: ["sm", "md", "lg", "xl"],
      properties: {
        sm: { type: "string" as const, description: "Small radius e.g. '0.25rem'" },
        md: { type: "string" as const, description: "Medium radius e.g. '0.5rem'" },
        lg: { type: "string" as const, description: "Large radius e.g. '0.75rem'" },
        xl: { type: "string" as const, description: "XL radius e.g. '1rem'" },
      },
    },
  },
};
