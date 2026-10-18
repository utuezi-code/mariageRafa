"use client";

import { AnimatePresence, m } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { activeEvents } from "@/lib/events";
import { guestFromUrl, whatsappHref } from "@/lib/links";
import { rsvpSchema } from "@/lib/rsvp";
import { fr } from "@/lib/typo";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { Monogram } from "@/components/ui/Monogram";
import { Reveal } from "@/components/ui/Reveal";
import { SealedReply } from "@/components/ui/SealedReply";
import { SectionTitle } from "@/components/ui/SectionTitle";

type Errors = Partial<Record<"name" | "phone" | "attending" | "guests" | "events" | "message", string>>;

const f = site.rsvp.form;
/** Avec un seul événement, la question « Vous serez présent(e) à » est inutile. */
const ASK_EVENTS = activeEvents.length > 1;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-[#a33a2a]">
      {message}
    </p>
  );
}

function Label({ htmlFor, children, optional }: { htmlFor?: string; children: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="eyebrow block !text-[0.65rem] text-plum">
      {fr(children)}{" "}
      {optional ? (
        <span className="normal-case tracking-normal">({f.optional})</span>
      ) : (
        <span aria-hidden="true" className="text-gold-ink">
          *
        </span>
      )}
    </label>
  );
}

const chip = (checked: boolean) =>
  `flex cursor-pointer items-center gap-2 border px-5 py-3 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold-deep ${
    checked ? "border-night bg-night text-pearl" : "border-night/20 bg-white text-night/85 hover:border-gold-deep"
  }`;

