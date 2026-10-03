import { getPropertyBySlug } from "@/lib/data/properties";

export type EnquiryIntent =
  | "Buy"
  | "Rent"
  | "Sell"
  | "Relocate"
  | "Request a viewing"
  | "Ask about a property";

export interface EnquiryBody {
  requestId: string;
  fullName: string;
  email: string;
  phone?: string;
  intent: EnquiryIntent;
  propertySlug?: string;
  neighbourhood?: string;
  budget?: string;
  timeframe?: string;
  viewingDate?: string;
  viewingWindow?: string;
  message?: string;
}

export interface Wf01Payload {
  requestId: string;
  sessionId: string;
  input: {
    name: string;
    email: string;
    listingType: "buy" | "rent";
    neighbourhood: string;
    maxBudget?: number;
    minBedrooms: number;
    propertyType: string;
    timeline: string;
    notes: string;
  };
}

export type MapResult =
  | { ok: true; payload: Wf01Payload }
  | { ok: false; field: string; message: string };

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Reads the largest amount mentioned in a budget such as "$1m–$2m" or
// "$4,000–$6,000 / month". Returns undefined when no usable amount is found,
// so the field is omitted rather than guessed.
export function parseMaxBudget(text: string | undefined): number | undefined {
  if (!text) return undefined;

  const amounts: number[] = [];
  const re = /(\d[\d,]*(?:\.\d+)?)\s*([mk])?/gi;

  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    const value = Number(match[1].replace(/,/g, ""));
    if (!Number.isFinite(value)) continue;

    const suffix = match[2]?.toLowerCase();

    amounts.push(
      suffix === "m"
        ? value * 1_000_000
        : suffix === "k"
          ? value * 1_000
          : value
    );
  }

  const max = amounts.length ? Math.max(...amounts) : 0;

  return max > 0 ? Math.round(max) : undefined;
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function mapEnquiryToWf01(body: EnquiryBody, sessionId: string): MapResult {
  if (!UUID_RE.test(body.requestId)) {
    return { ok: false, field: "requestId", message: "The request could not be identified. Please try again." };
  }

  const fullName = clean(body.fullName, 120);
  if (!fullName) return { ok: false, field: "fullName", message: "Enter your name." };

  const email = clean(body.email, 254);
  if (!EMAIL_RE.test(email)) return { ok: false, field: "email", message: "Enter a valid email address." };

  const property = body.propertySlug ? getPropertyBySlug(body.propertySlug) : undefined;
  if (body.propertySlug && !property) {
    return { ok: false, field: "propertySlug", message: "Choose a property for this request." };
  }

  let listingType: "buy" | "rent" | undefined;
  if (body.intent === "Buy") listingType = "buy";
  else if (body.intent === "Rent") listingType = "rent";
  else if (property) listingType = property.purpose === "sale" ? "buy" : "rent";

  if (!listingType) {
    return {
      ok: false,
      field: "intent",
      message: "This type of enquiry can't be sent online yet. Choose Buy or Rent, or get in touch by email.",
    };
  }

  const noteParts: string[] = [];
  if (body.phone) noteParts.push(`Phone: ${clean(body.phone, 30)}`);
  if (property) noteParts.push(`Property: ${property.name} (${property.id})`);
  if (body.intent === "Request a viewing") {
    const date = clean(body.viewingDate, 20);
    if (!date) return { ok: false, field: "viewingDate", message: "Choose a future viewing date." };
    const when = new Date(`${date}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(when.getTime()) || when < today) {
      return { ok: false, field: "viewingDate", message: "Choose a future viewing date." };
    }
    const window = clean(body.viewingWindow, 20);
    noteParts.push(`Preferred viewing: ${date}${window ? `, ${window}` : ""} (New York local time, preference only)`);
  }
  const message = clean(body.message, 1800);
  if (message) noteParts.push(message);
  const notes = noteParts.join("\n").slice(0, 2000);

  const maxBudget = parseMaxBudget(clean(body.budget, 120));
  const neighbourhood = clean(body.neighbourhood, 120);

  return {
    ok: true,
    payload: {
      requestId: body.requestId,
      sessionId,
      input: {
        name: fullName,
        email,
        listingType,
        neighbourhood,
        ...(maxBudget !== undefined ? { maxBudget } : {}),
        minBedrooms: 0,
        propertyType: "",
        timeline: clean(body.timeframe, 120),
        notes,
      },
    },
  };
}
