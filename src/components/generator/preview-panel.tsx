"use client";

import { Loader2, Copy, Check, AlertCircle, CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { useState } from "react";
import { useThemeTokens } from "@/providers/theme-token-provider";
import type { DesignTokens, TypographyUsage, TypographyUsageRule } from "@/lib/tokens/types";
import { contrastRatio } from "@/lib/tokens/color-utils";

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
          <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
            Generating your design system...
          </p>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            Crafting color scales, typography, and tokens
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-10 max-w-3xl mx-auto">
        {/* System name & meta */}
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
          <div className="flex flex-wrap gap-1.5 mt-2">
            {t.meta.mood.map((m) => (
              <span
                key={m}
                className="px-2 py-0.5 text-[10px] font-medium rounded-full border"
                style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
              >
                {m}
              </span>
            ))}
            <span
              className="px-2 py-0.5 text-[10px] font-medium rounded-full"
              style={{ backgroundColor: "var(--accent)", color: "var(--accent-foreground)" }}
            >
              {t.meta.industry}
            </span>
          </div>
        </div>

        {/* ── Color Palette ── */}
        <section>
          <SectionHeader>Color Palette</SectionHeader>
          <div className="space-y-3">
            {SCALE_NAMES.map((name) => {
              const scale = t.colors[name];
              if (!scale) return null;
              return (
                <div key={name}>
                  <span
                    className="text-[10px] font-medium capitalize mb-1 block"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {name}
                  </span>
                  <div className="flex gap-1 rounded-lg overflow-hidden">
                    {SHADES.map((shade) => (
                      <ColorSwatch
                        key={shade}
                        color={scale[shade]}
                        label={shade}
                        name={`${name}-${shade}`}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Semantic Colors ── */}
        <section>
          <SectionHeader>Semantic Colors</SectionHeader>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {(Object.entries(t.semantic) as Array<[string, string]>).map(([key, value]) => (
              <SemanticSwatch key={key} name={key} color={value} />
            ))}
          </div>
        </section>

        {/* ── Typography ── */}
        <section>
          <SectionHeader>Typography</SectionHeader>
          <div
            className="rounded-lg border p-5 space-y-4"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "var(--radius)" }}
          >
            {/* Font families */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Heading", family: t.typography.headingFamily, sample: "The quick brown fox" },
                { label: "Body", family: t.typography.bodyFamily, sample: "jumps over the lazy dog" },
                { label: "Mono", family: t.typography.monoFamily, sample: "const x = 42;" },
              ].map((f) => (
                <div key={f.label}>
                  <p className="text-[10px] font-medium mb-1" style={{ color: "var(--muted-foreground)" }}>
                    {f.label}
                  </p>
                  <p
                    className="text-lg font-bold truncate"
                    style={{ fontFamily: f.family, color: "var(--foreground)" }}
                  >
                    Aa
                  </p>
                  <p
                    className="text-xs truncate mt-0.5"
                    style={{ fontFamily: f.family, color: "var(--muted-foreground)" }}
                  >
                    {f.sample}
                  </p>
                  <p className="text-[9px] mt-1 truncate" style={{ color: "var(--muted-foreground)", opacity: 0.6 }}>
                    {f.family.split(",")[0].replace(/"/g, "")}
                  </p>
                </div>
              ))}
            </div>

            {/* Type scale */}
            <div className="border-t pt-3" style={{ borderColor: "var(--border)" }}>
              <p className="text-[10px] font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>
                Type Scale
              </p>
              <div className="space-y-1.5">
                {Object.entries(t.typography.scale).reverse().map(([key, val]) => (
                  <div key={key} className="flex items-baseline gap-3">
                    <span
                      className="text-[9px] font-mono w-8 shrink-0 tabular-nums text-right"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {key}
                    </span>
                    <span
                      style={{
                        fontSize: val.size,
                        lineHeight: val.lineHeight,
                        fontFamily: "var(--font-heading)",
                        color: "var(--foreground)",
                      }}
                    >
                      Design System
                    </span>
                    <span className="text-[9px] font-mono ml-auto shrink-0" style={{ color: "var(--muted-foreground)", opacity: 0.5 }}>
                      {val.size}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weights */}
            <div className="border-t pt-3" style={{ borderColor: "var(--border)" }}>
              <p className="text-[10px] font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>
                Weights
              </p>
              <div className="flex gap-4">
                {Object.entries(t.typography.weights).map(([name, weight]) => (
                  <span
                    key={name}
                    className="text-sm"
                    style={{
                      fontWeight: weight,
                      fontFamily: "var(--font-body)",
                      color: "var(--foreground)",
                    }}
                  >
                    {name} ({weight})
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Border Radius ── */}
        <section>
          <SectionHeader>Border Radius</SectionHeader>
          <div className="flex flex-wrap gap-3">
            {Object.entries(t.borderRadius).map(([key, value]) => (
              <div key={key} className="text-center">
                <div
                  className="w-14 h-14 border-2 mb-1"
                  style={{
                    borderColor: "var(--primary)",
                    borderRadius: value,
                    backgroundColor: "var(--accent)",
                  }}
                />
                <p className="text-[9px] font-medium" style={{ color: "var(--foreground)" }}>{key}</p>
                <p className="text-[8px] font-mono" style={{ color: "var(--muted-foreground)" }}>{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Shadows ── */}
        <section>
          <SectionHeader>Shadows</SectionHeader>
          <div className="flex flex-wrap gap-4">
            {Object.entries(t.shadows)
              .filter(([, v]) => v !== "none")
              .map(([key, value]) => (
                <div key={key} className="text-center">
                  <div
                    className="w-16 h-16 rounded-lg mb-1"
                    style={{
                      backgroundColor: "var(--card)",
                      boxShadow: value,
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <p className="text-[9px] font-medium" style={{ color: "var(--foreground)" }}>{key}</p>
                </div>
              ))}
          </div>
        </section>

        {/* ── Spacing ── */}
        <section>
          <SectionHeader>Spacing Scale</SectionHeader>
          <div className="space-y-1">
            {["1", "2", "3", "4", "5", "6", "8", "10", "12", "16", "20", "24"].map((key) => {
              const value = t.spacing[key];
              if (!value) return null;
              return (
                <div key={key} className="flex items-center gap-2">
                  <span
                    className="text-[9px] font-mono w-6 text-right tabular-nums shrink-0"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {key}
                  </span>
                  <div
                    className="h-3 rounded-sm"
                    style={{
                      width: value,
                      backgroundColor: "var(--primary)",
                      borderRadius: "2px",
                      opacity: 0.7,
                    }}
                  />
                  <span className="text-[9px] font-mono" style={{ color: "var(--muted-foreground)", opacity: 0.5 }}>
                    {value}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Animation ── */}
        <section>
          <SectionHeader>Animation</SectionHeader>
          <div
            className="rounded-lg border p-4 grid grid-cols-2 gap-3"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "var(--radius)" }}
          >
            <div>
              <p className="text-[10px] font-medium mb-1.5" style={{ color: "var(--muted-foreground)" }}>Durations</p>
              {Object.entries(t.animation.duration).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between py-0.5">
                  <span className="text-[10px]" style={{ color: "var(--foreground)" }}>{key}</span>
                  <span className="text-[10px] font-mono" style={{ color: "var(--muted-foreground)" }}>{val}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-[10px] font-medium mb-1.5" style={{ color: "var(--muted-foreground)" }}>Easing</p>
              {Object.entries(t.animation.easing).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between py-0.5">
                  <span className="text-[10px]" style={{ color: "var(--foreground)" }}>{key}</span>
                  <span className="text-[9px] font-mono truncate ml-2" style={{ color: "var(--muted-foreground)" }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WCAG Accessibility Matrix ── */}
        <section>
          <SectionHeader>WCAG Accessibility Matrix</SectionHeader>
          <div
            className="rounded-lg border p-4 overflow-x-auto"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "var(--radius)" }}
          >
            <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}>
              {([
                { label: "Foreground / Background", fg: t.semantic.foreground, bg: t.semantic.background },
                { label: "Card FG / Card", fg: t.semantic.cardForeground, bg: t.semantic.card },
                { label: "Popover FG / Popover", fg: t.semantic.popoverForeground, bg: t.semantic.popover },
                { label: "Primary FG / Primary", fg: t.semantic.primaryForeground, bg: t.semantic.primary },
                { label: "Secondary FG / Secondary", fg: t.semantic.secondaryForeground, bg: t.semantic.secondary },
                { label: "Muted FG / Muted", fg: t.semantic.mutedForeground, bg: t.semantic.muted },
                { label: "Accent FG / Accent", fg: t.semantic.accentForeground, bg: t.semantic.accent },
                { label: "Destructive FG / Destructive", fg: t.semantic.destructiveForeground, bg: t.semantic.destructive },
              ] as const).map((pair) => {
                const ratio = contrastRatio(pair.fg, pair.bg);
                const level = ratio >= 4.5 ? "pass" : ratio >= 3 ? "large" : "fail";
                return (
                  <div
                    key={pair.label}
                    className="rounded-md p-3 border"
                    style={{
                      backgroundColor: pair.bg,
                      borderColor: level === "pass" ? "#22c55e" : level === "large" ? "#eab308" : "#ef4444",
                      borderWidth: "2px",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    <p
                      className="text-sm font-semibold mb-1"
                      style={{ color: pair.fg }}
                    >
                      Aa
                    </p>
                    <p
                      className="text-[9px] font-medium mb-1.5"
                      style={{ color: pair.fg, opacity: 0.8 }}
                    >
                      {pair.label}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="text-[10px] font-bold font-mono"
                        style={{
                          color: level === "pass" ? "#22c55e" : level === "large" ? "#eab308" : "#ef4444",
                        }}
                      >
                        {ratio.toFixed(2)}:1
                      </span>
                      <span
                        className="text-[8px] font-bold px-1.5 py-0.5 rounded-sm"
                        style={{
                          backgroundColor: level === "pass" ? "#22c55e" : level === "large" ? "#eab308" : "#ef4444",
                          color: level === "large" ? "#000" : "#fff",
                        }}
                      >
                        {level === "pass" ? "AA" : level === "large" ? "AA Large" : "FAIL"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Letter Spacing ── */}
        <section>
          <SectionHeader>Letter Spacing</SectionHeader>
          <div
            className="rounded-lg border p-5 space-y-3"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "var(--radius)" }}
          >
            {t.letterSpacing && (Object.entries(t.letterSpacing) as Array<[string, string]>).map(([key, value]) => (
              <div key={key} className="flex items-baseline gap-3">
                <span
                  className="text-[9px] font-mono w-16 shrink-0 text-right"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {key}
                </span>
                <span
                  className="text-sm truncate flex-1"
                  style={{
                    letterSpacing: value,
                    fontFamily: "var(--font-body)",
                    color: "var(--foreground)",
                  }}
                >
                  The quick brown fox jumps over the lazy dog
                </span>
                <span
                  className="text-[9px] font-mono shrink-0"
                  style={{ color: "var(--muted-foreground)", opacity: 0.5 }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Line Height ── */}
        <section>
          <SectionHeader>Line Height</SectionHeader>
          <div
            className="rounded-lg border p-5 grid grid-cols-2 sm:grid-cols-3 gap-4"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "var(--radius)" }}
          >
            {t.lineHeight && (Object.entries(t.lineHeight) as Array<[string, number]>).map(([key, value]) => (
              <div key={key}>
                <div className="flex items-baseline justify-between mb-1">
                  <span
                    className="text-[10px] font-medium"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {key}
                  </span>
                  <span
                    className="text-[9px] font-mono"
                    style={{ color: "var(--muted-foreground)", opacity: 0.5 }}
                  >
                    {value}
                  </span>
                </div>
                <p
                  className="text-xs border rounded-md p-2"
                  style={{
                    lineHeight: value,
                    fontFamily: "var(--font-body)",
                    color: "var(--foreground)",
                    borderColor: "var(--border)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  Design tokens define the visual language of your product. They bridge the gap between design and development.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Breakpoints ── */}
        <section>
          <SectionHeader>Breakpoints</SectionHeader>
          <div
            className="rounded-lg border p-5 space-y-2"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "var(--radius)" }}
          >
            {t.breakpoints && (() => {
              const entries = Object.entries(t.breakpoints) as Array<[string, string]>;
              const maxVal = Math.max(...entries.map(([, v]) => parseInt(v)));
              return entries.map(([key, value]) => {
                const numericVal = parseInt(value);
                const pct = maxVal > 0 ? (numericVal / maxVal) * 100 : 0;
                return (
                  <div key={key} className="flex items-center gap-3">
                    <span
                      className="text-[10px] font-mono w-8 text-right shrink-0"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {key}
                    </span>
                    <div className="flex-1 h-5 rounded-sm overflow-hidden" style={{ backgroundColor: "var(--muted)", borderRadius: "var(--radius-sm)" }}>
                      <div
                        className="h-full rounded-sm flex items-center px-2"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: "var(--primary)",
                          borderRadius: "var(--radius-sm)",
                          opacity: 0.8,
                          minWidth: "40px",
                        }}
                      >
                        <span className="text-[9px] font-mono font-medium" style={{ color: "var(--primary-foreground)" }}>
                          {value}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </section>

        {/* ── Z-Index ── */}
        <section>
          <SectionHeader>Z-Index Layers</SectionHeader>
          <div
            className="rounded-lg border p-5"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "var(--radius)" }}
          >
            {t.zIndex && (() => {
              const entries = (Object.entries(t.zIndex) as Array<[string, number]>)
                .sort(([, a], [, b]) => b - a);
              return (
                <div className="relative space-y-1">
                  {entries.map(([key, value], i) => (
                    <div
                      key={key}
                      className="flex items-center gap-3 rounded-md px-3 py-1.5 border"
                      style={{
                        marginLeft: `${i * 8}px`,
                        backgroundColor: "var(--background)",
                        borderColor: "var(--border)",
                        borderRadius: "var(--radius-sm)",
                        boxShadow: "var(--shadow-sm)",
                      }}
                    >
                      <span
                        className="text-[10px] font-mono font-bold w-10 text-right shrink-0 tabular-nums"
                        style={{ color: "var(--primary)" }}
                      >
                        {value}
                      </span>
                      <span
                        className="text-[10px] font-medium"
                        style={{ color: "var(--foreground)" }}
                      >
                        {key}
                      </span>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </section>

        {/* ── Opacity ── */}
        <section>
          <SectionHeader>Opacity Scale</SectionHeader>
          <div
            className="rounded-lg border p-5"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "var(--radius)" }}
          >
            {t.opacity && (() => {
              const entries = (Object.entries(t.opacity) as Array<[string, number]>)
                .sort(([a], [b]) => Number(a) - Number(b));
              return (
                <div className="flex flex-wrap gap-2">
                  {entries.map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div
                        className="w-10 h-10 rounded-md mb-1"
                        style={{
                          backgroundColor: "var(--primary)",
                          opacity: value,
                          borderRadius: "var(--radius-sm)",
                        }}
                      />
                      <p className="text-[9px] font-medium" style={{ color: "var(--foreground)" }}>{key}</p>
                      <p className="text-[8px] font-mono" style={{ color: "var(--muted-foreground)" }}>{value}</p>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </section>

        {/* ── Border Width ── */}
        <section>
          <SectionHeader>Border Width</SectionHeader>
          <div className="flex flex-wrap gap-3">
            {t.borderWidth && (Object.entries(t.borderWidth) as Array<[string, string]>).map(([key, value]) => (
              <div key={key} className="text-center">
                <div
                  className="w-16 h-16 rounded-md mb-1"
                  style={{
                    borderStyle: "solid",
                    borderWidth: value,
                    borderColor: "var(--primary)",
                    backgroundColor: "var(--card)",
                    borderRadius: "var(--radius)",
                  }}
                />
                <p className="text-[9px] font-medium" style={{ color: "var(--foreground)" }}>{key}</p>
                <p className="text-[8px] font-mono" style={{ color: "var(--muted-foreground)" }}>{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Additional Component Previews ── */}
        <section>
          <SectionHeader>More Components</SectionHeader>
          <div
            className="rounded-lg border p-5 space-y-6"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "var(--radius)" }}
          >
            {/* Alerts */}
            <div>
              <p className="text-[10px] font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>
                Alerts
              </p>
              <div className="space-y-2">
                {[
                  { type: "info", icon: Info, bg: t.colors.info?.["50"] || "var(--accent)", border: t.colors.info?.["200"] || "var(--border)", fg: t.colors.info?.["700"] || "var(--accent-foreground)", label: "Info", message: "This is an informational alert." },
                  { type: "success", icon: CheckCircle2, bg: t.colors.success?.["50"] || "var(--accent)", border: t.colors.success?.["200"] || "var(--border)", fg: t.colors.success?.["700"] || "var(--accent-foreground)", label: "Success", message: "Operation completed successfully." },
                  { type: "warning", icon: AlertTriangle, bg: t.colors.warning?.["50"] || "var(--accent)", border: t.colors.warning?.["200"] || "var(--border)", fg: t.colors.warning?.["700"] || "var(--accent-foreground)", label: "Warning", message: "Please review before proceeding." },
                  { type: "error", icon: AlertCircle, bg: t.colors.error?.["50"] || "var(--destructive)", border: t.colors.error?.["200"] || "var(--border)", fg: t.colors.error?.["700"] || "var(--destructive-foreground)", label: "Error", message: "Something went wrong. Please try again." },
                ].map((alert) => (
                  <div
                    key={alert.type}
                    className="flex items-start gap-2.5 px-3 py-2.5 rounded-md border"
                    style={{
                      backgroundColor: alert.bg,
                      borderColor: alert.border,
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    <alert.icon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: alert.fg }} />
                    <div>
                      <p className="text-xs font-semibold" style={{ color: alert.fg }}>
                        {alert.label}
                      </p>
                      <p className="text-[11px]" style={{ color: alert.fg, opacity: 0.85 }}>
                        {alert.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Toggle / Switch */}
            <div>
              <p className="text-[10px] font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>
                Toggle / Switch
              </p>
              <div className="flex items-center gap-6">
                {/* On state */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-5 rounded-full relative"
                    style={{ backgroundColor: "var(--primary)" }}
                  >
                    <div
                      className="w-4 h-4 rounded-full absolute top-0.5 right-0.5"
                      style={{ backgroundColor: "var(--primary-foreground)" }}
                    />
                  </div>
                  <span className="text-[10px] font-medium" style={{ color: "var(--foreground)" }}>On</span>
                </div>
                {/* Off state */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-5 rounded-full relative"
                    style={{ backgroundColor: "var(--muted)" }}
                  >
                    <div
                      className="w-4 h-4 rounded-full absolute top-0.5 left-0.5"
                      style={{ backgroundColor: "var(--background)", boxShadow: "var(--shadow-sm)" }}
                    />
                  </div>
                  <span className="text-[10px] font-medium" style={{ color: "var(--muted-foreground)" }}>Off</span>
                </div>
              </div>
            </div>

            {/* Avatar with status indicator */}
            <div>
              <p className="text-[10px] font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>
                Avatars
              </p>
              <div className="flex items-center gap-4">
                {[
                  { initials: "JS", status: t.colors.success?.["500"] || "#22c55e", name: "Jane Smith" },
                  { initials: "MK", status: t.colors.warning?.["500"] || "#eab308", name: "Mike Kim" },
                  { initials: "AL", status: t.colors.error?.["500"] || "#ef4444", name: "Amy Lee" },
                  { initials: "RD", status: "var(--muted-foreground)", name: "Rob Davis" },
                ].map((avatar) => (
                  <div key={avatar.initials} className="flex items-center gap-2">
                    <div className="relative">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "var(--primary)", borderRadius: "var(--radius-full, 9999px)" }}
                      >
                        <span className="text-[10px] font-bold" style={{ color: "var(--primary-foreground)" }}>
                          {avatar.initials}
                        </span>
                      </div>
                      <div
                        className="w-2.5 h-2.5 rounded-full absolute -bottom-0.5 -right-0.5 border-2"
                        style={{
                          backgroundColor: avatar.status,
                          borderColor: "var(--card)",
                        }}
                      />
                    </div>
                    <span className="text-[10px]" style={{ color: "var(--foreground)" }}>{avatar.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nav bar mockup */}
            <div>
              <p className="text-[10px] font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>
                Navigation Bar
              </p>
              <div
                className="rounded-lg border overflow-hidden"
                style={{ borderColor: "var(--border)", borderRadius: "var(--radius)" }}
              >
                <div
                  className="flex items-center justify-between px-4 py-2.5"
                  style={{ backgroundColor: "var(--background)" }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="text-sm font-bold"
                      style={{ color: "var(--foreground)", fontFamily: "var(--font-heading)" }}
                    >
                      Acme Inc
                    </span>
                    <nav className="flex items-center gap-3 hidden sm:flex">
                      {["Home", "Products", "About", "Contact"].map((link, i) => (
                        <span
                          key={link}
                          className="text-[11px] font-medium"
                          style={{
                            color: i === 0 ? "var(--primary)" : "var(--muted-foreground)",
                          }}
                        >
                          {link}
                        </span>
                      ))}
                    </nav>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1 text-[10px] font-medium border"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--foreground)",
                        backgroundColor: "transparent",
                        borderRadius: "var(--radius-sm)",
                      }}
                    >
                      Log in
                    </button>
                    <button
                      className="px-3 py-1 text-[10px] font-medium"
                      style={{
                        backgroundColor: "var(--primary)",
                        color: "var(--primary-foreground)",
                        borderRadius: "var(--radius-sm)",
                      }}
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Data table */}
            <div>
              <p className="text-[10px] font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>
                Data Table
              </p>
              <div
                className="rounded-lg border overflow-hidden"
                style={{ borderColor: "var(--border)", borderRadius: "var(--radius)" }}
              >
                <table className="w-full text-[11px]">
                  <thead>
                    <tr style={{ backgroundColor: "var(--muted)" }}>
                      {["Name", "Status", "Role", "Revenue"].map((h) => (
                        <th
                          key={h}
                          className="text-left px-3 py-2 font-semibold"
                          style={{ color: "var(--muted-foreground)", borderBottom: "1px solid var(--border)" }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Alice Chen", status: "Active", role: "Admin", revenue: "$12,400" },
                      { name: "Bob Park", status: "Pending", role: "Editor", revenue: "$8,200" },
                      { name: "Carol Lin", status: "Inactive", role: "Viewer", revenue: "$3,100" },
                    ].map((row, i) => (
                      <tr
                        key={row.name}
                        style={{
                          backgroundColor: i % 2 === 0 ? "var(--background)" : "var(--muted)",
                          borderBottom: i < 2 ? "1px solid var(--border)" : undefined,
                        }}
                      >
                        <td className="px-3 py-2 font-medium" style={{ color: "var(--foreground)" }}>
                          {row.name}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className="px-2 py-0.5 text-[9px] font-medium rounded-full"
                            style={{
                              backgroundColor:
                                row.status === "Active"
                                  ? (t.colors.success?.["100"] || "var(--accent)")
                                  : row.status === "Pending"
                                  ? (t.colors.warning?.["100"] || "var(--accent)")
                                  : (t.colors.error?.["100"] || "var(--muted)"),
                              color:
                                row.status === "Active"
                                  ? (t.colors.success?.["700"] || "var(--accent-foreground)")
                                  : row.status === "Pending"
                                  ? (t.colors.warning?.["700"] || "var(--accent-foreground)")
                                  : (t.colors.error?.["700"] || "var(--muted-foreground)"),
                            }}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="px-3 py-2" style={{ color: "var(--muted-foreground)" }}>
                          {row.role}
                        </td>
                        <td className="px-3 py-2 font-mono tabular-nums" style={{ color: "var(--foreground)" }}>
                          {row.revenue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ── Typography Usage Rules ── */}
        {t.typographyUsage && (
          <section>
            <SectionHeader>Typography Usage Rules</SectionHeader>
            <div
              className="rounded-lg border overflow-x-auto"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "var(--radius)" }}
            >
              <table className="w-full text-[11px]">
                <thead>
                  <tr style={{ backgroundColor: "var(--muted)" }}>
                    {["Role", "Sample", "Weight", "Size", "Line Height", "Letter Spacing", "Transform"].map((h) => (
                      <th
                        key={h}
                        className="text-left px-3 py-2 font-semibold whitespace-nowrap"
                        style={{ color: "var(--muted-foreground)", borderBottom: "1px solid var(--border)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {([
                    "display", "h1", "h2", "h3", "h4", "h5", "h6",
                    "body", "bodyLarge", "bodySmall", "caption", "button", "label", "overline",
                  ] as Array<keyof TypographyUsage>).map((role, i) => {
                    const rule = t.typographyUsage[role] as TypographyUsageRule | undefined;
                    if (!rule) return null;
                    const isHeading = ["display", "h1", "h2", "h3", "h4", "h5", "h6"].includes(role);
                    const sampleText = isHeading ? "Design System" : "The quick brown fox jumps over the lazy dog";
                    return (
                      <tr
                        key={role}
                        style={{
                          backgroundColor: i % 2 === 0 ? "var(--background)" : "var(--muted)",
                          borderBottom: "1px solid var(--border)",
                        }}
                      >
                        <td className="px-3 py-2.5 font-mono font-medium whitespace-nowrap" style={{ color: "var(--primary)" }}>
                          {role}
                        </td>
                        <td className="px-3 py-2.5 max-w-[240px]">
                          <span
                            className="block truncate"
                            style={{
                              fontFamily: isHeading ? "var(--font-heading)" : "var(--font-body)",
                              fontWeight: rule.weight,
                              fontSize: rule.size,
                              lineHeight: rule.lineHeight,
                              letterSpacing: rule.letterSpacing,
                              textTransform: (rule.textTransform as React.CSSProperties["textTransform"]) || "none",
                              color: "var(--foreground)",
                            }}
                          >
                            {sampleText}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 font-mono tabular-nums" style={{ color: "var(--muted-foreground)" }}>
                          {rule.weight}
                        </td>
                        <td className="px-3 py-2.5 font-mono tabular-nums" style={{ color: "var(--muted-foreground)" }}>
                          {rule.size}
                        </td>
                        <td className="px-3 py-2.5 font-mono tabular-nums" style={{ color: "var(--muted-foreground)" }}>
                          {rule.lineHeight}
                        </td>
                        <td className="px-3 py-2.5 font-mono tabular-nums" style={{ color: "var(--muted-foreground)" }}>
                          {rule.letterSpacing}
                        </td>
                        <td className="px-3 py-2.5 font-mono" style={{ color: "var(--muted-foreground)" }}>
                          {rule.textTransform || "none"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ── Component Tokens ── */}
        {t.components && (
          <section>
            <SectionHeader>Component Tokens</SectionHeader>
            <div
              className="rounded-lg border p-5 space-y-8"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "var(--radius)" }}
            >
              {/* Button variants */}
              <div>
                <p className="text-[10px] font-medium mb-3" style={{ color: "var(--muted-foreground)" }}>
                  Button Sizes
                </p>
                <div className="flex flex-wrap items-end gap-3 mb-3">
                  {([
                    { size: "sm", height: t.components.button.heightSm, px: t.components.button.paddingXSm, fontSize: t.components.button.fontSizeSm },
                    { size: "md", height: t.components.button.heightMd, px: t.components.button.paddingX, fontSize: t.components.button.fontSize },
                    { size: "lg", height: t.components.button.heightLg, px: t.components.button.paddingX, fontSize: t.components.button.fontSize },
                  ] as const).map((variant) => (
                    <button
                      key={variant.size}
                      type="button"
                      style={{
                        height: variant.height,
                        paddingLeft: variant.px,
                        paddingRight: variant.px,
                        fontSize: variant.fontSize,
                        fontWeight: t.components.button.fontWeight,
                        letterSpacing: t.components.button.letterSpacing,
                        textTransform: t.components.button.textTransform as React.CSSProperties["textTransform"],
                        borderRadius: t.components.button.borderRadius,
                        transition: t.components.button.transition,
                        backgroundColor: "var(--primary)",
                        color: "var(--primary-foreground)",
                        border: "none",
                        cursor: "default",
                      }}
                    >
                      Button {variant.size.toUpperCase()}
                    </button>
                  ))}
                </div>
                <div
                  className="rounded-md border overflow-hidden"
                  style={{ borderColor: "var(--border)", borderRadius: "var(--radius-sm)" }}
                >
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr style={{ backgroundColor: "var(--muted)" }}>
                        {["Property", "Value"].map((h) => (
                          <th key={h} className="text-left px-3 py-1.5 font-semibold" style={{ color: "var(--muted-foreground)", borderBottom: "1px solid var(--border)" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {([
                        ["Height (sm / md / lg)", `${t.components.button.heightSm} / ${t.components.button.heightMd} / ${t.components.button.heightLg}`],
                        ["Padding X (sm / default)", `${t.components.button.paddingXSm} / ${t.components.button.paddingX}`],
                        ["Font size (sm / default)", `${t.components.button.fontSizeSm} / ${t.components.button.fontSize}`],
                        ["Font weight", `${t.components.button.fontWeight}`],
                        ["Letter spacing", t.components.button.letterSpacing],
                        ["Text transform", t.components.button.textTransform],
                        ["Border radius", t.components.button.borderRadius],
                        ["Hover transform", t.components.button.hoverTransform],
                        ["Transition", t.components.button.transition],
                      ] as const).map(([prop, val], i) => (
                        <tr key={prop} style={{ backgroundColor: i % 2 === 0 ? "var(--background)" : "var(--muted)" }}>
                          <td className="px-3 py-1.5 font-medium" style={{ color: "var(--foreground)" }}>{prop}</td>
                          <td className="px-3 py-1.5 font-mono" style={{ color: "var(--muted-foreground)" }}>{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Card */}
              <div>
                <p className="text-[10px] font-medium mb-3" style={{ color: "var(--muted-foreground)" }}>
                  Card
                </p>
                <div
                  className="max-w-xs mb-3"
                  style={{
                    padding: t.components.card.padding,
                    borderRadius: t.components.card.borderRadius,
                    borderWidth: t.components.card.borderWidth,
                    borderStyle: "solid",
                    borderColor: "var(--border)",
                    backgroundColor: "var(--background)",
                  }}
                >
                  <h4
                    className="text-sm font-semibold mb-1"
                    style={{ color: "var(--foreground)", fontFamily: "var(--font-heading)" }}
                  >
                    Card Title
                  </h4>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    Rendered with exact component token padding and radius.
                  </p>
                </div>
                <div
                  className="rounded-md border overflow-hidden"
                  style={{ borderColor: "var(--border)", borderRadius: "var(--radius-sm)" }}
                >
                  <table className="w-full text-[10px]">
                    <tbody>
                      {([
                        ["Padding (default / sm)", `${t.components.card.padding} / ${t.components.card.paddingSm}`],
                        ["Border radius", t.components.card.borderRadius],
                        ["Border width", t.components.card.borderWidth],
                      ] as const).map(([prop, val], i) => (
                        <tr key={prop} style={{ backgroundColor: i % 2 === 0 ? "var(--background)" : "var(--muted)" }}>
                          <td className="px-3 py-1.5 font-medium" style={{ color: "var(--foreground)" }}>{prop}</td>
                          <td className="px-3 py-1.5 font-mono" style={{ color: "var(--muted-foreground)" }}>{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Input */}
              <div>
                <p className="text-[10px] font-medium mb-3" style={{ color: "var(--muted-foreground)" }}>
                  Input
                </p>
                <div className="max-w-xs mb-3">
                  <input
                    type="text"
                    placeholder="Input with exact token specs"
                    readOnly
                    style={{
                      width: "100%",
                      height: t.components.input.height,
                      paddingLeft: t.components.input.paddingX,
                      paddingRight: t.components.input.paddingX,
                      fontSize: t.components.input.fontSize,
                      borderRadius: t.components.input.borderRadius,
                      borderWidth: t.components.input.borderWidth,
                      borderStyle: "solid",
                      borderColor: "var(--input)",
                      backgroundColor: "var(--background)",
                      color: "var(--foreground)",
                      outline: "none",
                      fontFamily: "var(--font-body)",
                    }}
                  />
                </div>
                <div
                  className="rounded-md border overflow-hidden"
                  style={{ borderColor: "var(--border)", borderRadius: "var(--radius-sm)" }}
                >
                  <table className="w-full text-[10px]">
                    <tbody>
                      {([
                        ["Height", t.components.input.height],
                        ["Padding X", t.components.input.paddingX],
                        ["Font size", t.components.input.fontSize],
                        ["Border radius", t.components.input.borderRadius],
                        ["Border width", t.components.input.borderWidth],
                      ] as const).map(([prop, val], i) => (
                        <tr key={prop} style={{ backgroundColor: i % 2 === 0 ? "var(--background)" : "var(--muted)" }}>
                          <td className="px-3 py-1.5 font-medium" style={{ color: "var(--foreground)" }}>{prop}</td>
                          <td className="px-3 py-1.5 font-mono" style={{ color: "var(--muted-foreground)" }}>{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Badge */}
              <div>
                <p className="text-[10px] font-medium mb-3" style={{ color: "var(--muted-foreground)" }}>
                  Badge
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {([
                    { label: "Default", bg: "var(--primary)", fg: "var(--primary-foreground)" },
                    { label: "Secondary", bg: "var(--secondary)", fg: "var(--secondary-foreground)" },
                    { label: "Destructive", bg: "var(--destructive)", fg: "var(--destructive-foreground)" },
                    { label: "Accent", bg: "var(--accent)", fg: "var(--accent-foreground)" },
                  ] as const).map((badge) => (
                    <span
                      key={badge.label}
                      style={{
                        paddingLeft: t.components.badge.paddingX,
                        paddingRight: t.components.badge.paddingX,
                        paddingTop: t.components.badge.paddingY,
                        paddingBottom: t.components.badge.paddingY,
                        fontSize: t.components.badge.fontSize,
                        fontWeight: t.components.badge.fontWeight,
                        borderRadius: t.components.badge.borderRadius,
                        letterSpacing: t.components.badge.letterSpacing,
                        textTransform: t.components.badge.textTransform as React.CSSProperties["textTransform"],
                        backgroundColor: badge.bg,
                        color: badge.fg,
                        display: "inline-block",
                      }}
                    >
                      {badge.label}
                    </span>
                  ))}
                </div>
                <div
                  className="rounded-md border overflow-hidden"
                  style={{ borderColor: "var(--border)", borderRadius: "var(--radius-sm)" }}
                >
                  <table className="w-full text-[10px]">
                    <tbody>
                      {([
                        ["Padding X / Y", `${t.components.badge.paddingX} / ${t.components.badge.paddingY}`],
                        ["Font size", t.components.badge.fontSize],
                        ["Font weight", `${t.components.badge.fontWeight}`],
                        ["Border radius", t.components.badge.borderRadius],
                        ["Letter spacing", t.components.badge.letterSpacing],
                        ["Text transform", t.components.badge.textTransform],
                      ] as const).map(([prop, val], i) => (
                        <tr key={prop} style={{ backgroundColor: i % 2 === 0 ? "var(--background)" : "var(--muted)" }}>
                          <td className="px-3 py-1.5 font-medium" style={{ color: "var(--foreground)" }}>{prop}</td>
                          <td className="px-3 py-1.5 font-mono" style={{ color: "var(--muted-foreground)" }}>{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Avatar */}
              <div>
                <p className="text-[10px] font-medium mb-3" style={{ color: "var(--muted-foreground)" }}>
                  Avatar Sizes
                </p>
                <div className="flex items-end gap-4 mb-3">
                  {([
                    { size: "sm", dim: t.components.avatar.sizeSm },
                    { size: "md", dim: t.components.avatar.sizeMd },
                    { size: "lg", dim: t.components.avatar.sizeLg },
                  ] as const).map((variant) => (
                    <div key={variant.size} className="text-center">
                      <div
                        className="flex items-center justify-center mx-auto"
                        style={{
                          width: variant.dim,
                          height: variant.dim,
                          borderRadius: t.components.avatar.borderRadius,
                          backgroundColor: "var(--primary)",
                        }}
                      >
                        <span
                          className="font-bold"
                          style={{
                            color: "var(--primary-foreground)",
                            fontSize: `calc(${variant.dim} * 0.4)`,
                          }}
                        >
                          AB
                        </span>
                      </div>
                      <p className="text-[9px] font-medium mt-1" style={{ color: "var(--foreground)" }}>{variant.size}</p>
                      <p className="text-[8px] font-mono" style={{ color: "var(--muted-foreground)" }}>{variant.dim}</p>
                    </div>
                  ))}
                </div>
                <div
                  className="rounded-md border overflow-hidden"
                  style={{ borderColor: "var(--border)", borderRadius: "var(--radius-sm)" }}
                >
                  <table className="w-full text-[10px]">
                    <tbody>
                      {([
                        ["Size (sm / md / lg)", `${t.components.avatar.sizeSm} / ${t.components.avatar.sizeMd} / ${t.components.avatar.sizeLg}`],
                        ["Border radius", t.components.avatar.borderRadius],
                      ] as const).map(([prop, val], i) => (
                        <tr key={prop} style={{ backgroundColor: i % 2 === 0 ? "var(--background)" : "var(--muted)" }}>
                          <td className="px-3 py-1.5 font-medium" style={{ color: "var(--foreground)" }}>{prop}</td>
                          <td className="px-3 py-1.5 font-mono" style={{ color: "var(--muted-foreground)" }}>{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Focus & Interaction ── */}
        {t.focus && (
          <section>
            <SectionHeader>Focus &amp; Interaction</SectionHeader>
            <div
              className="rounded-lg border p-5 space-y-5"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "var(--radius)" }}
            >
              <div className="flex flex-wrap gap-4 items-start">
                {/* Focused button */}
                <div>
                  <p className="text-[10px] font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>
                    Button with Focus Ring
                  </p>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium"
                    style={{
                      backgroundColor: "var(--primary)",
                      color: "var(--primary-foreground)",
                      borderRadius: "var(--radius)",
                      border: "none",
                      cursor: "default",
                      outline: `${t.focus.ringWidth} ${t.focus.outlineStyle} ${t.focus.ringColor}`,
                      outlineOffset: t.focus.ringOffset,
                    }}
                  >
                    Focused Button
                  </button>
                </div>

                {/* Focused input */}
                <div className="flex-1 min-w-[200px]">
                  <p className="text-[10px] font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>
                    Input with Focus Ring
                  </p>
                  <input
                    type="text"
                    placeholder="Focused input"
                    readOnly
                    style={{
                      width: "100%",
                      height: t.components?.input?.height || "2.5rem",
                      paddingLeft: t.components?.input?.paddingX || "0.75rem",
                      paddingRight: t.components?.input?.paddingX || "0.75rem",
                      fontSize: t.components?.input?.fontSize || "0.875rem",
                      borderRadius: t.components?.input?.borderRadius || "var(--radius-sm)",
                      borderWidth: t.components?.input?.borderWidth || "1px",
                      borderStyle: "solid",
                      borderColor: "var(--ring)",
                      backgroundColor: "var(--background)",
                      color: "var(--foreground)",
                      fontFamily: "var(--font-body)",
                      outline: `${t.focus.ringWidth} ${t.focus.outlineStyle} ${t.focus.ringColor}`,
                      outlineOffset: t.focus.ringOffset,
                    }}
                  />
                </div>
              </div>

              {/* Spec values */}
              <div
                className="rounded-md border overflow-hidden"
                style={{ borderColor: "var(--border)", borderRadius: "var(--radius-sm)" }}
              >
                <table className="w-full text-[10px]">
                  <thead>
                    <tr style={{ backgroundColor: "var(--muted)" }}>
                      {["Property", "Value"].map((h) => (
                        <th key={h} className="text-left px-3 py-1.5 font-semibold" style={{ color: "var(--muted-foreground)", borderBottom: "1px solid var(--border)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {([
                      ["Ring width", t.focus.ringWidth],
                      ["Ring offset", t.focus.ringOffset],
                      ["Ring color", t.focus.ringColor],
                      ["Outline style", t.focus.outlineStyle],
                    ] as const).map(([prop, val], i) => (
                      <tr key={prop} style={{ backgroundColor: i % 2 === 0 ? "var(--background)" : "var(--muted)" }}>
                        <td className="px-3 py-1.5 font-medium" style={{ color: "var(--foreground)" }}>{prop}</td>
                        <td className="px-3 py-1.5 font-mono flex items-center gap-2" style={{ color: "var(--muted-foreground)" }}>
                          {prop === "Ring color" && (
                            <span
                              className="inline-block w-3 h-3 rounded-sm border shrink-0"
                              style={{ backgroundColor: val, borderColor: "var(--border)" }}
                            />
                          )}
                          {val}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ── Section Spacing ── */}
        {t.sectionSpacing && (
          <section>
            <SectionHeader>Section Spacing</SectionHeader>
            <div
              className="rounded-lg border p-5"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "var(--radius)" }}
            >
              {(() => {
                const spacingData = [
                  { label: "Small", desktop: t.sectionSpacing.paddingSm, tablet: t.sectionSpacing.paddingSmTablet, mobile: t.sectionSpacing.paddingSmMobile },
                  { label: "Medium", desktop: t.sectionSpacing.paddingMd, tablet: t.sectionSpacing.paddingMdTablet, mobile: t.sectionSpacing.paddingMdMobile },
                  { label: "Large", desktop: t.sectionSpacing.paddingLg, tablet: t.sectionSpacing.paddingLgTablet, mobile: t.sectionSpacing.paddingLgMobile },
                ];
                // Parse values to compute relative bar widths
                const parseVal = (v: string) => parseFloat(v) || 0;
                const allVals = spacingData.flatMap((r) => [parseVal(r.desktop), parseVal(r.tablet), parseVal(r.mobile)]);
                const maxVal = Math.max(...allVals, 1);

                return (
                  <div>
                    {/* Column headers */}
                    <div className="grid grid-cols-[80px_1fr_1fr_1fr] gap-2 mb-2">
                      <div />
                      {["Desktop", "Tablet", "Mobile"].map((col) => (
                        <p key={col} className="text-[10px] font-medium text-center" style={{ color: "var(--muted-foreground)" }}>
                          {col}
                        </p>
                      ))}
                    </div>
                    {/* Rows */}
                    <div className="space-y-2">
                      {spacingData.map((row) => (
                        <div key={row.label} className="grid grid-cols-[80px_1fr_1fr_1fr] gap-2 items-center">
                          <span className="text-[10px] font-medium text-right" style={{ color: "var(--foreground)" }}>
                            {row.label}
                          </span>
                          {[row.desktop, row.tablet, row.mobile].map((val, colIdx) => {
                            const pct = maxVal > 0 ? (parseVal(val) / maxVal) * 100 : 0;
                            const opacities = [0.9, 0.65, 0.4];
                            return (
                              <div key={colIdx} className="flex items-center gap-1.5">
                                <div
                                  className="h-6 rounded-sm flex items-center px-2 shrink-0"
                                  style={{
                                    width: `${Math.max(pct, 15)}%`,
                                    backgroundColor: "var(--primary)",
                                    opacity: opacities[colIdx],
                                    borderRadius: "var(--radius-sm)",
                                    minWidth: "36px",
                                  }}
                                >
                                  <span
                                    className="text-[9px] font-mono font-medium whitespace-nowrap"
                                    style={{ color: "var(--primary-foreground)" }}
                                  >
                                    {val}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          </section>
        )}

        {/* ── Component Showcase ── */}
        <section>
          <SectionHeader>Component Preview</SectionHeader>
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
                {[
                  { label: "Primary", bg: "var(--primary)", fg: "var(--primary-foreground)" },
                  { label: "Secondary", bg: "var(--secondary)", fg: "var(--secondary-foreground)" },
                  { label: "Destructive", bg: "var(--destructive)", fg: "var(--destructive-foreground)" },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    className="px-4 py-2 text-sm font-medium"
                    style={{ backgroundColor: btn.bg, color: btn.fg, borderRadius: "var(--radius)" }}
                  >
                    {btn.label}
                  </button>
                ))}
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
                    backgroundColor: "var(--muted)",
                    color: "var(--muted-foreground)",
                    borderRadius: "var(--radius)",
                  }}
                >
                  Ghost
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
                style={{ backgroundColor: "var(--background)", borderColor: "var(--border)", borderRadius: "var(--radius-lg)" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold" style={{ color: "var(--foreground)", fontFamily: "var(--font-heading)" }}>
                    Project Alpha
                  </h4>
                  <span
                    className="px-2 py-0.5 text-[10px] font-medium rounded-full"
                    style={{ backgroundColor: "var(--accent)", color: "var(--accent-foreground)" }}
                  >
                    Active
                  </span>
                </div>
                <p className="text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>
                  A sample card styled with your design tokens.
                </p>
                <div className="flex gap-2">
                  <div
                    className="flex-1 h-2 rounded-full"
                    style={{ backgroundColor: "var(--primary)", borderRadius: "var(--radius-sm)" }}
                  />
                  <div
                    className="w-8 h-2 rounded-full"
                    style={{ backgroundColor: "var(--muted)", borderRadius: "var(--radius-sm)" }}
                  />
                </div>
              </div>
            </div>

            {/* Form elements */}
            <div>
              <p className="text-[10px] font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>
                Form Elements
              </p>
              <div className="space-y-2 max-w-xs">
                <div>
                  <label className="text-xs font-medium block mb-1" style={{ color: "var(--foreground)" }}>
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    readOnly
                    className="w-full px-3 py-2 text-sm border outline-none"
                    style={{ backgroundColor: "var(--background)", borderColor: "var(--input)", color: "var(--foreground)", borderRadius: "var(--radius-sm)" }}
                  />
                </div>
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 text-[10px] font-medium rounded-full" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>
                    Badge
                  </span>
                  <span className="px-2.5 py-1 text-[10px] font-medium rounded-full border" style={{ backgroundColor: "transparent", color: "var(--foreground)", borderColor: "var(--border)" }}>
                    Outline
                  </span>
                  <span className="px-2.5 py-1 text-[10px] font-medium rounded-full" style={{ backgroundColor: "var(--destructive)", color: "var(--destructive-foreground)" }}>
                    Error
                  </span>
                  <span className="px-2.5 py-1 text-[10px] font-medium rounded-full" style={{ backgroundColor: "var(--accent)", color: "var(--accent-foreground)" }}>
                    Accent
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Mini Dashboard Mockup ── */}
        <section>
          <SectionHeader>In Production</SectionHeader>
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
              <div className="flex-1 h-3.5 rounded-sm max-w-[200px]" style={{ backgroundColor: "var(--muted)" }} />
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
                <div className="h-3 rounded-sm w-32" style={{ backgroundColor: "var(--foreground)", opacity: 0.15 }} />
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Revenue", bg: "var(--primary)", fg: "var(--primary-foreground)" },
                    { label: "Users", bg: "var(--accent)", fg: "var(--accent-foreground)" },
                    { label: "Growth", bg: "var(--secondary)", fg: "var(--secondary-foreground)" },
                  ].map((card) => (
                    <div
                      key={card.label}
                      className="p-2 rounded-md"
                      style={{ backgroundColor: card.bg, borderRadius: "var(--radius-sm)" }}
                    >
                      <p className="text-[8px]" style={{ color: card.fg, opacity: 0.7 }}>{card.label}</p>
                      <p className="text-sm font-bold tabular-nums" style={{ color: card.fg }}>
                        {card.label === "Revenue" ? "$12.4k" : card.label === "Users" ? "2,847" : "+18%"}
                      </p>
                    </div>
                  ))}
                </div>
                <div
                  className="h-16 rounded-md border"
                  style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "var(--radius-sm)" }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ── Helpers ── */

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-xs uppercase tracking-[0.15em] font-medium mb-3"
      style={{ color: "var(--muted-foreground)" }}
    >
      {children}
    </h3>
  );
}

function ColorSwatch({ color, label, name }: { color: string; label: string; name: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex-1 group relative"
      title={`${name}: ${color}`}
    >
      <div className="h-8 w-full" style={{ backgroundColor: color }} />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        {copied ? (
          <Check className="w-3 h-3" style={{ color: isLight(color) ? "#000" : "#fff" }} />
        ) : (
          <Copy className="w-3 h-3" style={{ color: isLight(color) ? "#000" : "#fff" }} />
        )}
      </div>
      <p
        className="text-[7px] text-center mt-0.5 font-mono tabular-nums"
        style={{ color: "var(--muted-foreground)" }}
      >
        {label}
      </p>
    </button>
  );
}

function SemanticSwatch({ name, color }: { name: string; color: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  // Convert camelCase to kebab for display
  const displayName = name.replace(/([A-Z])/g, "-$1").toLowerCase();

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-2 p-2 rounded-md border text-left hover:opacity-80 transition-opacity"
      style={{ borderColor: "var(--border)", borderRadius: "var(--radius-sm)" }}
    >
      <div
        className="w-6 h-6 rounded shrink-0 border"
        style={{ backgroundColor: color, borderColor: "var(--border)", borderRadius: "var(--radius-sm)" }}
      />
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium truncate" style={{ color: "var(--foreground)" }}>
          {displayName}
        </p>
        <p className="text-[9px] font-mono" style={{ color: "var(--muted-foreground)" }}>
          {copied ? "Copied!" : color}
        </p>
      </div>
    </button>
  );
}

function isLight(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}
