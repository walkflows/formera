import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

// Server-side guard against an obvious repeat from the same session. It runs before
// the MASTER workflow is called, so a repeat creates no enquiry, email, task or event.
const WINDOW_MS = 30 * 60 * 1000;
const ENQUIRY_TABLE = "demo_real_estate_enquiries";

export interface EnquiryCandidate {
  email: string;
  listingType: "buy" | "rent";
  propertyId?: string;
  neighbourhood?: string;
}

interface StoredEnquiry {
  id: string;
  email: string;
  listing_type: string;
  neighbourhood: string | null;
  notes: string | null;
  demo_real_estate_activity_events: { event_type: string }[] | null;
}

function normalize(value: string | null | undefined): string {
  return (value ?? "").trim().toLowerCase();
}

// The MASTER workflow appends "Selected property: <id or none>" as the last line of notes.
// Returns null when that line is missing, so an unreadable record never blocks a new enquiry.
function selectedPropertyFromNotes(notes: string | null): string | null {
  if (!notes) return null;
  const lines = notes.split("\n");
  const last = lines[lines.length - 1].trim();
  const match = /^Selected property: (\S+)$/.exec(last);
  return match ? match[1] : null;
}

// Returns the id of an existing, completed enquiry that matches the candidate, or null.
export async function findDuplicateEnquiry(
  supabase: SupabaseClient,
  sessionId: string,
  candidate: EnquiryCandidate
): Promise<string | null> {
  const since = new Date(Date.now() - WINDOW_MS).toISOString();
  const { data, error } = await supabase
    .from(ENQUIRY_TABLE)
    .select("id, email, listing_type, neighbourhood, notes, demo_real_estate_activity_events(event_type)")
    .eq("session_id", sessionId)
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(20);
  if (error) throw new Error("duplicate check failed");

  const wantEmail = normalize(candidate.email);
  const wantProperty = candidate.propertyId ? normalize(candidate.propertyId) : "none";

  for (const row of (data ?? []) as StoredEnquiry[]) {
    // Only a finished enquiry counts. A partly saved one is completed by a retry instead.
    const events = row.demo_real_estate_activity_events ?? [];
    if (!events.some((e) => e.event_type === "follow_up_created")) continue;

    if (normalize(row.email) !== wantEmail) continue;
    if (row.listing_type !== candidate.listingType) continue;

    const storedProperty = selectedPropertyFromNotes(row.notes);
    if (storedProperty === null) continue;

    if (wantProperty !== "none") {
      // A property was selected: it must be the same property.
      if (normalize(storedProperty) !== wantProperty) continue;
    } else {
      // No property was selected: the stored enquiry must also have none, in the same neighbourhood.
      if (normalize(storedProperty) !== "none") continue;
      if (normalize(row.neighbourhood) !== normalize(candidate.neighbourhood)) continue;
    }

    return row.id;
  }

  return null;
}
