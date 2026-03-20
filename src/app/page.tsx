"use client";

import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { TokenCategories } from "@/components/landing/token-categories";
import { ExportFormats } from "@/components/landing/export-formats";
import { CtaBanner } from "@/components/landing/cta-banner";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <TokenCategories />
        <ExportFormats />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
