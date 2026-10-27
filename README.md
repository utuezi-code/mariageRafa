# A&A — Site de mariage

Site d'invitation privé de **Gansoré Adama & Sirima Aïcha**, le **jeudi 24 décembre 2026** à Abidjan.

Next.js 15 · Tailwind CSS v4 · Framer Motion · Lenis · Prisma + PostgreSQL (Neon) · Zod · hébergé sur Vercel.

> Documents de référence : [`CLAUDE.md`](CLAUDE.md) (règles techniques), [`BRIEF.md`](BRIEF.md) (direction artistique), [`CONTENT.md`](CONTENT.md) (contenu).

---

## Ce qui rend ce site unique

| Moment | Ce que voit l'invité |
|---|---|
| **Enveloppe d'ouverture** | Une enveloppe de velours violet, doublée d'un motif à 8 branches en feuille d'or, scellée d'un **sceau de cire doré A&A**. L'invité touche le sceau : il se brise en deux, le rabat se soulève en 3D, la carte glisse hors de l'enveloppe, puis l'écran s'efface sur le hero. Elle revient à chaque chargement ou rafraîchissement de la page (le bouton « Passer » permet de l'écourter). |
| **Lien personnalisé** | `https://…/?pour=Famille%20Traoré` affiche « Pour Famille Traoré » au-dessus de l'enveloppe et **pré-remplit le nom** dans le formulaire RSVP. |
| **Hero** | Arche d'ogive tracée en or, monogramme A&A qui se dessine, prénoms révélés lettre par lettre, poussière d'or qui s'élève, roses au trait qui se dessinent en coin. |
| **Compte à rebours** | Chiffres sur rouleaux qui glissent à chaque seconde. |
| **Cartes « à venir »** | Tant qu'un horaire ou un lieu manque, un **sablier doré** s'écoule puis se retourne. Reflet de feuille d'or au survol des cartes. |
| **Réponse RSVP** | Après l'envoi, la réponse (avec le nom de l'invité) **glisse dans une enveloppe, le rabat se referme et le sceau A&A vient la cacheter**. |

Tout respecte `prefers-reduced-motion` : les animations sont alors coupées et l'enveloppe s'ouvre instantanément. Sans JavaScript, l'enveloppe est masquée et le site reste lisible.

---

## 1. Informations à compléter (TODO_MARIES)

Toutes ces valeurs sont dans **`content/site.ts`** (recherchez `TODO_MARIES`), sauf mention contraire. Le site fonctionne déjà sans elles.

