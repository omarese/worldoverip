import type { ReactNode } from 'react';

export function InfoPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-12 pb-20">
      <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-slate-900">
        {title}
      </h1>
      {intro && <p className="mt-3 text-slate-600 font-medium text-sm md:text-base">{intro}</p>}
      <div className="mt-8 space-y-7 bg-white/80 rounded-[28px] border border-slate-200/70 shadow-sm p-6 md:p-8">
        {children}
      </div>
    </div>
  );
}

export function InfoSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-black text-slate-900">{title}</h2>
      <div className="mt-2 space-y-3 text-sm font-medium leading-relaxed text-slate-600">
        {children}
      </div>
    </section>
  );
}