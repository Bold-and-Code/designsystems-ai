"use client";

import { useState } from "react";
import { Download, Check, Palette, Type, Hash } from "lucide-react";
import { useThemeTokens } from "@/providers/theme-token-provider";
import type { DesignTokens } from "@/lib/tokens/types";

const FORMATS = [
  { id: "dtcg", label: "DTCG JSON", ext: ".tokens.json" },
  { id: "css", label: "CSS Variables", ext: "variables.css" },
  { id: "tailwind", label: "Tailwind v4", ext: "theme.css" },
  { id: "json", label: "Flat JSON", ext: "tokens.json" },
] as const;

interface ExportPanelProps {
  generationState: "idle" | "generating" | "complete";
  generatedTokens: DesignTokens | null;
}

export function ExportPanel({ generationState, generatedTokens }: ExportPanelProps) {
  const { tokens } = useThemeTokens();
  const t = generatedTokens || tokens;
  const [selectedFormats, setSelectedFormats] = useState<Set<string>>(
    new Set(FORMATS.map((f) => f.id))
  );
  const [systemName, setSystemName] = useState("");
  const [previewFormat, setPreviewFormat] = useState<string>("dtcg");

  const displayName = systemName || t.meta.name;

  const toggleFormat = (id: string) => {
    setSelectedFormats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Count tokens
  const colorCount = Object.keys(t.colors).length * 11; // 8 scales * 11 shades
  const semanticCount = Object.keys(t.semantic).length;
  const typoCount = Object.keys(t.typography.scale).length + 3; // scale + 3 families
  const totalCount = colorCount + semanticCount + typoCount + 7 + 7 + 3; // radius + shadows + animation

  if (generationState !== "complete") {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center">
          <Download
            className="w-8 h-8 mx-auto mb-3"
            style={{ color: "var(--muted-foreground)", opacity: 0.3 }}
          />
          <p
            className="text-sm font-medium"
            style={{ color: "var(--muted-foreground)" }}
          >
            Generate a design system first
          </p>
          <p
            className="text-xs mt-1"
            style={{ color: "var(--muted-foreground)", opacity: 0.6 }}
          >
            Your export options will appear here
          </p>
        </div>
      </div>
    );
  }

  const getPreviewCode = (): string => {
    const s = t.semantic;
    switch (previewFormat) {
      case "dtcg":
        return `"color": {
  "$type": "color",
  "primary": {
    "500": { "$value": "${t.colors.primary[500]}" },
    "600": { "$value": "${t.colors.primary[600]}" }
  }
}`;
      case "css":
        return `:root {
  --primary: ${s.primary};
  --background: ${s.background};
  --foreground: ${s.foreground};
  --border: ${s.border};
}`;
      case "tailwind":
        return `@theme {
  --color-primary: ${s.primary};
  --color-background: ${s.background};
  --font-heading: ${t.typography.headingFamily.split(",")[0]};
}`;
      case "json":
        return `{
  "color.primary.500": "${t.colors.primary[500]}",
  "color.background": "${s.background}",
  "font.heading": "${t.typography.headingFamily.split(",")[0]}"
}`;
      default:
        return "";
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* System name */}
        <div>
          <label
            className="text-[10px] uppercase tracking-[0.15em] font-medium mb-1.5 block"
            style={{ color: "var(--muted-foreground)" }}
          >
            System name
          </label>
          <input
            type="text"
            value={systemName}
            onChange={(e) => setSystemName(e.target.value)}
            placeholder={t.meta.name}
            className="w-full px-3 py-2 text-sm border outline-none"
            style={{
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
              borderRadius: "var(--radius-sm)",
            }}
          />
        </div>

        {/* Format selection */}
        <div>
          <label
            className="text-[10px] uppercase tracking-[0.15em] font-medium mb-2 block"
            style={{ color: "var(--muted-foreground)" }}
          >
            Export formats
          </label>
          <div className="space-y-1.5">
            {FORMATS.map((fmt) => {
              const checked = selectedFormats.has(fmt.id);
              return (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => {
                    toggleFormat(fmt.id);
                    setPreviewFormat(fmt.id);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md border text-left transition-all"
                  style={{
                    backgroundColor: checked ? "var(--accent)" : "transparent",
                    borderColor: checked ? "var(--primary)" : "var(--border)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-sm border flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: checked ? "var(--primary)" : "transparent",
                      borderColor: checked ? "var(--primary)" : "var(--border)",
                      borderRadius: "2px",
                    }}
                  >
                    {checked && (
                      <Check className="w-3 h-3" style={{ color: "var(--primary-foreground)" }} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium" style={{ color: "var(--foreground)" }}>
                      {fmt.label}
                    </p>
                    <p className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>
                      {fmt.ext}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick preview */}
        <div>
          <label
            className="text-[10px] uppercase tracking-[0.15em] font-medium mb-1.5 block"
            style={{ color: "var(--muted-foreground)" }}
          >
            Preview
          </label>
          <div
            className="rounded-md border p-3 overflow-x-auto"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <pre
              className="text-[11px] leading-relaxed whitespace-pre"
              style={{ fontFamily: "var(--font-mono)", color: "var(--foreground)" }}
            >
              {getPreviewCode()}
            </pre>
          </div>
        </div>

        {/* Token stats */}
        <div
          className="rounded-md border p-3 space-y-2"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          <p
            className="text-[10px] uppercase tracking-[0.15em] font-medium"
            style={{ color: "var(--muted-foreground)" }}
          >
            Token stats
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Palette, label: "Colors", count: colorCount + semanticCount },
              { icon: Type, label: "Typography", count: typoCount },
              { icon: Hash, label: "Total", count: totalCount },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon
                  className="w-3.5 h-3.5 mx-auto mb-1"
                  style={{ color: "var(--muted-foreground)" }}
                />
                <p
                  className="text-base font-bold tabular-nums"
                  style={{ color: "var(--foreground)" }}
                >
                  {stat.count}
                </p>
                <p className="text-[9px]" style={{ color: "var(--muted-foreground)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Download button */}
      <div className="shrink-0 p-4 border-t" style={{ borderColor: "var(--border)" }}>
        <button
          type="button"
          onClick={() => alert("Export coming soon — ZIP generation will be wired next.")}
          disabled={selectedFormats.size === 0}
          className="w-full py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-40"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
            borderRadius: "var(--radius)",
          }}
        >
          <Download className="w-4 h-4" />
          Download ZIP
        </button>
        <p
          className="text-[10px] text-center mt-2"
          style={{ color: "var(--muted-foreground)" }}
        >
          {selectedFormats.size} format{selectedFormats.size !== 1 ? "s" : ""} selected
        </p>
      </div>
    </div>
  );
}
