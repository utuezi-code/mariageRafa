# CLAUDE.md — Site de mariage A&A

Site d'invitation de mariage privé pour **Gansoré Adama & Sirima Aïcha**, le **mardi 22 décembre 2026** à Abidjan.

Lis ces trois fichiers avant d'écrire du code :
1. `CLAUDE.md` (ce fichier) : stack, règles, workflow
2. `BRIEF.md` : direction artistique, sections, fonctionnalités
3. `CONTENT.md` : le contenu. Les textes marqués **PROPOSITION** sont à valider par les mariés, et les `TODO_MARIES` sont à compléter. Ne rien inventer d'autre.

---

## Contraintes clés du projet

1. **Next.js, hébergé sur Vercel.** Non négociable.
2. **Les photos seront ajoutées APRÈS la mise en ligne.** La V1 sort sans photo et doit déjà être premium. Chaque emplacement photo s'active plus tard sans toucher aux composants.
3. **Le programme n'est pas encore fixé.** On sait seulement qu'il y aura une cérémonie à la **mosquée** et un passage à la **mairie**. Horaires, lieux et ordre sont à définir. Le site doit pouvoir sortir avec un programme incomplet et être mis à jour en éditant uniquement `content/site.ts`.

## Stack imposée

- **Next.js 15** (App Router, TypeScript strict), hébergé sur **Vercel** (plan Hobby)
- **Tailwind CSS v4** avec les tokens de `BRIEF.md`
- **Framer Motion** pour les animations, **Lenis** pour le smooth scroll
- **next/font** pour les polices
- **Prisma + PostgreSQL (Neon via l'intégration Vercel Marketplace)** pour les RSVP
- **Zod** pour la validation
- **lucide-react** pour les icônes (`strokeWidth={1.25}`)
- Pas de framework UI lourd. shadcn/ui est autorisé seulement pour l'accordéon et les champs de formulaire, restylés.

## Architecture

```
app/
  layout.tsx            # polices, metadata, noindex, theme-color
  page.tsx              # one-page
  admin/page.tsx        # RSVP, protégé par mot de passe
  api/rsvp/route.ts
  api/admin/export/route.ts
  opengraph-image.tsx   # OG générée (next/og)
components/sections/
components/ui/
content/site.ts         # TOUT le contenu, les médias et le programme
lib/                    # prisma.ts, date.ts, ics.ts
prisma/schema.prisma
public/images/
scripts/optimize-images.ts
```

- **Tout le texte vit dans `content/site.ts`.** Aucun texte en dur dans les composants.
- Les sections optionnelles (Notre histoire, Galerie, Cadeaux, FAQ) sont activées par des flags. Si elles sont vides, elles sont masquées et retirées du menu.

## Programme et événements : modèle de données flexible

```ts
events: [
  { id: "mosquee", type: "religieux", title: "Cérémonie religieuse",
    time: null, place: null, address: null, mapsUrl: null, dressCode: null },
  { id: "mairie", type: "civil", title: "Mariage civil",
    time: null, place: null, address: null, mapsUrl: null, dressCode: null },
  // une réception pourra être ajoutée ici
],
programme: [],   // [{ time: "08:00", label: "...", icon: "mosque" }]
```

- L'ordre d'affichage suit l'ordre du tableau. Il ne faut donc pas supposer que la mosquée passe avant la mairie.
- Quand `time` ou `place` vaut `null`, la carte affiche « Horaire et lieu communiqués prochainement » avec un style soigné, sans trou ni texte « null ».
- Quand `programme` est vide, la section Programme affiche un état élégant « Le programme détaillé sera dévoilé très bientôt » au lieu de la timeline.
- Le fichier `.ics` et les liens Maps ne sont générés que pour les événements complets.
- La cible du compte à rebours est la première heure connue du 22/12/2026. À défaut, c'est `2026-12-22T08:00:00Z`, réglable dans `content/site.ts`.

## Photos (ajoutées plus tard)

- Les photos sont déclarées dans `content/site.ts` > `media`, avec `null` ou `[]` par défaut (`hero`, `story`, `gallery`, `ogImage`).
- Chaque composant a une **variante sans photo soignée** et une variante avec photo (`next/image`, `placeholder="blur"`).
- Pour ajouter une photo, on la dépose dans `public/images/`, on renseigne son chemin dans `content/site.ts`, puis on fait un `git push`. Vercel redéploie automatiquement.
- Le script `npm run optimize-images` (avec `sharp`) passe les images en 2400 px max, les convertit en WebP/AVIF et génère les `blurDataURL`.

## Règles

- **Mobile first** (lien partagé sur WhatsApp, Android). Tester en 375 px, 768 px et 1440 px.
- **Lighthouse mobile ≥ 90.** Aucune image > 300 Ko après optimisation, pas de vidéo lourde.
- **Accessibilité AA.** Attention à l'or sur fond violet : vérifier les contrastes et utiliser `champagne` pour le texte courant sur fond sombre. Respecter `prefers-reduced-motion`.
- **Confidentialité.** `noindex, nofollow`, un `robots.txt` qui bloque tout, aucun analytics tiers.
- **Fuseau.** `Africa/Abidjan` (UTC+0) partout.
- **Langue.** 100 % français. Pas de branding tiers.

## Déploiement Vercel

- Repo GitHub, puis import Vercel. Chaque push sur `main` part en production, et chaque branche en preview.
- Neon via l'intégration Vercel, qui injecte `DATABASE_URL`.
- Build : `prisma generate && prisma migrate deploy && next build`.
- Le README explique pas à pas le déploiement, l'ajout de photos, la mise à jour du programme et le branchement d'un domaine.

## Variables d'environnement

```
DATABASE_URL=
ADMIN_PASSWORD=
NEXT_PUBLIC_SITE_URL=
RSVP_DEADLINE=      # TODO_MARIES
```

## Workflow

1. Initialiser le projet et configurer les tokens.
2. Créer `content/site.ts` depuis `CONTENT.md`.
3. Construire les sections dans l'ordre de `BRIEF.md`, en vérifiant d'abord le rendu mobile.
4. Brancher le RSVP, l'admin et l'export CSV.
5. Implémenter les états « programme à venir », « avant », « jour J » et « après ».
6. Passer Lighthouse.
7. Écrire le README et lister tous les `TODO_MARIES` et toutes les PROPOSITIONS à valider.
