import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeTokenProvider } from "@/providers/theme-token-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DesignSystems.ai — AI-Powered Design System Generator",
  description:
    "Generate production-ready design systems from your brand identity. Export to CSS, Tailwind, DTCG tokens, and more. Your brand. Your design system. In minutes.",
  keywords: [
    "design system",
    "design tokens",
    "AI",
    "Tailwind",
    "CSS",
    "DTCG",
    "brand",
    "generator",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ThemeTokenProvider>{children}</ThemeTokenProvider>
      </body>
    </html>
  );
}
