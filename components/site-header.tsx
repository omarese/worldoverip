import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30 font-bold transition-transform group-hover:scale-105">
              W
            </span>
            <div className="flex flex-col">
              <span className="text-base font-semibold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                worldover<span className="text-emerald-400">ip</span>
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
            <Link
              href="/#feed"
              className="transition-colors hover:text-emerald-400 hover:underline underline-offset-4"
            >
              Feed
            </Link>
            <Link
              href="/#explore"
              className="transition-colors hover:text-emerald-400 hover:underline underline-offset-4"
            >
              Esplora Posti
            </Link>
            <Link
              href="/#community"
              className="transition-colors hover:text-emerald-400 hover:underline underline-offset-4"
            >
              Viaggiatori
            </Link>
          </nav>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-300 transition-colors hover:text-white hover:bg-white/10"
          >
            Accedi
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-emerald-500 px-4 py-1.5 text-sm font-medium text-black transition-all hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.35)]"
          >
            Registrati
          </Link>
        </div>
      </div>
    </header>
  );
}