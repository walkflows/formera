"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { NEIGHBOURHOODS, getPropertyBySlug, properties } from "@/lib/data/properties";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/Button";

type IntentOption = "Buy" | "Rent";

const INTENT_FROM_QUERY: Record<string, IntentOption> = {
  buy: "Buy",
  rent: "Rent",
};

export interface SuggestedHome {
  propertyId: string;
  name: string;
  neighbourhood: string;
  price: number;
  isAlternative: boolean;
  reasons: string[];
}

interface ViewingDone {
  propertyName: string;
  date: string;
  time: string;
}

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  intent: IntentOption | "";
  propertySlug: string;
  neighbourhood: string;
  budget: string;
  timeframe: string;
  message: string;
}

const EMPTY_VALUES: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  intent: "",
  propertySlug: "",
  neighbourhood: "",
  budget: "",
  timeframe: "",
  message: "",
};

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return /^[+()\d\s.-]+$/.test(value.trim()) && digits.length >= 7 && digits.length <= 15;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function EnquiryForm({
  variant = "full",
  defaultIntentQuery,
  defaultPropertySlug,
  savedSlugs,
  id,
}: {
  variant?: "compact" | "full";
  defaultIntentQuery?: string;
  defaultPropertySlug?: string;
  savedSlugs?: string[];
  id?: string;
}) {
  const savedProperties = (savedSlugs ?? [])
    .map((slug) => getPropertyBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const initial = useMemo<FormValues>(() => {
    const property = defaultPropertySlug ? getPropertyBySlug(defaultPropertySlug) : undefined;
    const fromQuery = defaultIntentQuery ? INTENT_FROM_QUERY[defaultIntentQuery] : undefined;
    const intent: IntentOption | "" =
      fromQuery ?? (property ? (property.purpose === "sale" ? "Buy" : "Rent") : "");
    return {
      ...EMPTY_VALUES,
      intent,
      propertySlug: property ? property.slug : "",
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [matches, setMatches] = useState<SuggestedHome[]>([]);
  const [enquiryId, setEnquiryId] = useState<string | null>(null);
  const [alreadyReceived, setAlreadyReceived] = useState(false);
  const [viewingFor, setViewingFor] = useState<SuggestedHome | null>(null);
  const [viewingDone, setViewingDone] = useState<ViewingDone | null>(null);
  const [viewingDate, setViewingDate] = useState("");
  const [viewingTime, setViewingTime] = useState("");
  const [viewingNotes, setViewingNotes] = useState("");
  const [viewingSending, setViewingSending] = useState(false);
  const [viewingError, setViewingError] = useState<string | null>(null);
  const viewingRequestIdRef = useRef<string | null>(null);
  const [dateLimits] = useState(() => ({
    min: new Date().toISOString().slice(0, 10),
    max: new Date(Date.now() + 180 * 86400000).toISOString().slice(0, 10),
  }));
  const [sessionStatus, setSessionStatus] = useState<"starting" | "ready" | "failed">("starting");
  const sessionStartedRef = useRef(false);

  // Starts one server-side session per mounted form. The session ID stays in an
  // HTTP-only cookie; the browser only learns whether it succeeded.
  useEffect(() => {
    if (sessionStartedRef.current) return;
    sessionStartedRef.current = true;
    fetch("/api/session", { method: "POST" })
      .then((res) => setSessionStatus(res.ok ? "ready" : "failed"))
      .catch(() => setSessionStatus("failed"));
  }, []);
  const requestIdRef = useRef<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formId = useId();

  // Moves focus to the completion heading so keyboard and screen-reader users land on the result.
  useEffect(() => {
    if (submitted) headingRef.current?.focus();
  }, [submitted]);

  const isCompact = variant === "compact";
  const intentOptions: IntentOption[] = ["Buy", "Rent"];

  const selectedProperty = values.propertySlug ? getPropertyBySlug(values.propertySlug) : undefined;

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormValues, string>> = {};

    if (!values.fullName.trim()) next.fullName = "Enter your name.";
    if (!isValidEmail(values.email)) next.email = "Enter a valid email address.";
    if (!values.intent) next.intent = "Choose what you need help with.";
    if (values.phone.trim() && !isValidPhone(values.phone)) next.phone = "Enter a valid phone number, or leave it blank.";
    if (!values.propertySlug && !values.neighbourhood) next.neighbourhood = "Choose a neighbourhood, or select a property.";
    if (values.budget.trim() && !(Number(values.budget) > 0)) next.budget = "Enter a maximum budget greater than 0, or leave it blank.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending || !validate()) return;
    if (!requestIdRef.current) requestIdRef.current = crypto.randomUUID();
    setSending(true);
    setSendError(null);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId: requestIdRef.current,
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          intent: values.intent,
          propertySlug: values.propertySlug,
          neighbourhood: values.neighbourhood,
          maxBudget: values.budget,
          timeframe: values.timeframe,
          message: values.message,
        }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; message?: string; field?: string } | null;
      if (res.ok && data?.ok) {
        const d = data as { enquiryId?: string; matches?: SuggestedHome[]; duplicate?: boolean };
        setEnquiryId(typeof d.enquiryId === "string" ? d.enquiryId : null);
        setMatches(Array.isArray(d.matches) ? d.matches : []);
        setAlreadyReceived(d.duplicate === true);
        requestIdRef.current = null;
        setSubmitted(true);
      } else {
        const message = data?.message ?? "We couldn't send your enquiry just now. Please try again.";
        if (data?.field) {
          setErrors((err) => ({ ...err, [data.field as keyof FormValues]: message }));
        } else {
          setSendError(message);
        }
      }
    } catch {
      setSendError("We couldn't send your enquiry just now. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  function handleReset() {
    requestIdRef.current = null;
    setMatches([]);
    setEnquiryId(null);
    setAlreadyReceived(false);
    setViewingFor(null);
    setViewingDone(null);
    setViewingError(null);
    viewingRequestIdRef.current = null;
    setValues(EMPTY_VALUES);
    setErrors({});
    setSubmitted(false);
  }

  // When the enquiry was a duplicate, matches are not returned again. The property the visitor
  // chose is the only home we can offer a viewing for, and it comes from their own form input.
  const viewingOptions: SuggestedHome[] =
    matches.length > 0 || !enquiryId || !selectedProperty
      ? matches
      : [
          {
            propertyId: selectedProperty.id,
            name: selectedProperty.name,
            neighbourhood: selectedProperty.neighbourhood,
            price: selectedProperty.price,
            isAlternative: false,
            reasons: [],
          },
        ];

  function priceLabel(price: number) {
    return `${price.toLocaleString("en-US")}${values.intent === "Rent" ? "/month" : ""}`;
  }

  function startViewing(home: SuggestedHome) {
    setViewingFor(home);
    setViewingDate("");
    setViewingTime("");
    setViewingNotes("");
    setViewingError(null);
  }

  async function submitViewing(e: React.FormEvent) {
    e.preventDefault();
    if (!enquiryId || !viewingFor || viewingSending) return;
    if (!viewingDate || !viewingTime) {
      setViewingError("Choose a date and time for your viewing.");
      return;
    }
    if (!viewingRequestIdRef.current) viewingRequestIdRef.current = crypto.randomUUID();
    setViewingSending(true);
    setViewingError(null);
    try {
      const res = await fetch("/api/viewing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId: viewingRequestIdRef.current,
          enquiryId,
          propertyId: viewingFor.propertyId,
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          requestedDate: viewingDate,
          requestedTime: viewingTime,
          notes: viewingNotes,
        }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; message?: string; propertyName?: string; date?: string; time?: string }
        | null;
      if (res.ok && data?.ok) {
        setViewingDone({
          propertyName: data.propertyName || viewingFor.name,
          date: data.date || viewingDate,
          time: data.time || viewingTime,
        });
        viewingRequestIdRef.current = null;
        setViewingFor(null);
      } else {
        setViewingError(data?.message ?? "We couldn't complete your request right now. Please try again.");
      }
    } catch {
      setViewingError("We couldn't complete your request right now. Please check your connection and try again.");
    } finally {
      setViewingSending(false);
    }
  }

  if (submitted) {
    return (
      <div id={id} className="rounded-panel border border-divider bg-surface p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-deep-green text-surface"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </span>
          <div>
            <h2 ref={headingRef} tabIndex={-1} className="font-heading text-2xl text-ink focus:outline-none">
              You’re all set. Your request has been received.
            </h2>
            <p className="mt-2 text-sm font-medium text-deep-green">
              Thanks for getting in touch. Your enquiry has been received. We’ll contact you by email to discuss the next step.
            </p>
            <p className="mt-2 text-sm text-ink-soft">
              {viewingDone
                ? "The agent will contact you by email to confirm your viewing."
                : "Our property team will contact you by email about the next step."}
            </p>
          </div>
        </div>
        {alreadyReceived ? (
          <p className="mt-2 text-sm text-ink-soft">
            Your enquiry has already been received. We&apos;ve kept your existing enquiry on file.
          </p>
        ) : null}

        <dl className="mt-6 space-y-3 text-sm">
          <Row label="Name" value={values.fullName} />
          <Row label="Email" value={values.email} />
          {values.phone ? <Row label="Phone" value={values.phone} /> : null}
          <Row label="Looking to" value={values.intent} />
          {selectedProperty ? (
            <Row
              label="Property"
              value={`${selectedProperty.name} — ${formatPrice(selectedProperty)}`}
            />
          ) : null}
          {savedProperties.length > 0 ? (
            <Row label="Properties" value={savedProperties.map((p) => p.name).join(", ")} />
          ) : null}
          {values.neighbourhood ? <Row label="Preferred neighbourhood" value={values.neighbourhood} /> : null}
          {values.budget ? <Row label="Maximum budget" value={`${Number(values.budget).toLocaleString("en-US")}${values.intent === "Rent" ? " per month" : ""}`} /> : null}
          {values.timeframe ? <Row label="Timeframe" value={values.timeframe} /> : null}
          {values.message ? <Row label="Message" value={values.message} /> : null}
        </dl>

        {viewingDone ? (
          <div className="mt-8 rounded-lg border border-divider p-5">
            <h3 className="font-heading text-lg text-ink">Your viewing request has been received</h3>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-4"><dt className="text-ink-soft">Property</dt><dd className="text-right text-ink">{viewingDone.propertyName}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-ink-soft">Requested date</dt><dd className="text-right text-ink">{viewingDone.date}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-ink-soft">Requested time</dt><dd className="text-right text-ink">{viewingDone.time}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-ink-soft">Status</dt><dd className="text-right font-medium text-ink">Requested</dd></div>
            </dl>
            <p className="mt-3 text-sm text-ink-soft">The agent will confirm the appointment.</p>
          </div>
        ) : null}

        {viewingOptions.length > 0 && !viewingDone ? (
          <div className="mt-8">
            <h3 className="font-heading text-lg text-ink">{matches.length > 0 ? "Homes that may suit you" : "Your viewing"}</h3>
            <ul className="mt-3 space-y-3">
              {viewingOptions.map((m) => (
                <li key={m.propertyId} className="rounded-lg border border-divider p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-ink">
                        {m.name}
                        {m.isAlternative ? <span className="ml-2 text-xs text-ink-soft">(close alternative)</span> : null}
                      </p>
                      <p className="mt-0.5 text-sm text-ink-soft">
                        {m.neighbourhood}{m.price ? ` · ${priceLabel(m.price)}` : ""}
                      </p>
                      {m.reasons.length > 0 ? <p className="mt-1 text-sm text-ink-soft">{m.reasons.join(" · ")}</p> : null}
                    </div>
                    {enquiryId ? (
                      <Button variant="outline" size="sm" onClick={() => startViewing(m)}>
                        Request a viewing
                      </Button>
                    ) : null}
                  </div>

                  {viewingFor?.propertyId === m.propertyId ? (
                    <form onSubmit={submitViewing} noValidate className="mt-4 space-y-4 border-t border-divider pt-4">
                      <p className="text-sm font-medium text-ink">Choose a date and time for {m.name}</p>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <label className="block text-sm font-medium text-ink">
                          Preferred date
                          <input
                            type="date"
                            className="input-field mt-1.5"
                            value={viewingDate}
                            min={dateLimits.min}
                            max={dateLimits.max}
                            onChange={(e) => setViewingDate(e.target.value)}
                            required
                          />
                        </label>
                        <label className="block text-sm font-medium text-ink">
                          Preferred time
                          <input
                            type="time"
                            step={1800}
                            className="input-field mt-1.5"
                            value={viewingTime}
                            onChange={(e) => setViewingTime(e.target.value)}
                            required
                          />
                        </label>
                      </div>
                      <label className="block text-sm font-medium text-ink">
                        Notes (optional)
                        <textarea
                          className="input-field mt-1.5 resize-y"
                          rows={3}
                          maxLength={2000}
                          value={viewingNotes}
                          onChange={(e) => setViewingNotes(e.target.value)}
                        />
                      </label>
                      {viewingError ? (
                        <p role="alert" className="text-sm text-red-700">
                          {viewingError}
                        </p>
                      ) : null}
                      <div className="flex flex-wrap items-center gap-3">
                        <Button type="submit" disabled={viewingSending}>
                          {viewingSending ? "Sending…" : "Request viewing"}
                        </Button>
                        <button
                          type="button"
                          onClick={() => setViewingFor(null)}
                          className="text-sm font-medium text-ink-soft underline underline-offset-2 hover:text-ink"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={handleReset}>Done</Button>
          <Button variant="outline" href="/properties">
            Explore More Properties
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      noValidate
      className="rounded-panel border border-divider bg-surface p-6 sm:p-8"
    >
      <p className="rounded-lg bg-gold/15 px-4 py-3 text-sm text-ink">
        Your details are sent securely to our team. Enquiries and viewings are subject to confirmation.
      </p>

      {savedProperties.length > 0 ? (
        <div className="mt-4 rounded-lg border border-divider p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
            Properties in this enquiry
          </p>
          <ul className="mt-2 space-y-1 text-sm text-ink">
            {savedProperties.map((p) => (
              <li key={p.id}>
                {p.name} — {formatPrice(p)}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor={`${formId}-name`} error={errors.fullName} required>
          <input
            id={`${formId}-name`}
            type="text"
            autoComplete="name"
            placeholder="Alex Taylor"
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            maxLength={120}
            className="input-field"
          />
        </Field>

        <Field label="Email address" htmlFor={`${formId}-email`} error={errors.email} required>
          <input
            id={`${formId}-email`}
            type="email"
            autoComplete="email"
            placeholder="alex@example.com"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            maxLength={180}
            className="input-field"
          />
        </Field>

        {!isCompact ? (
          <Field label="Phone number" htmlFor={`${formId}-phone`} error={errors.phone}>
            <input
              id={`${formId}-phone`}
              type="tel"
              autoComplete="tel"
              placeholder="(optional)"
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
              maxLength={30}
              className="input-field"
            />
          </Field>
        ) : null}

        <Field label="I'm looking to" htmlFor={`${formId}-intent`} error={errors.intent} required>
          <select
            id={`${formId}-intent`}
            value={values.intent}
            onChange={(e) => update("intent", e.target.value as IntentOption)}
            className="input-field"
          >
            <option value="">Choose one</option>
            {intentOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>

        {!isCompact ? (
          <Field
            label="Selected property"
            htmlFor={`${formId}-property`}
            error={errors.propertySlug}
          >
            <select
              id={`${formId}-property`}
              value={values.propertySlug}
              onChange={(e) => update("propertySlug", e.target.value)}
              className="input-field"
            >
              <option value="">No property selected</option>
              {properties.map((p) => (
                <option key={p.id} value={p.slug}>
                  {p.name} — {formatPrice(p)}
                </option>
              ))}
            </select>
          </Field>
        ) : null}

        <Field label="Preferred neighbourhood" htmlFor={`${formId}-neighbourhood`} error={errors.neighbourhood}>
          <select
            id={`${formId}-neighbourhood`}
            value={values.neighbourhood}
            onChange={(e) => update("neighbourhood", e.target.value)}
            className="input-field"
          >
            <option value="">Choose a neighbourhood</option>
            {NEIGHBOURHOODS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label={values.intent === "Rent" ? "Maximum monthly rent (USD)" : "Maximum budget (USD)"}
          htmlFor={`${formId}-budget`}
          error={errors.budget}
        >
          <input
            id={`${formId}-budget`}
            type="number"
            inputMode="numeric"
            min={1}
            step={1}
            placeholder={values.intent === "Rent" ? "e.g. 5000" : "e.g. 2000000"}
            value={values.budget}
            onChange={(e) => update("budget", e.target.value)}
            className="input-field"
          />
        </Field>

        {!isCompact ? (
          <Field label="Planned timeframe" htmlFor={`${formId}-timeframe`}>
            <select
              id={`${formId}-timeframe`}
              value={values.timeframe}
              onChange={(e) => update("timeframe", e.target.value)}
              className="input-field"
            >
              <option value="">Not sure yet</option>
              <option>Exploring</option>
              <option>Within 3 months</option>
              <option>3–6 months</option>
              <option>Later</option>
            </select>
          </Field>
        ) : null}

        <Field
          label="Your message"
          htmlFor={`${formId}-message`}
          error={errors.message}
          required
          className="sm:col-span-2"
        >
          <textarea
            id={`${formId}-message`}
            rows={4}
            placeholder="Tell us what you're looking for or what you'd like to know."
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            maxLength={2000}
            className="input-field resize-y"
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={sending || sessionStatus !== "ready"}>
          {sending ? "Sending…" : "Submit Enquiry"}
        </Button>
        <button
          type="button"
          onClick={handleReset}
          className="text-sm font-medium text-ink-soft underline underline-offset-2 hover:text-ink"
        >
          Reset form
        </button>
      </div>
      {sendError ? (
        <p role="alert" className="mt-4 text-sm text-red-700">
          {sendError}
        </p>
      ) : null}
      {sessionStatus === "failed" ? (
        <p role="alert" className="mt-4 text-sm text-red-700">
          We couldn&apos;t start your enquiry just now. Please refresh the page to try again.
        </p>
      ) : null}

    </form>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-divider pb-3 sm:flex-row sm:justify-between">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="text-ink sm:text-right">{value}</dd>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-ink">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p role="alert" className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
