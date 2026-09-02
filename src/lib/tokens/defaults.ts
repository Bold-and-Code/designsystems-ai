import type {
  SpacingConfig,
  AnimationConfig,
  BorderRadiusConfig,
  ShadowConfig,
  BreakpointsConfig,
  ZIndexConfig,
  OpacityConfig,
  BorderWidthConfig,
  LetterSpacingConfig,
  LineHeightConfig,
  ComponentTokens,
  TypographyUsage,
  FocusConfig,
  SectionSpacing,
} from "./types";

// Shared defaults reused across all presets

export const DEFAULT_SPACING: SpacingConfig = {
  "0": "0px",
  "0.5": "0.125rem",
  "1": "0.25rem",
  "1.5": "0.375rem",
  "2": "0.5rem",
  "2.5": "0.625rem",
  "3": "0.75rem",
  "3.5": "0.875rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "7": "1.75rem",
  "8": "2rem",
  "9": "2.25rem",
  "10": "2.5rem",
  "11": "2.75rem",
  "12": "3rem",
  "14": "3.5rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem",
  "28": "7rem",
  "32": "8rem",
  "36": "9rem",
  "40": "10rem",
  "44": "11rem",
  "48": "12rem",
  "52": "13rem",
  "56": "14rem",
  "60": "15rem",
  "64": "16rem",
  "72": "18rem",
  "80": "20rem",
  "96": "24rem",
};

export const DEFAULT_ANIMATION: AnimationConfig = {
  duration: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
  },
  easing: {
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

export const DEFAULT_SHADOWS: ShadowConfig = {
  none: "none",
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
};

export const DEFAULT_RADIUS: BorderRadiusConfig = {
  none: "0px",
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  full: "9999px",
};

export const DEFAULT_TYPOGRAPHY_SCALE = {
  xs: { size: "0.75rem", lineHeight: "1rem", letterSpacing: "0.01em" },
  sm: { size: "0.875rem", lineHeight: "1.25rem" },
  base: { size: "1rem", lineHeight: "1.5rem" },
  lg: { size: "1.125rem", lineHeight: "1.75rem" },
  xl: { size: "1.25rem", lineHeight: "1.75rem", letterSpacing: "-0.01em" },
  "2xl": { size: "1.5rem", lineHeight: "2rem", letterSpacing: "-0.015em" },
  "3xl": { size: "1.875rem", lineHeight: "2.25rem", letterSpacing: "-0.02em" },
  "4xl": { size: "2.25rem", lineHeight: "2.5rem", letterSpacing: "-0.025em" },
  "5xl": { size: "3rem", lineHeight: "1", letterSpacing: "-0.035em" },
};

export const DEFAULT_WEIGHTS = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

export const DEFAULT_BREAKPOINTS: BreakpointsConfig = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

export const DEFAULT_ZINDEX: ZIndexConfig = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  popover: 1400,
  toast: 1500,
  tooltip: 1600,
};

export const DEFAULT_OPACITY: OpacityConfig = {
  0: 0,
  5: 0.05,
  10: 0.1,
  20: 0.2,
  25: 0.25,
  30: 0.3,
  40: 0.4,
  50: 0.5,
  60: 0.6,
  70: 0.7,
  75: 0.75,
  80: 0.8,
  90: 0.9,
  95: 0.95,
  100: 1,
};

export const DEFAULT_BORDER_WIDTH: BorderWidthConfig = {
  none: "0px",
  thin: "1px",
  default: "1px",
  thick: "2px",
  heavy: "4px",
};

export const DEFAULT_LETTER_SPACING: LetterSpacingConfig = {
  tightest: "-0.035em",
  tighter: "-0.025em",
  tight: "-0.015em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.12em",
};

export const DEFAULT_LINE_HEIGHT: LineHeightConfig = {
  none: 1,
  tight: 1.15,
  snug: 1.3,
  normal: 1.5,
  relaxed: 1.65,
  loose: 1.8,
};

