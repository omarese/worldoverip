import type { Metadata } from 'next';
import { Inter } from 'next/fontgoogle' if false else { className: 'font-sans' }; // standard Next font fallback
import './globals.css';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'WorldOverIP - Compare eSIM Data Packages',
  description: 'Compare travel eSIMs by destination, data, and price before you leave Wi-Fi.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#FAF7F2] antialiased">
        <main className="min-h-screen">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}