| # | Information | Où | Valeur actuelle |
|---|---|---|---|
| 1 | Prénoms d'affichage (ou surnoms) | `identity.groomFirstName`, `brideFirstName`, `displayNames` | Adama / Aïcha |
| 2 | ~~Confirmer la date et le jour~~ ✓ confirmé | `identity.dateLong` | Jeudi 24 décembre 2026 |
| 3 | Cérémonie religieuse : heure, lieu, adresse, lien Maps, dress code | `events[0]` | `null` → « Horaire et lieu communiqués prochainement » |
| 4 | Mariage civil : heure, mairie, adresse, lien Maps, dress code | `events[1]` | `null` |
| 5 | Réception (à confirmer) | `events[2]` puis `enabled: true` | masquée |
| 6 | Programme de la journée | `programme.steps` | vide → « Le programme détaillé sera dévoilé très bientôt » |
| 7 | Dress code général (bandeau) | `dressCode` | `null` → bandeau masqué |
| 8 | Verset ou citation (optionnel) | `hero.verse` | aucun |
| 9 | **Date limite** des confirmations | `rsvp.text`, `rsvp.deadlineDefault` **et** variable Vercel `RSVP_DEADLINE` | Proposition : 8 décembre 2026 |
| 10 | Nombre maximum de personnes par réponse | `rsvp.maxGuests` | `5` |
| 11 | Contacts (nom + WhatsApp) | `rsvp.contacts` | vide → bloc masqué |
| 12 | Notre histoire (texte + 1 photo) | `story` + `media.story` | désactivée |
| 13 | Galerie (6 à 12 photos) | `gallery.enabled` + `media.gallery` | désactivée |
| 14 | Liste de cadeaux | `gifts` | désactivée |
| 15 | FAQ | `faq` | désactivée |
| 16 | Photo principale du couple (hero, dans l'arche) | `media.hero` | aucune → hero typographique |
| 17 | (Optionnel) image de partage WhatsApp | `media.ogImage` | aucune → image générée avec le monogramme |
| 18 | Nom de domaine personnalisé | Vercel | `*.vercel.app` |
| 19 | Mot de passe de l'espace admin | variable Vercel `ADMIN_PASSWORD` | à choisir |

## 2. PROPOSITIONS à valider

| Texte | Où |
|---|---|
| Bismillah « بسم الله الرحمن الرحيم — Bismillah ar-Rahman ar-Rahim » en tête du hero | `hero.bismillah.enabled` (désactivé par défaut : passer à `true` pour l'afficher) |
| « Adama & Aïcha ont la joie de vous inviter à célébrer leur union le jeudi 24 décembre 2026. » | `invitation.text` |
| Date limite : 8 décembre 2026 | `rsvp.text` |
| Clôture du programme : « Qu'Allah bénisse notre union et qu'Il vous comble de bienfaits. » | `programme.closing` (mettre `null` pour la masquer) |
| Textes de l'enveloppe : « Pour », « Touchez le sceau pour ouvrir », « Ouvrir l'invitation », « Passer » | `envelope` (`enabled: false` pour supprimer l'enveloppe) |

---

## 3. Mettre à jour les événements et le programme

Tout se fait dans `content/site.ts`, sans toucher aux composants.

```ts
{
  id: "mosquee",                 // ne plus changer une fois le site en ligne
  type: "religieux",
  enabled: true,
  title: "Cérémonie religieuse",
  time: "08:00",                 // heure d'Abidjan
  endTime: "10:00",              // facultatif (fichier calendrier)
  place: "Mosquée de …",
  address: "Cocody, près de …",
  mapsUrl: "https://maps.app.goo.gl/…",
  dressCode: "…",
  icon: "mosque",                // mosque | landmark | utensils | rings
},
```

- L'**ordre** d'affichage est celui du tableau : déplacez un bloc pour changer l'ordre.
- Dès que `time` **et** `place` sont renseignés, la carte affiche « Itinéraire » (si `mapsUrl`) et « Ajouter au calendrier ».
- Le **compte à rebours** vise automatiquement la première heure connue du 24/12 (par défaut 08 h 00).
- Programme : `steps: [{ time: "08:00", label: "Cérémonie religieuse", icon: "mosque" }, …]` (icônes : mosque, landmark, rings, camera, utensils, cake, music, car, sparkles). Le jour J, l'étape en cours est mise en évidence.

**Depuis GitHub sans rien installer :** ouvrez `content/site.ts` → icône crayon → modifiez **entre les guillemets** → « Commit changes ». Vercel remet le site à jour en 1 à 2 minutes.

---

## 4. Mettre le site en ligne sur Vercel (pas à pas)

Prérequis : un compte [GitHub](https://github.com) (le code y est déjà) et un compte [Vercel](https://vercel.com) gratuit (plan Hobby), créé avec « Continue with GitHub ».

1. **Importer le projet** — Vercel → « Add New… » → « Project » → choisissez ce dépôt → « Import ». Ne changez aucun réglage de build.
2. **Créer la base de données** — dans le projet Vercel : onglet « Storage » → « Create Database » → **Neon** (Marketplace) → région Frankfurt → « Connect » au projet. `DATABASE_URL` est injectée automatiquement.
3. **Variables d'environnement** — « Settings » → « Environment Variables » :
   - `ADMIN_PASSWORD` : un mot de passe pour `/admin`
   - `RSVP_DEADLINE` : `2026-12-08T23:59:00Z` (à adapter)
   - `NEXT_PUBLIC_SITE_URL` : l'adresse du site, ex. `https://adama-aicha.vercel.app`
4. **Déployer** — onglet « Deployments » → « Redeploy ». Le build lance `prisma generate`, `prisma migrate deploy` (création de la table des réponses) puis `next build`.
5. **Tester** — ouvrez le site sur un téléphone, ouvrez l'enveloppe, envoyez une réponse test, vérifiez-la dans `/admin`, puis supprimez-la depuis Neon si besoin.

Chaque `git push` sur `main` met la production à jour ; chaque autre branche crée une preview.

---

## 5. Ajouter les photos (après la mise en ligne)

1. Déposez les photos brutes dans un dossier `photos-brutes/` à la racine (non versionné).
2. `npm install` puis `npm run optimize-images` : redimensionnement 2400 px max, WebP + AVIF < 300 Ko, `blurDataURL`.
3. Le script affiche des lignes prêtes à coller dans `content/site.ts` → `media` (`hero`, `story`, `gallery`). Remplacez les `alt` par une description.
4. Pour la galerie et l'histoire, passez aussi `gallery.enabled` / `story.enabled` à `true`.
5. `git push` : Vercel redéploie.

La photo du hero apparaît dans l'arche d'ogive, avec un dégradé violet nuit, sans changer la mise en page. Aperçu avec des visuels de démonstration : `/?preview=demo`.

---

## 6. Espace admin

`/admin` (mot de passe `ADMIN_PASSWORD`) : totaux (oui, non, personnes attendues, répartition par événement), tableau des réponses, recherche, **export CSV** (compatible Excel).

## 7. Tester les états du site

| URL | État |
|---|---|
| `/?preview=avant` | avant le mariage, RSVP ouvert |
| `/?preview=clos` | avant le mariage, confirmations closes |
| `/?preview=jourj` | jour J : « C'est aujourd'hui », étape en cours du programme |
| `/?preview=apres` | après : « Merci d'avoir partagé ce jour avec nous », RSVP masqué, galerie en avant, pas d'enveloppe |
| `/?preview=demo` | avant + visuels de démonstration (hero avec photo, galerie) |

Pour revoir l'enveloppe après l'avoir ouverte : rafraîchissez simplement la page.

## 8. Liens personnalisés

Envoyez à chaque famille son propre lien : `https://votre-site/?pour=Famille%20Koné` (les espaces s'écrivent `%20` ; WhatsApp les encode aussi automatiquement). Le nom s'affiche sur l'enveloppe et pré-remplit le RSVP. Sans `?pour=`, l'enveloppe affiche la date.

## 9. Brancher un nom de domaine personnalisé (TODO_MARIES)

Vercel → projet → « Settings » → « Domains » → saisissez le domaine (ex. `adama-aicha.com`) → suivez les enregistrements DNS indiqués chez votre registrar. Mettez ensuite `NEXT_PUBLIC_SITE_URL` à jour et redéployez.

## 10. Pour les développeurs

```bash
npm install
cp .env.example .env    # renseigner DATABASE_URL (Neon) et ADMIN_PASSWORD
npx prisma migrate deploy
npm run dev             # http://localhost:3000
npm run typecheck
npm run build:local     # build sans migration
```

- Contenu : `content/site.ts` uniquement. Composants : `components/sections` et `components/ui`.
- Enveloppe : `components/ui/Envelope.tsx` (écran d'ouverture), `EnvelopeArt.tsx` (dessin partagé), `SealedReply.tsx` (réponse cachetée), `WaxSeal.tsx` ; états pilotés en CSS dans `app/globals.css` (section « Enveloppe »).
- Confidentialité : `noindex, nofollow` (metadata + en-tête `X-Robots-Tag`), `robots.txt` qui bloque tout, aucun analytics.
- **Police arabe** : `assets/fonts/amiri-bismillah.woff2` ne contient que les glyphes de la Bismillah. Si le texte arabe change, régénérez un sous-ensemble d'Amiri (ex. `pyftsubset Amiri-Regular.ttf --text="…" --flavor=woff2`).