export const DEFAULT_COMPONENTS: ComponentTokens = {
  button: {
    heightSm: "2.5rem",     // 40px
    heightMd: "3rem",       // 48px
    heightLg: "3.5rem",     // 56px
    paddingX: "1.75rem",    // 28px
    paddingXSm: "1.25rem",  // 20px
    fontSize: "0.875rem",   // 14px
    fontSizeSm: "0.8125rem", // 13px
    fontWeight: 500,
    letterSpacing: "0.05em",
    textTransform: "none",
    borderRadius: "0.5rem",
    transition: "transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1)",
    hoverTransform: "scale(0.97)",
  },
  card: {
    padding: "1.5rem",      // 24px
    paddingSm: "1rem",      // 16px
    borderRadius: "0.75rem", // 12px
    borderWidth: "1px",
  },
  input: {
    height: "2.75rem",      // 44px
    paddingX: "0.75rem",    // 12px
    fontSize: "0.875rem",   // 14px
    borderRadius: "0.5rem", // 8px
    borderWidth: "1px",
  },
  badge: {
    paddingX: "0.625rem",   // 10px
    paddingY: "0.25rem",    // 4px
    fontSize: "0.75rem",    // 12px
    fontWeight: 500,
    borderRadius: "9999px",
    letterSpacing: "0.02em",
    textTransform: "none",
  },
  avatar: {
    sizeSm: "2rem",         // 32px
    sizeMd: "2.5rem",       // 40px
    sizeLg: "3rem",         // 48px
    borderRadius: "9999px",
  },
};

export const DEFAULT_TYPOGRAPHY_USAGE: TypographyUsage = {
  display: { weight: 300, size: "3.5rem", lineHeight: 1.0, letterSpacing: "-0.035em" },
  h1:      { weight: 400, size: "3rem", lineHeight: 1.1, letterSpacing: "-0.025em" },
  h2:      { weight: 400, size: "2.25rem", lineHeight: 1.15, letterSpacing: "-0.02em" },
  h3:      { weight: 500, size: "1.875rem", lineHeight: 1.2, letterSpacing: "-0.015em" },
  h4:      { weight: 500, size: "1.5rem", lineHeight: 1.25, letterSpacing: "-0.01em" },
  h5:      { weight: 600, size: "1.25rem", lineHeight: 1.3, letterSpacing: "0em" },
  h6:      { weight: 600, size: "1.125rem", lineHeight: 1.35, letterSpacing: "0em" },
  body:      { weight: 400, size: "1rem", lineHeight: 1.5, letterSpacing: "0em" },
  bodyLarge: { weight: 400, size: "1.125rem", lineHeight: 1.65, letterSpacing: "-0.01em" },
  bodySmall: { weight: 400, size: "0.875rem", lineHeight: 1.5, letterSpacing: "0em" },
  caption:   { weight: 400, size: "0.75rem", lineHeight: 1.4, letterSpacing: "0.01em" },
  button:    { weight: 500, size: "0.875rem", lineHeight: 1.42, letterSpacing: "0.05em", textTransform: "none" },
  label:     { weight: 500, size: "0.875rem", lineHeight: 1.4, letterSpacing: "0.04em", textTransform: "none" },
  overline:  { weight: 600, size: "0.75rem", lineHeight: 1.5, letterSpacing: "0.12em", textTransform: "uppercase" },
};

export const DEFAULT_FOCUS: FocusConfig = {
  ringWidth: "2px",
  ringOffset: "2px",
  ringColor: "var(--ring)",
  outlineStyle: "2px solid var(--ring)",
};

export const DEFAULT_SECTION_SPACING: SectionSpacing = {
  paddingSm: "3.25rem",    // 52px
  paddingMd: "5rem",       // 80px
  paddingLg: "6rem",       // 96px
  paddingSmTablet: "3rem", // 48px
  paddingMdTablet: "4rem", // 64px
  paddingLgTablet: "5rem", // 80px
  paddingSmMobile: "2rem", // 32px
  paddingMdMobile: "3rem", // 48px
  paddingLgMobile: "4rem", // 64px
};
