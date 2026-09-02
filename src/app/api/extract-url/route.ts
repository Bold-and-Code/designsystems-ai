import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/api/rate-limit";
import { fetchPublicHtml } from "@/lib/api/safe-url";

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`extract:${ip}`, 20, 60 * 60 * 1000);
  if (!limited.ok) {
    return jsonError("Rate limit reached. Try again later.", 429);
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const url = typeof raw === "object" && raw && "url" in raw ? (raw as { url: unknown }).url : null;
  if (!url || typeof url !== "string") {
    return jsonError("URL is required", 400);
  }

  try {
    const html = await fetchPublicHtml(url);
    const colors = extractColors(html);
    const fonts = extractFonts(html);
    return NextResponse.json({ colors, fonts });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to extract";
    return jsonError(message, 400);
  }
}

function extractColors(html: string): string[] {
  const colorSet = new Set<string>();
  const slice = html.slice(0, 1_500_000);

  const hexRegex = /#([0-9a-fA-F]{6})\b/g;
  let match;
  while ((match = hexRegex.exec(slice)) !== null) {
    colorSet.add(`#${match[1].toLowerCase()}`);
    if (colorSet.size > 64) break;
  }

  const themeColorMatch = slice.match(
    /<meta[^>]*name=["']theme-color["'][^>]*content=["']([^"']+)["']/i
  );
  if (themeColorMatch) {
    const tc = themeColorMatch[1].trim();
    if (tc.match(/^#[0-9a-fA-F]{6}$/)) {
      colorSet.add(tc.toLowerCase());
    }
  }

  const rgbRegex = /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/g;
  let rgbCount = 0;
  while ((match = rgbRegex.exec(slice)) !== null && rgbCount < 80) {
    rgbCount += 1;
    const r = Math.min(255, parseInt(match[1], 10)).toString(16).padStart(2, "0");
    const g = Math.min(255, parseInt(match[2], 10)).toString(16).padStart(2, "0");
    const b = Math.min(255, parseInt(match[3], 10)).toString(16).padStart(2, "0");
    colorSet.add(`#${r}${g}${b}`);
  }

  const boring = new Set([
    "#000000",
    "#ffffff",
    "#333333",
    "#666666",
    "#999999",
    "#cccccc",
    "#f5f5f5",
    "#eeeeee",
  ]);
  return Array.from(colorSet)
    .filter((c) => !boring.has(c))
    .slice(0, 10);
}

function extractFonts(html: string): string[] {
  const fontSet = new Set<string>();
  const slice = html.slice(0, 1_500_000);
  const GENERIC = new Set([
    "sans-serif",
    "serif",
    "monospace",
    "cursive",
    "system-ui",
    "inherit",
    "-apple-system",
    "BlinkMacSystemFont",
  ]);

  const gfRegex = /fonts\.googleapis\.com\/css2?\?family=([^"&]+)/g;
  let match;
  while ((match = gfRegex.exec(slice)) !== null) {
    const families = decodeURIComponent(match[1]).split("|");
    for (const fam of families) {
      const name = fam.split(":")[0].replace(/\+/g, " ").trim();
      if (name && name.length < 80) fontSet.add(name);
    }
  }

  const ffRegex = /font-family:\s*["']?([^"';},]+)/gi;
  while ((match = ffRegex.exec(slice)) !== null) {
    const family = match[1].trim().replace(/["']/g, "").split(",")[0].trim();
    if (family && family.length < 80 && !GENERIC.has(family)) {
      fontSet.add(family);
    }
  }

  return Array.from(fontSet).slice(0, 5);
}
