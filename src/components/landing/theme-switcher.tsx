"use client";

import { useState } from "react";
import { useThemeTokens } from "@/providers/theme-token-provider";
import { cn } from "@/lib/utils";

export function ThemeSwitcher({ className }: { className?: string }) {
  const { activePresetId, setPreset, presets } = useThemeTokens();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {presets.map((preset) => {
        const isActive = activePresetId === preset.id;
        const isHovered = hoveredId === preset.id;

        return (
          <div key={preset.id} className="relative">
            <button
              type="button"
              onClick={() => setPreset(preset.id)}
              onMouseEnter={() => setHoveredId(preset.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                "w-7 h-7 rounded-full cursor-pointer border-2 transition-all duration-300",
                isActive
                  ? "scale-110 border-[var(--foreground)] shadow-md"
                  : "border-transparent hover:scale-105 hover:border-[var(--foreground)]/30"
              )}
              style={{ backgroundColor: preset.accent }}
              aria-label={`Switch to ${preset.name} theme`}
            />
            {/* Tooltip */}
            {isHovered && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap pointer-events-none z-50"
                style={{
                  backgroundColor: "var(--foreground)",
                  color: "var(--background)",
                }}
              >
                {preset.name}
                <div
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                  style={{ backgroundColor: "var(--foreground)" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
