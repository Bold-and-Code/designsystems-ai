import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using the DS.ai public beta.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use">
      <p>Last updated September 2, 2026.</p>
      <p>
        DS.ai is a public beta from Bold &amp; Code. You may use it to generate design token
        files for your own projects. The service is provided as-is, with no uptime or quality
        guarantee.
      </p>
      <h2 className="text-base font-semibold pt-4" style={{ color: "var(--foreground)" }}>
        Acceptable use
      </h2>
      <p>
        Do not use the generator to attack other systems, scrape private networks, overload the
        API, or submit content you do not have the right to use. We rate-limit generation and URL
        extraction and may block abuse without notice.
      </p>
      <h2 className="text-base font-semibold pt-4" style={{ color: "var(--foreground)" }}>
        Your output
      </h2>
      <p>
        You keep the rights you already have in your brand assets. Token files the tool produces
        are yours to use. Model output can be imperfect; check contrast and licensing for fonts
        before shipping.
      </p>
      <h2 className="text-base font-semibold pt-4" style={{ color: "var(--foreground)" }}>
        Liability
      </h2>
      <p>
        To the extent allowed by law, Bold &amp; Code is not liable for lost profits, token
        quality, or third-party API outages. The beta may change or shut down at any time.
      </p>
    </LegalPage>
  );
}
