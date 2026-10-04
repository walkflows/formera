import "server-only";
import { getPropertyBySlug } from "@/lib/data/properties";

export type ListingType = "buy" | "rent";

export interface EnquiryBody {
  requestId: string;
  fullName: string;
  email: string;
  phone?: string;
  intent: "Buy" | "Rent";
  propertySlug?: string;
  neighbourhood?: string;
  maxBudget?: string;
  timeframe?: string;
  message?: string;
}

export interface ViewingBody {
  requestId: string;
  enquiryId: string;
  propertyId: string;
  fullName: string;
  email: string;
  phone?: string;
  requestedDate: string;
  requestedTime: string;
  notes?: string;
}

type Mapped<T> = { ok: true; payload: T } | { ok: false; field: string; message: string };

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9 +()-]+$/;
const TIME_RE = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;
const NEIGHBOURHOODS = ["Tribeca", "SoHo", "Upper East Side", "Brooklyn Heights", "Cobble Hill", "West Village"];
const TIMEFRAMES = ["Exploring", "Within 3 months", "3–6 months", "Later"];
const DEFAULT_TIMEFRAME = "Not sure yet";
const MAX_BUDGET = 1_000_000_000;

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function phoneError(phone: string): boolean {
  return !!phone && (!PHONE_RE.test(phone) || (phone.match(/[0-9]/g) || []).length < 5);
}

function dateErrorMessage(date: string): string | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!m) return "Choose a valid viewing date.";
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  const real = d.getUTCFullYear() === Number(m[1]) && d.getUTCMonth() === Number(m[2]) - 1 && d.getUTCDate() === Number(m[3]);
  if (!real) return "Choose a valid viewing date.";
  const today = new Date().toISOString().slice(0, 10);
  const limit = new Date(Date.now() + 180 * 86400000).toISOString().slice(0, 10);
  if (date < today) return "Choose a viewing date from today onwards.";
  if (date > limit) return "Choose a viewing date within the next 180 days.";
  return null;
}

export function mapEnquiryToMaster(body: EnquiryBody, sessionId: string): Mapped<Record<string, unknown>> {
  if (!UUID_RE.test(body.requestId)) return { ok: false, field: "requestId", message: "The request could not be identified. Please try again." };

  const name = clean(body.fullName, 120);
  if (!name) return { ok: false, field: "fullName", message: "Enter your name." };

  const email = clean(body.email, 254);
  if (!EMAIL_RE.test(email)) return { ok: false, field: "email", message: "Enter a valid email address." };

  const phone = clean(body.phone, 30);
  if (phoneError(phone)) return { ok: false, field: "phone", message: "Enter a valid phone number, or leave it blank." };

  if (body.intent !== "Buy" && body.intent !== "Rent") return { ok: false, field: "intent", message: "Choose Buy or Rent." };
  const listingType: ListingType = body.intent === "Buy" ? "buy" : "rent";

  const property = body.propertySlug ? getPropertyBySlug(body.propertySlug) : undefined;
  if (body.propertySlug && !property) return { ok: false, field: "propertySlug", message: "Choose a property from the list." };
  if (property && (property.purpose === "sale" ? "buy" : "rent") !== listingType) {
    return {
      ok: false,
      field: "intent",
      message: "This property doesn't match the enquiry you're booking from. Please start a new enquiry for this property.",
    };
  }

  const neighbourhood = clean(body.neighbourhood, 80);
  if (!property && !neighbourhood) return { ok: false, field: "neighbourhood", message: "Choose a neighbourhood, or select a property." };
  if (neighbourhood && !NEIGHBOURHOODS.includes(neighbourhood)) return { ok: false, field: "neighbourhood", message: "Choose a neighbourhood from the list." };

  const timeframe = clean(body.timeframe, 60) || DEFAULT_TIMEFRAME;
  if (!TIMEFRAMES.includes(timeframe) && timeframe !== DEFAULT_TIMEFRAME) return { ok: false, field: "timeframe", message: "Choose a timeframe from the list." };

  let budget: number | undefined;
  const budgetText = clean(body.maxBudget, 20);
  if (budgetText) {
    const amount = Number(budgetText);
    if (!Number.isFinite(amount) || amount <= 0 || amount > MAX_BUDGET) {
      return { ok: false, field: "budget", message: "Enter a maximum budget greater than 0, or leave it blank." };
    }
    budget = Math.round(amount);
  }

  const message = clean(body.message, 2000);
  const input: Record<string, unknown> = { name, email, listingType, timeframe };
  if (phone) input.phone = phone;
  if (property) input.propertyId = property.id;
  if (neighbourhood) input.neighbourhood = neighbourhood;
  if (budget !== undefined) input.budget = budget;
  if (message) input.message = message;

  return { ok: true, payload: { action: "enquiry", requestId: body.requestId, sessionId, input } };
}

export function mapViewingToMaster(body: ViewingBody, sessionId: string): Mapped<Record<string, unknown>> {
  if (!UUID_RE.test(body.requestId)) return { ok: false, field: "requestId", message: "The request could not be identified. Please try again." };

  const enquiryId = clean(body.enquiryId, 36);
  if (!UUID_RE.test(enquiryId)) return { ok: false, field: "enquiryId", message: "Please submit your enquiry before requesting a viewing." };

  const property = getPropertyBySlug(clean(body.propertyId, 40)) ?? undefined;
  const propertyId = property ? property.id : clean(body.propertyId, 32);
  if (!propertyId) return { ok: false, field: "propertyId", message: "Choose a property for this viewing." };

  const name = clean(body.fullName, 120);
  if (!name) return { ok: false, field: "fullName", message: "Enter your name." };

  const email = clean(body.email, 254);
  if (!EMAIL_RE.test(email)) return { ok: false, field: "email", message: "Enter a valid email address." };

  const phone = clean(body.phone, 30);
  if (phoneError(phone)) return { ok: false, field: "phone", message: "Enter a valid phone number, or leave it blank." };

  const requestedDate = clean(body.requestedDate, 10);
  const dateProblem = dateErrorMessage(requestedDate);
  if (dateProblem) return { ok: false, field: "requestedDate", message: dateProblem };

  const requestedTime = clean(body.requestedTime, 5);
  if (!TIME_RE.test(requestedTime)) return { ok: false, field: "requestedTime", message: "Choose a viewing time." };

  const notes = clean(body.notes, 2000);
  const input: Record<string, unknown> = { name, email, enquiryId, propertyId, requestedDate, requestedTime };
  if (phone) input.phone = phone;
  if (notes) input.notes = notes;

  return { ok: true, payload: { action: "viewing", requestId: body.requestId, sessionId, input } };
}
