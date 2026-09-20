import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-start px-6 py-20">
      <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">Page not found</h1>
      <p className="mt-3 text-sm md:text-base font-medium text-slate-600">
        That page isn’t on the map. It may have moved, or the story was removed.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-slate-900 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:bg-slate-700"
      >
        Back home
      </Link>
    </div>
  );
}