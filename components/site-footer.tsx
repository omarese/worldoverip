import Link from 'next/link';
import { Mail, Globe } from 'lucide-react';
import {
  InstagramIcon,
  YoutubeIcon,
  FacebookIcon,
  XIcon,
} from '@/components/social-icons';

// TODO: replace the "#" links with the real WorldOverIP social profiles.
const socialLinks = [
  { label: 'Instagram', href: '#', Icon: InstagramIcon },
  { label: 'YouTube', href: '#', Icon: YoutubeIcon },
  { label: 'Facebook', href: '#', Icon: FacebookIcon },
  { label: 'X', href: '#', Icon: XIcon },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#FAF7F2] text-slate-800 relative overflow-hidden pt-16 pb-12 border-t border-slate-200/60">

      {/* BACKGROUND DECORATIVE PARTICLES AND BLOBS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft Peach Circle - Left */}
        <div className="absolute -bottom-20 -left-20 w-[350px] h-[350px] rounded-full bg-[#FCD8B5]/40 blur-2xl" />

        {/* Coral Warm Blob - Right */}
        <div className="absolute top-0 -right-20 w-[400px] h-[400px] rounded-full bg-[#FCE5CD]/60 blur-3xl" />

        {/* Subtle Decorative Particle Dots */}
        <div className="absolute top-10 left-[15%] w-2.5 h-2.5 rounded-full bg-[#FCD8B5]/80" />
        <div className="absolute bottom-16 left-[45%] w-3 h-3 rounded-full bg-[#5FB58A]/30" />
        <div className="absolute top-1/2 right-[25%] w-2 h-2 rounded-full bg-[#78C8DB]/50" />
        <div className="absolute bottom-8 right-[10%] w-3.5 h-3.5 rounded-full bg-[#FCD8B5]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12">

          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Globe className="w-6 h-6 text-sky-600" />
              <span className="text-xl font-black text-slate-900 tracking-tight">
                WorldOverIP
              </span>
            </Link>
            <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-xs">
              A travel diary for everyone. Share your trips, discover new places and follow travellers around the world.
            </p>

            {/* Social icons */}
            <div className="flex items-center space-x-2.5 pt-1">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white border border-slate-300 shadow-sm flex items-center justify-center text-slate-800 hover:text-sky-600 hover:bg-slate-50 transition"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="text-xs font-black text-slate-900 tracking-wider uppercase mb-4">
              Community
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-600">
              <li>
                <Link href="/" className="hover:text-sky-600 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-sky-600 transition">
                  Explore Stories
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-sky-600 transition">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="hover:text-sky-600 transition">
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xs font-black text-slate-900 tracking-wider uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-600">
              <li>
                <Link href="/about" className="hover:text-sky-600 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-sky-600 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-sky-600 transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Join & Contact Column */}
          <div>
            <h4 className="text-xs font-black text-slate-900 tracking-wider uppercase mb-4">
              Join the community
            </h4>
            <div className="flex items-center space-x-2 mb-5">
              <Link
                href="/login"
                className="bg-white border border-slate-300 rounded-full px-3.5 py-2 text-xs font-bold hover:bg-slate-50 transition shadow-sm text-slate-900"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-slate-900 border border-slate-900 rounded-full px-3.5 py-2 text-xs font-bold hover:bg-slate-700 transition shadow-sm text-white"
              >
                Register
              </Link>
            </div>
            <a
              href="mailto:support@worldoverip.com"
              className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-700 hover:text-sky-600 transition"
            >
              <Mail className="w-4 h-4 text-sky-600" />
              <span>support@worldoverip.com</span>
            </a>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & COMMUNITY NOTE */}
        <div className="pt-8 border-t border-slate-300/60 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 font-medium gap-4">
          <p>© 2026 WorldOverIP. All rights reserved.</p>
          <p className="text-center md:text-right max-w-md">
            Stories are shared by our community. Be kind, respect local cultures and share responsibly.{' '}
            <Link href="/guidelines" className="underline hover:text-sky-600 transition">
              Read the guidelines
            </Link>
            .
          </p>
        </div>
      </div>

    </footer>
  );
}

export default SiteFooter;