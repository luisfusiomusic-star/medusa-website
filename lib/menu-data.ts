/**
 * Food menu + wine list — extracted VERBATIM from the original
 * medusa-deploy-perfect/index.html. Content is LOCKED: copy exactly,
 * do not rephrase. (✦ marks best sellers.)
 */
import type { Lang } from './constants';

export interface MenuSection {
  title: string;
  subtitle?: string;
  items: [string, string][];
}

export type WineSectionKey = 'charmat' | 'metodo' | 'champagne' | 'rosati' | 'bianchi' | 'rossi';

export interface WineSection {
  key: WineSectionKey;
  items: [string, string][];
}


export const MENU_DATA: Record<Lang, MenuSection[]> = {
  it: [
    {
      title: "MENÙ DEGUSTAZIONE AL BUIO",
      subtitle: "Un percorso di portate scelte a sorpresa dal nostro chef per farvi coinvolgere dalla filosofia della nostra cucina",
      items: [
        ["5 portate", "60"],
        ["8 portate", "85"]
      ]
    },
    {
      title: "DA CONDIVIDERE",
      subtitle: 'Italian tapas "Sharing is Caring"',
      items: [
        ["✦ La Rapa rossa con caprino, pistacchio & pesto", "9"],
        ["Melanzana al forno con crema al curry & formaggio greco", "9"],
        ["✦ La nostra Caponata di verdure della Nonna", "9"],
        ["Acciughe cantabriche & burro della Normandia", "9"],
        ["✦ Insalata Russa fatta in casa", "9"],
        ["Peperone, melanzana alla Brace & chutney Tropicale", "9"]
      ]
    },
    {
      title: "CRUDO",
      items: [
        ["✦ Gazpacho con gambero crudo", "25"],
        ["Piccolo antipasto crudo di mare", "29"],
        ["Ceviche Porn Star", "19"],
        ["✦ Tiradito di ombrina con estratto di rose", "19"],
        ["Spicy tuna tartar, avocado, jalapeño, tabasco, mela", "20"],
        ["Carpaccio di salmone marinato sotto sale bilanciato", "19"]
      ]
    },
    {
      title: "PER INIZIARE",
      items: [
        ["Calamari al pesto su patate schiacciate", "15"],
        ["Insalata di mare al vapore su crema di ceci & patate", "20"],
        ["✦ Rivisitazione del Cappon Magro", "20"],
        ["✦ Scampi gratinati", "39"],
        ["Carpaccio di pomodori con feta & pesto Genovese", "15"]
      ]
    },
    {
      title: "GRAN CRUDO PREMIUM MEDUSA",
      subtitle: "La nostra selezione iconica di mare, in continua evoluzione secondo il pescato",
      items: [
        ["Minimo per 2 persone", "39"]
      ]
    },
    {
      title: "PRIMI",
      items: [
        ["Gnocchi di patate fatti in casa con totani & moscardini", "19"],
        ["✦ Paella marisco / arroz (Minimo per 2 persone)", "35"],
        ["Fusilloni con crema leggera di Nduja & frutti di mare", "20"],
        ["✦ Couscous con granchio", "25"],
        ["Gnocchi alla Romana con pesto genovese", "15"],
        ["Lasagne alla Bolognese", "15"]
      ]
    },
    {
      title: "SECONDI",
      items: [
        ["✦ Tentacolo su patate & pesto", "19"],
        ["Filetto di pescato del giorno con verdure di stagione", "25"],
        ["Salmone & caponata", "27"],
        ["✦ Maxi crudo di pesce XL", "45"],
        ["Semplicemente Brandacujun", "19"],
        ["Costata di Choco Beef (peso circa 1 kg)", "79"],
        ["Il nostro fritto di mare", "35"]
      ]
    },
    {
      title: "CONTORNI",
      items: [
        ["Verdure di stagione alla brace", "7"],
        ["Patate schiacciate", "7"],
        ["Caviale di melanzane", "7"],
        ["Verza caramellata in agrodolce", "7"]
      ]
    },
    {
      title: "FOCACCE GOURMET",
      items: [
        ["Focaccia al formaggio e pesto", "19"],
        ["Focaccia al formaggio e acciughe", "19"],
        ["Focaccia al formaggio, pomodorini, olive e capperi", "19"]
      ]
    },
    {
      title: "INSALATE",
      subtitle: "small or large",
      items: [
        ["✦ Insalata con polpo", "10 / 15"],
        ["Insalata greca con feta", "10 / 15"],
        ["Insalata con salmone", "10 / 15"],
        ["✦ Insalata con tonno crudo", "10 / 15"]
      ]
    },
    {
      title: "PER CONCLUDERE",
      items: [
        ["✦ Millefoglie con crema Medusa", "9"],
        ["Torta mele sbagliato", "9"],
        ["Torta cioccolato", "9"],
        ["✦ Tiramisù", "9"],
        ["Gelato & croccante di cereali", "9"],
        ["Sorbetto limone & mirto", "9"]
      ]
    }
  ],
  en: [
    {
      title: "TASTING MENU IN THE DARK",
      subtitle: "A surprising journey through several courses, chosen by our chef to immerse you in the philosophy of our kitchen.",
      items: [
        ["5 courses", "60"],
        ["8 courses", "85"]
      ]
    },
    {
      title: "TO SHARE",
      subtitle: 'Italian tapas — Sharing is Caring',
      items: [
        ["✦ Beetroot with goat cheese, pistachio & pesto", "9"],
        ["Baked eggplant with curry cream & Greek cheese", "9"],
        ["✦ Our homemade vegetable caponata", "9"],
        ["Cantabrian anchovies & Normandy butter", "9"],
        ["✦ Homemade Russian salad", "9"],
        ["Grilled bell pepper & eggplant with tropical chutney", "9"]
      ]
    },
    {
      title: "RAW",
      items: [
        ["✦ Gazpacho with raw prawn", "25"],
        ["Raw seafood appetizer of the day", "29"],
        ["Porn Star ceviche", "19"],
        ["✦ Seabass tiradito with rose extract", "19"],
        ["Spicy tuna tartare, avocado, jalapeño, tabasco, apple", "20"],
        ["Salmon carpaccio in balanced salt marinade", "19"]
      ]
    },
    {
      title: "STARTERS",
      items: [
        ["Calamari with pesto on smashed potatoes", "15"],
        ["Steamed seafood salad on chickpea & potato cream", "20"],
        ["✦ Reinterpretation of Cappon Magro", "20"],
        ["✦ Gratinated scampi", "39"],
        ["Tomato carpaccio with feta & Pesto Genovese", "15"]
      ]
    },
    {
      title: "GRAN CRUDO PREMIUM MEDUSA",
      subtitle: "Our iconic selection of seafood, continuously evolving according to the catch",
      items: [
        ["Minimum for 2 people", "39"]
      ]
    },
    {
      title: "FIRST COURSES",
      items: [
        ["Homemade potato gnocchi with flying squid & baby octopus", "19"],
        ["✦ Seafood paella / arroz (Minimum for 2 people)", "35"],
        ["Fusilloni with light 'Nduja cream & seafood", "20"],
        ["✦ Couscous with crab", "25"],
        ["Roman-style gnocchi with Pesto Genovese", "15"],
        ["Lasagne Bolognese", "15"]
      ]
    },
    {
      title: "MAIN COURSES",
      items: [
        ["✦ Octopus tentacle on potatoes & pesto", "19"],
        ["Catch of the day fillet on seasonal vegetables", "25"],
        ["Salmon & caponata", "27"],
        ["✦ XL Medusa raw fish platter", "45"],
        ["Simply Brandacujun", "19"],
        ["Choco Beef steak (approx. 1 kg)", "79"],
        ["Our fried seafood platter", "35"]
      ]
    },
    {
      title: "SIDE DISHES",
      items: [
        ["Grilled seasonal vegetables", "7"],
        ["Smashed potatoes", "7"],
        ["Eggplant caviar", "7"],
        ["Sweet & sour caramelized savoy cabbage", "7"]
      ]
    },
    {
      title: "GOURMET FOCACCIAS",
      items: [
        ["Cheese focaccia with pesto", "19"],
        ["Cheese focaccia with anchovies", "19"],
        ["Cheese focaccia with cherry tomatoes, olives & capers", "19"]
      ]
    },
    {
      title: "SALADS",
      subtitle: "small or large",
      items: [
        ["✦ Octopus salad", "10 / 15"],
        ["Greek salad with feta", "10 / 15"],
        ["Salmon salad", "10 / 15"],
        ["✦ Raw tuna salad", "10 / 15"]
      ]
    },
    {
      title: "TO FINISH",
      items: [
        ["✦ Millefeuille with Medusa cream", "9"],
        ['"Sbagliato" apple cake', "9"],
        ["Chocolate cake", "9"],
        ["✦ Tiramisù", "9"],
        ["Ice cream & crunchy cereal crumble", "9"],
        ["Lemon & myrtle sorbet", "9"]
      ]
    }
  ],
  de: [
    {
      title: "BLINDES VERKOSTUNGSMENÜ",
      subtitle: "Eine überraschende Reise durch mehrere Gänge, ausgewählt von unserem Küchenchef, um Sie in die Philosophie unserer Küche eintauchen zu lassen.",
      items: [
        ["5 Gänge", "60"],
        ["8 Gänge", "85"]
      ]
    },
    {
      title: "ZUM TEILEN",
      subtitle: 'Italian tapas — Sharing is Caring',
      items: [
        ["✦ Rote Bete mit Ziegenkäse, Pistazien & Pesto", "9"],
        ["Ofenaubergine mit Currycreme & griechischem Käse", "9"],
        ["✦ Unsere hausgemachte Gemüse-Caponata", "9"],
        ["Kantabrische Sardellen & Butter aus der Normandie", "9"],
        ["✦ Hausgemachter Russischer Salat", "9"],
        ["Gegrillte Paprika & Aubergine mit tropischem Chutney", "9"]
      ]
    },
    {
      title: "ROHES",
      items: [
        ["✦ Gazpacho mit roher Garnele", "25"],
        ["Rohfisch-Vorspeise des Tages", "29"],
        ["Porn Star Ceviche", "19"],
        ["✦ Seebarsch-Tiradito mit Rosenextrakt", "19"],
        ["Pikantes Thunfischtatar, Avocado, Jalapeño, Tabasco, Apfel", "20"],
        ["Lachscarpaccio in ausgewogener Salzmarinade", "19"]
      ]
    },
    {
      title: "VORSPEISEN",
      items: [
        ["Calamari mit Pesto auf Kartoffelstampf", "15"],
        ["Gedämpfter Meeresfrüchtesalat auf Kichererbsen-Kartoffelcreme", "20"],
        ["✦ Neuinterpretation des Cappon Magro", "20"],
        ["✦ Überbackene Scampi", "39"],
        ["Tomatencarpaccio mit Feta & Pesto Genovese", "15"]
      ]
    },
    {
      title: "GRAN CRUDO PREMIUM MEDUSA",
      subtitle: "Unsere ikonische Meeresfrüchteauswahl, ständig weiterentwickelt je nach Tagesfang",
      items: [
        ["Mindestbestellung für 2 Personen", "39"]
      ]
    },
    {
      title: "ERSTE GÄNGE",
      items: [
        ["Hausgemachte Kartoffelgnocchi mit Tintenfisch & Moscardini", "19"],
        ["✦ Meeresfrüchte-Paella / Arroz (Mindestbestellung für 2 Personen)", "35"],
        ["Fusilloni mit leichter 'Nduja-Creme & Meeresfrüchten", "20"],
        ["✦ Couscous mit Krabbe", "25"],
        ["Römische Gnocchi mit Pesto Genovese", "15"],
        ["Lasagne Bolognese", "15"]
      ]
    },
    {
      title: "HAUPTGÄNGE",
      items: [
        ["✦ Oktopustentakel auf Kartoffeln & Pesto", "19"],
        ["Tagesfang-Filet auf Saisongemüse", "25"],
        ["Lachs & Caponata", "27"],
        ["✦ XL Medusa Rohfischplatte", "45"],
        ["Einfach Brandacujun", "19"],
        ["Choco-Beef-Steak (ca. 1 kg)", "79"],
        ["Unsere gebratenen Meeresfrüchte", "35"]
      ]
    },
    {
      title: "BEILAGEN",
      items: [
        ["Gegrilltes Saisongemüse", "7"],
        ["Gestampfte Kartoffeln", "7"],
        ["Auberginencreme", "7"],
        ["Karamellisierter Wirsing süß-sauer", "7"]
      ]
    },
    {
      title: "GOURMET-FOCACCE",
      items: [
        ["Käsefocaccia mit Pesto", "19"],
        ["Käsefocaccia mit Sardellen", "19"],
        ["Käsefocaccia mit Kirschtomaten, Oliven & Kapern", "19"]
      ]
    },
    {
      title: "SALATE",
      subtitle: "klein oder groß",
      items: [
        ["✦ Oktopussalat", "10 / 15"],
        ["Griechischer Salat mit Feta", "10 / 15"],
        ["Lachssalat", "10 / 15"],
        ["✦ Roher Thunfischsalat", "10 / 15"]
      ]
    },
    {
      title: "ZUM ABSCHLUSS",
      items: [
        ["✦ Millefoglie mit Medusa-Creme", "9"],
        ['Apfelkuchen "Sbagliato"', "9"],
        ["Schokoladentorte", "9"],
        ["✦ Tiramisù", "9"],
        ["Eis & knuspriges Getreidekrokant", "9"],
        ["Zitronen- & Myrtensorbet", "9"]
      ]
    }
  ],
  fr: [
    {
      title: "MENU DÉGUSTATION DANS LE NOIR",
      subtitle: "Un voyage à travers plusieurs plats choisis par notre chef pour vous immerger dans la philosophie de notre cuisine.",
      items: [
        ["5 plats", "60"],
        ["8 plats", "85"]
      ]
    },
    {
      title: "À PARTAGER",
      subtitle: 'Italian tapas — Sharing is Caring',
      items: [
        ["✦ Betterave rouge au chèvre, pistaches & pesto", "9"],
        ["Aubergine au four avec crème de curry & fromage grec", "9"],
        ["✦ Notre caponata maison de légumes", "9"],
        ["Anchois cantabriques & beurre de Normandie", "9"],
        ["✦ Salade russe maison", "9"],
        ["Poivron & aubergine grillés au chutney tropical", "9"]
      ]
    },
    {
      title: "CRUS",
      items: [
        ["✦ Gaspacho avec crevette crue", "25"],
        ["Antipasto de poissons crus du jour", "29"],
        ["Ceviche Porn Star", "19"],
        ["✦ Tiradito de bar avec extrait de rose", "19"],
        ["Tartare de thon épicé, avocat, jalapeño, tabasco, pomme", "20"],
        ["Carpaccio de saumon mariné au sel équilibré", "19"]
      ]
    },
    {
      title: "ENTRÉES",
      items: [
        ["Calamars au pesto sur écrasé de pommes de terre", "15"],
        ["Salade de fruits de mer vapeur sur crème de pois chiches & pommes de terre", "20"],
        ["✦ Réinterprétation du Cappon Magro", "20"],
        ["✦ Langoustines gratinées", "39"],
        ["Carpaccio de tomates avec feta & Pesto Genovese", "15"]
      ]
    },
    {
      title: "GRAN CRUDO PREMIUM MEDUSA",
      subtitle: "Notre sélection iconique de la mer, en constante évolution selon la pêche du jour",
      items: [
        ["Minimum pour 2 personnes", "39"]
      ]
    },
    {
      title: "PREMIERS PLATS",
      items: [
        ["Gnocchi maison aux encornets & moscardins", "19"],
        ["✦ Paella aux fruits de mer / arroz (Minimum pour 2 personnes)", "35"],
        ["Fusilloni à la légère crème de 'Nduja & fruits de mer", "20"],
        ["✦ Couscous au crabe", "25"],
        ["Gnocchi à la romaine avec Pesto Genovese", "15"],
        ["Lasagnes bolognaises", "15"]
      ]
    },
    {
      title: "PLATS PRINCIPAUX",
      items: [
        ["✦ Tentacule de poulpe sur pommes de terre & pesto", "19"],
        ["Filet du jour sur légumes de saison", "25"],
        ["Saumon & caponata", "27"],
        ["✦ Grand plateau de poissons crus XL Medusa", "45"],
        ["Brandacujun tout simplement", "19"],
        ["Côte de Choco Beef (environ 1 kg)", "79"],
        ["Notre friture de fruits de mer", "35"]
      ]
    },
    {
      title: "ACCOMPAGNEMENTS",
      items: [
        ["Légumes de saison grillés", "7"],
        ["Pommes de terre écrasées", "7"],
        ["Caviar d'aubergine", "7"],
        ["Chou de Milan caramélisé aigre-doux", "7"]
      ]
    },
    {
      title: "FOCACCIAS GOURMET",
      items: [
        ["Focaccia au fromage et pesto", "19"],
        ["Focaccia au fromage et anchois", "19"],
        ["Focaccia au fromage, tomates cerises, olives et câpres", "19"]
      ]
    },
    {
      title: "SALADES",
      subtitle: "petite ou grande",
      items: [
        ["✦ Salade de poulpe", "10 / 15"],
        ["Salade grecque avec feta", "10 / 15"],
        ["Salade de saumon", "10 / 15"],
        ["✦ Salade de thon cru", "10 / 15"]
      ]
    },
    {
      title: "POUR FINIR",
      items: [
        ["✦ Millefeuille à la crème Medusa", "9"],
        ['Gâteau aux pommes « Sbagliato »', "9"],
        ["Gâteau au chocolat", "9"],
        ["✦ Tiramisù", "9"],
        ["Glace & crumble de céréales croustillant", "9"],
        ["Sorbet citron & myrte", "9"]
      ]
    }
  ],
  es: [
    {
      title: "MENÚ DEGUSTACIÓN A CIEGAS",
      subtitle: "Un viaje sorprendente a través de varios platos elegidos por nuestro chef, para sumergiros en la filosofía de nuestra cocina.",
      items: [
        ["5 platos", "60"],
        ["8 platos", "85"]
      ]
    },
    {
      title: "PARA COMPARTIR",
      subtitle: 'Italian tapas — Sharing is Caring',
      items: [
        ["✦ Remolacha con queso de cabra, pistacho & pesto", "9"],
        ["Berenjena al horno con crema de curry & queso griego", "9"],
        ["✦ Nuestra Caponata casera de verduras", "9"],
        ["Anchoas cantábricas & mantequilla de Normandía", "9"],
        ["✦ Ensaladilla rusa casera", "9"],
        ["Pimiento & berenjena a la brasa con chutney tropical", "9"]
      ]
    },
    {
      title: "CRUDOS",
      items: [
        ["✦ Gazpacho con gamba cruda", "25"],
        ["Aperitivo crudo del día", "29"],
        ["Ceviche Porn Star", "19"],
        ["✦ Tiradito de lubina con extracto de rosa", "19"],
        ["Tartar de atún picante, aguacate, jalapeño, tabasco, manzana", "20"],
        ["Carpaccio de salmón marinado en sal equilibrada", "19"]
      ]
    },
    {
      title: "ENTRANTES",
      items: [
        ["Calamares al pesto sobre patatas chafadas", "15"],
        ["Ensalada de mariscos al vapor sobre crema de garbanzos & patatas", "20"],
        ["✦ Reinterpretación del Cappon Magro", "20"],
        ["✦ Cigalas gratinadas", "39"],
        ["Carpaccio de tomate con feta & Pesto Genovese", "15"]
      ]
    },
    {
      title: "GRAN CRUDO PREMIUM MEDUSA",
      subtitle: "Nuestra icónica selección de mariscos, en continua evolución según la pesca del día",
      items: [
        ["Mínimo para 2 personas", "39"]
      ]
    },
    {
      title: "PRIMEROS",
      items: [
        ["Gnocchi caseros de patata con calamar & pulpitos", "19"],
        ["✦ Paella de marisco / arroz (Mínimo para 2 personas)", "35"],
        ["Fusilloni con crema ligera de 'Nduja & mariscos", "20"],
        ["✦ Cuscús con cangrejo", "25"],
        ["Gnocchi a la romana con Pesto Genovese", "15"],
        ["Lasaña Bolognese", "15"]
      ]
    },
    {
      title: "SEGUNDOS",
      items: [
        ["✦ Tentáculo de pulpo sobre patatas & pesto", "19"],
        ["Filete del pescado del día sobre verduras de temporada", "25"],
        ["Salmón & caponata", "27"],
        ["✦ Tabla XL Medusa de pescado crudo", "45"],
        ["Simplemente Brandacujun", "19"],
        ["Chuletón de Choco Beef (aprox. 1 kg)", "79"],
        ["Nuestra fritura de mariscos", "35"]
      ]
    },
    {
      title: "GUARNICIONES",
      items: [
        ["Verduras de temporada a la brasa", "7"],
        ["Patatas chafadas", "7"],
        ["Caviar de berenjena", "7"],
        ["Repollo caramelizado agridulce", "7"]
      ]
    },
    {
      title: "FOCACCIAS GOURMET",
      items: [
        ["Focaccia con queso y pesto", "19"],
        ["Focaccia con queso y anchoas", "19"],
        ["Focaccia con queso, tomatitos, aceitunas y alcaparras", "19"]
      ]
    },
    {
      title: "ENSALADAS",
      subtitle: "pequeña o grande",
      items: [
        ["✦ Ensalada de pulpo", "10 / 15"],
        ["Ensalada griega con feta", "10 / 15"],
        ["Ensalada de salmón", "10 / 15"],
        ["✦ Ensalada de atún crudo", "10 / 15"]
      ]
    },
    {
      title: "PARA FINALIZAR",
      items: [
        ["✦ Milhojas con crema Medusa", "9"],
        ['Tarta de manzana "Sbagliato"', "9"],
        ["Tarta de chocolate", "9"],
        ["✦ Tiramisù", "9"],
        ["Helado con crujiente de cereales", "9"],
        ["Sorbete de limón & mirto", "9"]
      ]
    }
  ]
};

