import Link from 'next/link';
import { Globe } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { signOut } from '@/app/auth/actions';
import { UserAvatar } from '@/components/user-avatar';
import { ProfileSearch } from '@/components/profile-search';

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="w-full bg-[#FAF7F2] relative z-30 py-4 px-6 md:px-12 flex items-center justify-between border-b border-slate-200/50">

      <Link href="/" className="flex items-center space-x-2">
        <Globe className="w-6 h-6 text-sky-600" />
        <span className="text-xl font-black text-slate-900 tracking-tight">
          WorldOverIP
        </span>
      </Link>

      <div className="flex items-center space-x-4 sm:space-x-6 text-xs font-bold text-slate-800">
        <Link
          href="/explore"
          className="hover:text-sky-600 transition hidden sm:inline-block"
        >
          Explore
        </Link>
        <Link
          href="/destinations"
          className="hover:text-sky-600 transition hidden sm:inline-block"
        >
          Destinations
        </Link>

        {user ? (
          <div className="flex items-center space-x-2">
            <ProfileSearch />
            {user.username && (
              <Link
                href={`/u/${user.username}`}
                aria-label="Your profile"
                className="flex items-center space-x-2 font-extrabold text-slate-900 hover:text-sky-600 transition"
              >
                <UserAvatar username={user.username} url={user.avatarUrl} />
                <span className="hidden sm:inline-block">@{user.username}</span>
              </Link>
            )}
            <form action={signOut}>
              <button
                type="submit"
                className="bg-white border border-slate-300 rounded-full px-3.5 py-2 hover:bg-slate-50 transition shadow-sm text-slate-900"
              >
                Logout
              </button>
            </form>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Link
              href="/login"
              className="bg-white border border-slate-300 rounded-full px-3.5 py-2 hover:bg-slate-50 transition shadow-sm text-slate-900"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-slate-900 border border-slate-900 rounded-full px-3.5 py-2 hover:bg-slate-700 transition shadow-sm text-white"
            >
              Register
            </Link>
          </div>
        )}
      </div>

    </header>
  );
}

export default SiteHeader;