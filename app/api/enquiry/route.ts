import { NextResponse } from "next/server";
import { mapEnquiryToWf01, type EnquiryBody } from "@/lib/enquiry/wf01";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16_000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

const ALLOWED_FIELDS = new Set([
  "requestId",
  "fullName",
  "email",
  "phone",
  "intent",
  "propertySlug",
  "neighbourhood",
  "budget",
  "timeframe",
  "viewingDate",
  "viewingWindow",
  "message",
]);

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
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

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return fail(429, "Too many enquiries from this connection. Please try again later.");

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return fail(400, "The enquiry could not be read. Please try again.");
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return fail(400, "The enquiry could not be read. Please try again.");
  }
  const unexpected = Object.keys(raw).filter((k) => !ALLOWED_FIELDS.has(k));
  if (unexpected.length > 0) return fail(400, "The enquiry contains fields that are not accepted.");

  const url = process.env.WF01_WEBHOOK_URL;
  const secret = process.env.WF01_WEBHOOK_SECRET;
  const sessionId = process.env.WF01_SESSION_ID;
  if (!url || !secret || !sessionId) {
    return fail(503, "Enquiry sending is not configured yet. Please try again later.");
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

  let data: { success?: boolean; duplicate?: boolean } | null = null;
  try {
    data = (await upstream.json()) as { success?: boolean; duplicate?: boolean };
  } catch {
    data = null;
  }

  if (upstream.ok && data?.success === true) {
    return NextResponse.json({ ok: true });
  }
  return fail(502, "We couldn't send your enquiry just now. Please try again.");
}
