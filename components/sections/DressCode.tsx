import { Shirt } from "lucide-react";
import { site } from "@/content/site";
import { fr } from "@/lib/typo";
import { Reveal } from "@/components/ui/Reveal";

/** Bandeau dress code : affiché seulement si `site.dressCode` est renseigné. */
export function DressCode() {
  const { dressCode } = site;
  if (!dressCode) return null;
  return (
    <section aria-label={fr(dressCode.label)} className="border-y border-gold/25 bg-white px-5 py-16 md:py-20">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center md:flex-row md:justify-center md:gap-10 md:text-left">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold-ink">
          <Shirt className="h-7 w-7" strokeWidth={1.25} aria-hidden="true" />
        </span>
        <div>
          <p className="eyebrow text-gold-ink">{fr(dressCode.label)}</p>
          <p className="mt-3 font-display text-5xl font-light italic text-night md:text-6xl">{dressCode.value}</p>
        </div>
      </Reveal>
    </section>
  );
}
