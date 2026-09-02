import { lookup } from "node:dns/promises";

const MAX_URL_LENGTH = 2048;
const MAX_REDIRECTS = 2;
const ALLOWED_PORTS = new Set(["", "80", "443"]);

function ipv4Octets(host: string): number[] | null {
  const m = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (!m) return null;
  const octets = m.slice(1).map(Number);
  if (octets.some((n) => n > 255)) return null;
  return octets;
}

export function isPrivateAddress(host: string): boolean {
  const h = host.toLowerCase().replace(/^\[|\]$/g, "");
  if (
    h === "localhost" ||
    h === "127.0.0.1" ||
    h === "0.0.0.0" ||
    h === "::1" ||
    h === "metadata.google.internal" ||
    h.endsWith(".local") ||
    h.endsWith(".internal") ||
    h.endsWith(".localhost")
  ) {
    return true;
  }

  const v4 = ipv4Octets(h);
  if (v4) {
    const [a, b] = v4;
    if (a === 0 || a === 10 || a === 127) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 100 && b >= 64 && b <= 127) return true;
  }

  // IPv6 unique-local / loopback / link-local
  if (h.includes(":")) {
    if (h === "::" || h.startsWith("fe80:") || h.startsWith("fc") || h.startsWith("fd")) {
      return true;
    }
    if (h.startsWith("::ffff:")) {
      return isPrivateAddress(h.slice("::ffff:".length));
    }
  }

  return false;
}

export async function assertSafeHttpUrl(raw: string): Promise<URL> {
  if (typeof raw !== "string" || raw.length === 0 || raw.length > MAX_URL_LENGTH) {
    throw new Error("Enter a valid http(s) URL");
  }

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    throw new Error("Enter a valid http(s) URL");
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("Only http and https URLs are allowed");
  }
  if (parsed.username || parsed.password) {
    throw new Error("URLs with credentials are not allowed");
  }
  if (!ALLOWED_PORTS.has(parsed.port)) {
    throw new Error("Only ports 80 and 443 are allowed");
  }
  if (isPrivateAddress(parsed.hostname)) {
    throw new Error("That host cannot be fetched");
  }

  try {
    const { address } = await lookup(parsed.hostname);
    if (isPrivateAddress(address)) {
      throw new Error("That host cannot be fetched");
    }
  } catch (err) {
    if (err instanceof Error && err.message === "That host cannot be fetched") {
      throw err;
    }
    throw new Error("Could not resolve that host");
  }

  return parsed;
}

export async function fetchPublicHtml(raw: string, timeoutMs = 10000): Promise<string> {
  let current = await assertSafeHttpUrl(raw);
  const MAX_BYTES = 1_500_000;

  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    const response = await fetch(current.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; DS.ai/1.0; +https://ds.ai)",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "manual",
      signal: AbortSignal.timeout(timeoutMs),
    });

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location) throw new Error("Redirect was missing a location");
      current = await assertSafeHttpUrl(new URL(location, current).toString());
      continue;
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const contentType = response.headers.get("content-type") || "";
    if (contentType && !contentType.includes("html") && !contentType.includes("text/")) {
      throw new Error("That URL did not return HTML");
    }

    const buffer = await response.arrayBuffer();
    if (buffer.byteLength > MAX_BYTES) {
      throw new Error("Page is too large to extract");
    }
    return new TextDecoder("utf-8", { fatal: false }).decode(buffer);
  }

  throw new Error("Too many redirects");
}
