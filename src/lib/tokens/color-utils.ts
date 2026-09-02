// Color engine — generates full 50-950 scales from anchor colors
// Uses RGB mixing for reliable, hue-stable color scales

import type { ColorScale } from "./types";

// How much to mix with white (light shades) or dark (dark shades)
// These produce Tailwind-quality scales: tinted lights, rich darks
const LIGHT_MIX: Array<[string, number]> = [
  // [shade, whiteMixAmount] — higher = lighter
  ["50", 0.95],
  ["100", 0.89],
  ["200", 0.78],
  ["300", 0.63],
  ["400", 0.40],
];

const DARK_MIX: Array<[string, number]> = [
  // [shade, darkMixAmount] — higher = darker
  ["600", 0.18],
  ["700", 0.33],
  ["800", 0.48],
  ["900", 0.62],
  ["950", 0.78],
];

function parseHex(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return [0, 0, 0];
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function toHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return `#${clamp(r).toString(16).padStart(2, "0")}${clamp(g).toString(16).padStart(2, "0")}${clamp(b).toString(16).padStart(2, "0")}`;
}

/**
 * Generate a full 50-950 color scale from a single anchor hex color.
 * Light shades mix toward white, dark shades mix toward a deepened anchor.
 * Hue is perfectly stable because we stay in RGB space.
 */
export function generateColorScale(anchorHex: string): ColorScale {
  const [ar, ag, ab] = parseHex(anchorHex);

  const entries: Array<[string, string]> = [];

  // Light shades: mix anchor → white
  for (const [shade, t] of LIGHT_MIX) {
    entries.push([
      shade,
      toHex(
        ar + (255 - ar) * t,
        ag + (255 - ag) * t,
        ab + (255 - ab) * t,
      ),
    ]);
  }

  // 500 = anchor
  entries.push(["500", anchorHex]);

  // Dark shades: mix anchor → deep dark (not pure black, slightly tinted)
  // Using a dark base that's 5% of the anchor color for richness
  const darkR = ar * 0.08;
  const darkG = ag * 0.08;
  const darkB = ab * 0.08;

  for (const [shade, t] of DARK_MIX) {
    entries.push([
      shade,
      toHex(
        ar + (darkR - ar) * t,
        ag + (darkG - ag) * t,
        ab + (darkB - ab) * t,
      ),
    ]);
  }

  return Object.fromEntries(entries) as unknown as ColorScale;
}

/**
 * Calculate relative luminance (WCAG 2.1 definition)
 */
export function relativeLuminance(hex: string): number {
  const [r, g, b] = parseHex(hex);
  const [rs, gs, bs] = [r / 255, g / 255, b / 255].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate WCAG 2.1 contrast ratio between two hex colors.
 */
export function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if two colors meet WCAG AA contrast requirement.
 */
export function meetsWCAG_AA(fg: string, bg: string, largeText = false): boolean {
  const ratio = contrastRatio(fg, bg);
  return largeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Auto-fix a foreground color to meet WCAG AA against a background.
 * Lightens or darkens the foreground until contrast is sufficient.
 */
export function ensureContrast(fg: string, bg: string, minRatio = 4.5): string {
  if (contrastRatio(fg, bg) >= minRatio) return fg;

  const bgLum = relativeLuminance(bg);
  const goLighter = bgLum < 0.5;
  const [r, g, b] = parseHex(fg);

  // Step toward white or black
  for (let i = 1; i <= 50; i++) {
    const t = i * 0.02;
    let nr: number, ng: number, nb: number;
    if (goLighter) {
      nr = r + (255 - r) * t;
      ng = g + (255 - g) * t;
      nb = b + (255 - b) * t;
    } else {
      nr = r * (1 - t);
      ng = g * (1 - t);
      nb = b * (1 - t);
    }
    const candidate = toHex(nr, ng, nb);
    if (contrastRatio(candidate, bg) >= minRatio) {
      return candidate;
    }
  }

  return goLighter ? "#ffffff" : "#000000";
}

/**
 * Simulate color blindness (simplified).
 */
export function simulateColorBlind(
  hex: string,
  type: "protanopia" | "deuteranopia" | "tritanopia"
): string {
  const [r, g, b] = parseHex(hex);
  const rf = r / 255, gf = g / 255, bf = b / 255;

  const matrices: Record<string, number[][]> = {
    protanopia: [
      [0.567, 0.433, 0],
      [0.558, 0.442, 0],
      [0, 0.242, 0.758],
    ],
    deuteranopia: [
      [0.625, 0.375, 0],
      [0.7, 0.3, 0],
      [0, 0.3, 0.7],
    ],
    tritanopia: [
      [0.95, 0.05, 0],
      [0, 0.433, 0.567],
      [0, 0.475, 0.525],
    ],
  };

  const m = matrices[type];
  return toHex(
    (m[0][0] * rf + m[0][1] * gf + m[0][2] * bf) * 255,
    (m[1][0] * rf + m[1][1] * gf + m[1][2] * bf) * 255,
    (m[2][0] * rf + m[2][1] * gf + m[2][2] * bf) * 255,
  );
}
