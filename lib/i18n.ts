/**
 * i18n dictionaries — extracted VERBATIM from the original
 * medusa-deploy-perfect/index.html. Content is LOCKED: do not rephrase.
 * 4 public languages (IT/EN/DE/FR) + ES kept as in the original source.
 */
import type { Lang } from './constants';
import type { WineSectionKey } from './menu-data';

export interface SiteDict {
  nav: { stabilimento: string; ristorante: string; menu: string; vini: string; cocktail: string; meteo: string; contatti: string };
  splash: { picker: string };
  home: {
    scrollHint: string;
    pickKicker: string;
    pickTitle: string;
    ristorante: string;
    stabilimento: string;
    ristoranteSub: string;
    stabilimentoSub: string;
    chanelQuote: string;
    scrollKicker: string;
    scrollTitle: string;
    scrollHeadline: string;
  };
  stab: {
    kicker: string; title: string; heroSub: string;
    welcomeKicker: string; welcomeTitle: string; welcomeText: string;
    services: [string, string][];
    photos: string[];
    ctaKicker: string; ctaTitle: string; ctaText: string; ctaBtn: string;
  };
  rist: {
    kicker: string; title: string; heroSub: string;
    philKicker: string; philTitle: string; philText: string;
    tastingKicker: string; tastingTitle: string; tastingText: string;
    tastingCourse5: string; tastingCourse8: string;
    photos: string[];
    btnMenu: string; btnVini: string; btnBook: string;
    teamKicker: string; teamTitle: string;
  };
  menu: { kicker: string; title: string; intro?: string; quote: string; quoteAuthor: string; footer: string };
  vini: { kicker: string; title: string; subtitle: string; sections: Record<WineSectionKey, string> };
  meteo: {
    kicker: string; title: string; subtitle: string;
    loading: string; errorText: string; retry: string; nowKicker: string;
    feelsLike: string; wind: string; humidity: string;
    next6: string; tomorrow: string; footer: string;
    days: string[];
    conditions: {
      clear: string; partlyCloudy: string; fog: string; drizzle: string;
      rain: string; snow: string; showers: string; snowShowers: string; thunder: string;
    };
    moods: {
      beach: string; terrace: string; sunset: string; intimate: string;
      indoor: string; snow: string; sea: string;
    };
  };
  contatti: { kicker: string; title: string; labels: string[]; values: string[]; cta: string };
}

