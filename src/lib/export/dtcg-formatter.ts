// DTCG (W3C Design Token Community Group) JSON formatter
// Outputs tokens in the standard DTCG format with $type and $value

import type { DesignTokens, ColorScale } from "../tokens/types";

function colorScaleToTokens(scale: ColorScale, description: string) {
  const result: Record<string, unknown> = { $type: "color", $description: description };
  for (const [shade, value] of Object.entries(scale)) {
    result[shade] = { $value: value };
  }
  return result;
}

export function formatDTCG(tokens: DesignTokens, systemName?: string): string {
  const output: Record<string, unknown> = {
    $schema: "https://design-tokens.github.io/community-group/format/",
    $name: systemName || tokens.meta.name,
    $description: tokens.meta.description,

    color: {
      primary: colorScaleToTokens(tokens.colors.primary, "Primary color scale"),
      secondary: colorScaleToTokens(tokens.colors.secondary, "Secondary color scale"),
      accent: colorScaleToTokens(tokens.colors.accent, "Accent color scale"),
      neutral: colorScaleToTokens(tokens.colors.neutral, "Neutral color scale"),
      success: colorScaleToTokens(tokens.colors.success, "Success color scale"),
      warning: colorScaleToTokens(tokens.colors.warning, "Warning color scale"),
      error: colorScaleToTokens(tokens.colors.error, "Error color scale"),
      info: colorScaleToTokens(tokens.colors.info, "Info color scale"),

      semantic: {
        $type: "color",
        background: { $value: tokens.semantic.background },
        foreground: { $value: tokens.semantic.foreground },
        card: { $value: tokens.semantic.card },
        "card-foreground": { $value: tokens.semantic.cardForeground },
        popover: { $value: tokens.semantic.popover },
        "popover-foreground": { $value: tokens.semantic.popoverForeground },
        primary: { $value: tokens.semantic.primary },
        "primary-foreground": { $value: tokens.semantic.primaryForeground },
        secondary: { $value: tokens.semantic.secondary },
        "secondary-foreground": { $value: tokens.semantic.secondaryForeground },
        muted: { $value: tokens.semantic.muted },
        "muted-foreground": { $value: tokens.semantic.mutedForeground },
        accent: { $value: tokens.semantic.accent },
        "accent-foreground": { $value: tokens.semantic.accentForeground },
        destructive: { $value: tokens.semantic.destructive },
        "destructive-foreground": { $value: tokens.semantic.destructiveForeground },
        border: { $value: tokens.semantic.border },
        input: { $value: tokens.semantic.input },
        ring: { $value: tokens.semantic.ring },
      },
    },

    typography: {
      fontFamily: {
        $type: "fontFamily",
        heading: { $value: tokens.typography.headingFamily },
        body: { $value: tokens.typography.bodyFamily },
        mono: { $value: tokens.typography.monoFamily },
      },
      fontWeight: {
        $type: "fontWeight",
        normal: { $value: tokens.typography.weights.normal },
        medium: { $value: tokens.typography.weights.medium },
        semibold: { $value: tokens.typography.weights.semibold },
        bold: { $value: tokens.typography.weights.bold },
      },
      scale: Object.fromEntries(
        Object.entries(tokens.typography.scale).map(([key, val]) => [
          key,
          {
            fontSize: { $type: "dimension", $value: val.size },
            lineHeight: { $type: "dimension", $value: val.lineHeight },
            ...(val.letterSpacing
              ? { letterSpacing: { $type: "dimension", $value: val.letterSpacing } }
              : {}),
          },
        ])
      ),
    },

    borderRadius: {
      $type: "dimension",
      ...Object.fromEntries(
        Object.entries(tokens.borderRadius).map(([key, val]) => [key, { $value: val }])
      ),
    },

    shadow: {
      $type: "shadow",
      ...Object.fromEntries(
        Object.entries(tokens.shadows)
          .filter(([, val]) => val !== "none")
          .map(([key, val]) => [key, { $value: val }])
      ),
    },

    spacing: {
      $type: "dimension",
      ...Object.fromEntries(
        Object.entries(tokens.spacing).map(([key, val]) => [key, { $value: val }])
      ),
    },

    animation: {
      duration: {
        $type: "duration",
        fast: { $value: tokens.animation.duration.fast },
        normal: { $value: tokens.animation.duration.normal },
        slow: { $value: tokens.animation.duration.slow },
      },
      easing: {
        $type: "cubicBezier",
        easeIn: { $value: tokens.animation.easing.easeIn },
        easeOut: { $value: tokens.animation.easing.easeOut },
        easeInOut: { $value: tokens.animation.easing.easeInOut },
      },
    },

    breakpoints: {
      $type: "dimension",
      ...Object.fromEntries(
        Object.entries(tokens.breakpoints).map(([key, val]) => [key, { $value: val }])
      ),
    },

    zIndex: {
      $type: "number",
      ...Object.fromEntries(
        Object.entries(tokens.zIndex).map(([key, val]) => [key, { $value: val }])
      ),
    },

    opacity: {
      $type: "number",
      $description: "Opacity scale from 0 to 100",
      ...Object.fromEntries(
        Object.entries(tokens.opacity).map(([key, val]) => [key, { $value: val }])
      ),
    },

    borderWidth: {
      $type: "dimension",
      ...Object.fromEntries(
        Object.entries(tokens.borderWidth).map(([key, val]) => [key, { $value: val }])
      ),
    },

    letterSpacing: {
      $type: "dimension",
      ...Object.fromEntries(
        Object.entries(tokens.letterSpacing).map(([key, val]) => [key, { $value: val }])
      ),
    },

    lineHeight: {
      $type: "number",
      ...Object.fromEntries(
        Object.entries(tokens.lineHeight).map(([key, val]) => [key, { $value: val }])
      ),
    },

    components: {
      $description: "Component-level design tokens",
      button: {
        heightSm: { $type: "dimension", $value: tokens.components.button.heightSm },
        heightMd: { $type: "dimension", $value: tokens.components.button.heightMd },
        heightLg: { $type: "dimension", $value: tokens.components.button.heightLg },
        paddingX: { $type: "dimension", $value: tokens.components.button.paddingX },
        paddingXSm: { $type: "dimension", $value: tokens.components.button.paddingXSm },
        fontSize: { $type: "dimension", $value: tokens.components.button.fontSize },
        fontSizeSm: { $type: "dimension", $value: tokens.components.button.fontSizeSm },
        fontWeight: { $type: "fontWeight", $value: tokens.components.button.fontWeight },
        letterSpacing: { $type: "dimension", $value: tokens.components.button.letterSpacing },
        textTransform: { $type: "string", $value: tokens.components.button.textTransform },
        borderRadius: { $type: "dimension", $value: tokens.components.button.borderRadius },
        transition: { $type: "string", $value: tokens.components.button.transition },
        hoverTransform: { $type: "string", $value: tokens.components.button.hoverTransform },
      },
      card: {
        padding: { $type: "dimension", $value: tokens.components.card.padding },
        paddingSm: { $type: "dimension", $value: tokens.components.card.paddingSm },
        borderRadius: { $type: "dimension", $value: tokens.components.card.borderRadius },
        borderWidth: { $type: "dimension", $value: tokens.components.card.borderWidth },
      },
      input: {
        height: { $type: "dimension", $value: tokens.components.input.height },
        paddingX: { $type: "dimension", $value: tokens.components.input.paddingX },
        fontSize: { $type: "dimension", $value: tokens.components.input.fontSize },
        borderRadius: { $type: "dimension", $value: tokens.components.input.borderRadius },
        borderWidth: { $type: "dimension", $value: tokens.components.input.borderWidth },
      },
      badge: {
        paddingX: { $type: "dimension", $value: tokens.components.badge.paddingX },
        paddingY: { $type: "dimension", $value: tokens.components.badge.paddingY },
        fontSize: { $type: "dimension", $value: tokens.components.badge.fontSize },
        fontWeight: { $type: "fontWeight", $value: tokens.components.badge.fontWeight },
        borderRadius: { $type: "dimension", $value: tokens.components.badge.borderRadius },
        letterSpacing: { $type: "dimension", $value: tokens.components.badge.letterSpacing },
        textTransform: { $type: "string", $value: tokens.components.badge.textTransform },
      },
      avatar: {
        sizeSm: { $type: "dimension", $value: tokens.components.avatar.sizeSm },
        sizeMd: { $type: "dimension", $value: tokens.components.avatar.sizeMd },
        sizeLg: { $type: "dimension", $value: tokens.components.avatar.sizeLg },
        borderRadius: { $type: "dimension", $value: tokens.components.avatar.borderRadius },
      },
    },

    typographyUsage: {
      $description: "Per-element typography rules",
      ...Object.fromEntries(
        Object.entries(tokens.typographyUsage).map(([role, rule]) => [
          role,
          {
            weight: { $type: "fontWeight", $value: (rule as { weight: number; size: string; lineHeight: number; letterSpacing: string; textTransform?: string }).weight },
            size: { $type: "dimension", $value: (rule as { weight: number; size: string; lineHeight: number; letterSpacing: string; textTransform?: string }).size },
            lineHeight: { $type: "number", $value: (rule as { weight: number; size: string; lineHeight: number; letterSpacing: string; textTransform?: string }).lineHeight },
            letterSpacing: { $type: "dimension", $value: (rule as { weight: number; size: string; lineHeight: number; letterSpacing: string; textTransform?: string }).letterSpacing },
            ...((rule as { weight: number; size: string; lineHeight: number; letterSpacing: string; textTransform?: string }).textTransform
              ? { textTransform: { $type: "string", $value: (rule as { weight: number; size: string; lineHeight: number; letterSpacing: string; textTransform?: string }).textTransform } }
              : {}),
          },
        ])
      ),
    },

    focus: {
      $description: "Focus / interaction tokens",
      ringWidth: { $type: "dimension", $value: tokens.focus.ringWidth },
      ringOffset: { $type: "dimension", $value: tokens.focus.ringOffset },
      ringColor: { $type: "color", $value: tokens.focus.ringColor },
      outlineStyle: { $type: "string", $value: tokens.focus.outlineStyle },
    },

    sectionSpacing: {
      $description: "Responsive section spacing",
      $type: "dimension",
      paddingSm: { $value: tokens.sectionSpacing.paddingSm },
      paddingMd: { $value: tokens.sectionSpacing.paddingMd },
      paddingLg: { $value: tokens.sectionSpacing.paddingLg },
      paddingSmTablet: { $value: tokens.sectionSpacing.paddingSmTablet },
      paddingMdTablet: { $value: tokens.sectionSpacing.paddingMdTablet },
      paddingLgTablet: { $value: tokens.sectionSpacing.paddingLgTablet },
      paddingSmMobile: { $value: tokens.sectionSpacing.paddingSmMobile },
      paddingMdMobile: { $value: tokens.sectionSpacing.paddingMdMobile },
      paddingLgMobile: { $value: tokens.sectionSpacing.paddingLgMobile },
    },
  };

  return JSON.stringify(output, null, 2);
}
