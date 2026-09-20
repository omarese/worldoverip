import Link from "next/link";
import Image from "next/image";

// Esempi mock di post per l'anteprima del feed
const mockPosts = [
  {
    id: 1,
    author: "marco_explorer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    location: "Kyoto, Giappone",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80",
    caption: "Passeggiata mattutina tra i torii del Fushimi Inari prima della folla ⛩️",
    likes: 142,
    date: "2 ore fa"
  },
  {
    id: 2,
    author: "clara_wanders",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    location: "Reykjavik, Islanda",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&auto=format&fit=crop&q=80",
    caption: "Aurora boreale visibile direttamente dal fiordo. Sensazione inspiegabile.",
    likes: 318,
    date: "Ieri"
  },
  {
    id: 3,
    author: "luca_dolomiti",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    location: "Tre Cime di Lavaredo, Italia",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80",
    caption: "Alba a 2400m di quota dopo una notte in rifugio 🏔️",
    likes: 205,
    date: "3 giorni fa"
  }
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-white">
      {/* Background Layer (Mantiene la consistenza visuale precedente) */}
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-center opacity-25 filter blur-sm pointer-events-none"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/60 via-zinc-950/80 to-black pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6">
          Il tuo diario di viaggio globale
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
          Condividi ogni tappa del tuo viaggio su{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
            worldoverip
          </span>
        </h1>
        <p className="text-lg text-zinc-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Crea il tuo profilo, carica foto e coordinate geografiche di ogni posto visitato, 
          e costruisci la mappa interattiva delle tue avventure nel mondo.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/register"
            className="rounded-full bg-emerald-500 px-6 py-3 font-semibold text-black transition-all hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
          >
            Inizia il tuo Diario
          </Link>
          <Link
            href="#feed"
            className="rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-zinc-200 transition-colors hover:bg-white/10"
          >
            Esplora le Storie
          </Link>
        </div>
      </section>

      {/* Feed Preview Section */}
      <section id="feed" className="max-w-xl mx-auto px-4 pb-24 space-y-8">
        <div className="border-b border-white/10 pb-4 text-center">
          <h2 className="text-xl font-semibold text-zinc-100">Ultime storie dal mondo</h2>
          <p className="text-xs text-zinc-400">Scatti e itinerari condivisi dai viaggiatori</p>
        </div>

        {mockPosts.map((post) => (
          <article
            key={post.id}
            className="rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-md overflow-hidden shadow-xl"
          >
            {/* Header del post */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                />
                <div>
                  <h3 className="text-sm font-semibold text-zinc-100 hover:underline cursor-pointer">
                    @{post.author}
                  </h3>
                  <p className="text-xs text-emerald-400 flex items-center gap-1">
                    📍 {post.location}
                  </p>
                </div>
              </div>
              <span className="text-xs text-zinc-400">{post.date}</span>
            </div>

            {/* Immagine del post */}
            <div className="relative aspect-square w-full bg-black/40 overflow-hidden">
              <img
                src={post.image}
                alt={post.location}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>

            {/* Azioni & Didascalia */}
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-4 text-zinc-300">
                <button className="hover:text-red-400 transition-colors flex items-center gap-1 text-sm">
                  ❤️ <span>{post.likes}</span>
                </button>
                <button className="hover:text-emerald-400 transition-colors text-sm">
                  💬 Commenta
                </button>
              </div>
              <p className="text-sm text-zinc-200">
                <span className="font-semibold text-white mr-2">@{post.author}</span>
                {post.caption}
              </p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}