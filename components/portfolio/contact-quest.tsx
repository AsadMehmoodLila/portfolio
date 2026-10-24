"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle,
  Code,
  DiscordLogo,
  EnvelopeSimple,
  PaperPlaneTilt,
  Stack,
  Sword,
  TreeStructure,
} from "@phosphor-icons/react";
import { identity, services } from "@/data/portfolio";
import { contactDelivery } from "@/data/contact";

const choices = [
  ...services.map((item) => ({
    id: item.id,
    title: item.title,
    icon:
      item.id === "combat" ? Sword : item.id === "data" ? Stack : TreeStructure,
  })),
  { id: "other", title: "Fix or connect a system", icon: Code },
];
const budgets = [
  "Under $100",
  "$100–300",
  "$300–750",
  "$750+",
  "Let’s discuss",
];
const timings = ["Flexible", "This month", "A date to discuss"];
export function ContactQuest() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("Let’s discuss");
  const [timing, setTiming] = useState("Flexible");
  const [details, setDetails] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [failure, setFailure] = useState("");
  const panel = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const animation = useRef<Animation | null>(null);
  const keyboard = useRef(false);
  const previous = useRef(0);
  const spam = useRef<HTMLInputElement>(null);
  const pending = useRef(false);
  const abort = useRef<AbortController | null>(null);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    const selected = new URLSearchParams(location.search).get("service");
    if (choices.some((item) => item.id === selected)) {
      setService(selected!);
      setStep(1);
    }
    return () => {
      mounted.current = false;
      abort.current?.abort();
      animation.current?.cancel();
    };
  }, []);
  useEffect(() => {
    const direction = step >= previous.current ? 1 : -1;
    previous.current = step;
    if (
      keyboard.current ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    animation.current =
      panel.current?.animate(
        [
          { opacity: 0.2, transform: `translateX(${direction * 30}px)` },
          { opacity: 1, transform: "translateX(0)" },
        ],
        {
          duration: 220,
          easing: getComputedStyle(document.documentElement)
            .getPropertyValue("--ease")
            .trim(),
        },
      ) ?? null;
    return () => animation.current?.cancel();
  }, [step]);
  function move(next: number, viaKeyboard = false) {
    keyboard.current = viaKeyboard;
    setStep(next);
    setErrors({});
    requestAnimationFrame(() => panel.current?.focus({ preventScroll: true }));
  }
  function invalid(next: Record<string, string>) {
    setErrors(next);
    requestAnimationFrame(() => {
      const key = Object.keys(next)[0];
      (form.current?.querySelector(`[name="${key}"]`) as HTMLElement)?.focus();
    });
  }
  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current || step !== 2 || status === "sent") return;
    const next: Record<string, string> = {};
    if (!service) next.service = "Choose a system";
    if (details.trim().length < 20)
      next.details = "Give me a little more detail (at least 20 characters)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Enter an email I can reply to";
    if (!consent) next.consent = "Confirm before sending";
    if (Object.keys(next).length) {
      invalid(next);
      return;
    }
    if (spam.current?.value) {
      setFailure("Please use the direct contact options below.");
      setStatus("error");
      return;
    }
    pending.current = true;
    setStatus("sending");
    setFailure("");
    const controller = new AbortController();
    abort.current = controller;
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(contactDelivery.endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "omit",
        signal: controller.signal,
        body: JSON.stringify({
          email: email.trim(),
          service: choices.find((item) => item.id === service)?.title,
          budget_usd: budget,
          timing,
          message: details.trim(),
          consent:
            "Visitor chose to send this project enquiry and accepted the privacy notice",
          _subject: "ScriptLilla — new Roblox commission enquiry",
        }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || payload?.ok !== true) {
        if (response.status === 429)
          throw new Error(
            "The enquiry limit has been reached. Please use Discord or email below.",
          );
        throw new Error(
          "Your enquiry could not be accepted. Try again, or use Discord or email below.",
        );
      }
      if (mounted.current) {
        setStatus("sent");
        setErrors({});
        requestAnimationFrame(() =>
          panel.current?.focus({ preventScroll: true }),
        );
      }
    } catch (error) {
      if (mounted.current) {
        setStatus("error");
        setFailure(
          error instanceof Error && error.name === "AbortError"
            ? "No delivery confirmation arrived. Check before retrying, or contact me directly below."
            : error instanceof Error
              ? error.message
              : "Could not send. Please use a direct contact option.",
        );
      }
    } finally {
      clearTimeout(timer);
      pending.current = false;
    }
  }
  const summary = choices.find((item) => item.id === service)?.title;
  return (
    <div className="contact-quest">
      <div
        className="quest-track"
        role="group"
        aria-label="Project enquiry steps"
      >
        {["Choose your system", "Set the scope", "Send your brief"].map(
          (label, index) => (
            <button
              type="button"
              key={label}
              aria-current={step === index ? "step" : undefined}
              disabled={
                index > step || status === "sending" || status === "sent"
              }
              onClick={(event) => move(index, event.detail === 0)}
            >
              <span>
                {step > index ? <Check size={14} aria-hidden /> : index + 1}
              </span>
              <span>{label}</span>
            </button>
          ),
        )}
      </div>
      <form
        ref={form}
        className="quest-form"
        noValidate
        onSubmit={send}
        aria-label="Project enquiry"
      >
        <div className="quest-panel" ref={panel} tabIndex={-1}>
          {status === "sent" ? (
            <div className="quest-success" role="status">
              <CheckCircle size={52} weight="duotone" aria-hidden />
              <h2>Your brief is on its way</h2>
              <p>
                Formspree accepted your enquiry. I’ll reply using the email you
                provided.
              </p>
              <div className="quest-recap">
                <span>{summary}</span>
                <span>
                  {budget === "Let’s discuss"
                    ? "Budget to discuss"
                    : budget + " USD"}
                </span>
                <span>{timing}</span>
              </div>
              <Link className="button" href="/#work" prefetch={false}>
                Explore the work <ArrowRight size={17} aria-hidden />
              </Link>
            </div>
          ) : (
            <>
              {step === 0 && (
                <>
                  <div className="quest-heading">
                    <span>01 / 03</span>
                    <h2>What are we building?</h2>
                    <p>
                      Choose the closest match. We can refine the details
                      together.
                    </p>
                  </div>
                  <div className="quest-services">
                    {choices.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          className="quest-service"
                          aria-pressed={service === item.id}
                          onClick={(event) => {
                            setService(item.id);
                            move(1, event.detail === 0);
                          }}
                        >
                          <Icon size={30} weight="duotone" aria-hidden />
                          <strong>{item.title}</strong>
                          <ArrowRight size={18} aria-hidden />
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
              {step === 1 && (
                <>
                  <div className="quest-heading">
                    <span>02 / 03</span>
                    <h2>Give it a direction</h2>
                    <p>
                      Rough answers are fine. This is a brief, not a booking.
                    </p>
                  </div>
                  <fieldset className="quest-options">
                    <legend>Your budget in USD</legend>
                    {budgets.map((value) => (
                      <label
                        key={value}
                        className={budget === value ? "selected" : ""}
                      >
                        <input
                          type="radio"
                          name="budget"
                          value={value}
                          checked={budget === value}
                          onChange={() => setBudget(value)}
                        />
                        <span>{value}</span>
                      </label>
                    ))}
                  </fieldset>
                  <fieldset className="quest-options">
                    <legend>When do you need it?</legend>
                    {timings.map((value) => (
                      <label
                        key={value}
                        className={timing === value ? "selected" : ""}
                      >
                        <input
                          type="radio"
                          name="timing"
                          value={value}
                          checked={timing === value}
                          onChange={() => setTiming(value)}
                        />
                        <span>{value}</span>
                      </label>
                    ))}
                  </fieldset>
                  <div className="quest-navigation">
                    <button
                      className="text-button"
                      type="button"
                      onClick={(event) => move(0, event.detail === 0)}
                    >
                      <ArrowLeft size={17} aria-hidden />
                      Back
                    </button>
                    <button
                      className="button"
                      type="button"
                      onClick={(event) => move(2, event.detail === 0)}
                    >
                      Add the details <ArrowRight size={17} aria-hidden />
                    </button>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="quest-heading">
                    <span>03 / 03</span>
                    <h2>One short brief</h2>
                    <p>What should the player be able to do?</p>
                  </div>
                  <div className="quest-recap">
                    <span>{summary}</span>
                    <span>
                      {budget === "Let’s discuss"
                        ? "Budget to discuss"
                        : budget + " USD"}
                    </span>
                    <span>{timing}</span>
                  </div>
                  <div className="field">
                    <label htmlFor="quest-details">Your idea (required)</label>
                    <textarea
                      id="quest-details"
                      name="details"
                      value={details}
                      onChange={(event) => setDetails(event.target.value)}
                      maxLength={2000}
                      required
                      placeholder="I need an inventory where players can equip items…"
                      aria-invalid={!!errors.details}
                      aria-describedby={
                        errors.details ? "quest-details-error" : undefined
                      }
                    />
                    {errors.details && (
                      <small className="field-error" id="quest-details-error">
                        {errors.details}
                      </small>
                    )}
                  </div>
                  <div className="field">
                    <label htmlFor="quest-email">
                      Where should I reply? (required)
                    </label>
                    <input
                      id="quest-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      maxLength={254}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      required
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "quest-email-error" : undefined
                      }
                    />
                    {errors.email && (
                      <small className="field-error" id="quest-email-error">
                        {errors.email}
                      </small>
                    )}
                  </div>
                  <div className="quest-honeypot" aria-hidden="true">
                    <label htmlFor="quest-company">Leave this empty</label>
                    <input
                      id="quest-company"
                      name="company"
                      ref={spam}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  <div className="form-consent">
                    <input
                      id="quest-consent"
                      name="consent"
                      type="checkbox"
                      checked={consent}
                      onChange={(event) => setConsent(event.target.checked)}
                      required
                      aria-invalid={!!errors.consent}
                      aria-describedby={
                        errors.consent ? "quest-consent-error" : undefined
                      }
                    />
                    <label htmlFor="quest-consent">
                      Send my enquiry and reply email to Asad through Formspree.
                      I’ve read the{" "}
                      <Link href="/privacy/" prefetch={false}>
                        Privacy Policy
                      </Link>
                      .
                      {errors.consent && (
                        <span className="field-error" id="quest-consent-error">
                          {" "}
                          {errors.consent}
                        </span>
                      )}
                    </label>
                  </div>
                  {!!Object.keys(errors).length && (
                    <p className="form-error-summary" role="alert">
                      Check the highlighted fields. Nothing has been sent.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="form-error-summary" role="alert">
                      {failure} Your details are still here.
                    </p>
                  )}
                  <div className="quest-navigation">
                    <button
                      className="text-button"
                      type="button"
                      disabled={status === "sending"}
                      onClick={(event) => move(1, event.detail === 0)}
                    >
                      <ArrowLeft size={17} aria-hidden />
                      Back
                    </button>
                    <button
                      className="button"
                      type="submit"
                      disabled={status === "sending"}
                    >
                      {status === "sending" ? "Sending…" : "Send enquiry"}
                      <PaperPlaneTilt size={18} aria-hidden />
                    </button>
                  </div>
                  <p className="quest-privacy">
                    No payment, signup or marketing. Keep passwords and private
                    player data out of your brief.
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </form>
      <div className="quest-direct">
        <span>Rather chat directly?</span>
        <a href={identity.discord} target="_blank" rel="noopener noreferrer">
          <DiscordLogo size={20} weight="duotone" aria-hidden />
          Discord
          <ArrowUpRight size={14} aria-hidden />
        </a>
        <a href={`mailto:${identity.email}`}>
          <EnvelopeSimple size={20} aria-hidden />
          Email directly
          <ArrowUpRight size={14} aria-hidden />
        </a>
      </div>
    </div>
  );
}
