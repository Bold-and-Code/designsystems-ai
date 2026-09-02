import Link from "next/link";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 px-6 pt-28 pb-16">
        <article className="max-w-2xl mx-auto">
          <p className="text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>
            <Link href="/" className="hover:opacity-70">
              Home
            </Link>
            <span className="mx-2">/</span>
            {title}
          </p>
          <h1
            className="text-3xl font-bold tracking-tight mb-8"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-heading)" }}
          >
            {title}
          </h1>
          <div
            className="space-y-4 text-sm leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
