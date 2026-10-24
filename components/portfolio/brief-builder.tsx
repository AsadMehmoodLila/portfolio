"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Copy, EnvelopeSimple } from "@phosphor-icons/react";
import { identity, services } from "@/data/portfolio";

type Fields = {
  project: string;
  service: string;
  details: string;
  link: string;
  budget: string;
  timing: string;
  devices: string;
};
const initial: Fields = {
  project: "",
  service: "",
  details: "",
  link: "",
  budget: "",
  timing: "",
  devices: "",
};
export function BriefBuilder() {
  const [fields, setFields] = useState(initial);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [ready, setReady] = useState(false);
  const [preview, setPreview] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const output = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const selected = new URLSearchParams(window.location.search).get("service");
    if (services.some((item) => item.id === selected))
      setFields((previous) => ({ ...previous, service: selected! }));
  }, []);
  const serviceName =
    services.find((item) => item.id === fields.service)?.title ??
    (fields.service === "other" ? "Integration / other" : "To discuss");
  const brief = [
    "Roblox commission enquiry",
    "",
    `Project: ${fields.project.trim()}`,
    `Service: ${serviceName}`,
    `Game / reference: ${fields.link.trim() || "Not supplied"}`,
    `Target devices: ${fields.devices.trim() || "To discuss"}`,
    `Budget and currency: ${fields.budget.trim() || "To discuss"}`,
    `Timing: ${fields.timing.trim() || "To discuss"}`,
    "",
    "What needs to work:",
    fields.details.trim(),
    "",
    "Please let me know what else you need to assess the scope.",
  ].join("\n");
  const mail = `mailto:${identity.email}?subject=${encodeURIComponent(`Roblox commission: ${fields.project.trim()}`)}&body=${encodeURIComponent(brief)}`;
  const change = (key: keyof Fields, value: string) => {
    setFields((previous) => ({ ...previous, [key]: value }));
    setReady(false);
    setStatus("");
    setErrors((previous) => {
      const next = { ...previous };
      delete next[key];
      return next;
    });
  };
  async function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!fields.project.trim()) next.project = "Give the project a short name";
    if (!fields.service)
      next.service = "Choose a service, or select integration / other";
    if (fields.details.trim().length < 20)
      next.details =
        "Describe the mechanic and what the player should be able to do (at least 20 characters)";
    if (fields.link.trim()) {
      try {
        const url = new URL(fields.link);
        if (!["https:", "http:"].includes(url.protocol))
          next.link = "Use a full http or https link";
      } catch {
        next.link = "Use a full link, starting with https://";
      }
    }
    if (!consent)
      next.consent =
        "Confirm your choice before preparing or copying the brief";
    setErrors(next);
    if (Object.keys(next).length) {
      setReady(false);
      requestAnimationFrame(() =>
        (
          form.current?.querySelector(
            `[name="${Object.keys(next)[0]}"]`,
          ) as HTMLElement
        )?.focus(),
      );
      return;
    }
    setReady(true);
    const action = (event.nativeEvent as SubmitEvent).submitter?.getAttribute(
      "value",
    );
    if (action === "copy") {
      try {
        await navigator.clipboard.writeText(brief);
        setStatus(
          "Brief copied. Paste it into the Discord server or your email when you are ready. Nothing has been sent.",
        );
      } catch {
        setPreview(true);
        setStatus(
          "Your browser could not copy the brief. Select and copy the prepared text below, then paste it into Discord or email.",
        );
        requestAnimationFrame(() => {
          output.current?.focus();
          output.current?.select();
        });
      }
    } else
      setStatus(
        "Your brief is ready. Open your email app below, review the draft and choose Send there. Nothing has been sent by this website.",
      );
  }
  function field(
    key: keyof Fields,
    label: string,
    optional = false,
    placeholder = "",
    limit = 120,
  ) {
    return (
      <div className="field" key={key}>
        <label htmlFor={`brief-${key}`}>
          {label} {optional && <span>(optional)</span>}
        </label>
        <input
          id={`brief-${key}`}
          name={key}
          value={fields[key]}
          onChange={(event) => change(key, event.target.value)}
          placeholder={placeholder}
          maxLength={limit}
          aria-invalid={!!errors[key]}
          aria-describedby={errors[key] ? `${key}-error` : undefined}
          required={!optional}
        />
        {errors[key] && (
          <small className="field-error" id={`${key}-error`}>
            {errors[key]}
          </small>
        )}
      </div>
    );
  }
  return (
    <form
      ref={form}
      className="brief-builder"
      noValidate
      onSubmit={prepare}
      aria-labelledby="brief-title"
    >
      <h2 id="brief-title">Build a useful brief</h2>
      <p className="form-intro">
        A few details help me assess the scope. Prepare your message here, then
        share it through Discord or email. Required fields are marked.
      </p>
      {!!Object.keys(errors).length && (
        <p className="form-error-summary" role="alert">
          Check the highlighted fields below. Your brief has not been shared.
        </p>
      )}
      <div className="form-grid">
        {field("project", "Project name (required)")}
        <div className="field">
          <label htmlFor="brief-service">Service (required)</label>
          <select
            id="brief-service"
            name="service"
            value={fields.service}
            onChange={(event) => change("service", event.target.value)}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? "service-error" : undefined}
            required
          >
            <option value="">Choose a service</option>
            {services.map((item) => (
              <option value={item.id} key={item.id}>
                {item.title}
              </option>
            ))}
            <option value="other">Integration / other</option>
          </select>
          {errors.service && (
            <small className="field-error" id="service-error">
              {errors.service}
            </small>
          )}
        </div>
        <div className="field field-wide">
          <label htmlFor="brief-details">What needs to work? (required)</label>
          <textarea
            id="brief-details"
            name="details"
            value={fields.details}
            onChange={(event) => change("details", event.target.value)}
            maxLength={1800}
            required
            aria-invalid={!!errors.details}
            aria-describedby={`details-hint${errors.details ? " details-error" : ""}`}
            placeholder="Describe the mechanic, the player actions and what you already have"
          />
          <small id="details-hint">
            Include expected behaviour and any existing code or assets. Leave
            out passwords and private player data.
          </small>
          {errors.details && (
            <small className="field-error" id="details-error">
              {errors.details}
            </small>
          )}
        </div>
        {field("link", "Game or reference link", true, "https://", 300)}
        {field("devices", "Target devices", true, "PC, mobile, console…")}
        {field("budget", "Budget and currency", true, "Your working budget")}
        {field("timing", "Timing", true, "A target date or flexible")}
      </div>
      <div className="form-consent">
        <input
          id="brief-consent"
          name="consent"
          type="checkbox"
          checked={consent}
          onChange={(event) => {
            setConsent(event.target.checked);
            setReady(false);
            setErrors((previous) => {
              const next = { ...previous };
              delete next.consent;
              return next;
            });
          }}
          required
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? "consent-error" : undefined}
        />
        <label htmlFor="brief-consent">
          I choose to prepare this enquiry and understand the{" "}
          <Link href="/privacy/" prefetch={false}>
            Privacy Policy
          </Link>
          . The website keeps it in this tab until I copy it or open an email
          draft. I choose where to send it.
          {errors.consent && (
            <span className="field-error" id="consent-error">
              {" "}
              {errors.consent}
            </span>
          )}
        </label>
      </div>
      <div className="form-actions">
        <button className="button" type="submit" value="copy">
          Copy project brief <Copy size={18} aria-hidden />
        </button>
        <button className="link-action" type="submit" value="email">
          Prepare email draft <EnvelopeSimple size={18} aria-hidden />
        </button>
      </div>
      {status && (
        <div className="form-status" role="status">
          <p>{status}</p>
          {ready && consent && (
            <a href={mail}>
              Open email draft <ArrowUpRight size={16} aria-hidden />
            </a>
          )}
        </div>
      )}
      <details
        className="brief-preview"
        open={preview}
        onToggle={(event) => setPreview(event.currentTarget.open)}
      >
        <summary>Preview the prepared text</summary>
        <label className="sr-only" htmlFor="brief-output">
          Prepared project brief
        </label>
        <textarea
          id="brief-output"
          className="brief-output"
          ref={output}
          readOnly
          value={brief}
        />
      </details>
      <p className="form-privacy-note">
        No form submission, account, analytics or browser storage. Reloading
        clears your entries. Copying replaces your clipboard contents. Discord
        and your email provider handle messages you choose to send.
      </p>
    </form>
  );
}
