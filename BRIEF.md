# BRIEF.md — Direction artistique & cahier des charges

## 1. Intention

Un site **ultra-moderne, premium et royal**. La palette violet profond et or évoque la noblesse, la célébration et l'opulence maîtrisée. On vise l'esthétique d'une maison de luxe (écrin de bijouterie, velours, dorure à chaud), pas celle d'un template de mariage.

Les mots-clés sont **royal, velours, lumière dorée, solennel, contemporain.**

À éviter : le violet « fluo » ou criard, les fleurs en clipart, les scripts manuscrits partout, l'abus de dégradés.

## 2. Palette (tirée de l'image des mariés)

| Token | Hex | Usage |
|---|---|---|
| `night` | `#1A1033` | Fond dominant (violet nuit presque noir) : hero, sections sombres |
| `royal` | `#4B2A86` | Violet royal : surfaces, cartes sur fond nuit, survols |
| `velvet` | `#2C1A55` | Intermédiaire pour les dégradés de profondeur |
| `gold` | `#B8893A` | Or antique : titres, filets, icônes |
| `champagne` | `#D9BC7E` | Or clair : texte courant sur fond sombre, reflets |
| `silver` | `#BFC2CC` | Gris perle : texte secondaire, métadonnées, séparateurs fins |
| `pearl` | `#F7F4EE` | Fond clair des sections de respiration |

- **Dominante sombre** (`night` et `velvet`), avec des sections `pearl` pour respirer.
- **Effet or premium** : un dégradé `#8E6A2A → #D9BC7E → #B8893A → #8E6A2A` en `background-clip: text` sur les grands titres et le monogramme, avec un shimmer lent (désactivé si reduced motion).
- **Effet velours** : un dégradé radial `royal → night` en fond de section, plus un grain de 2 à 3 %.
- `theme-color` : `#1A1033`.

## 3. Typographie

- **Display :** `Cormorant Garamond` (300, 500, italique)
- **Texte :** `Manrope` (400, 500). Petites capitales espacées (`tracking-[0.35em]`) pour les surtitres et le menu.
- **Arabe :** `Amiri`, si les mariés valident une formule ou un verset (voir `CONTENT.md`).
- Pas de script latin manuscrit.

## 4. Éléments signature

- **Monogramme `A&A`** (Adama & Aïcha). Les deux A sont entrelacés en Cormorant, avec l'esperluette en italique dorée, dans une fine couronne ou un cercle de filet or. Il sert de logo, de sceau, de favicon et de cœur de l'image OG. Les deux A symétriques sont une vraie chance graphique, à exploiter.
- **Motif géométrique** islamique à 8 branches, en filet or, à 6 à 10 % d'opacité, sur les sections `night`.
- **Arche d'ogive** dessinée en filet or, qui sert de cadre au hero et, plus tard, aux photos.
- **Touches florales abstraites** : quelques silhouettes de roses en trait or très fin, en coin de section, en écho aux roses violettes et dorées de la palette. Discrètes, jamais en clipart.
- **Séparateur** : filet, losange, filet.

## 5. Motion

- Lenis subtil. Reveal ligne par ligne (0,8 s, `[0.22, 1, 0.36, 1]`).
- Hero : le monogramme se dessine (stroke), puis les prénoms apparaissent, puis la date.
- Le programme se trace au scroll quand il existe.
- Respect total de `prefers-reduced-motion`. Pas de gadgets.

## 6. Structure (one-page)

Menu fixe, transparent sur le hero, qui passe à `night/80` avec flou au scroll. Sur mobile, menu plein écran `night` avec les liens en Cormorant XXL. Les liens sont générés selon les sections actives.

### 6.1 Hero (fond `night` velours)
- Une formule d'ouverture (optionnelle, voir `CONTENT.md`)
- « Nous nous marions »
- **Adama** / **& Aïcha** en très grand, avec les noms complets en petites capitales en dessous
- Le monogramme A&A
- « Mardi 22 décembre 2026 »
- Le compte à rebours
- Le CTA **« Confirmer ma présence »** (or plein, texte `night`)
- La mention « Merci de ne pas partager ce lien »
- **V1 sans photo :** arche d'ogive en filet or, motif géométrique, halo doré central, roses au trait en coin.
- **V2 avec photo :** la photo apparaît dans l'arche avec un dégradé `night`, sans changer la mise en page.

