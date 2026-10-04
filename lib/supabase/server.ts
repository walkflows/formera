import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only. Uses the service-role key, which bypasses row-level security,
// so this module must never be imported from client components.
let cached: SupabaseClient | null = null;

export function getServiceSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  if (!cached) {
    cached = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    });
  }
  return cached;
}
