// Core token type system for DesignSystems.ai
// Aligns with W3C DTCG spec (2025.10) and shadcn/ui CSS variable naming

// --- Primitive Types ---

export interface ColorToken {
  $type: "color";
  $value: string; // hex sRGB (#rrggbb)
  $description?: string;
}

export interface DimensionToken {
  $type: "dimension";
  $value: string; // e.g. "0.5rem", "4px"
  $description?: string;
}

export interface FontFamilyToken {
  $type: "fontFamily";
  $value: string | string[]; // e.g. "'Inter', sans-serif"
  $description?: string;
}

export interface FontWeightToken {
  $type: "fontWeight";
  $value: number; // 100-900
  $description?: string;
}

export interface DurationToken {
  $type: "duration";
  $value: string; // e.g. "200ms"
  $description?: string;
}

export interface CubicBezierToken {
  $type: "cubicBezier";
  $value: [number, number, number, number];
  $description?: string;
}

export interface NumberToken {
  $type: "number";
  $value: number;
  $description?: string;
}

export interface ShadowToken {
  $type: "shadow";
  $value: {
    offsetX: string;
    offsetY: string;
    blur: string;
    spread: string;
    color: string;
  } | Array<{
    offsetX: string;
    offsetY: string;
    blur: string;
    spread: string;
    color: string;
  }>;
  $description?: string;
}

// --- Color Scale (50-950) ---

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

// --- Semantic Colors (shadcn-compatible) ---

export interface SemanticColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}

// --- Typography ---

export interface TypographyScale {
  xs: { size: string; lineHeight: string; letterSpacing?: string };
  sm: { size: string; lineHeight: string; letterSpacing?: string };
  base: { size: string; lineHeight: string; letterSpacing?: string };
  lg: { size: string; lineHeight: string; letterSpacing?: string };
  xl: { size: string; lineHeight: string; letterSpacing?: string };
  "2xl": { size: string; lineHeight: string; letterSpacing?: string };
  "3xl": { size: string; lineHeight: string; letterSpacing?: string };
  "4xl": { size: string; lineHeight: string; letterSpacing?: string };
  "5xl": { size: string; lineHeight: string; letterSpacing?: string };
}

export interface TypographyConfig {
  headingFamily: string; // e.g. "'Space Grotesk', sans-serif"
  bodyFamily: string;    // e.g. "'Inter', sans-serif"
  monoFamily: string;    // e.g. "'JetBrains Mono', monospace"
  scale: TypographyScale;
  weights: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

// --- Border Radius ---

export interface BorderRadiusConfig {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  full: string;
}

// --- Shadows ---

export interface ShadowConfig {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  inner: string;
}

// --- Spacing ---

export interface SpacingConfig {
  [key: string]: string; // e.g. "0": "0px", "1": "0.25rem", "2": "0.5rem"
}

// --- Animation ---

export interface AnimationConfig {
  duration: {
    fast: string;
    normal: string;
    slow: string;
  };
  easing: {
    easeIn: string;
    easeOut: string;
    easeInOut: string;
  };
}

// --- The Complete Design Token Set ---

export interface DesignTokens {
  meta: {
    name: string;
    description: string;
    mood: string[];
    industry: string;
    generatedAt?: string;
  };

  colors: {
    primary: ColorScale;
    secondary: ColorScale;
    accent: ColorScale;
    neutral: ColorScale;
    success: ColorScale;
    warning: ColorScale;
    error: ColorScale;
    info: ColorScale;
  };

  semantic: SemanticColors;

  typography: TypographyConfig;

  borderRadius: BorderRadiusConfig;

  shadows: ShadowConfig;

  spacing: SpacingConfig;

  animation: AnimationConfig;
}

// --- Google Font Reference ---

export interface GoogleFontRef {
  family: string;
  weights: number[];
  url: string; // Google Fonts CSS URL
}

// --- Preset metadata ---

export interface PresetMeta {
  id: string;
  name: string;
  description: string;
  accent: string; // hex color for the switcher circle
  fonts: GoogleFontRef[];
  tokens: DesignTokens;
}
