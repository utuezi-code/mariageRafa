import { z } from "zod";
import { site } from "@/content/site";
import { activeEvents } from "@/lib/events";

const e = site.rsvp.form.errors;
const EVENT_IDS = new Set(activeEvents.map((ev) => ev.id));

export const rsvpSchema = z
  .object({
    name: z.string().trim().min(2, e.name).max(120, e.name),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[0-9\s.\-()]{8,20}$/, e.phone),
    attending: z.enum(["oui", "non"], { errorMap: () => ({ message: e.attending }) }),
    guests: z.coerce.number({ invalid_type_error: e.guests }).int(e.guests).min(1, e.guests).max(site.rsvp.maxGuests, e.guests),
    events: z
      .array(z.string())
      .max(10)
      .default([])
      .transform((ids) => [...new Set(ids)].filter((id) => EVENT_IDS.has(id))),
    message: z.string().trim().max(1000, e.message).optional().default(""),
    // Honeypot : doit rester vide
    website: z.string().max(0).optional().default(""),
  })
  .superRefine((v, ctx) => {
    if (v.attending === "oui" && activeEvents.length > 1 && v.events.length === 0) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["events"], message: e.events });
    }
  });

export type RsvpInput = z.input<typeof rsvpSchema>;
export type RsvpData = z.output<typeof rsvpSchema>;
