import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How DS.ai handles the data you submit while generating design tokens.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>Last updated September 2, 2026.</p>
      <p>
        DS.ai generates design tokens from the brand details you provide. This public beta does
        not require an account.
      </p>
      <h2 className="text-base font-semibold pt-4" style={{ color: "var(--foreground)" }}>
        What we collect
      </h2>
      <p>
        When you generate a system we send your answers (industry, mood, optional color, fonts,
        notes, and extracted website colors) to Anthropic so the model can produce tokens. If you
        paste a URL, our server fetches that public page to read colors and fonts. Logo uploads
        stay in your browser and are not uploaded to our servers.
      </p>
      <p>
        We do not store generated token sets, chat answers, or uploaded logos in a database in
        this beta. Server logs may include IP address, timestamps, and error messages used to
        operate rate limits and debug failures.
      </p>
      <h2 className="text-base font-semibold pt-4" style={{ color: "var(--foreground)" }}>
        Processors
      </h2>
      <p>
        Generation runs through Anthropic. Hosting may run on Vercel. Their processing is
        governed by their own policies.
      </p>
      <h2 className="text-base font-semibold pt-4" style={{ color: "var(--foreground)" }}>
        Contact
      </h2>
      <p>
        This beta does not have a support inbox yet. If you are working with Bold &amp; Code
        directly, use the same channel you already have.
      </p>
    </LegalPage>
  );
}
