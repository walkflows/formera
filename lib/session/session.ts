import "server-only";
import { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getServiceSupabase } from "@/lib/supabase/server";

export const SESSION_COOKIE = "formera_session";
export const SESSION_SECONDS = 2 * 60 * 60;
const TABLE = "demo_real_estate_sessions";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type SessionLookup =
  | { status: "valid"; expiresAt: Date }
  | { status: "none" };

// A session is valid only when it exists, is not closed and has not expired.
export async function lookupSession(supabase: SupabaseClient, id: string): Promise<SessionLookup> {
  if (!UUID_RE.test(id)) return { status: "none" };
  const { data, error } = await supabase
    .from(TABLE)
    .select("id, expires_at, closed")
    .eq("id", id)
    .eq("closed", false)
    .gt("expires_at", new Date().toISOString());
  if (error) throw new Error("session lookup failed");
  const row = Array.isArray(data) ? data[0] : undefined;
  if (!row) return { status: "none" };
  return { status: "valid", expiresAt: new Date(row.expires_at) };
}

export async function createSessionRow(supabase: SupabaseClient): Promise<string> {
  const id = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_SECONDS * 1000).toISOString();
  const { error } = await supabase.from(TABLE).insert({ id, expires_at: expiresAt, closed: false });
  if (error) throw new Error("session create failed");
  return id;
}

export async function readSessionCookie(): Promise<string | undefined> {
  return (await cookies()).get(SESSION_COOKIE)?.value;
}

// Sets the cookie so it never outlives the database session it points to.
export function setSessionCookie(response: NextResponse, id: string, expiresAt: Date) {
  const remaining = Math.max(0, Math.min(SESSION_SECONDS, Math.floor((expiresAt.getTime() - Date.now()) / 1000)));
  response.cookies.set({
    name: SESSION_COOKIE,
    value: id,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: remaining,
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}

// Used by the enquiry API. Returns the server-side session ID only when the
// cookie points to a valid session in the database. Never reads the request body.
export async function getValidSessionId(): Promise<string | null> {
  const supabase = getServiceSupabase();
  if (!supabase) return null;
  const id = await readSessionCookie();
  if (!id) return null;
  const result = await lookupSession(supabase, id);
  return result.status === "valid" ? id : null;
}
