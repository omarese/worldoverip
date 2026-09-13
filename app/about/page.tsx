import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Why WorldOverIP exists and how the comparison catalog works.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-12">
      <h1 className="font-serif text-4xl">About WorldOverIP</h1>
      <p className="mt-4 text-lg text-muted">
        WorldOverIP is an independent travel eSIM comparison site. The idea is simple: one place
        to line up plans by destination instead of opening six provider apps at the airport.
      </p>
      <p className="mt-4 text-muted">
        The first version ships with a sample catalog so the product is usable while live provider
        feeds and affiliate links are wired up. Every comparison table is honest about that.
      </p>
      <p className="mt-4 text-muted">
        Next steps: live prices, user reviews, and a “best plan for this trip length” calculator.
      </p>
    </main>
  );
}
