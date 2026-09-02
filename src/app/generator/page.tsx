"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useThemeTokens } from "@/providers/theme-token-provider";
import { useGeneratorUI } from "@/providers/generator-ui-provider";
import { PRESETS } from "@/lib/tokens/presets";
import { ChatPanel, type UserInputs } from "@/components/generator/chat-panel";
import { PreviewPanel } from "@/components/generator/preview-panel";
import { ExportPanel } from "@/components/generator/export-panel";
import type { DesignTokens } from "@/lib/tokens/types";
import { loadGoogleFonts } from "@/lib/tokens/apply-theme";

type GenerationState = "idle" | "generating" | "complete";

export default function GeneratorPage() {
  const { setTokens } = useThemeTokens();
  const { setTab } = useGeneratorUI();
  const [generationState, setGenerationState] = useState<GenerationState>("idle");
  const [generatedTokens, setGeneratedTokens] = useState<DesignTokens | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const applyGenerated = useCallback(
    (tokens: DesignTokens, fonts?: Array<{ family: string; weights: number[] }>) => {
      if (fonts?.length) {
        loadGoogleFonts(fonts);
      }
      setGeneratedTokens(tokens);
      setTokens(tokens);
      setGenerationState("complete");
      setTab("preview");
    },
    [setTokens, setTab]
  );

  const mockGenerate = useCallback(() => {
    const randomPreset = PRESETS[Math.floor(Math.random() * PRESETS.length)];
    const tokens = {
      ...randomPreset.tokens,
      meta: {
        ...randomPreset.tokens.meta,
        name: randomPreset.name,
        generatedAt: new Date().toISOString(),
      },
    };
    toast.message("Using a local preset — API key is not configured.");
    applyGenerated(tokens, randomPreset.fonts);
  }, [applyGenerated]);

  const handleGenerate = useCallback(
    async (inputs: UserInputs) => {
      setGenerationState("generating");
      setGenerationError(null);

      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inputs),
        });

        const payload = await res.json().catch(() => ({}));

        if (!res.ok) {
          if (
            process.env.NODE_ENV !== "production" &&
            res.status === 503
          ) {
            mockGenerate();
            return;
          }
          throw new Error(payload.error || "Generation failed");
        }

        applyGenerated(payload.tokens, payload.fonts);
      } catch (err) {
        console.error("Generation failed:", err);
        const message = err instanceof Error ? err.message : "Something went wrong";
        setGenerationError(message);
        setGenerationState("idle");
        toast.error(message);
      }
    },
    [applyGenerated, mockGenerate]
  );

  return (
    <>
      <div
        className="w-full lg:w-[380px] shrink-0 border-r flex-col hidden lg:flex"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--background)" }}
      >
        <ChatPanel
          generationState={generationState}
          onGenerate={handleGenerate}
          generationError={generationError}
        />
      </div>

      <div
        className="flex-1 min-w-0 hidden lg:block"
        style={{ backgroundColor: "var(--background)" }}
      >
        <PreviewPanel
          generationState={generationState}
          generatedTokens={generatedTokens}
        />
      </div>

      <div
        className="w-full lg:w-[340px] shrink-0 border-l flex-col hidden lg:flex"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--background)" }}
      >
        <ExportPanel
          generationState={generationState}
          generatedTokens={generatedTokens}
        />
      </div>

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
