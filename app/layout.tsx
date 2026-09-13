import './globals.css';
import { SiteHeader } from '@/components/site-header';
import Footer from './Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900 flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}