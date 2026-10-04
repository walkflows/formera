import { NextResponse } from "next/server";
import { findDuplicateEnquiry, type EnquiryCandidate } from "@/lib/enquiry/duplicate";
import { mapEnquiryToMaster, type EnquiryBody } from "@/lib/enquiry/master";
import { callMaster } from "@/lib/n8n/master";
import { createRateLimiter, clientKey } from "@/lib/rate-limit";
import { getServiceSupabase } from "@/lib/supabase/server";
import { getValidSessionId } from "@/lib/session/session";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16_000;
const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const ALLOWED_FIELDS = new Set([
  "requestId",
  "fullName",
  "email",
  "phone",
  "intent",
  "propertySlug",
  "neighbourhood",
  "maxBudget",
  "timeframe",
  "message",
]);

export interface SuggestedHome {
  propertyId: string;
  name: string;
  neighbourhood: string;
  price: number;
  isAlternative: boolean;
  reasons: string[];
}

// Only what the website needs. Agent, assignment and internal IDs stay on the server.
function sanitizeMatches(list: unknown): SuggestedHome[] {
  if (!Array.isArray(list)) return [];
  return list.slice(0, 3).flatMap((m) => {
    if (!m || typeof m !== "object") return [];
    const r = m as Record<string, unknown>;
    if (typeof r.propertyId !== "string" || typeof r.name !== "string") return [];
    return [
      {
        propertyId: r.propertyId.slice(0, 32),
        name: r.name.slice(0, 120),
        neighbourhood: typeof r.neighbourhood === "string" ? r.neighbourhood.slice(0, 80) : "",
        price: typeof r.price === "number" && Number.isFinite(r.price) ? r.price : 0,
        isAlternative: r.isAlternative === true,
        reasons: Array.isArray(r.reasons)
          ? r.reasons.filter((x): x is string => typeof x === "string").slice(0, 5)
          : [],
      },
    ];
  });
}

function fail(status: number, message: string, field?: string) {
  return NextResponse.json({ ok: false, message, field }, { status });
}

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return fail(413, "That enquiry is too large to send.");
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return fail(415, "Enquiries must be sent as JSON.");
  }

  const limit = limiter.check(clientKey(request));
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, message: "Too many enquiries from this connection. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  const text = await request.text();
  if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) {
    return fail(413, "That enquiry is too large to send.");
  }
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return fail(400, "The enquiry could not be read. Please try again.");
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return fail(400, "The enquiry could not be read. Please try again.");
  }
  // The session is always taken from the server-side cookie, never from the body.
  delete (raw as Record<string, unknown>).sessionId;
  const unexpected = Object.keys(raw).filter((k) => !ALLOWED_FIELDS.has(k));
  if (unexpected.length > 0) return fail(400, "The enquiry contains fields that are not accepted.");

  const sessionId = await getValidSessionId();
  if (!sessionId) return fail(401, "Your session has expired. Please refresh the page and try again.");

  const mapped = mapEnquiryToMaster(raw as EnquiryBody, sessionId);
  if (!mapped.ok) return fail(400, mapped.message, mapped.field);

  // An obvious repeat from this session returns the existing enquiry. Nothing is sent to MASTER,
  // so no enquiry, email, assignment, task or event is created. If the check itself fails, the
  // enquiry continues and the requestId protection in MASTER still applies.
  const supabase = getServiceSupabase();
  if (supabase) {
    try {
      const candidate = mapped.payload.input as EnquiryCandidate;
      const existingId = await findDuplicateEnquiry(supabase, sessionId, candidate);
      if (existingId) {
        return NextResponse.json({
          ok: true,
          enquiryId: existingId,
          duplicate: true,
          recovered: false,
          matches: [],
        });
      }
    } catch {
      console.error("enquiry: duplicate check unavailable");
    }
  }

  const result = await callMaster(mapped.payload);
  if (!result.ok) return fail(result.status, result.message);

  const enquiryId = result.data.enquiryId;
  if (typeof enquiryId !== "string" || !UUID_RE.test(enquiryId)) {
    return fail(502, "We couldn't complete your request right now. Please try again.");
  }

  return NextResponse.json({
    ok: true,
    enquiryId,
    duplicate: result.data.duplicate === true,
    recovered: result.data.recovered === true,
    matches: sanitizeMatches(result.data.matches),
  });
}
