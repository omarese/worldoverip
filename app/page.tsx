import Link from "next/link";

const mockTravelPosts = [
  {
    id: 1,
    author: "marco_globetrotter",
    location: "Kyoto, Giappone",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80",
    caption: "Alba tra i templi di Higashiyama prima che la città si svegli ⛩️",
    date: "Oggi",
    likes: 184
  },
  {
    id: 2,
    author: "elena_ontheroad",
    location: "Dolomiti, Italia",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80",
    caption: "Tappa 3 del trekking: pernottamento sotto le Tre Cime 🏔️",
    date: "Ieri",
    likes: 243
  },
  {
    id: 3,
    author: "sam_explores",
    location: "Reykjavik, Islanda",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&auto=format&fit=crop&q=80",
    caption: "La prima notte a caccia dell'aurora boreale. Esperienza magica ✨",
    date: "2 giorni fa",
    likes: 312
  }
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Sfondo originale con glow sfumati */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-sky-500/15 via-blue-500/10 to-indigo-500/15 blur-3xl" />
      <div className="pointer-events-none absolute top-96 right-0 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-3xl" />

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-4xl px-4 pt-20 pb-16 text-center sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3.5 py-1.5 text-xs font-medium text-sky-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-sky-400" />
          Il tuo diario di viaggio globale
        </div>

        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
          Condividi ogni tappa su{" "}
          <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            worldoverip
          </span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
          Crea il tuo profilo, scatta e racconta le tue avventure con posizione geografica e data.
          Costruisci il tuo diario itinerante e scopri dove stanno viaggiando gli altri.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/register"
            className="rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:from-sky-400 hover:to-blue-500"
          >
            Inizia il tuo Diario
          </Link>
          <Link
            href="#feed"
            className="rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-3 font-semibold text-slate-200 transition hover:bg-slate-800 hover:text-white"
          >
            Guarda i Post
          </Link>
        </div>
      </section>

      {/* Feed Card */}
      <section id="feed" className="relative z-10 mx-auto max-w-xl space-y-6 px-4 pb-24">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Storie recenti</h2>
            <p className="text-xs text-slate-400">Memorie e foto condivise dai viaggiatori</p>
          </div>
          <Link href="/register" className="text-xs text-sky-400 hover:underline">
            Condividi una tappa →
          </Link>
        </div>

        {mockTravelPosts.map((post) => (
          <article
            key={post.id}
            className="overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 shadow-xl backdrop-blur-md"
          >
            {/* Header del post */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 text-xs font-bold uppercase text-white">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">
                    @{post.author}
                  </h3>
                  <p className="text-xs text-sky-400">
                    📍 {post.location}
                  </p>
                </div>
              </div>
              <span className="text-xs text-slate-400">{post.date}</span>
            </div>

            {/* Immagine */}
            <div className="aspect-square w-full overflow-hidden bg-slate-950">
              <img
                src={post.image}
                alt={post.location}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Azioni e Didascalia */}
            <div className="space-y-2 p-4">
              <div className="flex items-center gap-4 text-xs font-medium text-slate-300">
                <button className="transition hover:text-red-400">
                  ❤️ {post.likes} Mi piace
                </button>
                <button className="transition hover:text-sky-400">
                  💬 Commenta
                </button>
              </div>
              <p className="text-sm leading-snug text-slate-200">
                <span className="mr-2 font-semibold text-white">@{post.author}</span>
                {post.caption}
              </p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}