export function Rsvp({ open }: { open: boolean }) {
  const { rsvp } = site;
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("");
  const [events, setEvents] = useState<string[]>(ASK_EVENTS ? [] : activeEvents.map((e) => e.id));
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error" | "limited">("idle");

  // Lien personnalisé ?pour=… : nom pré-rempli
  useEffect(() => {
    const guest = guestFromUrl();
    if (guest) setName(guest);
  }, []);

  const toggleEvent = (id: string) => setEvents((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      name,
      phone: String(fd.get("phone") ?? ""),
      attending,
      guests: attending === "oui" ? String(fd.get("guests") ?? "1") : "1",
      events: attending === "oui" ? events : [],
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
    };
    const parsed = rsvpSchema.safeParse(raw);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof Errors;
        if (k && !next[k]) next[k] = issue.message;
      }
      setErrors(next);
      const first = Object.keys(next)[0];
      if (first) document.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(raw),
      });
      if (res.status === 429) return setStatus("limited");
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { errors?: Errors } | null;
        if (data?.errors) {
          setErrors(data.errors);
          return setStatus("idle");
        }
        return setStatus("error");
      }
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="rsvp" className="relative bg-pearl px-5 py-24 md:py-32">
      <div className="mx-auto max-w-2xl">
        <SectionTitle title={rsvp.title} tone="light" />
        <GoldDivider tone="light" className="mt-6" />

        {!open ? (
          <Reveal className="mt-12">
            <div className="border border-gold/35 bg-white px-6 py-12 text-center md:px-12">
              <Monogram className="mx-auto h-20 w-20" tone="light" />
              <p className="mx-auto mt-6 max-w-md font-display text-2xl font-light italic leading-snug text-night">{fr(rsvp.closed)}</p>
            </div>
          </Reveal>
        ) : status === "done" ? (
          <SealedReply name={name} />
        ) : (
          <>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-8 max-w-lg text-center leading-relaxed text-night/85">{rsvp.text}</p>
            </Reveal>

            <Reveal delay={0.15}>
              <form
                onSubmit={onSubmit}
                noValidate
                className="relative mt-12 space-y-8 border border-gold/30 bg-white px-6 py-10 shadow-[0_30px_60px_-45px_rgba(26,16,51,0.45)] md:px-12 md:py-12"
              >
                {/* coins dorés façon papier à lettres */}
                <span aria-hidden="true" className="pointer-events-none absolute inset-2 border border-gold/15" />

                {/* Honeypot anti-spam : invisible pour les humains */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label>
                    Site web
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <div>
                  <Label htmlFor="rsvp-name">{f.name}</Label>
                  <input
                    id="rsvp-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="field"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  <FieldError id="name-error" message={errors.name} />
                </div>

                <div>
                  <Label htmlFor="rsvp-phone">{f.phone}</Label>
                  <input
                    id="rsvp-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    className="field"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  <FieldError id="phone-error" message={errors.phone} />
                </div>

                <fieldset aria-describedby={errors.attending ? "attending-error" : undefined}>
                  <legend className="eyebrow mb-3 !text-[0.65rem] text-plum">
                    {fr(f.attending)} <span aria-hidden="true" className="text-gold-ink">*</span>
                  </legend>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { value: "oui", label: f.attendingYes },
                      { value: "non", label: f.attendingNo },
                    ].map((o) => (
                      <label key={o.value} className={chip(attending === o.value)}>
                        <input type="radio" name="attending" value={o.value} checked={attending === o.value} onChange={() => setAttending(o.value)} className="sr-only" required />
                        {o.label}
                      </label>
                    ))}
                  </div>
                  <FieldError id="attending-error" message={errors.attending} />
                </fieldset>

                <AnimatePresence initial={false}>
                  {attending === "oui" && (
                    <m.div
                      key="yes-fields"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-8 overflow-hidden"
                    >
                      <div className="pt-1">
                        <Label htmlFor="rsvp-guests">{f.guests}</Label>
                        <select
                          id="rsvp-guests"
                          name="guests"
                          defaultValue="1"
                          className="field cursor-pointer"
                          aria-invalid={!!errors.guests}
                          aria-describedby={errors.guests ? "guests-error" : undefined}
                        >
                          {Array.from({ length: rsvp.maxGuests }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                        <FieldError id="guests-error" message={errors.guests} />
                      </div>

                      {ASK_EVENTS && (
                        <fieldset aria-describedby={errors.events ? "events-error" : undefined}>
                          <legend className="eyebrow mb-3 !text-[0.65rem] text-plum">
                            {fr(f.events)} <span aria-hidden="true" className="text-gold-ink">*</span>
                          </legend>
                          <div className="flex flex-wrap gap-3">
                            {activeEvents.map((ev) => {
                              const checked = events.includes(ev.id);
                              return (
                                <label key={ev.id} className={chip(checked)}>
                                  <input type="checkbox" name="events" value={ev.id} checked={checked} onChange={() => toggleEvent(ev.id)} className="sr-only" />
                                  <span
                                    aria-hidden="true"
                                    className={`flex h-4 w-4 items-center justify-center border ${checked ? "border-champagne bg-champagne text-night" : "border-night/30"}`}
                                  >
                                    {checked && <Check className="h-3 w-3" strokeWidth={2} />}
                                  </span>
                                  {ev.title}
                                </label>
                              );
                            })}
                          </div>
                          <FieldError id="events-error" message={errors.events} />
                        </fieldset>
                      )}
                    </m.div>
                  )}
                </AnimatePresence>

                <div>
                  <Label htmlFor="rsvp-message" optional>
                    {f.message}
                  </Label>
                  <textarea
                    id="rsvp-message"
                    name="message"
                    rows={3}
                    maxLength={1000}
                    className="field resize-none"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  <FieldError id="message-error" message={errors.message} />
                </div>

                {(status === "error" || status === "limited") && (
                  <p role="alert" className="text-center text-sm text-[#a33a2a]">
                    {status === "limited" ? f.rateLimited : f.error}
                  </p>
                )}

                <div className="flex justify-center pt-2">
                  <button type="submit" className="btn-gold w-full sm:w-auto" disabled={status === "sending"}>
                    {status === "sending" ? f.submitting : f.submit}
                  </button>
                </div>
              </form>
            </Reveal>
          </>
        )}

        {rsvp.contacts.length > 0 && (
          <Reveal className="mt-14 text-center">
            <p className="eyebrow text-gold-ink">{rsvp.contactsTitle}</p>
            <ul className="mt-5 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
              {rsvp.contacts.map((c) => (
                <li key={c.whatsapp}>
                  <a href={whatsappHref(c.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn-outline text-night hover:bg-night hover:text-pearl">
                    <MessageCircle className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
                    {c.name} · {rsvp.whatsappLabel}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
