"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Loader2,
  Globe,
  ImageIcon,
  Pencil,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface UserInputs {
  industry: string;
  mood: string[];
  brandColor: string;
  typographyStyle: string;
  roundedness: string;
  reference: string;
  context: string;
}

const EMPTY_INPUTS: UserInputs = {
  industry: "",
  mood: [],
  brandColor: "",
  typographyStyle: "",
  roundedness: "",
  reference: "",
  context: "",
};

const INDUSTRIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "E-commerce",
  "Creative",
  "Education",
  "Other",
];

const MOODS = [
  "Modern",
  "Playful",
  "Corporate",
  "Minimal",
  "Bold",
  "Elegant",
  "Warm",
  "Technical",
];

const TYPO_STYLES = [
  "Sans-serif",
  "Serif",
  "Monospace",
  "Mixed",
  "Let AI decide",
];

const ROUNDEDNESS_OPTIONS = [
  { label: "Sharp", value: "sharp", radius: "0px" },
  { label: "Moderate", value: "moderate", radius: "8px" },
  { label: "Rounded", value: "rounded", radius: "16px" },
];

interface InputMethod {
  id: "scratch" | "url" | "logo";
  label: string;
  icon: typeof Pencil;
}

const INPUT_METHODS: InputMethod[] = [
  { id: "scratch", label: "From Scratch", icon: Pencil },
  { id: "url", label: "From URL", icon: Globe },
  { id: "logo", label: "From Logo", icon: ImageIcon },
];

interface ChatPanelProps {
  generationState: "idle" | "generating" | "complete";
  onGenerate: (inputs: UserInputs) => void;
}

