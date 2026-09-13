import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-ink text-panel">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-3">
        <div>
          <p className="font-serif text-xl">WorldOverIP</p>
          <p className="mt-2 max-w-xs text-sm text-panel/70">
            Compare travel eSIMs by destination, data, and price before you leave Wi-Fi.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-2 uppercase tracking-[0.16em] text-highlight">Explore</p>
          <div className="flex flex-col gap-1.5 text-panel/80">
            <Link href="/destinations">Destinations</Link>
            <Link href="/providers">Providers</Link>
            <Link href="/guide">How eSIMs work</Link>
            <Link href="/about">About</Link>
          </div>
        </div>
        <p className="text-sm text-panel/65">
          Plan prices on this site are a sample catalog for product development. Confirm live
          pricing on each provider before you buy. WorldOverIP is independent and not affiliated
          with the brands listed.
        </p>
      </div>
    </footer>
  );
}
