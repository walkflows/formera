// Read-only check: what can an anonymous visitor read from the agents table?
// Usage (PowerShell):  $env:SUPABASE_ANON_KEY = "<anon or publishable key>"; node supabase/checks/anon-agent-check.mjs
// Prints counts only. Never prints names or email addresses, and never prints the key.
const url = "https://imwfnbnwlrszafquxjud.supabase.co/rest/v1/demo_real_estate_agents?select=id,email";
const key = process.env.SUPABASE_ANON_KEY;
if (!key) {
  console.error("Set SUPABASE_ANON_KEY first (Supabase -> Project Settings -> API Keys).");
  process.exit(2);
}
const res = await fetch(url, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
const body = await res.json().catch(() => null);
const rows = Array.isArray(body) ? body : [];
const withEmail = rows.filter((r) => typeof r.email === "string" && r.email.trim() !== "").length;
console.log(`HTTP ${res.status}; rows readable: ${rows.length}; email values readable: ${withEmail}`);
console.log(withEmail > 0 ? "EXPOSED: anonymous visitors can read agent email addresses." : "Not exposed (no email values returned).");
