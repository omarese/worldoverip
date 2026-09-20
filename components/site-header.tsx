import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          {/* Logo identico all'originale */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 shadow-lg shadow-sky-500/20">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white">
                worldover<span className="text-sky-400">ip</span>
              </span>
              <span className="ml-1 text-xs text-slate-500">.com</span>
            </div>
          </Link>

          {/* Navigazione */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/#feed"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Feed
            </Link>
            <Link
              href="/#explore"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Esplora Luoghi
            </Link>
            <Link
              href="/#travelers"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Community
            </Link>
          </nav>
        </div>

        {/* Tasti Login e Register */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800/80 hover:text-white"
          >
            Accedi
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:from-sky-400 hover:to-blue-500 hover:shadow-sky-500/35"
          >
            Registrati
          </Link>
        </div>
      </div>
    </header>
  );
}