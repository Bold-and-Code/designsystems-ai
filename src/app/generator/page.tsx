"use client";

import { useState, useCallback } from "react";
import { useThemeTokens } from "@/providers/theme-token-provider";
import { PRESETS } from "@/lib/tokens/presets";
import { ChatPanel, type UserInputs } from "@/components/generator/chat-panel";
import { PreviewPanel } from "@/components/generator/preview-panel";
import { ExportPanel } from "@/components/generator/export-panel";
import type { DesignTokens } from "@/lib/tokens/types";

type GenerationState = "idle" | "generating" | "complete";

export default function GeneratorPage() {
  const { setTokens } = useThemeTokens();
  const [generationState, setGenerationState] = useState<GenerationState>("idle");
  const [generatedTokens, setGeneratedTokens] = useState<DesignTokens | null>(null);

  const handleGenerate = useCallback(
    async (_inputs: UserInputs) => {
      setGenerationState("generating");

      // MOCK: Simulate API delay, then pick a random preset
      await new Promise((resolve) => setTimeout(resolve, 2500));

      const randomPreset =
        PRESETS[Math.floor(Math.random() * PRESETS.length)];
      const tokens = {
        ...randomPreset.tokens,
        meta: {
          ...randomPreset.tokens.meta,
          name: randomPreset.name,
          generatedAt: new Date().toISOString(),
        },
      };

      setGeneratedTokens(tokens);
      setTokens(tokens);
      setGenerationState("complete");
    },
    [setTokens]
  );

  return (
    <>
      {/* Left: Input */}
      <div
        className="w-full lg:w-[380px] shrink-0 border-r flex-col hidden lg:flex data-[active=true]:flex"
        data-active={undefined}
        style={{ borderColor: "var(--border)", backgroundColor: "var(--background)" }}
      >
        <ChatPanel
          generationState={generationState}
          onGenerate={handleGenerate}
        />
      </div>

      {/* Center: Preview */}
      <div
        className="flex-1 min-w-0 hidden lg:block data-[active=true]:block"
        data-active={undefined}
        style={{ backgroundColor: "var(--background)" }}
      >
        <PreviewPanel
          generationState={generationState}
          generatedTokens={generatedTokens}
        />
      </div>

      {/* Right: Export */}
      <div
        className="w-full lg:w-[340px] shrink-0 border-l flex-col hidden lg:flex data-[active=true]:flex"
        data-active={undefined}
        style={{ borderColor: "var(--border)", backgroundColor: "var(--background)" }}
      >
        <ExportPanel
          generationState={generationState}
          generatedTokens={generatedTokens}
        />
      </div>

      {/* Mobile: show panel based on parent data-mobile-tab */}
      <style>{`
        @media (max-width: 1023px) {
          [data-mobile-tab="input"] > div:nth-child(1) { display: flex !important; }
          [data-mobile-tab="input"] > div:nth-child(2) { display: none !important; }
          [data-mobile-tab="input"] > div:nth-child(3) { display: none !important; }
          [data-mobile-tab="preview"] > div:nth-child(1) { display: none !important; }
          [data-mobile-tab="preview"] > div:nth-child(2) { display: block !important; }
          [data-mobile-tab="preview"] > div:nth-child(3) { display: none !important; }
          [data-mobile-tab="export"] > div:nth-child(1) { display: none !important; }
          [data-mobile-tab="export"] > div:nth-child(2) { display: none !important; }
          [data-mobile-tab="export"] > div:nth-child(3) { display: flex !important; }
        }
      `}</style>
    </>
  );
}
