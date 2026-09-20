import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/60 backdrop-blur-sm text-zinc-400 text-sm">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Colonna 1: Bio / Concept */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30 text-xs font-bold">
                W
              </span>
              <span className="font-semibold text-white tracking-tight">
                worldover<span className="text-emerald-400">ip</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Il tuo diario di viaggio globale. Condividi storie, coordinate, foto e itinerari 
              con una community di viaggiatori di tutto il mondo.
            </p>
          </div>

          {/* Colonna 2: Piattaforma */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-3">
              Piattaforma
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#feed" className="hover:text-emerald-400 transition-colors">
                  Feed Globale
                </Link>
              </li>
              <li>
                <Link href="/#explore" className="hover:text-emerald-400 transition-colors">
                  Mappa & Destinazioni
                </Link>
              </li>
              <li>
                <Link href="/#create" className="hover:text-emerald-400 transition-colors">
                  Crea Diario
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonna 3: Community & Info */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 mb-3">
              Community
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  Chi siamo
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  Termini di Servizio
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} worldoverip.com. Tutti i diritti riservati.</p>
          <p className="text-zinc-500">
            Connetti i tuoi viaggi alla rete globale.
          </p>
        </div>
      </div>
    </footer>
  );
}