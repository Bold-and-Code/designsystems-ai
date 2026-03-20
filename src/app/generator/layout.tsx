"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, SlidersHorizontal, Eye, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const MOBILE_TABS = [
  { id: "input", label: "Input", icon: SlidersHorizontal },
  { id: "preview", label: "Preview", icon: Eye },
  { id: "export", label: "Export", icon: Download },
] as const;

type MobileTab = (typeof MOBILE_TABS)[number]["id"];

export default function GeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileTab, setMobileTab] = useState<MobileTab>("input");

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Top bar */}
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
            className="hidden sm:flex items-center gap-1.5 text-xs transition-opacity hover:opacity-70"
            style={{ color: "var(--muted-foreground)" }}
          >
            <ArrowLeft className="w-3 h-3" />
            Back to home
          </Link>
        </div>
        <p
          className="text-xs font-medium"
          style={{ color: "var(--muted-foreground)" }}
        >
          Design System Generator
        </p>
      </div>

      {/* Mobile tab bar */}
      <div
        className="shrink-0 lg:hidden flex border-b"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
      >
        {MOBILE_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setMobileTab(tab.id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-medium transition-all border-b-2",
            )}
            style={{
              borderColor:
                mobileTab === tab.id ? "var(--primary)" : "transparent",
              color:
                mobileTab === tab.id
                  ? "var(--foreground)"
                  : "var(--muted-foreground)",
            }}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Panel container */}
      <div className="flex-1 flex overflow-hidden" data-mobile-tab={mobileTab}>
        {children}
      </div>
    </div>
  );
}
