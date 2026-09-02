"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type GeneratorTab = "input" | "preview" | "export";

interface GeneratorUIValue {
  tab: GeneratorTab;
  setTab: (tab: GeneratorTab) => void;
}

const GeneratorUIContext = createContext<GeneratorUIValue | null>(null);

export function GeneratorUIProvider({ children }: { children: React.ReactNode }) {
  const [tab, setTab] = useState<GeneratorTab>("input");
  const value = useMemo(() => ({ tab, setTab }), [tab]);
  return (
    <GeneratorUIContext.Provider value={value}>{children}</GeneratorUIContext.Provider>
  );
}

export function useGeneratorUI() {
  const ctx = useContext(GeneratorUIContext);
  if (!ctx) {
    throw new Error("useGeneratorUI must be used within GeneratorUIProvider");
  }
  return ctx;
}
