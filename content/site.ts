/**
 * content/site.ts — TOUT le contenu du site.
 *
 * Source : CONTENT.md. Les textes marqués PROPOSITION sont à valider par les mariés,
 * les valeurs marquées TODO_MARIES sont à compléter (liste complète dans le README).
 *
 * Pour modifier un horaire, un lieu, le programme ou un texte : c'est ici, et nulle part ailleurs.
 */

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type SiteImage = {
  src: string; // ex. "/images/hero.webp"
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string; // généré par `npm run optimize-images`
  /** Arche : décale la photo vers le bas (en % de la hauteur) ; le haut de l'arche reste sombre. */
  archOffset?: number;
};

export type Verse = { text: string; reference: string };

export type EventIcon = "mosque" | "landmark" | "utensils" | "rings";

export type WeddingEvent = {
  id: string; // identifiant stable (stocké avec les réponses RSVP) : ne plus le changer une fois le site en ligne
  type: "religieux" | "civil" | "reception";
  /** false = événement masqué partout (carte, RSVP, calendrier) */
  enabled: boolean;
  title: string;
  /** Heure de début, format "HH:MM" (heure d'Abidjan), ou null si inconnue */
  time: string | null;
  /** Heure de fin "HH:MM", utilisée seulement pour le fichier calendrier (sinon début + 2 h) */
  endTime: string | null;
  place: string | null; // nom du lieu
  address: string | null; // adresse ou repère
  mapsUrl: string | null; // lien Google Maps « Partager »
  dressCode: string | null;
  icon: EventIcon;
};

export type ProgrammeIcon =
  | "mosque"
  | "landmark"
  | "rings"
  | "camera"
  | "utensils"
  | "cake"
  | "music"
  | "car"
  | "sparkles";

export type ProgrammeStep = { time: string; label: string; icon: ProgrammeIcon }; // time : "HH:MM"

export type Contact = { name: string; whatsapp: string }; // whatsapp au format international sans +, ex. "2250700000000"

/* ------------------------------------------------------------------ */
/* Contenu                                                             */
/* ------------------------------------------------------------------ */

