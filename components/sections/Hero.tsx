import { site, type SiteImage } from "@/content/site";
import type { Phase } from "@/lib/date";
import { fr } from "@/lib/typo";
import { Countdown } from "@/components/ui/Countdown";
import { GeometricPattern } from "@/components/ui/GeometricPattern";
import { GoldDust } from "@/components/ui/GoldDust";
import { Monogram } from "@/components/ui/Monogram";
import { OgiveArch } from "@/components/ui/OgiveArch";
import { Reveal, RevealChars, RevealLines } from "@/components/ui/Reveal";
import { Rose } from "@/components/ui/Rose";

export function Hero({ phase, rsvpOpen, image }: { phase: Phase; rsvpOpen: boolean; image: SiteImage | null }) {
  const { hero, identity } = site;
  const after = phase === "apres";

  return (
    <section id="accueil" className="velvet grain relative overflow-hidden text-pearl">
      <GeometricPattern id="pattern-hero" opacity={0.08} />
      <div aria-hidden="true" className="halo pointer-events-none absolute left-1/2 top-[46%] h-[48rem] w-[48rem] -translate-x-1/2 -translate-y-1/2" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(16,9,34,0.85)_100%)]" />
      <GoldDust count={18} />

      {/* roses au trait, en coin */}
      <Rose delay={0.4} className="pointer-events-none absolute -left-6 top-16 w-28 -rotate-12 md:left-6 md:top-24 md:w-44" />
      <Rose delay={0.8} className="pointer-events-none absolute -right-6 bottom-10 w-28 rotate-[160deg] md:right-8 md:w-44" />

      <div className="relative z-[2] mx-auto flex min-h-dvh max-w-3xl flex-col items-center justify-center px-5 pb-20 pt-24 text-center md:pb-24 md:pt-28">
        {hero.bismillah.enabled && (
          <Reveal onMount delay={0.1} y={12} className="mb-8">
            <p lang="ar" dir="rtl" className="font-arabic text-[1.9rem] leading-[1.6] text-gold-gradient md:text-4xl">
              {hero.bismillah.arabic}
            </p>
            <p className="eyebrow mt-2 text-champagne/80">{hero.bismillah.translit}</p>
          </Reveal>
        )}

        {hero.verse && (
          <figure className="mb-10 max-w-[40ch]">
            <Reveal as="p" onMount delay={0.2} y={10} className="font-display text-lg font-light italic leading-relaxed text-pearl/85 md:text-xl">
              {fr(hero.verse.text)}
            </Reveal>
            <Reveal onMount delay={0.5} y={8}>
              <figcaption className="eyebrow mt-3 text-champagne">{hero.verse.reference}</figcaption>
            </Reveal>
          </figure>
        )}

        <OgiveArch image={image} priority className="w-full max-w-[22rem] md:max-w-[34rem]">
          <div className="flex flex-col items-center px-6 pb-12 pt-14 md:px-10 md:pb-16 md:pt-20">
            <Monogram play="mount" delay={0.3} className="h-24 w-24 md:h-28 md:w-28" />

            {after ? (
              <RevealLines
                as="h1"
                onMount
                delay={1.3}
                lines={[fr(hero.afterTitle)]}
                className="mt-8 font-display text-4xl font-light leading-tight md:text-5xl"
                lineClassName="text-gold-gradient"
              />
            ) : (
              <>
                <Reveal onMount delay={1.1} y={10}>
                  <p className="eyebrow mt-8 text-champagne">{hero.title}</p>
                </Reveal>
                <h1 className="mt-6 font-display font-light leading-[0.95] tracking-[-0.02em]">
                  <span className="sr-only">
                    {identity.groom} &amp; {identity.bride}
                  </span>
                  <span aria-hidden="true" className="block">
                    <span className="block text-[3.7rem] md:text-[5.75rem]">
                      <RevealChars text={identity.groomFirstName} delay={1.3} charClassName="text-gold-gradient pb-[0.08em]" />
                    </span>
                    <Reveal as="span" className="mt-1 block" onMount delay={1.7} y={6}>
                      <span className="eyebrow block !text-[0.6rem] text-silver md:!text-[0.7rem]">{identity.groom}</span>
                    </Reveal>
                    <span className="mt-5 block whitespace-nowrap text-[3.7rem] md:text-[5.75rem]">
                      <RevealChars text="&" delay={1.8} className="italic" charClassName="text-gold-gradient pr-[0.06em]" /> <RevealChars text={identity.brideFirstName} delay={1.9} charClassName="text-gold-gradient pb-[0.08em]" />
                    </span>
                    <Reveal as="span" className="mt-1 block" onMount delay={2.3} y={6}>
                      <span className="eyebrow block !text-[0.6rem] text-silver md:!text-[0.7rem]">{identity.bride}</span>
                    </Reveal>
                  </span>
                </h1>
              </>
            )}

            <Reveal onMount delay={after ? 1.6 : 2.45} y={8}>
              <div className="mt-9 flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-transparent to-champagne/70" />
                <p className="font-display text-xl text-pearl md:text-2xl">{identity.dateLong}</p>
                <span aria-hidden="true" className="h-px w-8 bg-gradient-to-l from-transparent to-champagne/70" />
              </div>
            </Reveal>
          </div>
        </OgiveArch>

        {!after && (
          <Reveal onMount delay={2.6} className="mt-12 md:mt-14">
            <Countdown forceToday={phase === "jourj"} />
          </Reveal>
        )}

        {rsvpOpen && (
          <Reveal onMount delay={2.75} className="mt-12">
            <a href="#rsvp" className="btn-gold">
              {hero.cta}
            </a>
          </Reveal>
        )}

        {!after && (
          <Reveal onMount delay={2.9}>
            <p className="mt-8 text-xs tracking-wide text-silver/90">{hero.privacyNote}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
