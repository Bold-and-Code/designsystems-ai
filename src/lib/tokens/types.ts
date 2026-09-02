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

// --- Breakpoints ---

export interface BreakpointsConfig {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
}

// --- Z-Index ---

export interface ZIndexConfig {
  hide: number;
  base: number;
  dropdown: number;
  sticky: number;
  overlay: number;
  modal: number;
  popover: number;
  toast: number;
  tooltip: number;
}

// --- Opacity ---

export interface OpacityConfig {
  0: number;
  5: number;
  10: number;
  20: number;
  25: number;
  30: number;
  40: number;
  50: number;
  60: number;
  70: number;
  75: number;
  80: number;
  90: number;
  95: number;
  100: number;
}

// --- Border Width ---

export interface BorderWidthConfig {
  none: string;
  thin: string;
  default: string;
  thick: string;
  heavy: string;
}

// --- Letter Spacing ---

export interface LetterSpacingConfig {
  tightest: string; // display headings
  tighter: string;  // h1-h2
  tight: string;    // h3-h4
  normal: string;   // body
  wide: string;     // labels
  wider: string;    // all-caps
  widest: string;   // micro text
}

// --- Line Height ---

export interface LineHeightConfig {
  none: number;
  tight: number;     // display/h1
  snug: number;      // h2-h4
  normal: number;    // body
  relaxed: number;   // body generous
  loose: number;     // captions
}

// --- Component Tokens ---

export interface ComponentTokens {
  button: {
    heightSm: string;
    heightMd: string;
    heightLg: string;
    paddingX: string;
    paddingXSm: string;
    fontSize: string;
    fontSizeSm: string;
    fontWeight: number;
    letterSpacing: string;
    textTransform: string;
    borderRadius: string;
    transition: string;
    hoverTransform: string;
  };
  card: {
    padding: string;
    paddingSm: string;
    borderRadius: string;
    borderWidth: string;
  };
  input: {
    height: string;
    paddingX: string;
    fontSize: string;
    borderRadius: string;
    borderWidth: string;
  };
  badge: {
    paddingX: string;
    paddingY: string;
    fontSize: string;
    fontWeight: number;
    borderRadius: string;
    letterSpacing: string;
    textTransform: string;
  };
  avatar: {
    sizeSm: string;
    sizeMd: string;
    sizeLg: string;
    borderRadius: string;
  };
}

// --- Typography Usage (per-element rules) ---

export interface TypographyUsageRule {
  weight: number;
  size: string;
  lineHeight: number;
  letterSpacing: string;
  textTransform?: string;
}

export interface TypographyUsage {
  display: TypographyUsageRule;
  h1: TypographyUsageRule;
  h2: TypographyUsageRule;
  h3: TypographyUsageRule;
  h4: TypographyUsageRule;
  h5: TypographyUsageRule;
  h6: TypographyUsageRule;
  body: TypographyUsageRule;
  bodyLarge: TypographyUsageRule;
  bodySmall: TypographyUsageRule;
  caption: TypographyUsageRule;
  button: TypographyUsageRule;
  label: TypographyUsageRule;
  overline: TypographyUsageRule;
}

// --- Focus / Interaction ---

export interface FocusConfig {
  ringWidth: string;
  ringOffset: string;
  ringColor: string;
  outlineStyle: string;
}

// --- Section Spacing (responsive) ---

export interface SectionSpacing {
  paddingSm: string;
  paddingMd: string;
  paddingLg: string;
  paddingSmTablet: string;
  paddingMdTablet: string;
  paddingLgTablet: string;
  paddingSmMobile: string;
  paddingMdMobile: string;
  paddingLgMobile: string;
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

  breakpoints: BreakpointsConfig;

  zIndex: ZIndexConfig;

  opacity: OpacityConfig;

  borderWidth: BorderWidthConfig;

  letterSpacing: LetterSpacingConfig;

  lineHeight: LineHeightConfig;

  components: ComponentTokens;

  typographyUsage: TypographyUsage;

  focus: FocusConfig;

  sectionSpacing: SectionSpacing;
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
