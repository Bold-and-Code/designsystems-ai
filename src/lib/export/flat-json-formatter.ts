// Flat JSON formatter
// Outputs tokens as a flat key-value object with dot-notation paths

import type { DesignTokens } from "../tokens/types";

export function formatFlatJSON(tokens: DesignTokens, systemName?: string): string {
  const flat: Record<string, string | number> = {};
  const name = systemName || tokens.meta.name;

  // Meta
  flat["meta.name"] = name;
  flat["meta.description"] = tokens.meta.description;
  flat["meta.industry"] = tokens.meta.industry;

  // Color scales
  const scaleNames = ["primary", "secondary", "accent", "neutral", "success", "warning", "error", "info"] as const;
  for (const scaleName of scaleNames) {
    const scale = tokens.colors[scaleName];
    for (const [shade, value] of Object.entries(scale)) {
      flat[`color.${scaleName}.${shade}`] = value;
    }
  }

  // Semantic colors
  flat["color.semantic.background"] = tokens.semantic.background;
  flat["color.semantic.foreground"] = tokens.semantic.foreground;
  flat["color.semantic.card"] = tokens.semantic.card;
  flat["color.semantic.card-foreground"] = tokens.semantic.cardForeground;
  flat["color.semantic.popover"] = tokens.semantic.popover;
  flat["color.semantic.popover-foreground"] = tokens.semantic.popoverForeground;
  flat["color.semantic.primary"] = tokens.semantic.primary;
  flat["color.semantic.primary-foreground"] = tokens.semantic.primaryForeground;
  flat["color.semantic.secondary"] = tokens.semantic.secondary;
  flat["color.semantic.secondary-foreground"] = tokens.semantic.secondaryForeground;
  flat["color.semantic.muted"] = tokens.semantic.muted;
  flat["color.semantic.muted-foreground"] = tokens.semantic.mutedForeground;
  flat["color.semantic.accent"] = tokens.semantic.accent;
  flat["color.semantic.accent-foreground"] = tokens.semantic.accentForeground;
  flat["color.semantic.destructive"] = tokens.semantic.destructive;
  flat["color.semantic.destructive-foreground"] = tokens.semantic.destructiveForeground;
  flat["color.semantic.border"] = tokens.semantic.border;
  flat["color.semantic.input"] = tokens.semantic.input;
  flat["color.semantic.ring"] = tokens.semantic.ring;

  // Typography
  flat["typography.heading-family"] = tokens.typography.headingFamily;
  flat["typography.body-family"] = tokens.typography.bodyFamily;
  flat["typography.mono-family"] = tokens.typography.monoFamily;
  flat["typography.weight.normal"] = tokens.typography.weights.normal;
  flat["typography.weight.medium"] = tokens.typography.weights.medium;
  flat["typography.weight.semibold"] = tokens.typography.weights.semibold;
  flat["typography.weight.bold"] = tokens.typography.weights.bold;

  for (const [key, val] of Object.entries(tokens.typography.scale)) {
    flat[`typography.scale.${key}.size`] = val.size;
    flat[`typography.scale.${key}.line-height`] = val.lineHeight;
    if (val.letterSpacing) {
      flat[`typography.scale.${key}.letter-spacing`] = val.letterSpacing;
    }
  }

  // Border radius
  for (const [key, value] of Object.entries(tokens.borderRadius)) {
    flat[`radius.${key}`] = value;
  }

  // Shadows
  for (const [key, value] of Object.entries(tokens.shadows)) {
    flat[`shadow.${key}`] = value;
  }

  // Spacing
  for (const [key, value] of Object.entries(tokens.spacing)) {
    flat[`spacing.${key}`] = value;
  }

  // Animation
  flat["animation.duration.fast"] = tokens.animation.duration.fast;
  flat["animation.duration.normal"] = tokens.animation.duration.normal;
  flat["animation.duration.slow"] = tokens.animation.duration.slow;
  flat["animation.easing.ease-in"] = tokens.animation.easing.easeIn;
  flat["animation.easing.ease-out"] = tokens.animation.easing.easeOut;
  flat["animation.easing.ease-in-out"] = tokens.animation.easing.easeInOut;

  // Breakpoints
  for (const [key, value] of Object.entries(tokens.breakpoints)) {
    flat[`breakpoint.${key}`] = value;
  }

  // Z-Index
  for (const [key, value] of Object.entries(tokens.zIndex)) {
    flat[`z-index.${key}`] = value;
  }

  // Opacity
  for (const [key, value] of Object.entries(tokens.opacity)) {
    flat[`opacity.${key}`] = value;
  }

  // Border Width
  for (const [key, value] of Object.entries(tokens.borderWidth)) {
    flat[`border-width.${key}`] = value;
  }

  // Letter Spacing
  for (const [key, value] of Object.entries(tokens.letterSpacing)) {
    flat[`letter-spacing.${key}`] = value;
  }

  // Line Height
  for (const [key, value] of Object.entries(tokens.lineHeight)) {
    flat[`line-height.${key}`] = value;
  }

  // Component Tokens — Button
  flat["component.button.height-sm"] = tokens.components.button.heightSm;
  flat["component.button.height-md"] = tokens.components.button.heightMd;
  flat["component.button.height-lg"] = tokens.components.button.heightLg;
  flat["component.button.padding-x"] = tokens.components.button.paddingX;
  flat["component.button.padding-x-sm"] = tokens.components.button.paddingXSm;
  flat["component.button.font-size"] = tokens.components.button.fontSize;
  flat["component.button.font-size-sm"] = tokens.components.button.fontSizeSm;
  flat["component.button.font-weight"] = tokens.components.button.fontWeight;
  flat["component.button.letter-spacing"] = tokens.components.button.letterSpacing;
  flat["component.button.text-transform"] = tokens.components.button.textTransform;
  flat["component.button.border-radius"] = tokens.components.button.borderRadius;
  flat["component.button.transition"] = tokens.components.button.transition;
  flat["component.button.hover-transform"] = tokens.components.button.hoverTransform;

  // Component Tokens — Card
  flat["component.card.padding"] = tokens.components.card.padding;
  flat["component.card.padding-sm"] = tokens.components.card.paddingSm;
  flat["component.card.border-radius"] = tokens.components.card.borderRadius;
  flat["component.card.border-width"] = tokens.components.card.borderWidth;

  // Component Tokens — Input
  flat["component.input.height"] = tokens.components.input.height;
  flat["component.input.padding-x"] = tokens.components.input.paddingX;
  flat["component.input.font-size"] = tokens.components.input.fontSize;
  flat["component.input.border-radius"] = tokens.components.input.borderRadius;
  flat["component.input.border-width"] = tokens.components.input.borderWidth;

  // Component Tokens — Badge
  flat["component.badge.padding-x"] = tokens.components.badge.paddingX;
  flat["component.badge.padding-y"] = tokens.components.badge.paddingY;
  flat["component.badge.font-size"] = tokens.components.badge.fontSize;
  flat["component.badge.font-weight"] = tokens.components.badge.fontWeight;
  flat["component.badge.border-radius"] = tokens.components.badge.borderRadius;
  flat["component.badge.letter-spacing"] = tokens.components.badge.letterSpacing;
  flat["component.badge.text-transform"] = tokens.components.badge.textTransform;

  // Component Tokens — Avatar
  flat["component.avatar.size-sm"] = tokens.components.avatar.sizeSm;
  flat["component.avatar.size-md"] = tokens.components.avatar.sizeMd;
  flat["component.avatar.size-lg"] = tokens.components.avatar.sizeLg;
  flat["component.avatar.border-radius"] = tokens.components.avatar.borderRadius;

  // Typography Usage
  const typoRoles = [
    "display", "h1", "h2", "h3", "h4", "h5", "h6",
    "body", "bodyLarge", "bodySmall", "caption", "button", "label", "overline",
  ] as const;
  for (const role of typoRoles) {
    const rule = tokens.typographyUsage[role];
    const flatRole = role.replace(/([A-Z])/g, "-$1").toLowerCase();
    flat[`typography-usage.${flatRole}.weight`] = rule.weight;
    flat[`typography-usage.${flatRole}.size`] = rule.size;
    flat[`typography-usage.${flatRole}.line-height`] = rule.lineHeight;
    flat[`typography-usage.${flatRole}.letter-spacing`] = rule.letterSpacing;
    if (rule.textTransform) {
      flat[`typography-usage.${flatRole}.text-transform`] = rule.textTransform;
    }
  }

  // Focus
  flat["focus.ring-width"] = tokens.focus.ringWidth;
  flat["focus.ring-offset"] = tokens.focus.ringOffset;
  flat["focus.ring-color"] = tokens.focus.ringColor;
  flat["focus.outline-style"] = tokens.focus.outlineStyle;

  // Section Spacing
  flat["section-spacing.padding-sm"] = tokens.sectionSpacing.paddingSm;
  flat["section-spacing.padding-md"] = tokens.sectionSpacing.paddingMd;
  flat["section-spacing.padding-lg"] = tokens.sectionSpacing.paddingLg;
  flat["section-spacing.padding-sm-tablet"] = tokens.sectionSpacing.paddingSmTablet;
  flat["section-spacing.padding-md-tablet"] = tokens.sectionSpacing.paddingMdTablet;
  flat["section-spacing.padding-lg-tablet"] = tokens.sectionSpacing.paddingLgTablet;
  flat["section-spacing.padding-sm-mobile"] = tokens.sectionSpacing.paddingSmMobile;
  flat["section-spacing.padding-md-mobile"] = tokens.sectionSpacing.paddingMdMobile;
  flat["section-spacing.padding-lg-mobile"] = tokens.sectionSpacing.paddingLgMobile;

  return JSON.stringify(flat, null, 2);
}
