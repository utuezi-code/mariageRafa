import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { GOLD, OgMonogram, VELVET, ogFonts } from "@/lib/og";

export const alt = site.meta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STAR = "M40 14.5 L65.5 40 L40 65.5 L14.5 40 Z M22 22 H58 V58 H22 Z";

/** Aperçu WhatsApp : velours violet, enveloppe entrouverte en filet or, monogramme, prénoms et date. */
export default async function OgImage() {
  const { identity } = site;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: VELVET,
          color: "#F7F4EE",
          position: "relative",
        }}
      >
        {/* motif d'étoiles à 8 branches */}
        <svg width="1200" height="630" style={{ position: "absolute", top: 0, left: 0, opacity: 0.09 }}>
          {Array.from({ length: 8 }).flatMap((_, r) =>
            Array.from({ length: 15 }).map((__, c) => (
              <path key={`${r}-${c}`} d={STAR} transform={`translate(${c * 84 - 12} ${r * 84 - 20}) scale(1.05)`} fill="none" stroke="#B8893A" strokeWidth="1" />
            )),
          )}
        </svg>
        {/* cadre en arche d'ogive */}
        <svg width="560" height="600" viewBox="0 0 100 150" preserveAspectRatio="none" style={{ position: "absolute", top: 30, left: 320 }}>
          <path d="M1 150 L1 58 C1 30 24 12 50 1 C76 12 99 30 99 58 L99 150" fill="none" stroke="#B8893A" strokeWidth="0.35" />
        </svg>

        <OgMonogram size={150} />
        <div style={{ display: "flex", marginTop: 26, fontFamily: "Manrope", fontSize: 18, letterSpacing: "0.4em", color: "#D9BC7E", textTransform: "uppercase" }}>
          {site.hero.title}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 14,
            fontFamily: "Cormorant",
            fontWeight: 300,
            fontSize: 112,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            backgroundImage: GOLD,
            backgroundClip: "text",
            color: "transparent",
            padding: "0 10px 14px",
          }}
        >
          {identity.groomFirstName}
          <span style={{ fontStyle: "italic", margin: "0 26px" }}>&amp;</span>
          {identity.brideFirstName}
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 16 }}>
          <div style={{ width: 80, height: 1, background: "linear-gradient(90deg, transparent, #D9BC7E)" }} />
          <div style={{ width: 10, height: 10, margin: "0 14px", transform: "rotate(45deg)", border: "1px solid #D9BC7E" }} />
          <div style={{ margin: "0 8px", fontFamily: "Cormorant", fontWeight: 500, fontSize: 38, letterSpacing: "0.1em", color: "#F7F4EE" }}>{identity.dateLong}</div>
          <div style={{ width: 10, height: 10, margin: "0 14px", transform: "rotate(45deg)", border: "1px solid #D9BC7E" }} />
          <div style={{ width: 80, height: 1, background: "linear-gradient(270deg, transparent, #D9BC7E)" }} />
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
