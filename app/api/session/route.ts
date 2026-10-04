import { NextResponse } from "next/server";
import { createRateLimiter, clientKey } from "@/lib/rate-limit";
import { getServiceSupabase } from "@/lib/supabase/server";
import {
  clearSessionCookie,
  createSessionRow,
  lookupSession,
  readSessionCookie,
  setSessionCookie,
} from "@/lib/session/session";

export const runtime = "nodejs";

const limiter = createRateLimiter({ limit: 10, windowMs: 10 * 60 * 1000 });

export async function POST(request: Request) {
  const limit = limiter.check(clientKey(request));
  if (!limit.allowed) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  const supabase = getServiceSupabase();
  if (!supabase) {
    console.error("session: Supabase server configuration is missing");
    return NextResponse.json(
      { success: false, message: "Enquiries are not available right now. Please try again later." },
      { status: 503 }
    );
  }

  try {
    const existing = await readSessionCookie();
    if (existing) {
      const found = await lookupSession(supabase, existing);
      if (found.status === "valid") {
        const response = NextResponse.json({ success: true });
        setSessionCookie(response, existing, found.expiresAt);
        return response;
      }
    }

    const id = await createSessionRow(supabase);
    const response = NextResponse.json({ success: true });
    if (existing) clearSessionCookie(response);
    setSessionCookie(response, id, new Date(Date.now() + 2 * 60 * 60 * 1000));
    return response;
  } catch {
    console.error("session: could not create or check a session");
    return NextResponse.json(
      { success: false, message: "We couldn't start your enquiry just now. Please try again." },
      { status: 502 }
    );
  }
}
