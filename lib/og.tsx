import { readFile } from "node:fs/promises";
import { join } from "node:path";

const dir = join(process.cwd(), "assets/fonts");

export async function ogFonts() {
  const [light, lightItalic, medium, manrope] = await Promise.all([
    readFile(join(dir, "cormorant-garamond-latin-300-normal.woff")),
    readFile(join(dir, "cormorant-garamond-latin-300-italic.woff")),
    readFile(join(dir, "cormorant-garamond-latin-500-normal.woff")),
    readFile(join(dir, "manrope-latin-500-normal.woff")),
  ]);
  return [
    { name: "Cormorant", data: light, weight: 300 as const, style: "normal" as const },
    { name: "Cormorant", data: lightItalic, weight: 300 as const, style: "italic" as const },
    { name: "Cormorant", data: medium, weight: 500 as const, style: "normal" as const },
    { name: "Manrope", data: manrope, weight: 500 as const, style: "normal" as const },
  ];
}

export const GOLD = "linear-gradient(100deg, #8E6A2A 0%, #E8D29C 35%, #B8893A 62%, #8E6A2A 100%)";
export const VELVET = "radial-gradient(circle at 50% 35%, #4B2A86 0%, #2C1A55 38%, #1A1033 75%)";

/** Monogramme A&A pour next/og (texte HTML + double cercle). */
export function OgMonogram({ size }: { size: number }) {
  const s = size / 240;
  const small = size < 100;
  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: size, height: size, borderRadius: size, border: `${small ? 3 : 1.5}px solid #B8893A` }} />
      {!small && <div style={{ position: "absolute", top: 8 * s, left: 8 * s, width: size - 16 * s, height: size - 16 * s, borderRadius: size, border: "1px solid rgba(217,188,126,0.5)" }} />}
      <div style={{ display: "flex", alignItems: "center", marginTop: (small ? 6 : 10) * s }}>
        <span style={{ fontFamily: "Cormorant", fontWeight: small ? 500 : 300, fontSize: (small ? 120 : 104) * s, lineHeight: 1, backgroundImage: GOLD, backgroundClip: "text", color: "transparent" }}>A</span>
        <span
          style={{
            fontFamily: "Cormorant",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: (small ? 64 : 52) * s,
            lineHeight: 1,
            color: "#E8D29C",
            margin: `0 ${-4 * s}px`,
            marginTop: -10 * s,
          }}
        >
          &amp;
        </span>
        <span style={{ fontFamily: "Cormorant", fontWeight: small ? 500 : 300, fontSize: (small ? 120 : 104) * s, lineHeight: 1, backgroundImage: GOLD, backgroundClip: "text", color: "transparent" }}>A</span>
      </div>
    </div>
  );
}
