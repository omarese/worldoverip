import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-col items-start px-5 py-20">
      <h1 className="font-serif text-4xl">Page not found</h1>
      <p className="mt-3 text-muted">That route is not in the WorldOverIP catalog.</p>
      <Link href="/" className="mt-6 rounded-full bg-ink px-4 py-2 text-sm text-highlight">
        Back home
      </Link>
    </main>
  );
}
