import { avatarColor } from '@/lib/data';

// Round profile picture. Shows the initials on a colour if the user has no picture yet.
export function UserAvatar({
  username,
  url,
  className = 'w-8 h-8 text-[11px]',
}: {
  username: string;
  url?: string | null;
  className?: string;
}) {
  if (url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={url} alt="" className={`${className} shrink-0 rounded-full object-cover bg-slate-200`} />
    );
  }

  return (
    <span
      aria-hidden
      className={`${className} shrink-0 rounded-full flex items-center justify-center font-black text-slate-900`}
      style={{ background: avatarColor(username) }}
    >
      {username.slice(0, 2).toUpperCase()}
    </span>
  );
}