// Allergen disclosure — regulatory text, kept in Italian (mirrors the printed menu).
export const ALLERGENS_TEXT = "Allergeni: Glutine (1), Crostacei e derivati (2), Uova e derivati (3), Pesce e derivati (4), Soia e derivati (6), Latte e derivati (7), Frutta a guscio e derivati (8), Molluschi e derivati (14). Per comunicare eventuali allergie e per altre informazioni consultare il cameriere.";

/* Wine list (section titles translate via i18n vini.sections;
   wine names + prices are kept as the printed source) */
export const VINI_DATA: WineSection[] = [
  { key: 'charmat', items: [
    ["S. Prosecco DOC Treviso E.D. Extra Dry Millesimato Bollicina", "29"],
    ["S. Prosecco Valdobbiadene DOCG E.D. Foss Marai", "35"],
    ["S. Valdobbiadene Dry Cartizze DOCG Bortolomiol", "49"]
  ]},
  { key: 'metodo', items: [
    ["M.C. Bellavista DOCG Extra Brut", "69"],
    ["M.C. Dubl Greco Feudi San Gregorio", "69"],
    ["M.C. Franciacorta Cuvee 7 DOCG Sparviere Bio", "55"],
    ["M.C. Franciacorta Saten DOCG Sparviere Bio", "59"],
    ["M.C. Franciacorta DOCG Dosaggio Zero Sparviere", "55"],
    ["M.C. Luogo D'Agosto DOCG Brandolini Nature Pinot Nero", "45"],
    ["M.C. Note D'Agosto Rosé DOCG Brandolini Pinot Nero", "45"],
    ["M.C. Ferrari Giulio DOC", "190"],
    ["M.C. Alta Langa DOCG Pas Dosé Garesio", "55"],
    ["M.C. Valpolcevera DOC Janua Bruzzone", "55"],
    ["M.C. San Matiot Trento DOC Brut", "45"],
    ["S. Blanquette De Limoux", "29"]
  ]},
  { key: 'champagne', items: [
    ["Champagne Dom Pérignon Brut", "390"],
    ["Champagne Ruinart Brut", "180"],
    ["Champagne Ruinart Blanc De Blancs", "200"],
    ["Champagne Leclerc Abyss Brut Zero", "490"],
    ["Champagne Esterlin Brut Éclat", "60"],
    ["Champagne Nicolas Feuillatte Réserve exclusive brut", "90"],
    ["Champagne Nicolas Feuillatte Réserve Rosé", "120"]
  ]},
  { key: 'rosati', items: [
    ["Ormeasco Sciac-Trà DOC Deperi", "29"],
    ["Rosato Igt Liguria Levante Sempiternus", "29"],
    ["Lagrein Rosé Alto Adige DOC H. Lun", "29"],
    ["Rosato Igt Rignana", "35"],
    ["Scalabrone Bolgheri Rosato DOC Antinori", "39"],
    ["Côtes du Rhône AOC Rosé", "25"],
    ["Côtes de Provence Miraval Rosé", "59"]
  ]},
  { key: 'bianchi', items: [
    ["Roero Arneis DOCG Chicco", "29"],
    ["Arneis Langhe DOC Blangé Ceretto", "39"],
    ["Gavi DOCG Villa Sparina", "29"],
    ["Pigato Rlp DOC Deperi", "29"],
    ["Pigato Rlp DOC Terrae", "25"],
    ["Cinque Terre DOC Marina", "39"],
    ["Bianchetta U Pastine Portofino DOC Bisson", "29"],
    ['Colline di Levanto Vermentino DOP "Luccicante" Cà du Ferrà', "55"],
    ["Vermentino Colli Luni DOC Etichetta Nera Lvnae", "35"],
    ["Traminer Aromatico DOC Grave Forchir", "29"],
    ["Sauvignon Collio DOC Sgubin", "33"],
    ["Vinnae Ribolla Gialla IGT Jermann", "59"],
    ["Vintage Tunina IGT Jermann", "90"],
    ["Greco di Tufo DOC Cutizzi Feudi San Gregorio", "33"],
    ["Falanghina Sannio DOC Serrociello Feudi San Gregorio", "30"],
    ["La Segreta Bianco DOC BIO Planeta", "29"],
    ["Chardonnay DOC Bio Planeta", "65"],
    ["Vermentino Classico IGT Capichera", "79"],
    ["Vermentino Funtanaliras DOCG C. Verm.", "29"],
    ["Chablis Des Hâtes", "69"],
    ["Montej Piemonte DOC Chardonnay Sparina", "21"]
  ]},
  { key: 'rossi', items: [
    ["Dogliani DOCG Caldera", "29"],
    ["Barbera Asti DOCG Fiulot Prunotto", "35"],
    ["Nebbiolo Alba DOC Occhetti Prunotto", "45"],
    ["Rossese di Dolceacqua DOC E Prie Anfosso", "29"],
    ["Ciliegiolo Portofino DOC Bisson", "29"],
    ["Niglù Levanto Rosso DOP Cà du Ferrà", "49"],
    ["Pinot Nero Alto Adige DOC H. Lun", "45"],
    ["Chianti DOCG Leonardo", "29"],
    ["Chianti Classico DOCG Rigànnà BIO", "45"],
    ['Bolgheri Rosso DOC "Il Seggio" Poggio al Tesoro', "49"],
    ["Le Volte IGT Tenuta Ornellaia", "55"]
  ]}
];
