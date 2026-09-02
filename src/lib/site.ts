export const SITE_NAME = "DS.ai";
export const SITE_TAGLINE = "AI-powered design system generator";
export const SITE_DESCRIPTION =
  "Generate production-ready design tokens from your brand identity. Export to CSS, Tailwind, DTCG, and JSON.";

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
