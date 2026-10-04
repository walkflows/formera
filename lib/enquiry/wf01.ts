import { getPropertyBySlug } from "@/lib/data/properties";

export type EnquiryIntent = "Buy" | "Rent";

export interface EnquiryBody {
  requestId: string;
  fullName: string;
  email: string;
  phone?: string;
  intent: EnquiryIntent;
  propertySlug?: string;
  neighbourhood?: string;
  maxBudget?: string;
  timeframe?: string;
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
const NEIGHBOURHOODS = ["Tribeca", "SoHo", "Upper East Side", "Brooklyn Heights", "Cobble Hill", "West Village"];
const TIMEFRAMES = ["Exploring", "Within 3 months", "3–6 months", "Later"];

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

  // "I'm looking to" accepts only Buy or Rent; the WF01 listingType is buy or rent.
  if (body.intent !== "Buy" && body.intent !== "Rent") {
    return { ok: false, field: "intent", message: "Choose Buy or Rent." };
  }
  const listingType = body.intent === "Buy" ? "buy" : "rent";

  const phone = clean(body.phone, 30);
  if (phone && !/^[+()\d\s.-]+$/.test(phone)) {
    return { ok: false, field: "phone", message: "Enter a valid phone number, or leave it blank." };
  }

  const property = body.propertySlug ? getPropertyBySlug(body.propertySlug) : undefined;
  if (body.propertySlug && !property) {
    return { ok: false, field: "propertySlug", message: "Choose a property from the list." };
  }

  const neighbourhood = clean(body.neighbourhood, 120);
  if (neighbourhood && !NEIGHBOURHOODS.includes(neighbourhood)) {
    return { ok: false, field: "neighbourhood", message: "Choose a neighbourhood from the list." };
  }

  const timeline = clean(body.timeframe, 120);
  if (timeline && !TIMEFRAMES.includes(timeline)) {
    return { ok: false, field: "timeframe", message: "Choose a timeframe from the list." };
  }

  let maxBudget: number | undefined;
  const budgetText = clean(body.maxBudget, 20);
  if (budgetText) {
    const amount = Number(budgetText);
    if (!Number.isFinite(amount) || amount <= 0) {
      return { ok: false, field: "budget", message: "Enter a maximum budget greater than 0, or leave it blank." };
    }
    maxBudget = Math.round(amount);
  }

  const noteParts: string[] = [];
  if (phone) noteParts.push(`Phone: ${phone}`);
  if (property) noteParts.push(`Property: ${property.name} (${property.id})`);
  const message = clean(body.message, 1800);
  if (message) noteParts.push(message);

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
        timeline,
        notes: noteParts.join("\n").slice(0, 2000),
      },
    },
  };
}
