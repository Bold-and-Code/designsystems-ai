"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { DesignTokens, PresetMeta } from "@/lib/tokens/types";
import { applyTheme, loadGoogleFonts } from "@/lib/tokens/apply-theme";
import { PRESETS, DEFAULT_PRESET } from "@/lib/tokens/presets";

interface ThemeTokenContextValue {
  tokens: DesignTokens;
  activePresetId: string | null;
  setTokens: (tokens: DesignTokens) => void;
  setPreset: (presetId: string) => void;
  presets: PresetMeta[];
}

const ThemeTokenContext = createContext<ThemeTokenContextValue | null>(null);

export function ThemeTokenProvider({ children }: { children: React.ReactNode }) {
  const [tokens, setTokensState] = useState<DesignTokens>(DEFAULT_PRESET.tokens);
  const [activePresetId, setActivePresetId] = useState<string | null>(DEFAULT_PRESET.id);

  const setTokens = useCallback((newTokens: DesignTokens) => {
    setTokensState(newTokens);
    setActivePresetId(null); // custom tokens, no preset
    applyTheme(newTokens);
  }, []);

  const setPreset = useCallback((presetId: string) => {
    const preset = PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setTokensState(preset.tokens);
    setActivePresetId(preset.id);
    applyTheme(preset.tokens);
    // Load fonts for this preset
    if (preset.fonts.length > 0) {
      loadGoogleFonts(preset.fonts);
    }
  }, []);

  // Apply default theme on mount
  useEffect(() => {
    applyTheme(DEFAULT_PRESET.tokens);
    if (DEFAULT_PRESET.fonts.length > 0) {
      loadGoogleFonts(DEFAULT_PRESET.fonts);
    }
  }, []);

  return (
    <ThemeTokenContext.Provider
      value={{ tokens, activePresetId, setTokens, setPreset, presets: PRESETS }}
    >
      {children}
    </ThemeTokenContext.Provider>
  );
}

export function useThemeTokens() {
  const ctx = useContext(ThemeTokenContext);
  if (!ctx) throw new Error("useThemeTokens must be used within ThemeTokenProvider");
  return ctx;
}
