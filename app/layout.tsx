import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Backdrop } from '@/components/backdrop';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'WorldOverIP - Share Your Travel Stories',
    template: '%s | WorldOverIP',
  },
  description:
    'A travel diary community. Share your trips, discover new destinations and follow travellers around the world.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#FAF7F2] antialiased min-h-screen flex flex-col`}>
        <SiteHeader />
        <main className="flex-1 relative overflow-hidden text-slate-800 tracking-tight">
          <Backdrop />
          <div className="relative z-10">{children}</div>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}