export const site = {
  identity: {
    groom: "Gansoré Adama",
    bride: "Sirima Aïcha",
    monogram: "A&A",
    // TODO_MARIES — prénoms d'affichage à confirmer (ou surnoms)
    groomFirstName: "Adama",
    brideFirstName: "Aïcha",
    displayNames: "Adama & Aïcha",
    // Date confirmée par les mariés
    dateLong: "Jeudi 24 décembre 2026",
    dateShort: "24.12.2026",
    city: "Abidjan",
    timezone: "Africa/Abidjan",
    /** Jour du mariage (date locale Abidjan = UTC) */
    weddingDay: "2026-12-24",
    /** Cible du compte à rebours si aucun horaire n'est encore connu (sinon : première heure connue) */
    countdownFallback: "2026-12-24T08:00:00Z",
  },

  meta: {
    title: "Adama & Aïcha — 24 décembre 2026",
    description: "Nous nous marions. Vous êtes invités à célébrer notre union.",
  },

  nav: {
    home: "Accueil",
    invitation: "Invitation",
    programme: "Programme",
    rsvp: "RSVP",
    story: "Notre histoire",
    gallery: "Galerie",
    gifts: "Cadeaux",
    faq: "FAQ",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
  },

  /* ---------------------------------------------------------------- */
  /* Enveloppe d'ouverture                                             */
  /* ---------------------------------------------------------------- */
  // PROPOSITION — textes de l'enveloppe à valider.
  // Lien personnalisé : ajouter ?pour=Famille%20Traoré à l'adresse du site → « Pour Famille Traoré » s'affiche
  // sur l'enveloppe et le nom est pré-rempli dans le formulaire RSVP.
  envelope: {
    enabled: true,
    guestPrefix: "Pour",
    hint: "Touchez le sceau pour ouvrir",
    open: "Ouvrir l'invitation",
    skip: "Passer",
  },

  hero: {
    // PROPOSITION — afficher seulement si les mariés le souhaitent (passer `enabled` à true)
    bismillah: {
      enabled: false,
      arabic: "بسم الله الرحمن الرحيم",
      translit: "Bismillah ar-Rahman ar-Rahim",
    },
    verse: null as Verse | null, // TODO_MARIES (optionnel) — { text: "« … »", reference: "…" }
    title: "Nous nous marions",
    cta: "Confirmer ma présence",
    privacyNote: "Merci de ne pas partager ce lien.",
    countdownLabels: { days: "Jours", hours: "Heures", minutes: "Minutes", seconds: "Secondes" },
    /** État « jour J » (BRIEF §7) */
    todayLabel: "C'est aujourd'hui",
    /** État « après » (BRIEF §7) */
    afterTitle: "Merci d'avoir partagé ce jour avec nous",
  },

  invitation: {
    title: "Nous nous disons Oui",
    // PROPOSITION
    text: "Adama & Aïcha ont la joie de vous inviter à célébrer leur union le jeudi 24 décembre 2026.",
    pending: "Horaire et lieu communiqués prochainement.",
    labels: {
      time: "Heure",
      place: "Lieu",
      address: "Adresse",
      dressCode: "Dress code",
      directions: "Itinéraire",
      addToCalendar: "Ajouter au calendrier",
    },
  },

  /**
   * Événements, dans l'ordre d'affichage (ne pas supposer que la mosquée passe avant la mairie).
   * Tant que `time` ou `place` vaut null, la carte affiche le texte d'attente.
   * Le bouton calendrier n'apparaît que lorsque `time` ET `place` sont renseignés ;
   * le bouton Itinéraire, lorsque `mapsUrl` est renseigné.
   */
  events: [
    {
      id: "mosquee",
      type: "religieux",
      enabled: true,
      title: "Cérémonie religieuse",
      time: null, // TODO_MARIES — ex. "08:00"
      endTime: null,
      place: null, // TODO_MARIES
      address: null, // TODO_MARIES
      mapsUrl: null, // TODO_MARIES
      dressCode: null, // TODO_MARIES
      icon: "mosque",
    },
    {
      id: "mairie",
      type: "civil",
      enabled: true,
      title: "Mariage civil",
      time: null, // TODO_MARIES
      endTime: null,
      place: null, // TODO_MARIES — « Mairie de … »
      address: null, // TODO_MARIES
      mapsUrl: null, // TODO_MARIES
      dressCode: null, // TODO_MARIES
      icon: "landmark",
    },
    {
      // Réception à confirmer : passer `enabled` à true quand elle est fixée
      id: "reception",
      type: "reception",
      enabled: false,
      title: "Réception",
      time: null, // TODO_MARIES
      endTime: null,
      place: null, // TODO_MARIES
      address: null, // TODO_MARIES
      mapsUrl: null, // TODO_MARIES
      dressCode: null, // TODO_MARIES
      icon: "utensils",
    },
  ] as WeddingEvent[],

  /** Bandeau dress code global : masqué tant qu'il vaut null. TODO_MARIES */
  dressCode: null as { label: string; value: string } | null, // ex. { label: "Dress code", value: "…" }

  programme: {
    title: "Programme de la journée",
    // TODO_MARIES — ex. { time: "08:00", label: "Cérémonie religieuse", icon: "mosque" }
    steps: [] as ProgrammeStep[],
    pending: "Le programme détaillé sera dévoilé très bientôt.",
    // PROPOSITION (optionnelle) — mettre null pour la masquer
    closing: "Qu'Allah bénisse notre union et qu'Il vous comble de bienfaits." as string | null,
    nowLabel: "En cours",
  },

  rsvp: {
    title: "Confirmation de présence",
    // TODO_MARIES — date limite (PROPOSITION : 8 décembre 2026). À modifier aussi dans `deadlineDefault`.
    text: "Nous vous serions reconnaissants de confirmer votre présence avant le 8 décembre 2026.",
    /** Valeur par défaut si la variable d'environnement RSVP_DEADLINE est absente */
    deadlineDefault: "2026-12-08T23:59:00Z",
    success: "Merci ! Nous avons hâte de célébrer ce jour avec vous.",
    closed: "Les confirmations sont désormais closes. Merci à tous ceux qui ont répondu.",
    maxGuests: 5, // TODO_MARIES — nombre max. de personnes par réponse
    contacts: [] as Contact[], // TODO_MARIES — { name: "…", whatsapp: "225…" }
    contactsTitle: "Contacts",
    whatsappLabel: "WhatsApp",
    form: {
      name: "Nom complet",
      phone: "Téléphone (WhatsApp)",
      attending: "Serez-vous présent(e) ?",
      attendingYes: "Oui",
      attendingNo: "Non",
      guests: "Nombre de personnes",
      events: "Vous serez présent(e) à",
      message: "Message aux mariés",
      optional: "facultatif",
      submit: "Envoyer ma réponse",
      submitting: "Envoi en cours…",
      error: "Une erreur est survenue. Merci de réessayer.",
      rateLimited: "Trop de tentatives. Merci de réessayer dans quelques minutes.",
      errors: {
        name: "Merci d'indiquer votre nom complet.",
        phone: "Merci d'indiquer un numéro de téléphone valide.",
        attending: "Merci d'indiquer si vous serez présent(e).",
        guests: "Nombre de personnes invalide.",
        events: "Merci de choisir au moins un moment.",
        message: "Votre message est trop long (1 000 caractères maximum).",
      },
    },
  },

  footer: {
    monogram: "A&A",
    names: "Adama & Aïcha",
    date: "24.12.2026",
  },

  admin: {
    title: "Réponses RSVP",
    loginTitle: "Espace des mariés",
    password: "Mot de passe",
    login: "Se connecter",
    logout: "Se déconnecter",
    wrongPassword: "Mot de passe incorrect.",
    notConfigured: "La variable ADMIN_PASSWORD n'est pas configurée sur Vercel.",
    dbError: "Impossible de lire la base de données. Vérifiez DATABASE_URL.",
    search: "Rechercher un nom ou un téléphone",
    searchButton: "Rechercher",
    export: "Export CSV",
    totals: { yes: "Oui", no: "Non", people: "Personnes attendues" },
    columns: {
      name: "Nom",
      phone: "Téléphone",
      attending: "Présence",
      guests: "Personnes",
      events: "Moments",
      message: "Message",
      date: "Date",
    },
    empty: "Aucune réponse pour le moment.",
  },

  /* ---------------------------------------------------------------- */
  /* Sections optionnelles — masquées tant qu'elles sont vides         */
  /* ---------------------------------------------------------------- */

  story: {
    enabled: false,
    title: "Notre histoire",
    paragraphs: [] as string[], // TODO_MARIES
  },

  gallery: {
    enabled: true,
    title: "Galerie",
    close: "Fermer",
    previous: "Photo précédente",
    next: "Photo suivante",
  },

  gifts: {
    enabled: false,
    title: "Liste de cadeaux",
    intro: "", // TODO_MARIES
    items: [] as { title: string; description?: string; url?: string; linkLabel?: string }[], // TODO_MARIES
  },

  faq: {
    enabled: false,
    title: "FAQ",
    items: [] as { question: string; answer: string }[], // TODO_MARIES
  },

  /* ---------------------------------------------------------------- */
  /* Photos — à renseigner APRÈS la mise en ligne (voir README)        */
  /* ---------------------------------------------------------------- */

  media: {
    hero: { src: "/images/couple-studio-debout.webp", alt: "Adama et Aïcha en tenues traditionnelles violettes, en studio", width: 863, height: 1080, archOffset: 18,
      blurDataURL: "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAABQAgCdASoNABAAA4BaJYgCw7YwTmp6zlvRmYAA/uc/eFdqqt12QZ5SuBOBYcFQcaet9Q4F5zjBqMWaKnmJcqc7XACaySCu4bJ7ZUt8Q2CLNymeXvTLBBjtp9k5xwAA" } as SiteImage | null,
    story: null as SiteImage | null,
    gallery: [
      { src: "/images/couple-studio-mains.webp", alt: "Adama et Aïcha assis main dans la main, en tenues violettes", width: 1080, height: 719,
      blurDataURL: "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAAAQAgCdASoQAAsAA4BaJZACdAD1kvbW47kgAP7e5uoFRSYojiUkXFG6YVXHrGKF5T1Hz/eZgduAA+a7YhCdVDcuEosQmEYtxGbUpLHfFJdpZwTy5inOyPqqugAAAA==" },
      { src: "/images/couple-plage.webp", alt: "Adama et Aïcha enlacés au bord de la mer", width: 810, height: 1080,
      blurDataURL: "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAADwAQCdASoMABAAA4BaJQBOgCLOBZTRyQAA/uq7HvxDl9pDFtqe65/3ETvLlpcJDHHZUh6Mt/OaTCM4kR+kPCLRsr/Y7Z9I38z0LSFuOdBn/ckZulkcVR+WKI3K0jQA" },
      { src: "/images/couple-studio-debout.webp", alt: "Adama et Aïcha en tenues traditionnelles violettes, en studio", width: 863, height: 1080,
      blurDataURL: "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAABQAgCdASoNABAAA4BaJYgCw7YwTmp6zlvRmYAA/uc/eFdqqt12QZ5SuBOBYcFQcaet9Q4F5zjBqMWaKnmJcqc7XACaySCu4bJ7ZUt8Q2CLNymeXvTLBBjtp9k5xwAA" },
    ] as SiteImage[],
    ogImage: null as SiteImage | null, // sinon image générée avec le monogramme
  },
};

export type Site = typeof site;
