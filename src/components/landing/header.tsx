"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "./theme-switcher";

const NAV_LINKS = [
  { label: "How", href: "/#how-it-works" },
  { label: "Formats", href: "/#formats" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "backdrop-blur-xl border-b border-[var(--border)]/50"
          : ""
      )}
      style={{
        backgroundColor: scrolled
          ? "color-mix(in srgb, var(--background) 85%, transparent)"
          : "transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold tracking-tight"
          style={{ color: "var(--foreground)" }}
        >
          DS
          <span style={{ color: "var(--primary)" }}>.ai</span>
        </Link>

        {/* Right side: nav + theme switcher */}
        <div className="flex items-center gap-4 sm:gap-8">
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium transition-colors duration-300 hover:opacity-80"
                style={{ color: "var(--muted-foreground)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden sm:block w-px h-5" style={{ backgroundColor: "var(--border)" }} />

          <ThemeSwitcher className="hidden sm:flex" />

          <Link
            href="/generator"
            className="text-sm font-semibold px-3 py-1.5 rounded-md"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            Generate
          </Link>
        </div>
      </div>
    </header>
  );
}