export function ChatPanel({ generationState, onGenerate }: ChatPanelProps) {
  const [inputMethod, setInputMethod] = useState<"scratch" | "url" | "logo">(
    "scratch"
  );
  const [inputs, setInputs] = useState<UserInputs>(EMPTY_INPUTS);
  const [expandedStep, setExpandedStep] = useState<number>(1);

  const update = (key: keyof UserInputs, value: string | string[]) =>
    setInputs((prev) => ({ ...prev, [key]: value }));

  const canGenerate = inputs.industry !== "" && inputs.mood.length > 0;
  const isGenerating = generationState === "generating";
  const isComplete = generationState === "complete";

  const toggleMood = (mood: string) => {
    const current = inputs.mood;
    update(
      "mood",
      current.includes(mood)
        ? current.filter((m) => m !== mood)
        : [...current, mood]
    );
  };

  const getSummary = (step: number): string | null => {
    switch (step) {
      case 1:
        return inputs.industry || null;
      case 2:
        return inputs.mood.length ? inputs.mood.join(", ") : null;
      case 3:
        return inputs.brandColor || "AI decides";
      case 4:
        return inputs.typographyStyle || null;
      case 5:
        return inputs.roundedness || null;
      case 6:
        return inputs.reference ? `"${inputs.reference.slice(0, 40)}..."` : "Skipped";
      case 7:
        return inputs.context ? `"${inputs.context.slice(0, 40)}..."` : "Skipped";
      default:
        return null;
    }
  };

  const handleGenerate = () => {
    onGenerate(inputs);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Input method selector */}
      <div className="shrink-0 p-4 border-b" style={{ borderColor: "var(--border)" }}>
        <p
          className="text-[10px] uppercase tracking-[0.15em] font-medium mb-2.5"
          style={{ color: "var(--muted-foreground)" }}
        >
          Input method
        </p>
        <div
          className="flex gap-1 p-0.5 rounded-lg"
          style={{ backgroundColor: "var(--muted)", borderRadius: "var(--radius)" }}
        >
          {INPUT_METHODS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setInputMethod(m.id)}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md transition-all"
              style={{
                backgroundColor: inputMethod === m.id ? "var(--card)" : "transparent",
                color: inputMethod === m.id ? "var(--foreground)" : "var(--muted-foreground)",
                boxShadow: inputMethod === m.id ? "var(--shadow-sm)" : "none",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <m.icon className="w-3 h-3" />
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {/* URL input (conditional) */}
        {inputMethod === "url" && (
          <div
            className="rounded-lg border p-3 mb-3"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--card)", borderRadius: "var(--radius)" }}
          >
            <label
              className="text-xs font-medium mb-1.5 block"
              style={{ color: "var(--foreground)" }}
            >
              Website URL
            </label>
            <input
              type="url"
              placeholder="https://example.com"
              className="w-full px-3 py-2 text-sm rounded-md border outline-none transition-colors"
              style={{
                backgroundColor: "var(--background)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
                borderRadius: "var(--radius-sm)",
              }}
            />
            <p className="text-[10px] mt-1.5" style={{ color: "var(--muted-foreground)" }}>
              We'll extract colors, fonts, and style patterns.
            </p>
          </div>
        )}

        {/* Logo upload (conditional) */}
        {inputMethod === "logo" && (
          <div
            className="rounded-lg border-2 border-dashed p-6 mb-3 text-center cursor-pointer hover:opacity-80 transition-opacity"
            style={{ borderColor: "var(--border)", borderRadius: "var(--radius)" }}
          >
            <ImageIcon className="w-8 h-8 mx-auto mb-2" style={{ color: "var(--muted-foreground)" }} />
            <p className="text-xs font-medium" style={{ color: "var(--foreground)" }}>
              Drop your logo here
            </p>
            <p className="text-[10px] mt-1" style={{ color: "var(--muted-foreground)" }}>
              PNG, SVG, or JPG. We'll extract your brand colors.
            </p>
          </div>
        )}

        {/* Step 1: Industry */}
        <StepCard
          step={1}
          title="What industry are you in?"
          summary={getSummary(1)}
          expanded={expandedStep === 1}
          onToggle={() => setExpandedStep(expandedStep === 1 ? 0 : 1)}
        >
          <div className="space-y-1">
            {INDUSTRIES.map((ind) => (
              <button
                key={ind}
                type="button"
                onClick={() => {
                  update("industry", ind);
                  setExpandedStep(2);
                }}
                className="w-full text-left px-3 py-2 text-sm rounded-md transition-all"
                style={{
                  backgroundColor: inputs.industry === ind ? "var(--primary)" : "transparent",
                  color: inputs.industry === ind ? "var(--primary-foreground)" : "var(--foreground)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                {ind}
              </button>
            ))}
          </div>
        </StepCard>

        {/* Step 2: Mood */}
        <StepCard
          step={2}
          title="What mood describes your brand?"
          summary={getSummary(2)}
          expanded={expandedStep === 2}
          onToggle={() => setExpandedStep(expandedStep === 2 ? 0 : 2)}
        >
          <div className="flex flex-wrap gap-1.5">
            {MOODS.map((mood) => {
              const active = inputs.mood.includes(mood);
              return (
                <button
                  key={mood}
                  type="button"
                  onClick={() => toggleMood(mood)}
                  className="px-3 py-1.5 text-xs font-medium rounded-full border transition-all"
                  style={{
                    backgroundColor: active ? "var(--primary)" : "transparent",
                    color: active ? "var(--primary-foreground)" : "var(--foreground)",
                    borderColor: active ? "var(--primary)" : "var(--border)",
                  }}
                >
                  {mood}
                </button>
              );
            })}
          </div>
          {inputs.mood.length > 0 && (
            <button
              type="button"
              onClick={() => setExpandedStep(3)}
              className="mt-3 text-xs font-medium transition-opacity hover:opacity-70"
              style={{ color: "var(--primary)" }}
            >
              Continue
            </button>
          )}
        </StepCard>

        {/* Step 3: Color */}
        <StepCard
          step={3}
          title="Have a brand color?"
          summary={getSummary(3)}
          expanded={expandedStep === 3}
          onToggle={() => setExpandedStep(expandedStep === 3 ? 0 : 3)}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-md border shrink-0"
              style={{
                backgroundColor: inputs.brandColor || "var(--muted)",
                borderColor: "var(--border)",
                borderRadius: "var(--radius-sm)",
              }}
            />
            <input
              type="text"
              placeholder="#000000"
              value={inputs.brandColor}
              onChange={(e) => update("brandColor", e.target.value)}
              className="flex-1 px-3 py-2 text-sm rounded-md border outline-none font-mono"
              style={{
                backgroundColor: "var(--background)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
                borderRadius: "var(--radius-sm)",
              }}
            />
          </div>
          <p className="text-[10px] mt-2" style={{ color: "var(--muted-foreground)" }}>
            Leave blank to let AI decide based on your industry and mood.
          </p>
          <button
            type="button"
            onClick={() => setExpandedStep(4)}
            className="mt-2 text-xs font-medium transition-opacity hover:opacity-70"
            style={{ color: "var(--primary)" }}
          >
            Continue
          </button>
        </StepCard>

        {/* Step 4: Typography */}
        <StepCard
          step={4}
          title="Typography style preference?"
          summary={getSummary(4)}
          expanded={expandedStep === 4}
          onToggle={() => setExpandedStep(expandedStep === 4 ? 0 : 4)}
        >
          <div className="space-y-1">
            {TYPO_STYLES.map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => {
                  update("typographyStyle", style);
                  setExpandedStep(5);
                }}
                className="w-full text-left px-3 py-2 text-sm rounded-md transition-all flex items-center gap-2"
                style={{
                  backgroundColor: inputs.typographyStyle === style ? "var(--primary)" : "transparent",
                  color: inputs.typographyStyle === style ? "var(--primary-foreground)" : "var(--foreground)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      style === "Serif"
                        ? "Georgia, serif"
                        : style === "Monospace"
                        ? "monospace"
                        : "var(--font-body)",
                  }}
                >
                  Aa
                </span>
                {style}
              </button>
            ))}
          </div>
        </StepCard>

        {/* Step 5: Roundedness */}
        <StepCard
          step={5}
          title="Corner style?"
          summary={getSummary(5)}
          expanded={expandedStep === 5}
          onToggle={() => setExpandedStep(expandedStep === 5 ? 0 : 5)}
        >
          <div className="flex gap-4 justify-center py-2">
            {ROUNDEDNESS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  update("roundedness", opt.value);
                  setExpandedStep(6);
                }}
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className="w-14 h-14 border-2 transition-all"
                  style={{
                    borderRadius: opt.radius,
                    borderColor:
                      inputs.roundedness === opt.value
                        ? "var(--primary)"
                        : "var(--border)",
                    backgroundColor:
                      inputs.roundedness === opt.value
                        ? "var(--accent)"
                        : "transparent",
                  }}
                />
                <span
                  className="text-[10px] font-medium"
                  style={{
                    color:
                      inputs.roundedness === opt.value
                        ? "var(--foreground)"
                        : "var(--muted-foreground)",
                  }}
                >
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        </StepCard>

        {/* Step 6: Reference */}
        <StepCard
          step={6}
          title="Brands you admire? (optional)"
          summary={getSummary(6)}
          expanded={expandedStep === 6}
          onToggle={() => setExpandedStep(expandedStep === 6 ? 0 : 6)}
        >
          <textarea
            value={inputs.reference}
            onChange={(e) => update("reference", e.target.value)}
            placeholder="e.g. Stripe, Linear, Notion..."
            rows={2}
            className="w-full px-3 py-2 text-sm rounded-md border outline-none resize-none"
            style={{
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
              borderRadius: "var(--radius-sm)",
            }}
          />
          <button
            type="button"
            onClick={() => setExpandedStep(7)}
            className="mt-2 text-xs font-medium transition-opacity hover:opacity-70"
            style={{ color: "var(--primary)" }}
          >
            {inputs.reference ? "Continue" : "Skip"}
          </button>
        </StepCard>

        {/* Step 7: Context */}
        <StepCard
          step={7}
          title="Anything else? (optional)"
          summary={getSummary(7)}
          expanded={expandedStep === 7}
          onToggle={() => setExpandedStep(expandedStep === 7 ? 0 : 7)}
        >
          <textarea
            value={inputs.context}
            onChange={(e) => update("context", e.target.value)}
            placeholder="e.g. We're building a developer tool for startups..."
            rows={3}
            className="w-full px-3 py-2 text-sm rounded-md border outline-none resize-none"
            style={{
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
              borderRadius: "var(--radius-sm)",
            }}
          />
        </StepCard>
      </div>

      {/* Generate button */}
      <div className="shrink-0 p-4 border-t" style={{ borderColor: "var(--border)" }}>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={!canGenerate || isGenerating}
          className={cn(
            "w-full py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all",
            !canGenerate && "opacity-40 cursor-not-allowed",
            isGenerating && "opacity-70 cursor-wait"
          )}
          style={{
            backgroundColor: isComplete ? "transparent" : "var(--primary)",
            color: isComplete ? "var(--foreground)" : "var(--primary-foreground)",
            borderRadius: "var(--radius)",
            border: isComplete ? "1px solid var(--border)" : "none",
          }}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : isComplete ? (
            <>
              <RotateCcw className="w-4 h-4" />
              Regenerate
            </>
          ) : (
            "Generate Design System"
          )}
        </button>
        {!canGenerate && !isComplete && (
          <p
            className="text-[10px] text-center mt-2"
            style={{ color: "var(--muted-foreground)" }}
          >
            Answer Industry and Mood to continue
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Step Card ── */

function StepCard({
  step,
  title,
  summary,
  expanded,
  onToggle,
  children,
}: {
  step: number;
  title: string;
  summary: string | null;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-lg border overflow-hidden"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--card)",
        borderRadius: "var(--radius)",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors hover:opacity-90"
      >
        <span
          className="text-[10px] font-bold tabular-nums shrink-0 w-5 h-5 rounded flex items-center justify-center"
          style={{
            backgroundColor: summary ? "var(--primary)" : "var(--muted)",
            color: summary ? "var(--primary-foreground)" : "var(--muted-foreground)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          {String(step).padStart(2, "0")}
        </span>
        <span
          className="flex-1 text-xs font-medium truncate"
          style={{ color: "var(--foreground)" }}
        >
          {expanded ? title : summary ? `${title}` : title}
        </span>
        {!expanded && summary && (
          <span
            className="text-[10px] truncate max-w-[120px]"
            style={{ color: "var(--muted-foreground)" }}
          >
            {summary}
          </span>
        )}
        {expanded ? (
          <ChevronDown className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--muted-foreground)" }} />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--muted-foreground)" }} />
        )}
      </button>
      {expanded && (
        <div className="px-3 pb-3 pt-1">{children}</div>
      )}
    </div>
  );
}
