"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardCopy, Check } from "lucide-react";
import { useThemeTokens } from "@/providers/theme-token-provider";
import { cn } from "@/lib/utils";

type FormatId = "dtcg" | "css" | "tailwind" | "json";

const TABS: { id: FormatId; label: string }[] = [
  { id: "dtcg", label: "DTCG JSON" },
  { id: "css", label: "CSS Variables" },
  { id: "tailwind", label: "Tailwind v4" },
  { id: "json", label: "Flat JSON" },
];

function useLiveCode(formatId: FormatId) {
  const { tokens } = useThemeTokens();
  const p = tokens.colors.primary;
  const s = tokens.semantic;
  const t = tokens.typography;

  switch (formatId) {
    case "dtcg":
      return `{
  "color": {
    "$type": "color",
    "primary": {
      "50":  { "$value": "${p[50]}" },
      "100": { "$value": "${p[100]}" },
      "200": { "$value": "${p[200]}" },
      "300": { "$value": "${p[300]}" },
      "400": { "$value": "${p[400]}" },
      "500": { "$value": "${p[500]}" },
      "600": { "$value": "${p[600]}" },
      "700": { "$value": "${p[700]}" },
      "800": { "$value": "${p[800]}" },
      "900": { "$value": "${p[900]}" },
      "950": { "$value": "${p[950]}" }
    }
  }
}`;

    case "css":
      return `:root {
  /* Semantic Colors */
  --primary: ${s.primary};
  --primary-foreground: ${s.primaryForeground};
  --background: ${s.background};
  --foreground: ${s.foreground};
  --card: ${s.card};
  --card-foreground: ${s.cardForeground};
  --border: ${s.border};
  --ring: ${s.ring};
  --destructive: ${s.destructive};

  /* Typography */
  --font-heading: ${t.headingFamily};
  --font-body: ${t.bodyFamily};

  /* Radius */
  --radius: ${tokens.borderRadius.md};
}`;

    case "tailwind":
      return `@theme {
  --color-primary: ${s.primary};
  --color-primary-foreground: ${s.primaryForeground};
  --color-background: ${s.background};
  --color-foreground: ${s.foreground};
  --color-card: ${s.card};
  --color-border: ${s.border};
  --color-ring: ${s.ring};

  --font-heading: ${t.headingFamily};
  --font-body: ${t.bodyFamily};
  --font-mono: ${t.monoFamily};

  --radius-md: ${tokens.borderRadius.md};
  --radius-lg: ${tokens.borderRadius.lg};
}`;

    case "json":
      return `{
  "color.primary.50": "${p[50]}",
  "color.primary.100": "${p[100]}",
  "color.primary.500": "${p[500]}",
  "color.primary.900": "${p[900]}",
  "color.background": "${s.background}",
  "color.foreground": "${s.foreground}",
  "color.primary": "${s.primary}",
  "font.heading": "${t.headingFamily}",
  "font.body": "${t.bodyFamily}",
  "radius.md": "${tokens.borderRadius.md}",
  "radius.lg": "${tokens.borderRadius.lg}"
}`;
  }
}

function SyntaxLine({ line }: { line: string }) {
  const isComment = line.trim().startsWith("/*") || line.trim().startsWith("//");
  if (isComment) {
    return (
      <span style={{ color: "var(--muted-foreground)", opacity: 0.6 }}>
        {line}
      </span>
    );
  }

  const colonIdx = line.indexOf(":");
  if (colonIdx > -1 && !line.trim().startsWith("{") && !line.trim().startsWith("}")) {
    const keyPart = line.slice(0, colonIdx);
    const valuePart = line.slice(colonIdx);
    return (
      <>
        <span style={{ color: "var(--primary)" }}>{keyPart}</span>
        <span style={{ color: "var(--muted-foreground)" }}>:</span>
        <span style={{ color: "var(--accent-foreground)" }}>
          {valuePart.slice(1)}
        </span>
      </>
    );
  }

  return (
    <span style={{ color: "var(--muted-foreground)" }}>{line}</span>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const lines = code.split("\n");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="relative rounded-xl border overflow-hidden"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
        borderRadius: "var(--radius-xl)",
      }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--destructive)", opacity: 0.7 }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--primary)", opacity: 0.4 }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--primary)", opacity: 0.2 }} />
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all hover:opacity-80"
          style={{
            color: "var(--muted-foreground)",
            backgroundColor: "var(--muted)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied
            </>
          ) : (
            <>
              <ClipboardCopy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto p-4">
        <pre
          className="text-[13px] leading-relaxed"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span
                className="select-none w-8 text-right mr-4 shrink-0 tabular-nums"
                style={{ color: "var(--muted-foreground)", opacity: 0.3 }}
              >
                {i + 1}
              </span>
              <SyntaxLine line={line} />
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

export function ExportFormats() {
  const [activeTab, setActiveTab] = useState<FormatId>("dtcg");
  const code = useLiveCode(activeTab);

  return (
    <section id="formats" className="py-24 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <p
            className="text-xs uppercase tracking-[0.2em] font-medium mb-3"
            style={{ color: "var(--muted-foreground)" }}
          >
            Production-ready output
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.02em]"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-heading)" }}
          >
            Export Formats
          </h2>
          <p
            className="mt-4 text-base sm:text-lg max-w-lg mx-auto"
            style={{ color: "var(--muted-foreground)" }}
          >
            Production-ready files in the format you need. Drop into your project and ship.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Tabs */}
          <div
            className="flex gap-1 p-1 rounded-lg mb-6 w-fit mx-auto"
            style={{
              backgroundColor: "var(--muted)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                )}
                style={{
                  backgroundColor:
                    activeTab === tab.id ? "var(--card)" : "transparent",
                  color:
                    activeTab === tab.id
                      ? "var(--foreground)"
                      : "var(--muted-foreground)",
                  boxShadow:
                    activeTab === tab.id ? "var(--shadow-sm)" : "none",
                  borderRadius: "var(--radius)",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Code block */}
          <CodeBlock code={code} />

          {/* Coming soon */}
          <p
            className="text-center text-xs mt-6"
            style={{ color: "var(--muted-foreground)" }}
          >
            More formats coming: SCSS, Swift, Kotlin, Figma Tokens
          </p>
        </motion.div>
      </div>
    </section>
  );
}
