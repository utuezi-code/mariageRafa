import { CalendarPlus, Clock, MapPin, Navigation, Shirt } from "lucide-react";
import { site, type WeddingEvent } from "@/content/site";
import { activeEvents, formatTime, isComplete } from "@/lib/events";
import { fr } from "@/lib/typo";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { Hourglass } from "@/components/ui/Hourglass";
import { StepIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Rose } from "@/components/ui/Rose";
import { SectionTitle } from "@/components/ui/SectionTitle";

function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  const l = site.invitation.labels;
  // Itinéraire et calendrier : seulement pour un événement complet (heure + lieu)
  const complete = isComplete(event);
  const pending = !event.time || !event.place;

  return (
    <Reveal delay={index * 0.15} className="h-full">
      <article className="foil relative flex h-full flex-col items-center rounded-t-[11rem] border border-gold/35 bg-white px-6 pb-9 pt-14 text-center shadow-[0_30px_60px_-40px_rgba(26,16,51,0.45)] md:px-10 md:pt-16">
        {/* arche intérieure en filet */}
        <svg aria-hidden="true" viewBox="0 0 100 60" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-3 top-3 h-40 w-[calc(100%-1.5rem)] [mask-image:linear-gradient(to_bottom,black_55%,transparent)]" fill="none">
          <path d="M0.5 60 L0.5 40 C0.5 22 22 8 50 0.6 C78 8 99.5 22 99.5 40 L99.5 60" stroke="#B8893A" strokeOpacity="0.5" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        </svg>

        <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 text-gold-ink">
          <StepIcon name={event.icon} className="h-6 w-6" />
        </span>

        <h3 className="relative mt-6 font-display text-3xl font-light text-night md:text-[2.2rem]">{event.title}</h3>
        <GoldDivider tone="light" className="relative mt-4" />

        {event.time && (
          <p className="relative mt-5 flex items-center gap-2 font-display text-2xl text-gold-ink">
            <Clock className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
            <span className="sr-only">{l.time} :</span>
            <time dateTime={`${site.identity.weddingDay}T${event.time}`}>{formatTime(event.time)}</time>
          </p>
        )}

        {(event.place || event.address) && (
          <dl className="relative mt-5 w-full space-y-4 text-[0.95rem] leading-relaxed text-night/85">
            {event.place && (
              <div>
                <dt className="eyebrow !text-[0.625rem] text-plum">{l.place}</dt>
                <dd className="mt-1 flex items-start justify-center gap-2">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold-ink" strokeWidth={1.25} aria-hidden="true" />
                  <span>{event.place}</span>
                </dd>
              </div>
            )}
            {event.address && (
              <div>
                <dt className="eyebrow !text-[0.625rem] text-plum">{l.address}</dt>
                <dd className="mt-1">{event.address}</dd>
              </div>
            )}
          </dl>
        )}

        {pending && (
          <div className="relative mt-6 flex flex-col items-center gap-4">
            <Hourglass className="h-9 w-9 text-gold" />
            <p className="max-w-[24ch] font-display text-xl font-light italic leading-snug text-night/80">{fr(site.invitation.pending)}</p>
          </div>
        )}

        {event.dressCode && (
          <p className="relative mt-6 inline-flex items-center gap-2 bg-night px-4 py-2 text-pearl">
            <Shirt className="h-4 w-4 text-champagne" strokeWidth={1.25} aria-hidden="true" />
            <span className="eyebrow !text-[0.625rem] !tracking-[0.25em]">
              {fr(l.dressCode)} : {event.dressCode}
            </span>
          </p>
        )}

        {complete && (
          <div className="relative mt-auto flex w-full flex-col gap-3 pt-8 sm:flex-row sm:justify-center">
            {event.mapsUrl && (
              <a href={event.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline text-night hover:border-gold-deep hover:bg-night hover:text-pearl">
                <Navigation className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
                {l.directions}
              </a>
            )}
            {complete && (
              <a href={`/api/calendar?evenement=${encodeURIComponent(event.id)}`} className="btn-outline border-gold-deep text-gold-ink hover:bg-gold-deep hover:text-white">
                <CalendarPlus className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
                {l.addToCalendar}
              </a>
            )}
          </div>
        )}
      </article>
    </Reveal>
  );
}

export function Invitation() {
  const { invitation } = site;
  const cols = activeEvents.length >= 3 ? "lg:grid-cols-3 md:grid-cols-2" : activeEvents.length === 2 ? "md:grid-cols-2" : "";

  return (
    <section id="invitation" className="relative overflow-hidden bg-pearl px-5 py-24 md:py-32">
      <Rose play="inView" color="#8E6A2A" opacity={0.35} className="pointer-events-none absolute -right-8 top-10 w-32 rotate-12 md:right-10 md:w-40" />
      <div className="relative mx-auto max-w-6xl">
        <SectionTitle title={invitation.title} tone="light" />
        <GoldDivider tone="light" className="mt-6" />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-center text-lg leading-relaxed text-night/85">{invitation.text}</p>
        </Reveal>

        <div className={`mx-auto mt-14 grid max-w-5xl gap-8 md:mt-16 md:gap-10 ${cols}`}>
          {activeEvents.map((e, i) => (
            <EventCard key={e.id} event={e} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
