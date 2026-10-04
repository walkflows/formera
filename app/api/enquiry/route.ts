import { NextResponse } from "next/server";
import { mapEnquiryToWf01, type EnquiryBody } from "@/lib/enquiry/wf01";
import { createRateLimiter, clientKey } from "@/lib/rate-limit";
import { getValidSessionId } from "@/lib/session/session";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16_000;
const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

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

interface Wf01Response {
  success?: boolean;
  result?: unknown;
  matches?: { name?: unknown; isAlternative?: unknown; reasons?: unknown }[];
}

// Only the fields the website needs. Assignment and agent details stay on the server.
function sanitizeMatches(data: Wf01Response) {
  const list = Array.isArray(data.matches) ? data.matches : [];
  return list.slice(0, 3).map((m) => ({
    name: typeof m.name === "string" ? m.name.slice(0, 120) : "",
    isAlternative: m.isAlternative === true,
    reasons: Array.isArray(m.reasons)
      ? m.reasons.filter((r): r is string => typeof r === "string").slice(0, 5)
      : [],
  }));
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

  const url = process.env.WF01_WEBHOOK_URL;
  const secret = process.env.WF01_WEBHOOK_SECRET;
  if (!url || !secret) {
    return fail(503, "Enquiry sending is not configured yet. Please try again later.");
  }

  const sessionId = await getValidSessionId();
  if (!sessionId) {
    return fail(401, "Your session has expired. Please refresh the page and try again.");
  }

  const mapped = mapEnquiryToWf01(raw as EnquiryBody, sessionId);
  if (!mapped.ok) return fail(400, mapped.message, mapped.field);

  let upstream: Response;
  try {
    upstream = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-WalkFlow-Secret": secret,
      },
      body: JSON.stringify(mapped.payload),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
  } catch {
    return fail(502, "We couldn't send your enquiry just now. Please try again.");
  }

  let data: Wf01Response | null = null;
  try {
    data = (await upstream.json()) as Wf01Response;
  } catch {
    data = null;
  }

  if (upstream.ok && data?.success === true) {
    return NextResponse.json({ ok: true, matches: sanitizeMatches(data) });
  }
  return fail(502, "We couldn't send your enquiry just now. Please try again.");
}
