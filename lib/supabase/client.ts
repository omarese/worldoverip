import { createBrowserClient } from '@supabase/ssr';
import { supabaseKey, supabaseUrl } from '@/lib/supabase/config';

// Supabase client for the browser (used for uploading photos straight to storage).
export function createClient() {
  return createBrowserClient(supabaseUrl!, supabaseKey!);
}