import Link from "next/link";

const links = [
  { href: "/destinations", label: "Destinations" },
  { href: "/providers", label: "Providers" },
  { href: "/guide", label: "How eSIMs work" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-panel/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4">
        <Link href="/" className="flex items-baseline gap-2 tracking-tight">
          <span className="font-serif text-xl font-semibold text-ink">WorldOverIP</span>
          <span className="hidden text-xs uppercase tracking-[0.18em] text-muted sm:inline">
            eSIM comparison
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-ink">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-accent">
              {link.label}
            </Link>
          ))}
          <Link
            href="/destinations"
            className="rounded-full bg-ink px-3.5 py-1.5 text-sm text-highlight hover:bg-accent-dark"
          >
            Compare plans
          </Link>
        </nav>
      </div>
    </header>
  );
}
