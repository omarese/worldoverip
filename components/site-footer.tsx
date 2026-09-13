import Link from 'next/link';
import { Globe, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="space-y-4 md:col-span-1">
          <Link href="/" className="flex items-center space-x-2 text-white font-extrabold text-xl">
            <Globe className="w-6 h-6 text-blue-500" />
            <span>WorldOverIP</span>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed">
            Compare travel eSIMs by destination, data, and price before you leave Wi-Fi.
          </p>
        </div>

        {/* Quick Links / Sitemap */}
        <div>
          <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/destinations" className="hover:text-white transition">Destinations</Link></li>
            <li><Link href="/providers" className="hover:text-white transition">Providers</Link></li>
            <li><Link href="/guide" className="hover:text-white transition">How eSIMs Work</Link></li>
          </ul>
        </div>

        {/* Company & Support */}
        <div>
          <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Contact</h4>
          <div className="flex items-center space-x-2 text-sm text-slate-300">
            <Mail className="w-4 h-4 text-blue-400" />
            <a href="mailto:support@worldoverip.com" className="hover:underline">support@worldoverip.com</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-slate-800 text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p>© {new Date().getFullYear()} WorldOverIP. All rights reserved.</p>
        <p>Plan prices on this site are for product comparison. Confirm live pricing on provider sites before purchasing.</p>
      </div>
    </footer>
  );
}