// System prompt and user prompt builder for design token generation

export interface GenerationInputs {
  industry: string;
  mood: string[];
  brandColor?: string;
  typographyStyle?: string;
  roundedness?: string;
  reference?: string;
  context?: string;
  extractedColors?: string[];
  extractedFonts?: string[];
}

export const SYSTEM_PROMPT = `You are a world-class design system architect. You create cohesive, production-ready design token sets for brands.

Your expertise includes:
- Color theory: complementary, analogous, triadic, and split-complementary harmonies
- Accessibility: WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Typography pairing: matching heading and body fonts for readability and personality
- Industry conventions: knowing which visual styles resonate in each sector

RULES:
1. All colors must be valid hex (#rrggbb). No shorthand.
2. Foreground/background pairs MUST have at least 4.5:1 contrast ratio.
3. Use only Google Fonts that are widely available (Inter, Space Grotesk, Playfair Display, DM Sans, Nunito, Poppins, Roboto, Lora, Merriweather, Source Sans 3, JetBrains Mono, Fira Code, IBM Plex Mono, etc.)
4. Border radius values must be CSS-valid (e.g. "0.25rem", "0px", "1rem").
5. semantic.primary should match or be very close to colors.primary.
6. semantic.destructive should be a red/danger tone, regardless of brand colors.
7. Muted colors should be subtle, desaturated versions of the background.
8. Border and input colors should be subtle — visible but not dominant.
9. Ring color should match or be close to the primary color.
10. For dark themes: background should be dark, foreground light. For light themes: the reverse.
11. Card and popover surfaces should be slightly elevated from background (lighter in dark themes, slightly different in light themes).

Generate a design system that feels intentional and cohesive — as if a senior designer spent days crafting it.`;

export function buildUserPrompt(inputs: GenerationInputs): string {
  const parts: string[] = [];

  parts.push(`Create a design token set for a ${inputs.industry} brand.`);
  parts.push(`Mood: ${inputs.mood.join(", ")}.`);

  if (inputs.brandColor) {
    parts.push(`Primary brand color: ${inputs.brandColor}. Build the palette around this.`);
  }

  if (inputs.typographyStyle && inputs.typographyStyle !== "Let AI decide") {
    const styleMap: Record<string, string> = {
      "Sans-serif": "Use clean sans-serif fonts for both headings and body.",
      "Serif": "Use elegant serif fonts for headings, readable serif or sans for body.",
      "Monospace": "Use monospace fonts throughout for a technical/dev aesthetic.",
      "Mixed": "Pair a distinctive heading font with a clean body font for contrast.",
    };
    parts.push(styleMap[inputs.typographyStyle] || "");
  }

  if (inputs.roundedness) {
    const radiusMap: Record<string, string> = {
      sharp: "Use sharp corners (0px or minimal radius) for a precise, architectural feel.",
      moderate: "Use moderate border radius (0.375rem-0.5rem) for a balanced, modern look.",
      rounded: "Use generous border radius (0.75rem-1rem+) for a soft, friendly feel.",
    };
    parts.push(radiusMap[inputs.roundedness] || "");
  }

  if (inputs.reference) {
    parts.push(`Reference brands for inspiration: ${inputs.reference}. Capture their visual energy, don't copy.`);
  }

  if (inputs.context) {
    parts.push(`Additional context: ${inputs.context}`);
  }

  if (inputs.extractedColors?.length) {
    parts.push(`Existing brand colors extracted from their website/logo: ${inputs.extractedColors.join(", ")}. Incorporate these into the palette.`);
  }

  if (inputs.extractedFonts?.length) {
    parts.push(`Fonts currently used on their site: ${inputs.extractedFonts.join(", ")}. Consider keeping or evolving these.`);
  }

  // Decide theme direction based on mood
  const darkMoods = ["modern", "bold", "technical", "dark", "midnight"];
  const isDark = inputs.mood.some((m) => darkMoods.includes(m.toLowerCase()));
  if (isDark) {
    parts.push("Lean toward a dark theme (dark background, light text) for this brand.");
  }

  return parts.filter(Boolean).join("\n");
}
