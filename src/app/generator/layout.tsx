"use client";

import Link from "next/link";
import { ArrowLeft, SlidersHorizontal, Eye, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { GeneratorUIProvider, useGeneratorUI, type GeneratorTab } from "@/providers/generator-ui-provider";

const MOBILE_TABS = [
  { id: "input", label: "Input", icon: SlidersHorizontal },
  { id: "preview", label: "Preview", icon: Eye },
  { id: "export", label: "Export", icon: Download },
] as const satisfies ReadonlyArray<{ id: GeneratorTab; label: string; icon: typeof Eye }>;

function GeneratorShell({ children }: { children: React.ReactNode }) {
  const { tab, setTab } = useGeneratorUI();

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div
        className="shrink-0 h-12 flex items-center justify-between px-4 border-b"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
      >
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm font-bold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            DS<span style={{ color: "var(--primary)" }}>.ai</span>
          </Link>
          <div
            className="w-px h-4"
            style={{ backgroundColor: "var(--border)" }}
          />
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs transition-opacity hover:opacity-70"
            style={{ color: "var(--muted-foreground)" }}
          >
            <ArrowLeft className="w-3 h-3" />
            <span className="hidden sm:inline">Back to home</span>
            <span className="sm:hidden">Home</span>
          </Link>
        </div>
        <p
          className="text-xs font-medium"
          style={{ color: "var(--muted-foreground)" }}
        >
          Generator
        </p>
      </div>

      <div
        className="shrink-0 lg:hidden flex border-b"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
      >
        {MOBILE_TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-medium border-b-2"
            )}
            style={{
              borderColor: tab === item.id ? "var(--primary)" : "transparent",
              color: tab === item.id ? "var(--foreground)" : "var(--muted-foreground)",
            }}
          >
            <item.icon className="w-3.5 h-3.5" />
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex-1 flex overflow-hidden" data-mobile-tab={tab}>
        {children}
      </div>
    </div>
  );
}

export default function GeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GeneratorUIProvider>
      <GeneratorShell>{children}</GeneratorShell>
    </GeneratorUIProvider>
  );
}
