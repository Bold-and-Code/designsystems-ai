import type { DesignTokens } from "./types";

function countLeaves(value: unknown): number {
  if (value == null) return 0;
  if (typeof value !== "object") return 1;
  if (Array.isArray(value)) {
    return value.reduce<number>((n, item) => n + countLeaves(item), 0);
  }
  return Object.values(value as Record<string, unknown>).reduce<number>(
    (n, item) => n + countLeaves(item),
    0
  );
}

export function countTokens(tokens: DesignTokens) {
  const colors =
    Object.values(tokens.colors).reduce((n, scale) => n + Object.keys(scale).length, 0) +
    Object.keys(tokens.semantic).length;
  const typography =
    3 +
    Object.keys(tokens.typography.scale).length +
    Object.keys(tokens.typography.weights).length +
    Object.keys(tokens.typographyUsage).length;
  const total =
    countLeaves(tokens.colors) +
    countLeaves(tokens.semantic) +
    countLeaves(tokens.typography) +
    countLeaves(tokens.borderRadius) +
    countLeaves(tokens.shadows) +
    countLeaves(tokens.spacing) +
    countLeaves(tokens.animation) +
    countLeaves(tokens.breakpoints) +
    countLeaves(tokens.zIndex) +
    countLeaves(tokens.opacity) +
    countLeaves(tokens.borderWidth) +
    countLeaves(tokens.letterSpacing) +
    countLeaves(tokens.lineHeight) +
    countLeaves(tokens.components) +
    countLeaves(tokens.typographyUsage) +
    countLeaves(tokens.focus) +
    countLeaves(tokens.sectionSpacing);

  return { colors, typography, total };
}
