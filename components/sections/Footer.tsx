import { site } from "@/content/site";
import { GeometricPattern } from "@/components/ui/GeometricPattern";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { Monogram } from "@/components/ui/Monogram";

export function Footer() {
  const { footer } = site;
  return (
    <footer className="velvet grain relative overflow-hidden px-5 pb-16 pt-20 text-center text-pearl md:pt-28">
      <GeometricPattern id="pattern-footer" opacity={0.06} />
      <div className="relative z-[2] flex flex-col items-center">
        <Monogram play="inView" className="h-28 w-28 md:h-32 md:w-32" title={footer.monogram} />
        <p className="mt-8 font-display text-3xl font-light text-pearl md:text-4xl">{footer.names}</p>
        <GoldDivider className="my-5" />
        <p className="font-display text-2xl tracking-[0.25em] text-gold-gradient">{footer.date}</p>
      </div>
    </footer>
  );
}
