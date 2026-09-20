-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run.

-- One public profile per account.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique
    constraint username_format check (username ~ '^[a-z0-9._]{3,20}$'),
  created_at timestamptz not null default now()
);

-- Row Level Security: the database itself enforces who can see and change what.
alter table public.profiles enable row level security;

create policy "Profiles are visible to everyone"
  on public.profiles for select
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Automatically create the profile when someone registers.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, lower(new.raw_user_meta_data ->> 'username'));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();