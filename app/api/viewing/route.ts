import { NextResponse } from "next/server";
import { mapViewingToMaster, type ViewingBody } from "@/lib/enquiry/master";
import { callMaster } from "@/lib/n8n/master";
import { createRateLimiter, clientKey } from "@/lib/rate-limit";
import { getValidSessionId } from "@/lib/session/session";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 8_000;
const limiter = createRateLimiter({ limit: 10, windowMs: 10 * 60 * 1000 });
const ALLOWED_FIELDS = new Set([
  "requestId",
  "enquiryId",
  "propertyId",
  "fullName",
  "email",
  "phone",
  "requestedDate",
  "requestedTime",
  "notes",
]);

function fail(status: number, message: string, field?: string) {
  return NextResponse.json({ ok: false, message, field }, { status });
}

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return fail(413, "That request is too large to send.");
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return fail(415, "Requests must be sent as JSON.");
  }

  const limit = limiter.check(clientKey(request));
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, message: "Too many requests from this connection. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  const text = await request.text();
  if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) return fail(413, "That request is too large to send.");
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return fail(400, "The request could not be read. Please try again.");
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return fail(400, "The request could not be read. Please try again.");
  delete (raw as Record<string, unknown>).sessionId;
  const unexpected = Object.keys(raw).filter((k) => !ALLOWED_FIELDS.has(k));
  if (unexpected.length > 0) return fail(400, "The request contains fields that are not accepted.");

  const sessionId = await getValidSessionId();
  if (!sessionId) return fail(401, "Your session has expired. Please refresh the page and try again.");

  const mapped = mapViewingToMaster(raw as ViewingBody, sessionId);
  if (!mapped.ok) return fail(400, mapped.message, mapped.field);

  const result = await callMaster(mapped.payload);
  if (!result.ok) return fail(result.status, result.message);

  const d = result.data;
  return NextResponse.json({
    ok: true,
    duplicate: d.duplicate === true,
    recovered: d.recovered === true,
    status: "requested",
    propertyName: typeof (d.property as { name?: unknown } | undefined)?.name === "string"
      ? String((d.property as { name: string }).name).slice(0, 120)
      : "",
    date: typeof d.date === "string" ? d.date.slice(0, 10) : (raw as ViewingBody).requestedDate,
    time: typeof d.time === "string" ? d.time.slice(0, 5) : (raw as ViewingBody).requestedTime,
  });
}
