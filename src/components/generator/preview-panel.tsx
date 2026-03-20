"use client";

import { Loader2 } from "lucide-react";
import { useThemeTokens } from "@/providers/theme-token-provider";
import type { DesignTokens } from "@/lib/tokens/types";

const SCALE_NAMES = ["primary", "secondary", "accent", "neutral", "success", "warning", "error", "info"] as const;
const SHADES = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"] as const;

interface PreviewPanelProps {
  generationState: "idle" | "generating" | "complete";
  generatedTokens: DesignTokens | null;
}

export function PreviewPanel({ generationState, generatedTokens }: PreviewPanelProps) {
  const { tokens } = useThemeTokens();
  const t = generatedTokens || tokens;

  if (generationState === "idle") {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div
          className="text-center border-2 border-dashed rounded-xl p-12 max-w-md"
          style={{ borderColor: "var(--border)", borderRadius: "var(--radius-xl)" }}
        >
          <p
            className="text-lg font-medium mb-2"
            style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-heading)" }}
          >
            Your design system will appear here
          </p>
          <p className="text-sm" style={{ color: "var(--muted-foreground)", opacity: 0.6 }}>
            Answer the questions on the left and hit Generate
          </p>
        </div>
      </div>
    );
  }

  if (generationState === "generating") {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <Loader2
            className="w-8 h-8 animate-spin mx-auto"
            style={{ color: "var(--primary)" }}
          />
          <p
            className="text-sm font-medium"
            style={{ color: "var(--foreground)" }}
          >
            Generating your design system...
          </p>
          <p
            className="text-xs"
            style={{ color: "var(--muted-foreground)" }}
          >
            Crafting color scales, typography, and tokens
          </p>
        </div>
      </div>
    );
  }

  // Complete state
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-8 max-w-3xl mx-auto">
        {/* System name */}
        <div>
          <p
            className="text-[10px] uppercase tracking-[0.15em] font-medium mb-1"
            style={{ color: "var(--muted-foreground)" }}
          >
            Generated Design System
          </p>
          <h2
            className="text-2xl font-bold tracking-tight"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-heading)" }}
          >
            {t.meta.name}
          </h2>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
            {t.meta.description}
          </p>
        </div>

        {/* Color Palette */}
        <section>
          <h3
            className="text-xs uppercase tracking-[0.15em] font-medium mb-3"
            style={{ color: "var(--muted-foreground)" }}
          >
            Color Palette
          </h3>
          <div className="space-y-2">
            {SCALE_NAMES.map((name) => {
              const scale = t.colors[name];
              if (!scale) return null;
              return (
                <div key={name} className="flex items-center gap-3">
                  <span
                    className="text-[10px] font-medium w-16 shrink-0 capitalize tabular-nums"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {name}
                  </span>
                  <div className="flex flex-1 gap-px rounded-md overflow-hidden">
                    {SHADES.map((shade) => (
                      <div
                        key={shade}
                        className="flex-1 h-6"
                        style={{ backgroundColor: scale[shade] }}
                        title={`${name}-${shade}: ${scale[shade]}`}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Typography */}
        <section>
          <h3
            className="text-xs uppercase tracking-[0.15em] font-medium mb-3"
            style={{ color: "var(--muted-foreground)" }}
          >
            Typography
          </h3>
          <div
            className="rounded-lg border p-4 space-y-3"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "var(--radius)" }}
          >
            <div className="flex items-baseline gap-4">
              <span
                className="text-4xl font-bold"
                style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
              >
                Aa
              </span>
              <div>
                <p className="text-xs font-medium" style={{ color: "var(--foreground)" }}>
                  {t.typography.headingFamily.replace(/'/g, "").split(",")[0]}
                </p>
                <p className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>
                  Heading
                </p>
              </div>
            </div>
            <div className="flex items-baseline gap-4">
              <span
                className="text-2xl"
                style={{ fontFamily: "var(--font-body)", color: "var(--foreground)" }}
              >
                Aa
              </span>
              <div>
                <p className="text-xs font-medium" style={{ color: "var(--foreground)" }}>
                  {t.typography.bodyFamily.replace(/'/g, "").split(",")[0]}
                </p>
                <p className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>
                  Body
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Component Showcase */}
        <section>
          <h3
            className="text-xs uppercase tracking-[0.15em] font-medium mb-3"
            style={{ color: "var(--muted-foreground)" }}
          >
            Component Preview
          </h3>
          <div
            className="rounded-lg border p-5 space-y-5"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "var(--radius)" }}
          >
            {/* Buttons */}
            <div>
              <p className="text-[10px] font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>
                Buttons
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  className="px-4 py-2 text-sm font-medium"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)",
                    borderRadius: "var(--radius)",
                  }}
                >
                  Primary
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium"
                  style={{
                    backgroundColor: "var(--secondary)",
                    color: "var(--secondary-foreground)",
                    borderRadius: "var(--radius)",
                  }}
                >
                  Secondary
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium border"
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--foreground)",
                    borderColor: "var(--border)",
                    borderRadius: "var(--radius)",
                  }}
                >
                  Outline
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium"
                  style={{
                    backgroundColor: "var(--destructive)",
                    color: "var(--destructive-foreground)",
                    borderRadius: "var(--radius)",
                  }}
                >
                  Destructive
                </button>
              </div>
            </div>

            {/* Card */}
            <div>
              <p className="text-[10px] font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>
                Card
              </p>
              <div
                className="border rounded-lg p-4 max-w-xs"
                style={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                  borderRadius: "var(--radius-lg)",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4
                    className="text-sm font-semibold"
                    style={{ color: "var(--foreground)", fontFamily: "var(--font-heading)" }}
                  >
                    Project Alpha
                  </h4>
                  <span
                    className="px-2 py-0.5 text-[10px] font-medium rounded-full"
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "var(--accent-foreground)",
                    }}
                  >
                    Active
                  </span>
                </div>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  A sample card component styled with your generated tokens.
                </p>
              </div>
            </div>

            {/* Form elements */}
            <div>
              <p className="text-[10px] font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>
                Form Elements
              </p>
              <div className="space-y-2 max-w-xs">
                <div>
                  <label
                    className="text-xs font-medium block mb-1"
                    style={{ color: "var(--foreground)" }}
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    readOnly
                    className="w-full px-3 py-2 text-sm border outline-none"
                    style={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--input)",
                      color: "var(--foreground)",
                      borderRadius: "var(--radius-sm)",
                    }}
                  />
                </div>
                <div className="flex gap-2">
                  <span
                    className="px-2.5 py-1 text-[10px] font-medium rounded-full"
                    style={{
                      backgroundColor: "var(--primary)",
                      color: "var(--primary-foreground)",
                    }}
                  >
                    Badge
                  </span>
                  <span
                    className="px-2.5 py-1 text-[10px] font-medium rounded-full border"
                    style={{
                      backgroundColor: "transparent",
                      color: "var(--foreground)",
                      borderColor: "var(--border)",
                    }}
                  >
                    Outline
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mini Dashboard Mockup */}
        <section>
          <h3
            className="text-xs uppercase tracking-[0.15em] font-medium mb-3"
            style={{ color: "var(--muted-foreground)" }}
          >
            In Production
          </h3>
          <div
            className="rounded-lg border overflow-hidden"
            style={{ borderColor: "var(--border)", borderRadius: "var(--radius-lg)" }}
          >
            {/* Top bar */}
            <div
              className="h-8 flex items-center px-3 gap-2 border-b"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
            >
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--destructive)", opacity: 0.6 }} />
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--primary)", opacity: 0.3 }} />
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--primary)", opacity: 0.15 }} />
              </div>
              <div
                className="flex-1 h-3.5 rounded-sm max-w-[200px]"
                style={{ backgroundColor: "var(--muted)" }}
              />
            </div>

            <div className="flex" style={{ backgroundColor: "var(--background)" }}>
              {/* Sidebar */}
              <div
                className="w-28 shrink-0 border-r p-2 space-y-1 hidden sm:block"
                style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
              >
                {["Dashboard", "Projects", "Settings"].map((item, i) => (
                  <div
                    key={item}
                    className="px-2 py-1 text-[9px] rounded"
                    style={{
                      backgroundColor: i === 0 ? "var(--accent)" : "transparent",
                      color: i === 0 ? "var(--accent-foreground)" : "var(--muted-foreground)",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 p-3 space-y-2">
                <div
                  className="h-3 rounded-sm w-32"
                  style={{ backgroundColor: "var(--foreground)", opacity: 0.15 }}
                />
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Revenue", bg: "var(--primary)", fg: "var(--primary-foreground)" },
                    { label: "Users", bg: "var(--accent)", fg: "var(--accent-foreground)" },
                    { label: "Growth", bg: "var(--secondary)", fg: "var(--secondary-foreground)" },
                  ].map((card) => (
                    <div
                      key={card.label}
                      className="p-2 rounded-md"
                      style={{
                        backgroundColor: card.bg,
                        borderRadius: "var(--radius-sm)",
                      }}
                    >
                      <p className="text-[8px]" style={{ color: card.fg, opacity: 0.7 }}>
                        {card.label}
                      </p>
                      <p
                        className="text-sm font-bold tabular-nums"
                        style={{ color: card.fg }}
                      >
                        {card.label === "Revenue"
                          ? "$12.4k"
                          : card.label === "Users"
                          ? "2,847"
                          : "+18%"}
                      </p>
                    </div>
                  ))}
                </div>
                <div
                  className="h-16 rounded-md border"
                  style={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "var(--radius-sm)",
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
