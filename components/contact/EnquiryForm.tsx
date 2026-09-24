"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { NEIGHBOURHOODS, getPropertyBySlug, properties } from "@/lib/data/properties";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/Button";

type IntentOption =
  | "Buy"
  | "Rent"
  | "Sell"
  | "Relocate"
  | "Request a viewing"
  | "Ask about a property";

const INTENT_FROM_QUERY: Record<string, IntentOption> = {
  buy: "Buy",
  rent: "Rent",
  sell: "Sell",
  relocate: "Relocate",
  viewing: "Request a viewing",
  "property-question": "Ask about a property",
};

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  intent: IntentOption | "";
  propertySlug: string;
  neighbourhood: string;
  budget: string;
  timeframe: string;
  viewingDate: string;
  viewingWindow: string;
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
  viewingDate: "",
  viewingWindow: "",
  message: "",
};

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
    const intent = defaultIntentQuery ? INTENT_FROM_QUERY[defaultIntentQuery] ?? "" : "";
    const property = defaultPropertySlug ? getPropertyBySlug(defaultPropertySlug) : undefined;
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
  const formId = useId();

  const isCompact = variant === "compact";
  const intentOptions: IntentOption[] = isCompact
    ? ["Buy", "Rent", "Sell", "Relocate"]
    : ["Buy", "Rent", "Sell", "Relocate", "Request a viewing", "Ask about a property"];

  const isViewing = values.intent === "Request a viewing";
  const isSelling = values.intent === "Sell";
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
    if (!isCompact && values.intent === "Request a viewing" && !values.propertySlug) {
      next.propertySlug = "Choose a property for this viewing request.";
    }
    if (!isCompact && values.intent === "Request a viewing" && !values.viewingDate) {
      next.viewingDate = "Choose a future viewing date.";
    }
    if (!isCompact && values.intent === "Request a viewing" && values.viewingDate) {
      const chosen = new Date(values.viewingDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (chosen < today) next.viewingDate = "Choose a future viewing date.";
    }

    const messageOptional =
      !isCompact && values.intent === "Request a viewing" && (values.propertySlug || values.viewingDate);
    if (!messageOptional && !values.message.trim()) {
      next.message = "Tell us a little about your enquiry.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  }

  function handleReset() {
    setValues(EMPTY_VALUES);
    setErrors({});
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div id={id} className="rounded-panel border border-divider bg-surface p-6 sm:p-8">
        <h2 className="font-heading text-2xl text-ink">Here&apos;s how your enquiry would appear.</h2>
        <p className="mt-2 text-sm font-medium text-deep-green">
          This is a demonstration. No message has been sent and no viewing has been booked.
        </p>

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
          {values.budget && !isSelling ? <Row label="Budget range" value={values.budget} /> : null}
          {values.timeframe ? <Row label="Timeframe" value={values.timeframe} /> : null}
          {isViewing && values.viewingDate ? (
            <Row
              label="Preferred viewing"
              value={`${values.viewingDate}${values.viewingWindow ? `, ${values.viewingWindow} (New York local time — preference only)` : ""}`}
            />
          ) : null}
          {values.message ? <Row label="Message" value={values.message} /> : null}
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => setSubmitted(false)}>
            Edit Details
          </Button>
          <Button href="/properties">Explore More Properties</Button>
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
        Demo form: use sample details. Nothing you enter here is sent or saved.
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
          <Field label="Phone number" htmlFor={`${formId}-phone`}>
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
            required={isViewing}
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

        <Field label="Preferred neighbourhood" htmlFor={`${formId}-neighbourhood`}>
          <select
            id={`${formId}-neighbourhood`}
            value={values.neighbourhood}
            onChange={(e) => update("neighbourhood", e.target.value)}
            className="input-field"
          >
            <option value="">I&apos;m open to suggestions</option>
            {NEIGHBOURHOODS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </Field>

        {!isSelling ? (
          <Field label="Budget range" htmlFor={`${formId}-budget`}>
            <input
              id={`${formId}-budget`}
              type="text"
              placeholder={values.intent === "Rent" ? "e.g. $4,000–$6,000 / month" : "e.g. $1m–$2m"}
              value={values.budget}
              onChange={(e) => update("budget", e.target.value)}
              maxLength={60}
              className="input-field"
            />
          </Field>
        ) : null}

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

        {!isCompact && isViewing ? (
          <>
            <Field
              label="Preferred viewing date"
              htmlFor={`${formId}-date`}
              error={errors.viewingDate}
              required
            >
              <input
                id={`${formId}-date`}
                type="date"
                min={new Date().toISOString().slice(0, 10)}
                value={values.viewingDate}
                onChange={(e) => update("viewingDate", e.target.value)}
                className="input-field"
              />
            </Field>
            <Field label="Time window (New York local time — preference only)" htmlFor={`${formId}-window`}>
              <select
                id={`${formId}-window`}
                value={values.viewingWindow}
                onChange={(e) => update("viewingWindow", e.target.value)}
                className="input-field"
              >
                <option value="">No preference</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
            </Field>
          </>
        ) : null}

        <Field
          label="Your message"
          htmlFor={`${formId}-message`}
          error={errors.message}
          required={isCompact || !isViewing}
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
        <Button type="submit">
          {isViewing ? "Preview Viewing Request" : "Preview My Enquiry"}
        </Button>
        <button
          type="button"
          onClick={handleReset}
          className="text-sm font-medium text-ink-soft underline underline-offset-2 hover:text-ink"
        >
          Reset form
        </button>
      </div>

      {!isCompact ? (
        <p className="mt-6 text-xs text-ink-soft">
          Read more about how this demo works on the{" "}
          <Link href="/demo-information" className="underline underline-offset-2">
            Demo Information
          </Link>{" "}
          page.
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
