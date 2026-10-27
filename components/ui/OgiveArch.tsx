"use client";

import Image from "next/image";
import { useId, type ReactNode } from "react";
import type { SiteImage } from "@/content/site";

/** Arche d'ogive (arc brisé) — viewBox 100 × 150. */
const ARCH = "M1 150 L1 58 C1 30 24 12 50 1 C76 12 99 30 99 58 L99 150";
const ARCH_INNER = "M5 150 L5 60 C5 35 26 18 50 8 C74 18 95 35 95 60 L95 150";
/** Même forme normalisée 0..1 pour le masque des photos */
const ARCH_CLIP = "M0.01 1 L0.01 0.387 C0.01 0.2 0.24 0.08 0.5 0.007 C0.76 0.08 0.99 0.2 0.99 0.387 L0.99 1 Z";

/** Voile sombre : opaque au-dessus de la photo décalée, plus léger au centre, profond en bas. */
const night = (pct: number) => `color-mix(in srgb, var(--color-night) ${pct}%, transparent)`;
const archGradient = (offset: number) =>
  `linear-gradient(to bottom, ${night(100)} ${offset}%, ${night(60)} ${offset + 14}%, ${night(50)} 55%, ${night(92)} 100%)`;

/**
 * Cadre en arche dessiné en filet or. Si `image` est fournie, la photo apparaît dans l'arche
 * avec un dégradé sombre pour la lisibilité. Sinon : arche vide + halo, aucun placeholder.
 */
export function OgiveArch({
  image,
  children,
  className = "",
  draw = true,
  priority = false,
  overlay = true,
}: {
  image?: SiteImage | null;
  children?: ReactNode;
  className?: string;
  draw?: boolean;
  priority?: boolean;
  overlay?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const clipId = `ogive-${uid}`;
  const maskId = `ogive-mask-${uid}`;

  return (
    <div className={`relative ${className}`}>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <clipPath id={clipId} clipPathUnits="objectBoundingBox">
          <path d={ARCH_CLIP} />
        </clipPath>
      </svg>

      {image ? (
        <div className="absolute inset-0 bg-night" style={{ clipPath: `url(#${clipId})` }}>
          <div className="absolute inset-x-0 bottom-0" style={{ top: `${image.archOffset ?? 0}%` }}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            sizes="(min-width: 768px) 560px, 92vw"
            className="object-cover object-top"
            placeholder={image.blurDataURL ? "blur" : "empty"}
            blurDataURL={image.blurDataURL}
          />
          </div>
          {overlay && (
            <div
              className="absolute inset-0"
              style={{ background: archGradient(image.archOffset ?? 0) }}
            />
          )}
        </div>
      ) : null}

      <svg
        viewBox="0 0 100 150"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
        fill="none"
      >
        {/* « tracé » : un masque monte du bas vers la pointe de l'arche */}
        {draw && (
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse" x="-2" y="-2" width="104" height="154">
              <rect x="-2" y="-2" width="104" height="154" fill="white" className="arch-sweep" />
            </mask>
          </defs>
        )}
        <g mask={draw ? `url(#${maskId})` : undefined}>
          <path d={ARCH} stroke="#B8893A" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <path d={ARCH_INNER} stroke="#B8893A" strokeOpacity="0.45" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
        </g>
      </svg>

      <div className="relative">{children}</div>
    </div>
  );
}
