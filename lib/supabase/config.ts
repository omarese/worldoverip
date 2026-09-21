// The Vercel x Supabase integration sets NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
// (and sometimes NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY). Either key works here.
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Lets the site keep working (without accounts) if the env vars are not set yet.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);