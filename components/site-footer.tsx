import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4 md:col-span-2">
            {/* Logo identico all'originale */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 shadow-md shadow-sky-500/20">
                <svg
                  className="h-4 w-4 text-white"
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
                <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-emerald-400" />
              </div>
              <span className="text-base font-bold text-white">
                worldover<span className="text-sky-400">ip</span>
              </span>
            </Link>
            <p className="max-w-sm text-sm text-slate-400">
              La piattaforma dove i viaggiatori pubblicano tappe, foto e memorie creando un diario di viaggio pubblico e connesso.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Esplora</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/#feed" className="transition hover:text-white">
                  Feed Globale
                </Link>
              </li>
              <li>
                <Link href="/#explore" className="transition hover:text-white">
                  Destinazioni
                </Link>
              </li>
              <li>
                <Link href="/register" className="transition hover:text-white">
                  Crea Profilo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Informazioni</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/about" className="transition hover:text-white">
                  Chi siamo
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition hover:text-white">
                  Termini
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800/60 pt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} worldoverip.com. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  );
}