export const I18N: Record<Lang, SiteDict> = {
  it: {
    nav: { stabilimento: "Beach Club", ristorante: "Ristorante", menu: "Menu", vini: "Carta Vini", cocktail: "Cocktail", meteo: "Meteo", contatti: "Contatti" },
    splash: { picker: "Scegli la tua lingua · Choose your language" },
    home: {
      scrollHint: "Scorri in su",
      pickKicker: "Benvenuti al Medusa",
      pickTitle: "Dove vuoi iniziare?",
      ristorante: "Ristorante",
      stabilimento: "Beach Club",
      ristoranteSub: "Cucina di Mare · Crudo · Vini",
      stabilimentoSub: "Mare · Sole · Aperitivi",
      chanelQuote: "Il buon gusto nel vestire è qualcosa di innato, come la sensibilità del palato",
      scrollKicker: "Cinema d'Estate",
      scrollTitle: "Scopri",
      scrollHeadline: "Medusa"
    },
    stab: {
      kicker: "Mare e Sole", title: "BEACH CLUB",
      heroSub: "Una giornata sospesa tra mare e scogli, a Nervi",
      welcomeKicker: "Benvenuti", welcomeTitle: "UN ANGOLO DI LIGURIA",
      welcomeText: "Sulla Passeggiata Anita Garibaldi, dove gli scogli incontrano il mare, Medusa è il rifugio dove le giornate scorrono al ritmo delle onde. Un sorso di Vermentino, il sole sulla pelle, e il tempo che si ferma.",
      services: [
        ["Ombrelloni & Lettini", "Postazioni curate con ombrellone, due lettini e cassaforte privata."],
        ["Bar & Aperitivo", "Cocktail, vini al calice e taglieri serviti in spiaggia, dalle 10 alle 19."],
        ["Sport & Attività", "SUP, kayak, beach volley. Lezioni di yoga al mattino, ogni mercoledì."],
        ["Doccia & Servizi", "Cabine private, docce calde, deposito borse, Wi-Fi gratuito."]
      ],
      photos: ["La Passeggiata", "Tramonto", "Solarium"],
      ctaKicker: "Prenotazioni", ctaTitle: "PRENOTA LA TUA POSTAZIONE",
      ctaText: "Le postazioni si esauriscono presto, soprattutto nei weekend. Prenota in anticipo per assicurarti il tuo posto al sole.",
      ctaBtn: "bagnimedusanervi@gmail.com"
    },
    rist: {
      kicker: "Cucina di Mare", title: "RISTORANTE",
      heroSub: "Heaven is a place on earth",
      philKicker: "La Filosofia", philTitle: "IL MARE NEL PIATTO",
      philText: "Pescato del giorno, ingredienti del territorio ligure, tecnica essenziale. La nostra cucina nasce dalla tradizione e si reinventa nel crudo, nelle focacce, nelle paste fatte in casa. Una proposta diretta, senza fronzoli, dove il prodotto è protagonista.",
      tastingKicker: "Esperienza Esclusiva", tastingTitle: "MENÙ DEGUSTAZIONE AL BUIO",
      tastingText: "Un percorso di portate a sorpresa scelte dallo chef, per comprendere la filosofia della nostra cucina.",
      tastingCourse5: "5 portate", tastingCourse8: "8 portate",
      photos: ["Atmosfera", "Scampi", "La Carta"],
      btnMenu: "Consulta il Menù", btnVini: "Carta dei Vini", btnBook: "Prenota un Tavolo",
      teamKicker: "Chi Siamo", teamTitle: "La Brigata"
    },
    menu: {
      kicker: "La Carta", title: "MENÙ",
      quote: '"Il buon gusto nel vestire è qualcosa di innato, come la sensibilità del palato"',
      quoteAuthor: "— Coco Chanel",
      footer: "✦ Best seller · Tutti i prodotti serviti crudi vengono abbattuti rispettando la normativa. In caso di mancanza del prodotto fresco verrà utilizzato un prodotto abbattuto di primissima qualità."
    },
    vini: {
      kicker: "La Cantina", title: "CARTA VINI",
      subtitle: "Una selezione che racconta territori, dalle bollicine ai grandi rossi",
      sections: {
        charmat: "Bollicine Charmat", metodo: "Bollicine Metodo Classico", champagne: "Champagne",
        rosati: "Vini Rosati", bianchi: "Vini Bianchi", rossi: "Vini Rossi"
      }
    },
    meteo: {
      kicker: "Previsioni", title: "METEO NERVI",
      subtitle: "Il tempo a Medusa, in tempo reale",
      loading: "Caricamento previsioni...", errorText: "Impossibile caricare le previsioni in questo momento.",
      retry: "Riprova", nowKicker: "Adesso a Nervi",
      feelsLike: "Percepiti", wind: "Vento", humidity: "Umidità",
      next6: "Prossimi 6 giorni", tomorrow: "Domani",
      footer: "Dati: Open-Meteo · Aggiornati ogni ora",
      days: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
      conditions: {
        clear: "Sereno", partlyCloudy: "Poco nuvoloso", fog: "Nebbia", drizzle: "Pioviggine",
        rain: "Pioggia", snow: "Neve", showers: "Rovesci", snowShowers: "Rovesci di neve", thunder: "Temporale"
      },
      moods: {
        beach: "Giornata perfetta per spiaggia e tuffi",
        terrace: "Tempo ideale per pranzo in terrazza",
        sunset: "Aperitivo al tramonto consigliato",
        intimate: "Atmosfera intima, ristorante aperto",
        indoor: "Meglio una cena al coperto stasera",
        snow: "Neve sulla riviera, evento raro",
        sea: "Il mare resta sempre bello"
      }
    },
    contatti: {
      kicker: "Vieni a Trovarci", title: "CONTATTI",
      labels: ["Indirizzo", "Telefono", "Orari", "Email"],
      values: ["Passeggiata Anita Garibaldi, 27/A\n16167 Genova - Nervi", "+39 010 372 8113", "Lun – Dom\n08:00 – 24:00", "bagnimedusa.bmr@gmail.com"],
      cta: "Chiama per Prenotare"
    }
  },
  en: {
    nav: { stabilimento: "Beach Club", ristorante: "Restaurant", menu: "Menu", vini: "Wine List", cocktail: "Cocktails", meteo: "Weather", contatti: "Contact" },
    splash: { picker: "Scegli la tua lingua · Choose your language" },
    home: {
      scrollHint: "Swipe up",
      pickKicker: "Welcome to Medusa",
      pickTitle: "Where would you like to begin?",
      chanelQuote: "Good taste in dressing is something innate, like the sensitivity of the palate",
      scrollKicker: "A Summer Reel",
      scrollTitle: "Discover",
      scrollHeadline: "Medusa",
      ristorante: "Restaurant",
      stabilimento: "Beach Club",
      ristoranteSub: "Seafood · Raw · Wines",
      stabilimentoSub: "Sea · Sun · Aperitifs"
    },
    stab: {
      kicker: "Sea & Sun", title: "BEACH CLUB",
      heroSub: "A day suspended between sea and rocks, in Nervi",
      welcomeKicker: "Welcome", welcomeTitle: "A CORNER OF LIGURIA",
      welcomeText: "On the Passeggiata Anita Garibaldi, where the rocks meet the sea, Medusa is the refuge where days flow to the rhythm of the waves. A sip of Vermentino, the sun on your skin, and time stands still.",
      services: [
        ["Umbrellas & Sunbeds", "Curated spots with umbrella, two sunbeds and private safe."],
        ["Bar & Aperitif", "Cocktails, wines by the glass and platters served on the beach, 10am to 7pm."],
        ["Sports & Activities", "SUP, kayak, beach volleyball. Morning yoga classes, every Wednesday."],
        ["Shower & Services", "Private cabins, hot showers, bag storage, free Wi-Fi."]
      ],
      photos: ["The Promenade", "Sunset", "Solarium"],
      ctaKicker: "Reservations", ctaTitle: "BOOK YOUR SPOT",
      ctaText: "Spots fill up quickly, especially on weekends. Book in advance to secure your place in the sun.",
      ctaBtn: "bagnimedusanervi@gmail.com"
    },
    rist: {
      kicker: "Seafood Cuisine", title: "RESTAURANT",
      heroSub: "Heaven is a place on earth",
      philKicker: "Our Philosophy", philTitle: "THE SEA ON YOUR PLATE",
      philText: "Catch of the day, ingredients from the Ligurian territory, essential technique. Our cuisine is born from tradition and reinvents itself in raw fish, focaccia, and homemade pasta. A direct proposal, no frills, where the product is the star.",
      tastingKicker: "Exclusive Experience", tastingTitle: "BLIND TASTING MENU",
      tastingText: "A surprise course journey chosen by our chef, to understand the philosophy of our cuisine.",
      tastingCourse5: "5 courses", tastingCourse8: "8 courses",
      photos: ["Atmosphere", "Scampi", "The Menu"],
      btnMenu: "View Menu", btnVini: "Wine List", btnBook: "Book a Table",
      teamKicker: "Behind the Stove", teamTitle: "The Brigade"
    },
    menu: {
      kicker: "Our Philosophy", title: "THE SEA ON YOUR PLATE",
      intro: "Catch of the day, ingredients from the Ligurian hinterland, essential craftsmanship. Our cuisine is born from tradition and reinvents itself – with raw fish, focaccia and homemade pasta.",
      quote: '"Good taste in dressing is something innate, like the sensitivity of the palate."',
      quoteAuthor: "— Coco Chanel",
      footer: "✦ Best seller · All raw products are blast-frozen in compliance with regulations. If fresh product is unavailable, a top-quality blast-frozen alternative will be used."
    },
    vini: {
      kicker: "Our Cellar", title: "WINE LIST",
      subtitle: "A selection that tells of territories, from sparkling wines to great reds",
      sections: {
        charmat: "Sparkling — Charmat", metodo: "Sparkling — Classic Method", champagne: "Champagne",
        rosati: "Rosé Wines", bianchi: "White Wines", rossi: "Red Wines"
      }
    },
    meteo: {
      kicker: "Forecast", title: "WEATHER NERVI",
      subtitle: "Live weather at Medusa",
      loading: "Loading forecast...", errorText: "Unable to load the forecast right now.",
      retry: "Retry", nowKicker: "Now in Nervi",
      feelsLike: "Feels like", wind: "Wind", humidity: "Humidity",
      next6: "Next 6 days", tomorrow: "Tomorrow",
      footer: "Data: Open-Meteo · Updated hourly",
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      conditions: {
        clear: "Clear", partlyCloudy: "Partly cloudy", fog: "Fog", drizzle: "Drizzle",
        rain: "Rain", snow: "Snow", showers: "Showers", snowShowers: "Snow showers", thunder: "Thunderstorm"
      },
      moods: {
        beach: "Perfect day for beach and swimming",
        terrace: "Ideal weather for lunch on the terrace",
        sunset: "Sunset aperitif recommended",
        intimate: "Cozy atmosphere, restaurant open",
        indoor: "Better an indoor dinner tonight",
        snow: "Snow on the Riviera, a rare event",
        sea: "The sea is always beautiful"
      }
    },
    contatti: {
      kicker: "Come Visit Us", title: "CONTACT",
      labels: ["Address", "Phone", "Hours", "Email"],
      values: ["Passeggiata Anita Garibaldi, 27/A\n16167 Genova - Nervi, Italy", "+39 010 372 8113", "Mon – Sun\n08:00 – 24:00", "bagnimedusa.bmr@gmail.com"],
      cta: "Call to Book"
    }
  },
  de: {
    nav: { stabilimento: "Strandbad", ristorante: "Restaurant", menu: "Speisekarte", vini: "Weinkarte", cocktail: "Cocktails", meteo: "Wetter", contatti: "Kontakt" },
    splash: { picker: "Wählen Sie Ihre Sprache · Choose your language" },
    home: {
      scrollHint: "Nach oben wischen",
      pickKicker: "Willkommen im Medusa",
      pickTitle: "Wo möchten Sie beginnen?",
      ristorante: "Restaurant",
      stabilimento: "Beach Club",
      ristoranteSub: "Meeresküche · Rohes · Weine",
      stabilimentoSub: "Meer · Sonne · Aperitifs",
      chanelQuote: "Guter Geschmack beim Kleiden ist etwas Angeborenes, wie die Sensibilität des Gaumens",
      scrollKicker: "Ein Sommerfilm",
      scrollTitle: "Entdecken Sie",
      scrollHeadline: "Medusa"
    },
    stab: {
      kicker: "Meer und Sonne", title: "STRANDBAD",
      heroSub: "Ein Tag zwischen Meer und Felsen, in Nervi",
      welcomeKicker: "Willkommen", welcomeTitle: "EIN STÜCK LIGURIEN",
      welcomeText: "An der Passeggiata Anita Garibaldi, wo die Felsen das Meer treffen, ist Medusa der Ort, an dem die Tage im Rhythmus der Wellen vergehen. Ein Schluck Vermentino, die Sonne auf der Haut, und die Zeit steht still.",
      services: [
        ["Sonnenschirme & Liegen", "Gepflegte Plätze mit Schirm, zwei Liegen und Privatsafe."],
        ["Bar & Aperitif", "Cocktails, Weine im Glas und Brettjausen am Strand, 10 bis 19 Uhr."],
        ["Sport & Aktivitäten", "SUP, Kajak, Beachvolleyball. Morgen-Yoga jeden Mittwoch."],
        ["Dusche & Service", "Privatkabinen, Warmduschen, Gepäckaufbewahrung, kostenloses WLAN."]
      ],
      photos: ["Die Promenade", "Sonnenuntergang", "Solarium"],
      ctaKicker: "Reservierung", ctaTitle: "RESERVIEREN SIE IHREN PLATZ",
      ctaText: "Die Plätze sind schnell ausgebucht, besonders am Wochenende. Reservieren Sie früh, um Ihren Platz an der Sonne zu sichern.",
      ctaBtn: "bagnimedusanervi@gmail.com"
    },
    rist: {
      kicker: "Meeresküche", title: "RESTAURANT",
      heroSub: "Heaven is a place on earth",
      philKicker: "Unsere Philosophie", philTitle: "DAS MEER AUF DEM TELLER",
      philText: "Tagesfang, Zutaten aus Ligurien, essenzielle Technik. Unsere Küche entsteht aus Tradition und erfindet sich neu im Rohfisch, in der Focaccia, in handgemachten Nudeln. Ein direktes Angebot, ohne Schnörkel, bei dem das Produkt im Mittelpunkt steht.",
      tastingKicker: "Exklusives Erlebnis", tastingTitle: "BLIND-VERKOSTUNGSMENÜ",
      tastingText: "Ein Überraschungsmenü vom Chef ausgewählt, um die Philosophie unserer Küche zu erfahren.",
      tastingCourse5: "5 Gänge", tastingCourse8: "8 Gänge",
      photos: ["Atmosphäre", "Scampi", "Die Karte"],
      btnMenu: "Speisekarte ansehen", btnVini: "Weinkarte", btnBook: "Tisch reservieren",
      teamKicker: "Hinter dem Herd", teamTitle: "Die Brigade"
    },
    menu: {
      kicker: "Unsere Philosophie", title: "DAS MEER AUF IHREM TELLER",
      intro: "Fang des Tages, Zutaten aus dem ligurischen Hinterland, essentielle Handwerkskunst. Unsere Küche entsteht aus der Tradition und erfindet sich neu – mit rohem Fisch, Focaccia und hausgemachter Pasta.",
      quote: '"Guter Geschmack beim Kleiden ist etwas Angeborenes, wie die Sensibilität des Gaumens."',
      quoteAuthor: "— Coco Chanel",
      footer: "✦ Bestseller · Alle rohen Produkte werden gemäß den Vorschriften schockgefroren. Bei Mangel an frischen Produkten wird ein hochwertiges schockgefrorenes Alternativprodukt verwendet."
    },
    vini: {
      kicker: "Unser Weinkeller", title: "WEINKARTE",
      subtitle: "Eine Auswahl, die von Regionen erzählt, von Schaumweinen bis zu großen Roten",
      sections: {
        charmat: "Schaumweine — Charmat", metodo: "Schaumweine — Traditionelle Methode", champagne: "Champagne",
        rosati: "Roséweine", bianchi: "Weißweine", rossi: "Rotweine"
      }
    },
    meteo: {
      kicker: "Vorhersage", title: "WETTER NERVI",
      subtitle: "Live-Wetter bei Medusa",
      loading: "Vorhersage wird geladen...", errorText: "Vorhersage kann derzeit nicht geladen werden.",
      retry: "Erneut versuchen", nowKicker: "Jetzt in Nervi",
      feelsLike: "Gefühlt", wind: "Wind", humidity: "Luftfeuchtigkeit",
      next6: "Nächste 6 Tage", tomorrow: "Morgen",
      footer: "Daten: Open-Meteo · Stündlich aktualisiert",
      days: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
      conditions: {
        clear: "Klar", partlyCloudy: "Leicht bewölkt", fog: "Nebel", drizzle: "Nieselregen",
        rain: "Regen", snow: "Schnee", showers: "Schauer", snowShowers: "Schneeschauer", thunder: "Gewitter"
      },
      moods: {
        beach: "Perfekter Tag für Strand und Schwimmen",
        terrace: "Ideales Wetter für Mittagessen auf der Terrasse",
        sunset: "Sundowner-Aperitif empfohlen",
        intimate: "Gemütliche Atmosphäre, Restaurant geöffnet",
        indoor: "Heute besser ein Abendessen drinnen",
        snow: "Schnee an der Riviera, ein seltenes Ereignis",
        sea: "Das Meer ist immer schön"
      }
    },
    contatti: {
      kicker: "Besuchen Sie uns", title: "KONTAKT",
      labels: ["Adresse", "Telefon", "Öffnungszeiten", "E-Mail"],
      values: ["Passeggiata Anita Garibaldi, 27/A\n16167 Genua - Nervi, Italien", "+39 010 372 8113", "Mo – So\n08:00 – 24:00", "bagnimedusa.bmr@gmail.com"],
      cta: "Anrufen zum Reservieren"
    }
  },
  fr: {
    nav: { stabilimento: "Plage", ristorante: "Restaurant", menu: "Carte", vini: "Carte des Vins", cocktail: "Cocktails", meteo: "Météo", contatti: "Contact" },
    splash: { picker: "Choisissez votre langue · Choose your language" },
    home: {
      scrollHint: "Glissez vers le haut",
      pickKicker: "Bienvenue au Medusa",
      pickTitle: "Où souhaitez-vous commencer?",
      ristorante: "Restaurant",
      stabilimento: "Beach Club",
      ristoranteSub: "Cuisine de mer · Crus · Vins",
      stabilimentoSub: "Mer · Soleil · Apéritifs",
      chanelQuote: "Le bon goût dans la façon de s'habiller est quelque chose d'inné, comme la sensibilité du palais",
      scrollKicker: "Une Bobine d'Été",
      scrollTitle: "Découvrez",
      scrollHeadline: "Medusa"
    },
    stab: {
      kicker: "Mer et Soleil", title: "PLAGE PRIVÉE",
      heroSub: "Une journée suspendue entre mer et rochers, à Nervi",
      welcomeKicker: "Bienvenue", welcomeTitle: "UN COIN DE LIGURIE",
      welcomeText: "Sur la Passeggiata Anita Garibaldi, où les rochers rencontrent la mer, Medusa est le refuge où les journées s'écoulent au rythme des vagues. Une gorgée de Vermentino, le soleil sur la peau, et le temps s'arrête.",
      services: [
        ["Parasols & Transats", "Emplacements soignés avec parasol, deux transats et coffre privé."],
        ["Bar & Apéritif", "Cocktails, vins au verre et planches servis sur la plage, de 10h à 19h."],
        ["Sport & Activités", "SUP, kayak, beach-volley. Cours de yoga le matin, tous les mercredis."],
        ["Douche & Services", "Cabines privées, douches chaudes, consigne, Wi-Fi gratuit."]
      ],
      photos: ["La Promenade", "Coucher de soleil", "Solarium"],
      ctaKicker: "Réservations", ctaTitle: "RÉSERVEZ VOTRE PLACE",
      ctaText: "Les places partent vite, surtout le week-end. Réservez à l'avance pour vous assurer votre place au soleil.",
      ctaBtn: "bagnimedusanervi@gmail.com"
    },
    rist: {
      kicker: "Cuisine de la Mer", title: "RESTAURANT",
      heroSub: "Heaven is a place on earth",
      philKicker: "Notre Philosophie", philTitle: "LA MER DANS L'ASSIETTE",
      philText: "Pêche du jour, ingrédients du territoire ligure, technique essentielle. Notre cuisine naît de la tradition et se réinvente dans le cru, dans les focaccias, dans les pâtes maison. Une proposition directe, sans fioritures, où le produit est la vedette.",
      tastingKicker: "Expérience Exclusive", tastingTitle: "MENU DÉGUSTATION À L'AVEUGLE",
      tastingText: "Un parcours de plats surprise choisis par notre chef, pour comprendre la philosophie de notre cuisine.",
      tastingCourse5: "5 plats", tastingCourse8: "8 plats",
      photos: ["Ambiance", "Scampi", "La Carte"],
      btnMenu: "Voir le Menu", btnVini: "Carte des Vins", btnBook: "Réserver une Table",
      teamKicker: "Derrière les Fourneaux", teamTitle: "La Brigade"
    },
    menu: {
      kicker: "La Carte", title: "MENU",
      quote: "« Le bon goût dans l'habillement est quelque chose d'inné, comme la sensibilité du palais »",
      quoteAuthor: "— Coco Chanel",
      footer: "✦ Best-seller · Tous les produits crus sont surgelés conformément à la réglementation. En cas d'indisponibilité du produit frais, un produit surgelé de très haute qualité sera utilisé."
    },
    vini: {
      kicker: "Notre Cave", title: "CARTE DES VINS",
      subtitle: "Une sélection qui raconte des territoires, des bulles aux grands rouges",
      sections: {
        charmat: "Pétillants — Charmat", metodo: "Pétillants — Méthode Traditionnelle", champagne: "Champagne",
        rosati: "Vins Rosés", bianchi: "Vins Blancs", rossi: "Vins Rouges"
      }
    },
    meteo: {
      kicker: "Prévisions", title: "MÉTÉO NERVI",
      subtitle: "La météo à Medusa, en temps réel",
      loading: "Chargement des prévisions...", errorText: "Impossible de charger les prévisions pour le moment.",
      retry: "Réessayer", nowKicker: "Maintenant à Nervi",
      feelsLike: "Ressenti", wind: "Vent", humidity: "Humidité",
      next6: "6 Prochains jours", tomorrow: "Demain",
      footer: "Données : Open-Meteo · Mises à jour toutes les heures",
      days: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
      conditions: {
        clear: "Ciel clair", partlyCloudy: "Peu nuageux", fog: "Brouillard", drizzle: "Bruine",
        rain: "Pluie", snow: "Neige", showers: "Averses", snowShowers: "Averses de neige", thunder: "Orage"
      },
      moods: {
        beach: "Journée parfaite pour la plage et la baignade",
        terrace: "Temps idéal pour déjeuner en terrasse",
        sunset: "Apéro au coucher de soleil recommandé",
        intimate: "Atmosphère intime, restaurant ouvert",
        indoor: "Mieux vaut un dîner à l'intérieur ce soir",
        snow: "Neige sur la Riviera, un événement rare",
        sea: "La mer reste toujours belle"
      }
    },
    contatti: {
      kicker: "Venez nous voir", title: "CONTACT",
      labels: ["Adresse", "Téléphone", "Horaires", "Email"],
      values: ["Passeggiata Anita Garibaldi, 27/A\n16167 Gênes - Nervi, Italie", "+39 010 372 8113", "Lun – Dim\n08:00 – 24:00", "bagnimedusa.bmr@gmail.com"],
      cta: "Appeler pour Réserver"
    }
  },
  es: {
    nav: { stabilimento: "Beach Club", ristorante: "Restaurante", menu: "Carta", vini: "Carta de Vinos", cocktail: "Cócteles", meteo: "Clima", contatti: "Contacto" },
    splash: { picker: "Elige tu idioma · Choose your language" },
    home: {
      scrollHint: "Desliza hacia arriba",
      pickKicker: "Bienvenidos a Medusa",
      pickTitle: "¿Por dónde quieres empezar?",
      ristorante: "Restaurante",
      stabilimento: "Beach Club",
      ristoranteSub: "Cocina del mar · Crudo · Vinos",
      stabilimentoSub: "Mar · Sol · Aperitivos",
      chanelQuote: "El buen gusto en el vestir es algo innato, como la sensibilidad del paladar",
      scrollKicker: "Un Carrete de Verano",
      scrollTitle: "Descubre",
      scrollHeadline: "Medusa"
    },
    stab: {
      kicker: "Mar y Sol", title: "BEACH CLUB",
      heroSub: "Un día suspendido entre mar y rocas, en Nervi",
      welcomeKicker: "Bienvenidos", welcomeTitle: "UN RINCÓN DE LIGURIA",
      welcomeText: "En la Passeggiata Anita Garibaldi, donde las rocas se encuentran con el mar, Medusa es el refugio donde los días fluyen al ritmo de las olas. Un sorbo de Vermentino, el sol en la piel, y el tiempo se detiene.",
      services: [
        ["Sombrillas y Tumbonas", "Plazas cuidadas con sombrilla, dos tumbonas y caja fuerte privada."],
        ["Bar y Aperitivo", "Cócteles, vinos por copa y tablas servidas en la playa, de 10 a 19h."],
        ["Deporte y Actividades", "SUP, kayak, vóley playa. Clases de yoga por la mañana, cada miércoles."],
        ["Ducha y Servicios", "Cabinas privadas, duchas calientes, consigna, Wi-Fi gratis."]
      ],
      photos: ["El Paseo", "Atardecer", "Solárium"],
      ctaKicker: "Reservas", ctaTitle: "RESERVA TU PLAZA",
      ctaText: "Las plazas se agotan rápido, sobre todo los fines de semana. Reserva con antelación para asegurar tu lugar bajo el sol.",
      ctaBtn: "bagnimedusanervi@gmail.com"
    },
    rist: {
      kicker: "Cocina del Mar", title: "RESTAURANTE",
      heroSub: "Heaven is a place on earth",
      philKicker: "La Filosofía", philTitle: "EL MAR EN EL PLATO",
      philText: "Pescado del día, ingredientes del territorio ligur, técnica esencial. Nuestra cocina nace de la tradición y se reinventa en el crudo, en las focaccias, en las pastas caseras. Una propuesta directa, sin adornos, donde el producto es el protagonista.",
      tastingKicker: "Experiencia Exclusiva", tastingTitle: "MENÚ DEGUSTACIÓN A CIEGAS",
      tastingText: "Un recorrido de platos sorpresa elegidos por nuestro chef, para entender la filosofía de nuestra cocina.",
      tastingCourse5: "5 platos", tastingCourse8: "8 platos",
      photos: ["Ambiente", "Scampi", "La Carta"],
      btnMenu: "Ver la Carta", btnVini: "Carta de Vinos", btnBook: "Reservar Mesa",
      teamKicker: "Detrás de los Fogones", teamTitle: "La Brigata"
    },
    menu: {
      kicker: "La Carta", title: "CARTA",
      quote: '"El buen gusto en el vestir es algo innato, como la sensibilidad del paladar"',
      quoteAuthor: "— Coco Chanel",
      footer: "✦ Más vendido · Todos los productos servidos crudos se ultracongelan respetando la normativa. En caso de falta del producto fresco, se utilizará un producto ultracongelado de primera calidad."
    },
    vini: {
      kicker: "Nuestra Bodega", title: "CARTA DE VINOS",
      subtitle: "Una selección que cuenta territorios, desde los espumosos hasta los grandes tintos",
      sections: {
        charmat: "Espumosos — Charmat", metodo: "Espumosos — Método Tradicional", champagne: "Champagne",
        rosati: "Vinos Rosados", bianchi: "Vinos Blancos", rossi: "Vinos Tintos"
      }
    },
    meteo: {
      kicker: "Pronóstico", title: "CLIMA NERVI",
      subtitle: "El tiempo en Medusa, en tiempo real",
      loading: "Cargando pronóstico...", errorText: "No se puede cargar el pronóstico en este momento.",
      retry: "Reintentar", nowKicker: "Ahora en Nervi",
      feelsLike: "Sensación", wind: "Viento", humidity: "Humedad",
      next6: "Próximos 6 días", tomorrow: "Mañana",
      footer: "Datos: Open-Meteo · Actualizados cada hora",
      days: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
      conditions: {
        clear: "Despejado", partlyCloudy: "Parcialmente nublado", fog: "Niebla", drizzle: "Llovizna",
        rain: "Lluvia", snow: "Nieve", showers: "Chubascos", snowShowers: "Chubascos de nieve", thunder: "Tormenta"
      },
      moods: {
        beach: "Día perfecto para playa y baño",
        terrace: "Tiempo ideal para almorzar en la terraza",
        sunset: "Aperitivo al atardecer recomendado",
        intimate: "Ambiente íntimo, restaurante abierto",
        indoor: "Mejor una cena bajo techo esta noche",
        snow: "Nieve en la Riviera, un evento raro",
        sea: "El mar siempre es hermoso"
      }
    },
    contatti: {
      kicker: "Ven a Vernos", title: "CONTACTO",
      labels: ["Dirección", "Teléfono", "Horario", "Email"],
      values: ["Passeggiata Anita Garibaldi, 27/A\n16167 Génova - Nervi, Italia", "+39 010 372 8113", "Lun – Dom\n08:00 – 24:00", "bagnimedusa.bmr@gmail.com"],
      cta: "Llamar para Reservar"
    }
  }
};
