"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="border-t px-6 py-12"
      style={{
        backgroundColor: "var(--muted)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <span
            className="text-base font-bold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            DS<span style={{ color: "var(--primary)" }}>.ai</span>
          </span>
          <p
            className="text-xs"
            style={{ color: "var(--muted-foreground)" }}
          >
            Built with the design system you see right now.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="https://github.com"
            target="_blank"
            className="text-xs font-medium transition-opacity hover:opacity-70"
            style={{ color: "var(--muted-foreground)" }}
          >
            GitHub
          </Link>
          <Link
            href="https://x.com"
            target="_blank"
            className="text-xs font-medium transition-opacity hover:opacity-70"
            style={{ color: "var(--muted-foreground)" }}
          >
            X / Twitter
          </Link>
          <span
            className="text-xs"
            style={{ color: "var(--muted-foreground)" }}
          >
            {new Date().getFullYear()} Bold & Code, Inc.
          </span>
        </div>
      </div>
    </footer>
  );
}
