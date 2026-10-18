/**
 * Médias de DÉMONSTRATION — utilisés uniquement par l'aperçu /?preview=demo.
 * Ce ne sont pas de vraies photos : de simples visuels velours et or pour juger le rendu
 * du hero avec photo et de la galerie. Le site public n'utilise que site.media.
 */
import type { Media } from "@/lib/sections";

export const demoMedia: Media = {
  hero: { src: "/images/demo/hero.webp", alt: "Visuel de démonstration", width: 1200, height: 1800, blurDataURL: "data:image/webp;base64,UklGRnIAAABXRUJQVlA4WAoAAAAQAAAACgAADwAAQUxQSBQAAAABD3Dr/4iIQCBAUfj/24OI/od7AVZQOCA4AAAA0AEAnQEqCwAQAAOAWiWgAnQA3J2TuFgA/sJOwUvZccGfZcqXlU2QmSNW3mPJE7TajabPJxG5GAA=" },
  story: null,
  gallery: [
    { src: "/images/demo/galerie-1.webp", alt: "Visuel de démonstration 1", width: 1200, height: 1600, blurDataURL: "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADQAQCdASoMABAAA4BaJZACdAERHtNzAAD+8zT0mEZXEVU/4o65AN/d3chrd4rzJZ1RqAAA" },
    { src: "/images/demo/galerie-2.webp", alt: "Visuel de démonstration 2", width: 1600, height: 1067, blurDataURL: "data:image/webp;base64,UklGRnYAAABXRUJQVlA4WAoAAAAQAAAADwAACgAAQUxQSBMAAAABD/Dr/4iIIBZM8pfeG0JE/5MGAFZQOCA8AAAAMAIAnQEqEAALAAOAWiWwAnQBAx+eJ+v4mZAA/uzXoPyhgxQE7ouJvkfU9FNV5fp3Qc8aAdHIjPIwAAAA" },
    { src: "/images/demo/galerie-3.webp", alt: "Visuel de démonstration 3", width: 1200, height: 1200, blurDataURL: "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAAAwAgCdASoQABAAA4BaJbACdAEPDDyZhBNaAAD+9CkQl8zTOhhswgRd7DyOhnFnaBX/3HAA" },
    { src: "/images/demo/galerie-4.webp", alt: "Visuel de démonstration 4", width: 1200, height: 1700, blurDataURL: "data:image/webp;base64,UklGRmoAAABXRUJQVlA4WAoAAAAQAAAACgAADwAAQUxQSBQAAAABD3Dm/4iIICQgNP8Xyx5E9D+TlVZQOCAwAAAAMAIAnQEqCwAQAAOAWiWwAnQBDwARPeh5DgAA/u9gKdhCdRbPbEX/qzdqnrvNqeAA" },
    { src: "/images/demo/galerie-5.webp", alt: "Visuel de démonstration 5", width: 1600, height: 1100, blurDataURL: "data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAAAQAgCdASoQAAsAA4BaJZAC7AEO/x0/DMQAAP71bbwtegM6q+arQ/KvjE/kimoKMAA=" },
    { src: "/images/demo/galerie-6.webp", alt: "Visuel de démonstration 6", width: 1200, height: 1500, blurDataURL: "data:image/webp;base64,UklGRnIAAABXRUJQVlA4WAoAAAAQAAAADAAADwAAQUxQSBQAAAABD/Dz/4iIIJBNdoP8jTOI6H/oAlZQOCA4AAAAEAIAnQEqDQAQAAOAWiWoAnQBDwvpHOFAAAD+9pGRT7CNSZkmcGE6NB5GcKbgwtPN+3TKOJuYAAA=" },
  ],
  ogImage: null,
};