### 6.2 Invitation (fond `pearl`)
- Le titre « Nous nous disons Oui », puis le texte d'invitation
- Des **cartes d'événements** générées depuis `events` (mosquée, mairie, puis réception si elle est ajoutée) : icône, titre, horaire, lieu, adresse, dress code, boutons « Itinéraire » et « Ajouter au calendrier ».
- **État « à venir »** : quand l'horaire ou le lieu est `null`, la carte garde sa beauté et affiche « Horaire et lieu communiqués prochainement » avec une petite icône sablier dorée.

### 6.3 Programme (fond `night`)
- **Si `programme` est vide :** un bloc centré avec le monogramme, le texte « Le programme détaillé sera dévoilé très bientôt » et un filet or animé.
- **Si `programme` est rempli :** une timeline verticale avec une ligne dorée tracée au scroll, l'heure en Cormorant doré, l'intitulé et l'icône. Le jour J, l'étape en cours est mise en évidence.

### 6.4 Dress code (bandeau, seulement si renseigné)
Le bandeau est masqué tant que le dress code n'est pas fourni.

### 6.5 RSVP (fond `pearl`)
- Les champs sont : nom complet\*, téléphone WhatsApp\*, présence Oui / Non\*, nombre de personnes (maximum configurable), événements auxquels l'invité participe (cases générées depuis `events`) et un message (facultatif).
- La validation Zod est faite côté client et côté serveur, avec un honeypot et un rate limit.
- Une confirmation animée redessine le monogramme.
- Après `RSVP_DEADLINE`, le formulaire est remplacé par le message « Les confirmations sont closes ».
- Les contacts s'affichent avec un bouton WhatsApp (`TODO_MARIES`).

### 6.6 Sections optionnelles (désactivées par défaut)
Notre histoire, Galerie (masonry et lightbox), Liste de cadeaux, FAQ.

### 6.7 Footer (fond `night`)
Le monogramme, « Adama & Aïcha » et « 22.12.2026 » en or. Pas de branding tiers.

## 7. États du site

1. **Programme à venir :** les événements et le programme incomplets s'affichent en mode « prochainement ».
2. **Avant le 22/12 :** le compte à rebours et le RSVP sont actifs.
3. **Jour J :** le compte à rebours affiche « C'est aujourd'hui » et l'étape en cours est mise en évidence.
4. **Après :** le hero affiche « Merci d'avoir partagé ce jour avec nous », le RSVP est masqué et la galerie est mise en avant.

Un paramètre `?preview=avant|jourj|apres` permet de tester chaque état.

## 8. Admin

`/admin` est protégé par `ADMIN_PASSWORD`. Il présente le tableau des RSVP, les totaux (oui, non, nombre de personnes, répartition par événement), l'export CSV et une recherche.

## 9. Partage

- `noindex, nofollow`.
- Image OG 1200×630 via `next/og` : fond `night` velours, monogramme or, prénoms, date. C'est l'aperçu WhatsApp, il doit être superbe.
- Titre : « Adama & Aïcha — 22 décembre 2026 »
- Description : « Nous nous marions. Vous êtes invités à célébrer notre union. »

## 10. Critères d'acceptation

- [ ] Site complet et premium **sans photo** et **avec un programme vide**
- [ ] Ajouter un événement, un horaire ou une photo se fait en éditant uniquement `content/site.ts`
- [ ] Contrastes AA vérifiés (or et champagne sur violet nuit)
- [ ] Rendu parfait en 375 px, 768 px et 1440 px. Lighthouse mobile ≥ 90
- [ ] RSVP enregistré en base, visible dans l'admin et exportable en CSV
- [ ] Les états testables via `?preview=`
- [ ] Déployé sur Vercel, avec la base Neon connectée
- [ ] Le README liste tous les `TODO_MARIES` et toutes les PROPOSITIONS
