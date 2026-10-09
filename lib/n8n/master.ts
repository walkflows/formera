import "server-only";

// Server-only client for the MASTER real-estate workflow. The webhook secret
// and URL come from server environment variables and never reach the browser.
const FRIENDLY: Record<string, string> = {
  INVALID_REQUEST: "Please check the details you entered and try again.",
  INVALID_SESSION: "Your session has expired. Please refresh the page and try again.",
  ENQUIRY_NOT_FOUND: "We couldn't find your enquiry. Please start a new enquiry for this property.",
  PROPERTY_NOT_FOUND: "That property could not be found. Please choose another home.",
  PROPERTY_UNAVAILABLE: "This property is no longer available for viewing.",
  PROPERTY_ENQUIRY_MISMATCH:
    "This property doesn't match the enquiry you're booking from. Please start a new enquiry for this property.",
  VIEWING_SLOT_UNAVAILABLE: "That viewing time is no longer available. Please choose another time.",
  REQUEST_IN_PROGRESS: "Your request is still being processed. Please wait a moment and try again.",
};
const GENERIC = "We couldn't complete your request right now. Please try again.";

export type MasterResult =
  | { ok: true; data: Record<string, unknown> }
  | { ok: false; status: number; message: string };

export async function callMaster(payload: Record<string, unknown>): Promise<MasterResult> {
  const url = process.env.MASTER_N8N_WEBHOOK_URL;
  const secret = process.env.MASTER_N8N_WEBHOOK_SECRET;
  if (!url || !secret) return { ok: false, status: 503, message: "Enquiries are not available right now. Please try again later." };

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-WalkFlow-Secret": secret },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(20_000),
    });
  } catch {
    return { ok: false, status: 502, message: GENERIC };
  }

  let data: Record<string, unknown> | null = null;
  try {
    const parsed = (await res.json()) as unknown;
    data = parsed && typeof parsed === "object" && !Array.isArray(parsed) ? (parsed as Record<string, unknown>) : null;
  } catch {
    data = null;
  }

  if (res.ok && data?.success === true) return { ok: true, data };

  const code = (data?.error as { code?: unknown } | undefined)?.code;
  const known = typeof code === "string" && code in FRIENDLY ? FRIENDLY[code] : undefined;
  return { ok: false, status: res.status >= 400 && res.status < 500 ? res.status : 502, message: known ?? GENERIC };
}
