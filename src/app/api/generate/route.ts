import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { AIGenerationSchema, TOOL_JSON_SCHEMA } from "@/lib/ai/schema";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/ai/prompt";
import { generateColorScale, ensureContrast } from "@/lib/tokens/color-utils";
import {
  DEFAULT_SPACING,
  DEFAULT_ANIMATION,
  DEFAULT_SHADOWS,
  DEFAULT_TYPOGRAPHY_SCALE,
  DEFAULT_WEIGHTS,
  DEFAULT_BREAKPOINTS,
  DEFAULT_ZINDEX,
  DEFAULT_OPACITY,
  DEFAULT_BORDER_WIDTH,
  DEFAULT_LETTER_SPACING,
  DEFAULT_LINE_HEIGHT,
  DEFAULT_COMPONENTS,
  DEFAULT_TYPOGRAPHY_USAGE,
  DEFAULT_FOCUS,
  DEFAULT_SECTION_SPACING,
} from "@/lib/tokens/defaults";
import type { DesignTokens } from "@/lib/tokens/types";
import { clientIp, rateLimit } from "@/lib/api/rate-limit";

export const maxDuration = 60;

const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/);

const GenerateInputSchema = z.object({
  industry: z.string().trim().min(1).max(80),
  mood: z.array(z.string().trim().min(1).max(40)).min(1).max(8),
  brandColor: z.union([hexColor, z.literal("")]).optional(),
  typographyStyle: z.string().max(40).optional(),
  roundedness: z.string().max(40).optional(),
  reference: z.string().max(500).optional(),
  context: z.string().max(2000).optional(),
  extractedColors: z.array(hexColor).max(16).optional(),
  extractedFonts: z.array(z.string().max(80)).max(8).optional(),
});

function jsonError(message: string, status: number, extra?: Record<string, unknown>) {
  return NextResponse.json({ error: message, ...extra }, { status });
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`generate:${ip}`, 8, 60 * 60 * 1000);
  if (!limited.ok) {
    return jsonError("Rate limit reached. Try again later.", 429, {
      retryAfterSec: limited.retryAfterSec,
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return jsonError("Generation is not configured on this server.", 503);
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const parsedInput = GenerateInputSchema.safeParse(raw);
  if (!parsedInput.success) {
    return jsonError("Industry and mood are required.", 400);
  }

  const body = parsedInput.data;
  const client = new Anthropic({ apiKey });

  const userPrompt = buildUserPrompt({
    industry: body.industry,
    mood: body.mood,
    brandColor: body.brandColor || undefined,
    typographyStyle: body.typographyStyle || undefined,
    roundedness: body.roundedness || undefined,
    reference: body.reference || undefined,
    context: body.context || undefined,
    extractedColors: body.extractedColors,
    extractedFonts: body.extractedFonts,
  });

  try {
    const response = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5",
      max_tokens: 4096,
      thinking: { type: "disabled" },
      system: SYSTEM_PROMPT,
      tools: [
        {
          name: "generate_design_tokens",
          description:
            "Generate a complete design token set based on the brand requirements. Output hex colors (#rrggbb), Google Font names, and CSS dimension values.",
          input_schema: TOOL_JSON_SCHEMA,
        },
      ],
      tool_choice: { type: "tool", name: "generate_design_tokens" },
      messages: [{ role: "user", content: userPrompt }],
    });

    const toolUse = response.content.find((block) => block.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") {
      return jsonError("The model did not return a token set. Try again.", 502);
    }

    const parsed = AIGenerationSchema.safeParse(toolUse.input);
    if (!parsed.success) {
      console.error("AI output validation failed:", parsed.error);
      return jsonError("The model returned an invalid token set. Try again.", 502);
    }

    const ai = parsed.data;

    const colors = {
      primary: generateColorScale(ai.colors.primary),
      secondary: generateColorScale(ai.colors.secondary),
      accent: generateColorScale(ai.colors.accent),
      neutral: generateColorScale(ai.colors.neutral),
      success: generateColorScale(ai.colors.success),
      warning: generateColorScale(ai.colors.warning),
      error: generateColorScale(ai.colors.error),
      info: generateColorScale(ai.colors.info),
    };

    const semantic = { ...ai.semantic };
    semantic.foreground = ensureContrast(semantic.foreground, semantic.background);
    semantic.cardForeground = ensureContrast(semantic.cardForeground, semantic.card);
    semantic.popoverForeground = ensureContrast(semantic.popoverForeground, semantic.popover);
    semantic.primaryForeground = ensureContrast(semantic.primaryForeground, semantic.primary);
    semantic.secondaryForeground = ensureContrast(semantic.secondaryForeground, semantic.secondary);
    semantic.mutedForeground = ensureContrast(semantic.mutedForeground, semantic.muted, 3.5);
    semantic.accentForeground = ensureContrast(semantic.accentForeground, semantic.accent);
    semantic.destructiveForeground = ensureContrast(
      semantic.destructiveForeground,
      semantic.destructive
    );

    const headingFamily = `"${ai.typography.headingFamily}", sans-serif`;
    const bodyFamily = `"${ai.typography.bodyFamily}", sans-serif`;
    const monoFamily = `"${ai.typography.monoFamily}", monospace`;

    const tokens: DesignTokens = {
      meta: {
        ...ai.meta,
        generatedAt: new Date().toISOString(),
      },
      colors,
      semantic,
      typography: {
        headingFamily,
        bodyFamily,
        monoFamily,
        scale: DEFAULT_TYPOGRAPHY_SCALE,
        weights: DEFAULT_WEIGHTS,
      },
      borderRadius: {
        none: "0px",
        sm: ai.borderRadius.sm,
        md: ai.borderRadius.md,
        lg: ai.borderRadius.lg,
        xl: ai.borderRadius.xl,
        "2xl": "1.5rem",
        full: "9999px",
      },
      shadows: DEFAULT_SHADOWS,
      spacing: DEFAULT_SPACING,
      animation: DEFAULT_ANIMATION,
      breakpoints: DEFAULT_BREAKPOINTS,
      zIndex: DEFAULT_ZINDEX,
      opacity: DEFAULT_OPACITY,
      borderWidth: DEFAULT_BORDER_WIDTH,
      letterSpacing: DEFAULT_LETTER_SPACING,
      lineHeight: DEFAULT_LINE_HEIGHT,
      components: DEFAULT_COMPONENTS,
      typographyUsage: DEFAULT_TYPOGRAPHY_USAGE,
      focus: DEFAULT_FOCUS,
      sectionSpacing: DEFAULT_SECTION_SPACING,
    };

    const fonts = [
      { family: ai.typography.headingFamily, weights: [400, 500, 600, 700] },
      { family: ai.typography.bodyFamily, weights: [400, 500, 600, 700] },
      { family: ai.typography.monoFamily, weights: [400, 500, 700] },
    ].filter((f, i, arr) => arr.findIndex((x) => x.family === f.family) === i);

    return NextResponse.json({ tokens, fonts });
  } catch (err) {
    console.error("Generation error:", err);
    return jsonError("Generation failed. Please try again.", 500);
  }
}
